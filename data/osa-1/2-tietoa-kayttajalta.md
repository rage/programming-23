---
path: '/osa-1/2-tietoa-kayttajalta'
title: 'Tietoa käyttäjältä'
hidden: false
---

<text-box variant='learningObjectives' name='Learning objectives'>

After this section

- You will know how to write a program which uses input from the user
- You will know how to use variables to store input and print it out 
- You will be able to combine strings

</text-box>

_Input_ refers to any information a user gives to the program. Specifically, the Python command `input` reads in a line of input written by the user. It may also be used display a message to the user, to prompt for specific input from the user.

The following program reads in the name of the user with the `input` command. It then prints it out with the `print` command:
 
```python
name = input("What is your name? ")
print("Hi there, " + name)
```

The execution of this program could look like this (input from the user in red):

<sample-output>

What is your name? **Paul Python**
Hi there, Paul Python

</sample-output>

What this program prints out is partially dependent on input from the user. That means the execution of the program could also look like this:

<sample-output>

What is your name? **Paula Programmer**
Hi there, Paula Programmer

</sample-output>

The word `name` in this program is a _variable_. In the context of programming, a variable is a location for storing some _value_, such as a string or a number. This value can be used later, and it can also be changed.

<text-box variant="hint" name="Naming variables">

In principle, variables can be named quite freely, within certain limits specified in the Python language.

It is a common international programming practice to name variables in English, but you may come across code where variables are named in other languages, such as the native language of the programmer. The name of the variable has no direct effect on its content, so the name, in that sense, does not matter. However, it can often be helpful in understanding how code functions if variables are named logically and in English.

</text-box>

<in-browser-programming-exercise name="Name twice" tmcname="part01-06_name_twice">

Please write a program which asks for the user's name and then prints it twice, on two consecutive lines.

An example of the how the program should function:

<sample-output>

Anna nimesi: **Paul**
Paul
Paul

</sample-output>

</in-browser-programming-exercise>

## Referencing a variable

A single variable can be referred to many times in a program:

```python
name = input("What is your name? ")

print("Hi, " + name + "!")
print(name + " is quite a nice name.")
```

If the user gives the name `Paul Python`, this program prints out the following:

<sample-output>

What is your name? **Paul Python**
Hi, Paul Python!
Paul Python is quite a nice name.

</sample-output>

Tarkastellaanpa tulostuskomentoja vähän tarkemmin: `print`-komennolle annetaan merkkijono, johon on yhdistetty valmista tekstiä ja käyttäjän syöte. Nämä on yhdistetty toisiinsa `+`-operaattorilla,
joka yhdistää kaksi merkkijonoa yhdeksi uudeksi merkkijonoksi.

Merkkijonoja voidaan yhdistää muuttujien arvoihin vapaasti:

```python
nimi = input("Anna nimesi: ")

print("Moi " + nimi + "! Varmistan vielä: nimesi on siis " + nimi + "?")
```

Esimerkkitulostus, kun käyttäjä antaa nimen `Erkki Esimerkki`:

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

Ohjelmassa voi lukea useamman eri syötteen. Huomaa, että jokainen `input`-komennon kysymä merkkijono tallennetaan eri muuttujaan:

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
Sähköpostiosoitteesi: keijo99@example.com
Lempinimesi: Keke

</sample-output>

Jos samaan muuttujaan luetaan syöte useamman kerran, uusi arvo ylikirjoittaa aina edellisen. Esimerkiksi:

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

Etunimi: **Sanna**
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

<quiz id="10cb3510-d8a6-5e9b-b372-c85c4c7eb957"></quiz>
