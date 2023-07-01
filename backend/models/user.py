from backend.app import db 
from itsdangerous import URLSafeTimedSerializer as Serializer
import os 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    hashed_password = db.Column(db.String(128), nullable=False)
    projects = db.relationship('Project', backref='user', lazy=True, cascade="all, delete")
    reset_password_token = db.Column(db.String(128))
    
    def __init__(self, firstname, lastname, email, hashed_password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.hashed_password = hashed_password

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(os.environ.get('SERIALIZE_SECRET'), expires_sec)
        return s.dumps({'user_id': self.id}, salt="password-reset-salt")

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(os.environ.get('SERIALIZE_SECRET'))
        try:
            user_id = s.loads(token, salt="password-reset-salt")['user_id']
        except:
            return None
        return User.query.get(user_id)
            
    def __repr__(self):
        return '<User %r, name=%r, email=%r>' % (self.id, f'{self.firstname} {self.lastname}', self.email)