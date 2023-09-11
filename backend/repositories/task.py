from backend.app import db
from backend.models.task import Task 

def get_task(task_id):
    return Task.query.filter_by(id=task_id).first() 

def get_tasks_for_project(project_id):
    tasks = Task.query.filter_by(project_id=project_id).all()
    return [task.to_dict() for task in tasks]

def create_task_for_project(project_id, new_task_json): 
    task_data = {
        'name': new_task_json.get('name'),
        'deadline': new_task_json.get('deadline'),
        'status': new_task_json.get('status'),
        'description': new_task_json.get('description', ""),
        'project_id': project_id,
    }
    task = Task(**task_data)
    try:
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    except Exception as e:
        db.session.rollback()
        return e 

def modify_task_for_project(task, modified_task_json):
    task.update_from_dict(modified_task_json)
    try:
        db.session.commit()
        return task.to_dict()
    except Exception as e:
        db.session.rollback()
        return e 

def delete_task_for_project(task):
    try:
        db.session.delete(task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e 