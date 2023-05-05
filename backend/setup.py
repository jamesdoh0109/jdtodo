from flask import Flask
from flask_sqlalchemy import SQLAlchemy  
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager
import os 

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('MYSQL_DB_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

# app.config['SESSION_COOKIE_DOMAIN'] = '.herokuapp.com'
# app.config['SESSION_COOKIE_SECURE'] = True
# app.secret_key = "AAAAAAAaaaaa!!!!shfdjjshdklfhsdjfhsdjkfhjskdfhjskdhfjskdhfjskdhfjskdhfjksdhfjksdf!"
db = SQLAlchemy(app)
#app.config['SESSION_TYPE'] = 'sqlalchemy'
#app.config['SESSION_SQLALCHEMY'] = db
#app.config['SESSION_SQLALCHEMY_TABLE'] = 'sessions'
#Session(app)

# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Origin', 'https://task-app-test-frontend.herokuapp.com')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#     response.headers.add('Access-Control-Allow-Credentials', 'true')
#     return response