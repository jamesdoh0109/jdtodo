from backend.app import db 
import datetime

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), default="")
    deadline = db.Column(db.DateTime, default=None)
    status = db.Column(db.String(20), default="Not started")
    proj_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)

    def __init__(self, name, deadline, status, proj_id):
        self.name = name 
        self.deadline = deadline
        self.status = status 
        self.proj_id = proj_id

    def __repr__(self):
        return '<Task %r, name=%r, belongs_to=project %r>' % (self.id, self.name, self.proj_id)