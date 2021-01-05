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

    minimalPrice = min(myPrices).replace(',', '.')
    return minimalPrice
