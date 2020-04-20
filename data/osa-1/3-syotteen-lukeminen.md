---
path: '/osa-1/3-syotteen-lukeminen'
title: 'Syötteen lukeminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tulostamisen lisäksi ohjelmissa pitää voida lukea tietoa käyttäjältä. Tässä osiossa tutustutaan syötteiden lukemiseen.

Tämän osion suoritettuasi

- Osaat kirjoittaa ohjelman, joka lukee käyttäjän syötteen
- Tiedät, mitä tarkoitetaan muuttujalla
- Osaat käyttää muuttujaa syötteen lukemisessa ja tulostamisessa
- Osaat yhdistää merkkijonoja

</text-box>

Syöte tarkoittaa tietoa, jonka ohjelman käyttäjä antaa ohjelmalle.
Pythonissa voimme lukea rivin käyttäjän antamaa syötettä `input`-komennolla.

Komennolle annetaan merkkijonona _kehote_, jonka tarkoitus on ohjata käyttäjää antamaan oikeanlainen syöte.

Esimerkki ohjelmasta, jossa luetaan käyttäjän nimi `input`-komennolla ja
tulostetaan ruudulle tervehdys `print`-komennolla:

```python

nimi = input("Anna nimesi: ")
print("Moi vaan, " + nimi)

```

Ohjelman suoritus voisi näyttää esimerkiksi seuraavalta (käyttäjän kirjoittama syöte on merkitty punaisella:

<sample-output>

Anna nimesi: **Pekka Python**
Moi vaan, Pekka Python

</sample-output>

Ohjelman tulostama teksti riippuu siis osittain käyttäjän syötteestä. Niinpä ohjelman suoritus voisi näyttää myös tältä:

<sample-output>

Anna nimesi: **Outi Ohjelmoija**
Moi vaan, Outi Ohjelmoija

</sample-output>

Ensimmäisellä rivillä oleva sana `nimi` on **muuttuja**.
Muuttujalla tarkoitetaan ohjelmoinnissa "lokeroa", johon voidaan tallentaa jokin _arvo_.
Tämä arvo voidaan myöhemmin lukea tai sitä voidaan _muuttaa_.

<text-box variant="hint" name="Muuttujan nimen valinta">

Muuttujat voi periaatteesssa ohjelmissa nimetä vapaasti, tiettyjä Python-kielen asettamia rajoituksia noudattaen.

Tällä kurssilla muuttujat ja muut vastaavat ohjelmien osat nimetään suomeksi.
Ohjelmoinnissa käytetään kuitenkin yleisesti kielenä englantia – jos etsit Googlen avulla ohjelmointiesimerkkejä, ne todennäköisesti ovat englanniksi.

</text-box>

## Muuttujaan viittaaminen

Muuttujaan voidaan viitata ohjelmassa useasti:

```python

nimi = input("Anna nimesi: ")

print("Moi, " + nimi + "!")
print(nimi + " on aika kiva nimi.")

```

Esimerkkitulostus (kun käyttäjä syöttää merkkijonon `Pauli Python`):

<sample-output>

Anna nimesi: **Pauli Python**
Moi, Pauli Python!
Pauli Python on aika kiva nimi.

</sample-output>

Tarkastellaanpa tulostuskomentoja vähän tarkemmin:
`print`-komennolle annetaan merkkijono, johon on yhdistetty
valmista tekstiä ja käyttäjän syöte. Nämä on yhdistetty toisiinsa `+`-operaattorilla,
joka yhdistää kaksi merkkijonoa yhdeksi uudeksi merkkijonoksi.

Merkkijonoja voidaan yhdistää muuttujien arvoihin vapaasti:

```python

nimi = input("Anna nimesi: ")

print("Moi " + nimi + "! Varmistan vielä: nimesi on siis " + nimi + "?")

```

Esimerkkitulostus voisi näyttää tältä, kun käyttäjä syöttää merkkijonon `Erkki Esimerkki`:

<sample-output>

Anna nimesi: **Erkki Esimerkki**
Moi Erkki Esimerkki! Varmistan vielä: nimesi on siis Erkki Esimerkki?

</sample-output>

## Useampi kuin yksi syöte

Ohjelmassa voi lukea useamman eri syötteen. Huomaa, että jokaisen `input`-komennon kysymä merkkijono tallennetaan eri muuttujaan:

```python

nimi = input("Anna nimesi: ")
sposti = input("Anna sähköpostiosoitteesi: ")
lempinimi = input("Anna lempinimesi: ")

print("Varmistetaan vielä, että tiedot menivät oikein")
print("Annoit nimeksesi " + nimi)
print("...sähköpostiosoitteeksesi " + sposti)
print("...ja lempinimeksesi " + lempinimi + ".")

```

Esimerkki ohjelman suorituksesta:

<sample-output>

Anna nimesi: **Keijo Keksitty**
Anna sähköpostiosoitteesi: **keijo99@example.com**
Anna lempinimesi: **Keke**
Varmistetaan vielä, että tiedot menivät oikein
Annoit nimeksesi Keijo Keksitty
...sähköpostiosoitteeksesi keijo@example.com
...ja lempinimeksesi Keke.

</sample-output>

Huomaa, että mikäli samaan muuttujaan luetaan syöte useamman kerran, uusi arvo ylikirjoittaa aina edellisen. Esimerkiksi

```python

# Luetaan käyttäjältä osoite
osoite = input("Mikä on osoitteesi? ")

# Tulostetaan viesti
print("Asut siis osoitteessa " + osoite)

# Luetaan osoite uudestaan
osoite = input("Anna uusi osoite: ")

# Nyt uusi arvo on ylikirjoittanut vanhan
print("Osoite on nyt " + osoite)

```

Esimerkkisuoritus:

<sample-output>

Mikä on osoitteesi? **Pythonpolku 1 A 10**
Asut siis osoitteessa Pythonpolku 1 A 10
Anna uusi osoite: **Uusikatu 999**
Osoite on nyt Uusikatu 999

</sample-output>

Jos samaan muuttujaan luetaan kaksi syötettä peräkkäin, ei ensimmäisenä syötettyyn arvoon siis pääse enää käsiksi:

```python

# Luetaan käyttäjältä osoite
osoite = input("Mikä on osoitteesi? ")

# Luetaan osoite uudestaan
# Nyt uusi arvo ylikirjoittaa vanhan
osoite = input("Anna uusi osoite: ")

# Tulostaa viimeisenä syötetyn arvon
print("Osoite on nyt " + osoite)

```

Esimerkkisuoritus:

<sample-output>

Mikä on osoitteesi? **Pythonpolku 10**
Anna uusi osoite: **Ohjelmoijanraitti 230**
Osoite on nyt Ohjelmoijanraitti 230

</sample-output>
