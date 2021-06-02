---
path: '/osa-1/1-ohjelmoinnin-aloittaminen'
title: 'Ohjelmoinnin aloittaminen'
hidden: false
---

<text-box variant='learningObjectives' name='Learning objectives'>

After this section

- You will have written and run your first Python program
- You will know how to use the print command 
- You will be able to use programming for arithmetic calculations

</text-box>

Computer programs consist of _commands_, which are simple instructions. A computer executes these commands one by one. Among other things, commands can be used to perform calculations, compare things in the computer's memory, cause changes in how the program functions, relay messages or ask for information from the program's user.

Let's begin programming by getting familiar with the `print` command, which _prints_ text. In this context, printing essentially means that the program will show text on the screen.

The following program will print the line "Hi there!":

```python
print("Hi there!")
```

When the program is run, it produces this:

<sample-output>

Hi there!

</sample-output>

The program will not work unless the code is written exactly as it is above. For example, trying to run the print command without the quotation marks, like so

```python
print(Hi there!)
```

will not print out the message, but instead causes an error:

<sample-output>

<pre>
File "<stdin>", line 1
  print(Hi there!)
                   ^
SyntaxError: invalid syntax
</pre>

</sample-output>

In summary, if you want to print text, it must all be encased in quotation marks or Python will not interpret it correctly.

<in-browser-programming-exercise name="Emoticon" tmcname="part01-01_emoticon" height="300px">

Write a program which prints out an emoticon: :-)

</in-browser-programming-exercise>

## A program progresses

Multiple commands written in succession will be executed in order from first to last.
For example this program

```python
print("Welcome to Programming 101!") 
print("First we will practice using the print command.")
print("This program prints three lines of text on the screen.")
```
prints the following lines on the screen:

<sample-output>

Welcome to Programming 101!
First we will practice using the print command.
This program prints three lines of text on the screen.

</sample-output>

<in-browser-programming-exercise name="Fix the code: Seven Brothers" tmcname="part01-03_seven_brothers">

"Seitsemän veljestä" is one of the first novels ever written in Finnish. It is the story of seven orphaned brothers learning to make their way in the world ([read more on Wikipedia](https://en.wikipedia.org/wiki/Seitsem%C3%A4n_veljest%C3%A4)). 

This program is supposed to print out the names of the brothers in alphabetical order, but it's not working quite right yet. Please fix the program so that the names are printed in the correct order.


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
