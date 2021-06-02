---
path: '/osa-1/1-ohjelmoinnin-aloittaminen'
title: 'Ohjelmoinnin aloittaminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Olet kirjoittanut ja suorittanut ensimmäisen Python-ohjelmasi
- Osaat käyttää print-komentoa viestien tulostamiseen
- Osaat laskea laskuja ohjelmoimalla

</text-box>

Tietokoneohjelmat koostuvat _komennoista_ eli yksinkertaisista toimintaohjeista, joita kone suorittaa yksi kerrallaan. Komennot voivat esimerkiksi suorittaa laskutoimituksia, vertailla koneen muistissa olevia tietoja, aiheuttaa muutoksen ohjelman toimintaan tai välittää viestejä ja kysellä tietoja käyttäjältä.

Aloitetaan ohjelmointiin tutustuminen yksinkertaisesta komennosta `print`, joka _tulostaa_ tekstiä. Tulostaminen tarkoittaa käytännössä sitä, että ohjelma näyttää tekstiä ruudulla.

Esimerkiksi seuraava ohjelma tulostaa rivin "Moi kaikki!":

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

<in-browser-programming-exercise name="Emoticon" tmcname="part01-01_emoticon" height="300px">

Kirjoita ohjelma, joka tulostaa ruudulle hymiön: :-)

</in-browser-programming-exercise>

## Ohjelman eteneminen

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

<in-browser-programming-exercise name="Fix the code: Seven Brothers" tmcname="part01-03_seven_brothers">

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


<in-browser-programming-exercise name="Row, Row, Row Your Boat" tmcname="part01-02_row_your_boat">

Kirjoita ohjelma, joka tulostaa ruudulle seuraavat rivit (tarkalleen annetussa muodossa välimerkkeineen):

<sample-output>

Ukko Nooa, Ukko Nooa oli kunnon mies.
Kun hän meni saunaan, laittoi laukun naulaan.
Ukko Nooa, Ukko Nooa oli kunnon mies.

</sample-output>

</in-browser-programming-exercise>


## Laskutoimitukset

Jos laitamme `print`-komennon sisälle laskutoimituksen, tulostuu ruudulle laskutoimituksen tulos. Esimerkiksi ohjelma

```python
print(2 + 5)
print(3 * 3)
print(2 + 2 * 10)
```
tulostaa ruudulle seuraavat rivit:

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

Ohjelman tulostus on:

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

<in-browser-programming-exercise name="Minutes in a year" tmcname="part01-04_minutes_in_a_year">

Tee ohjelma, joka tulostaa minuuttien määrän vuodessa. Käytä edellisen esimerkin tapaan Pythonia tekemään laskutoimitus!

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Print some code" tmcname="part01-05_print_code">

Tulostuslauseessa voi käyttää kaksinkertaisten lainausmerkkien `"` lisäksi myös yksinkertaista lainausmerkkiä `'`.

Tämä on kätevää, kun haluat tulostaa lainausmerkkejä:

```python

print('"Heti takaisin!", poliisi huusi.')

```

<sample-output>

"Heti takaisin!", poliisi huusi.

</sample-output>

Tee ohjelma, jonka tulostus on seuraava:

<sample-output>

print("Moi kaikki!")

</sample-output>



</in-browser-programming-exercise>




Kertauskysely tämän osan asioihin liittyen:

<quiz id="f1d6d205-dfd6-5c6f-b148-b332dfd64289"></quiz>
