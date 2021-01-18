import sqlite3
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime

ORDINAL_CONST = 737800
WEEK = 7

conn = sqlite3.connect(
    r'C:\Users\rados\Desktop\sem-4\jezyki-skryptowe\Projekt\WebCorsair\API\db\database.db')
c = conn.cursor()

# Do znalezienia wszystkich cen produktów w kategorii
allPrices = "SELECT products.name, products.created_at, products.category_id, prices.price FROM products INNER JOIN prices ON products.id = prices.product_id WHERE products.category_id = (SELECT category_id FROM products WHERE products.id = 1);"


def retriveAllPrices(product_id):
    prices = []
    dates = []

    for row in c.execute(f"SELECT products.name, products.created_at, products.category_id, prices.price FROM products INNER JOIN prices ON products.id = prices.product_id WHERE products.link = (SELECT link FROM products WHERE id = {product_id});"):
        date = datetime.strptime(row[1], '%Y-%m-%d')
        price = row[3]
        prices.append([price])
        dates.append([date.toordinal() - ORDINAL_CONST])

    y = np.array(prices)
    X = np.array(dates)

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
    print(currDate)
    new_X = np.array([[currDate + WEEK]])
    pred_y = reg.predict(new_X)
    print(pred_y)

    return round(pred_y[0][0], 2)


print(forecast(1))