import sqlite3

conn = sqlite3.connect(r'C:\Users\rados\Desktop\sem-4\jezyki-skryptowe\Projekt\WebCorsair\API\db\example.db')

# Do znalezienia wszystkich cen danego produktu
# SELECT products.name, products.created_at, products.category_id, prices.price FROM products INNER JOIN prices ON products.id = prices.product_id WHERE products.id = 1;

# Do znalezienia wszystkich cen produktów w kategorii
#SELECT products.name, products.created_at, products.category_id, prices.price FROM products INNER JOIN prices ON products.id = prices.product_id
#WHERE products.category_id = (SELECT category_id FROM products WHERE products.id = 1);

def forecast(product_id):


