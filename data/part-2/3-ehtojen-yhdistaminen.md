---
path: '/part-2/3-ehtojen-yhdistäminen'
title: 'Ehtojen yhdistäminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat käyttää `and`-, `or`- ja `not`-operaattoreita ehdoissa
- Osaat kirjoittaa sisäkkäisiä ehtolauseita

</text-box>

## Loogiset operaattorit

Ehtojen yhdistämisessä voidaan käyttää loogisia operaattoreita `and` ja `or`.
Operaattori `and` vaatii, että useampi ehto pätee samaan aikaan,
ja operaattori `or` vaatii, että yksi tai useampi ehdoista pätee.

Esimerkiksi ehto `luku >= 5 and luku <= 8` vaatii,
että luku on samaan aikaan ainakin 5 ja enintään 8.
Toisin sanoen luvun tulee olla välillä 5..8.

```python
luku = int(input("Anna luku: "))
if luku >= 5 and luku <= 8:
    print("Luku on välillä 5..8")
```

Ehto `luku < 5 or luku > 8` puolestaan vaatii,
että luku on alle 5 tai yli 8.
Toisin sanoen luku ei saa olla välillä 5..8.

```python
luku = int(input("Anna luku: "))
if luku < 5 or luku > 8:
    print("Luku ei ole välillä 5..8")
```

Seuraava taulukko näyttää operaattoreiden toiminnan eri tilanteissa:

a   | b   | a and b | a or b |
:--:|:---:|:-------:|:------:|
False | False | False | False |
True | False | False | True |
False | True | False | True |
True | True | True | True |

Voimme käyttää ehdoissa myös operaattoria `not`, joka muuttaa totuusarvon
käänteiseksi:

a   | not a
:--:|:----:
True  | False
False | True

Esimerkiksi voisimme toteuttaa äskeisen koodin myös näin:

```python
luku = int(input("Anna luku: "))
if not (luku >= 5 and luku <= 8):
    print("Luku ei ole välillä 5..8")
```

<text-box variant='hint' name='Ehtojen ketjuttaminen'>

Ehto `x >= a and x <= b` on tavallinen tapa testata,
onko luku `x` välillä `a`..`b`.
Tällainen ehto toimii samalla tavalla eri ohjelmointikielissä.

Python-kielen erikoisuutena on, että myös lyhyempi ehto
`a <= x <= b` toimii, eli ehtoja on mahdollista ketjuttaa.
Tällaisia ehtoja käytetään kuitenkin melko harvoin,
ehkä tottumuksesta muihin ohjelmointikieliin.

</text-box>

## Lisää ehtoja

Seuraava ohjelma kysyy käyttäjältä neljä lukua ja selvittää sitten
luvuista suurimman ehtojen avulla:

```python
n1 = int(input("Anna luku 1: "))
n2 = int(input("Anna luku 2: "))
n3 = int(input("Anna luku 3: "))
n4 = int(input("Anna luku 4: "))

if n1 > n2 and n1 > n3 and n1 > n4:
    suurin = n1
elif n2 > n3 and n2 > n4:
    suurin = n2
elif n3 > n4:
    suurin = n3
else:
    suurin = n4

print(f" {suurin} on suurin luku.")
```

<sample-output>

Anna luku 1: **2**
Anna luku 2: **4**
Anna luku 3: **1**
Anna luku 4: **1**
4 on suurin luku.

</sample-output>

Esimerkissä ensimmäinen ehto `n1 > n2 and n1 > n3 and n1 > n4` on tosi vain, mikäli kaikki kolme ehtoa ovat tosia.

<in-browser-programming-exercise name="Age check" tmcname="part02-08_age_check">

Please write a program which asks for the user's age. If the age is not plausible, that is, it is under 5 or something that can't be an actual human age, the program should print out a comment.

Have a look at the examples of expected behaviour below to figure out which comment is applicable in each case.

<sample-output>

What is your age? **13**
Ok, you're 13 years old

</sample-output>

<sample-output>

What is your age? **2**
I suspect you can't write quite yet...

</sample-output>

<sample-output>

What is your age? **-4**
That must be a mistake

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Nephews" tmcname="part02-09_nephews">

Please write a program which asks for the user's name. If the name is Huey, Dewey or Louie, the program should recognise the user as one of Donald Duck's nephews. 

In a similar fashion, if the name is Morty or Ferdie, the program should recognise the user as one of Mickey Mouse's nephews.

Some examples:

<sample-output>

Please type in your name: **Morty**
I think you might be one of Mickey Mouse's nephews.

</sample-output>

<sample-output>

Anna nimesi: **Huey**
I think you might be one of Donald Duck's nephews.

</sample-output>

<sample-output>

Anna nimesi: **Ken**
You're not a nephew of any character I know of.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Grades and points" tmcname="part02-10_grades_and_points">

The table below outlines the grade boundaries on a certain university course. Please write a program which asks for the amount of points received and then prints out the grade attained according to the table.

points   | grade
:--:|:----:
< 0 |  impossible!
0-49 | fail
50-59 | 1
60-69 | 2
70-79 | 3
80-89| 4
90-100 | 5
\> 100 |  impossible!

Some examples:

<sample-output>

How many points [0-100]: **37**
Grade: fail

</sample-output>

<sample-output>

How many points [0-100]: **76**
Grade: 3

</sample-output>

<sample-output>

How many points [0-100]: **-3**
Grade: impossible!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="FizzBuzz" tmcname="part02-11_fizzbuzz">

Please write a program which asks asks the user for an integer number. If the number is divisible by three, the program should print out Fizz. If the number is divisible by five, the program should print out Buzz. If the number is divisible by both three and five, the program should print out FizzBuzz. 

Some examples of expected behaviour:

<sample-output>

Number: **9**
Fizz

</sample-output>

<sample-output>

Number: **7**

</sample-output>

<sample-output>

Number: **20**
Buzz

</sample-output>

<sample-output>

Number: **45**
FizzBuzz

</sample-output>

</in-browser-programming-exercise>

## Sisäkkäiset ehtolauseet

Ehtolauseita voidaan kirjoittaa toistensa sisään. Esimerkiksi seuraava ohjelma tunnistaa positiivisista luvuista parittomat ja parilliset:

```python
luku = int(input("Anna luku: "))

if luku > 0:
    if luku % 2 == 0:
        print("Luku on parillinen")
    else:
        print("Luku on pariton")
else:
    print("Luku on negatiivinen")
```

Esimerkkitulostus kolmella eri syötteellä:

<sample-output>

Anna luku: **3**
Luku on pariton

Anna luku: **18**
Luku on parillinen

Anna luku: **-4**
Luku on negatiivinen

</sample-output>

Sisäkkäisiä ehtolauseita käytettäessä on tärkeä muistaa oikeat sisennykset. Esimerkiksi `else`-haara yhdistetään oikeaan `if`-lauseeseen juuri saman sisennyksen perusteella.

Huomaa, että monissa tapauksissa voidaan käyttää joko sisäkkäisiä ehtolauseita tai loogisia operaattoreita. Seuraava esimerkki on toiminnallisesti sama kuin edellinen esimerkki, eli se tulostaa tiedon siitä, onko positiivinen kokonaisluku parillinen vai pariton.

```python
luku = int(input("Anna luku: "))

if luku > 0 and luku % 2 == 0:
    print("Luku on parillinen")
elif luku > 0 and luku % 2 != 0:
    print("Luku on pariton")
else:
    print("Luku on negatiivinen.")
```

Tilanteesta riippuu, kumpaa tapaa kannattaa käyttää. Tässä esimerkissä ensimmäinen vaihtoehto tuntuu useimpien mielestä paremmalta.


<in-browser-programming-exercise name="Leap year" tmcname="part02-12_leap_year">

Generally, any year that is divisible by four is a leap year. However, if the year is additionally divisible by 100, it is a leap year only if it also divisible by 400.

Please write a program which asks the user for a year, and then prints out whether the year is a leap year or not.

Some examples:

<sample-output>

Please type in a year: **2011**
That year is not a leap year.

</sample-output>

<sample-output>

Please type in a year: **2020**
That year is a leap year.

</sample-output>

<sample-output>

Please type in a year: **1800**
That year is not a leap year.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Alphabetically in the middle" tmcname="part02-13_alphabetically_in_the_middle">

Please write a program which asks the user for three letters. The program should then print out whichever of the three letters would be in the middle if the letters were in alphabetical order.

You may assume the letters will be either all uppercase, or all lowercase.

Some examples of expected behaviour:

<sample-output>

1st letter: x
2nd letter: c
3rd letter: p
The letter in the middle is p

</sample-output>

<sample-output>

1st letter: C
2nd letter: B
3rd letter: A
The letter in the middle is B

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Gift tax calculator" tmcname="part02-14_gift_tax_calculator"  height="500px">

Some say paying taxes makes Finns happy, so let's see if the secret of happiness lies in one of the taxes set out in Finnish tax law. 

[According to the Finnish Tax Administration](https://www.vero.fi/en/individuals/property/gifts/), a gift is a transfer of property to another person against no compensation or payment. If the total value of the gifts you receive from the same donor in the course of 3 years is €5,000 or more, you must pay gift tax.

When the gift is received from a close relative or a family member, the amount of tax to be paid is determined by the following table, which is also available on [this website](https://www.vero.fi/en/individuals/property/gifts/gift-tax-calculator/):

Value of gift | Tax at the lower limit | Tax rate for the exceeding part (%)
:------------:|:----------------------:|:-----------------------------------:
5 000 — 25 000 |        100     |       8
25 000 — 55 000	|       1 700   |	10
55 000 — 200 000 |      4 700	|       12
200 000 — 1 000 000 |   22 100  |	15
1 000 000 —	|       142 100 |	17

So, for a gift of 6 000 euros the recipient pays a tax of 180 euros (100 + (6 000 - 5 000) * 0.08). Similarly, for a gift of 75 000 euros the recipient pays a tax of 7 100 euros (4 700 + (75 000 - 55 000) * 0.12).

Please write a program which calculates the correct amount of tax for a gift from a close relative. Have a look at the examples below to see what is expected. Notice the lack of thousands separators in the input values - you may assume there will be no spaces or other thousands separators in the numbers in the input, as we haven't yet covered dealing with these.

<sample-output>

Value of gift: **3500**
No tax!

</sample-output>

<sample-output>

Value of gift: **5000**
Amount of tax: 100.0 euros

</sample-output>

<sample-output>

Value of gift: **27500**
Amount of tax: 1950.0 euros

</sample-output>

</in-browser-programming-exercise>

A quiz to review the contents of this section:

<quiz id="6bfd7e0d-2998-5697-80dc-418703fabbbf"></quiz>
