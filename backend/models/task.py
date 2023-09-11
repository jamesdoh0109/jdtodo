import datetime

from backend.app import db 

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    description = db.Column(db.String(300), default="")
    deadline = db.Column(db.DateTime, default=None)
    status = db.Column(db.String(20), default="Not started")
    created_at = db.Column(db.DateTime, server_default=db.text('CURRENT_TIMESTAMP'))
    updated_at = db.Column(db.DateTime, server_default=db.text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)

    __table_args__ = (
        db.UniqueConstraint('project_id', 'name', name='uq_project_task_name'),
    )

    def __init__(self, name, deadline, status, description, project_id):
        self.name = name 
        self.deadline = deadline
        self.status = status 
        self.description = description
        self.project_id = project_id

    def __repr__(self):
        return '<Task %r, name=%r, belongs_to=project %r>' % (self.id, self.name, self.project_id)

    
    def update_from_dict(self, data):
        ALLOWED_FIELDS = ['name', 'deadline', 'status', 'description']
        for field, value in data.items():
            if field in ALLOWED_FIELDS and getattr(self, field, None) != value:
                setattr(self, field, value)

    def to_dict(self):
        return {
            'task_id': self.id,
            'task_name': self.name,
            'task_description': self.description,
            'task_deadline': self.deadline,
            'task_status': self.status,
        }

    
                
    