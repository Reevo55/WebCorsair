from flask_restful import Resource, reqparse, fields, marshal_with
from flask import request, jsonify, abort
import json

from .crawler.crawler import getPrice
from .models import User, Price, Product, Category, db
from .alchemyEncoder.encoder import AlchemyEncoder

from .authentication import auth, authenticate, getUserId

product_put_args = reqparse.RequestParser()

product_put_args.add_argument(
    "name", type=str, help="name of the product", required=True)
product_put_args.add_argument(
    "link", type=str, help="link of the product", required=True)
product_put_args.add_argument(
    "category", type=int, help="category of the product", required=True)
product_put_args.add_argument(
    "expected_price", type=int, help="expected price of the product", required=True)

resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'link': fields.String,
    'category_id': fields.Integer,
    'expected_price': fields.Integer
}

res_post_fields = {
    'name': fields.String,
    'link': fields.String,
    'category_id': fields.Integer,
    'expected_price': fields.Integer
}

def authenticatation(request):
    if not authenticate(request):
        abort(401, 'Not authorized, please provide correct credentials.')


class ProductResource(Resource):
    @marshal_with(resource_fields)
    def get(self):
        authenticatation(request)

        user_id = getUserId(request)
        result = Product.query.filter(Product.user_id == user_id).all()
        return result

    def post(self):
        authenticatation(request)

        user_id = getUserId(request)
        args = product_put_args.parse_args(request)

        product = Product(args['name'], args['link'], user_id,
                          args['category'], args['expected_price'])

        db.session.add(product)
        db.session.flush()
        value = getPrice(product.link)
        price = Price(product.id, value)

        db.session.add(price)

        db.session.commit()

        return {'data': 'Success, product created.', 'current_price' : value}, 201

    def delete(self, id):
        authenticatation(request)
        user_id = getUserId(request)

        result = Product.query.filter(
            Product.id == id and Product.user_id == user_id).first()

        db.session.delete(result)
        db.session.commit()
        return {'data': 'Success, product deleted'}, 204


price_fields = {
    'created_at': fields.String(),
    'price': fields.Float,
    'product_id': fields.Integer
}


class PricesByProductAPI(Resource):
    @marshal_with(price_fields)
    def get(self, product_id):
        authenticatation(request)

        result = Price.query.filter(Price.product_id == product_id).order_by(
            Price.created_at.desc()).all()
        return result

resource_with_prices_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'link': fields.String,
    'category_id': fields.Integer,
    'expected_price': fields.Integer,
    'prices': fields.List(fields.Nested(price_fields))
}

class ProductWithPricesAPI(Resource):
    @marshal_with(resource_with_prices_fields)
    def get(self, product_id):
        authenticatation(request)
        user_id = getUserId(request)

        result = Product.query.filter(Product.id == product_id and Product.user_id == user_id).all()
        return result

class ProductsWithPrices(Resource):
    @marshal_with(resource_with_prices_fields)
    def get(self):
        authenticatation(request)

        user_id = getUserId(request)
        result = Product.query.filter(Product.user_id == user_id).all()
        return result


category_fields = {
    'id': fields.Integer,
    'name': fields.String
}
class Categories(Resource):
    @marshal_with(category_fields)
    def get(self):
        result = Category.query.all()
        return result