from sqlalchemy.exc import IntegrityError

from backend.app import db
from backend.models.user import User
from backend.utils.utils import send_reset_email, send_reset_confirm_email

def get_user_by_id(user_id):
    try:
        return User.query.filter_by(id=user_id).first()
    except Exception as e:
        return e

def get_user_by_email(user_email):
    try:
        return User.query.filter_by(email=user_email).first()
    except Exception as e:
        return e

def get_user_by_token(token):
    try: 
        return User.verify_reset_token(token)
    except Exception as e:
        return e

def create_user(firstname, lastname, email, password):
    new_user = User(firstname, lastname, email, password)
    try:
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict()
    except IntegrityError as e:
        db.session.rollback()
        return e
    except Exception as e:
        db.session.rollback()
        return e
    
def modify_user(user, modified_user_json):
    user.update_from_dict(modified_user_json)
    try:
        db.session.commit()
        return user.to_dict()
    except IntegrityError as e:
        db.session.rollback()
        return e
    except Exception as e:
        db.session.rollback()
        return e

def delete_user(user):
    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e

def change_password(user, new_password):
    user.hashed_password = new_password
    try:
        db.session.commit()
        return user
    except Exception as e:
        db.session.rollback()
        return e

def reset_password(user, new_password):
    user.hashed_password = new_password
    user.reset_password_token = None
    try:
        send_reset_confirm_email(user)
        db.session.commit()
        return user
    except Exception as e:
        db.session.rollback()
        return e

def send_reset_password_link(user):
    try:
        send_reset_email(user)
        db.session.commit()
        return user
    except Exception as e:
        db.session.rollback()
        return e