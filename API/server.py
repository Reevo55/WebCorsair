from flask import Flask, jsonify, request, url_for, abort
from flask_restful import Api
from flask_httpauth import HTTPBasicAuth
from flask_mail import Mail, Message

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.combining import OrTrigger

from logic.authentication import authenticate

from logic.crawler.crawler import getPrice

from logic.authentication import auth, g

from logic.models import User, Product, Price
from logic.models import db

from logic.emails.notifyUsers import notifyUser

import time
import settings
import datetime

app = Flask(__name__)
api = Api(app)

migrate = Migrate(app, db)


# MANAGER

# manager = Manager(app)
# manager.add_command('db', MigrateCommand)


# CONFIG
app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODIFICATIONS

# DATABASE
db.init_app(app)
with app.app_context():
    db.create_all()

# MAILS
mail= Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = settings.MAIL_USERNAME
app.config['MAIL_PASSWORD'] = settings.MAIL_PASSWORD
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_DEFAULT_SENDER'] = settings.MAIL_USERNAME
app.config['MAIL_MAX_EMAILS'] = 10

mail = Mail(app)


# SCHEDULER
def managePrices():
    with app.app_context():
        products = Product.query.all()

        for product in products:
            value = getPrice(product.link)
            price = Price(product.id, value)

            if float(str(product.expected_price)) > float(str(value)):
                if not product.notified:
                    user = User.query.filter_by(id = product.user_id).first()
                    notifyUser(user.email, product.name, value, product.expected_price, product.link, mail)
                    product.notified = True
                    print('Message sent!')
            else:
                product.notified = False
                print('Message not sent, notified to false!')
                    
            db.session.add(price)
            db.session.commit()

def cronJob():
    managePrices()
    print('Job done')



scheduler = BackgroundScheduler()

trigger = OrTrigger([CronTrigger(hour=00), CronTrigger(hour=12)])
scheduler.add_job(cronJob, trigger)
# scheduler.add_job(cronJob, 'interval', seconds=30)  # Testing

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

@app.route('/auth')
def get_auth(): 
    if not authenticate(request):
        abort(401, 'Not authorized, please provide correct credentials.')
    else:
        return jsonify({ 'data' : 'logged in'})

@app.route('/forecast/<int:id>', methods=['GET'])
def get_forecast(id):
    if not authenticate(request):
        abort(401, 'Not authorized, please provide correct credentials.')

    product_id = id

    from logic.forecast.forecast import forecast

    print(forecast(product_id))

    return jsonify({'data' : forecast(product_id)})

# RESOURCES
from logic.resources import (
    ProductResource,
    PricesByProductAPI,
    ProductsWithPrices,
    ProductWithPricesAPI,
    Categories
)

api.add_resource(ProductResource, '/products', '/products/<int:id>')
api.add_resource(PricesByProductAPI, '/prices/<int:product_id>')
api.add_resource(ProductsWithPrices, '/products/prices')
api.add_resource(ProductWithPricesAPI, '/product/prices/<int:product_id>')
api.add_resource(Categories, '/categories')

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False, threaded=True)
    # manager.run()
