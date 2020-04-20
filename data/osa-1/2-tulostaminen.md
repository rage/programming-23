---
path: '/osa-1/2-tulostaminen'
title: 'Tulostaminen'
hidden: false
---



<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Aloitetaan ohjelmoinnin opettelu viestien välittämisestä käyttäjälle: ohjelman lopputuloksen kommunikointi on olennaisen tärkeä osa ohjelmointia.

Tässä osiossa

- Kirjoitat ja suoritat ensimmäisen Python-ohjelmasi
- Opit käyttämään print-funktiota viestien tulostamiseksi

</text-box>

Tietokoneohjelmat koostuvat sarjasta _komentoja_, eli eräänlaisia yksinkertaisia toimintaohjeita, joita kone suorittaa yksi kerrallaan. Komentoja on erilaisia, osa niistä on aritmeettisia operaatiota, eli esimerkiksi lukujen summaamista, tai vertailua. Osa keskittyy ohjelman käyttäjän kanssa tapahtuvaan interaktioon. Jotkut komennot taas ohjaavat ohjelman toimintaa, eli saavat ohjelman esimerkiksi _haarautumaan_ erilaisiin toiminnallisuuksiin sen perusteella mitä syötteitä käyttäjä antaa ohjelmalle.

Aloitetaan ohjelmointiin tutustuminen ehkä yksinkertaisimmasta ja tärkeimmästä komennosta `print`, jonka avulla ohjelma voi tulostaa ruudulle rivin tekstiä.

Esimerkiksi seuraava ohjelma tulostaa rivin "Moi kaikki".

```python

print("Moi kaikki!")

```

<sample-output>

Moi kaikki

</sample-output>

Yllä on esitetty esimerkkiohjelma ja sen tulostus. Voit kokeilla lausetta myös itse _KONSOLISSA?_

Huomaa, että jos yritämme tulostaa rivin käyttämättä lainausmerkkejä

```python

print(Moi kaikki!)

```

ohjelma ei toimi, ja seurauksena on seuraava virheilmoitus

<sample-output>

<pre>
File "<stdin>", line 1
  print(Moi kaikki!)
                   ^
SyntaxError: invalid syntax
</pre>

</sample-output>

Python ei siis osaa tulkita tulostettavaa tekstiä oikein, jos se ei ole lainausmerkeissä.

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

Jos laitamme `print`-komennon sisälle laskutoimituksen, tulostuu ruudulle laskutoimituksen tulos. Esimerkiksi ohjelma

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

Kommenttien avulla voidaan kertoa ohjelman toiminnasta ohjelman lukijalle. Pythonissa kommentit merkitään `#`-merkin avulla.

Python ei suorita mitään rivillä olevaa sisältöä `#`-merkin jälkeen.
Kommenttien tarkoituksena on siis kertoa ohjelmoijalle itselleen ja muille ohjelmoijille ohjelmakoodiin liittyviä asioita.

```python

TODO: tässä pitäisi olla hyvä esimerkki kommentoinnista

```

<sample-output>

8
2.5
** toimii siis eksponenttioperaattorina, ja / jako-operaattorina

</sample-output>
