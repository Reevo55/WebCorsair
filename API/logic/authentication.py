from flask_httpauth import HTTPBasicAuth
from flask import g
from .models import User

auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(username, password):
    user = User.query.filter_by(username=username).first()
    if not user or not user.verify_password(password):
        return False

    g.user = user
    return True


def authenticate(request):
    username = request.authorization.username
    password = request.authorization.password
    user = User.query.filter_by(username=username).first()
    if not user or not user.verify_password(password):
        return False
    return True

def getUserId(request):
    if not authenticate(request):
        return -1

    username = request.authorization.username
    password = request.authorization.password
    user = User.query.filter_by(username=username).first()

    if not user or not user.verify_password(password):
        return -1
    return user.id