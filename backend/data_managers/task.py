from backend.app import db
from backend.models.task import Task 
from backend.utils.utils import convert_datetime_into_system_datetime

def get_task(task_id):
    task = Task.query.filter_by(id=task_id).first()
    return task 

def get_tasks_for_project(proj_id):
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
    return task_list

def create_task_for_project(proj_id, deadline_in_system_time, new_task_json):
    task = Task(new_task_json['name'], deadline_in_system_time, new_task_json['status'], proj_id)
    if 'description' in new_task_json and new_task_json['description'] != "":
        task.description = new_task_json['description']
    try:
        db.session.add(task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e 
    task_obj = {'task_id': task.id, 'task_name': task.name, 'task_deadline': task.deadline,
                'task_description': task.description, 'task_status': task.status}
    return task_obj

def modify_task_for_project(task, modified_task_json):
    for field in ['name', 'deadline', 'status', 'description']:
        if field in modified_task_json and getattr(task, field) != modified_task_json[field]:
            if field == 'deadline':
                setattr(task, field, convert_datetime_into_system_datetime(modified_task_json[field], modified_task_json['user_time_zone']))
            else:
                setattr(task, field, modified_task_json[field])
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e 
    task_obj = {'task_id': task.id, 'task_name': task.name}
    return task_obj

def delete_task_for_project(task):
    try:
        db.session.delete(task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e 
    task_obj = {'task_id': task.id, 'task_name': task.name}
    return task_obj