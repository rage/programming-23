---
path: '/osa-9/5-lisaa-esimerkkeja'
title: 'Lisää esimerkkejä'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tässä osiossa

- Käydään läpi lisää esimerkkejä luokista ja olioista
. Kerrataan parametrien oletusarvojen toiminta ja tarkastellaan, miten niitä voi hyödyntää metodeissa

</text-box>

Tarkastellaan seuraavaksi esimerkkiä, joka muodostuu kahdesta eri luokasta. Luokka `Piste` mallintaa yhtä pistettä kaksiulotteisessa koordinaatistossa ja luokka `Jana` kahden pisteen väliin jäävää janaa. Luokkien toiminta on kommentoitu ohjelmakoodiin


```python

import math

class Piste:
    """ Luokka mallintaa pistettä kaksiulotteisessa koordinaatistossa """

    def __init__(self, x: float, y: float):
        # Attribuutit voivat olla julkisia, koska
        # mitkä tahansa arvot käyvät x:n ja y:n arvoiksi
        self.x = x
        self.y = y

    # Staattinen metodi, joka palauttaa uuden pisteen paikassa (0, 0)
    # Huomaa, että luokan sisältä voi siis palauttaa uuden instanssin luokasta
    @classmethod
    def origo(cls):
        return Piste(0, 0)

    # Staattinen metodi, joka muodostaa uuden pisteen annetun pisteen perusteella
    # Uusi piste on peilikuva annetusta pisteestä jomman kumman tai molempien akselien suhteen
    # Esim pisteen (1, 3) peilikuva x-akselin suhteen on (-1, 3)
    @classmethod
    def peilikuva(cls, piste, peilaa_x: bool, peilaa_y: bool):
        x = piste.x
        y = piste.y
        if peilaa_x:
            x = -x
        if peilaa_y:
            y = -y

        return Piste(x, y)

    def __repr__(self):
        return f"Piste - ({self.x}, {self.y})"


class Jana:
    """ Luokka mallintaa janaa kaksiulotteisessa koordinaatistossa """

    def __init__(self, alku: Piste, loppu: Piste):
        # Taaskaan ei tarvita eriskeen asetus- ja havainnointimetodeita,
        # mitkä tahansa pisteet käyvät janan päätepisteiksi
        self.alku = alku
        self.loppu = loppu

    # Metodi palauttaa janan pituuden
    def pituus(self):
        summa = (self.loppu.x - self.alku.x) ** 2 + (self.loppu.y - self.alku.y) ** 2
        return math.sqrt(summa)

    # Metodi palauttaa janan keskipisteen
    def keskipiste(self):
        keskix = (self.alku.x + self.loppu.x) / 2
        keskiy = (self.alku.y + self.loppu.y) / 2
        return Piste(keskix, keskiy)

    def __repr__(self):
        return f"Jana - alku: {self.alku}, loppu {self.loppu}"


# Testataan
if __name__ == "__main__":
    piste = Piste(1,3)
    print(piste)

    origo = Piste.origo()
    print(origo)

    piste2 = Piste.peilikuva(piste, True, True)
    print(piste2)

    jana = Jana(piste, piste2)
    print(jana.pituus())
    print(jana.keskipiste())
    print(jana)

```

<sample-output>

Piste - (1, 3)
Piste - (0, 0)
Piste - (-1, -3)
6.324555320336759
Piste - (0.0, 0.0)
Jana - alku: Piste - (1, 3), loppu Piste - (-1, -3)

</sample-output>

## Parametrien oletusarvot

Pythonissa mille tahansa parametrille voidaan asettaa oletusarvo. Oletusarvot toimivat niin metodien parametrien kuin tavallisten funktioiden parametrien kanssa.

Jos parametrille on annettu oletusarvo, sille ei ole pakko antaa arvoa kutsuttaessa. Jos arvo annetaan, se kumoaa oletusarvon; jos arvoa ei anneta, käytetään oletusarvoa.

Oletusarvot ovat usein hyödyllisiä konstruktoreissa: jos on oletettavaa, ettei tiettyä tietoa ole aina olemassa oliota luodessa, on parempi antaa sille vakioarvo konstruktorissa kuin antaa tämä asiakkaan huoleksi. Paitsi että tämä on asiakkaalle helpompaa, se myös ylläpitää olion sisäistä eheyttä, kun voidaan esimerkiksi olla varmoja, että "tyhjä" arvo on aina samanlainen (muuten esim. tyhjä voisi olla  esim. merkkijono `""`, arvo `None` tai vaikka merkkijono `"ei asetettu"` tms.)

Tarkastellaan esimerkkinä luokkaa, joka mallintaa Opiskelijaa. Pakollisia kenttiä luodessa ovat opiskelijanumero ja nimi (ja näistä opiskelijanumeroa ei pysty myöhemmin muuttamaan) - opintopisteet ja muistiinpanot voi halutessaan antaa oliota luodessa, mutta niille on myös asetettu oletusarvot. Luokan toiminta on kommentoitu suoraan ohjelmakoodin yhteyteen.

```python

class Opiskelija:
    """ Mallintaaa yhtä opiskelijaa """

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet:int = 0, muistiinpanot:str = ""):
        # kutsuu asetusmetodia
        self.nimi = nimi

        if len(opiskelijanumero) < 5:
            raise ValueError("Opiskelijanumerossa on vähintään 5 merkkiä")

        self.__opiskelijanumero = opiskelijanumero

        # Kutsuu asetusmetodia
        self.opintopisteet = opintopisteet

        self.__muistiinpanot = muistiinpanot

    @property
    def nimi(self):
        return self.__nimi

    @nimi.setter
    def nimi(self, nimi):
        if nimi != "":
            self.__nimi = nimi
        else:
            raise ValueError("Nimi ei voi olla tyhjä")

    @property
    def opiskelijanumero(self):
        return self.__opiskelijanumero

    @property
    def opintopisteet(self):
        return self.__opintopisteet

    @opintopisteet.setter
    def opintopisteet(self, op):
        if op >= 0:
            self.__opintopisteet = op
        else:
            raise ValueError("Opintopisteet ei voi olla negatiivinen luku")


    @property
    def muistiinpanot(self):
        return self.__muistiinpanot

    @muistiinpanot.setter
    def muistiinpanot(self, mp):
        self.muistiinpanot = muistiinpanot

    def __repr__(self):
        # Selkeyden vuoksi jaettu kahdelle riville
        rp = f"Opiskelija - nimi: {self.__nimi}, op.nro: {self.opiskelijanumero},"
        rp += f" opintopisteitä: {self.__opintopisteet}, muistiinpanot: {self.muistiinpanot}"
        return rp

# Testi
if __name__ == "__main__":
    # Annetaan pelkkä nimi ja op.nro
    o1 = Opiskelija("Olli Opiskelija", "12345")
    print(o1)

    # Annetaan nimi, op.nro ja opintopisteet
    o2 = Opiskelija("Outi Opiskelija", "54321", 25)
    print(o2)

    # Annetaan kaikki tiedot
    o3 = Opiskelija("Olavi Opiskelija", "99999", 140, "Lisäaika tentissä")
    print(o3)

    # Ei anneta opintopisteitä, mutta annetaan muistiinpanot
    # Huomaa, että parametri pitää nyt nimetä, kun järjestys ei ole oikea
    o4 = Opiskelija("Onerva Opiskelija", "98765", muistiinpanot="Poissaoleva lukuvuonna 20-21")
    print(o4)

```

<sample-output>

Opiskelija - nimi: Olli Opiskelija, op.nro: 12345, opintopisteitä: 0, muistiinpanot:
Opiskelija - nimi: Outi Opiskelija, op.nro: 54321, opintopisteitä: 25, muistiinpanot:
Opiskelija - nimi: Olavi Opiskelija, op.nro: 99999, opintopisteitä: 140, muistiinpanot: Lisäaika tentissä
Opiskelija - nimi: Onerva Opiskelija, op.nro: 98765, opintopisteitä: 0, muistiinpanot: Poissaoleva lukuvuonna 20-21

</sample-output>

Huomaa, että attribuutille opiskelijanumero ei ole määritelty asetusmetodia - ideana on, että opiskelijanumero ei voi muuttua.

