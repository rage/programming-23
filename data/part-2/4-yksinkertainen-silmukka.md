---
path: '/part-2/4-yksinkertainen-silmukka'
title: 'Yksinkertainen silmukka'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, mitä silmukka tarkoittaa ohjelmoinnissa
- Osaat käyttää `while True` -silmukkaa osana ohjelmaasi
- Tiedät, miten toisto voidaan katkaista `break`-komennolla

</text-box>

<!---Muista tsekata tämä: https://github.com/rage/ohjelmointi-21/commit/4784adf869af834a4fc483d11b326362dc60eaf3 ja poista sitten tämä rivi -- >

Silmukka eli toistolause on ehtolauseen lisäksi keskeinen ohjausrakenne ohjelmoinnissa. Aloitetaan toistamiseen tutustuminen tarkastelemalla Pythonin `while`-silmukkaa yksinkertaisten esimerkkien kautta. Ensi viikolla tutustutaan sitten monipuolisemmin sen mahdollisuuksiin.

Periaatteessa silmukka muistuttaa ehtolausetta. Ideana kuitenkin on, että sen avulla voidaan toistaa samaa koodia useamman kerran.

Tarkastellaan esimerkkiä, jossa ohjelma laskee käyttäjän syöttämien lukujen neliöitä niin kauan, että käyttäjä syöttää negatiivisen luvun:

```python
while True:
    luku = int(input("Anna luku, -1 lopettaa: "))

    if luku == -1:
        break

    print(luku ** 2)

print("Kiitos ja moi!")
```

Ohjelman esimerkkisuoritus:

<sample-output>

Anna luku, -1 lopettaa: **2**
4
Anna luku, -1 lopettaa: **4**
16
Anna luku, -1 lopettaa: **10**
100
Anna luku, -1 lopettaa: **-1**
Kiitos ja moi!

</sample-output>

Kuten esimerkistä huomataan, ohjelman kysyy `while`-lauseen ansiosta käyttäjältä useita lukuja. Sitten kun käyttäjän syöte on -1, suoritetaan `break`-komento, jolloin suoritus hyppää ensimmäiselle lohkon jälkeiselle riville.

Silmukoita käytettäessä on oltava tarkkana, että ei jouduta tilanteeseen, missä silmukan suoritus ei koskaan lopu. Muutetaan edellistä esimerkkiä seuraavasti

```python
luku = int(input("Anna luku, -1 lopettaa: "))
while True:
    if luku == -1:
        break

    print(luku ** 2)

print("Kiitos ja moi!")
```

Nyt siis lukua kysytään _silmukan ulkopuolella_. Jos käyttäjä antaa minkä tahansa muun luvun kuin -1:n, ei silmukasta tulla koskaan pois, eli syntyy _ikuinen silmukka_. Tällöin silmukassa olevaa lohkoa suoritetaan ikuisesti:

<sample-output>

Anna luku, -1 lopettaa: **2**
4
4
4
4
4
4
4
4
(jatkuu ikuisesti...)

</sample-output>

Seuraavassa esimerkkinä ohjelma, joka antaa käyttäjän jatkaa eteenpäin vasta sen jälkeen, kun käyttäjä on syöttänyt oikean PIN-koodin _1234_:

```python
while True:
    koodi = input("Anna PIN-koodi: ")
    if koodi == "1234":
        break
    print("Väärin... yritä uudelleen")

print("PIN-koodi oikein!")
```

<sample-output>

Anna PIN-koodi: **0000**
Väärin... yritä uudelleen
Anna PIN-koodi: **9999**
Väärin... yritä uudelleen
Anna PIN-koodi: **1234**
PIN-koodi oikein!

</sample-output>

<in-browser-programming-exercise name="Shall we continue?" tmcname="part02-15_shall_we_continue">

Let's create a program with a similar structure as in the example above. This program should print out the message "hi" and then ask "Shall we continue?" until the user inputs "no". Then the program should print out "okay then" and finish. Please have a look at the example below.

<sample-output>

hi
Shall we continue? **yes**
hi
Shall we continue? **oui**
hi
Shall we continue? **jawohl**
hi
Shall we continue? **no**
okay then

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Input validation" tmcname="part02-16_input_validation">

Please write a program which asks the user for integer numbers. 

If the number is below zero, the program should print out the message "Invalid number" and ask for another number. 

If the number is above zero, the program should print out the square root of the number using the Python `sqrt` function.

If the user inputs the number zero, the program should stop asking for numbers and exit the loop.

Below you'll find a reminder of how the `sqrt` function is used. Remember to `import` it in the beginning of the program.

```python
# sqrt function will not work without this line in the beginning of the program
from math import sqrt

print(sqrt(9))
```

<sample-output>

3.0

</sample-output>

An example of expected behaviour of your program:

<sample-output>

Please give me a number: **16**
4.0
Please give me a number: **4**
2.0
Please give me a number: **-3**
Invalid number
Please give me a number: **1**
1.0
Please give me a number: **0**
Exiting...

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Countdown" tmcname="part02-17_countdown">

This program should print out a countdown. The code is as follows:

```python
number = 5
print("Countdown!")
while True:
  print(number)
  number = number - 1
  if number > 0:
    break

print("Now!")
```

This should print out

<sample-output>

Countdown!
5
4
3
2
1
Now!

</sample-output>

However, the program doesn't quite work. Please fix it.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Repeat password" tmcname="part02-18_repeat_password">

Please write a program which asks the user for a password. The program should then ask the user to type in the password again. If the user types in something else, the program should keep on asking until the user types the first password again correctly.

Have a look at the expected behaviour below:

<sample-output>

Password: **sekred**
Repeat password: **secret**
They do not match!
Repeat password: **cantremember**
They do not match!
Repeat password: **sekred**
User account created!

</sample-output>

</in-browser-programming-exercise>

## silmukka ja apumuuttujat

Tehdään vielä PIN-koodin tarkastavasta ohjelmasta monimutkaisempi versio, joka antaa käyttäjälle vain kolme mahdollisuutta yrittää PIN-koodin syöttämistä.

Ohjelma käyttää nyt kahta apumuuttujaa. Muuttuja `yritykset` pitää kirjaa siitä, kuinka monta kertaa käyttäjä on syöttänyt koodin.  Muuttuja `onnistui` saa arvokseen joko `True` tai `False` riippuen siitä, onnistuuko kirjautuminen.

```python
yritykset = 0

while True:
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1

    if tunnus == "1234":
        onnistui = True
        break

    if yritykset == 3:
        onnistui = False
        break

    # tänne tullaan jos väärin JA ei ole jo kolmea yritystä
    print("Väärin... yritä uudelleen")

if onnistui:
    print("Pinkoodi oikein!")
else:
    print("Liian monta yritystä...")
```

<sample-output>

Anna PIN-koodi: **0000**
Väärin... yritä uudelleen
Anna PIN-koodi: **1234**
PIN-koodi oikein!

</sample-output>

<sample-output>

Anna PIN-koodi: **0000**
Väärin... yritä uudelleen
Anna PIN-koodi: **9999**
Väärin... yritä uudelleen
Anna PIN-koodi: **4321**
Liian monta yritystä...

</sample-output>

Silmukasta tullaan siis ulos, jos käyttäjä syöttää oikean PIN-koodin _tai_ jos yrityksiä tehdään liian monta. Silmukan jälkeinen if-lause tarkastaa muuttujan `onnistui` arvon perusteella, onko kirjautuminen onnistunut vai ei.

## pro-tip: debuggaustulostus silmukassa

Kun ohjelmat alkavat sisältää silmukoita, kasvavat mahdolliset bugienkin lähteet ihan uudelle tasolle, ja tämän osan [ensimmäisessä luvussa](/osa-2/1-ohjelmoinnin-termeja) mainittujen debugtulostuksien teko muuttuu entistäkin tärkeämmäksi.

Esim. jos edellinen esimerkki olisi koodattu hieman väärin:

```python
yritykset = 0

while True:
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1

    if yritykset == 3:
        onnistui = False
        break

    if tunnus == "1234":
        onnistui = True
        break

    print("Väärin... yritä uudelleen")

if onnistui:
    print("Pinkoodi oikein!")
else:
    print("Liian monta yritystä...")
```

ohjelma toimii kummalliseti, se antaa yrittää PIN-koodia kolmesti, mutta valittaa että yrityksiä on liian monta vaikka lopussa syötettiin oikea koodi:

<sample-output>

Anna PIN-koodi: **0000**
Väärin... yritä uudelleen
Anna PIN-koodi: **9999**
Väärin... yritä uudelleen
Anna PIN-koodi: **1234**
Liian monta yritystä...

</sample-output>

Bugin syy selviää lisäämällä sopivia debug-tulostuksia:

```python
while True:
    print("whilen lohko alkaa:")
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1

    print("yritykset:", yritykset)
    print("ehto1:", yritykset == 3)
    if yritykset == 3:
        onnistui = False
        break

    print("tunnus:", tunnus)
    print("ehto2:", tunnus == "1234")
    if tunnus == "1234":
        onnistui = True
        break

    print("Väärin... yritä uudelleen")
```

<sample-output>

whilen lohko alkaa:
Anna PIN-koodi: **2233**
yritykset: 1
ehto1: False
tunnus: 2233
ehto2: False
Väärin... yritä uudelleen
whilen lohko alkaa:
Anna PIN-koodi: **4545**
yritykset: 2
ehto1: False
tunnus: 4545
ehto2: False
Väärin... yritä uudelleen
whilen lohko alkaa:
Anna PIN-koodi: **1234**
yritykset: 3
ehto1: True
Liian monta yritystä...

</sample-output>

Kun tulostuksia silmäillään hieman huomataan, että kolmannella while-lohkon suorituksella ensimmäisen _if_-komennon ehto on arvoltaan tosi, ja silmukasta poistutaan ennen kuin ehditään tarkastaa oliko juuri syötetty salasana oikein:

```python
  while True:
    # ....

    # tämä lohko on liian aikaisin
    if yritykset == 3:
        onnistui = False
        break

    # tänne ei päästä enää kolmannella yrityksellä...
    if tunnus == "1234":
        onnistui = True
        break
```

<in-browser-programming-exercise name="PIN and number of tries" tmcname="part02-19_pin_and_number_of_tries">

Please write a program which keeps asking the user for a PIN code until they type in the correct one, which is _4321_. The program should then print out the number of times the user tried different codes.

<sample-output>

PIN: **3245**
Wrong
PIN: **1234**
Wrong
PIN: **0000**
Wrong
PIN: **4321**
Correct! It took you 4 tries

</sample-output>

If the user gets it right on the first go, the program should print out something a bit different:

<sample-output>

PIN: **4321**
Correct! It only took you one single try!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="The next leap year" tmcname="part02-20_next_leap_year">

Please write a program which asks the user for a year, and prints out the next leap year.

<sample-output>

Year: **2023**
The next leap year after 2023 is 2024

</sample-output>

If the user inputs a year which is a leap year (such as 2024), the program should print out the following leap year:

<sample-output>

Year: **2024**
The next leap year after 2024 is 2028

</sample-output>

</in-browser-programming-exercise>

## Merkkijonon kokoaminen plus-operaattorilla

PIN-koodin tarkastavassa esimerkissä käytimme apumuuttujaa `yritykset` pitämään kirjaa siitä kuinka monta kertaa PIN-koodi on syötetty:

```python
yritykset = 0

while True:
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1
    # ...
```

Muuttuja alustetaan arvoon nolla silmukan ulkopuolella, ja jokainen silmukan suoritus kasvattaa sen arvoa yhdellä.

Vastaava idea toimii myös merkkijonoille. Voisimme laajentaa ohjelmaa siten, että se kokoaa yhteen merkkijonoon kaikki käyttäjän syöttämät PIN-koodit:

```python

tunnukset = ""
yritykset = 0

while True:
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1
    tunnukset += tunnus + ", "
    # ...
```

Apumuuttuja saa aluksi arvokseen _tyhjän merkkijonon_, eli merkkijonon jonka pituus on nolla:

```python
tunnukset = ""
```

Silmukan sisällä merkkijonoa kasvatetaan lisäämällä siihen aina silmukassa syötetty tunnus ja pilkku:

```python
    tunnus = input("Anna PIN-koodi: ")
    tunnukset += tunnus + ", "
```

Jos käyttäjä syöttäisi tunnukset _1111 2222 1234_ olisi muuttujan `tunnukset` arvo lopulta

<sample-output>

1111, 2222, 1234,

</sample-output>


<in-browser-programming-exercise name="Story" tmcname="part02-21_story">

### Part 1

Please write a program which keeps asking the user for words. If the user types in `end`, the program should print out the story the words formed, and finish.

<sample-output>

Please give me a word: **Once**
Please give me a word: **upon**
Please give me a word: **a**
Please give me a word: **time**
Please give me a word: **there**
Please give me a word: **was**
Please give me a word: **a**
Please give me a word: **girl**
Once upon a time there was a girl

</sample-output>

### Osa 2

Change the program so that the loop ends also if the user types in the same word twice.

<sample-output>

Please give me a word: **It**
Please give me a word: **was**
Please give me a word: **a**
Please give me a word: **dark**
Please give me a word: **and**
Please give me a word: **stormy**
Please give me a word: **night**
Please give me a word: **night**
It was a dark and stormy night

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Working with numbers" tmcname="part02-22_working_with_numbers">

Please write a program which asks the user for integer numbers. The program should keep asking for numbers until the user types in zero.

<sample-output>

Please give me numbers. Type in 0 to finish.
Number: **5**
Number: **22**
Number: **9**
Number: **-2**
Number: **0**

</sample-output>

### Part 1: Count

After reading in the numbers the program should print out how many numbers were typed in. The zero at the end should not be included in the count.

You will need a new variable here to keep track of the numbers typed in.

<sample-output>

... the program asks for numbers
Numbers typed in: 4

</sample-output>

### Part 2: Sum

The program should also print out the sum of all the numbers typed in. The zero at the end should not be included in the calculation.

The program should now print out the following:

<sample-output>

... the program asks for numbers
Numbers typed in: 4
The sum of the numbers is 34

</sample-output>

### Part 3: Mean

The program should also print out the mean of the numbers. The zero at the end should not be included in the calculation. You may assume the user will always type in at least one valid non-zero number.

<sample-output>

... the program asks for numbers
Numbers typed in: 4
The sum of the numbers is 34
The mean of the numbers is 8.5

</sample-output>

#### Part 4: Positives and negatives

The program should also print out the how many of the numbers were positive and how many were negative.

<sample-output>

... the program asks for numbers
Numbers typed in: 4
The sum of the numbers is 34
The mean of the numbers is 8.5
Positive numbers: 3
Negative numbers: 1

</sample-output>

</in-browser-programming-exercise>

A quiz to review the contents of this section:

<quiz id="63a51999-e525-5f1d-a333-b26392a5585b"></quiz>

Please respond to a quick questionnaire on this week's materials. 

<quiz id="90b0d94a-54b0-5c0f-aa19-9832ae67e9b9"></quiz>
