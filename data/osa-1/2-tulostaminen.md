---
path: '/osa-1/2-tulostaminen'
title: 'Tulostaminen'
hidden: false
---



<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Aloitetaan ohjelmoinnin opettelu viestien välittämisestä käyttäjälle: ohjelman lopputuloksen kommunikointi on olennaisen tärkeä osa ohjelmointia.

Tässä osiossa

- Kirjoitat ja suoritat ensimmäisen Python-ohjelmasi
- Opit käyttämään print-komentoa viestien tulostamiseen

</text-box>

Tietokoneohjelmat koostuvat _komennoista_ eli yksinkertaisista toimintaohjeista, joita kone suorittaa yksi kerrallaan. Komennot voivat esimerkiksi suorittaa laskutoimituksia, vertailla asioita, aiheuttaa muutoksen ohjelman toimintaan tai välittää viestejä ja kysellä tietoja käyttäjältä.

Aloitetaan ohjelmointiin tutustuminen ehkä yksinkertaisesta komennosta `print`, jonka avulla ohjelma voi _tulostaa_ tekstiä. Tulostaminen tarkoittaa käytännössä, että ohjelma näyttää tekstiä ruudulla.

Esimerkiksi seuraava ohjelma tulostaa rivin "Moi kaikki":

```python
print("Moi kaikki!")
```

Kun suoritamme ohjelman, se tuottaa seuraavan tuloksen:

<sample-output>

Moi kaikki

</sample-output>

Huomaa, että ohjelman koodi tulee kirjoittaa tarkalleen yllä olevalla tavalla, jotta se toimii. Esimerkiksi jos yritämme tulostaa rivin käyttämättä lainausmerkkejä

```python
print(Moi kaikki!)
```

ohjelma ei toimi, ja seurauksena on seuraava virheilmoitus:

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
print("Aluksi harjoitellaan print-komennon käyttöä.")
print("Tämä ohjelma tulostaa ruudulle kolme riviä tekstiä.")
```
tulostaa ruudulle seuraavat rivit:

<sample-output>

Tervetuloa opettelemaan ohjelmointia!
Aluksi harjoitellaan print-komennon käyttöä.
Tämä ohjelma tulostaa ruudulle kolme riviä tekstiä.

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

Huomaa, että laskutoimituksen ympärille ei kirjoiteta lainausmerkkejä. Lainausmerkeillä merkitään _merkkijono_, joka tulostetaan ruudulle sellaisenaan. Huomaa siis seuraavien komentojen ero:

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

Jos rivin alussa on merkki `#`, rivi on kommentti, jolloin rivillä oleva teksti ei vaikuta ohjelman toimintaan.

Kommenttien yksi tarkoitus on, että ohjelmoija voi selostaa itselleen ja muille ohjelmoijille, miten ohjelma toimii. Esimerkiksi seuraavassa ohjelmassa kommentit selittävät käytettyä laskukaavaa:

```python
# 60 sekuntia minuutissa
# 60 minuuttia tunnissa
# 24 tuntia vuorokaudessa
# 365 vuorokautta vuodessa
print("Sekuntien määrä vuodessa:")
print(60*60*24*365)
```

Kun ohjelma suoritetaan, kommenteissa oleva teksti ei näy mitenkään ohjelman käyttäjälle:

<sample-output>

Sekuntien määrä vuodessa:
31536000

</sample-output>
