from flask import jsonify, request, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from backend.app import db
from backend.models.user import User
from backend.utils.utils import has_empty_fields, check_valid_email, check_verify_password, check_valid_password, send_reset_email, send_reset_confirm_email

auth =  Blueprint('auth', __name__)

@auth.route('/api/login', methods=['POST'])
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

@auth.route('/api/signup', methods=['POST'])
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

# sending email with link to reset password for a given user
@auth.route('/api/forgot_password', methods=['POST'])
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

@auth.route('/api/reset_password/<token>', methods=['PATCH'])
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

@auth.route('/api/verify_reset_password_token/<token>', methods=['GET'])
def verify_reset_password_token(token):
    user = User.verify_reset_token(token)
    if user is None:
        return jsonify({'error': 'Token not found'}), 404 
    if not user.reset_password_token:
        return jsonify({'error': 'Token expired.'}), 403
    return jsonify({'message': f'Token found for {user.id}'}), 200

@auth.route('/api/protected', methods=['GET'])
@jwt_required()
def validate_token():
    user_id = get_jwt_identity()
    return jsonify({'message': f'{user_id} authorized.'}), 200
