from flask import request, jsonify, Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models.user import User
from backend.data_managers.auth import signup, change_password, reset_password, send_reset_password_link
from backend.data_managers.user import get_user_by_id, get_user_by_email, get_user_by_token
from backend.validators.auth import AuthValidator
 
auth =  Blueprint('auth', __name__)

@auth.route('/api/login', methods=['POST'])
def login_route():
    login_json = request.get_json()
    validator = AuthValidator()
    if not validator.validate_login_inputs(login_json):
        return jsonify({'error': validator.error}), 400
    email = login_json['email']
    password = login_json['password']
    user = get_user_by_email(email)
    if user is None:
        return jsonify({'error': 'User does not exist'}), 404
    if not check_password_hash(user.hashed_password, password):
        return jsonify({'error': 'Incorrect password'}), 401
    user_obj = {'id': user.id, 'firstname': user.firstname,
                'lastname': user.lastname, 'email': user.email}
    access_token = create_access_token(identity=user.id)
    #refresh_token = create_refresh_token(identity=user.id)
    #resp = jsonify({'message': 'Login success', 'user': user_obj})
    #set_access_cookies(resp, access_token)
    #set_refresh_cookies(resp, refresh_token)
    #return resp, 200
    return jsonify({'message': 'Login success', 'access_token': access_token, 'user': user_obj}), 200

@auth.route('/api/signup', methods=['POST'])
def signup_route():
    signup_json = request.get_json()
    validator = AuthValidator()
    if not validator.validate_signup_inputs(signup_json):
        return jsonify({'error': validator.error}), 400
    firstname = signup_json['firstname']
    lastname = signup_json['lastname']
    email = signup_json['email']
    password = signup_json['password']
    new_user = signup(firstname, lastname, email, generate_password_hash(password))
    if isinstance(new_user, IntegrityError):
        return jsonify({'error': 'Email already exists'}), 409
    if isinstance(new_user, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': 'User successfully created'}), 201

@auth.route('/api/change_password/<user_id>', methods=['PATCH'])
@jwt_required()
def change_password_route(user_id):
    jwt_user_id = get_jwt_identity()
    change_password_json = request.get_json()
    validator = AuthValidator()
    if not validator.validate_change_password_inputs(change_password_json):
        return jsonify({'error': validator.error}), 400
    user = get_user_by_id(user_id)
    if user is None:
        return jsonify({'error': f'User {user_id} not found'}), 404
    if user.id != jwt_user_id:
        return jsonify({'error': 'You can\'t edit someone else\'s password.'}), 403
    current_password = change_password_json['passwordCurrent']
    password = change_password_json['passwordNew']
    if not check_password_hash(user.hashed_password, current_password):
        return jsonify({'error': 'Your current password is incorrect'}), 400
    if check_password_hash(user.hashed_password, password):
        return jsonify({'error': 'New password must be different from your current one'}), 400
    modified_user = change_password(user, generate_password_hash(password))
    if isinstance(modified_user, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': 'Password successfully updated'}), 200

# sending email with link to reset password for a given user
@auth.route('/api/forgot_password', methods=['POST'])
def send_reset_password_link_route():
    forgot_password_json = request.get_json()
    validator = AuthValidator()
    if not validator.validate_send_reset_password_link_input(forgot_password_json):
        return jsonify({'error': validator.error}), 400
    email = forgot_password_json['email']
    user = get_user_by_email(email)
    if user is None:
        return jsonify({'error': f'User not found'}), 404
    user = send_reset_password_link(user)
    if isinstance(user, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': 'Email successfully sent'}), 200

@auth.route('/api/reset_password/<token>', methods=['PATCH'])
def reset_password_route(token):
    reset_password_json = request.get_json()
    validator = AuthValidator()
    if not validator.validate_reset_password_inputs(reset_password_json):
        return jsonify({'error': validator.error}), 400
    user = get_user_by_token(token)
    if user is None:
        return jsonify({'error': f'User {user.id} not found'}), 404
    password = reset_password_json['password']
    if check_password_hash(user.hashed_password, password):
        return jsonify({'error': 'New password must be different from your original one'}), 400
    modified_user = reset_password(user, generate_password_hash(password))
    if isinstance(modified_user, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': 'Password successfully updated'}), 200

@auth.route('/api/verify_reset_password_token/<token>', methods=['GET'])
def verify_reset_password_token_route(token):
    user = get_user_by_token(token)
    if user is None:
        return jsonify({'error': 'Token not found'}), 404 
    if not user.reset_password_token:
        return jsonify({'error': 'Token expired'}), 403
    return jsonify({'message': f'Token found for {user.id}'}), 200

@auth.route('/api/protected', methods=['GET'])
@jwt_required()
def validate_token_route():
    user_id = get_jwt_identity()
    return jsonify({'message': f'{user_id} authorized'}), 200