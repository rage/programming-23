---
path: '/part-2/1-ohjelmoinnin-termeja'
title: 'Ohjelmoinnin termejä'
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tunnet keskeistä ohjelmoinnin termistöä
- Tiedät lauseen ja lausekkeen eron
- Osaat selvittää lausekkeen arvon tyypin
- Opit etsimään virheitä debuggauksen avulla

</text-box>

Emme vielä kurssin ensimmäisessä osassa kiinnittäneet kovin tarkasti huomiota ohjelmoinnin terminologiaan. Nyt on hyvä hetki tutustua joihinkin käsitteisiin.

## Lause

_Lause_ (engl. _statement_) tarkoittaa ohjelman osaa, joka suorittaa jonkin toiminnon. Usein lause viittaa yksittäiseen komentoon.

Esimerkiksi `print("Moi!")` on lause, joka tulostaa rivin tekstiä,
ja `luku = 2` on lause, joka asettaa muuttujalle arvon.

Lause voi olla myös monimutkaisempi, ja sen sisällä voi olla muita lauseita.
Esimerkiksi seuraava ehtolause muodostuu kolmesta rivistä:

```python
if nimi == "Anna":
    print("Moi!")
    luku = 2
```

Tässä tapauksessa ehtolauseen sisällä on kaksi lausetta.

## Lohko

_Lohko_ (engl. _block_) on joukko peräkkäin sijoitettuja lauseita, jotka ovat samalla tasolla ohjelman rakenteessa. Esimerkiksi ehtolauseessa lohkossa ovat lauseet, jotka suoritetaan ehdon ollessa tosi.

```python
if ika > 17:
    # ehtolauseessa oleva lohko alkaa
    print("Olet täysi-ikäinen!")
    ika = ika + 1
    print("nyt vuoden vanhempi...")
    # lohko loppuu

print("tämä on eri lohkossa")
```

Pythonissa lohko ilmaistaan sisentämällä lohkon koodi eli lauseet samalle tasolle.

Kannattaa huomata, että Python-ohjelman "päälohkon" on oltava sisennetty tiedoston vasempaan reunaan:

```python
# tämä ohjelma ei toimi sillä koodia ei ole sisennetty vasempaan reunaan
  print("hei maailma")
  print("huono ohjelma...")
```

## Lauseke

_Lauseke_ (engl. _expression_) on koodin osa, jolla on jokin tyyppi. Ohjelman suorituksen aikana lauseke saa arvon, jota voidaan käyttää ohjelmassa.

Tarkastellaan muutamaa esimerkkiä lausekkeista:

| Lauseke | Arvo | Tyyppi | Tyyppi Pythonissa |
|---------|------|--------------|-------------------|
|`2 + 4 + 3` | `9` | kokonaisluku | `int` |
|`"abc" + "de"` | `"abcde"` | merkkijono | `str`|
|`11 / 2` | `5.5` | liukuluku | `float` |
|`2 * 5 > 9` | `True` | totuusarvo | `bool`|

Koska lausekkeella on arvo, voi sen sijoittaa muuttujaan:

```python
# muuttuja x saa arvoksi lausekkeen 1 + 2 arvon
x = 1 + 2
```

Yksinkertaisesta lausekkeesta saa muodostettua monimutkaisempia lausekkeita esim. laskuoperaattorien avulla:

```python
# muuttuja y saa arvoksi lausekkeen '3 kertaa x plus x toiseen' arvon
y = 3 * x + x**2
```

## Funktio

_Funktio_ (engl. _function_) suorittaa jonkin toiminnon. Funktiolla voi olla yksi tai useampi _parametri_ (engl. _parameter_), jotka ilmaisevat, mitä funktion tulee tehdä tarkalleen.

Funktio suoritetaan, kun sitä _kutsutaan_ eli koodissa on funktion nimi ja funktiolle annettavat parametrit suluissa. Esimerkiksi seuraava koodi kutsuu `print`-funktiota parametrilla `"tämä on parametri"`:

```python
print("tämä on parametri")
```

Myös käyttäjältä syötteitä lukeva `input` on funktio. Parametrina funktio saa käyttäjälle näytettävän viestin:

```python
nimi = input("Kerro nimesi: ")
```

Tässä tapauksessa funktio _palauttaa_ arvon, mikä tarkoittaa, että funktion kutsukohtaan ilmestyy arvo funktion suorituksen jälkeen. Funktion `input` palauttama arvo on käyttäjän syöttämä teksti merkkijonona. Funktion palauttama arvo sijoitetaan usein muuttujan arvoksi, jotta arvoa voidaan hyödyntää ohjelmassa.

## Tyyppi

_Tyyppi_ (engl. _type_) tarkoittaa, millainen jokin koodissa esiintyvä arvo on. Esimerkiksi seuraavassa koodissa muuttujan `nimi` tyyppi on merkkijono ja muuttujan `tulos` tyyppi on kokonaisluku:

```python
nimi = "Anna"
tulos = 100
```

Funktio `type` kertoo annetun lausekkeen tyypin. Esimerkiksi:

```python
print(type("Anna"))
print(type(100))
```

<sample-output>

<class 'str'>
<class 'int'>

</sample-output>

## Syntaksi

_Syntaksi_ (engl. _syntax_) määrittää, miten ohjelman koodi tulee kirjoittaa. Jokaisella ohjelmointikielellä on omanlainen syntaksinsa.

Esimerkiksi Python-kielen syntaksiin kuuluu, että `if`-lauseen aloitusrivin lopussa on kaksoispiste ja ehtoon kuuluva koodi on sisennetty:

```python
if nimi == "Anna":
    print("Moi!")
```

Jos ohjelmointikielen syntaksia ei noudateta, seurauksena on virheilmoitus:

```python
if nimi == "Anna"
    print("Moi!")
```

<sample-output>

<pre>
  File "testi.py", line 1
    if nimi == "Anna"
                    ^
SyntaxError: invalid syntax
</pre>


</sample-output>

## Debuggaaminen

Kun ohjelman syntaksi on kunnossa mutta ohjelma ei toimi halutulla tavalla, ohjelmassa on _bugi_.

Bugit ilmenevät eri tavoin. Jotkin bugit aiheuttavat suoritusaikaisen virheen. Esim. ohjelma

```python
x = 10
y = 0
tulos = x / y

print(f"{x} jaettuna {y} on {tulos}")
```

aiheuttaa seuraavan virheen:

<sample-output>

<pre>
ZeroDivisionError: integer division or modulo by zero on line 3
</pre>

</sample-output>

Ongelma on siis siinä, että nollalla jakaminen ei ole sallittua ja se keskeyttää ohjelman suorituksen.

Suoritusaikaiseen virheeseen johtavat bugit ovat usein helpohkoja korjata, sillä bugin aiheuttama rivi selviää virheilmoituksesta. Toki bugin varsinainen syy on usein muualla kuin virheilmoituksen aiheuttaneessa rivissä.

Joskus bugi taas ilmenee siten, että koodin tuottama tulos on virheellinen. Tälläisten bugien havaitseminen ja niiden syyn paikallistaminen voi olla haastavaa. Kurssin tehtävissä testit paljastavat usein juuri tämän kategorian bugeja. Ennen kuin ongelma päästään korjaamaan, on bugi paikallistettava.

Koodarijargonissa bugien syiden selvittämistä kutsutaan _debuggaamiseksi_. Debuggaaminen on äärimmäisen keskeinen taito, ja ammatikseen ohjelmoivat käyttävät usein enemmän aikaa debuggaamiseen kuin varsinaiseen ohjelmointiin.

Yksinkertainen mutta tehokas debuggauskeino on lisätä ohjelmaan debug-tulostuksia eli `print`-komentoja, joiden avulla varmistetaan, että koodissa tapahtuu ohjelmoijan olettamia asioita.

Seuraavassa on ratkaisuyritys yhteen [edellisen osan](/osa-1/5-ehtorakenne) tehtävään:

```python
tuntipalkka = float(input("Tuntipalkka: "))
tunnit = int(input("Työtunnit: "))
paiva = input("Viikonpäivä: ")

palkka = tuntipalkka * tunnit
if paiva == "sunnnuntai":
    palkka * 2

print(f"Palkka {palkka} euroa")
```

Ohjelma ei näytä toimivan oikein ja testien suoritus kertoo seuraavaa:

<sample-output>

<pre>
FAIL: PalkkaTest: test_sunnuntai_1

Syötteellä 23.0, 12, sunnuntai oikeaa palkkaa 552.0 ei löydy tulosteestasi Palkka 276.0 euroa
</pre>

</sample-output>

Ensimmäinen askel debuggaamisessa on useimmiten kokeilla ohjelmaa ongelmallisella syötteellä. Kokeilu varmistaa, että tulos ei ole haluttu:

<sample-output>

Palkka 276.0 euroa

</sample-output>

Debugattaessa ohjelman toimintaa kokeillaan usein. Voikin olla hyödyllisä "kovakoodata" ongelman aiheuttavat syötteet suoraan koodiin sen sijaan, että ne kysyttäisiin joka kerta käyttäjältä. Tämä onnistuu esimerkiksi muuttamalla koodia tilapäisesti seuraavalla tavalla:

```python
# tuntipalkka = float(input("Tuntipalkka: "))
# tunnit = int(input("Työtunnit: "))
# paiva = input("Viikonpäivä: ")
tuntipalkka = 23.0
tunnit = 12
paiva = "sunnuntai"

palkka = tuntipalkka * tunnit
if paiva == "sunnnuntai":
    palkka * 2

print(f"Palkka {palkka} euroa")
```

Seuraava askel on lisäillä koodiin _debug-tulostuksia_. Koska nimenomaan sunnuntain palkka lasketaan väärin, laitetaan sen hoitavaan osaan tulostukset korotusta ennen ja sen jälkeen:

```python
# ...

palkka = tuntipalkka * tunnit
if paiva == "sunnnuntai":
    print("palkka alussa:", palkka)
    palkka * 2
    print("palkka kasvatuksen jälkeen:", palkka)

print(f"Palkka {palkka} euroa")
```

Kun ohjelma nyt suoritetaan, ei debug-tulostuksia jostain syystä näy ollenkaan. Vaikuttaa siltä, että ohjelman suoritus ei edes mene if-haaraan. Komennon ehdossa täytyy siis olla jokin ongelma. Ehdon arvokin voidaan tulostaa koodista:

```python
# ...

palkka = tuntipalkka * tunnit
print("ehto:", paiva=="sunnnuntai")
if paiva == "sunnnuntai":
    print("palkka alussa:", palkka)
    palkka * 2
    print("palkka kasvatuksen jälkeen:", palkka)

print(f"Palkka {palkka} euroa")
```

Ja tosiaan kun koodi suoritetaan, ehdon arvo on `False` eli koodi hyppää if-lohkon ohi:

<sample-output>

ehto:  False
Palkka 276.0 euroa

</sample-output>

Vian täytyy siis olla if-komennon ehdossa, ja kun sitä katsotaan tarkemmin, huomataan, että _sunnuntai_ on vahingossa kirjoitettu väärin. Korjataan typo:

```python
# ...

palkka = tuntipalkka * tunnit
print("ehto:", paiva=="sunnuntai")
if paiva == "sunnuntai":
    print("palkka alussa:", palkka)
    palkka * 2
    print("palkka kasvatuksen jälkeen:", palkka)

print(f"Palkka {palkka} euroa")
```

Koodin suoritus aiheuttaa nyt seuraavan tulostuksen:

<sample-output>

ehto: True
palkka alussa: 276.0
palkka kasvatuksen jälkeen: 276.0
Palkka 276.0 euroa

</sample-output>

Koska `tuntipalkka = 23.0` ja `tunnit = 12`, vaikuttaa muuttujassa `palkka` olevan oikea arvo aluksi, mutta kasvatuskomento ei kuitenkaan kasvata muuttujan arvoa. Komento on siis mitä ilmeisemmin virheellinen. Ja toden totta, komento

```python
palkka * 2
```

ainoastaan laskee tuplapalkan mutta ei tee tulokselle mitään. Korjataan komento muotoon, joka tallentaa korotetun palkan muuttujaan `palkka`:

```python
palkka *= 2
```

Kun ohjelma suoritetaan nyt, huomataan että lopputuloskin on oikea:

<sample-output>

ehto:  True
palkka alussa: 276.0
palkka kasvatuksen jälkeen: 552.0
Palkka 552.0 euroa

</sample-output>

Kun ohjelma on kunnossa, tulee debuggaustulosteet ja muu debuggauksen takia kirjoitettu ylimääräinen koodi poistaa.

Esimerkki oli yksinkertainen ja näin lyhyessä ohjelmassa oleva bugi selviäisi varmasti myös koodia lukemalla. Monesti kuitenkin debug-tulostuksilla pääsee huomattavasti nopeammin jyvälle siitä, missä vika piilee. Tulostamalla voidaan usein varmistua siitä, mitkä osat ohjelmasta toimivat "varmuudella" oikein, ja bugien jäljitys voidaan nopeasti saada kohdistettua niihin koodiriveihin, joissa ongelma todennäköisesti piileskelee.

Debuggaukseen on olemassa muitakin keinoja kuin debug-tulostusten tekeminen. Palaamme asiaan myöhemmin kurssilla. Sinun kannattaa tästä lähtien kurssilla käyttää debug-tulostamista virheiden etsimiseen. Ohjelmoinnin ammattilaiset eivät selviä työstään ilman debug-tulostuksia, joten on vaikea kuvitella, että aloittelijoidenkin ei kannattaisi laajentaa työkalupakkiaan tältä osin.

<in-browser-programming-exercise name="Fix the syntax" tmcname="part02-01_fix_syntax" height="400px">

The following program contains several _syntactic errors_. Please fix the program so that the syntax is in order and the program works as specified by the examples below. 

```python
  number = input("Please give me a number: ")
  if number>100
    print("The number was greater than one hundred")
    number - 100
    print("Now its value has decreased by one hundred)
     print("Its value is now"+ number)
 print(number + " must be my lucky number!")
 print("Have a nice day!)
```

<sample-output>

Please give me a number: **13**
13 must be my lucky number!
Have a nice day!

</sample-output>

<sample-output>

Anna luku: **101**
The number was greater than one hundred
Now its value has decreased by one hundred
Its value is now 1
1 must be my lucky number!
Have a nice day!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Number of characters" tmcname="part02-02_number_of_characters">

The function `len` can be used to find out the length of a string, among other things. The function returns the number of characters in a string.

Some examples of how this works::

```python
word = "abcd"
print(len(word))

print(len("hi there"))

word2 = "howdydoody"
length = len(word2)
print(length)

empty_string = ""
length = len(empty_string)
print(length)
```

<sample-output>

4
6
12
0

</sample-output>

Please write a program which asks the user for a word and then prints out the number of characters if there was more than one.

Examples of expected behaviour:

<sample-output>

Please give me a word: **hey**
There are 3 letters in the word hey
Thank you!

</sample-output>

<sample-output>

Please give me a word: **banana**
There are 6 letters in the word banana
Thank you!

</sample-output>

<sample-output>

Please give me a word: **b**
Thank you!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Typecasting" tmcname="part02-03_typecasting">

When programming in Python, often we need to change the data type of a value. For example, a floating point number can be converted into an integer with the function `int`:

```python

temperature = float(input("Please give me a temperature: "))

print("The temperature is", temperature)

print("...and rounded down it is", int(temperature))

```

<sample-output>

Please give me a temperature: **5.15**
The temperature is 5.15
...and rounded down it is 5

</sample-output>

Notice the function always rounds down, and not according to the rounding rules in mathematics. This is an example of a _floor function_. 

<sample-output>

Please give me a temperature: **8.99**
The temperature is 8.99
...and rounded down it is 8

</sample-output>

Please write a program which asks the user for a floating point number and then prints out the integer part and the decimal part separately. Use the Python `int` function.

You can assume the number given by the user is always greater than zero.

An example of expected behaviour:

<sample-output>

Please give me a number: **1.34**
Integer part: 1
Decimal part: 0.34

</sample-output>

</in-browser-programming-exercise>

<quiz id="eb4b41d3-b83b-5815-a1d5-ae9b377aa274"></quiz>
