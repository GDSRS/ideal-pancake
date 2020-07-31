import os
from datetime import timedelta
class Config():
	DEBUG=True
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	ITEMS_PER_PAGE = 3
	SECRET_KEY = os.getenv('SECRET_KEY','C\x00\x93\xbd\x8a\xc3')

class Development(Config):
	SQLALCHEMY_DATABASE_URI = 'postgresql://produtor_pg:pgpassword@localhost/produtos_rurais'
	JWT_EXPIRATION_DELTA = timedelta(days=1)


class Production(Config):
	SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')

config = {
	'development': Development,
	'production': Production,
	'default': Development
}