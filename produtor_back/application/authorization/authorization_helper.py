import functools
from flask_jwt import current_identity, JWT
from ..models import User, Consumer, Administrator

def role_required(role):
	def role_wrapper(func):
		@functools.wraps(func)
		def wrapper(*args, **kwargs):
			if current_identity.allowed(role):
				return func(*args, **kwargs)
			else:
				return {'error': 'You don\'t have permission to access this resource '}, 401
		return wrapper
	return role_wrapper


def authenticate(username, password):
	user = User.query.filter_by(username=username).first()
	if user == None:
		return None
	elif user.role == 'consumer':
		user = Consumer.query.filter_by(id=user.id).first()
	else:
		user = Administrator.query.filter_by(id=user.id).first()
		
	if user and user.verify_password(password):
		return user

def identity(payload):
	user_id = payload['identity']
	return User.query.filter_by(id=user_id).first()