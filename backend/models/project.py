import datetime

from backend.app import db 

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.text('CURRENT_TIMESTAMP'))
    updated_at = db.Column(db.DateTime, server_default=db.text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tasks = db.relationship('Task', backref='project', lazy=True, cascade="all, delete")

    __table_args__ = (
        db.UniqueConstraint('user_id', 'name', name='uq_user_project_name'),
    )

    def __init__(self, name, user_id): 
        self.name = name 
        self.user_id = user_id 
    
    def to_dict(self):
        return {
            'proj_id': self.id,
            'proj_name': self.name,
            'date_updated': self.updated_at,
        }

    def __repr__(self):
        return '<Project %r, name=%r, owned_by=user %r>' % (self.id, self.name, self.user_id)