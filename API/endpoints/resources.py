from flask_restful import Resource, reqparse, fields, marshal_with
from flask import request, jsonify, abort
import json

from .models import User, Price, Product
from .alchemyEncoder.encoder import AlchemyEncoder

from .authentication import auth, authenticate

product_put_args = reqparse.RequestParser()
product_put_args.add_argument(
    "name", type=str, help="name of the product", required=True)
product_put_args.add_argument(
    "link", type=str, help="link of the product", required=True)
product_put_args.add_argument(
    "category", type=str, help="category of the product", required=True)

resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'link': fields.String,
    'category': fields.String
}


class ProductResource(Resource):
    @marshal_with(resource_fields)
    def get(self, user_id):
        if not authenticate(request):
            abort(401, 'Not authorized, please provide correct credentials.')

        result = Product.query.filter(Product.user_id==user_id).all()
        return result