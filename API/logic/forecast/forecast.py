import sqlite3
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime
import os

ORDINAL_CONST = 736000
WEEK = 7

dirname = os.path.dirname(__file__)
path = os.path.dirname(os.path.dirname(dirname))
dbpath = os.path.join(path, 'db','database.db')

def retriveAllPrices(product_id):
    conn = sqlite3.connect(dbpath, check_same_thread=False)
    c = conn.cursor()
    prices = []
    dates = []

    for row in c.execute(f"SELECT products.name, prices.created_at, products.category_id, prices.price FROM products INNER JOIN prices ON products.id = prices.product_id WHERE products.link = (SELECT link FROM products WHERE id = {product_id});"):
        date = datetime.strptime(row[1], '%Y-%m-%d')
        price = row[3]
        prices.append([price])
        print(date)
        dates.append([date.toordinal() - ORDINAL_CONST])

    y = np.array(prices)
    X = np.array(dates)
    conn.commit()
    conn.close()
    return X, y


def forecast(product_id):
    X, y = retriveAllPrices(product_id)
    print(X)
    print(y)
    reg = LinearRegression(fit_intercept=True).fit(X, y)

    error = reg.score(X, y)  # mozemy dostac blad R^2
    coefficients = reg.coef_  # wspolczynniki
    bias = reg.intercept_
    print(f"Error: {error}")
    print(f"Coefficients: {coefficients}")
    print(f"Bias: {bias}")

    currDate = datetime.now().toordinal() - ORDINAL_CONST
    new_X = np.array([[currDate + WEEK]])
    pred_y = reg.predict(new_X)
    print(pred_y)

    result = round(pred_y[0][0], 2)
    if result < 0:
        result = -1

    return result
