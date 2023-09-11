from datetime import datetime

from flask import jsonify
from flask_mail import Message
from tzlocal import get_localzone
import pytz

from backend.app import mail 

BASE_URL = 'https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-3000.app.github.dev'

def send_email(subject, recipients, body):
    msg = Message(subject,
                  sender=('JDTodo', 'noreply@jdtodo.com'),
                  recipients=recipients,
                  html=body)
    mail.send(msg)

def send_reset_email(user):
    token = user.get_reset_token()
    user.reset_password_token = token
    link = f'{BASE_URL}/reset-password/{token}'
    body = f'<p>Hello {user.firstname} {user.lastname}!<br><br>To reset your password, please click <a href="{link}">here</a>. If you did not make this request, then simply ignore this email, and no changes will be made.<br><br>Thanks,<br>JDTodo</p>'
    send_email('Password Reset Request', [user.email], body)

def send_reset_confirm_email(user):
    link = f'{BASE_URL}/login'
    body = f'<p>Hello {user.firstname} {user.lastname}!<br><br>You have successfully updated your password. To log in, please click <a href="{link}">here</a>.<br><br>Thanks,<br>JDTodo</p>'
    send_email('Password Changed', [user.email], body)

def check_error_and_return_json_response(error, message, status_code):
    if not error:
        return jsonify({'message': message}), status_code
    else:
        return jsonify({'error': message}), status_code