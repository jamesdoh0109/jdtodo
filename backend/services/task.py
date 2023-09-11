from sqlalchemy.exc import IntegrityError

from backend.repositories.project import get_project 
from backend.repositories.task import get_task, get_tasks_for_project, create_task_for_project, modify_task_for_project, delete_task_for_project
from backend.utils.decorator import validate_task_json

def get_tasks_for_project_service(user_id, project_id):
    project = get_project(project_id)
    if project is None:
        return {'tasks': None, 'message': 'Project not found', 'status_code': 404}
    if project.user_id != user_id:
        return {'tasks': None, 'message': 'Access denied', 'status_code': 403} 

    tasks = get_tasks_for_project(project_id)
    return {'tasks': tasks, 'message': 'Tasks successfully fetched', 'status_code': 200} 

@validate_task_json('created_task')
def create_task_for_project_service(create_task_json, user_id, project_id):
    project = get_project(project_id)
    if project is None:
        return {'created_task': None, 'message': 'Project not found', 'status_code': 404}
    if project.user_id != user_id:
        return {'created_task': None, 'message': 'Access denied', 'status_code': 403} 

    created_task = create_task_for_project(project_id, create_task_json)
    if isinstance(created_task, IntegrityError):
        return {'created_task': None, 'message': 'Task with the same name already exists', 'status_code': 409}
    if isinstance(created_task, Exception):
        return {'created_task': None, 'message': 'Server error: please try again', 'status_code': 500}
    return {'created_task': created_task, 'message': 'Tasks successfully created', 'status_code': 201} 

@validate_task_json('modified_task')
def modify_task_for_project_service(modified_task_json, user_id, task_id):
    task = get_task(task_id)
    if task is None:
        return {'modified_task': None, 'message': 'Task not found', 'status_code': 404}
    if task.project.user_id != user_id:
        return {'modified_task': None, 'message': 'Access denied', 'status_code': 403} 

    modified_task = modify_task_for_project(task, modified_task_json)
    if isinstance(modified_task, IntegrityError):
        return {'modified_task': None, 'message': 'Task with the same name already exists', 'status_code': 409}
    if isinstance(modified_task, Exception): 
        return {'modified_task': None, 'message': 'Server error: please try again', 'status_code': 500}
    return {'modified_task': modified_task, 'message': 'Tasks successfully updated', 'status_code': 200} 

def delete_task_for_project_service(user_id, task_id):
    task = get_task(task_id)
    if task is None:
         return {'error': True, 'message': 'Task not found', 'status_code': 404}
    if task.project.user_id != user_id:
        return {'error': True, 'message': 'Access denied', 'status_code': 403} 
        
    status = delete_task_for_project(task)
    if isinstance(status, Exception):
        return {'error': True, 'message': 'Server error: please try again', 'status_code': 500}
    return {'error': False, 'message': 'Task successfully deleted', 'status_code': 200}