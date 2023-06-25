from setup import app, db, mail
from models import *
from flask import jsonify, request, session, make_response
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_mail import Message
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from tzlocal import get_localzone
import re
import pytz
import jwt

def has_empty_fields(*args, req_json):
    for field in args:
        if field not in req_json or not req_json[field].strip():
            return True
    return False

def check_valid_email(email):
    regex = r'[^@]+@[^@]+\.[^@]+'
    return re.fullmatch(regex, email)

def check_verify_password(password, password2):
    return password == password2

def check_valid_password(password):
    return (len(password) >= 8 and any([c.isupper() for c in password]) and any([c.isdigit() for c in password]))

@app.route('/api/login', methods=['POST'])
def login():
    login_json = request.get_json()
    if not login_json or has_empty_fields('email', 'password', req_json=login_json):
        return jsonify({'error': 'Missing request body or required fields.'}), 400
    email = login_json['email']
    password = login_json['password']
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'error': 'User does not exist.'}), 404
    if not check_password_hash(user.hashed_password, password):
        return jsonify({'error': 'Incorrect password.'}), 401
    user_obj = {'id': user.id, 'firstname': user.firstname,
                'lastname': user.lastname, 'email': user.email}
    access_token = create_access_token(identity=user.id)
    return jsonify({'message': 'Login success.', 'access_token': access_token, 'user': user_obj}), 200

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
    new_user = User(firstname, lastname, email,
                    generate_password_hash(password))
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Email already exists.'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    return jsonify({'message': 'User successfully created.'}), 201

@app.route('/api/projects', methods=['GET'])
@jwt_required()
def get_projects():
    user_id = get_jwt_identity()
    projects = Project.query.filter_by(user_id=user_id)
    project_list = [{'proj_id': proj.id, 'proj_name': proj.name,
                     'date_created': proj.date_created} for proj in projects]
    return jsonify({'projects': project_list}), 200

@app.route('/api/projects', methods=['POST'])
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

@app.route('/api/projects/<proj_id>', methods=['PATCH'])
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

@app.route('/api/projects/<proj_id>', methods=['DELETE'])
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

@app.route('/api/<proj_id>/tasks', methods=['GET'])
@jwt_required()
def get_tasks_for_project(proj_id):
    user_id = get_jwt_identity()
    project = Project.query.filter_by(id=proj_id).first()
    if project is None:
        return jsonify({'error': f'Project {proj_id} not found'}), 404
    if project.user_id != user_id:
        return jsonify({'error': 'You can\'t access someone else\'s project.'}), 403
    tasks = Task.query.filter_by(proj_id=proj_id).all()
    task_list = [
        {
            'task_id': task.id,
            'task_name': task.name,
            'task_deadline': task.deadline,
            'task_status': task.status,
            'task_description': task.description,
            'task_is_done': task.is_done,
        }
        for task in tasks
    ]
    return ({'tasks': task_list}), 200

# use this helper function to convert the deadline in user's timezone to deadline in system timezone
def convert_datetime_into_system_datetime(user_date_time, user_timezone):
    date_obj = datetime.strptime(user_date_time, "%Y-%m-%dT%H:%M")

    # Assign it the input timezone
    input_tz = pytz.timezone(user_timezone)  # Replace with your input timezone
    date_obj = input_tz.localize(date_obj)

    # Get the system's local timezone
    local_tz = get_localzone()

    # Convert it to the system's local timezone
    local_date_obj = date_obj.astimezone(local_tz)

    return local_date_obj

@app.route('/api/<proj_id>/tasks', methods=['POST'])
@jwt_required()
def create_task(proj_id):
    user_id = get_jwt_identity()
    project = Project.query.filter_by(id=proj_id).first()
    if project is None:
        return jsonify({'error': f'Project {proj_id} not found'}), 404
    if project.user_id != user_id:
        return jsonify({'error': 'You can\'t access someone else\'s project.'}), 403
    new_task_json = request.get_json()
    if not new_task_json or has_empty_fields('name', 'deadline', 'status', 'user_time_zone', req_json=new_task_json):
        return jsonify({'error': 'Missing or incomplete task data.'}), 400
    deadline_in_system_time = convert_datetime_into_system_datetime(new_task_json['deadline'], new_task_json['user_time_zone'])
    task = Task(new_task_json['name'], deadline_in_system_time, new_task_json['status'], proj_id)
    if 'description' in new_task_json and new_task_json['description'] != "":
        task.description = new_task_json['description']
    try:
        db.session.add(task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    task_obj = {'task_id': task.id, 'task_name': task.name, 'task_deadline': task.deadline,
                'task_description': task.description, 'task_status': task.status, 'task_is_done': task.is_done}
    return jsonify({'message': 'Task successfully created.', 'task': task_obj}), 201

@app.route('/api/tasks/<task_id>', methods=['PATCH'])
@jwt_required()
def modify_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id).first()
    if task is None:
        return jsonify({'error': f'Task {task_id} not found'}), 400
    if task.project.user_id != user_id:
        return jsonify({'error': 'You can\'t edit someone else\'s task.'}), 403
    updated_task_json = request.get_json()
    for field in ['name', 'deadline', 'status', 'description', 'is_done']:
        if field in updated_task_json and getattr(task, field) != updated_task_json[field]:
            if field == 'deadline':
                setattr(task, field, convert_datetime_into_system_datetime(updated_task_json[field], updated_task_json['user_time_zone']))
            else:
                setattr(task, field, updated_task_json[field])
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    return jsonify({'message': 'Task successfully updated.'}), 200

@app.route('/api/tasks/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id).first()
    if task is None:
        return jsonify({'error': f'Task {task_id} not found'}), 400
    if task.project.user_id != user_id:
        return jsonify({'error': 'You can\'t delete someone else\'s task.'}), 403
    try:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': f'Task {task_id} deleted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/<user_id>/details', methods=['PATCH'])
@jwt_required()
def modify_user_details(user_id):
    new_user_json = request.get_json()
    if not new_user_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if has_empty_fields('firstname', 'lastname', 'email', req_json=new_user_json):
        return jsonify({'error': 'You can\'t have an empty field.'}), 400
    user = User.query.filter_by(id=user_id).first()
    jwt_user_id = get_jwt_identity()
    if user is None:
        return jsonify({'error': f'User {user_id} not found'}), 404
    if user.id != jwt_user_id:
        return jsonify({'error': 'You can\'t edit someone else\'s profile.'}), 403
    if not check_valid_email(new_user_json['email']):
        return jsonify({'error': 'Email is not valid.'}), 400
    user.firstname = new_user_json['firstname']
    user.lastname = new_user_json['lastname']
    user.email = new_user_json['email']
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Email already exists.'}), 409
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    return jsonify({'message': 'User successfully updated.'}), 200

@app.route('/api/user/<user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    jwt_user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({'error': f'User {user_id} not found'}), 404
    if user.id != jwt_user_id:
        return jsonify({'error': 'You can\'t delete someone else\'s profile.'}), 403
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': f'User {user_id} deleted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

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
        return jsonify({'error': f'User {user_id} not found'}), 404
    if user.id != jwt_user_id:
        return jsonify({'error': 'You can\'t edit someone else\'s password.'}), 403
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
        return jsonify({'error': str(e)}), 500
    return jsonify({'message': 'Password successfully updated.'}), 200

def send_reset_email(user):
    token = user.get_reset_token()
    user.reset_password_token = token
    link = f"https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-3000.preview.app.github.dev/reset-password/{token}"
    body = f'<p>Hello {user.firstname} {user.lastname}!<br><br>To reset your password, please click <a href="{link}">here</a>. If you did not make this request, then simply ignore this email, and no changes will be made.<br><br>Thanks,<br>JDTodo</p>'
    msg = Message('Password Reset Request',
                  sender=("JDTodo", "noreply@jdtodo.com"),
                  recipients=[user.email],
                  html=body)
    mail.send(msg)

def send_reset_confirm_email(user):
    link = "https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-3000.preview.app.github.dev/login"
    body = f'<p>Hello {user.firstname} {user.lastname}!<br><br>You have successfully updated your password. To log in, please click <a href="{link}">here</a>.<br><br>Thanks,<br>JDTodo</p>'
    msg = Message('Password Changed',
                  sender=("JDTodo", "noreply@jdtodo.com"),
                  recipients=[user.email],
                  html=body)
    mail.send(msg)

# sending email with link to reset password for a given user
@app.route('/api/forgot_password', methods=['POST'])
def reset_request():
    forgot_password_json = request.get_json()
    if not forgot_password_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if has_empty_fields('email', req_json=forgot_password_json):
        return jsonify({'error': 'Email is required.'}), 400
    email = forgot_password_json['email']
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'error': f'User not found.'}), 404
    try:
        send_reset_email(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Email could not be sent. Please try again.'}), 500
    return jsonify({'message': 'Email successfully sent.'}), 200

@app.route('/api/reset_password/<token>', methods=['PATCH'])
def reset_password(token):
    reset_password_json = request.get_json()
    if not reset_password_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if has_empty_fields('password', 'password2', req_json=reset_password_json):
        return jsonify({'error': 'Both fields are required.'}), 400
    password = reset_password_json['password']
    password2 = reset_password_json['password2']
    user = User.verify_reset_token(token)
    if user is None:
        return jsonify({'error': f'User {user.id} not found'}), 404
    if not check_verify_password(password, password2):
        return jsonify({'error': 'Your passwords don\'t match.'}), 400
    if not check_valid_password(password):
        return jsonify({'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number.'}), 400
    if check_password_hash(user.hashed_password, password):
        return jsonify({'error': 'New password must be different from your original one.'}), 400
    user.hashed_password = generate_password_hash(password)
    user.reset_password_token = None
    try:
        send_reset_confirm_email(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    return jsonify({'message': 'Password successfully updated.'}), 200

@app.route('/api/verify_reset_password_token/<token>', methods=['GET'])
def verify_reset_password_token(token):
    user = User.verify_reset_token(token)
    if user is None:
        return jsonify({'error': 'Token not found'}), 404 
    if not user.reset_password_token:
        return jsonify({'error': 'Token expired.'}), 403
    return jsonify({'message': f'Token found for {user.id}'}), 200

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
