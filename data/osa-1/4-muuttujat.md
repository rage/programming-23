---
path: "/osa-1/4-muuttujat"
title: "Lisää muuttujista"
hidden: false
---

<text-box variant='learningObjectives' nimi='Oppimistavoitteet'>

Tämän osion suoritettuasi

- Opit käyttämään muuttujia eri yhteyksissä
- Tiedät, millaista tietoa muuttujiin voidaan tallentaa
- Ymmärrät merkkijonojen sekä kokonais- ja liukulukujen eron
- Osaat käyttää muuttujia omissa ohjelmissasi

</text-box>


Muuttujia tarvitaan ohjelmissa moniin tarkoituksiin. Voimme tallentaa muuttujiin mitä tahansa sellaista tietoa, jota tarvitaan ohjelmassa myöhemmin.

Muuttuja luodaan Pythonissa seuraavasti:

`muuttujan_nimi = ...`

Tässä `...` tarkoittaa arvoa, joka tallennetaan muuttujaan.

Esimerkiksi kun luemme `input`-komennolla merkkijonon käyttäjältä, sijoitamme merkkijonon muuttujaan, jotta voimme käyttää sitä myöhemmin ohjelmassa:

```python
nimi = input("Anna nimesi: ")
print("Moi, " + nimi)
```

<sample-output>

Anna nimesi: **Kummitus**
Moi, Kummitus

</sample-output>

Muuttujille voidaan antaa arvoja myös esimerkiksi näin:

```python
etunimi = "Pekka"
sukunimi = "Pythonen"

nimi = etunimi + " " + sukunimi

print(nimi)
```

<sample-output>

Pekka Pythonen

</sample-output>

Tässä tapauksessa muuttujan arvo ei tule käyttäjältä vaan se on sama ohjelman jokaisella suorituskerralla.

## Muuttujien arvon muuttaminen

Muuttujan arvo voi nimensä mukaisesti muuttua. Niin kuin edellisessä osassa todettiin, uusi arvo ylikirjoittaa vanhan arvon.

Esimerkiksi seuraavassa ohjelmassa muuttuja `sana` saa kolme eri arvoa:

```python
sana = input("Anna sana: ")
print(sana)

sana = input("Anna toinen sana: ")
print(sana)

sana = "kolmas"
print(sana)
```

<sample-output>

Anna sana: **eka**
Anna toinen sana: **toka**
eka
toka
kolmas

</sample-output>

Muuttujan sisältö siis vaihtuu jokaisen sijoituksen yhteydessä.

Muuttujan uusi arvo voi myös perustua sen vanhaan arvoon. Esimerkiksi seuraavassa muuttuja `sana` saa ensin arvoksi käyttäjän syötteen. Tämän jälkeen muuttuja saa arvoksi vanhan arvonsa, jonka perään on lisätty kolme huutomerkkiä:

```python
sana = input("Anna sana: ")
print(sana)

sana = sana + "!!!"
print(sana)
```

<sample-output>

Anna sana: **testi**
testi
testi!!!

</sample-output>

<text-box variant="hint" name="Lisää muuttujan nimen valinnasta">

Muuttujat kannattaa nimetä niiden käyttötarkoituksen mukaan.
Esimerkiksi jos muuttujassa on sana, nimi `sana` on parempi kuin `a`.

Python ei rajoita muuttujien nimien pituutta, mutta eräitä muita sääntöjä muuttujien nimiin liittyy. Nimen täytyy _alkaa kirjaimella_ ja se saa sisältää vain kirjaimia, numeroita ja alaviivoja &#95;.

Huomaa myös, että pienet ja isot kirjaimet ovat eri merkkejä. Muuttuja `nimi` on siis eri muuttuja kuin `Nimi` tai `NIMI`.

Pythonissa muuttujien nimet on tapana kirjoittaa pienillä kirjaimilla.

</text-box>

## Kokonaisluvut

Tähän mennessä olemme tallentaneet muuttujiin vain merkkijonoja. Usein ohjelmissa halutaan kuitenkin tallentaa myös muun tyyppistä tietoa. Tarkastellaan aluksi kokonaislukuja.

Seuraava ohjelma luo muuttujan `ika`, jonka sisältönä on kokonaisluku.

```python
ika = 24
print(ika)
```

Ohjelma tulostaa arvon

<sample-output>

24

</sample-output>

Kokonaisluvun ympärille ei kirjoiteta lainausmerkkejä. Itse asiassa luvun ympärille kirjoitettavat lainausmerkit tarkoittavat, että kyseessä ei ole luku vaan merkkijono (joka tosin saattaa sisältää numeroita).

Mitä eroa muuttujan tyypeillä siis on, kun seuraava ohjelma tulostaa samat arvot?

```python
luku1 = 100
luku2 = "100"

print(luku1)
print(luku2)
```

<sample-output>

100
100

</sample-output>

Tyypeillä on merkitystä, koska
erilaiset operaatiot vaikuttavat eri tavalla erityyppisiin muuttujiin. Tarkastellaan seuraavaa esimerkkiä:

```python
luku1 = 100
luku2 = "100"

print(luku1 + luku1)
print(luku2 + luku2)
```

Ohjelma tulostaa suoritettaessa

<sample-output>

200
100100

</sample-output>

Kahdelle lukuarvolle `+`-operaattori siis merkitsee yhteenlaskua, merkkijonoille taas yhdistämistä peräkkäin.

## Arvojen yhdistäminen

Seuraava ohjelma ei toimi, koska `"Tulos on "` ja `tulos` ovat erityypisiä:

```python
tulos = 10 * 25
# seuraava rivi tuottaa virheen
print("Tulos on " + tulos)
```

Ohjelma ei tulosta mitään, vaan antaa virheen

<sample-output>

TypeError: unsupported operand type(s) for +: 'str' and 'int'

</sample-output>

Python kertoo, ettei kahden erityyppisen arvon yhdistäminen toimi. Tässä tapauksessa arvon `"Tulos on"` tyyppi on merkkijono ja arvon `tulos` tyyppi on kokonaisluku.

Jos haluamme tulostaa yhdellä komennolla merkkijonon ja luvun, yhdistäminen onnistuu kuitenkin muuttamalla luku merkkijonoksi `str`-funktiolla. Esimerkiksi

```python
tulos = 10 * 25
print("Tulos on " + str(tulos))
```

<sample-output>

Tulos on 250

</sample-output>

Toinen mahdollisuus on käyttää pilkkua `print`-komennossa. Tällöin komento tulostaa kaikki pilkuilla erotetut arvot riippumatta niiden tyypistä:

```python
tulos = 10 * 25
print("Tulos on", tulos)
```

<sample-output>

Tulos on 250

</sample-output>

Huomaa, että tässä tapauksessa arvojen väliin ilmestyy automaattisesti yksi välilyönti tulostuksessa.

## Liukuluvut

`Liukuluku` on ohjelmoinnissa esiintyvä termi, joka tarkoittaa käytännössä desimaalilukua. Liukulukuja voidaan käyttää melko samalla tavalla kuin kokonaislukuja. Huomaa, että desimaalierottimena käytetään pistettä (kuten englannissa yleensä).

Esimerkiksi seuraava ohjelma laskee kolmen liukuluvun keskiarvon:

```python
luku1 = 2.5
luku2 = -1.25
luku3 = 3.62

keskiarvo = (luku1+luku2+luku3) / 3
print("Keskiarvo:", keskiarvo)
```

<sample-output>

Keskiarvo: 1.6233333333333333

</sample-output>