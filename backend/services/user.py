from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash

from backend.repositories.user import get_user_by_id, get_user_by_email, get_user_by_token, create_user, modify_user, delete_user, change_password, reset_password, send_reset_password_link
from backend.utils.decorator import validate_user_json

@validate_user_json("is_login_json_valid", 'user')
def login_service(login_json):
    user = get_user_by_email(login_json['email'])
    if user is None or not check_password_hash(user.hashed_password, login_json['password']):
        return {'user': None, 'message': 'Invalid credentials', 'status_code': 401}
    if isinstance(user, Exception):
        return {'user': None, 'message': 'Server error: please try again', 'status_code': 500}
    return {'user': user.to_dict(), 'message': 'Login success', 'status_code': 200}

@validate_user_json("is_signup_json_valid")
def create_user_service(signup_json):
    firstname = signup_json['firstname']
    lastname = signup_json['lastname']
    email = signup_json['email']
    password = signup_json['password']
    created_user = create_user(firstname, lastname, email,
                           generate_password_hash(password))
    if isinstance(created_user, IntegrityError):
        return {'error': True, 'message': 'Email already exists', 'status_code': 409}
    if isinstance(created_user, Exception):
        return {'error': True, 'message': 'Server error: please try again', 'status_code': 500}
    return {'error': False, 'message': 'User successfully created', 'status_code': 201}

def get_logged_in_user_service(jwt_user_id):
    user = get_user_by_id(jwt_user_id)
    if isinstance(user, Exception):
        return {'user': None, 'message': 'Server error: please try again', 'status_code': 500}
    return {'user': user.to_dict(), 'message': 'User successfully fetched', 'status_code': 200}

@validate_user_json("is_modify_user_json_valid", "modified_user")
def modify_user_service(modified_user_json, user_id, jwt_user_id):
    user = get_user_by_id(user_id)
    if user is None:
        return {'modified_user': None, 'message': 'User not found', 'status_code': 404}
    if user.id != jwt_user_id:
        return {'modified_user': None, 'message': 'Access denied', 'status_code': 403}

    modified_user = modify_user(user, modified_user_json)
    if isinstance(modified_user, IntegrityError):
        return {'modified_user': None, 'message': 'Email already exists', 'status_code': 409}
    if isinstance(modified_user, Exception):
        return {'modified_user': None, 'message': 'Server error: please try again', 'status_code': 500}

    return {'modified_user': modified_user, 'message': 'User successfully modified', 'status_code': 200}

def delete_user_service(user_id, jwt_user_id):
    user = get_user_by_id(user_id)
    if user is None:
        return {'error': True, 'message': 'User not found', 'status_code': 404}
    if user.id != jwt_user_id:
        return {'error': True, 'message': 'Access denied', 'status_code': 403}

    status = delete_user(user)
    if isinstance(status, Exception):
        return {'error': True, 'message': 'Server error: please try again', 'status_code': 500}
    return {'error': False, 'message': 'User successfully deleted', 'status_code': 200}

@validate_user_json("is_change_password_json_valid")
def change_password_service(change_password_json, user_id, jwt_user_id):
    user = get_user_by_id(user_id)
    if user is None:
        return {'error': True, 'message': 'User not found', 'status_code': 404}
    if user.id != jwt_user_id:
        return {'error': True, 'message': 'Access denied', 'status_code': 403}

    current_password = change_password_json['passwordCurrent']
    password = change_password_json['passwordNew']
    if not check_password_hash(user.hashed_password, current_password):
        return {'error': True, 'message': 'Incorrect password', 'status_code': 403}
    if check_password_hash(user.hashed_password, password):
        return {'error': True, 'message': 'New password must be different from your current one', 'status_code': 400}

    modified_user = change_password(user, generate_password_hash(password))
    if isinstance(modified_user, Exception):
        return {'error': True, 'message': 'Server error: please try again', 'status_code': 500}
    return {'error': False, 'message': 'Password successfully updated', 'status_code': 200}

@validate_user_json("is_send_reset_password_link_json_valid")
def send_reset_password_link_service(forgot_password_json):
    email = forgot_password_json['email']
    user = get_user_by_email(email)
    if user is None:
        return {'error': True, 'message': 'User not found', 'status_code': 404}
        
    user = send_reset_password_link(user)
    if isinstance(user, Exception):
        return {'error': True, 'message': 'Server error: please try again', 'status_code': 500}
    return {'error': False, 'message': 'Email successfully sent', 'status_code': 200}

@validate_user_json("is_reset_password_json_valid")
def reset_password_service(reset_password_json, token):
    user = get_user_by_token(token)
    if user is None:
        return {'error': True, 'message': 'User not found', 'status_code': 404}

    password = reset_password_json['password']
    if check_password_hash(user.hashed_password, password):
        return {'error': True, 'message': 'New password must be different from your original one', 'status_code': 400}
        
    modified_user = reset_password(user, generate_password_hash(password))
    if isinstance(modified_user, Exception):
        return {'error': True, 'message': 'Server error: please try again', 'status_code': 500}
    return {'error': False, 'message': 'Password successfully updated', 'status_code': 200}

def verify_reset_password_token_service(token):
    user = get_user_by_token(token)
    if user is None:
        return {'error': True, 'message': 'Token not found', 'status_code': 404}
    if not user.reset_password_token:
        return {'error': True, 'message': 'Token expired', 'status_code': 403}
    if isinstance(user, Exception):
        return {'error': True, 'message': 'Server error: please try again', 'status_code': 500}
    return {'error': False, 'message': f'Token found for {user.id}', 'status_code': 200}
