---
path: '/osa-9/5-staattiset-piirteet'
title: 'Staattiset piirteet'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen:

- Ymmärrät käsitteet luokkamuuttuja ja luokkametodi
- Tiedät miten staattiset piirteet eroavat olioiden piirteistä
- Osaat lisätä staattisia piirteitä omiin luokkiin

</text-box>

Olio-ohjelmoinnissa puhutaan _piirteistä_. Näillä tarkoitetaan olion ominaisuuksia: luokan sisälle kirjoitettuja metodeja ja luokassa määriteltyjä muuttujia.

Tähän mennessä olemme käsitelleen _olioiden piirteitä_ eli oliometodeita ja attribuutteja. Olio-ohjelmointiin kuuluvat kuitenkin myös _luokan piirteet_, joita kutsutaan usein myös _staattisiksi piirteiksi_. Myös käsitettä _luokkamuuttuja_ käytetään.

## Luokkamuuttujat

Kuten on aiemmin opittu, jokaisella oliolla on omat itsenäiset arvonsa attribuuteille. Attribuuttien lisäksi luokassa voidaan määritellä _luokkamuuttujia_ eli staattisia muuttujia. Luokkamuuttujalla tarkoitetaan muuttujaa, jota käytetään luokan kautta eikä luokasta muodostettujen olioiden kautta. Luokkamuuttujalla on yksi yhteinen arvo riippumatta siitä, montako oliota luokasta muodostetaan.

Luokkamuuttujan määrittely eroaa attribuutista siinä, että se määritellään ilman `self`-aluketta. Jos luokkamuuttujaa halutaan käyttää koko luokassa ja mahdollisesti luokan ulkopuoleltakin, se tulee määritellä metodien ulkopuolella.

```python
class Korkotili:
    yleiskorko = 0.03

    def __init__(self, tilinumero: str, saldo: float, korko: float):
        self.__tilinumero = tilinumero
        self.__saldo = saldo
        self.__korko = korko

    def lisaa_korko(self):
        # Korko on yleiskorko + tilin korko
        korko_yhteensa = Korkotili.yleiskorko + self.__korko
        self.__saldo += self.__saldo * korko_yhteensa

    @property
    def saldo(self):
        return self.__saldo
```

Koska yleiskorko on määritelty luokassa eikä metodin sisällä eikä sen alustuksessa ole käytetty `self`-aluketta, se on luokkamuuttuja.

Luokkamuttujaan viitataan luokan nimen avulla, esimerkiksi näin:

```python
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

Luokkamuuttujiin viitataan siis luokan nimen avulla, esimerkiksi `Korkotili.yleiskorko`, ja oliomuuttujiin eli attribuutteihin olion nimen avulla `tili.saldo`. Oliomuuttujiin voi luonnollisesti viitata vasta, kun luokasta on muodostettu olio.

Luokkamuuttujaa on kätevä käyttää, kun halutaan tallentaa arvoja, jotka on jaettu kaikkien olioiden kesken. Edellisessä esimerkissä oletetaan, että kaikilla pankkitileillä on sama yleiskorkoprosentti, jonka lisäksi tilille voidaan erikseen määrittää oma korkoprosenttinsa. Yleiskorkokin voi muuttua, mutta muutos vaikuttaa kaikkiin luokasta muodostettuihin olioihin:

```python
class Korkotili:
    yleiskorko = 0.03

    def __init__(self, tilinumero: str, saldo: float, korko: float):
        self.__tilinumero = tilinumero
        self.__saldo = saldo
        self.__korko = korko

    def lisaa_korko(self):
        # Korko on yleiskorko + tilin korko
        korko_yhteensa = Korkotili.yleiskorko + self.__korko
        self.__saldo += self.__saldo * korko_yhteensa

    @property
    def saldo(self):
        return self.__saldo

    @property
    def kokonaiskorko(self):
        return self.__korko + Korkotili.yleiskorko
```

```python
tili1 = Korkotili("12345", 100, 0.03)
tili2 = Korkotili("54321", 200, 0.06)

print("Yleiskorko:", Korkotili.yleiskorko)
print(tili1.kokonaiskorko)
print(tili2.kokonaiskorko)

# Nostetaan yleiskorko 10 prosenttiin
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

Kun yleiskorko nousee, kaikkien luokasta määriteltyjen tilien kokonaiskorko nousee. Huomaa, että kokonaiskorko on määritelty havainnointimetodiksi, vaikkei vastaavaa attribuuttia olekaan suoraan määritelty. Metodi palauttaa tilin koron ja yleiskoron summan.

Tarkastellaan vielä toista esimerkkiä. Luokassa `Puhelinnumero` on maatunnukset tallennettuna sanakirjaan. Lista maatunnuksista on yhteinen kaikille luokasta luoduille puhelinnumero-olioille, koska maatunnus saman maan puhelinnumeroille on aina sama.

```python
class Puhelinnumero:
    maatunnukset = {"Suomi": "+358", "Ruotsi": "+46", "Yhdysvallat": "+1"}

    def __init__(self, nimi: str, puhelinnumero: str, maa: str):
        self.__nimi = nimi
        self.__puhelinnumero = puhelinnumero
        self.__maa = maa

    @property
    def puhelinnumero(self):
        # Puhelinnumerosta jää etunolla pois, kun maatunnus lisätään alkuun
        return Puhelinnumero.maatunnukset[self.__maa] + " " + self.__puhelinnumero[1:]
```

```python
paulan_nro = Puhelinnumero("Paula Pythonen", "050 1234 567", "Suomi")
print(paulan_nro.puhelinnumero)
```

<sample-output>

+358 50 1234 567

</sample-output>

Kun puhelinnumero-olio luodaan, tallennetaan nimen ja numeron lisäksi maa. Kun numero haetaan havainnointimetodilla, haetaan numeron eteen maatunnus luokkamuuttujasta olion attribuuttiin tallennetun maatiedon avulla.

Esimerkkiluokka on toiminnallisuudeltaan melko vajavainen. Katsotaan vielä, miltä näyttäisi parempi toteutus, jossa on havainnointi- ja asetusmetodit eri attribuuteille:

```python
class Puhelinnumero:
    maatunnukset = {"Suomi": "+358", "Ruotsi": "+46", "Yhdysvallat": "+1"}

    def __init__(self, nimi: str, puhelinnumero: str, maa: str):
        self.__nimi = nimi
        # Tämä kutsuu metodia puhelinnumero.setter
        self.puhelinnumero = puhelinnumero
        # Tämä kutsuu metodia maa.setter
        self.maa = maa

    # Havainnointimetodissa yhdistetään maatunnus ja puhelinnumero
    @property
    def puhelinnumero(self):
        # Puhelinnumerosta jää etunolla pois, kun maatunnus lisätään alkuun
        return Puhelinnumero.maatunnukset[self.__maa] + " " + self.__puhelinnumero[1:]

    @puhelinnumero.setter
    def puhelinnumero(self, numero):
        # Varmistetaan, että puhelinnumerossa on vain numeroita ja välilyöntejä
        for merkki in numero:
            if merkki not in "1234567890 ":
                raise ValueError("Puhelinnumero saa sisältää vain lukuja ja välilyöntejä")
        self.__puhelinnumero = numero

    # Pelkkä puhelinnumero ilman maatunnusta
    @property
    def paikallinen_numero(self):
        return self.__puhelinnumero

    @property
    def maa(self):
        return self.__maa

    @maa.setter
    def maa(self, maa):
        # Varmistetaan, että maa on maatunnusten listalla
        if maa not in Puhelinnumero.maatunnukset:
            raise ValueError("Annettua maata ei löydy listalta.")
        self.__maa = maa

    @property
    def nimi(self):
        return self.__nimi

    @nimi.setter
    def nimi(self, nimi):
        self.__nimi = nimi

    def __str__(self):
        return f"{self.puhelinnumero} ({self.__nimi})"
```

```python
if __name__ == "__main__":
    pnro = Puhelinnumero("Pertti Python", "040 111 1111", "Ruotsi")
    print(pnro)
    print(pnro.puhelinnumero)
    print(pnro.paikallinen_numero)
```

<sample-output>

+46 40 111 1111 (Pertti Python)
+46 40 111 1111
040 111 1111

</sample-output>

<programming-exercise name='Postinumerot' tmcname='osa09-13_postinumerot'>

Tehtäväpohjassa on määritelty luokka `Kaupunki`, joka mallintaa yksittäistä kaupunkia.

Lisää luokkaan luokkamuuttuja postinumerot, joka viittaa sanakirjaan. Sanakirjassa jokainen avain on kaupungin nimi ja arvo postinumero. Molemmat ovat merkkijonoja.

Sanakirjasta tulee löytyä seuraavat postinumerot:

* Helsinki 00100
* Turku 20100
* Tampere 33100
* Jyväskylä 40100
* Oulu 90100

Muuta toiminnallisuutta ei tarvitse toteuttaa.

</programming-exercise>

## Luokkametodit

Luokkametodi eli staattinen metodi on luokassa oleva metodi, jota ei ole sidottu mihinkään luokasta muodostettuun olioon. Niinpä luokkametodia voi kutsua ilman, että luokasta muodostetaan oliota.

Luokkametodit ovat yleensä työkalumetodeja, jotka liittyvät jotenkin luokkaan mutta joita on tarkoituksenmukaista kutsua ilman olion muodostamista. Luokkametodit ovat yleensä julkisia, jolloin niitä voidaan kutsua sekä luokan ulkopuolelta että luokan ja siitä muodostettujen olioiden sisältä.

Luokkametodi merkitään annotaatiolla `@classmethod` ja sen ensimmäinen parametri on aina `cls`. Tunnistetta `cls` käytetään samaan tapaan kuin tunnistetta `self`, mutta erotuksena on, että `cls` viittaa luokkaan ja `self` viittaa olioon. Kummallekaan parametrille ei anneta kutsuessa arvoa, vaan Python tekee sen automaattisesti.

Esimerkiksi luokassa `Rekisteriote` voisi olla staattinen metodi, jolla voidaan tarkistaa, onko annettu rekisteritunnus oikeamuotoinen. Metodi on staattinen, jotta tunnuksen voi tarkastaa myös ilman, että luodaan uutta oliota luokasta:

```python
class Rekisteriote:
    def __init__(self, omistaja: str, merkki: str, vuosi: int, rekisteritunnus: str):
        self.__omistaja = omistaja
        self.__merkki = merkki
        self.__vuosi = vuosi

        # Kutsutaan metodia rekisteritunnus.setter
        self.rekisteritunnus = rekisteritunnus

    @property
    def rekisteritunnus(self):
        return self.__rekisteritunnus

    @rekisteritunnus.setter
    def rekisteritunnus(self, tunnus):
        if Rekisteriote.rekisteritunnus_kelpaa(tunnus):
            self.__rekisteritunnus = tunnus
        else:
            raise ValueError("Rekisteritunnus ei kelpaa")

    # Luokkametodi tunnuksen validoimiseksi
    @classmethod
    def rekisteritunnus_kelpaa(cls, tunnus: str):
        if len(tunnus) < 3 or "-" not in tunnus:
            return False

        # Tarkastellaan alku- ja loppuosaa erikseen
        alku, loppu = tunnus.split("-")

        # Alkuosassa saa olla vain kirjaimia
        for merkki in alku:
            if merkki.lower() not in "abcdefghijklmnopqrstuvwxyzåäö":
                return False

        # Loppuosassa saa olla vain numeroita
        for merkki in loppu:
            if merkki not in "1234567890":
                return False

        return True
```

```python
ote = Rekisteriote("Arto Autoilija", "Volvo", "1992", "abc-123")

if Rekisteriote.rekisteritunnus_kelpaa("xyz-789"):
    print("Tämä on validi tunnus!")
```

<sample-output>

Tämä on validi tunnus!

</sample-output>

Rekisteriotteen oikeellisuuden voi tarkistaa kutsumalla metodia (esimerkiksi `Rekisteriote.rekisteritunnus_kelpaa("xyz-789"))`) ilman, että muodostaa luokasta oliota. Samaa metodia kutsutaan myös uutta oliota muodostaessa luokan konstruktorista. Huomaa kuitenkin, että myös tässä kutsussa viitataan metodiin luokan nimen avulla eikä `self`-tunnisteella!

<programming-exercise name='Lista-apuri' tmcname='osa09-14_lista_apuri'>

Kirjoita luokka `ListaApuri`, jossa on seuraavat kaksi luokkametodia:

* Metodi `suurin_frekvenssi(lista: list)` palauttaa alkion, jota esiintyy annetussa listassa eniten
* Metodi `tuplia(lista: list)` palauttaa sellaisten alkioden lukumäärän, jotka esiintyvät listassa vähintään kahdesti

Metodeja tulee voida käyttää ilman, että luokasta luodaan oliota. Esimerkki luokan käytöstä:

```python
luvut = [1, 1, 2, 1, 3, 3, 4, 5, 5, 5, 6, 5, 5, 5]
print(ListaApuri.suurin_frekvenssi(luvut))
print(ListaApuri.tuplia(luvut))
```

<sample-output>

5
3

</sample-output>

</progarmming-exercise>
