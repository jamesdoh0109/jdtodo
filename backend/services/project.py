from sqlalchemy.exc import IntegrityError

from backend.repositories.project import get_project, get_projects, create_project, modify_project, delete_project
from backend.utils.decorator import validate_project_json

def get_project_service(user_id, project_id):
    project = get_project(project_id)
    if project is None:
        return {'project': None, 'message': 'Project not found', 'status_code': 404}
    if project.user_id != user_id:
        return {'project': None, 'message': 'Access denied', 'status_code': 403} 
    return {'project': project, 'message': 'Project successfully fetched', 'status_code': 200} 

def get_projects_service(user_id):
    project_list = get_projects(user_id)
    return {'project_list': project_list, 'status_code': 200}

@validate_project_json('created_project')
def create_project_service(create_project_json, user_id):
    name = create_project_json['name']
    created_project = create_project(name, user_id)
    if isinstance(created_project, IntegrityError):
        return {'created_project': None, 'message': 'Project with the same name already exists', 'status_code': 409}
    if isinstance(created_project, Exception):
        return {'created_project': None, 'message': 'Server error: please try again', 'status_code': 500}
    return {'created_project': created_project, 'message': 'Project successfully created', 'status_code': 201}

@validate_project_json('modified_project')
def modify_project_service(modified_project_json, user_id, project_id):
    project = get_project(project_id)
    if project is None:
        return {'modified_project': None, 'message': 'Project not found', 'status_code': 404}
    if project.user_id != user_id:
        return {'modified_project': None, 'message': 'Access denied', 'status_code': 403} 

    modified_project = modify_project(project, modified_project_json['name'])
    if isinstance(modified_project, IntegrityError):
        return {'modified_project': None, 'message': 'Project with the same name already exists', 'status_code': 409}
    if isinstance(modified_project, Exception):
        return {'modified_project': None, 'message': 'Server error: please try again', 'status_code': 500}
    return {'modified_project': modified_project, 'message': 'Project successfully updated', 'status_code': 200}

def delete_project_service(user_id, project_id):
    project = get_project(project_id)
    if project is None:
        return {'error': True, 'message': 'Project not found', 'status_code': 404}
    if project.user_id != user_id:
        return {'error': True, 'message': 'Access denied', 'status_code': 403} 
        
    status = delete_project(project)
    if isinstance(status, Exception):
        return {'error': True, 'message': 'Server error: please try again', 'status_code': 500}
    return {'error': False, 'message': 'Project successfully deleted', 'status_code': 200}