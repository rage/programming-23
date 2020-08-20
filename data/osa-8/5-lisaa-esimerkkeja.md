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

    # Konstruktori
    def __init__(self, ylakulma: tuple, leveys: int, korkeus: int):
        # Vasen yläkulma on tuple, jossa on kaksi arvoa
        # kokonaislukuina: x- ja y-koordinaatti
        self.vasen_ylakulma = ylakulma
        self.leveys = leveys
        self.korkeus = korkeus

    # Metodi palauttaa neliö pinta-alan
    def pinta_ala(self):
        return self.leveys * self.korkeus

    # Metodi palauttaa neliön piirin
    def piiri(self):
        return self.leveys * 2 + self.korkeus * 2

    # Metodi palauttaa neliön oikean alakulman koordinaatit
    def oikea_alakulma(self):
        x = self.vasen_ylakulma[0]
        y = self.vasen_ylakulma[1]
        return (x + self.leveys, y + self.korkeus)

    # Metodi siirtää neliötä koordinaatistossa
    def siirra(self, x_askeleet: int, y_askeleet: int):
        x = self.vasen_ylakulma[0] + x_askeleet
        y = self.vasen_ylakulma[1] + y_askeleet
        self.vasen_ylakulma = (x, y)




# Testataan
suorakulmio = Suorakulmio((1,1), 5, 3)
print(suorakulmio.piiri())
print(suorakulmio.pinta_ala())
print(suorakulmio.oikea_alakulma())

suorakulmio.siirra(3, 3)
print(suorakulmio.vasen_ylakulma) # Ei metodi, joten ei sulkuja perään
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

Ohjelma tulostaa jotain seuraavankaltaista:

<sample-output>

<__main__.Suorakulmio object at 0x000002D7BF148A90>

</sample-output>

Järkevämpi tulostus oliolle voidaan määritellä kirjoittamalla luokkaan metodi `__repr__(self)`, joka palauttaa merkkijonon. Python käyttää tätä merkkijonoa automaattisesti tulostuslauseesa. Ideana on, että metodilla voidaan palautta merkkijono joka esittää olion _tilan_ sellaisessa muodossa, että käyttäjän on helppo lukea se.

 Lisätään luokkaan Suorakulmio tämä metodi:

```python

class Suorakulmio:

    # Konstruktori
    def __init__(self, ylakulma: tuple, leveys: int, korkeus: int):
        self.vasen_ylakulma = ylakulma
        self.leveys = leveys
        self.korkeus = korkeus

    # Metodi palauttaa neliö pinta-alan
    def pinta_ala(self):
        return self.leveys * self.korkeus

    # Metodi palauttaa neliön piirin
    def piiri(self):
        return self.leveys * 2 + self.korkeus * 2

    # Metodi palauttaa neliön oikean alakulman koordinaatit
    def oikea_alakulma(self):
        x = self.vasen_ylakulma[0]
        y = self.vasen_ylakulma[1]
        return (x + self.leveys, y + self.korkeus)

    # Metodi siirtää neliötä koordinaatistossa
    def siirra(self, x_askeleet: int, y_askeleet: int):
        x = self.vasen_ylakulma[0] + x_askeleet
        y = self.vasen_ylakulma[1] + y_askeleet
        self.vasen_ylakulma = (x, y)

    # Metodi palauttaa olion tilan merkkijonona
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






