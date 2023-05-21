from flask import jsonify, request, session, make_response 
from setup import app, db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError 
from models import *
import re
import jwt 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

@app.route('/', methods=['GET'])
def home():
    users = User.query.all()
    for user in users:
        print(user.email)
    projects = Project.query.all()
    for project in projects:
        print(project.id, project.name, project.date_created, project.user_id, project.tasks)
    return "Welcome"

@app.route('/api/login', methods=['POST'])
def login():
    login_json = request.get_json()
    if not login_json:
        return jsonify({'error': 'Missing request body.'}), 400 
    if has_empty_fields('email', 'password', req_json=login_json):
        return jsonify({'error': 'Both fields are required.'}), 400
    email = login_json['email']
    password = login_json['password'] 
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'error': 'User does not exist.'}), 404 
    if not check_password_hash(user.hashed_password, password):
        return jsonify({'error': 'Incorrect password.'}), 401 
    else:
        user_obj = {'id': user.id, 'firstname': user.firstname, 'lastname': user.lastname, 'email': user.email}
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login success.', 'access_token': access_token, 'user': user_obj}), 200 

def has_empty_fields(*args, req_json):
    for field in args:
        if field not in req_json:
            return True
    if '' in req_json.values():
        return True 

def check_valid_email(email):
    regex = r'[^@]+@[^@]+\.[^@]+'
    return re.fullmatch(regex, email) 

def check_verify_password(password, password2):
    return password == password2

def check_valid_password(password):
    return (len(password) >= 8 and any([c.isupper() for c in password]) and any([c.isdigit() for c in password]))

@app.route('/api/signup', methods=['POST'])
def signup():
    new_user_json = request.get_json()
    if not new_user_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if has_empty_fields('firstname', 'lastname', 'email', 'password', 'password2', req_json=new_user_json):
        return jsonify({'error': 'All 5 fields are required.'}), 400
    firstname = new_user_json['firstname']
    lastname = new_user_json['lastname']
    email = new_user_json['email']
    password = new_user_json['password']
    password2 = new_user_json['password2']
    if not check_valid_email(email):
        return jsonify({'error': 'Email is not valid.'}), 400 
    if not check_verify_password(password, password2):
        return jsonify({'error': 'Your passwords don\'t match.'}), 400 
    if not check_valid_password(password):
        return jsonify({'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number.'}), 400
    new_user = User(firstname, lastname, email, generate_password_hash(password))
    try: 
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError: 
        db.session.rollback()
        return jsonify({'error': 'Email already exists.'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': e}), 500 
    return jsonify({'message': 'User successfully created.'}), 201

@app.route('/api/projects', methods=['GET'])
@jwt_required()
def get_projects():
    user_id = get_jwt_identity()
    projects = Project.query.filter_by(user_id=user_id)
    project_list = [{'proj_id': proj.id, 'proj_name': proj.name, 'date_created': proj.date_created} for proj in projects]
    return jsonify({'projects': project_list}), 200 

@app.route('/api/projects', methods=['POST'])
@jwt_required()
def create_project():
    user_id = get_jwt_identity()
    new_project_json = request.get_json()
    if not new_project_json:
        return jsonify({'error': 'Missing request body.'}), 400 
    if 'name' not in new_project_json:
        return jsonify({'error': 'Name is required.'}), 400 
    name = new_project_json['name']
    if len(name) > 25:
        return jsonify({'error': 'Name must be less than 25 characters.'}), 400 
    project = Project(name, user_id) 
    try: 
        db.session.add(project)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': e}), 500 
    project_obj = {'proj_id': project.id, 'proj_name': project.name, 'date_created': project.date_created}
    return jsonify({'message': 'Project successfully created.', 'project': project_obj}), 201

@app.route('/api/projects/<proj_id>', methods=['PATCH'])
@jwt_required()
def modify_project_name(proj_id):
    user_id = get_jwt_identity()
    new_project_json = request.get_json()
    project = Project.query.filter_by(id=proj_id).first()
    if project is None:
        return jsonify({'error': f'Project {proj_id} not found'}), 400
    if project.user_id != user_id:
        return jsonify({'error': 'You can\'t edit someone else\'s project.'}), 401
    if not new_project_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if 'name' not in new_project_json:
        return jsonify({'error': 'Project name is required.'}), 400 
    project.name = new_project_json['name']
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': e}), 500 
    return jsonify({'message': 'Project name successfully updated.'}), 200

@app.route('/api/projects/<proj_id>', methods=['DELETE'])
@jwt_required()
def delete_project(proj_id):
    user_id = get_jwt_identity()
    project = Project.query.filter_by(id=proj_id).first()
    if project is None:
        return jsonify({'error': f'Project {proj_id} not found'}), 400
    if project.user_id != user_id:
        return jsonify({'error': 'You can\'t delete someone else\'s project.'}), 401
    try:
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': f'Project {proj_id} deleted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': e}), 500 
        
@app.route('/api/<proj_id>/tasks', methods=['GET']) 
@jwt_required()
def get_tasks_for_project(proj_id):
    user_id = get_jwt_identity()
    project = Project.query.filter_by(id=proj_id).first()
    if project is None:
        return jsonify({'error': f'Project {proj_id} not found'}), 400
    if project.user_id != user_id:
        return jsonify({'error': 'You can\'t access someone else\'s project.'}), 401
    tasks = Task.query.filter_by(proj_id=proj_id)
    task_list = [
        {
            'task_id': task.id,
            'task_name': task.name,
            'task_description': task.description,
            'task_is_done': task.is_done,
        }
        for task in tasks 
    ]
    return ({'task_list': task_list}), 200

@app.route('/api/<proj_id>/tasks', methods=['POST'])
@jwt_required()
def create_task(proj_id):
    user_id = get_jwt_identity()
    project = Project.query.filter_by(id=proj_id).first()
    if project is None:
        return jsonify({'error': f'Project {proj_id} not found'}), 400
    if project.user_id != user_id:
        return jsonify({'error': 'You can\'t access someone else\'s project.'}), 401
    new_task_json = request.get_json()
    if not new_task_json:
        return jsonify({'error': 'Missing request body.'}), 400 
    if 'name' not in new_task_json:
        return jsonify({'error': 'Task name is required.'}), 400 
    name = new_task_json['name']
    task = Task(name, proj_id)
    if 'description' in new_task_json and new_task_json['description'] != "": 
        task.description = new_task_json['description'] 
    try: 
        db.session.add(task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': e}), 500 
    return jsonify({'message': 'Task successfully created.'}), 201

@app.route('/api/tasks/<task_id>', methods=['PATCH'])
@jwt_required()
def modify_task(task_id):  
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id).first()
    if task is None: 
        return jsonify({'error': f'Task {task_id} not found'}), 400
    project_with_queried_task = Project.query.filter_by(id=task.proj_id).first()
    if project_with_queried_task.user_id != user_id:
        return jsonify({'error': 'You can\'t access someone else\'s task.'}), 401
    new_task_json = request.get_json() 
    if 'name' in new_task_json and new_task_json['name'] != task.name:
        task.name = new_task_json['name']
    if 'description' in new_task_json and new_task_json['description'] != task.description:
        task.description = new_task_json['description']
    if 'is_done' in new_task_json and new_task_json['is_done'] != task.is_done:
        task.is_done = new_task_json['is_done']
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': e}), 500 
    return jsonify({'message': 'Task successfully updated.'}), 200

@app.route('/api/tasks/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id).first()
    if task is None: 
        return jsonify({'error': f'Task {task_id} not found'}), 400
    project_with_queried_task = Project.query.filter_by(id=task.proj_id).first()
    if project_with_queried_task.user_id != user_id:
        return jsonify({'error': 'You can\'t delete someone else\'s task.'}), 401 
    try:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': f'Task {task_id} deleted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': e}), 500 

@app.route('/api/user/<user_id>/details', methods=['PATCH'])
@jwt_required()
def modify_user_details(user_id):
    new_user_json = request.get_json()
    if not new_user_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if has_empty_fields('firstname', 'lastname', 'email', req_json=new_user_json):
        return jsonify({'error': 'You can\'t have an empty field.'}), 400
    firstname = new_user_json['firstname']
    lastname = new_user_json['lastname']
    email = new_user_json['email']
    user = User.query.filter_by(id=user_id).first()
    jwt_user_id = get_jwt_identity()
    if user is None:
        return jsonify({'error': f'User {user_id} not found'}), 400
    if user.id != jwt_user_id:
        return jsonify({'error': 'You can\'t edit someone else\'s profile.'}), 401
    if not check_valid_email(email):
        return jsonify({'error': 'Email is not valid.'}), 400 
    user.firstname = firstname
    user.lastname = lastname
    user.email = email
    try:
        db.session.commit()
    except IntegrityError: 
        db.session.rollback()
        return jsonify({'error': 'Email already exists.'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': e}), 500 
    return jsonify({'message': 'User successfully updated.'}), 200

@app.route('/api/user/<user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    jwt_user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({'error': f'User {user_id} not found'}), 400
    if user.id != jwt_user_id:
        return jsonify({'error': 'You can\'t delete someone else\'s profile.'}), 401
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': f'User {user_id} deleted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': e}), 500 

@app.route('/api/user/<user_id>/password', methods=['PATCH'])
@jwt_required()
def modify_user_password(user_id):
    new_password_json = request.get_json()
    if not new_password_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if has_empty_fields('currentPassword', 'newPassword', 'confirmPassword', req_json=new_password_json):
        return jsonify({'error': 'You can\'t have an empty field.'}), 400
    current_password = new_password_json['currentPassword']
    password = new_password_json['newPassword']
    password2 = new_password_json['confirmPassword']
    user = User.query.filter_by(id=user_id).first()
    jwt_user_id = get_jwt_identity()
    if user is None:
        return jsonify({'error': f'User {user_id} not found'}), 400
    if user.id != jwt_user_id:
        return jsonify({'error': 'You can\'t edit someone else\'s password.'}), 401
    if not check_verify_password(password, password2):
        return jsonify({'error': 'Your passwords don\'t match.'}), 400 
    if not check_valid_password(password):
        return jsonify({'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number.'}), 400
    if not check_password_hash(user.hashed_password, current_password):
        return jsonify({'error': 'Your current password is incorrect.'}), 400
    if check_password_hash(user.hashed_password, password):
        return jsonify({'error': 'New password must be different from your current one.'}), 400
    user.hashed_password = generate_password_hash(password)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': e}), 500 
    return jsonify({'message': 'Password successfully updated.'}), 200

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def validate_token():
    user_id = get_jwt_identity()
    return jsonify({'message': f'{user_id} authorized.'}), 200

if __name__ == '__main__':
    with app.app_context():
        #db.drop_all()
        db.create_all()
        app.run(debug=True)