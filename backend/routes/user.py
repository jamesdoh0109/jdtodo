from flask import jsonify, request, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from backend.app import db
from backend.models.user import User
from backend.utils.utils import has_empty_fields, check_valid_email, check_verify_password, check_valid_password
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError

user =  Blueprint('user', __name__)

@user.route('/api/user/<user_id>/details', methods=['PATCH'])
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

@user.route('/api/user/<user_id>', methods=['DELETE'])
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

@user.route('/api/user/<user_id>/password', methods=['PATCH'])
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
