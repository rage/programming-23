---
path: "/osa-1/4-muuttujat"
title: "Muuttujat"
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>
  
- Tiedät, mitä tarkoitetaan muuttujalla ja mihin niitä tarvitaan
- Tiedät, millaista tietoa muuttujiin voidaan tallentaa
- Ymmärrät merkkijonojen, kokonais- ja liukulukujen eron
- Osaat käyttää muuttujia omissa ohjelmissasi

</text-box>


Edellisessä osassa käytettiin muuttujia tallentamaan syötefunktion (eli `input`-funktion) palauttamat arvot.

Muuttujia tarvitaan ohjelmissa lukuisiin muihinkin tarkoituksiin: muuttujiin voidaan tallentaa mitä tahansa sellaista tietoa, jota tarvitaan ohjelmassa myöhemmin.

Muuttujan alustamiseksi Pythonissa käytetään seuraavaa syntaksia:

`muuttujan_nimi = <lauseke>`

...missä lauseke tuottaa tulokseksi jonkin arvon, joka tallennetaan muuttujaan. Esimerkiksi `input`-funktion kutsuminen tuottaa tulokseksi käyttäjän syöttämän merkkijonon. Jotta tätä merkkijonoa voidaan käyttää ohjelmassa myöhemmin (esimerkiksi tulostettaessa käyttäjälle tervehdys), se tallennetaan muuttujaan.

Merkkijonomuuttujalle voidaan antaa arvoja myös esimerkiksi näin:

```python
# Alustetaan muuttujat first ja last
first = "Pekka"
last = "Pythonen"

# Alustetaan muuttuja space, jonka arvo on 1 välilyönti
space = " "

# Yhdistetään (eli katenoidaan) kolme muuttujaa
# yhdeksi, ja tallennetaan arvo muuttujaan name
name = first + space + last

# Tulostetaan muuttujan name arvo
print(name)
```

Ohjelma tulostaa ajettaessa

<sample-output>
  
Pekka Pythonen

</sample-output>

## Muuttujien arvon muuttaminen

Muuttujan arvo voi nimensä mukaisesti muuttua. Niin kuin edellisessä osassa todettiin, uusi arvo ylikirjoittaa vanhan arvon.

KUVA

Esimerkiksi

```python
# Lauseen arvo on aluksi tyhjä
sentence = ""

# Kysy käyttäjältä nimi, ja lisää se lauseeseen
name = input("Anna nimi: ")
sentence = sentence + name
sentence = sentence + ", "

# Kysy käyttäjältä toinen nimi, ja lisää se lauseeseen
name = input("Anna toinen nimi: ")
sentence = sentence + name
sentence = sentence + " ja "

# ...ja vielä kolmas: huomaa, että syötefunktion palaute
# voidaan tallentaa suoraan lauseen perään
sentence = sentence + input("Anna vielä kolmas nimi: ")

# Tulostetaan lopullinen lause
print (sentence)
```

Esimerkkisuoritus:

<sample-output>

Anna nimi: **Tupu**
Anna toinen nimi: **Hupu**
Anna vielä kolmas nimi: **Lupu**
Tupu, Hupu ja Lupu

</sample-output>

Huomaa, että `sentence`-muuttujan alkuarvoksi annetaan tyhjä merkkijono. Jos tätä ei tehdä, ei lause `sentence = sentence + name` toimi, koska merkkijono voidaan yhdistää vain toiseen merkkijonoon. Myös tyhjä merkkijono _on_ merkkijono.

## Kokonaislukutyyppiset muuttujat

Tähän mennessä on käsitelty pelkästään merkkijonotyyppisiä muuttujia. Yleensä ohjelmissa halutaan kuitenkin tallentaa myös muun tyyppistä tietoa. Tarkastellaan aluksi _kokonaislukutyyppisiä muuttujia_.

Python on _dynaamisesti tyypitetty_ ohjelmointikieli. Tämä tarkoittaa, että ohjelmoijan ei tarvitse ilmoittaa muuttujan tyyppiä, vaan Python päättelee sen automaattisesti muuttujaan sijoitettavan arvon perusteella.

Kokonaislukutyyppinen muuttuja voidaan siis alustaa sijoittamalla muuttujan arvoksi kokonaisluku.

```python
# Alustetaan muuttuja age arvolla 24
age = 24
print(age)
```

Ohjelma tulostaa arvon

<sample-output>
  
24

</sample-output>

Kokonaisluvun ympärille ei kirjoiteta lainausmerkkejä. Itse asiassa luvun ympärille kirjoitettavat lainausmerkit tarkoittavat, että kyseessä ei ole luku vaan merkkijono (joka tosin sisältää numeroita).

Mitä eroa muuttujan tyypeillä siis on, kun seuraava ohjelma tulostaa samat arvot?

```python
number1 = 100
number2 = "100"

print(number1)
print(number2)
```

Ohjelma tulostaa

<sample-output>
  
100
100

</sample-output>

Erilaiset operaatiot vaikuttavat eri tavalla erityyppisiin muuttujiin. Tarkastellaan seuraavaa esimerkkiä:

```python
number1 = 100
number2 = "100"

print(number1 + number1)
print(number2 + number2)
```

Ohjelma tulostaa suoritettaessa

<sample-output>
  
200
100100

</sample-output>

Kahdelle lukutyyppiselle arvolle `+`-operaattori siis merkitsee aritmeettista (eli matemaattista) yhteenlaskua, merkkijonoille taas katenointia. 

## Erityyppisten arvojen tulostaminen

Erityyppisiä arvoja _ei_ voi yhdistää, seuraava ei siis toimi:

```python
number1 = 100
number2 = "100"

print(number1 + number2) # Tämä tuottaa virheen!
```

Ohjelma ei tulosta mitään, vaan antaa virheen

<sample-output>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
</sample-output>

Python siis kertoo, ettei kahden erityyppisen arvon yhdistäminen toimi. Jos haluat tulostaa yhdellä lauseella sekä merkkijonon että luvun, tulee luku muuntaa merkkijonoksi `str`-funktiota hyödyntäen. Esimerkiksi

```python
number1 = 10
number2 = 25
result = number1 * number2

# Muutetaan kokonaisluku merkkijonoksi ennen yhdistämistä
print("Tulos on " + str(result))
```

## Liukuluvut

Aina kokonaisluvut eivät riitä. Desimaalilukuja (eli _liukulukuja_) voidaan käyttää samalla tavalla kuin kokonaislukujakin. Huomaa kuitenkin, että _desimaalierottimena käytetään pilkun sijasta pistettä_.

Esimerkiksi:

```python
temp_january = 2.5
temp_february = -1.25
temp_march = 3.62

average_temp = (temp_january + temp_february + temp_march) / 3
print("Keskilämpötila tammikuusta maaliskuuhun on " + str(average_temp))
```





