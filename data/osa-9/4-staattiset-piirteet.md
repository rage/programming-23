---
path: '/osa-9/4-staattiset-piirteet'
title: 'Staattiset piirteet'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen:

- Ymmärrät käsitteet staattinen metodi ja luokkamuuttuja
- Tiedät miten staattiset piirteet eroavat olioiden piirteistä
- Osaat lisätä staattisia piirteitä omiin luokkiin

</text-box>

Olio-ohjelmoinnissa puhutaan _piirteistä_. Näillä tarkoitetaan olion ominaisuuksia, luokan sisälle kirjoitettuja aliohjelmia ja siinä määriteltyjä muuttujia.

Tähän mennessä olemme käsitelleen _olioiden piirteitä_ - eli oliometodeita ja attribuutteja. Olio-ohjelmointiin kuuluvat kuitenkin myös _luokan piirteet_, joita kutsutaan usein myös _staattisiksi piirteiksi_. Myös käsitettä _luokkamuuttuja_ käytetään.

## Luokkamuuttujat

Niin kuin on aikaisemmin opittu, jokaisella oliolla on omat itsenäiset arvonsa attribuuteille. Attribuuttien lisäksi luokassa voidaan määritellä _luokkamuuttujia_. Luokkamuuttujalla tarkoitetaan muuttujaa, jota käytetään luokan kautta - ei luokasta muodostettujen olioiden kautta. Luokkamuuttujalla on yksi yhteinen arvo riippumatta siitä, kuinka monta oliota luokasta muodostetaan.

Luokkamuuttujan määrittely eroaa attribuutista siinä, että se määritellään ilman `self`-aluketta. Jos luokkamuuttujaa halutaan käyttää koko luokassa (ja mahdollisesti luokan ulkopuoleltakin), se tulee määritellä metodien ulkopuolella.

```python

class Korkotili:
    yleiskorko = 0.03

    def __init__(self, tilinumero: str, saldo: float, korko: float):
        self.__tilinumero = tilinumero
        self.__saldo = saldo
        self.__korko = korko

    def lisaa_korko(self):
        # korko on yleiskorko + tilin korko
        korko_yhteensa = Korkotili.yleiskorko + self.__korko
        saldo += saldo * korko_yhteensa

    # havainnointimetodit
    @property
    def saldo(self):
        return self.__saldo


```

Koska yleiskorko on määritelty luokassa eikä metodin sisällä, eikä sen alustuksessa ole käytetty `self`-aluketta, se on luokkamuuttuja.

Luokkamuttujaan viitataan _luokan nimen_ avulla, esimerkiksi:

```python

if __name__ == "__main__":
    # Yleiskorko on olioista riippumaton
    print("Yleiskorko on", Korkotili.yleiskorko)

    tili = Korkotili("12345", 1000, 0.05)
    # Lisätään kokonaiskorko saldoon
    tili.lisaa_korko()
    print(tili.saldo)

```

<sample-output>

Yleiskorko on 0.03
1080.0

</sample-output>

Luokkamuuttujiin viitataan siis _luokan nimen avulla_, esimerkiksi `Korkotili.yleiskorko`, ja oliomuuttujiin eli attribuutteihin olion nimen avulla `tili.saldo`. Oliomuuttujiin voi luonnollisesti viitata vasta kun luokasta on muodostettu olio.

Luokkamuuttujaa on kätevä käyttää, kun halutaan arvoja jotka on jaettu kaikkien olioiden kesken. Edellisessä esimerkissä oletetaan, että kaikilla pankkitileillä on sama yleiskorkoprosentti, joiden lisäksi tilille voidaan erikseen määrittää oma korkoprosenttinsa. Yleiskorkokin voi muuttua, mutta muutos vaikuttaa kaikkiin luokasta muodostettuihin olioihin:

```python

class Korkotili:
    yleiskorko = 0.03

    def __init__(self, tilinumero: str, saldo: float, korko: float):
        self.__tilinumero = tilinumero
        self.__saldo = saldo
        self.__korko = korko
        abc = 123

    def lisaa_korko(self):
        # korko on yleiskorko + tilin korko
        korko_yhteensa = Korkotili.yleiskorko + self.__korko
        self.__saldo += self.__saldo * korko_yhteensa

    # havainnointimetodit
    @property
    def saldo(self):
        return self.__saldo

    @property
    def kokonaiskorko(self):
        return self.__korko + Korkotili.yleiskorko

if __name__ == "__main__":
    tili1 = Korkotili("12345", 100, 0.03)
    tili2 = Korkotili("54321", 200, 0.06)

    print("Yleiskorko:", Korkotili.yleiskorko)
    print(tili1.kokonaiskorko)
    print(tili2.kokonaiskorko)

    # Nostetaan yleiskorko 10:en prosenttiin
    Korkotili.yleiskorko = 0.10

    print("Yleiskorko:", Korkotili.yleiskorko)
    print(tili1.kokonaiskorko)
    print(tili2.kokonaiskorko)


```

<sample-output>

Yleiskorko: 0.03
0.06
0.09
Yleiskorko: 0.1
0.13
0.16

</sample-output>

Kun yleiskorko nousee, kaikkien luokasta määriteltyjen tilien kokonaiskorko nousee. Huomaa, että kokonaiskorko on määritelty havainnointimetodiksi, vaikkei vastaavaa attribuuttia olekaan suoraan määritelty - sen sijaan arvoksi lasketaan tilin koron ja yleiskoron summa.

Tarkastellaan vielä toista esimerkkiä
