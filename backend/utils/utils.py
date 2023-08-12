from backend.app import mail 
from flask_mail import Message
from datetime import datetime
from tzlocal import get_localzone
import re 
import pytz

def has_empty_fields(*args, req_json):
    for field in args:
        if field not in req_json or not req_json[field].strip():
            return True
    return False

def check_valid_email(email):
    regex = r'^[\w+%.-]+@[\w.-]+\.[A-Za-z]{2,7}'
    return re.fullmatch(regex, email)

def check_verify_password(password, password2):
    return password == password2

def check_valid_password(password):
    return (len(password) >= 8 and any([c.isupper() for c in password]) and any([c.isdigit() for c in password]))

# use this helper function to convert the deadline in user's timezone to deadline in system timezone
def convert_datetime_into_system_datetime(user_date_time, user_timezone):
    date_obj = datetime.strptime(user_date_time, "%Y-%m-%dT%H:%M:%S.%fZ")

    # Assign it the input timezone
    input_tz = pytz.timezone(user_timezone)  # Replace with your input timezone
    date_obj = input_tz.localize(date_obj)

    # Get the system's local timezone
    local_tz = get_localzone()

    # Convert it to the system's local timezone
    local_date_obj = date_obj.astimezone(local_tz)

    return local_date_obj

def send_reset_email(user):
    token = user.get_reset_token()
    user.reset_password_token = token
    link = f"https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-3000.app.github.dev/reset-password/{token}"
    body = f'<p>Hello {user.firstname} {user.lastname}!<br><br>To reset your password, please click <a href="{link}">here</a>. If you did not make this request, then simply ignore this email, and no changes will be made.<br><br>Thanks,<br>JDTodo</p>'
    msg = Message('Password Reset Request',
                  sender=("JDTodo", "noreply@jdtodo.com"),
                  recipients=[user.email],
                  html=body)
    mail.send(msg)

def send_reset_confirm_email(user):
    link = "https://jihundoh0109-stunning-guide-7j7xq64644p2xrpx-3000.app.github.dev/login"
    body = f'<p>Hello {user.firstname} {user.lastname}!<br><br>You have successfully updated your password. To log in, please click <a href="{link}">here</a>.<br><br>Thanks,<br>JDTodo</p>'
    msg = Message('Password Changed',
                  sender=("JDTodo", "noreply@jdtodo.com"),
                  recipients=[user.email],
                  html=body)
    mail.send(msg)

