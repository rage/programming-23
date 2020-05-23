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

Tietokoneohjelmat koostuvat _komennoista_ eli yksinkertaisista toimintaohjeista, joita kone suorittaa yksi kerrallaan. Komennot voivat esimerkiksi suorittaa laskutoimituksia, vertailla koneen muistissa olevia tietoja, aiheuttaa muutoksen ohjelman toimintaan tai välittää viestejä ja kysellä tietoja käyttäjältä.

Aloitetaan ohjelmointiin tutustuminen yksinkertaisesta komennosta `print`, joka _tulostaa_ tekstiä. Tulostaminen tarkoittaa käytännössä sitä, että ohjelma näyttää tekstiä ruudulla.

Esimerkiksi seuraava ohjelma tulostaa rivin _Moi kaikki_:

```python
print("Moi kaikki!")
```

Kun suoritamme ohjelman, se tuottaa seuraavan tuloksen:

<sample-output>

Moi kaikki!

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

<in-browser-programming-exercise name="Hymiö" tmcname="osa01-01_hymio">

Kirjoita ohjelma, joka tulostaa ruudulle hymiön: :-)

</in-browser-programming-exercise>

## Ohjelma etenee komento kerrallaan ylhäältä alas

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


<in-browser-programming-exercise name="Ukko Nooa" tmcname="osa01-02_ukko_nooa" >

Kirjoita ohjelma, joka tulostaa ruudulle seuraavat rivit (tarkalleen annetussa muodossa välimerkkeineen):

Ukko Nooa, Ukko Nooa oli kunnon mies.

Kun hän meni saunaan, laittoi laukun naulaan.

Ukko Nooa, Ukko Nooa oli kunnon mies.

</in-browser-programming-exercise>



<in-browser-programming-exercise name="Korjaa ohjelma: seitsemän veljestä" tmcname="osa01-03_korjaa_ohjelma_7_veljesta">

Ohjelman tarkoitus on tulostaa seitsemän veljestä aakkosjärjestyksessä. Ohjelmassa on kuitenkin yksi tai useampi virhe, jonka takia se ei toimi oikein.
Korjaa ohjelma niin, että veljekset tulostuvat oikeassa järjestyksessä.

```python
print("Simeoni")
print("Juhani")
print("Eero")
print("Lauri")
print("Aapo")
print("Tuomas")
print("Timo")
```

</in-browser-programming-exercise>

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

Kommenttien avulla ohjelmoija voi selostaa itselleen ja muille ohjelmoijille, miten ohjelma toimii. Esimerkiksi seuraavassa ohjelmassa kommentit selittävät käytettyä laskukaavaa:

```python
print("Tuntien määrä vuodessa:")
# vuodessa on 365 päivää ja jokaisessa 24 tuntia
print(365*24)
```

Kun ohjelma suoritetaan, kommenteissa oleva teksti ei näy mitenkään ohjelman käyttäjälle:

<sample-output>

Tuntien määrä vuodessa:
8760

</sample-output>

Lyhyempi kommentti voi olla myös rivin lopussa:

```python
print("Tuntien määrä vuodessa:")
print(365*24) # 365 päivää, 24 h / pv
```

<in-browser-programming-exercise name="Ohjelma tulostaa koodia" tmcname="osa01-05_ohjelma_tulostaa_koodia">

Tee ohjelma, jonka tulostus on seuraava:

<sample-output>

print("Moi kaikki!")

</sample-output>

TODO: Kurssilla ei ole kerrottu, miten voi tulostaa lainausmerkit yms. erikoismerkkejä. Pitäisikö?

</in-browser-programming-exercise>

<in-browser-programming-exercise name="" tmcname="osa01-">


</in-browser-programming-exercise>


Kertauskysely tämän osan asioihin liittyen:

<quiz id="bb85db77-9554-47aa-bbbd-f7e31f4ccdf4"></quiz>
