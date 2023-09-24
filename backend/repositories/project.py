import datetime 

from backend.app import db
from backend.models.project import Project 

def get_project(project_id):
    try: 
        return Project.query.filter_by(id=project_id).first()
    except Exception as e:
        return e

def get_projects(user_id):
    try:
        projects = Project.query.filter_by(user_id=user_id)
        return [project.to_dict() for project in projects]
    except Exception as e:
        return e

def create_project(name, user_id):
    project = Project(name, user_id)
    try:
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    except Exception as e:
        db.session.rollback()
        return e 

def modify_project(project, modified_project_name):
    project.name = modified_project_name
    try:
        db.session.commit()
        return project.to_dict()
    except Exception as e:
        db.session.rollback()
        return e 

def delete_project(project):
    try:
        db.session.delete(project)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e 
