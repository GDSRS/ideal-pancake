from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from .authorization.authorization_levels import AUTHORIZATIONS

db = SQLAlchemy()

class VegetableName(db.Model):
	__tablename__ = 'vegetable_name'
	id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
	name = db.Column(db.String(100), primary_key=True)
	vegetables = db.relationship('Vegetable', backref='vegetable_name',lazy=True, passive_deletes=True)

class Vegetable(db.Model):
	__tablename__ = 'vegetables'
	id = db.Column(db.Integer, primary_key=True, autoincrement=True,
		unique=True)
	vegetable_name_id = db.Column(db.Integer, 
		db.ForeignKey('vegetable_name.id', ondelete='CASCADE'), primary_key=True,)
	average_weight = db.Column(db.Float, nullable=False, default=0.0)
	harvest_date = db.Column(db.DateTime(), nullable=False, primary_key=True)
	harvest_quantity = db.Column(db.Integer, nullable=False)
	kg_price = db.Column(db.Float, default=0.0)
	baskets = db.relationship('BasketItem', lazy=True, backref='vegetable')

class BasketItem(db.Model):
	__tablename__ = 'basket_item'
	id = db.Column(db.Integer, autoincrement=True, primary_key=True, unique=True)
	quantity = db.Column(db.Integer, nullable=False)
	vegetable_id = db.Column(db.Integer, db.ForeignKey('vegetables.id'),
		nullable=False, primary_key=True)
	weight = db.Column(db.Float, nullable=False, default=0.0)
	price = db.Column(db.Float, default=0.0)
	basket_id = db.Column(db.Integer, db.ForeignKey('basket.id', ondelete='CASCADE'),
		nullable=False, primary_key=True)


# order_basket = db.Table('order_basket',
# 	db.Column('order_id', db.Integer,\
# 		db.ForeignKey('orders.id'), primary_key=True, nullable=False),
# 	db.Column('basket_id', db.Integer,\
# 		db.ForeignKey('basket.id'), primary_key=True, nullable=False),
# 	db.PrimaryKeyConstraint('order_id','basket_id')
# 	)

class Basket(db.Model):
	__tablename__ = 'basket'
	id = db.Column(db.Integer, primary_key=True, autoincrement=True,
		unique=True)
	name = db.Column(db.String(30), nullable=False, primary_key=True)
	weight = db.Column(db.Float, nullable=False, default=0.0)
	basket_items = db.relationship('BasketItem', lazy=True)
	price = db.Column(db.Float, default=0.0)

	def add_basket_item(self, item):
		self.basket_items.append(item)
		self.weight += item.weight
		self.price = round(self.price + item.price, 2)
	
	def change_price():
		#promotion price
		...


# class Role(db.Model):
# 	__tablename__ = 'roles'
# 	id = db.Column(db.Integer, primary_key=True, unique=True, 
# 		autoincrement=True)
# 	name = db.Column(db.String(6), unique=True, primary_key=True)
# 	code = db.Column(db.Integer, primary_key=True)
# 	users = db.relationship('User', backref='roles', lazy=True)

class User(db.Model):
	__tablename__ = 'users'
	id = db.Column(db.Integer, primary_key=True, unique=True,
		autoincrement=True)
	username = db.Column(db.String(20), primary_key=True, unique=True)
	password_hash = db.Column(db.String(128), primary_key=True)
	# role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
	role = db.Column(db.String(9), nullable=False, default='consumer')

	__mapper_args__ = {
		'polymorphic_on': role,
		'polymorphic_identity': 'anonymous'
	}

	@property
	def password(self):
		raise Exception('This field can\'t be accessed directly')

	@password.setter
	def password(self, password):
		self.password_hash = generate_password_hash(password)

	def verify_password(self, password):
		return check_password_hash(self.password_hash, password)

	def allowed(self, role_name):
		# role = Role.query.filter_by(name=role_name).first()
		return AUTHORIZATIONS[self.role] >= AUTHORIZATIONS[role_name]


class Administrator(User):
	__tablename__ = 'administrators'
	id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
	name = db.Column(db.String(128), nullable=False)#nomeCompleto
	position = db.Column(db.String(128), nullable=False)#cargo na empresa

	__mapper_args__ = {
		'polymorphic_identity': 'admin'
	}


class Consumer(User):
	__tablename__ = 'consumers'
	id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
	address = db.Column(db.String(128))
	name = db.Column(db.String(128), nullable=False)#nomeCompleto
	buy_history = db.relationship('Order', lazy=True, backref='consumers')
	#payment information

	__mapper_args__ = {
		'polymorphic_identity': 'consumer'
	}

class OrderItem(db.Model):
	__tablename__ = 'order_items'
	id = db.Column(db.Integer, primary_key=True, autoincrement=True,
		unique=True)
	quantity = db.Column(db.Integer, nullable=False, default=1)
	basket_id = db.Column(db.Integer, db.ForeignKey('basket.id'), 
		nullable=False)
	basket = db.relationship('Basket', uselist=False)
	order_id = db.Column(db.Integer, db.ForeignKey('orders.id'),
		nullable=False)
	price = db.Column(db.Float, default=0, nullable=False)

	def set_price(self):
		self.price = self.basket.price * self.quantity


class Order(db.Model):
	__tablename__ = 'orders'
	id = db.Column(db.Integer, primary_key=True, autoincrement=True,\
		unique=True)
	consumer_id = db.Column(db.Integer, db.ForeignKey('users.id'),
		nullable=False)
	ordered_date = db.Column(db.DateTime(), default=datetime.now(),
		nullable=False)
	# items = db.relationship('Basket',secondary=order_basket, lazy='subquery')
	order_items = db.relationship('OrderItem', lazy=True)
	price = db.Column(db.Float, nullable=True, default=0.0)
	valid = db.Column(db.Boolean, nullable=False, default=False)
	