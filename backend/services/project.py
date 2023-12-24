from sqlalchemy.exc import IntegrityError

from backend.repositories.project import get_project, get_projects, create_project, modify_project, delete_project
from backend.utils.decorator import validate_project_json, handle_exceptions
from backend.utils.exceptions import NotFoundException, AccessDeniedException, ServerException, IntegrityException

def _check_project_exists(project):
    if project is None:
        raise NotFoundException("Project not found")

def _check_project_ownership(project, user_id):
    if project.user_id != user_id:
        raise AccessDeniedException("Access denied")

def _check_server_error(project):
    if isinstance(project, Exception):
        raise ServerException()

def _check_integrity_error(project):
    if isinstance(project, IntegrityError):
        raise IntegrityException("Project with the same name already exists")
         
@handle_exceptions('project')
def get_project_service(user_id, project_id):
    project = get_project(project_id)

    _check_server_error(project) 
    _check_project_exists(project)
    _check_project_ownership(project, user_id)

    return {'project': project, 'message': 'Project successfully fetched', 'status_code': 200} 

@handle_exceptions('projects')
def get_projects_service(user_id):
    projects = get_projects(user_id)
    
    _check_server_error(projects)

    return {'projects': projects, 'message': 'Projects successfully fetched', 'status_code': 200}

@handle_exceptions('project')
@validate_project_json('project')
def create_project_service(create_project_json, user_id):
    name = create_project_json['name']
    created_project = create_project(name, user_id)

    _check_integrity_error(created_project)
    _check_server_error(created_project)

    return {'project': created_project, 'message': 'Project successfully created', 'status_code': 201}

@handle_exceptions('project')
@validate_project_json('project')
def modify_project_service(modified_project_json, user_id, project_id):
    project = get_project(project_id)

    _check_server_error(project)
    _check_project_exists(project)
    _check_project_ownership(project, user_id)

    modified_project = modify_project(project, modified_project_json['name'])

    _check_integrity_error(modified_project)
    _check_server_error(modified_project)
    
    return {'project': modified_project, 'message': 'Project successfully modified', 'status_code': 200}

@handle_exceptions('project')
def delete_project_service(user_id, project_id):
    project = get_project(project_id)
    
    _check_server_error(project)
    _check_project_exists(project)
    _check_project_ownership(project, user_id)
     
    deleted_project = delete_project(project)
    
    _check_server_error(deleted_project)

    return {'project': deleted_project, 'message': 'Project successfully deleted', 'status_code': 200}