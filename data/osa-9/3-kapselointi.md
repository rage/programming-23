---
path: '/osa-9/3-kapselointi'
title: 'Kapselointi'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät mitä tarkoitetaan kapseloinnilla
- Osaat muodostaa yksityisen attribuutin
- Osaat kirjoittaa attribuutille asetus- ja havainnointimetodit

</text-box>

Olio-ohjelmoinnissa asiakkaalla tarkoitetaan luokkaa tai siitä muodostettuja olioita käyttävää ohjelmaa. Luokka tarjoaa asiakkaalle _palveluja_, joiden avulla asiakas voi käyttää olioita. Päämääränä on, että

1) asiakkaan kannalta luokan ja olioiden käyttö on mahdollisimman yksinkertaista ja
2) olion _sisäinen eheys_ säilyy joka tilanteessa.

Sisäisellä eheydellä tarkoitetaan, että olion _tila_ (eli käytännössä olion attribuuttien arvot) pysyy koko ajan hyväksyttävänä. Virheellinen tila olisi esimerkiksi sellainen, jossa päivämäärää esittävälle oliolle kuukauden numero on 13, tai opiskelijaa esittävällä oliolla opintopistemäärä on negatiivinen luku.

Tarkastellaan esimerkkinä luokkaa Opiskelija:

```python

class Opiskelija:

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet: int):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero
        self.opintopisteet = opintopisteet

    def lisaa_suoritus(self, opintopisteet):
        # Lisätään attribuutin opintopisteet arvoksi
        # parametrimuuttujan opintopisteet arvo
        self.opintopisteet += opintopisteet

    def __repr__(self):
        return f"Opiskelija - nimi: {self.nimi}, op.nro: {self.opiskelijanumero}, opintopisteet: {self.opintopisteet}"

```

Opiskelija-olio tarjoaa asiakkaalle metodin `lisaa_suoritus`, jolla opintopisteitä voidaan lisätä, esimerkiksi:

```python

if __name__ == "__main__":
    oskari = Opiskelija("Oskari Opiskelija", "12345", 0)
    print(oskari)
    oskari.lisaa_suoritus(10)
    print(oskari

```

<sample-output>

Opiskelija - nimi: Oskari Opiskelija, op.nro: 12345, opintopisteet: 0
Opiskelija - nimi: Oskari Opiskelija, op.nro: 12345, opintopisteet: 10

</sample-output>

Asiakas pystyy kuitenkin muuttamaan opintopistemäärää myös suoraan viittaamalla attribuuttiin `opintopisteet`. Näin olio voi päätyä virheelliseen tilaan, jossa se ei ole enää sisäisesti eheä:

```python

if __name__ == "__main__":
    oskari = Opiskelija("Oskari Opiskelija", "12345", 0)
    oskari.lisaa_suoritus(10)
    print(oskari)
    oskari.opintopisteet -= 15
    print(oskari)

```

## Kapselointi

Luokka voi piilottaa attribuutit asiakkailta. Pythonissa tämä tapahtuu lisäämällä attribuuttimuuttujan nimen alkuun kaksi alaviivaa `__`:

```python

class Pankkikortti:

    # Attribuutti numero on piilotettu,
    # nimi on näkyvissä
    def __init__(self, numero: str, nimi: str):
        self.__numero = numero
        self.nimi = nimi

    def __repr__(self):
        return f"Pankkikortti - numero: {self.__numero}, nimi: {self.nimi}"

```

Piilotettu attribuutti ei näy asiakkaalle, vaan siihen viittaaminen aiheutta virheilmoituksen. Niinpä nimen voi tulostaa ja sitä voi muuttaa...

```python
if __name__ == "__main__":
    kortti = Pankkikortti("123456","Reijo Rahakas")
    print(kortti.nimi)
    kortti.nimi = "Reijo Rutiköyhä"
    print(kortti)
```

<sample-output>

Reijo Rahakas
Pankkikortti - numero: 123456, nimi: Reijo Rutiköyhä

</sample-output>

...mutta jos kortin numeroa yritetään tulostaa, seuraa virheilmoitus:

```python

if __name__ == "__main__":
    kortti = Pankkikortti("123456","Reijo Rahakas")
    print(kortti.__numero)

```

<sample-output>

AttributeError: 'Pankkikortti' object has no attribute '__numero'

</sample-output>

Tietojen piilottamista asiakkaalta kutsutaan _kapseloinniksi_. Nimensä mukaisesti attribuutti siis "suljetaan kapseliin", ja asiakkalle tarjotaan sopiva rajapinta, jonka kautta tietoa voi käsitellä.

Laajennetaan pankkikorttiesimerkkiä niin, että kortila on piilotettu attribuutti saldo ja tämän käsittelyyn tarkoitetut julkiset metodit, joiden avulla asiakas voi hallita saldoa:

```python

class Pankkikortti:

    # Attribuutti numero on piilotettu,
    # nimi on näkyvissä
    def __init__(self, numero: str, nimi: str, saldo: float):
        self.__numero = numero
        self.nimi = nimi
        self.__saldo = saldo

    def lisaa_rahaa(self, rahasumma: float):
        if rahasumma > 0:
            self.__saldo += rahasumma

    def kayta_rahaa(self, rahasumma: float):
        if rahasumma > 0 and rahasumma <= self.__saldo:
            self.__saldo -= rahasumma

    def __repr__(self):
        return f"Pankkikortti - numero: {self.__numero}, nimi: {self.nimi} saldo: {self.__saldo}"



if __name__ == "__main__":
    kortti = Pankkikortti("123456","Reijo Rahakas", 5000)
    print(kortti)

    kortti.lisaa_rahaa(500)
    print(kortti)

    kortti.kayta_rahaa(2500)
    print(kortti)

    # tämä ei onnistu, koska saldo ei riitä
    kortti.kayta_rahaa(10000)
    print(kortti)

```

<sample-output>

Pankkikortti - numero: 123456, nimi: Reijo Rahakas saldo: 5000
Pankkikortti - numero: 123456, nimi: Reijo Rahakas saldo: 5500
Pankkikortti - numero: 123456, nimi: Reijo Rahakas saldo: 3000
Pankkikortti - numero: 123456, nimi: Reijo Rahakas saldo: 3000

</sample-output>

Saldoa ei voi suoraan muuttaa, koska attribuutti on piilotettu, mutta sitä voi käsitellä metodien `lisaa_rahaa` ja `kayta_rahaa` avulla. Metodeihin voidaan sijoittaa sopivia tarkastuksia, joilla varmistetaan, että olion sisäinen eheys säilyy: esimerkiksi rahaa ei voi käyttää enempää kuin mitä kortilla on saldoa jäljellä.

<programming-exercise name='Auto' tmcname='osa09-09_auto'>

Toteuta luokka `Auto`, autolla on _kapseloituina attribuutteina_ tieto bensatankin sisällöstä (0-60 litraa) sekä ajetuista kilometreista.

Autolla on metodit

- `tankkaa()`, joka täyttää bensatankin
- `aja(km:int)`, joka ajaa parametrina olevan kilometrimäärän tai niin pitkälle kuin bensaa riittää, auto kuluttaa litran kilometrillä

Auto toimii seuraavasti


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

Python tarjoaa myös suoraviivaisemman syntaksin attribuuttien asettamiselle ja havainnoimiselle. Näissä käytetään niinsanottuja asetus- ja havainnointimetodeita.

Tarkastellaan ensin esimerkkinä yksinkertaista luokkaa `Lompakko`, jossa ainoa attribuutti `rahaa` on suojattu asiakkailta:

```python

class Lompakko:

    def __init__(self, rahaa: float):
        self.__rahaa = rahaa


    def __repr__(self):
        return f"Lompakko - rahaa: {self.__rahaa}"

```

Luokkaan voidaan lisätä asetus- ja havainnointimetodit, joilla asiakas voi hallita rahamäärää:

```python

class Lompakko:

    def __init__(self, rahaa: float):
        self.__rahaa = rahaa


    def __repr__(self):
        return f"Lompakko - rahaa: {self.__rahaa}"

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

Luokalle siis määritellään ensin _havainnointimetodi, joka palauttaa rahamäärän, ja sitten asetusmetodi, joka asettaa sen.

Kutsuminen tapahtuu esimerkiksi näin:

```python

# Testi
if __name__ == "__main__":
    lompsa = Lompakko(10)
    print(lompsa.rahaa)

    lompsa.rahaa = 50
    print(lompsa.rahaa)

    # Yritetään asettaa negatiivinen
    lompsa.rahaa = -30
    print(lompsa.rahaa)

```

<sample-output>

10
50
50

</sample-output>

Asiakkaan kannalta metodien kutsuminen muistuttaa itse asiassa attribuuttien kutsumista - kutsussa ei käytetä sulkuja: `lompsa.rahaa = 50`. Tarkoituksena onkin piilottaa (eli kapseloida) sisäinen toteutus, ja tarjota asiakkaalle vaivaton tapa muokata olion tietoja.

Edellisessä esimerkissä on kuitenkin yksi pieni vika: asiakas ei saa mitään viestiä siitä, että negatiivisen rahasumman asettaminen ei toimi. Kun arvo on selvästi virheellinen, hyvä tapa viestiä tästä on heittää poikkeus. Tässä tapauksessa oikea poikkeus voisi olla `ValueError`, joka kertoo että arvo on väärä.

Korjattu versio luokasta ja testikoodi:

```python

class Lompakko:

    def __init__(self, rahaa: float):
        self.__rahaa = rahaa

    def __repr__(self):
        return f"Lompakko - rahaa: {self.__rahaa}"

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
            raise ValueError("Rahasumma ei saa olla negatiivinen.")



# Testi
if __name__ == "__main__":

    # Yritetään asettaa negatiivinen
    lompsa.rahaa = -30
    print(lompsa.rahaa)

```

<sample-output>

ValueError: Rahasumma ei saa olla negatiivinen.

</sample-output>

Huomaa, että havainnointimetodi eli `@property`-annotaatio pitää esitellä luokassa ennen asetusmetodia, muuten seuraa virhe. Tämä johtuu siitä, että `@property`-annotaatio määrittelee käytettävän "asetusattribuutin" nimen (edellisessä esimerkiksi `rahaa`), ja asetusmetodi `.setter` liittää siihen uuden toiminnallisuuden.

<programming-exercise name='Äänite' tmcname='osa09-10_aanite'>

Kirjoita luokka `Aanite`, joka mallintaa yksittäistä äänitystä. Luokalla on yksi _yksityinen_ attribuutti, kokonaislukutyyppinen `pituus`.

Kirjoita luokalle

* konstruktori, joka saa parametrikseen pituuden
* havainnointimetodi `pituus`, joka palauttaa pituuden
* asetusmetodi, joka asettaa pituuden arvon

Jos pituudeksi yritetään asettaa nollaa pienempää arvoa joko konstruktorissa tai asetusmetodissa, tulee tuottaa virhe `ValueError`.

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

    def __repr__(self):
        return f"Pelaaja - nimi: {self.__nimi}, pelinumero: {self.__pelinumero}"

if __name__ == "__main__":
    p1 = Pelaaja("Pekka Palloilija", 10)
    print(p1.nimi)
    print(p1.pelinumero)

    p1.nimi = "Paula Palloilija"
    p1.pelinumero = 11

    print(p1)

```

<sample-output>

Pekka Palloilija
10
Pelaaja - nimi: Paula Palloilija, pelinumero: 11

</sample-output>

Kolmantena esimerkkinä tarkastellaan luokkaa, joka mallintaa päiväkirjaa. Huomaa, että omistajalla on asetus- ja havainnointimetodit, mutta merkintöjen lisäys on toteutettu "perinteisillä" metodeilla. Tämä siksi, että asiakkalle ei ole haluttu tarjota suoraan pääsyä tietorakenteeseen, johon merkinnät tallennetaan. Kapseloinnista on tässä sekin hyöty, että sisäistä toteutusta voidaan myöhemmin muuttaa (esim. vaihtamalla lista vaikka sanakirjaksi) ilman että asiakkaan täytyy muuttaa omaa ohjelmakoodiaan.

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

    # Lisää uuden merkinnän
    def lisaa_merkinta(self, merkinta: str):
        self.__merkinnat.append(merkinta)

    def __repr__(self):
        # Kootaan merkinnät yhdeksi merkkijonoksi
        merkinnat = ", ".join(self.__merkinnat)
        return f"Paivakirja - omistaja: {self.__omistaja}, merkinnät: {merkinnat}"

if __name__ == "__main__":
    pk = Paivakirja("Pekka")
    pk.lisaa_merkinta("Tänään söin puuroa")
    pk.lisaa_merkinta("Tänään opettelin olio-ohjelmointia")
    pk.lisaa_merkinta("Tänään menin ajoissa nukkumaan")
    print(pk)

```

<sample-output>

Paivakirja - omistaja: Pekka, merkinnät: Tänään söin puuroa, Tänään opettelin olio-ohjelmointia, Tänään menin ajoissa nukkumaan

</sample-output>

<programming-exercise name='Säähavaintoasema' tmcname='osa09-xx_saahavaintoasema'>

Kirjoita luokka `Havaintoasema`, johon voidaan tallentaa säähavaintoja. Luokalla on seuraavat julkiset piirteet:

* konstruktori, joka saa parametriksen aseman nimen
* metodi `lisaa_havainto(havainto: str)`, joka lisää havainnon listan peräään
* metodi `viimeisin_havainto()`, joka palauttaa viimeksi lisätyn havainnon
* metodi `havaintojen_maara()`, joka palauttaa havaintojen yhteismäärän

Luokan kaikkien attribuuttien pitää olla asiakkaalta suojattuja. Saat itse päättää luokan sisäisen toteutuksen.

Esimerkki luokan käytöstä:

```python

asema = Havaintoasema("Kumpula")
asema.lisaa_havainto("Sadetta 10mm")
asema.lisaa_havainto("Aurinkoista")
print(asema.viimeisin_havainto())

asema.lisaa_havainto("Ukkosta")
print(asema.viimeisin_havainto())

print(asema.havaintojen_maara())
```

<sample-output>

Aurinkoista
Ukkosta
3

</sample-output>

</programming-exercise>
