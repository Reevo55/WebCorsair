from bs4 import BeautifulSoup
import requests

def getPrice(url):
    source = requests.get(url, allow_redirects=False).text
    soup = BeautifulSoup(source, "html.parser")
    myul = soup.findAll("ul", {"class": "product-offers-2020__list"})
    
    myPrices = []
    for ul in myul:
        prices = ul.findAll("span", {"class" : "price"})
        for price in prices:
            myPrices.append(price.text)
    
    print(myPrices)
    
    try: 
        minimalPrice = min(myPrices).replace(',', '.')
    except: 
        print('Bad link')
        minimalPrice = 999999

    return minimalPrice
