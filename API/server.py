from flask import Flask, jsonify, request, url_for, abort
from flask_restful import Api
from flask_httpauth import HTTPBasicAuth
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.combining import OrTrigger

from logic.crawler.crawler import getPrice

from logic.authentication import auth, g

from logic.models import User, Product, Price
from logic.models import db

import time
import settings
import datetime

app = Flask(__name__)
api = Api(app)

# CONFIG
app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODIFICATIONS

# DATABASE
db.init_app(app)
# with app.app_context():
#     db.create_all()

# SCHEDULER
def addPrices():
    with app.app_context():
        products = Product.query.all()

        for product in products:
            value = getPrice(product.link)

            price = Price(product.id, value)

            db.session.add(price)
            db.session.commit()

def cronJob():
    addPrices()
    print('Prices downloaded')



scheduler = BackgroundScheduler()

trigger = OrTrigger([CronTrigger(hour=12), CronTrigger(hour=00)])
scheduler.add_job(cronJob, trigger)
# scheduler.add_job(cronJob, 'interval', seconds=10)  # Testing

scheduler.start()


# REGISTER

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

# AUTHENTICATE
@app.route('/authenticate')
@auth.login_required
def get_resource():
    return jsonify({'data': 'Hello, %s!' % g.user.username, 'user_id': g.user.id})

# RESOURCES
from logic.resources import (
    ProductResource,
    PricesByProductAPI,
    ProductsWithPrices
)


api.add_resource(ProductResource, '/products', '/products/<int:id>')
api.add_resource(PricesByProductAPI, '/prices/<int:product_id>')
api.add_resource(ProductsWithPrices, '/products/prices')

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
