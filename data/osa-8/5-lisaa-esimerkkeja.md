---
path: '/osa-8/5-lisaa-esimerkkeja'
title: 'Lisää esimerkkejä'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tässä osiossa

- Tutustutaan metodiin __str__
- Esitellään lisää esimerkkejä luokista ja niistä muodostettavista olioista

</text-box>


## Esimerkki 1: Luokka Suorakulmio

Tarkastellaan seuraavaksi luokkaa, joka mallintaa suorakulmiota kaksiulotteisessa koordinaatistossa.

```python

class Suorakulmio:
    # vasen yläkulma
    __vasen_ylakulma = (0,0)

    # leveys ja korkeus
    __leveys = 0
    __korkeus = 0

    # Konstruktori
    def __init__(self, ylakulma: tuple, leveys: int, korkeus: int):
        self.__vasen_ylakulma = ylakulma
        self.__leveys = leveys
        self.__korkeus = korkeus

    # Metodi palauttaa neliö pinta-alan
    def pinta_ala(self):
        return self.__leveys * self.__korkeus

    # Metodi palauttaa neliön piirin
    def piiri(self):
        return self.__leveys * 2 + self.__korkeus * 2

    # Metodi palauttaa neliön oikean alakulman koordinaatit
    def oikea_alakulma(self):
        x = self.__vasen_ylakulma[0]
        y = self.__vasen_ylakulma[1]
        return (x + self.__leveys, y + self.__korkeus)

    # Metodi siirtää neliötä koordinaatistossa
    def siirra(self, x_askeleet: int, y_askeleet: int):
        x = self.__vasen_ylakulma[0] + x_askeleet
        y = self.__vasen_ylakulma[1] + y_askeleet
        self.__vasen_ylakulma = (x, y)

    # Havainnointi ja asetusmetodit
    def anna_vasen_ylakulma(self):
        return self.__vasen_ylakulma

    def aseta_vasen_ylakulma(self, vasen_ylakulma: tuple):
        if type(vasen_ylakulma) == tuple and len(vasen_ylakulma) == 2:
            self.__vasen_ylakulma = vasen_ylakulma

    def anna_leveys(self):
        return self.__leveys

    def aseta_leveys(self, leveys: int):
        if leveys >= 0:
            self.__leveys = leveys

    def anna_korkeus(self):
        return self.__korkeus

    def aseta_korkeus(self, korkeus: int):
        if korkeus >= 0:
            self.__korkeus = korkeus



# Testataan
suorakulmio = Suorakulmio((1,1), 5, 3)
print(suorakulmio.piiri())
print(suorakulmio.pinta_ala())
print(suorakulmio.oikea_alakulma())

suorakulmio.siirra(3, 3)
print(suorakulmio.anna_vasen_ylakulma())
print(suorakulmio.oikea_alakulma())

```

<sample-output>

16
15
(6, 4)
(4, 4)
(9, 7)

</sample-output>

Suorakulmion koordinaatit on tallennettu tuplena, joka sisältää kaksi kokonaislukua (käyttötarkoituksesta riippuen voisi olla järkevää tallentaa koordinaatit myös liukulukuna). Olisi mahdollista kirjoittaa myös koordinaateille oma luokkansa, mutta tässä yhteydessä tuple on riittävän toimiva vaihtoehto. Suorakulmioluokkaa itseään on helppo laajentaa, jos tarvitaan lisää ominaisuuksia.

## Olion tulostaminen

Kun omasta luokasta luotu olio tulostetaan sellaisenaan print-lauseella, lopputulos ei (varsinkaan loppukäyttäjän kannalta) ole kovin selkeä:

``` python

# Viitaten edelliseen esimerkkiin: tulosteen suorakulmio-olio

sk = Suorakulmio((5, 3), 8, 4)
print(sk)

```

<sample-output>

<__main__.Suorakulmio object at 0x000002D7BF148A90>

</sample-output>

Järkevämpi tulostus oliolle voidaan määritellä kirjoittamalla luokkaan metodi `__repr__(self)`, joka palauttaa merkkijonon. Python käyttää tätä merkkijonoa automaattisesti tulostuslauseesa. Lisätään luokkaan Suorakulmio tämä metodi:

```python

class Suorakulmio:
    # vasen yläkulma
    __vasen_ylakulma = (0,0)

    # leveys ja korkeus
    __leveys = 0
    __korkeus = 0

    # Konstruktori
    def __init__(self, ylakulma: tuple, leveys: int, korkeus: int):
        self.aseta_vasen_ylakulma(ylakulma)
        self.aseta_leveys(leveys)
        self.aseta_korkeus(korkeus)

    # Metodi palauttaa neliö pinta-alan
    def pinta_ala(self):
        return self.__leveys * self.__korkeus

    # Metodi palauttaa neliön piirin
    def piiri(self):
        return self.__leveys * 2 + self.__korkeus * 2

    # Metodi palauttaa neliön oikean alakulman koordinaatit
    def oikea_alakulma(self):
        x = self.__vasen_ylakulma[0]
        y = self.__vasen_ylakulma[1]
        return (x + self.__leveys, y + self.__korkeus)

    # Metodi siirtää neliötä koordinaatistossa
    def siirra(self, x_askeleet: int, y_askeleet: int):
        x = self.__vasen_ylakulma[0] + x_askeleet
        y = self.__vasen_ylakulma[1] + y_askeleet
        self.__vasen_ylakulma = (x, y)

    # Havainnointi ja asetusmetodit
    def anna_vasen_ylakulma(self):
        return self.__vasen_ylakulma

    def aseta_vasen_ylakulma(self, vasen_ylakulma: tuple):
        if type(vasen_ylakulma) == tuple and len(vasen_ylakulma) == 2:
            self.__vasen_ylakulma = vasen_ylakulma

    def anna_leveys(self):
        return self.__leveys

    def aseta_leveys(self, leveys: int):
        if leveys >= 0:
            self.__leveys = leveys

    def anna_korkeus(self):
        return self.__korkeus

    def aseta_korkeus(self, korkeus: int):
        if korkeus >= 0:
            self.__korkeus = korkeus

    def __repr__(self):
        return f"Suorakulmio, vasen yläkulma: {self.__vasen_ylakulma}, leveys: {self.__leveys}, korkeus: {self.__korkeus}"

```

Nyt print-lause tuottaa helpommin ymmärrettävän lopputuloksen:

```python

sk = Suorakulmio((5, 3), 8, 4)
print(sk)

```

<sample-output>

Suorakulmio, vasen yläkulma: (5, 3), leveys: 8, korkeus: 4

</sample-output>

## Esimerkki 2: TBC

LISÄÄ ESIMERKKEJÄ TÄHÄN, AINAKIN PARI ERILAISTA:
- Joku, jossa attribuuttina on lista tai dict






