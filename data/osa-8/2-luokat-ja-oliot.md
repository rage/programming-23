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

Luokassa `date` on siis määritelty, että luokasta muodostettavilla olioilla on muuttujat `year`, `month` ja `day`. Kun luokasta muodostetaan olio, annetaan muuttujille arvot. Joka oliolla on omat arvonsa muuttujille.

## Olioita käsittelevät funktiot

Funktioiden parametrina oleviin olioihin ei liity oikeastaan mitään sen kummempaa. Niitä on jo kurssin aiemmissa osissa nähty runsaasti. Seuraavassa on esimerkki funktiosta, joka tarkastaa onko sen parametrina oleva `date`-olio viikonloppu:

```python
def onko_viikonloppu(paiva: date):
    viikonpaiva = paiva.isoweekday()
    return viikonpaiva == 6 or viikonpaiva == 7
```

Funktio siis  käyttää parametrina olevan olion metodia [isoweekday](https://docs.python.org/3/library/datetime.html#datetime.date.isoweekday), joka palauttaa viikonpäivää vastaavan numeron.

Funktiota käytetään seuraavasti:

```python
joulu = date(2020, 12, 24)
juhannus = date(2020, 6, 20)

print(onko_viikonloppu(joulu))
print(onko_viikonloppu(joulu))
```

<sample-output>

False
True

</sample-output>

## Metodi vs olion muuttuja

Jos tarkastellaan `date`-oliota, niin huomataan että sen käsittely poikkeaa hieman riippuen siitä mitä olion "sisällöstä" ollaan tarkastelemassa

```python
paiva = date(2020, 12, 24)

# kutsutaan metodia
viikonpaiva = paiva.isoweekday()

# viitataan olion muuttujaan
kuukausi = paiva.month

print(f"viikonpäivä:", viikonpaiva)
print(f"kuukausi:", kuukausi)
```

<sample-output>

viikonpäivä: 4
kuukausi: 12

</sample-output>

Päiväolion viikonpäivä saadaan siis selville kutsumalla _metodia_ isoweekday:

```python
viikonpaiva = paiva.isoweekday()
```

Koska on kyse metodikutsusta, niin metodin nimen perään laitetaan sulut. Jos sulut unohtuvat, on lopputulos outo:

```python
viikonpaiva =  paiva.isoweekday
print(f"viikonpäivä:", viikonpaiva)
```

<sample-output>

viikonpäivä: <built-in method isoweekday of datetime.date object at 0x10ed66450>

</sample-output>

Päiväolioon liittyvä kuukausi taas on "olion muuttuja", ja sen arvo selviää _viittaamalla_ muuttujaan

```python
kuukausi = paiva.month
```

Nyt siis käytössä _ei ole sulkuja_. Jos tässä tilanteessa yritettäisiin käyttää sulkuja:

```python
kuukausi = paiva.month()
```

Ohjelma aiheuttaisi virheen

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'int' object is not callable

</sample-output>

<programming-exercise name='Vuodet listaan' tmcname='osa08-03_vuodet_listaan'>

Tee funktio `vuodet_listaan(paivamaarat: list)`, joka saa parametrikseen listan, joka sisältää `date`-tyyppisiä olioita. Funktio luo uuden listan, jolle se tallentaa päivämäärien _vuodet suuruusjärjestyksessä pienimmästä suurimpaan_.

Esimerkki funktion kutsumisesta:

```python
d1 = date(2019, 2, 3)
d2 = date(2006, 10, 10)
d3 = date(1993, 5, 9)

vuodet = vuodet_listaan([d1, d2, d3])
print(vuodet)
```

<sample-output>

[1993, 2006, 2019]

</sample-output>

</programming-exercise>


<programming-exercise name='Kauppalista' tmcname='osa08-04_kauppalista'>

Tehtävässä on määritelty valmiiksi Kauppalista-luokka, jolla voidaan mallintaa yhtä kauppalistaa.

Jos kauppalistaolio on tallennettu esimerkiksi muuttujaan `kauppalista`, sitä voidaan käsitellä seuraavan esimerkin mukaisesti:

```python

print(kauppalista.tuotteita())
print(kauppalista.tuote(1))
print(kauppalista.maara(1))
print(kauppalista.tuote(2))
print(kauppalista.maara(2))

```

<sample-output>

2
Banaanit
4
Maito
1

</sample-output>

Myös seuraava onnistuu:

```python
# kauppalistalla tuoteet on indeksöity ykkösestä alkaen
for i in range(1, kauppalista.tuotteita()+1):
    tuote = kauppalista.tuote(i)
    maara = kauppalista.maara(i)
    print(f"{tuote}: {maara} kpl")
```


<sample-output>

banaanit 4 kpl
maito 1 kpl

</sample-output>

Kauppalistat siis käyttäytyvät hieman listojen tavoin, niitä käsitellään kuitenkin kauppalistan tarjoamien metodien kautta, ja toisin kuin listoilla, kauppalistalla tuotteet on numeroitu ykkösestä alkaen.

Tee esimerkkejä hyödyntäen funktio `tuotteita_yhteensa(lista: Kauppalista)`, joka saa parametrikseen Kauppalista-tyyppisen olion. Funktio laskee listalla yhteensä olevien tuotteiden lukumäärän ja palauttaa sen.

Huomaa, että kauppalistalla tuotteet indeksoidaan ykkösestä alkaen, ei nollasta. Voit testata ohjelmaasi esim. tällä esimerkkikoodilla:

```python
if __name__ == "__main__":
    l = Kauppalista()
    l.lisaa("banaanit", 10)
    l.lisaa("omenat", 5)
    l.lisaa("ananas", 1)

    print(tuotteita_yhteensa(l))
```

<sample-output>

16

</sample-output>

</programming-exercise>
