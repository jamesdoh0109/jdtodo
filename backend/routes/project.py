from flask import jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from backend.models.project import Project
from backend.data_managers.project import get_project, get_projects, create_project, modify_project, delete_project
from backend.validators.project import ProjectValidator

project =  Blueprint('project', __name__)

@project.route('/api/projects', methods=['GET'])
@jwt_required()
def get_projects_route():
    user_id = get_jwt_identity()
    project_list = get_projects(user_id)
    return jsonify({'projects': project_list}), 200

@project.route('/api/projects', methods=['POST'])
@jwt_required()
def create_project_route():
    user_id = get_jwt_identity()
    create_project_json = request.get_json()
    validator = ProjectValidator()
    if not validator.validate_project_input(create_project_json):
        return jsonify({'error': validator.error}), 400
    name = create_project_json['name']
    project = create_project(name, user_id)
    if isinstance(project, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': f'Project successfully created', 'project': project}), 201

@project.route('/api/projects/<proj_id>', methods=['PATCH'])
@jwt_required()
def modify_project_route(proj_id):
    user_id = get_jwt_identity()
    modified_project_json = request.get_json()
    validator = ProjectValidator()
    if not validator.validate_project_input(modified_project_json):
        return jsonify({'error': validator.error}), 400
    project = get_project(proj_id)
    if project is None:
        return jsonify({'error': f'Project not found'}), 404
    if project.user_id != user_id:
        return jsonify({'error': 'Access denied'}), 403
    modified_project = modify_project(project, modified_project_json['name'])
    if isinstance(modified_project, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': 'Project name successfully updated', 'project': modified_project}), 200

@project.route('/api/projects/<proj_id>', methods=['DELETE'])
@jwt_required()
def delete_project_route(proj_id):
    user_id = get_jwt_identity()
    project = get_project(proj_id)
    if project is None:
        return jsonify({'error': f'Project not found'}), 404
    if project.user_id != user_id:
        return jsonify({'error': 'Access denied'}), 403
    deleted_project = delete_project(project)
    if isinstance(deleted_project, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': f'Project deleted successfully', 'project': deleted_project}), 200
    