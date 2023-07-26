from flask import jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from backend.data_managers.project import get_project 
from backend.data_managers.task import get_task, get_tasks_for_project, create_task_for_project, modify_task_for_project, delete_task_for_project
from backend.utils.utils import convert_datetime_into_system_datetime
from backend.validators.task import TaskValidator

task =  Blueprint('task', __name__)

@task.route('/api/<proj_id>/tasks', methods=['GET'])
@jwt_required()
def get_tasks_for_project_route(proj_id):
    user_id = get_jwt_identity()
    project = get_project(proj_id)
    if project is None:
        return jsonify({'error': f'Project not found'}), 404
    if project.user_id != user_id:
        return jsonify({'error': 'Access denied'}), 403
    tasks = get_tasks_for_project(proj_id)
    return jsonify({'tasks': tasks}), 200

@task.route('/api/<proj_id>/tasks', methods=['POST'])
@jwt_required()
def create_task_for_project_route(proj_id):
    user_id = get_jwt_identity()
    create_task_json = request.get_json()
    validator = TaskValidator()
    if not validator.validate_task_inputs(create_task_json):
        return jsonify({'error': validator.error}), 400
    project = get_project(proj_id)
    if project is None:
        return jsonify({'error': f'Project not found'}), 404
    if project.user_id != user_id:
        return jsonify({'error': 'Access denied'}), 403
    deadline_in_system_time = convert_datetime_into_system_datetime(create_task_json['deadline'], create_task_json['user_time_zone'])
    task = create_task_for_project(proj_id, deadline_in_system_time, create_task_json)
    if isinstance(task, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': 'Task successfully created', 'task': task}), 201

@task.route('/api/tasks/<task_id>', methods=['PATCH'])
@jwt_required()
def modify_task_for_project_route(task_id):
    user_id = get_jwt_identity()
    modified_task_json = request.get_json()
    validator = TaskValidator()
    if not validator.validate_task_inputs(modified_task_json):
        return jsonify({'error': validator.error}), 400
    task = get_task(task_id)
    if task is None:
        return jsonify({'error': f'Task not found'}), 400
    if task.project.user_id != user_id:
        return jsonify({'error': 'Access denied'}), 403
    modified_task = modify_task_for_project(task, modified_task_json)
    if isinstance(modified_task, Exception): 
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': 'Task successfully updated'}), 200

@task.route('/api/tasks/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task_for_project_route(task_id):
    user_id = get_jwt_identity()
    task = get_task(task_id)
    if task is None:
        return jsonify({'error': f'Task not found'}), 400
    if task.project.user_id != user_id:
        return jsonify({'error': 'Access denied'}), 403
    deleted_task = delete_task_for_project(task)
    if isinstance(deleted_task, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': f'Task deleted successfully'}), 200

        