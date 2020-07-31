from flask import Blueprint, make_response
from ..models import Vegetable
from application.schemas import *
from ..authorization.authorization_helper import role_required
from flask_jwt import jwt_required, current_identity

consumer = Blueprint('consumer', __name__)

orderSchema = OrderSchema()

@consumer.route('/cart', methods=['GET'])
@jwt_required()
@role_required('consumer')
def get_cart():
	cart = Order.query.filter_by(consumer_id=current_identity.id).first()
	if cart and not cart.valid:
		return orderSchema.dump(cart), 200
	else:
		return {'message': 'Empty cart'}, 200

# @consumer.route('/add_cart', methods[['POST']])
# @consumer.route('/wish_list',methods=['GET','POST'])