from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, unset_jwt_cookies, create_access_token, set_access_cookies

from backend.services.user import login_service, create_user_service, modify_user_service, delete_user_service, change_password_service, send_reset_password_link_service, reset_password_service, verify_reset_password_token_service
from backend.utils.utils import check_error_and_return_json_response

user = Blueprint('user', __name__)

@user.route('/api/login', methods=['POST'])
def login_route():
    login_json = request.get_json()
    user, message, status_code = login_service(login_json).values()
    if user:
        resp = jsonify({'user': user, 'message': message})
        access_token = create_access_token(identity=user['id'])
        set_access_cookies(resp, access_token)
        return resp, status_code
    else:
        return jsonify({'error': message}), status_code

@user.route("/api/logout", methods=["POST"])
def logout():
    resp = jsonify({"message": "Logout success"})
    unset_jwt_cookies(resp)
    return resp, 200

@user.route('/api/signup', methods=['POST'])
def signup_route():
    signup_json = request.get_json()
    error, message, status_code = create_user_service(signup_json).values()
    return check_error_and_return_json_response(error, message, status_code)

@user.route('/api/user/<user_id>', methods=['PATCH'])
@jwt_required()
def modify_user_route(user_id):
    jwt_user_id = get_jwt_identity()
    modified_user_json = request.get_json()
    modified_user, message, status_code = modify_user_service(modified_user_json, user_id, jwt_user_id).values()
    if modified_user:
        return jsonify({'user': modified_user, 'message': message}), status_code
    else:
        return jsonify({'error': message}), status_code

@user.route('/api/user/<user_id>', methods=['DELETE'])
@jwt_required()
def delete_user_route(user_id):
    jwt_user_id = get_jwt_identity()
    error, message, status_code = delete_user_service(user_id, jwt_user_id).values()
    if not error:
        resp = jsonify({'message': message})
        unset_jwt_cookies(resp)
        return resp, status_code
    else:
        return jsonify({'error': message}), status_code

@user.route('/api/change_password/<user_id>', methods=['PATCH'])
@jwt_required()
def change_password_route(user_id):
    jwt_user_id = get_jwt_identity()
    change_password_json = request.get_json()
    error, message, status_code = change_password_service(change_password_json, user_id, jwt_user_id).values()
    return check_error_and_return_json_response(error, message, status_code)

@user.route('/api/forgot_password', methods=['POST'])
def send_reset_password_link_route():
    forgot_password_json = request.get_json()
    error, message, status_code = send_reset_password_link_service(forgot_password_json).values()
    return check_error_and_return_json_response(error, message, status_code)

@user.route('/api/reset_password/<token>', methods=['PATCH'])
def reset_password_route(token):
    reset_password_json = request.get_json()
    error, message, status_code = reset_password_service(reset_password_json, token).values()
    return check_error_and_return_json_response(error, message, status_code)

@user.route('/api/verify_reset_password_token/<token>', methods=['GET'])
def verify_reset_password_token_route(token):
    error, message, status_code = verify_reset_password_token_service(token).values()
    return check_error_and_return_json_response(error, message, status_code)

@user.route('/api/protected', methods=['GET'])
@jwt_required()
def validate_token_route():
    user_id = get_jwt_identity()
    return jsonify({'message': 'User authorized'}), 200
