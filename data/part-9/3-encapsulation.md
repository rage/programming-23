---
path: '/part-9/3-encapsulation'
title: 'Encapsulation'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, mitä tarkoitetaan kapseloinnilla
- Osaat muodostaa piilotetun attribuutin
- Osaat kirjoittaa attribuutille asetus- ja havainnointimetodit

</text-box>

Olio-ohjelmoinnissa asiakkaalla tarkoitetaan luokkaa tai siitä muodostettuja olioita käyttävää ohjelmaa. Luokka tarjoaa asiakkaalle _palveluja_, joiden avulla asiakas voi käyttää olioita. Päämääränä on, että

1) asiakkaan kannalta luokan ja olioiden käyttö on mahdollisimman yksinkertaista ja
2) olion _sisäinen eheys_ säilyy joka tilanteessa.

Sisäisellä eheydellä tarkoitetaan, että olion _tila_ (eli käytännössä olion attribuuttien arvot) pysyy koko ajan hyväksyttävänä. Virheellinen tila olisi esimerkiksi sellainen, jossa päivämäärää esittävälle oliolle kuukauden numero on 13 tai opiskelijaa esittävällä oliolla opintopistemäärä on negatiivinen luku.

Tarkastellaan esimerkkinä luokkaa Opiskelija:

```python
class Opiskelija:
    def __init__(self, nimi: str, opiskelijanumero: str):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero
        self.opintopisteet = 0

    def lisaa_suoritus(self, opintopisteet):
        if opintopisteet > 0:
            self.opintopisteet += opintopisteet
```

`Opiskelija`-olio tarjoaa asiakkaalle metodin `lisaa_suoritus`, jolla opintopisteitä voidaan lisätä. Metodi varmistaa, että lisättävä opintopisteiden määrä on positiivinen. Esimerkiksi seuraava koodi lisää kolme suoritusta:

```python
oskari = Opiskelija("Oskari Opiskelija", "12345")
oskari.lisaa_suoritus(5)
oskari.lisaa_suoritus(5)
oskari.lisaa_suoritus(10)
print("Opintopisteet:", oskari.opintopisteet)
```

<sample-output>

Opintopisteet: 20

</sample-output>


Asiakas pystyy kuitenkin muuttamaan opintopistemäärää myös suoraan viittaamalla attribuuttiin `opintopisteet`. Näin olio voi päätyä virheelliseen tilaan, jossa se ei ole enää sisäisesti eheä:

```python
oskari = Opiskelija("Oskari Opiskelija", "12345")
oskari.opintopisteet = -100
print("Opintopisteet:", oskari.opintopisteet)
```

<sample-output>

Opintopisteet: -100

</sample-output>

## Kapselointi

Luokka voi piilottaa attribuutit asiakkailta. Pythonissa tämä tapahtuu lisäämällä attribuuttimuuttujan nimen alkuun kaksi alaviivaa `__`:

```python
class Pankkikortti:
    # Attribuutti numero on piilotettu, nimi on näkyvissä
    def __init__(self, numero: str, nimi: str):
        self.__numero = numero
        self.nimi = nimi
```

Piilotettu attribuutti ei näy asiakkaalle, vaan siihen viittaaminen aiheutta virheilmoituksen. Niinpä nimen voi tulostaa ja sitä voi muuttaa:

```python
kortti = Pankkikortti("123456","Reijo Rahakas")
print(kortti.nimi)
kortti.nimi = "Reijo Rutiköyhä"
print(kortti.nimi)
```

<sample-output>

Reijo Rahakas
Reijo Rutiköyhä

</sample-output>

Mutta jos kortin numeroa yritetään tulostaa, seuraa virheilmoitus:

```python
kortti = Pankkikortti("123456","Reijo Rahakas")
print(kortti.__numero)
```

<sample-output>

AttributeError: 'Pankkikortti' object has no attribute '__numero'

</sample-output>

Tietojen piilottamista asiakkaalta kutsutaan _kapseloinniksi_. Nimensä mukaisesti attribuutti siis "suljetaan kapseliin" ja asiakkalle tarjotaan sopiva rajapinta, jonka kautta tietoa voi käsitellä.

Laajennetaan pankkikorttiesimerkkiä niin, että kortilla on piilotettu attribuutti saldo ja tämän käsittelyyn tarkoitetut julkiset metodit, joiden avulla asiakas voi hallita saldoa:

```python
class Pankkikortti:
    def __init__(self, numero: str, nimi: str, saldo: float):
        self.__numero = numero
        self.nimi = nimi
        self.__saldo = saldo

    def lisaa_rahaa(self, maara: float):
        if maara > 0:
            self.__saldo += maara

    def kayta_rahaa(self, maara: float):
        if maara > 0 and maara <= self.__saldo:
            self.__saldo -= maara

    def hae_saldo(self):
        return self.__saldo
```

```python
kortti = Pankkikortti("123456", "Reijo Rahakas", 5000)
print(kortti.hae_saldo())
kortti.lisaa_rahaa(100)
print(kortti.hae_saldo())
kortti.kayta_rahaa(500)
print(kortti.hae_saldo())
# Tämä ei onnistu, koska saldo ei riitä
kortti.kayta_rahaa(10000)
print(kortti.hae_saldo())
```

<sample-output>

5000
5100
4600
4600

</sample-output>

Saldoa ei voi suoraan muuttaa, koska attribuutti on piilotettu, mutta sitä voi muuttaa metodeilla `lisaa_rahaa` ja `kayta_rahaa` ja sen voi hakea metodilla `hae_saldo`. Metodeihin voidaan sijoittaa sopivia tarkastuksia, joilla varmistetaan, että olion sisäinen eheys säilyy: esimerkiksi rahaa ei voi käyttää enempää kuin kortilla on saldoa jäljellä.

<programming-exercise name='Car' tmcname='part09-09_car'>

Please implement a class named `Car` which has two private, _encapsulated_ variables: the amount of petrol in the tank (0 to 60 litres) and odometer reading (in kilometres). The car consumes one litre of petrol per kilometre.

The class should also contain the following methods:

- `fill_up()` which fills up the tank
- `drive(km:int)` which drives the car for the distance indicated, or for however long the petrol in the tank allows
- `__str__` which returns a string representation of the car as per the examples below

An example of how the class is used:

```python
car = Car()
print(car)
car.fill_up()
print(car)
car.drive(20)
print(car)
car.drive(50)
print(car)
car.drive(10)
print(car)
car.fill_up()
car.fill_up()
print(car)
```

<sample-output>

Car: odometer reading 0 km, petrol remaining 0 litres
Car: odometer reading 0 km, petrol remaining 60 litres
Car: odometer reading 20 km, petrol remaining 40 litres
Car: odometer reading 60 km, petrol remaining 0 litres
Car: odometer reading 60 km, petrol remaining 0 litres
Car: odometer reading 60 km, petrol remaining 60 litres

</sample-output>

**NB:** you are asked to encapsulate the amount of petrol left and the odometer reading. It should not be possible to access them directly from outside the class's own methods.

</programming-exercise>

## Asetus- ja havainnointimetodit

Python tarjoaa myös suoraviivaisemman syntaksin attribuuttien havainnoimiselle ja asettamiselle. Tarkastellaan ensin esimerkkinä yksinkertaista luokkaa `Lompakko`, jossa ainoa attribuutti `rahaa` on suojattu asiakkailta:

```python
class Lompakko:
    def __init__(self):
        self.__rahaa = 0
```

Luokkaan voidaan lisätä havainnointi- ja asetusmetodit, joilla asiakas voi hallita rahamäärää:

```python
class Lompakko:
    def __init__(self):
        self.__rahaa = 0

    # Havainnointimetodi
    @property
    def rahaa(self):
        return self.__rahaa

    # Asetusmetodi
    @rahaa.setter
    def rahaa(self, rahaa):
        if rahaa >= 0:
            self.__rahaa = rahaa
```

Luokalle siis määritellään ensin havainnointimetodi, joka palauttaa rahamäärän, ja sitten asetusmetodi, joka asettaa rahamäärän ja varmistaa, että uusi rahamäärä ei ole negatiivinen.

Kutsuminen tapahtuu esimerkiksi näin:

```python
lompsa = Lompakko()
print(lompsa.rahaa)

lompsa.rahaa = 50
print(lompsa.rahaa)

lompsa.rahaa = -30
print(lompsa.rahaa)
```

<sample-output>

0
50
50

</sample-output>

Asiakkaan kannalta metodien kutsuminen muistuttaa attribuuttien kutsumista, koska kutsussa ei käytetä sulkuja vaan voi kirjoittaa esimerkiksi`lompsa.rahaa = 50`. Tarkoituksena onkin piilottaa (eli kapseloida) sisäinen toteutus ja tarjota asiakkaalle vaivaton tapa muokata olion tietoja.

Edellisessä esimerkissä on kuitenkin yksi pieni vika: asiakas ei saa mitään viestiä siitä, että negatiivisen rahasumman asettaminen ei toimi. Kun arvo on selvästi virheellinen, hyvä tapa viestiä tästä on heittää poikkeus. Tässä tapauksessa oikea poikkeus voisi olla `ValueError`, joka kertoo että arvo on väärä.

Korjattu versio luokasta ja testikoodi:

```python
class Lompakko:
    def __init__(self):
        self.__rahaa = 0

    # Havainnointimetodi
    @property
    def rahaa(self):
        return self.__rahaa

    # Asetusmetodi
    @rahaa.setter
    def rahaa(self, rahaa):
        if rahaa >= 0:
            self.__rahaa = rahaa
        else:
            raise ValueError("Rahasumma ei saa olla negatiivinen")
```

```python
lompsa.rahaa = -30
print(lompsa.rahaa)
```

<sample-output>

ValueError: Rahasumma ei saa olla negatiivinen

</sample-output>

Huomaa, että havainnointimetodi eli `@property`-dekoraattori pitää esitellä luokassa ennen asetusmetodia, muuten seuraa virhe. Tämä johtuu siitä, että `@property`-dekoraattori määrittelee käytettävän "asetusattribuutin" nimen (edellisessä esimerkiksi `rahaa`), ja asetusmetodi `.setter` liittää siihen uuden toiminnallisuuden.

<programming-exercise name='Recording' tmcname='part09-10_recording'>

Please create a class named `Recording` which models a single recording. The class should have one private variable: `__length` of type integer.

Please implement the following:

* a constructor which takes the length as an argument
* a getter method `length` which returns the length of the recording
* a setter method which sets the length of the recording

It should be possible to make use of the class as follows:

```python
the_wall = Recording(43)
print(the_wall.length)
the_wall.length = 44
print(the_wall.length)
```

<sample-output>

43
44

</sample-output>


If the argument for either the constructor or the setter method is below zero, this should raise a `ValueError`.

If you need a refresher on raising exceptions, please see [part 6](/part-6/3-errors#raising-exceptions) of the course materials.

</programming-exercise>

Katsotaan vielä esimerkki luokasta, jolla on kaksi suojattua attribuuttia ja molemmille havainnointi- ja asetusmetodit:

```python
class Pelaaja:
    def __init__(self, nimi: str, pelinumero: int):
        self.__nimi = nimi
        self.__pelinumero = pelinumero

    @property
    def nimi(self):
        return self.__nimi

    @nimi.setter
    def nimi(self, nimi: str):
        if nimi != "":
            self.__nimi = nimi
        else:
            raise ValueError("Nimi ei voi olla tyhjä")

    @property
    def pelinumero(self):
        return self.__pelinumero

    @pelinumero.setter
    def pelinumero(self, pelinumero: int):
        if pelinumero > 0:
            self.__pelinumero = pelinumero
        else:
            raise ValueError("Pelinumeron täytyy olla positiviinen kokonaisluku")
```

```python
pelaaja = Pelaaja("Pekka Palloilija", 10)
print(pelaaja.nimi)
print(pelaaja.pelinumero)

pelaaja.nimi = "Paula Palloilija"
pelaaja.pelinumero = 11
print(pelaaja.nimi)
print(pelaaja.pelinumero)
```

<sample-output>

Pekka Palloilija
10
Paula Palloilija
11

</sample-output>

Kolmantena esimerkkinä tarkastellaan luokkaa, joka mallintaa päiväkirjaa. Huomaa, että omistajalla on asetus- ja havainnointimetodit, mutta merkintöjen lisäys on toteutettu "perinteisillä" metodeilla. Tämä siksi, että asiakkalle ei ole haluttu tarjota suoraan pääsyä tietorakenteeseen, johon merkinnät tallennetaan. Kapseloinnista on tässä sekin hyöty, että sisäistä toteutusta voidaan myöhemmin muuttaa (esim. vaihtamalla lista vaikka sanakirjaksi) ilman, että asiakkaan täytyy muuttaa omaa koodiaan.

```python
class Paivakirja:
    def __init__(self, omistaja: str):
        self.__omistaja = omistaja
        self.__merkinnat = []

    @property
    def omistaja(self):
        return self.__omistaja

    @omistaja.setter
    def omistaja(self, omistaja):
        if omistaja != "":
            self.__omistaja = omistaja
        else:
            raise ValueError("Omistaja ei voi olla tyhjä")

    def lisaa_merkinta(self, merkinta: str):
        self.__merkinnat.append(merkinta)

    def tulosta(self):
        print("Yhteensä", len(self.__merkinnat), "merkintää")
        for merkinta in self.__merkinnat:
            print("- " + merkinta)
```

```python
paivakirja = Paivakirja("Pekka")
paivakirja.lisaa_merkinta("Tänään söin puuroa")
paivakirja.lisaa_merkinta("Tänään opettelin olio-ohjelmointia")
paivakirja.lisaa_merkinta("Tänään menin ajoissa nukkumaan")
paivakirja.tulosta()
```

<sample-output>

Yhteensä 3 merkintää
- Tänään söin puuroa
- Tänään opettelin olio-ohjelmointia
- Tänään menin ajoissa nukkumaan

</sample-output>

<programming-exercise name='Weather station' tmcname='part09-11_weather_station'>

Please create a class named `WeatherStation` which is used to store observations about the weather. The class should have the following public attributes:

* a constructor shich takes the name of the station as its argument
* a method named `add_observation(observation: str)` which adds an observation as the last entry in a list
* a method named `latest_observation()` which returns the latest observation added to the list. If there are no observations yet, the method should return an _empty string_.
* a method named `number_of_observations()` which returns the total number of observations added
* a `__str__` method which returns the name of the station and the total number of observations added as per the example below.

All variables used to handle data should be encapsulated so they can't be directly accessed. It is up to you how you implement the class, as long as the interface is as described above.

An example of how the class is used:

```python
station = WeatherStation("Houston")
station.add_observation("Rain 10mm")
station.add_observation("Sunny")
print(station.latest_observation())

station.add_observation("Thunderstorm")
print(station.latest_observation())

print(station.number_of_observations())
print(station)
```

<sample-output>

Sunny
Thunderstorm
3
Houston, 3 observations

</sample-output>

</programming-exercise>
