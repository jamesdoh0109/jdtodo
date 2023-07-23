from flask import request, jsonify, Blueprint
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import IntegrityError
from backend.data_managers.user import get_user_by_id, modify_user, delete_user
from backend.utils.utils import has_empty_fields, check_valid_email

user =  Blueprint('user', __name__)

@user.route('/api/user/<user_id>', methods=['PATCH'])
@jwt_required()
def modify_user_route(user_id):
    jwt_user_id = get_jwt_identity()
    modified_user_json = request.get_json()
    if not modified_user_json:
        return jsonify({'error': 'Missing request body'}), 400
    if has_empty_fields('firstname', 'lastname', 'email', req_json=modified_user_json):
        return jsonify({'error': 'All fields are required'}), 400
    user = get_user_by_id(user_id)
    if user is None:
        return jsonify({'error': f'User not found'}), 404
    if user.id != jwt_user_id:
        return jsonify({'error': 'Access denied'}), 403
    if not check_valid_email(modified_user_json['email']):
        return jsonify({'error': 'Please enter a valid email'}), 400
    modified_user = modify_user(user, modified_user_json)
    if isinstance(modified_user, IntegrityError):
        return jsonify({'error': 'Email already exists'}), 409
    if isinstance(modified_user, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': 'User successfully updated'}), 200

@user.route('/api/user/<user_id>', methods=['DELETE'])
@jwt_required()
def delete_user_route(user_id):
    jwt_user_id = get_jwt_identity()
    user = get_user_by_id(user_id)
    if user is None:
        return jsonify({'error': f'User not found'}), 404
    if user.id != jwt_user_id:
        return jsonify({'error': 'Access denied'}), 403
    deleted_user = delete_user(user)
    if isinstance(deleted_user, Exception):
        return jsonify({'error': 'Server error: please try again'}), 500
    return jsonify({'message': 'User deleted successfully'}), 200
