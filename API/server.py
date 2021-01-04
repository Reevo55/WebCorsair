from flask import Flask, jsonify, request, url_for, abort
from flask_restful import Api
from flask_httpauth import HTTPBasicAuth

from endpoints.authentication import auth, g

from endpoints.models import User, Product, Price
from endpoints.models import db

import settings
import datetime

app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODIFICATIONS

db.init_app(app)
# with app.app_context():
#     db.create_all()


@app.route('/users', methods=['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')

    if username is None or password is None or email is None:
        abort(400, 'Missing username, password or email')
    if User.query.filter_by(username=username).first() is not None:
        abort(400, 'User already exists') 
    user = User(username=username, email=email)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'response': user.username + ' created'}), 201


@app.route('/authenticate')
@auth.login_required
def get_resource():
    return jsonify({'data': 'Hello, %s!' % g.user.username, 'user_id' : g.user.id})

from endpoints.resources import ProductResource

api.add_resource(ProductResource, '/products')

if __name__ == "__main__":
    app.run(debug=True)
