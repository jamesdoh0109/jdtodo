from sqlalchemy.exc import IntegrityError
from backend.app import db
from backend.models.user import User
from backend.utils.utils import send_reset_email, send_reset_confirm_email

def signup(firstname, lastname, email, password):
    new_user = User(firstname, lastname, email, password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return e
    except Exception as e:
        db.session.rollback()
        return e
    return new_user

def change_password(user, new_password):
    user.hashed_password = new_password
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e
    return user

def reset_password(user, new_password):
    user.hashed_password = new_password
    user.reset_password_token = None
    try:
        send_reset_confirm_email(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e
    return user

def send_reset_password_link(user):
    try:
        send_reset_email(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e
    return user

    