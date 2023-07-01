from flask import jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from backend.app import db
from backend.models.task import Task
from backend.models.project import Project
from backend.utils.utils import has_empty_fields, convert_datetime_into_system_datetime

task =  Blueprint('task', __name__)

@task.route('/api/<proj_id>/tasks', methods=['GET'])
@jwt_required()
def get_tasks_for_project(proj_id):
    user_id = get_jwt_identity()
    project = Project.query.filter_by(id=proj_id).first()
    if project is None:
        return jsonify({'error': f'Project {proj_id} not found'}), 404
    if project.user_id != user_id:
        return jsonify({'error': 'You can\'t access someone else\'s project.'}), 403
    tasks = Task.query.filter_by(proj_id=proj_id).all()
    task_list = [
        {
            'task_id': task.id,
            'task_name': task.name,
            'task_deadline': task.deadline,
            'task_status': task.status,
            'task_description': task.description,
        }
        for task in tasks
    ]
    return ({'tasks': task_list}), 200

@task.route('/api/<proj_id>/tasks', methods=['POST'])
@jwt_required()
def create_task(proj_id):
    user_id = get_jwt_identity()
    project = Project.query.filter_by(id=proj_id).first()
    if project is None:
        return jsonify({'error': f'Project {proj_id} not found'}), 404
    if project.user_id != user_id:
        return jsonify({'error': 'You can\'t access someone else\'s project.'}), 403
    new_task_json = request.get_json()
    if not new_task_json or has_empty_fields('name', 'deadline', 'status', 'user_time_zone', req_json=new_task_json):
        return jsonify({'error': 'Missing or incomplete task data.'}), 400
    deadline_in_system_time = convert_datetime_into_system_datetime(new_task_json['deadline'], new_task_json['user_time_zone'])
    task = Task(new_task_json['name'], deadline_in_system_time, new_task_json['status'], proj_id)
    if 'description' in new_task_json and new_task_json['description'] != "":
        task.description = new_task_json['description']
    try:
        db.session.add(task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    task_obj = {'task_id': task.id, 'task_name': task.name, 'task_deadline': task.deadline,
                'task_description': task.description, 'task_status': task.status}
    return jsonify({'message': 'Task successfully created.', 'task': task_obj}), 201

@task.route('/api/tasks/<task_id>', methods=['PATCH'])
@jwt_required()
def modify_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id).first()
    if task is None:
        return jsonify({'error': f'Task {task_id} not found'}), 400
    if task.project.user_id != user_id:
        return jsonify({'error': 'You can\'t edit someone else\'s task.'}), 403
    updated_task_json = request.get_json()
    for field in ['name', 'deadline', 'status', 'description']:
        if field in updated_task_json and getattr(task, field) != updated_task_json[field]:
            if field == 'deadline':
                setattr(task, field, convert_datetime_into_system_datetime(updated_task_json[field], updated_task_json['user_time_zone']))
            else:
                setattr(task, field, updated_task_json[field])
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    return jsonify({'message': 'Task successfully updated.'}), 200

@task.route('/api/tasks/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id).first()
    if task is None:
        return jsonify({'error': f'Task {task_id} not found'}), 400
    if task.project.user_id != user_id:
        return jsonify({'error': 'You can\'t delete someone else\'s task.'}), 403
    try:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': f'Task {task_id} deleted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500