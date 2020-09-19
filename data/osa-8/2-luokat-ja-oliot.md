---
path: '/osa-8/2-luokat-ja-oliot'
title: 'Luokat ja oliot'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät mitä tarkoitetaan luokalla
- Ymmärrät luokan ja olion yhteyden
- Tiedät mitä olio-ohjelmointi tarkoittaa

</text-box>

Edellisessä osassa käsitellyt esimerkkioliot - listat, tuplet, sanakirjat ja merkkijonot - ovat siinä mielessä erikoistapauksia, että niiden kaikkien muodostamiseen on Pythonissa sisäänrakennettuna oma syntaksinsa:

```python

# Lista luodaan antamalla arvot hakasuluissa
lista = [1,2,3]

# Merkkijonovakio tunnistetaan lainausmerkeistä
mjono = "Moi kaikki!"

# Sanakirja luodaan aaltosulkeilla
sanakirja = {"yksi": 1, "kaksi:": 2}

# Tuplessa arvot ovat sulkeissa
oma_tuple = (1,2,3)

```

Muita olioita muodostettaessa kutsutaan erityistä metodia, joka luo olion. Tällaista metodia kutsutaan _konstruktoriksi_. Tarkastellaan esimerkkinä murtolukuolioiden muodostamista Fraction-luokasta:

```python

# Tuodaan käyttöön luokka Fraction modulista fractions
from fractions import Fraction

# Luodaan pari uutta murtolukuoliota
puolikas = Fraction(1,2)

kolmasosa = Fraction(1,3)

kolmas = Fraction(3,11)

# Tulostetaan
print(puolikas)
print(kolmasosa)
print(kolmas)

# Murtoluvuilla voi myös laskea
print(puolikas + kolmasosa)

```

<sample-output>

1/2
1/3
3/11
5/6

</sample-output>

Esimerkistä huomataan, että konstuktorikutsut poikkeavat aiemmista metodikutsuista. Konstruktorikutsuja ei ole sidottu tiettyyn olioon (mikä on sikäli loogista, että olio muodostetaan kutsumalla konstruktoria). Lisäksi metodin nimi on kirjoitettu isolla alkukirjaimella: `puolikas = Fraction(1,2)`. Pureudutaan tarkemmin olion muodostamisen mekanismiin esittelemällä _luokan_ käsite.

## Luokka on olion käsikirjoitus

Materiaalissa on jo aiemmin vilahtanut käsite _luokka_. Edellisessä esimerkissä otettiin käyttöön luokka `Fraction` modulista `fractions`. Uudet oliot muodostettiin kutsumalla luokan `Fraction` _konstruktoria_.

Luokassa määritellään siitä muodostettavien olioiden rakenne ja toiminnallisuus. Luokkaa nimitetään tästä syystä joskus olion käsikirjoitukseksi. Luokassa siis kerrotaan millaista tietoa olio sisältää ja määritellän metodit, joiden avulla oliota voidaan käsitellä. _Olio-ohjelmoinnilla_ tarkoitetaan ohjelmointitapaa, jossa kaikki ohjelman toiminnallisuus tapahtuu luokkien ja niistä muodostettujen olioiden avulla.

Yhdestä luokasta voidaan muodostaa useita olioita. Niin kuin aiemmin kerrottiin, oliot ovat itsenäisiä - muutokset olioon eivät vaikuta muihin luokasta muodostettuihin olioihin. Jokaisella oliolla on oma tietosisältönsä. Vähän yksinkertaistaen voisi sanoa, että

* luokassa määritellään muuttujat ja
* oliota muodostaessa niille annetaan arvot.

Luodaan esimerkkinä `Fraction`-luokasta kaksi oliota ja tulostetaan molempien nimittäjät:

```python

from fractions import Fraction

eka = Fraction(2,5)
toka = Fraction(9,13)

# Tulostetaan eka nimittäjä
print(eka.numerator)

# ...ja sitten toka
print(toka.numerator)

```

<sample-output>

2
9

</sample-output>

Luokassa Fraction on siis määritelty, että olioilla on muuttuja `numerator`. Jokaisella oliolla on kuitenkin oma arvonsa tälle muuttujalle.

Samalla tavalla `date`-luokasta muodostetuilla olioilla on kaikilla omat itsenäiset arvonsa vuodelle, kuukaudelle ja päivämäärälle:

```python

from datetime import date

joulu = date(2020, 12, 24)
juhannus = date(2020, 6, 20)

# Tulostetaan kuukaudet molemmista
print(joulu.month)
print(juhannus.month)

```

<sample-output>

12
6

</sample-output>

Luokassa `date` on siis määritelty, että luokasta muodostettavilla olioilla on muuttujat `year`, `month` ja `day`. Kun luokasta muodostetaan olio, annetaan muuttujille arvot. Joka oliolla on omat arvonsa muuttujille:

KUVA
