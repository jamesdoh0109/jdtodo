from flask import request, jsonify, Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models.user import User
from backend.data_managers.auth import signup, change_password, reset_password, send_reset_password_link
from backend.data_managers.user import get_user_by_id, get_user_by_email, get_user_by_token
from backend.utils.utils import has_empty_fields, check_valid_email, check_verify_password, check_valid_password
 
auth =  Blueprint('auth', __name__)

@auth.route('/api/login', methods=['POST'])
def login_route():
    login_json = request.get_json()
    if not login_json or has_empty_fields('email', 'password', req_json=login_json):
        return jsonify({'error': 'Missing request body or required fields.'}), 400
    email = login_json['email']
    password = login_json['password']
    user = get_user_by_email(email)
    if user is None:
        return jsonify({'error': 'User does not exist.'}), 404
    if not check_password_hash(user.hashed_password, password):
        return jsonify({'error': 'Incorrect password.'}), 401
    user_obj = {'id': user.id, 'firstname': user.firstname,
                'lastname': user.lastname, 'email': user.email}
    access_token = create_access_token(identity=user.id)
    return jsonify({'message': 'Login success.', 'access_token': access_token, 'user': user_obj}), 200

@auth.route('/api/signup', methods=['POST'])
def signup_route():
    new_user_json = request.get_json()
    if not new_user_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if has_empty_fields('firstname', 'lastname', 'email', 'password', 'password2', req_json=new_user_json):
        return jsonify({'error': 'All 5 fields are required.'}), 400
    firstname = new_user_json['firstname']
    lastname = new_user_json['lastname']
    email = new_user_json['email']
    password = new_user_json['password']
    password_confirm = new_user_json['password2']
    if not check_valid_email(email):
        return jsonify({'error': 'Email is not valid.'}), 400
    if not check_verify_password(password, password_confirm):
        return jsonify({'error': 'Your passwords don\'t match.'}), 400
    if not check_valid_password(password):
        return jsonify({'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number.'}), 400
    new_user = signup(firstname, lastname, email, generate_password_hash(password))
    if isinstance(new_user, IntegrityError):
        return jsonify({'error': 'Email already exists.'}), 409
    if isinstance(new_user, Exception):
        return jsonify({'error': 'Could not sign up.'}), 500
    return jsonify({'message': 'User successfully created.'}), 201

@auth.route('/api/change_password/<user_id>', methods=['PATCH'])
@jwt_required()
def change_password_route(user_id):
    jwt_user_id = get_jwt_identity()
    new_password_json = request.get_json()
    if not new_password_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if has_empty_fields('currentPassword', 'newPassword', 'confirmPassword', req_json=new_password_json):
        return jsonify({'error': 'You can\'t have an empty field.'}), 400
    user = get_user_by_id(user_id)
    if user is None:
        return jsonify({'error': f'User {user_id} not found'}), 404
    if user.id != jwt_user_id:
        return jsonify({'error': 'You can\'t edit someone else\'s password.'}), 403
    current_password = new_password_json['currentPassword']
    password = new_password_json['newPassword']
    password_confirm = new_password_json['confirmPassword']
    if not check_verify_password(password, password_confirm):
        return jsonify({'error': 'Your passwords don\'t match.'}), 400
    if not check_valid_password(password):
        return jsonify({'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number.'}), 400
    if not check_password_hash(user.hashed_password, current_password):
        return jsonify({'error': 'Your current password is incorrect.'}), 400
    if check_password_hash(user.hashed_password, password):
        return jsonify({'error': 'New password must be different from your current one.'}), 400
    modified_user = change_password(user, generate_password_hash(password))
    if isinstance(modified_user, Exception):
        return jsonify({'error': str(e)}), 500
    return jsonify({'message': 'Password successfully updated.'}), 200

# sending email with link to reset password for a given user
@auth.route('/api/forgot_password', methods=['POST'])
def send_reset_password_link_route():
    forgot_password_json = request.get_json()
    if not forgot_password_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if has_empty_fields('email', req_json=forgot_password_json):
        return jsonify({'error': 'Email is required.'}), 400
    email = forgot_password_json['email']
    user = get_user_by_email(email)
    if user is None:
        return jsonify({'error': f'User not found.'}), 404
    modified_user = send_reset_password_link(user)
    if isinstance(modified_user, Exception):
        return jsonify({'error': 'Email could not be sent. Please try again.'}), 500
    return jsonify({'message': 'Email successfully sent.'}), 200

@auth.route('/api/reset_password/<token>', methods=['PATCH'])
def reset_password_route(token):
    reset_password_json = request.get_json()
    if not reset_password_json:
        return jsonify({'error': 'Missing request body.'}), 400
    if has_empty_fields('password', 'password2', req_json=reset_password_json):
        return jsonify({'error': 'Both fields are required.'}), 400
    user = get_user_by_token(token)
    if user is None:
        return jsonify({'error': f'User {user.id} not found'}), 404
    password = reset_password_json['password']
    password_confirm = reset_password_json['password2']
    if not check_verify_password(password, password_confirm):
        return jsonify({'error': 'Your passwords don\'t match.'}), 400
    if not check_valid_password(password):
        return jsonify({'error': 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number.'}), 400
    if check_password_hash(user.hashed_password, password):
        return jsonify({'error': 'New password must be different from your original one.'}), 400
    modified_user = reset_password(user, generate_password_hash(password))
    if isinstance(modified_user, Exception):
        return jsonify({'error': 'Could not reset password.'}), 500
    return jsonify({'message': 'Password successfully updated.'}), 200

@auth.route('/api/verify_reset_password_token/<token>', methods=['GET'])
def verify_reset_password_token_route(token):
    user = get_user_by_token(token)
    if user is None:
        return jsonify({'error': 'Token not found'}), 404 
    if not user.reset_password_token:
        return jsonify({'error': 'Token expired.'}), 403
    return jsonify({'message': f'Token found for {user.id}'}), 200

@auth.route('/api/protected', methods=['GET'])
@jwt_required()
def validate_token_route():
    user_id = get_jwt_identity()
    return jsonify({'message': f'{user_id} authorized.'}), 200