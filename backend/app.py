import os 
from flask import Flask
from flask_sqlalchemy import SQLAlchemy  
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from datetime import timedelta

db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('MYSQL_DB_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
    db.init_app(app)

    app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')  
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    jwt.init_app(app)

    app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
    mail.init_app(app)

    from .routes.auth import auth
    from .routes.project import project
    from .routes.task import task
    from .routes.user import user
     
    app.register_blueprint(auth)
    app.register_blueprint(project)
    app.register_blueprint(task)
    app.register_blueprint(user)

    return app