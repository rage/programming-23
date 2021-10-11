---
path: '/part-7/1-modules'
title: 'Modules'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, mikä on moduuli
- Osaat ottaa käyttöön moduulin `import`-lauseella
- Tiedät, miten moduulin sisällöstä voi etsiä tietoa

</text-box>

## Debugging revisited

Kurssilla on jo moneen otteeseen puhuttu erilaisista debuggausmenetelmistä. [Visualisaattori](http://www.pythontutor.com/visualize.html#mode=edit) on jo monille tuttu ja vanha kunnon [debuggaustulostus](osa-2/1-ohjelmoinnin-termeja#debuggaaminen) toimii aina. Visual Studio Coden [debuggeriakin](/osa-4/1-vscode#debuggeri) monet ovat jo kokeilleet. Debuggerilla voi olla vaikeuksia selvitä tiedostoja käsittelevästä koodista, mutta siihenkin on olemassa [lääke](/osa-6/1-tiedostojen-lukeminen#tiedostoja-lukevan-koodin-debuggaus).

Pythonin versio 3.7 tarjoaa vielä yhden erittäin helppokäyttöisen tavan debuggaukseen, komennon [breakpoint()](https://docs.python.org/3/library/functions.html?highlight=breakpoint#breakpoint).

Voit lisätä komennon mihin kohtaan tahansa ohjelmaasi, ja kun suoritat ohjelman, pysähtyy suoritus komennon kohdalle. Seuraavassa esimerkki viime viikon tehtävän debuggaamisesta:

<img src="7_1_1.png">

Kun koodi pysähtyy breakpoint()-komentoon, avautuu samalla konsolinäkymä, johon on mahdollista kirjoittaa mitä tahansa koodia ja kokeilla miten se toimisi ohjelman kyseisessä kohdassa.

Komento on erityisen kätevä jos ohjelmasi jokin rivi aiheuttaa virheen, etkä ole ihan varma mistä virhe johtuu. Näissä tilanteissa kannattaa laittaa breakpoint-kutsu juuri ennen virheellistä riviä. Sen jälkeen on debuggerin konsolissa helppo kokeilla, mikä olisi oikea komento juuri siinä kohtaa suoritettavaksi.

Koodin suoritusta on myös mahdollista jatkaa pysähtymisen jälkeen. Esimerkiksi konsoliin annettu komento _continue_ tai sen lyhennetty versio _c_ jatkaa suoritusta seuraavaan breakpointiin asti. Seuraavassa esimerkki siitä, kun silmukkaa käydään läpi muutamaan kertaan:

<img src="7_1_2.png">

Muut debuggerikonsolin komennot selviävät [täältä](https://docs.python.org/3/library/pdb.html#debugger-commands) tai antamalla debuggerkonsolissa komento _help_:

<img src="7_1_3.png">

Komento _exit_ siis lopettaa ohjelman suorituksen.

Kun lopetat debuggaamisen, muista poistaa koodista komento `breakpoint()`!

## Moduulin käyttäminen

Python-kieli sisältää itsessään joukon valmiita funktioita, esimerkiksi merkkijonojen ja listojen pituuden kertovan funktion `len` sekä alkioiden summan laskevan funktion `sum`. Python-kielen _standardikirjasto_ on kokoelma monenlaisia hyödyllisiä funktioita ja olioita joiden avulla kielen "ilmaisuvoimaa" on helppo laajentaa. Olemme jo käyttäneet muutamassa tehtävässä standardikirjastosta eräitä matemaattisia operaatioita tarjoavia funktioita esim. neliöjuurten laskemisessa.

Standardikirjasto muodostuu _moduuleista_, joihin on ryhmitelty eri aiheisiin liittyviä funktioita ja luokkia. Tutustumme tässä osassa joihinkin hyödyllisiin moduuleihin ja opimme myös tekemään moduulin itse.

Komento `import` ottaa käyttöön halutun moduulin. Tarkastellaan esimerkkinä moduulia `math`, jossa on matemaattisia funktioita. Seuraava koodi laskee luvun neliöjuuren funktiolla `sqrt` ja logaritmin funktiolla `log`

```python
import math

# luvun 5 neliöjuuri
print(math.sqrt(5))
# luvun 8 logaritmi (2-kantainen)
print(math.log(8, 2))
```

<sample-output>

2.23606797749979
3.0

</sample-output>

Koska funktiot ovat moduulissa `math`, niihin viitataan koodissa nimillä `math.sqrt` ja `math.log`.

## Moduulin osien valinta

Toinen tapa käyttää moduulia on valita sieltä mukaan `from`-komennolla tiettyjä osia, joita haluamme käyttää. Esimerkiksi seuraava koodi ottaa käyttöön funktiot `sqrt` ja `log` moduulista `math`:

```python
from math import sqrt, log

print(sqrt(5))
print(log(5,2))
```

Tämän tavan etuna on, että voimme käyttää funktioita suoraan ilman `math`-etuliitettä.

Voimme myös ottaa suoraan käytettäväksi _kaiken_ moduulin sisällön tähden avulla:

```python
from math import *

print(sqrt(5))
print(log(5,2))
```

Tämä tapa voi olla kätevä testailussa ja pienissä ohjelmissa, mutta siinä on omat ongelmansa, kuten näemme myöhemmin.

<programming-exercise name='Hypotenuse' tmcname='part07-01_hypotenuse'>

Please write a function named `hypotenuse(leg1: float, leg2: float)`, which takes the lengths of the two sides adjacent to the right angle of an orthogonal triangle. The function should return the length of the hypotenuse, or the side opposite to the right angle.

You can use the [Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem) to calculate the result. You will need the `sqrt` function from the `math` module.

Some examples:

```python
print(hypotenuse(3,4)) # 5.0
print(hypotenuse(5,12)) # 13.0
print(hypotenuse(1,1)) # 1.4142135623730951
```

</programming-exercise>

## Moduulin sisältö

Pythonin dokumentaatio kertoo jokaisesta standardikirjaston moduulista, mitä moduuli sisältää ja kuinka sitä käytetään. Esimerkiksi moduulin `math` dokumentaatio on tässä:

* https://docs.python.org/3/library/math.html

Voimme myös tutkia funktion `dir` avulla moduulin sisältöä:

```python
import math

print(dir(math))
```

Funktio antaa listan nimistä, jotka moduuli määrittelee:

<sample-output>

['\_\_doc\_\_', '\_\_name\_\_', '\_\_package\_\_', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'hypot', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'modf', 'pi', 'pow', 'radians', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc']

</sample-output>

<programming-exercise name='Special characters' tmcname='part07-02_special_characters'>

The Python module [string](https://docs.python.org/3/library/string.html) contains some string constants, which define certain groups of characters. These include for example lowercase letters and punctuation characters. Please familiarize yourself with these constants, and then write a function named `separate_characters(my_string: str)`. The function takes a string as its argument, and it should separate the characters in the string into three other strings, and return these in a tuple:

* The first string should contain the lowercase and uppercase ASCII letters (string constant `ascii_letters`)
* The second string should contain all punctuation characters defined by the string constant `punctuation`
* The third string should contain all the other characters (including whitespace)

The characters should appear in the three strings in the same order as they appeared in the original string.

An example of the function in action:

```python
parts = separate_characters("Olé!!! Hey, are ümläüts wörking?")
print(parts[0])
print(parts[1])
print(parts[2])
```

<sample-output>

OlHeyaremltswrking
!!!,?
é  üäü ö 

</sample-output>

</programming-exercise>

<programming-exercise name='Fractions' tmcname='part07-03_fractions'>

Please familiarize yourself with the Python module `fractions`. Use it to write a function named `fractionate(amount: int)`, which takes the number of parts as its argument. The function should divide the number 1 into as many equal sized fractions as is specified by the argument, and return these in a list.

An example of the function in action:

```python
for p in fractionate(3):
    print(p)

print()

print(fractionate(5))
```

<sample-output>

1/3
1/3
1/3

[Fraction(1, 5), Fraction(1, 5), Fraction(1, 5), Fraction(1, 5), Fraction(1, 5)]

</sample-output>

</programming-exercise>

<!---
<quiz id="94c034a1-3183-5682-acb0-7f126d26ba07"></quiz>
-->
