from flask import Flask
from flask_sqlalchemy import SQLAlchemy  
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager
import os 

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('MYSQL_DB_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')  

jwt = JWTManager(app)
db = SQLAlchemy(app)
