### WebCorsair
Web Crawling Full Stack application created with Flask and React.

# Cel aplikacji

Aplikacja została stworzona w celu umożliwienia użytkownikom, śledzenie cen produktów bez aktywnego udziału ludzkiego. Zamysłem było stworzenie systemu, do którego użytkownicy po zarejestrowaniu, będą mogli dodawać produkty, które chcą śledzić. 
Śledzenie polega na biernym pobieraniu odczytów cen z polskiej porównywarki cen produktów – ceneo. Jednym z celów było umożliwienie użytkownikowi bycia gotowym na obniżke danych cen poniżej oczekiwanego poziomu. W tym celu wykorzystuje komunikacje e-mail z użytkownikami systemu. Gdy produkt spadnie poniżej oczekiwanej ceny, wysyłany jest e-mail. 
Kolejną funkcją aplikacji jest możliwość przewidzenia ceny. Dzięki użyciu regresji liniowej, wykrywam tendencje ceny, na podstawie tego jaka cena powinna wg. predykcji być za tydzień, dzięki temu użytkownik może podjąć bardziej świadomą decyzje dotyczącą zakupu.


##Back End
# Wykorzystane biblioteki

Lista:
Flask – framework służący do pisania aplikacji webowych w języku Python. 
Flask_restful – rozbudowa do Flask, która umożliwia budowanie REST APIs. Posłużyło mi do stworzenia REST API.

SQLAlchemy – biblioteka służąca do pracy z bazami danych oraz mapowania obiektowo-relacyjnego. Posłużyła mi jako główne narzędzie do obsługi bazy danych na potrzeby API.

Sqlite3 – lekka biblioteka do zarządzania bazą danych SQLite. Pomogła mi do szybkiego zczytywania danych do tworzenia modelu regresji liniowej.

BeautifulSoap – biblioteka służąca do analizowani dokumentów HTML i XML. Posłużyła mi do stworzenia robota internetowego zczytującego strony ceneo.

Scikit-learn – biblioteka do uczenia maszynowego. Wykorzystałem ją do tworzenia modeli liniowych dla danych produktów, na których podstawie mogę pokazywać predykcję użytkownikom.

Numpy – biblioteka pomagająca w obsłudze dużych tablic oraz macierzy. Posłużyła mi jako wsparcie do scikit-learn.

Apscheduler – biblioteka służąca do planowania egzekucji kodu w planowanym czasie.

# Front End

React - biblioteka służąca do tworzenia stron internetowych

antdesign - biblioteka z gotowymi componentami, pomocna przy budowie UI

novio - biblioteka służąca do tworzenia wykresów


# Pokaz działania

https://youtu.be/BbTH-ir3dq0

# Screen shots

![image](https://user-images.githubusercontent.com/41492536/105156945-c4894e00-5b0c-11eb-8677-8d02c93e478b.png)
![image](https://user-images.githubusercontent.com/41492536/105156955-c81cd500-5b0c-11eb-8979-0654beaadfc8.png)
![image](https://user-images.githubusercontent.com/41492536/105156961-c9e69880-5b0c-11eb-964b-3f7320e360b3.png)
![image](https://user-images.githubusercontent.com/41492536/105156971-cbb05c00-5b0c-11eb-92e3-5d718995dda3.png)
![image](https://user-images.githubusercontent.com/41492536/105156973-cc48f280-5b0c-11eb-9a9f-5e91f9f0e7a4.png)
![image](https://user-images.githubusercontent.com/41492536/105156977-ce12b600-5b0c-11eb-84e1-587a9a490bf4.png)
![image](https://user-images.githubusercontent.com/41492536/105156982-ceab4c80-5b0c-11eb-8210-39e2c12e8a87.png)
![image](https://user-images.githubusercontent.com/41492536/105156989-d0751000-5b0c-11eb-8648-22794458f0dd.png)
