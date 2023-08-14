import os
from datetime import datetime
from datetime import timedelta
from datetime import timezone
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, get_jwt, get_jwt_identity, create_access_token, set_access_cookies
from flask_mail import Mail

db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('MYSQL_DB_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_COOKIE_SECURE'] = True
    app.config['JWT_COOKIE_SAMESITE'] = 'None'
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    jwt.init_app(app)

    app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
    mail.init_app(app)

    from backend.routes.auth import auth
    from backend.routes.project import project
    from backend.routes.task import task
    from backend.routes.user import user

    app.register_blueprint(auth)
    app.register_blueprint(project)
    app.register_blueprint(task)
    app.register_blueprint(user)

    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            # in case where there is not a valid JWT, just return the original response
            return response

    return app
