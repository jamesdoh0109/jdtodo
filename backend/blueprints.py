from backend.routes.task import task
from backend.routes.user import user
from backend.routes.project import project

all_blueprints = [user, project, task]

def register_blueprints(app):
    for blueprint in all_blueprints:
        app.register_blueprint(blueprint)


