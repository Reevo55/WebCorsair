from bs4 import BeautifulSoup
import requests

def getPrice(url):
    source = requests.get(url, allow_redirects=False).text
    soup = BeautifulSoup(source, "html.parser")
    myul = soup.findAll("ul", {"class": "product-offers-2020__list"})
    
    myPrices = []
    for ul in myul:
        price = ul.find("span", {"class" : "price"}).text
        myPrices.append(price)

    try: 
        minimalPrice = min(myPrices).replace(',', '.')
    except: 
        print('Bad link')
        minimalPrice = 9999

    return minimalPrice
