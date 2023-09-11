from flask import jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from backend.services.task import get_tasks_for_project_service, create_task_for_project_service, modify_task_for_project_service, delete_task_for_project_service
from backend.utils.utils import check_error_and_return_json_response

task =  Blueprint('task', __name__)

@task.route('/api/<project_id>/tasks', methods=['GET'])
@jwt_required()
def get_tasks_for_project_route(project_id):
    user_id = get_jwt_identity()
    tasks, message, status_code = get_tasks_for_project_service(user_id, project_id).values()
    if tasks or tasks == []:
        return jsonify({'tasks': tasks, 'message': message}), status_code
    else:
        return jsonify({'error': message}), status_code

@task.route('/api/<project_id>/tasks', methods=['POST'])
@jwt_required()
def create_task_for_project_route(project_id):
    user_id = get_jwt_identity()
    create_task_json = request.get_json()
    created_task, message, status_code = create_task_for_project_service(create_task_json, user_id, project_id).values()
    if created_task:
        return jsonify({'task': created_task, 'message': message}), status_code
    else:
        return jsonify({'error': message}), status_code 

@task.route('/api/tasks/<task_id>', methods=['PATCH'])
@jwt_required()
def modify_task_for_project_route(task_id):
    user_id = get_jwt_identity()
    modified_task_json = request.get_json()
    modified_task, message, status_code = modify_task_for_project_service(modified_task_json, user_id, task_id).values()
    if modified_task:
        return jsonify({'task': modified_task, 'message': message}), status_code
    else:
        return jsonify({'error': message}), status_code 

@task.route('/api/tasks/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task_for_project_route(task_id):
    user_id = get_jwt_identity()
    error, message, status_code = delete_task_for_project_service(user_id, task_id).values()
    return check_error_and_return_json_response(error, message, status_code)
        