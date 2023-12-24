from flask import jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from backend.services.project import get_project_service, get_projects_service, create_project_service, modify_project_service, delete_project_service

project =  Blueprint('project', __name__)

@project.route('/api/projects/<project_id>', methods=['GET'])
@jwt_required
def get_project_route(project_id):
    user_id = get_jwt_identity()
    project, message, status_code = get_project_service(user_id, project_id).values()
    if project:
        return jsonify({'project': project, 'message': message}), status_code
    else:
        return jsonify({'error': message}), status_code
    
@project.route('/api/projects', methods=['GET'])
@jwt_required()
def get_projects_route():
    user_id = get_jwt_identity()
    projects, message, status_code = get_projects_service(user_id).values()
    if projects or projects == []:
        return jsonify({'projects': projects, 'message': message}), status_code
    else:
        return jsonify({'error': message}), status_code

@project.route('/api/projects', methods=['POST'])
@jwt_required()
def create_project_route():
    user_id = get_jwt_identity()
    create_project_json = request.get_json()
    project, message, status_code = create_project_service(create_project_json, user_id).values()
    if project:
        return jsonify({'project': project, 'message': message}), status_code
    else: 
        return jsonify({'error': message}), status_code

@project.route('/api/projects/<project_id>', methods=['PATCH'])
@jwt_required()
def modify_project_route(project_id):
    user_id = get_jwt_identity()
    modified_project_json = request.get_json()
    project, message, status_code = modify_project_service(modified_project_json, user_id, project_id).values()
    if project:
        return jsonify({'project': project, 'message': message}), status_code
    else:
        return jsonify({'error': message}), status_code

@project.route('/api/projects/<project_id>', methods=['DELETE'])
@jwt_required()
def delete_project_route(project_id):
    user_id = get_jwt_identity()
    project, message, status_code = delete_project_service(user_id, project_id).values()
    if project:
        return jsonify({'message': message}), status_code
    else:
        return jsonify({'error': message}), status_code
