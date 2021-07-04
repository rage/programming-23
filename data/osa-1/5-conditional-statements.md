---
path: "/osa-1/5-conditional-statements"
title: "Conditional statements"
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be able to use a simple conditional statement in programming
- You will know what a Boolean value is
- You will be able to express conditionals with comparison operators

</text-box>

Thus far every program we have written has been executed line by line in order. Instead of executing every line of code every single time a program is run, it is often useful to create sections of the program which are are only executed in certain situations.

For example, the following code checks whether the user is of age::

```python
age = int(input("How old are you? "))

if age > 17:
    print("You are of age!")
    print("Here's a copy of GTA6 for you.")

print("Next customer, please!")
```

When the user is over the age of 17, the execution of the program should look like this:

<sample-output>

How old are you? **18**
You are of age!
Here's a copy of GTA6 for you.
Next customer, please!

</sample-output>

If the user is 17 or under, only this is printed out:

<sample-output>

How old are you? **16**
Next customer, please!

</sample-output>

These examples show us that the value given as input affects which parts of the program are executed. The program contains a _conditional statement_ and a block of code which is executed only if the statement is true. 

<img src="1_6.png">

In a conditional statement the keyword `if` is followed by a _condition_, such as a comparison of two values. The code block following the statement is only executed if the statement is true.

Notice the colon character following the conditional statement. In the following code there is no colon:

```python
age = 10

# no colon at the end of the following line
if age > 17
    print("You are of age.")
```

Upon execution this causes an error:

<sample-output>
<pre>
File "program.py", line 3
  if age > 17
            ^
SyntaxError: invalid syntax
</pre>
</sample-output>

## Comparison operators

Very typically conditions consist of comparing two values. Here is a table with the most common comparison operators used in Python:

| Operator    | Purpose        | Example    |
|:-----------:|----------------|------------|
| `==` | Equal to     | `a == b` |
| `!=` | Not equal to | `a != b` |
| `>`  | Greater than | `a > b`  |
| `>=` | Greater than or equal to | `a >= b` |
| `<`  | Less than    | `a < b`  |
| `<=` | Less than or equal to    | `a <= b` |

Let's have a look at a program which prints out different things based on whether the number the user inputs is negative, positive or zero:

```python
number = int(input("Please give me a number: "))

if number < 0:
    print("The number is negative.")

if number > 0:
    print("The number is positive.")

if number == 0:
    print("The number is zero.")
```

Examples of how the program functions with three different inputs:

<sample-output>

Please give me a number: **15**
The number is positive.

</sample-output>

<sample-output>

Please give me a number: **-18**
The number is negative.

</sample-output>

<sample-output>

Please give me a number: **0**
The number is zero.

</sample-output>

## Indentation

Python recognises that a block of code is connected to a conditional statement if each line of code in the block is _indented_ the same. That is, there should be a bit of whitespace at the beginning of every line of code within the code block. Each line should have the same amount of whitespace.

For example:

````python
password = input("Please type in a password: ")

if password == "kittycat":
    print("You knew the password!")
    print("You must be either the intended user...")
    print("...or quite an accomplished hacker.")

print("The program has finished its execution. Thanks and bye!")
````

You can use the Tab key, short for _tabulator_ key, to insert a set amount of whitespace.

<img src="1_6_keyboard.png">

The majority of text editors will automatically indent the following line when the Enter key is pressed after a colon character. When you want to end a code block you can use the `Backspace` key to return to the beginning of the line.

<img src="1_6_keyboard2.png">
<small><center>
The source of the keyboard pictures:
 <a href="https://pixabay.com/users/Clker-Free-Vector-Images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Clker-Free-Vector-Images</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Pixabay</a>
</center></small>

<in-browser-programming-exercise name="Orwell" tmcname="part01-21_orwell">

Please write a program which asks the user for an integer number. The program should print out "Orwell" if the number is exactly 1984, and otherwise do nothing.

<sample-output>

Please give me a number: **2020**

</sample-output>

<sample-output>

Please give me a number: **1984**
Orwell

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Absolute value" tmcname="part01-22_absolute_value">

Please write a program which asks the user for an integer number. If the number is less than zero, the program should print out the number multiplied by -1. Otherwise the program prints out the the number as is. Please have a look at the examples of expected behaviour below.

<sample-output>

Please give me a number: **-7**
The absolute value of this number is 7

</sample-output>

<sample-output>

Please give a me number: **1**
The absolute value of this number is 1

</sample-output>

<sample-output>

Please give a me number: **-99**
The absolute value of this number is 99

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Soup or no soup" tmcname="part01-23_soup_or_no_soup">

Please write a program which asks for the user's name. If the name is anything but "Jerry", the program then asks for the number of portions and prints out the total cost. The price of a single portion is 5.90.

Two examples of the program's execution:

<sample-output>

Please tell me your name: **Kramer**
How many portions of soup? **2**
The total cost is 11.8
Next please!

</sample-output>

<sample-output>

Please tell me your name: **Jerry**
Next please!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Order of magnitude" tmcname="part01-24_order_of_magnitude">

Please write a program which asks the user for an integer number. The program should then print out the magnitude of the number according to the following examples:

<sample-output>

Please give me a number: **950**
This number is smaller than 1000
Thank you!

</sample-output>

<sample-output>

Please give me a number: **59**
This number is smaller than 1000
This number is smaller than 100
Thank you!

</sample-output>

<sample-output>

Please give me a number: **2**
This number is smaller than 1000
This number is smaller than 100
This number is smaller than 10
Thank you!

</sample-output>

<sample-output>

Please give me a number: **1123**
Thank you!

</sample-output>


</in-browser-programming-exercise>


## Totuusarvot

Ehtorakenteessa käytettävä ehto saa totuusarvon `True` (tosi) tai `False` (epätosi). Esimerkiksi ehto `a < 5` on tosi jos `a` on alle 5 ja epätosi jos `a` on 5 tai suurempi.

Voimme asettaa ehdon tuloksen muuttujan arvoksi samaan tapaan kuin laskutoimituksen tuloksen:

```python
a = 3
ehto = a < 5
print(ehto)
if ehto:
    print("a on pienempi kuin 5")
```

<sample-output>

True
a on pienempi kuin 5

</sample-output>

Voimme käyttää koodissa myös sanoja `True` ja `False`. Esimerkiksi seuraava koodi suorittaa `print`-komennon aina, koska ehdon arvona on `True`:

```python
ehto = True
if ehto:
    print("Tänne tullaan aina")
```

<sample-output>

Tänne tullaan aina

</sample-output>

Tällainen ohjelma ei ole sinänsä kovin hyödyllinen, mutta myöhemmin kurssilla näemme, mitä hyötyä on totuusarvoista muuttujissa.

<in-browser-programming-exercise name="Laskin" tmcname="osa01-25_laskin">

Tee ohjelma, joka kysyy käyttäjältä ensin kaksi lukua ja sen jälkeen komennon. Jos komento on joko _summa_, _tulo_ tai _erotus_, ohjelma laskee syötteille kyseisen operaation tuloksen. Muussa tapauksessa ohjelma ei tulosta mitään.

Esimerkkitulostuksia:

<sample-output>

Luku 1: **10**
Luku 2: **17**
Komento: **summa**

10 + 17 = 27

</sample-output>

<sample-output>

Luku 1: **4**
Luku 2: **6**
Komento: **tulo**

4 * 6 = 24

</sample-output>

<sample-output>

Luku 1: **4**
Luku 2: **6**
Komento: **erotus**

4 - 6 = -2

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Lämpötilat" tmcname="osa01-26_lampotilat">

Tee ohjelma, joka kysyy käyttäjältä lämpötilan fahrenheit-asteina, ja tulostaa sitten lämpötilan celsius-asteina. Jos lämpötila celsius-asteina on pienempi kuin 0, ohjelma tulostaa lisäksi viestin "Paleltaa!".

Kaavan fahrenheit-asteiden muuntamiseksi celsius-asteiksi voit etsiä esimerkiksi googlaamalla.

Kaksi esimerkkisuoritusta:

<sample-output>

Anna lämpötila (F): **101**
101 fahrenheit-astetta on 38.333333333333336 celsius-astetta

Anna lämpötila (F): **21**
21 fahrenheit-astetta on -6.111111111111111 celsius-astetta
Paleltaa!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Palkka" tmcname="osa01-27_palkka">

Tee ohjelma, joka kysyy tuntipalkkaa, työskenneltyjen tuntien määrää ja viikonpäivää. Ohjelma tulostaa palkan, joka on tuntipalkka kertaa tuntien määrä muina päivinä paitsi sunnuntaisin, jolloin tuntipalkka on kaksinkertainen.

<sample-output>

Tuntipalkka: **8.5**
Työtunnit: **3**
Viikonpäivä: **maanantai**
Palkka 25.5 euroa

</sample-output>

<sample-output>

Tuntipalkka: **12.5**
Työtunnit: **10**
Viikonpäivä: **sunnuntai**
Palkka 250.0 euroa

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Korjaa ohjelma: Korkoa kortille" tmcname="osa01-28_korjaaa_ohjelma_korkoa_kortille">

Ohjelmassa lasketaan bonuskortin saldoon vuoden lopussa lisättävä bonuspistemäärä seuraavan kaavan mukaisesti:

* Jos bonuspisteitä on alle sata, korkona saa 10 % lisää pisteitä
* Muussa tapauksessa korkona saa 15 % lisää pisteitä

Ohjelma siis toimii esim. näin:

<sample-output>

Kuinka paljon pisteitä? **55**
Sait 10 % bonusta
Pisteitä on nyt 60.5

</sample-output>

Ohjelma toimii kuitenkin jollain syötteillä oudosti:

<sample-output>

Kuinka paljon pisteitä? **95**
Sait 10 % bonusta
Sait 15 % bonusta
Pisteitä on nyt 120.175

</sample-output>

Korjaa ohjelma niin, että bonusta tulee joko 10 % tai 15 %, ei koskaan molempia.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Huomiset vaatteet" tmcname="osa01-29_huomisen_vaatteet">

Tee ohjelma, joka kysyy huomisen sääennusteen ja suosittelee sen mukaista pukeutumista.

Suositus vaihtelee sen mukaan, onko lämpötila yli 20 astetta, yli 10 astetta vai yli 5 astetta. Myös sade vaikuttaa suositukseen.

Ohjelma toimii seuraavasti:

<sample-output>

Kerro huominen sääennuste:
Lämpötila: **21**
Sataako (kyllä/ei): **ei**
Pue housut ja t-paita

</sample-output>

<sample-output>

Kerro huominen sääennuste:
Lämpötila: **11**
Sataako (kyllä/ei): **ei**
Pue housut ja t-paita
Ota myös pitkähihainen paita

</sample-output>

<sample-output>

Kerro huominen sääennuste:
Lämpötila: **7**
Sataako (kyllä/ei): **ei**
Pue housut ja t-paita
Ota myös pitkähihainen paita
Pue päälle takki

</sample-output>

<sample-output>

Kerro huominen sääennuste:
Lämpötila: **3**
Sataako (kyllä/ei): **kyllä**
Pue housut ja t-paita
Ota myös pitkähihainen paita
Pue päälle takki
Suosittelen lämmintä takkia
Kannattaa ottaa myös hanskat
Muista sateenvarjo!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Toisen asteen yhtälön ratkaiseminen" tmcname="osa01-30_toisen_asteen_yhtalo">

Pythonin `math`-moduulissa on funktio `sqrt`, jolla voi laskea luvun neliöjuuren. Voit käyttää sitä ohjelmassa seuraavasti:

```python
from math import sqrt

print(sqrt(9))
```

Ohjelma tulostaa:

<sample-output>

3.0

</sample-output>

Kirjoita ohjelma, joka ratkaisee toisen asteen yhtälön ax²+bx+c. Ohjelmalle annetaan arvot a, b ja c, ja sen tulee laskea juuret (eli ratkaisut) kaavalla

x = (-b ± sqrt(b²-4ac))/(2a).

Voit olettaa, että yhtälöllä on kaksi juurta, jolloin yllä oleva kaava toimii.

Esimerkkituloste:

<sample-output>

Anna a: **1**
Anna b: **2**
Anna c: **-8**

Juuret ovat 2.0 ja -4.0

</sample-output>

</in-browser-programming-exercise>

A quiz to review the contents of this section:

<quiz id="bc7e500f-a91e-5709-8ae6-34637ff01737"></quiz>

Vastaa lopuksi kyselyyn tämän viikon materiaaleista. Saat kyselyyn vastaamisesta yhden pisteen:

<quiz id="1d2102eb-0c2f-5185-a240-9814db357c8a"></quiz>
