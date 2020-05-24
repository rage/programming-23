---
path: '/osa-1/3-syotteen-lukeminen'
title: 'Syötteen lukeminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tässä osiossa

- Opit kirjoittamaan ohjelman, joka lukee tietoa käyttäjältä
- Osaat käyttää muuttujaa syötteen lukemisessa ja tulostamisessa
- Osaat yhdistää merkkijonoja toisiinsa

</text-box>

_Syöte_ tarkoittaa tietoa, jonka ohjelman käyttäjä antaa ohjelmalle. Pythonissa voimme lukea rivin käyttäjän antamaa syötettä `input`-komennolla. Komento näyttää samalla viestin käyttäjälle, jossa voi pyytää syötettä.

Esimerkiksi seuraava ohjelma lukee käyttäjän nimen `input`-komennolla ja
tulostaa ruudulle tervehdyksen `print`-komennolla:

```python
nimi = input("Anna nimesi: ")
print("Moi vaan, " + nimi)
```

Ohjelman suoritus voisi näyttää esimerkiksi seuraavalta (käyttäjän kirjoittama syöte on merkitty punaisella):

<sample-output>

Anna nimesi: **Pekka Python**
Moi vaan, Pekka Python

</sample-output>

Ohjelman tulostama teksti riippuu siis osittain käyttäjän syötteestä. Niinpä ohjelman suoritus voisi näyttää myös tältä:

<sample-output>

Anna nimesi: **Outi Ohjelmoija**
Moi vaan, Outi Ohjelmoija

</sample-output>

Ohjelmassa esiintyvä sana `nimi` on _muuttuja_. Muuttujalla tarkoitetaan ohjelmoinnissa "lokeroa", johon voidaan tallentaa jokin _arvo_. Tämä arvo voidaan myöhemmin lukea tai sitä voidaan _muuttaa_.

<text-box variant="hint" name="Muuttujan nimen valinta">

Muuttujat voi periaatteesssa ohjelmissa nimetä vapaasti, tiettyjä Python-kielen asettamia rajoituksia noudattaen.

Tällä kurssilla muuttujat ja muut vastaavat ohjelmien osat nimetään suomeksi.
Ohjelmoinnissa käytetään kuitenkin yleisesti kielenä englantia – jos etsit Googlen avulla ohjelmointiesimerkkejä, kielenä on usein englanti.

</text-box>

<in-browser-programming-exercise name="Nimi kahdesti" tmcname="osa01-06_nimi_kahdesti">

Kirjoita ohjelma, joka kysyy käyttäjän nimeä ja tämän jälkeen tulostaa nimen kahteen kertaan peräkkäisille riveille.

Ohjelman tulee toimia seuraavasti:

<sample-output>

Anna nimesi: **Pekka**
Pekka
Pekka

</sample-output>

</in-browser-programming-exercise>

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

Tarkastellaanpa tulostuskomentoja vähän tarkemmin: `print`-komennolle annetaan merkkijono, johon on yhdistetty valmista tekstiä ja käyttäjän syöte. Nämä on yhdistetty toisiinsa `+`-operaattorilla,
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

<in-browser-programming-exercise name="Nimet huutomerkillä" tmcname="osa01-07_nimi_ja_huutomerkit">

Kirjoita ohjelma, joka kysyy käyttäjän nimeä ja tämän jälkeen tulostaa nimen kaksi kertaa samalle riville siten, että rivin alussa lopussa sekä nimien välissä on huutomerkki.

Ohjelman tulee toimia seuraavasti:

<sample-output>

Anna nimesi: **Pekka**
!Pekka!Pekka!

</sample-output>

</in-browser-programming-exercise>

## Useampi kuin yksi syöte

Ohjelmassa voi lukea useamman eri syötteen. Huomaa, että jokaisen `input`-komennon kysymä merkkijono tallennetaan eri muuttujaan:

```python
nimi = input("Anna nimesi: ")
sposti = input("Anna sähköpostiosoitteesi: ")
lempinimi = input("Anna lempinimesi: ")

print("Varmistetaan vielä, että tiedot menivät oikein")
print("Nimesi: " + nimi)
print("Sähköpostiosoitteesi: " + sposti)
print("Lempinimesi: " + lempinimi)
```

Esimerkki ohjelman suorituksesta:

<sample-output>

Anna nimesi: **Keijo Keksitty**
Anna sähköpostiosoitteesi: **keijo99@example.com**
Anna lempinimesi: **Keke**
Varmistetaan vielä, että tiedot menivät oikein
Nimesi: Keijo Keksitty
Sähköpostiosoitteesi: keijo@example.com
Lempinimesi: Keke

</sample-output>

Huomaa, että mikäli samaan muuttujaan luetaan syöte useamman kerran, uusi arvo ylikirjoittaa aina edellisen. Esimerkiksi

```python
osoite = input("Mikä on osoitteesi? ")
print("Asut siis osoitteessa " + osoite)

osoite = input("Anna uusi osoite: ")
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
osoite = input("Mikä on osoitteesi? ")

osoite = input("Anna uusi osoite: ")

print("Osoite on nyt " + osoite)
```

Esimerkkisuoritus:

<sample-output>

Mikä on osoitteesi? **Pythonpolku 10**
Anna uusi osoite: **Ohjelmoijanraitti 230**
Osoite on nyt Ohjelmoijanraitti 230

</sample-output>

<in-browser-programming-exercise name="Nimi ja osoite" tmcname="osa01-08_nimi_ja_osoite">

Kirjoita ohjelma, joka kysyy käyttäjän nimeä ja osoitetta. Ohjelma tulostaa syötetyt tiedot.

Ohjelman tulee toimia seuraavasti:

<sample-output>

etunimi: **Sanna**
Sukunimi: **Seppänen**
Katuosoite: **Mannerheimintie 10**
Postinumero ja kaupunki: **00100 Helsinki**
Sanna Seppänen
Mannerheimintie 10
00100 Helsinki

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name=" Korjaa ohjelma: Lausahdukset" tmcname="osa01-09_korjaa_ohjelma_lausahdukset">

Tehtäväpohjassa on annettu ohjelma, jonka pitäisi kysyä käyttäjältä kolme lausahdusta ja tulostaa ne esimerkin mukaisesti:

<sample-output>

Anna 1. osa: **entten**
Anna 2. osa: **tentten**
Anna 3. osa: **teelikamentten**
entten-tentten-teelikamentten!

</sample-output>

Ohjelmassa on kuitenkin virhe tai virheitä, joiden takia se ei toimi oikein. Korjaa ohjelma.

```python
osa1 = input("Anna 1. osa: ")
osa2 = input("Anna 1. osa: ")
osa3 = input("Anna 1. osa: ")
print(osa1 + osa2 + osa3)
```

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Tarina" tmcname="osa01-10_tarina">

Tee ohjelma, joka tulostaa oheisen tarinan, johon on upotettu käyttäjän antama nimi ja vuosi.

<sample-output>

Anna nimi: **Maija**
Anna vuosi: **1572**

Maija on urhea ritari, syntynyt vuonna 1572. Eräänä aamuna Maija heräsi kovaan meluun: lohikäärme lähestyi kylää. Vain Maija voisi pelastaa kylän asukkaat.

</sample-output>

Tarinan tulee muuttua sen mukaan, mitkä tiedot käyttäjä antaa.


</in-browser-programming-exercise>

Kertauskysely tämän osan asioihin liittyen:

<quiz id="acec6dc5-89b4-4413-98ed-e4969a023704"></quiz>
