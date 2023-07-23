from backend.app import db
from backend.models.user import User
from sqlalchemy.exc import IntegrityError

def get_user_by_id(user_id):
    user = User.query.filter_by(id=user_id).first()
    return user 

def get_user_by_email(user_email):
    user = User.query.filter_by(email=user_email).first()
    return user

def get_user_by_token(token):
    user = User.verify_reset_token(token)
    return user 
    
def modify_user(user, new_user_json):
    user.firstname = new_user_json['firstname']
    user.lastname = new_user_json['lastname']
    user.email = new_user_json['email']
    try:
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return e
    except Exception as e:
        db.session.rollback()
        return e
    return user

def delete_user(user):
    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return e
    return user
