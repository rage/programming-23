---
path: '/osa-9/3-kapselointi'
title: 'Kapselointi'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

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

<programming-exercise name='Auto' tmcname='osa09-09_auto'>

Toteuta luokka `Auto`, jossa on _kapseloituina attribuutteina_ tieto bensatankin sisällöstä (0-60 litraa) sekä ajetuista kilometreista. Auto kuluttaa litran bensaa kilometrillä.

Luokalla on seuraavat metodit:

- `tankkaa()`, joka täyttää bensatankin
- `aja(km:int)`, joka ajaa parametrina olevan kilometrimäärän tai niin pitkälle kuin bensaa riittää
- `__str__`, joka näyttää esimerkin mukaisen kuvauksen autosta

Esimerkki luokan käyttämisestä:

```python
auto = Auto()
print(auto)
auto.tankkaa()
print(auto)
auto.aja(20)
print(auto)
auto.aja(50)
print(auto)
auto.aja(10)
print(auto)
auto.tankkaa()
auto.tankkaa()
print(auto)
```

<sample-output>

Auto: ajettu 0 km, bensaa 0 litraa
Auto: ajettu 0 km, bensaa 60 litraa
Auto: ajettu 20 km, bensaa 40 litraa
Auto: ajettu 60 km, bensaa 0 litraa
Auto: ajettu 60 km, bensaa 0 litraa
Auto: ajettu 60 km, bensaa 60 litraa

</sample-output>

**Huomaa**, että bensan ja ajettujen kilometrien määrä on kapseloitava, niihin ei tule pystyä vaikuttamaan muuten kuin auton metodeja kutsumalla.

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

<programming-exercise name='Äänite' tmcname='osa09-10_aanite'>

Kirjoita luokka `Aanite`, joka mallintaa yksittäistä äänitettä. Luokalla on yksi piilotettu attribuutti, kokonaislukutyyppinen `__pituus`.

Kirjoita luokalle

* konstruktori, joka saa parametrikseen pituuden
* havainnointimetodi `pituus`, joka palauttaa pituuden
* asetusmetodi, joka asettaa pituuden arvon

Luokkaa siis käytetään seuraavasti:

```python
the_wall = Aanite(43)
print(the_wall.pituus)
the_wall.pituus = 44
print(the_wall.pituus)
```

<sample-output>

43
44

</sample-output>

Jos pituudeksi yritetään asettaa nollaa pienempää arvoa joko konstruktorissa tai asetusmetodissa, tulee tuottaa virhe `ValueError`.

Jos et muista miten poikkeus tuotetaan, kertaa
[osan 6](/osa-6/3-virheet#poikkeusten-tuottaminen) materiaalista.

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

<programming-exercise name='Säähavaintoasema' tmcname='osa09-11_havaintoasema'>

Kirjoita luokka `Havaintoasema`, johon voidaan tallentaa säähavaintoja. Luokalla on seuraavat julkiset piirteet:

* konstruktori, joka saa parametriksen aseman nimen
* metodi `lisaa_havainto(havainto: str)`, joka lisää havainnon listan peräään
* metodi `viimeisin_havainto()`, joka palauttaa viimeksi lisätyn havainnon. Jos havaintoja ei ole tehty, metodi palauttaa _tyhjän merkkijonon_.
* metodi `havaintojen_maara()`, joka palauttaa havaintojen yhteismäärän
* metodi `__str__`, joka palauttaa aseman nimen ja havaintojen yhteismäärän alla olevan esimerkin mukaisessa muodossa.

Luokan kaikkien attribuuttien pitää olla asiakkaalta piilossa. Saat itse päättää luokan sisäisen toteutuksen.

Esimerkki luokan käytöstä:

```python
asema = Havaintoasema("Kumpula")
asema.lisaa_havainto("Sadetta 10mm")
asema.lisaa_havainto("Aurinkoista")
print(asema.viimeisin_havainto())

asema.lisaa_havainto("Ukkosta")
print(asema.viimeisin_havainto())

print(asema.havaintojen_maara())
print(asema)
```

<sample-output>

Aurinkoista
Ukkosta
3
Kumpula, 3 havaintoa

</sample-output>

</programming-exercise>
