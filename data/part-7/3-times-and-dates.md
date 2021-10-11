---
path: '/part-7/3-times-and-dates'
title: 'Times and dates'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät tavan käsitellä päivämääriä ja kellonaikoja Pythonissa
- Osaat muodostaa ja käyttää `datetime`-olioita
- Osaat vertailla päivämääriä ja kellonaikoja toisiinsa ja laskea niiden erotuksia

</text-box>

## Aikaolio

Moduulin [datetime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime) funktio [now](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.now) antaa aikaolion, jossa on nykyinen päivämäärä ja kellonaika. Voimme esimerkiksi tulostaa nykyhetken päivämäärän ja kellonajan näin:

```python
from datetime import datetime

aika = datetime.now()
print(aika)
```

<sample-output>

2020-10-13 12:46:49.311393

</sample-output>

Toinen tapa muodostaa aikaolio on määrittää ajanhetki itse:

```python
from datetime import datetime

aika = datetime(1952, 12, 24)
print(aika)
```

<sample-output>

1952-12-24 00:00:00

</sample-output>

Kun emme antaneet kellonaikaa, oletuksena on, että kyseessä on keskiyö.

Voimme hakea aikaoliosta ajan osia tähän tapaan:

```python
from datetime import datetime

aika = datetime(1952, 12, 24)
print("Day:", aika.day)
print("Month:", aika.month)
print("VuosiYearika.year)
```

<sample-output>

Day: 24
Month: 12
Year: 1952

</sample-output>

Aikaoliolle voidaan antaa myös kellonaika halutulla tarkkuudella. Esimerkiksi:

```python
from datetime import datetime

pv1 = datetime(2020, 6, 30, 13, 00) # 30.6.2020 klo 13.00
pv2 = datetime(2020, 6, 30, 18, 45) # 30.6.2020 klo 18.45
```

## Aikojen vertailu ja ero

Voimme vertailla aikoja samaan tapaan kuin lukuja käyttämällä tuttuja vertailuoperaattoreita:

```python
from datetime import datetime

nyt = datetime.now()
juhannus = datetime(2020, 6, 20)

if nyt < juhannus:
    print("Ei ole vielä juhannus")
elif nyt == juhannus:
    print("Hyvää juhannusta!")
elif nyt > juhannus:
    print("Juhannus on mennyt")
```

<sample-output>

Juhannus on mennyt

</sample-output>

Voimme myös laskea kahden ajankohdan eron vähennyslaskuna:

```python
from datetime import datetime

nyt = datetime.now()
juhannus = datetime(2020, 6, 20)

ero = juhannus - nyt
print("Juhannukseen on vielä", ero.days, "päivää")
```

<sample-output>

Juhannukseen on vielä 37 päivää

</sample-output>

Huomaa, että vähennyslaskun tuloksena on [timedelta](https://docs.python.org/3/library/datetime.html?highlight=datetime#timedelta-objects)-olio, jolta voi kysyä vain rajoitetusti ajan yksikköjä. Voimme kysyä päivien määrän, mutta emme voi kysyä esimerkiksi vuosien määrää, koska vuoden pituus vaihtelee.

Timedelta-olion avulla on myös mahdollista selvittää, mikä ajanhetki saadaan kun tietty aika (viikkoina ja päivinä) lisätään johonkin ajanhetkeen:

```python
from datetime import datetime, timedelta
juhannus = datetime(2020, 6, 20)

viikko = timedelta(days=7)
viikon_paasta = juhannus + viikko

print("Kun viikko juhannuksesta kuluu on", viikon_paasta)

pitka_aika = timedelta(weeks=32, days=15)

print("Kun juhannuksesta kuluu 32 viikkoa ja 15 päivää on", juhannus + pitka_aika)
```

<sample-output>

Kun viikko juhannuksesta kuluu on 2020-06-27 00:00:00
Kun juhannuksesta kuluu 32 viikkoa ja 15 päivää on 2021-02-14 00:00:00

</sample-output>

Timedelta-olio toimii viikkojen ja päivien lisäksi tarkemmallakin tasolla:

```python
nyt = datetime.now()
keskiyo = datetime(2020, 6, 30)
erotus = keskiyo-nyt
print(f"keskiyöhön on vielä {erotus.seconds} sekuntia")
```

<sample-output>

keskiyöhön on vielä 8188 sekuntia

</sample-output>

<programming-exercise name='How old' tmcname='part07-09_how_old'>

Please write a program which asks the user for their date of birth, and then prints out how old the user was on the eve of the new millennium. The program should ask for the day, month and year separately, and print out the age in days. Please have a look at the examples below:

<sample-output>

Day: **10**
Month: **9**
Year: **1979**
You were 7417 days old on the eve of the new millennium.

</sample-output>

<sample-output>

Day: **28**
Month: **3**
Year: **2005**
You weren't born yet on the eve of the new millennium.

</sample-output>

You may assume all day-month-year combinations given as an argument will be valid dates. That is, there will not be a date like February 31st. 

</programming-exercise>

<programming-exercise name='Valid PIC?' tmcname='part07-10_valid_pic'>

In this exercise you will validate Finnish Personal Identity Codes (PIC). 

Please write a function named `is_it_valid(pic: str)`, which returns `True` or `False` based on whether the PIC given as an argument is valid or not. Finnish PICs follow the format `ddmmyyXyyyz`, where `ddmmyy` contains the date of birth, `X` is the marker for century, `yyy` is the personal identifier and `z` is a control character.

The program should check the validity by these three criteria:

* The first half of the code is a valid, existing date in the format `ddmmyy`.
* The century marker is either `+` (1800s), `-` (1900s) or `A` (2000s).
* The control character is valid.

The control character is calculated by taking the nine-digit number created by the date of birth and the personal identifier, dividing this by 31, and selecting the character at the index specified by the remainder from the string `0123456789ABCDEFHJKLMNPRSTUVWXY`. For example, if the remainder was 12, the control character would be `C`.

More examples and explanations of the uses of the PIC are available at the [Digital and Population Data Services Agency](https://dvv.fi/en/personal-identity-code).

**NB!** Please make sure you do not share your own PIC, for example in the code you use for testing or through the course support channels.

Here are some valid PICs you can use for testing:

* 230827-906F
* 120488+246L
* 310823A9877

</programming-exercise>

## Aikojen muotoilu

Voimme muotoilla ajanhetken haluamallamme tavalla [strftime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.date.strftime)-metodin avulla. Esimerkiksi seuraava koodi tulostaa nykyisen päivämäärän muodossa `pp.kk.vvvv`:

```python
from datetime import datetime

aika = datetime.now()
print(aika.strftime("%d.%m.%Y"))
```

<sample-output>

04.02.2020

</sample-output>

Ajan muotoilussa käytetään tiettyjä kirjainlyhenteitä. Seuraavassa listassa on joitakin mahdollisia lyhenteitä (täydellinen lista on Pythonin [dokumentaatiossa](https://docs.python.org/3/library/time.html#time.strftime)):

Lyhenne | Merkitys
:-------|:--------
`%d` | päivä (01–31)
`%m` | kuukausi (01–12)
`%Y` | vuosi nelinumeroisena
`%H` | tunnit 24 tunnin formaatissa
`%M` | minuutit (00–59)
`%S` | sekunnit (00–59)

Voimme myös tehdä muotoilun toiseen suuntaan, jos esimerkiksi haluamme muuttaa käyttäjän antaman ajanhetken aikaolioksi. Tämä onnistuu metodilla [strptime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.strptime):

```python
from datetime import datetime

syote = input("Anna syntymäpäiväsi muodossa pv.kk.vvvv: ")
aika = datetime.strptime(syote, "%d.%m.%Y")

if aika < datetime(2000, 1, 1):
    print("Synnyit viime vuosituhannella")
else:
    print("Synnyit tällä vuosituhannella")
```

<sample-output>

Anna syntymäpäiväsi muodossa pv.kk.vvvv: **5.11.1986**
Synnyit viime vuosituhannella

</sample-output>

<programming-exercise name='Screen time' tmcname='part07-11_screen_time'>

Please write a program for recording the amount of time the user has spent in front of a television, computer or mobile device screen over a specific period of time. 

The program should work as follows:

<sample-output>

Filename: **late_june.txt**
Starting date: **24.6.2020**
How many days: **5**
Please type in screen time in minutes on each day (TV computer mobile):
Screen time 24.06.2020: **60 120 0**
Screen time 25.06.2020: **0 0 0**
Screen time 26.06.2020: **180 0 0**
Screen time 27.06.2020: **25 240 15**
Screen time 28.06.2020: **45 90 5**
Data stored in file late_june.txt

</sample-output>

The user will input each day on a separate line, and the entries will contain three numbers separated by spaces, representing minutes.

With the above input, the program should store the data in a file named `late_june.txt`. The contents should look like this:

<sample-data>

Time period: 24.06.2020-28.06.2020
Total minutes: 780
Average minutes: 156.0
24.06.2020: 60/120/0
25.06.2020: 0/0/0
26.06.2020: 180/0/0
27.06.2020: 25/240/15
28.06.2020: 45/90/5

</sample-data>

</programming-exercise>

<!---
<quiz id="6fff0633-2f18-5e2b-9eab-6c8950c8378b"></quiz>
-->
