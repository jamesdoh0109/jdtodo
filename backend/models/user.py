import os 

from itsdangerous import URLSafeTimedSerializer as Serializer

from backend.app import db 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    hashed_password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.text('CURRENT_TIMESTAMP'))
    updated_at = db.Column(db.DateTime, server_default=db.text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
    projects = db.relationship('Project', backref='user', lazy=True, cascade="all, delete")
    reset_password_token = db.Column(db.String(128))
    
    def __init__(self, firstname, lastname, email, hashed_password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.hashed_password = hashed_password

    def __repr__(self):
        return '<User %r, name=%r, email=%r>' % (self.id, f'{self.firstname} {self.lastname}', self.email)

    def update_from_dict(self, data):
        ALLOWED_FIELDS = ['firstname', 'lastname', 'email']
        for field, value in data.items():
            if field in ALLOWED_FIELDS and getattr(self, field, None) != value:
                setattr(self, field, value)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
        }

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(os.environ.get('SERIALIZE_SECRET'), expires_sec)
        return s.dumps({'user_id': self.id}, salt="password-reset-salt")

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(os.environ.get('SERIALIZE_SECRET'))
        try:
            user_id = s.loads(token, salt="password-reset-salt")['user_id']
            return User.query.get(user_id)
        except:
            return None
            