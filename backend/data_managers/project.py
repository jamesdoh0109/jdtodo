import datetime 
from backend.app import db
from backend.models.project import Project 

def get_project(proj_id):
    project = Project.query.filter_by(id=proj_id).first()
    return project 

def get_projects(user_id):
    projects = Project.query.filter_by(user_id=user_id)
    project_list = [{'proj_id': proj.id, 'proj_name': proj.name,
                     'date_created': proj.date_created} for proj in projects]
    return project_list

def create_project(name, user_id):
    project = Project(name, user_id)
    try:
        db.session.add(project)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e 
    project_obj = {'proj_id': project.id, 'proj_name': project.name,
                   'date_created': project.date_created}
    return project_obj

def modify_project(project, modified_project_name):
    project.name = modified_project_name
    project.date_created = datetime.datetime.now()
    print(datetime.datetime.now())
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e 
    project_obj = {'proj_id': project.id, 'proj_name': project.name,
                   'date_created': project.date_created}
    return project_obj

def delete_project(project):
    try:
        db.session.delete(project)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e 
    project_obj = {'proj_id': project.id, 'proj_name': project.name,
                   'date_created': project.date_created}
    return project_obj