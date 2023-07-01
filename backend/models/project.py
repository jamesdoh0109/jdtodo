from backend.app import db 
import datetime

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
        return '<Project %r, name=%r, owned_by=user %r>' % (self.id, self.name, self.user_id)