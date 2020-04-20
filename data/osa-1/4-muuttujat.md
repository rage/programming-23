---
path: "/osa-1/4-muuttujat"
title: "Muuttujat"
hidden: false
---

<text-box variant='learningObjectives' nimi='Oppimistavoitteet'>

Käsiteltävä tieto pitää tallentaa muistiin ohjelman suorituksen ajaksi. Tätä tarkoitusta varten ohjelmissa käytetään muuttujia.

Tämän osion suoritettuasi

- Tiedät, mitä tarkoitetaan muuttujalla ja mihin niitä tarvitaan
- Tiedät, millaista tietoa muuttujiin voidaan tallentaa
- Ymmärrät merkkijonojen sekä kokonais- ja liukulukujen eron
- Osaat käyttää muuttujia omissa ohjelmissasi

</text-box>


Edellisessä osassa käytettiin muuttujia tallentamaan `input`-komennon antamat arvot.

Muuttujia tarvitaan ohjelmissa lukuisiin muihinkin tarkoituksiin: muuttujiin voidaan tallentaa mitä tahansa sellaista tietoa, jota tarvitaan ohjelmassa myöhemmin.

Muuttuja luodaan Pythonissa seuraavasti:

`muuttujan_nimi = ...`

Tässä `...` tarkoittaa arvoa, joka tallennetaan muuttujaan.
Esimerkiksi voimme sijoittaa muuttujaan `input`-komennon välityksellä käyttäjän antaman merkkijonon.

Jotta tätä merkkijonoa voidaan käyttää ohjelmassa myöhemmin (esimerkiksi tulostamaan käyttäjälle tervehdys), se tallennetaan muuttujaan.

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

## Muuttujien arvon muuttaminen

Muuttujan arvo voi nimensä mukaisesti muuttua. Niin kuin edellisessä osassa todettiin, uusi arvo ylikirjoittaa vanhan arvon.

<img src="1_4.png">

Esimerkiksi

```python

sana = input("Anna sana: ")
print(sana)

sana = input("Anna toinen sana: ")
print(sana)

sana = 'kolmas'
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

Muuttujan uusi arvo voi myös perustua sen vanhaan arvoon.

Esimerkiksi seuraavassa muuttuja `sana` saa ensin arvoksi käyttäjän syötteen. Tämän jälkeen muuttuja saa arvoksi vanhan arvonsa, jonka perään on lisätty kolme huutomerkkiä:

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

Python ei rajoita muuttujien nimien pituutta, mutta eräitä muita sääntöjä muuttujien nimiin liittyy.
Nimen täytyy _alkaa kirjaimella_ ja se saa sisältää vain kirjaimia, numeroita ja alaviivoja &#95;.

Huomaa myös, että pienet ja isot kirjaimet ovat eri merkkejä - muuttuja `nimi` on siis eri muuttuja kuin `Nimi` tai `NIMI`.

Pythonissa muuttujien nimet on tapana kirjoittaa pienillä kirjaimilla.

</text-box>

## Kokonaislukumuuttujat

Tähän mennessä on käsitelty pelkästään merkkijonomuuttujia.
Yleensä ohjelmissa halutaan kuitenkin tallentaa myös muun tyyppistä tietoa. Tarkastellaan aluksi _kokonaislukumuuttujia_.

Seuraava ohjelma luoda muuttujan `ika`, jossa on kokonaisluku.

```python

ika = 24
print(ika)

```

Ohjelma tulostaa arvon

<sample-output>

24

</sample-output>

Kokonaisluvun ympärille ei kirjoiteta lainausmerkkejä.
Itse asiassa luvun ympärille kirjoitettavat lainausmerkit tarkoittavat, että kyseessä ei ole luku vaan merkkijono (joka tosin saattaa sisältää numeroita).

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

## Erityyppisten arvojen yhdistäminen

Seuraava ohjelma ei toimi, koska `"Tulos on "` ja `tulos` ovat erityypisiä:

```python

tulos = 10 * 25
print("Tulos on " + tulos) # Tämä tuottaa virheen!

```

Ohjelma ei tulosta mitään, vaan antaa virheen

<sample-output>

TypeError: unsupported operand type(s) for +: 'str' and 'int'

</sample-output>

Python siis kertoo, ettei kahden erityyppisen arvon yhdistäminen toimi.
Jos haluat tulostaa yhdellä komennolla merkkijonon ja luvun,
yhdistäminen onnistuu kuitenkin muuttamalla luku merkkijonoksi `str`-funktiolla.
Esimerkiksi

```python

tulos = 10 * 25
print("Tulos on " + str(tulos))

```

<sample-output>

Tulos on 250

</sample-output>

## Liukuluvut

Aina kokonaisluvut eivät riitä.
Ohjelmoinnissa _liukuluku_ tarkoittaa desimaalilukua.
Liukulukuja voidaan käyttää melko samalla tavalla kuin kokonaislukujakin.
Huomaa, että _desimaalierottimena käytetään pistettä_ (kuten englannissa yleensä).

Esimerkiksi:

```python

tulos1 = 2.5
tulos2 = -1.25
tulos3 = 3.62

keskiarvo = (tulos1+tulos2+tulos3) / 3
print("Keskiarvo: " + str(keskiarvo))

```

<sample-output>

Keskiarvo: 1.6233333333333333

</sample-output>

