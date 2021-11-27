---
path: '/part-12/4-regular-expressions'
title: 'Regular expressions'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät mitä tarkoitetan säännöllisellä lausekkeella
- Osaat hyödyntää säännöllisiä lausekkeita omissa ohjelmissasi

</text-box>

Python on mainio työkalu tekstin käsittelemiseen. Yksi työkalu tekstin käsittelemisessä ovat
_säännölliset lausekkeet_ (_regular expressions_), joiden avulla voi esimerkiksi poimia ja etsiä merkkijonoja, jotka ovat tietyn muotoisia. Tässä osiossa käydään läpi säännöllisten lausekkeiden perusteita, ja löydät lisää tietoa Pythonin omasta [tutoriaalista](https://docs.python.org/3/howto/regex.html).

## Mitä ovat säännölliset lausekkeet?

Säännölliset lausekkeet ovat tavallaan ohjelmointikieli ohjelmointikielen sisällä. Lausekkeilla on oma syntaksinsa, jonka mukaan ne määritellään. Ideana on, että säännöllisellä lausekkeella määritellään sellaisten merkkijonojen joukko, jotka ovat tiettyjen sääntöjen mukaisia.

Tarkistellaan yksinkertaista esimerkkiä lausekkeiden käytöstä ennen tarkempaa perehtymistä sääntöihin:

```python
import re

sanat = ["Python", "Ponneton", "Ponttooni", "Pullero", "Pallon"]

for sana in sanat:
    # merkkijonon tulee alkaa "P" ja päättyä "on"
    if re.search("^P.*on$", sana):
        print(sana, "löytyy!")
```

<sample-output>

Python löytyy!
Ponneton löytyy!
Pallon löytyy!

</sample-output>

Pythonissa säännöllisiä lausekkeita voi käsitellä moduulin `re` avulla. Esimerkiksi yllä olevassa koodissa oleva metodi `search` etsii merkkijonosta osaa, joka täsmää annettuun säännölliseen lausekkeeseen.

Huomaa, että säännöllinen lauseke annetaan _merkkijonona_ funktion `search` parametriksi.

Toinen esimerkki etsii merkkijonosta luvut. Metodi `findall` palauttaa kaikki säännölliseen lausekkeeseen täsmäävät osajonot listana:

```python
import re

lause = "Eka, 2 !#kolmas 44 viisi 678xyz962"

luvut = re.findall("\d+", lause)

for luku in luvut:
    print(luku)
```

<sample-output>

2
44
678
962

</sample-output>

## Säännöllisten lausekkeiden syntaksi

Tarkastellaan seuraavaksi syntaksia, jota säännöllisissä lausekkeissa käytetään. Useimmissa esimerkeissä käytetään samaa testiohjelmaa eri syötteillä.

```python
import re

lauseke = input("Anna lauseke: ")

while True:
    mjono = input("Anna merkkijono: ")
    if mjono == "":
        break
    if re.search(lauseke, mjono):
        print("Osuma!")
    else:
        print("Ei osumaa.")
```

### Vaihtoehtoiset alijonot

Pystyviivalla voidaan erottaa vaihtoehtoisia osajonoja. Esimerkiksi lauseke `911|112` täsmää merkkijonoihin, joista löytyy joko osajono `911` tai osajono `112`.

Esimerkiksi

<sample-output>

Anna lauseke: aa|ee|ii
Anna testijono: saapas
Osuma!
Anna testijono: teema
Osuma!
Anna testijono: iilimato
Osuma!
Anna testijono: ooppera
Ei osumaa.
Anna testijono: uuttera
Ei osumaa.

</sample-output>


### Merkkijoukot

Hakasulkeiden väliin voidaan merkitä joukko hyväksyttyjä merkkejä. Esimerkiksi merkintä `[aeio]` täsmää jonoihin, joista löytyy jokin merkeistä a, e, i, tai o. Merkintätapa sallii myös väliviivan käytön. Merkintä `[0-68a-d]` hyväksyy jonot, joista löytyy numero nollasta kuuteen, kahdeksikko tai merkki väliltä a...d. Merkintä `[1-3][0-9]` hyväksyy kaksinumeroiset luvut väliltä 10...39.

Esimerkiksi:

<sample-output>

Anna lauseke: [C-FRSÖ]
Anna testijono: C
Osuma!
Anna testijono: E
Osuma!
Anna testijono: G
Ei osumaa.
Anna testijono: R
Osuma!
Anna testijono: Ö
Osuma!
Anna testijono: T
Ei osumaa.

</sample-output>

### Toistaminen

Lausekkeen osaa voidaan toistaa esimerkiksi seuraavien operaattorien avulla:

* `*` toistaa osaa minkä tahansa määrän kertoja (myös nolla)
* `+` toistaa osaa minkä tahansa määrän kertoja (ainakin yhden)
* `{m}` toistaa osaa täsmälleen `m` kertaa

Operaattorit viittaavat niitä edeltävään lausekkeen osaan. Esimerkiksi lauseke `ba+b` hyväksyy esimerkiksi osajonot `bab`, `baab` ja `baaaaaaaaaaab`. Lauseke `A[BCDE]*Z` puolestaan hyväksyy esimerkiksi osajonot `AZ`, `ADZ` tai `ABCDEBCDEBCDEZ`.

Esimerkiksi:

<sample-output>

Anna lauseke: 1[234]*5
Anna testijono: 15
Osuma!
Anna testijono: 125
Osuma!
Anna testijono: 145
Osuma!
Anna testijono: 12342345
Osuma!
Anna testijono: 126
Ei osumaa.
Anna testijono: 165
Ei osumaa.

</sample-output>


### Muita erikoismerkkejä

Pisteellä merkitään mitä tahansa yksittäistä merkkiä. Niinpä merkintä `c...o` vastaa esimerkiksi merkkijonoja `c-3po` tai `combo`. Merkillä `^` voidaan määritellä, että osuman pitää löytyä merkkijonon alusta, ja vastaavasti merkillä `$`, että sen on oltava lopussa. Näillä voidaan näppärästi myös rajata sääntö koskemaan vain annettuja merkkejä:

<sample-output>

Anna lauseke: \^[123]*$
Anna testijono: 4
Ei osumaa.
Anna testijono: 1221
Osuma!
Anna testijono: 333333333
Osuma!

</sample-output>

Kenoviivaa voidaan käyttää etsimään erikoismerkkejä. Merkintä `1+` tarkoitaa yhtä tai useampaa ykköstä, mutta merkintä `1\+` merkkijonoa `1+`.

Esimerkiksi

<sample-output>

Anna lauseke: ^\*
Anna testijono: moi*
Ei osumaa.
Anna testijono: m*o*i
Ei osumaa.
Anna testijono: *moi
Osuma!

</sample-output>

Kaarisulkeilla voidaan ryhmitellä lausekkeen osia. Esimerkiksi lauseke `(ab)+c` hyväksyy jonot `abc`, `ababc` ja `ababababababc`, mutta ei esimerkiksi jonoja `ac` tai `bc`.

Esimerkiksi

<sample-output>

Anna lauseke: ^(jabba).*(hut)$
Anna testijono: jabba the hut
Osuma!
Anna testijono: jabba a hut
Osuma!
Anna testijono: jarmo the hut
Ei osumaa.
Anna testijono: jabba the smut
Ei osumaa.

</sample-output>

<programming-exercise name='Regular expressions' tmcname='part12-14_regular_expressions'>

Let's practice regular expressions a little.

## Days of the week

Using a regular expression, please write a function named `is_dotw(my_string: str)`. The function should return `True` if the string passed as an argument contains an abbreviation for a day of the week (Mon, Tue, Wed, Thu, Fri, Sat, Sun).

Some examples of how the function should work:

```python
print(is_dotw("Mon"))
print(is_dotw("Fri"))
print(is_dotw("Tui"))
```

<sample-output>

True
True
False

</sample-output>

## Check for vowels

Please write a function named `all_vowels(my_string: str)` which uses a regular expression to check whether all characters in the given string are vowels.

Some examples of how the function should work:

```python
print(all_vowels("eioueioieoieouyyyy"))
print(all_vowels("autoooo"))
```

<sample-output>

True
False

</sample-output>

## Time of day

Please write a function named `time_of_day(my_string: str)` which uses a regular expression to check whether a string in the format `XX:YY:ZZ` is a valid time in the 24-hour format, with two digits each for hours, minutes and seconds.

Some examples of how the function should work:

```python
print(time_of_day("12:43:01"))
print(time_of_day("AB:01:CD"))
print(time_of_day("17:59:59"))
print(time_of_day("33:66:77"))
```

<sample-output>

True
False
True
False

</sample-output>

</programming-exercise>

## Grand finale

To finish off this part of the material let's work some more on objects by building a slightly more extensive program. This exercise does not necessarily involve regular expressions, but the sections on [functions as arguments](/part-12/1-functions-as-arguments) and [list comprehensions](/part-11/1-list-comprehensions) will likely be useful.

You may also find the example set in [part 10](/part-10/4-application-development) helpful.

<programming-exercise name='Hockey statistics' tmcname='part12-15_hockey_statistics'>

In this exercise you will build an application for examining hockey league statistics from the NHL in a couple of different ways. 

The exercise template contains two JSON files: `partial.json` ja `all.json`. The first of these is mostly meant for testing. The latter contains a lot of data, as all the NHL player stats for the 2019-20 season are included in the file.

The entry for a single player is in the following format:

```json
{
    "name": "Patrik Laine",
    "nationality": "FIN",
    "assists": 35,
    "goals": 28,
    "penalties": 22,
    "team": "WPG",
    "games": 68
}
```

Both files contain a list of entries in the above format.

If you need a refresher on handling JSON files, please take a look at [part 7 of this course material](/part-7/4-data-processing#reading-json-files).

## Search and list

Please write an interactive application which first asks for the name of the file, and then offers the following functions:

- search by name for a single player's stats
- list all the abbreviations for team names in alphabetical order
- list all the abbreviations for countries in alphabetical order

These functionalities grant you one exercise point. Your application should now work as follows:

<sample-output>

file name: **partial.json**
read the data for 14 players

commands:
0 quit
1 search for player
2 teams
3 countries
4 players in team
5 players from country
6 most points
7 most goals

command: **1**
name: **Travis Zajac**
<pre>
Travis Zajac         NJD   9 + 16 =  25
</pre>

command: **2**
BUF
CGY
DAL
NJD
NYI
OTT
PIT
WPG
WSH

command: **3**
CAN
CHE
CZE
SWE
USA

command: **0**

</sample-output>

NB: the printout format for a player must be exactly as follows:

<sample-output>

<pre>
Leon Draisaitl       EDM  43 + 67 = 110
Connor McDavid       EDM  34 + 63 =  97
Travis Zajac         NJD   9 + 16 =  25
Mike Green           EDM   3 +  8 =  11
Markus Granlund      EDM   3 +  1 =   4
123456789012345678901234567890123456789
</pre>

</sample-output>

The last line in the sample above is there to help you calculate the widths of the different fields in the output; you should not print the numbers line yourself in your final submission. The abbreviation for the team is printed from the 22nd character onwards. The `+` sign is the 30th character and the `=` sign is the 35th character. All the fields should be justified to the right edge. All whitespace is space characters.

F-strings are probably the easiest way to achieve the required printout. The process is similar to [this exercise](/part-6/1-reading-files#programming-exercise-course-grading-part-3) from part 6.

## List players by points

These two functionalities will grant you a second exercise point:

- list players in a specific team in the order of points they've scored. Points equals _goals_ + _assists_
- list players from a specific country in the order of points they've scored

Your application should now work as follows:

<sample-output>

file name: **partial.json**
read the data for 14 players

commands:
0 quit
1 search for player
2 teams
3 countries
4 players in team
5 players from country
6 most points
7 most goals

command: **4**
team: **OTT**
<pre>
Drake Batherson      OTT   3 +  7 =  10
Jonathan Davidsson   OTT   0 +  1 =   1
</pre>

command: **5**
country: **CAN**
<pre>
Jared McCann         PIT  14 + 21 =  35
Travis Zajac         NJD   9 + 16 =  25
Taylor Fedun         DAL   2 +  7 =   9
Mark Jankowski       CGY   5 +  2 =   7
Logan Shaw           WPG   3 +  2 =   5
</pre>

command: **0**

</sample-output>

## Most successful players

These two functionalities will grant you the third exercise point:

- list of `n` players who've scored the most points
  - if two players have the same score, whichever has scored the higher number of goals comes first
- list of `n` players who've scored the most goals
  - if two players have the same number of goals, whichever has played the lower number of games comes first

Your application should now work as follows:

<sample-output>

file name: **partial.json**
read the data for 14 players

commands:
0 quit
1 search for player
2 teams
3 countries
4 players in team
5 players from country
6 most points
7 most goals

command: **6**
how many: **2**
<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
</pre>

command: **6**
how many: **5**

<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
John Klingberg       DAL   6 + 26 =  32
Travis Zajac         NJD   9 + 16 =  25
Conor Sheary         BUF  10 + 13 =  23
</pre>

command: **7**
how many: **6**

<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
Conor Sheary         BUF  10 + 13 =  23
Travis Zajac         NJD   9 + 16 =  25
John Klingberg       DAL   6 + 26 =  32
Mark Jankowski       CGY   5 +  2 =   7
</pre>

command: **0**

</sample-output>

</programming-exercise>

Please respond to a quick questionnaire on this part of the course.

<quiz id="06c5ee2a-a3ed-5151-8452-36425d591350"></quiz>


