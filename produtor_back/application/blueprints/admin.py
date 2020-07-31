from flask import Blueprint, make_response, request
from datetime import datetime
from application.models import *
from application.schemas import *
from flask_jwt import jwt_required, current_identity
from ..authorization.authorization_helper import role_required

admin = Blueprint('admin', __name__)
vegetable_schema = VegetableSchema()
vegetablename_schema = VegetableNameSchema()
basket_schema = BasketSchema()
basketitem_schema = BasketItemSchema()

@admin.route('/new_vegetable_name', methods=['POST'])
@jwt_required()
@role_required('admin')
def new_vegetable_name():
	vegetable_name = request.json['vegetable_name']
	if vegetable_name != '':
		try:
			vegetable_name = VegetableName(name=vegetable_name)
			db.session.add(vegetable_name)
			db.session.commit()
			return {'result': vegetablename_schema.dump(vegetable_name)}
		except Exception as e:
			return {'error': e}
	else:
		return  {'error':'vegetable name can\'t be null or empty'}


@admin.route('/new_vegetable', methods=['POST'])
@jwt_required()
@role_required('admin')
def new_vegetable():	
	vegetable = Vegetable(**vegetable_schema.load(request.json['vegetable']))
	db.session.add(vegetable)
	db.session.commit()
	return vegetable_schema.dump(vegetable)

@admin.route('/new_basket', methods=['POST'])
@jwt_required()
@role_required('admin')
def new_basket():
	"""Recebe as verduras e suas quantidades e cria uma cesta
		Não faz sentido criar uma cesta sem nenhum elemento"""
	basket = None
	# cria um objeto cesta
	if request.json['basket'] != None:
		basket = Basket(**basket_schema.load(request.json['basket']))
		basket.price = 0.0
		basket.weight = 0.0
	else:
		return {'error': 'Basket object wasn\'t received'}, 500

	# adiciona os elementos da cesta
	# TODO: colocar um try catch e retornar operação do banco caso alguma coisa de errado
	try:
		add_basket_items(request, basket)
		return basket_schema.dumps(basket)
	except Exception as e:
		print('error', e)
		return {'error': e}, 500

def add_basket_items(request, basket):
	if request.json['items']:
		for basket_item in request.json['items']:
			# basket_item['basket_id'] = basket.id
			vegetable = get_vegetable_by_id(basket_item['vegetable_id'])
			basket_item['weight'] = vegetable.average_weight * basket_item['quantity']
			basket_item['price'] = round(vegetable.kg_price * basket_item['weight'] / 1000, 2)
			basket_item['basket_id'] = 0
			item = BasketItem(**basketitem_schema.load(basket_item))
			basket.add_basket_item(item)
		db.session.add(basket)
		db.session.commit()
	else:
		raise Exception('no items were informed')


# @admin.route('/get_all_basket_items', methods=['POST'])
# @jwt_required()
# @role_required('admin')
# def get_all_basket_items():


@admin.route('/new_basket_item', methods=['POST'])
@jwt_required()
@role_required('admin')
def new_basket_item():
	basket_item = request.json['basket_item']
	new_basket_item = BasketItem(**basketitem_schema.load(basket_item))
	update_basket_weight(basket_item['basket_id'], new_basket_item.weight)
	db.session.add(new_basket_item)
	db.session.commit()
	return basketitem_schema.dumps(new_basket_item)

@admin.route('/delete_basket', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def delete_basket():
	try:
		returned_value = Basket.query.filter_by(id=request.json['basket_id']).delete()
		print('RETURNED VALUE', returned_value)
		db.session.commit()
		return {'message': 'Success, object was deleted'}
	except Exception as e:
		return {'error': e}

@admin.route('/delete_vegetable', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def delete_vegetable():
	try:
		Vegetable.query.filter_by(id=request.json['vegetable_id']).delete()
		db.session.commit()
		return {'message': 'Success, object was deleted'}
	except Exception as e:
		return {'error': e}, 500

@admin.route('/delete_vegetable_name', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def delete_vegetable_name():
	try:
		VegetableName.query.filter_by(
			id=request.json['vegetable_name_id']).delete()
		db.session.commit()
		return {'message': 'Success, object was deleted'}
	except Exception as e:
		return {'error': e}, 500


@admin.route('/edit_vegetable_name', methods=['PUT'])
@jwt_required()
@role_required('admin')
def edit_vegetable_name():
	try:
		vegetable_name = VegetableName.query.filter_by(id=
			request.json['vegetable_name_id']).first()
		vegetable_name.name = request.json['vegetable_name']
		db.session.add(vegetable_name)
		db.session.commit()
		return {'Success': 'Object updated'}
	except Exception as e:
		print('ERROR: ', e)
		return {'error': e}, 500

@admin.route('/edit_vegetable', methods=['PUT'])
@jwt_required()
@role_required('admin')
def edit_vegetable():
	try:
		vegetable = request.json['vegetable']
		Vegetable.query.filter_by(id=vegetable['id']).update(
			vegetable_schema.load(vegetable))
		db.session.commit()
		return {'Success': 'Object was updated'}
	except Exception as e:
		print('ERROR', e)
		return {'error': e}

def update_basket_weight(basket_id, weight):
	Basket.query.filter_by(id=basket_id).update({
		Basket.weight: Basket.weight + weight})
	#basket = Basket.query.filter_by(id=basket_id)
	#basket.weight += weight

def get_vegetable_by_id(vegetable_id):
	return Vegetable.query.filter_by(id=vegetable_id).first()