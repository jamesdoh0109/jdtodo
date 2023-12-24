from sqlalchemy.exc import IntegrityError

from backend.repositories.project import get_project 
from backend.repositories.task import get_task, get_tasks_for_project, create_task_for_project, modify_task_for_project, delete_task_for_project
from backend.utils.decorators import validate_task_json, handle_exceptions
from backend.utils.exceptions import NotFoundException, AccessDeniedException, ServerException, IntegrityException

def _check_task_exists(task):
    if task is None:
        raise NotFoundException('Task not found')

def _check_task_ownership(task, user_id):
    if task.project.user_id != user_id:
        raise AccessDeniedException('Access denied')

def _check_project_exists(project):
    if project is None:
        raise NotFoundException('Project not found')

def _check_project_ownership(project, user_id):
    if project.user_id != user_id:
        raise AccessDeniedException('Access denied')

def _check_server_error(project_or_tasks):
    if isinstance(project_or_tasks, Exception):
        raise ServerException()

def _check_integrity_error(project_or_task):
    if isinstance(project_or_task, IntegrityError):
        raise IntegrityException('Task with the same name already exists')

@handle_exceptions('tasks')
def get_tasks_for_project_service(user_id, project_id):
    project = get_project(project_id)
    
    _check_server_error(project) 
    _check_project_exists(project)
    _check_project_ownership(project, user_id)

    tasks = get_tasks_for_project(project_id)
    
    _check_server_error(tasks)
    
    return {'tasks': tasks, 'message': 'Tasks successfully fetched', 'status_code': 200} 

@handle_exceptions('task')
@validate_task_json('task')
def create_task_for_project_service(create_task_json, user_id, project_id):
    project = get_project(project_id)
    
    _check_server_error(project) 
    _check_project_exists(project)
    _check_project_ownership(project, user_id)

    created_task = create_task_for_project(project_id, create_task_json)

    _check_integrity_error(created_task)
    _check_server_error(created_task)

    return {'task': created_task, 'message': 'Tasks successfully created', 'status_code': 201} 

@handle_exceptions('task')
@validate_task_json('task')
def modify_task_for_project_service(modified_task_json, user_id, task_id):
    task = get_task(task_id)

    _check_server_error(task) 
    _check_task_exists(task)
    _check_task_ownership(task, user_id)

    modified_task = modify_task_for_project(task, modified_task_json)

    _check_integrity_error(modified_task)
    _check_server_error(modified_task)

    return {'task': modified_task, 'message': 'Tasks successfully modified', 'status_code': 200} 

@handle_exceptions('task')
def delete_task_for_project_service(user_id, task_id):
    task = get_task(task_id)

    _check_server_error(task) 
    _check_task_exists(task)
    _check_task_ownership(task, user_id)
        
    deleted_task = delete_task_for_project(task)

    _check_server_error(deleted_task)

    return {'task': deleted_task, 'message': 'Task successfully deleted', 'status_code': 200}