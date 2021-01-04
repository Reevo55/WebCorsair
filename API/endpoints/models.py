from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context

db = SQLAlchemy()


def _get_date():
    return datetime.datetime.now()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    products = db.relationship("Product", backref='user')

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def hash_password(self, passwordValue):
        self.password = pwd_context.encrypt(passwordValue)

    def verify_password(self, passwordValue):
        return pwd_context.verify(passwordValue, self.password)


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    link = db.Column(db.String(500), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    created_at = db.Column(db.Date, default=_get_date)
    updated_at = db.Column(db.Date, onupdate=_get_date)
    category = db.Column(db.String(100))

    prices = db.relationship('Price', backref='product')

    def __init__(self, name, link, user_id, category):
        self.name = name
        self.link = link
        self.user_id = user_id
        self.category = category


class Price(db.Model):
    __tablename__ = 'prices'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

    created_at = db.Column(db.Date, default=_get_date)
    price = db.Column(db.Float, nullable=False)

    def __init__(self, product_id, price):
        self.product_id = product_id
        self.price = price
