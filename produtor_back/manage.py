import os
from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from application import create_app, get_db
from application.models import *

app = create_app(os.getenv('FLASK_CONFIG','default'))
db = get_db()
migrate = Migrate(app, db)
manager = Manager(app)

@manager.shell
def make_shell_context():
	return dict(
		app=app,
		db=db,
		User=User,
		Adm=Administrator,
		Con=Consumer,
		Bkt=Basket,
		Bkti=BasketItem,
		Ord=Order,
		Vegn=VegetableName,
		Veg=Vegetable,
		Ori=OrderItem
	)

manager.add_command('run', Server())
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
	manager.run()