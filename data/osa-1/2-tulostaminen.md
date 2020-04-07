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

Pythonin funktiolla `print` voidaan tulostaa käyttäjälle viestejä.

Esimerkiksi funktiokutsu `print("Moi kaikki!")` tulostaa tekstin "Moi kaikki".

```python

print("Moi kaikki!")

```

<sample-output>

Moi kaikki

</sample-output>

Yllä on esitetty esimerkkiohjelma ja sen tulostus. Voit kokeilla lausetta myös itse _KONSOLISSA?_

Ohjelmien rakenne voidaan esittää hyvin yksinkertaistetusti seuraavasti:

<img src="1_1_1.png" alt="syöte --> käsittely --> tuloste">

Ohjelma siis saa syötteen, käsittelee sen ja viestii tuloksen takaisin. Tällä kurssilla käytämme tuloksen kommunikointiin yleensä funktiota `print`. Funktiolla tarkoitetaan ohjelman itsenäistä osaa, jota voidaan kutsua sen nimellä. Funktioilla on usein myös parametreja. Esimerkiksi print-funktio saa parametrikseen tulostettavan objektin.

Esimerkiksi seuraava kolmesta print-funktion kutsusta koostuva ohjelma

```python

print("Tervetuloa opettelemaan ohjelmointia!")
print("Aluksi harjoitellaan print-funktion käyttöä.")
print("Tämä ohjelma tulostaa ruuulle kolme riviä tekstiä.")

```
...tulostaa ruudulle seuraavat viestit:

<sample-output>

Tervetuloa opettelemaan ohjelmointia!
Aluksi harjoitellaan print-funktion käyttöä.
Tämä ohjelma tulostaa ruuulle kolme riviä tekstiä.

</sample-output>

## Lausekkeet print-funktion parametrina

Parametriksi voidaan antaa myös jokin lauseke.

Esimerkiksi seuraava ohjelma

```python

print(2 + 5)
print(3 * 3) # *-merkkiä käytetään kertolaskuoperaattorina
print(2 + 2 * 10) # laskujärjestys noudattaa pääpiirteittäin matematiikasta tuttua järjestystä

```
tulostaa ruudulle viestit

<sample-output>

7
9
22

</sample-output>

Huomaa, että laskujen ympärille ei kirjoiteta lainausmerkkejä. Lainausmerkeillä merkitään
_merkkijono_, joka tulostetaan ruudulle sellaisenaa. Huomaa siis seuraavien lauseiden ero:

```python

print(2 + 2 * 10)
print("2 + 2 * 10")

```

Ohjelma tulostaa

<sample-output>

22
2 + 2 * 10

</sample-output>

Jälkimmäisessä tapauksessa Python ei yritä tulkita lauseketta, vaan tulostaa sen ruudulle. Merkkijonot siis tulostetaan ruudulle sellaisenaan riippumatta niiden sisällöstä.

## Kommentit

Kommenttien avulla voidaan dokumentoida ohjelman suoritusta. Pythonissa kommentit merkitään #-merkin avulla.

Python ei suorita mitään rivillä olevaa sisältöä #-merkin jälkeen. Kommenttien tarkoituksena on siis kertoa ohjelmoijalle itselleen ja muille ohjelmoijille ohjelmakoodiin liittyviä asioita.

```python

print (2 ** 3) # Lasketaan potenssilauseen kaksi kolmanteen arvo
print (5 / 2) # Jakolaskua merkitsemään käytetään /-operaattoria

# Ohjelma tulostaa vielä yhden merkkijonon
print ("** toimii siis eksponenttioperaattorina, ja / jako-operaattorina")

```

<sample-output>

8
2.5
** toimii siis eksponenttioperaattorina, ja / jako-operaattorina

</sample-output>
