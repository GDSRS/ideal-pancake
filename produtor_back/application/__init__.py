from flask import Flask
from .config import config
from .models import db
from .schemas import ma
from flask_jwt import JWT
from .authorization.authorization_helper import authenticate, identity
from flask_cors import CORS

jwt = None

def create_app(config_name):
	app = Flask(__name__)
	CORS(app)
	app.config.from_object(config[config_name])
	db.init_app(app)
	ma.init_app(app)
	from .blueprints.consumer import consumer
	from .blueprints.admin import admin
	from .blueprints.commom import commom
	app.register_blueprint(consumer, url_prefix='/consumer')
	app.register_blueprint(admin, url_prefix='/admin')
	app.register_blueprint(commom)

	jwt = JWT(app, authenticate, identity)

	@jwt.jwt_headers_handler
	def custon_header(identity):
		return {'role': identity.role}

	return app

def get_db():
	return db