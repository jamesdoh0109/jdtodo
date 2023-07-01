from flask import jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from backend.app import db
from backend.models.project import Project

project =  Blueprint('project', __name__)

@project.route('/api/projects', methods=['GET'])
@jwt_required()
def get_projects():
    user_id = get_jwt_identity()
    projects = Project.query.filter_by(user_id=user_id)
    project_list = [{'proj_id': proj.id, 'proj_name': proj.name,
                     'date_created': proj.date_created} for proj in projects]
    return jsonify({'projects': project_list}), 200

@project.route('/api/projects', methods=['POST'])
@jwt_required()
def create_project():
    user_id = get_jwt_identity()
    new_project_json = request.get_json()
    if not new_project_json:
        return jsonify({'error': 'Missing request body.'}), 400
    name = new_project_json.get('name')
    if not name or name == '':
        return jsonify({'error': 'Name is required.'}), 400
    if len(name) > 25:
        return jsonify({'error': 'Name must be less than 25 characters.'}), 400
    project = Project(name, user_id)
    try:
        db.session.add(project)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    project_obj = {'proj_id': project.id, 'proj_name': project.name,
                   'date_created': project.date_created}
    return jsonify({'message': 'Project successfully created.', 'project': project_obj}), 201

@project.route('/api/projects/<proj_id>', methods=['PATCH'])
@jwt_required()
def modify_project_name(proj_id):
    user_id = get_jwt_identity()
    new_project_json = request.get_json()
    if not new_project_json:
        return jsonify({'error': 'Missing request body.'}), 400
    project = Project.query.filter_by(id=proj_id).first()
    if project is None:
        return jsonify({'error': f'Project {proj_id} not found'}), 404
    if project.user_id != user_id:
        return jsonify({'error': 'You can\'t edit someone else\'s project.'}), 401
    if 'name' not in new_project_json:
        return jsonify({'error': 'Project name is required.'}), 400
    project.name = new_project_json['name']
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    return jsonify({'message': 'Project name successfully updated.'}), 200

@project.route('/api/projects/<proj_id>', methods=['DELETE'])
@jwt_required()
def delete_project(proj_id):
    user_id = get_jwt_identity()
    project = Project.query.filter_by(id=proj_id).first()
    if project is None:
        return jsonify({'error': f'Project {proj_id} not found'}), 404
    if project.user_id != user_id:
        return jsonify({'error': 'You can\'t delete someone else\'s project.'}), 403
    try:
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': f'Project {proj_id} deleted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500