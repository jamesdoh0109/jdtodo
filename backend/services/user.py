from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash

from backend.repositories.user import get_user_by_id, get_user_by_email, get_user_by_token, create_user, modify_user, delete_user, change_password, reset_password, send_reset_password_link
from backend.utils.decorator import validate_user_json, handle_exceptions
from backend.utils.exceptions import BadRequestException, UnauthorizedException, NotFoundException, AccessDeniedException, ServerException, IntegrityException

def _check_different_password_from_original(hashed_password, password):
    if check_password_hash(hashed_password, password):
        raise BadRequestException('New password must be different from your current one')

def _check_user_exists(user):
    if user is None:
        raise NotFoundException("User not found")

def _check_valid_credentials(user, password):
    if user is None or not check_password_hash(user.hashed_password, password):
        raise UnauthorizedException()

def _check_user_ownership(user_id, jwt_user_id):
    if user_id != jwt_user_id:
        raise AccessDeniedException("Access denied")

def _check_correct_password(hashed_password, current_password):
    if not check_password_hash(hashed_password, current_password):
        raise AccessDeniedException('Incorrect password')

def _check_token_expired(token):
    if not user.reset_password_token:
        raise AccessDeniedException('Token expired')

def _check_server_error(user):
    if isinstance(user, Exception):
        raise ServerException()

def _check_integrity_error(user):
    if isinstance(user, IntegrityError):
        raise IntegrityException("Email already exists")

@handle_exceptions('user')
@validate_user_json("is_login_json_valid", 'user')
def login_service(login_json):
    user = get_user_by_email(login_json['email'])

    _check_server_error(user)
    _check_valid_credentials(user, login_json['password'])

    return {'user': user.to_dict(), 'message': 'Login success', 'status_code': 200}

@handle_exceptions('user')
@validate_user_json("is_signup_json_valid")
def create_user_service(signup_json):
    firstname = signup_json['firstname']
    lastname = signup_json['lastname']
    email = signup_json['email']
    password = signup_json['password']
    created_user = create_user(firstname, lastname, email,
                           generate_password_hash(password))

    _check_integrity_error(created_user)
    _check_server_error(created_user)

    return {'user': created_user, 'message': 'User successfully created', 'status_code': 201}

@handle_exceptions('user')
def get_logged_in_user_service(jwt_user_id):
    user = get_user_by_id(jwt_user_id)
    
    _check_server_error(user)

    return {'user': user.to_dict(), 'message': 'User successfully fetched', 'status_code': 200}

@handle_exceptions('user')
@validate_user_json("is_modify_user_json_valid", "modified_user")
def modify_user_service(modified_user_json, user_id, jwt_user_id):
    user = get_user_by_id(user_id)

    _check_user_exists(user)
    _check_user_ownership(user.id, jwt_user_id)

    modified_user = modify_user(user, modified_user_json)

    _check_integrity_error(modified_user)
    _check_server_error(modified_user)

    return {'user': modified_user, 'message': 'User successfully modified', 'status_code': 200}

@handle_exceptions('user')
def delete_user_service(user_id, jwt_user_id):
    user = get_user_by_id(user_id)
    _check_user_exists(user)
    _check_user_ownership(user.id, jwt_user_id)

    deleted_user = delete_user(user)
    _check_server_error(deleted_user)

    return {'user': deleted_user, 'message': 'User successfully deleted', 'status_code': 200}

@handle_exceptions('user')
@validate_user_json("is_change_password_json_valid")
def change_password_service(change_password_json, user_id, jwt_user_id):
    user = get_user_by_id(user_id)
    _check_user_exists(user)
    _check_user_ownership(user.id, jwt_user_id)

    current_password = change_password_json['passwordCurrent']
    password = change_password_json['passwordNew']
    _check_correct_password(user.hashed_password, current_password)
    _check_different_password_from_original(user.hashed_password, password)
    
    modified_user = change_password(user, generate_password_hash(password))
    _check_server_error(modified_user)

    return {'user': modified_user, 'message': 'Password successfully updated', 'status_code': 200}

@handle_exceptions('user')
@validate_user_json("is_send_reset_password_link_json_valid")
def send_reset_password_link_service(forgot_password_json):
    email = forgot_password_json['email']

    user = get_user_by_email(email)
    _check_user_exists(user)
        
    user = send_reset_password_link(user)
    _check_server_error(user)

    return {'user': user, 'message': 'Email successfully sent', 'status_code': 200}

@handle_exceptions('user')
@validate_user_json("is_reset_password_json_valid")
def reset_password_service(reset_password_json, token):
    user = get_user_by_token(token)
    _check_user_exists(user)

    password = reset_password_json['password']
    _check_different_password_from_original(user.hashed_password, password)
        
    modified_user = reset_password(user, generate_password_hash(password))
    _check_server_error(modified_user)

    return {'user': modified_user, 'message': 'Password successfully updated', 'status_code': 200}

@handle_exceptions('user')
def verify_reset_password_token_service(token):
    user = get_user_by_token(token)

    _check_user_exists(user)
    _check_token_expired(user.reset_password_token)
    _check_server_error(user)

    return {'user': user, 'message': f'Token found for {user.id}', 'status_code': 200}
