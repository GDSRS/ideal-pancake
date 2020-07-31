from flask import Blueprint, request, current_app
import math
from application.models import *
from application.schemas import *

commom = Blueprint('commom', __name__)

vegetable_schema = VegetableSchema()
vegetablename_schema = VegetableNameSchema()
basket_schema = BasketSchema()
basketitem_schema = BasketItemSchema()

@commom.route('/get_vegetable/<string:veg_id>')
def get_vegetable_by_id(veg_id):
	vegetable = Vegetable.query.filter_by(id=veg_id).first()
	if vegetable != None:
		return vegetable_schema.dump(vegetable)
	else:
		return {'error': 'Vegetable not found'}

def next_page_url(page, url, max_page):
	if max_page == 0 or page.page == max_page:
		return ''
	return 'http://localhost:5000/'+url+'?page='+\
			str(page.page+1)+'&quantity='+str(page.per_page)

def previous_page_url(page, url):
	if page.page <= 1:
		return ''
	return 'http://localhost:5000/'+url+'?page='+\
			str(page.page-1)+'&quantity='+str(page.per_page)

@commom.route('/get_vegetable_names')
def get_vegetable_names():
	all_objects = request.args.get('all', False, type=bool)
	vegetable_page = VegetableName.query.order_by(VegetableName.name)
	if all_objects:
		vegetable_names =  vegetable_page.all()
		vegetable_names = [vegetablename_schema.dump(v) for v in vegetable_names]
		return {
			'items': vegetable_names
		}
	else:
		page_number = request.args.get('page', 1, type=int)
		quantity = request.args.get('quantity', current_app.config["ITEMS_PER_PAGE"], type=int)
		vegetable_page = vegetable_page.paginate(
			page_number, quantity, False)
		vegetable_names = [vegetablename_schema.dump(v) for v in vegetable_page.items]
		max_page = math.ceil(vegetable_page.total / vegetable_page.per_page)

		return {
			'max_page': max_page,
			'next_page': next_page_url(vegetable_page, 'get_vegetable_names',max_page),
			'previous_page': previous_page_url(vegetable_page, 'get_vegetable_names'),
			'page': vegetable_page.page,
			'per_page': vegetable_page.per_page,
			'total': vegetable_page.total,
			'items': vegetable_names
		}

@commom.route('/get_vegetables', methods=['GET'])
def get_vegetables():
	all_objects = request.args.get('all', False, type=bool)
	vegetable_page = Vegetable.query.order_by(Vegetable.harvest_date)
	if all_objects:
		vegetables = vegetable_page.all()
		vegetables = [vegetable_schema.dump(v) for v in vegetables]
		return {
			'items': vegetables
		}
	else:
		page_number = request.args.get('page', 1, type=int)
		quantity = request.args.get('quantity', current_app.config['ITEMS_PER_PAGE'], type=int)
		vegetable_page = vegetable_page.paginate(
			page_number, quantity, False)
		vegetables = [vegetable_schema.dump(v) for v in vegetable_page.items]
		max_page = math.ceil(vegetable_page.total / vegetable_page.per_page)

		return {
			'max_page': max_page,
			'next_page': next_page_url(vegetable_page, 'get_vegetables',max_page),
			'previous_page': previous_page_url(vegetable_page, 'get_vegetables'),
			'page': vegetable_page.page,
			'per_page': vegetable_page.per_page,
			'total': vegetable_page.total,
			'items': vegetables
		}

@commom.route('/get_basket', methods=['GET'])
def get_basket_by_name():
	basket = Basket.query.filter_by(name=request.args['name']).first()
	if basket != None:
		return {'result': basket_schema.dump(basket)}
	else:
		return {'error': 'Nenhuma cesta foi encontrada'}

@commom.route('/get_baskets', methods=['GET'])
def get_all_baskets():
	page_number = request.args.get('page', 1, type=int)
	quantity = request.args.get('quantity', 
		current_app.config['ITEMS_PER_PAGE'], type=int)
	baskets_page = Basket.query.order_by(Basket.name).paginate(page_number, quantity, False)
	baskets = [basket_schema.dump(basket) for basket in baskets_page.items]
	max_page = math.ceil(baskets_page.total / baskets_page.per_page)

	return {
		'max_page': max_page,
		'next_page': next_page_url(baskets_page, 'get_baskets',max_page),
		'previous_page': previous_page_url(baskets_page, 'get_baskets'),
		'page': baskets_page.page,
		'per_page': baskets_page.per_page,
		'total': baskets_page.total,
		'items': baskets
	}

@commom.route('/get_basket_items', methods=['GET'])
def get_all_basket_item():
	basket_items = BasketItem.query.all()
	basket_items = [basketitem_schema.dump(basket_item) for basket_item \
		in basket_items]
	return {'result': basket_items}

