---
path: "/osa-1/4-muuttujat"
title: "Muuttujat"
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>
  
- Tiedät, mitä tarkoitetaan muuttujalla ja mihin niitä tarvitaan
- Tiedät, millaista tietoa muuttujiin voidaan tallentaa
- Ymmärrät merkkijonojen, kokonais- ja liukulukujen ja totuusarvojen eron
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

Anna nimi: Tupu
Anna toinen nimi: Hupu
Anna vielä kolmas nimi: Lupu
Tupu, Hupu ja Lupu

</sample-output>


