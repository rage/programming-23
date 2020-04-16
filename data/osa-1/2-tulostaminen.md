---
path: '/osa-1/2-tulostaminen'
title: 'Tulostaminen'
hidden: false
---



<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Aloitetaan ohjelmoinnin opettelu viestien välittämisestä käyttäjälle: ohjelman lopputuloksen kommunikointi on olennaisen tärkeä osa ohjelmointia.

Tässä osiossa

- Kirjoitat ja suoritat ensimmäisen Python-ohjelmasi
- Tutustut termeihin funktio ja parametri
- Opit käyttämään print-funktiota viestien tulostamiseksi

</text-box>

Pythonin komento `print` tulostaa (eli näyttää ruudulla) rivin tekstiä.
Esimerkiksi seuraava ohjelma tulostaa rivin "Moi kaikki".

```python

print("Moi kaikki!")

```

<sample-output>

Moi kaikki

</sample-output>

Yllä on esitetty esimerkkiohjelma ja sen tulostus. Voit kokeilla lausetta myös itse _KONSOLISSA?_

Kun kirjoitamme useita komentoja peräkkäin,
ne suoritetaan järjestyksessä ylhäältä alas.
Esimerkiksi ohjelma

```python

print("Tervetuloa opettelemaan ohjelmointia!")
print("Aluksi harjoitellaan print-funktion käyttöä.")
print("Tämä ohjelma tulostaa ruuulle kolme riviä tekstiä.")

```
...tulostaa ruudulle seuraavat rivit:

<sample-output>

Tervetuloa opettelemaan ohjelmointia!
Aluksi harjoitellaan print-funktion käyttöä.
Tämä ohjelma tulostaa ruuulle kolme riviä tekstiä.

</sample-output>

## Laskutoimitukset

Jos laitamme `print`-komennon sisälle laskutoimituksen,
sen tulos ilmestyy näkyviin. Esimerkiksi ohjelma

```python

print(2 + 5)
print(3 * 3)
print(2 + 2 * 10)

```
tulostaa ruudulle rivit

<sample-output>

7
9
22

</sample-output>

Huomaa, että laskutoimituksen ympärille ei kirjoiteta lainausmerkkejä. Lainausmerkeillä merkitään
_merkkijono_, joka tulostetaan ruudulle sellaisenaan. Huomaa siis seuraavien komentojen ero:

```python

print(2 + 2 * 10)
print("2 + 2 * 10")

```

Ohjelma tulostaa

<sample-output>

22
2 + 2 * 10

</sample-output>

Jälkimmäisessä tapauksessa Python ei laske laskutoimitusta, vaan tulostaa sen ruudulle.
Merkkijonot siis tulostetaan ruudulle sellaisenaan riippumatta niiden sisällöstä.

## Kommentit

Kommenttien avulla voidaan kertoa ohjelman toiminnasta koodin lukijalle. Pythonissa kommentit merkitään `#`-merkin avulla.

Python ei suorita mitään rivillä olevaa sisältöä `#`-merkin jälkeen.
Kommenttien tarkoituksena on siis kertoa ohjelmoijalle itselleen ja muille ohjelmoijille koodiin liittyviä asioita.

```python

TODO: tässä pitäisi olla hyvä esimerkki kommentoinnista

```

<sample-output>

8
2.5
** toimii siis eksponenttioperaattorina, ja / jako-operaattorina

</sample-output>
