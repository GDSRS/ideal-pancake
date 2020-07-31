from flask_marshmallow import Marshmallow
from .models import *

ma = Marshmallow()

class VegetableNameSchema(ma.SQLAlchemySchema):
	class Meta:
		model = VegetableName

	id = ma.auto_field()
	name = ma.auto_field()

class VegetableSchema(ma.SQLAlchemySchema):
	class Meta:
		model = Vegetable
		# include_fk = True

	id = ma.auto_field()
	harvest_date = ma.DateTime(format='%d/%m/%Y')
	vegetable_name_id = ma.auto_field()
	harvest_quantity = ma.auto_field()
	average_weight = ma.auto_field()
	kg_price = ma.auto_field()
	# vegetable_name = ma.Nested(VegetableNameSchema(only=['name']))
	vegetable_name = ma.Pluck(VegetableNameSchema,'name')

class BasketItemSchema(ma.SQLAlchemySchema):
	class Meta:
		model = BasketItem

	id = ma.auto_field()
	quantity = ma.auto_field()
	vegetable_id = ma.auto_field()
	basket_id = ma.auto_field()
	weight = ma.auto_field()
	price = ma.auto_field()
	vegetables = ma.Nested(VegetableSchema())

class BasketSchema(ma.SQLAlchemySchema):
	class Meta:
		model = Basket

	id = ma.auto_field()
	name = ma.auto_field()
	price = ma.auto_field()
	weight = ma.auto_field()
	basket_items = ma.Nested(BasketItemSchema(), many=True)

class OrderItemSchema(ma.SQLAlchemySchema):
	class Meta:
		model = OrderItem

	id = ma.auto_field()
	quantity = ma.auto_field()
	basket_id = ma.auto_field()
	order_id = ma.auto_field()
	basket = ma.Nested(BasketSchema())

class OrderSchema(ma.SQLAlchemySchema):
	class Meta:
		model = Order

	id = ma.auto_field()
	consumer_id = ma.auto_field()
	ordered_date = ma.auto_field()
	price = ma.auto_field()
	valid = ma.auto_field()		
	order_items = ma.Nested(OrderItemSchema(), many=True)