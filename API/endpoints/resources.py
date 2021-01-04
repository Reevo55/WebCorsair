from flask_restful import Resource, reqparse, fields, marshal_with
from flask import request, jsonify, g, url_for
from flask_httpauth import HTTPBasicAuth
from .models import User, Price, Product

from .authentication import auth

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
    # @auth.verify_password
    # @marshal_with(resource_fields)
    # def get(self, video_id):
    #     result = VideoModel.query.filter_by(id=video_id).first()
    #     return result

    @auth.verify_password
    @marshal_with(resource_fields)
    def put(self, video_id):
        args = video_put_args.parse_args()
        video = VideoModel(
            id=video_id, name=args['name'], views=args['views'], likes=args['likes'])

        db.session.add(video)
        db.session.commit()

        return video, 201

    @auth.verify_password
    @marshal_with(resource_fields)
    def delete(self, video_id):
        del videos[video_id]
        return '', 204
