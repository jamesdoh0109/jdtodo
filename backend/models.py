from setup import db 
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer as Serializer
import datetime
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
        return '<User %r>' % self.id

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tasks = db.relationship('Task', backref='project', lazy=True, cascade="all, delete")

    def __init__(self, name, user_id): 
        self.name = name 
        self.user_id = user_id 
        
    def __repr__(self):
        return '<Project %r>' % self.id

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), default="")
    deadline = db.Column(db.DateTime, default=datetime.datetime.now)
    status = db.Column(db.String(20), default="Not started")
    is_done = db.Column(db.Boolean, default=False)
    proj_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)

    def __init__(self, name, deadline, status, proj_id):
        self.name = name 
        self.deadline = deadline
        self.status = status 
        self.is_done = status == 'Finished'
        self.proj_id = proj_id

    def __repr__(self):
        return '<Project %r>' % self.id