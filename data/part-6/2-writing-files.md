---
path: '/part-6/2-writing-files'
title: 'Writing files'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Osaat luoda itse tiedoston Pythonilla
- Osaat kirjoittaa tekstimuotoista tietoa tiedostoon
- Osaat kirjoittaa CSV-muotoisen tiedoston omasta datastasi

</text-box>

Tiedoston lukemisen lisäksi voimme luonnollisesti myös kirjoittaa tiedostoon tietoa. Tyypillinen esimerkki on ohjelman tulosten tallentaminen tiedostoon, jotta niitä voidaan käyttää myös myöhemmin tai muokata edelleen jollain toisella ohjelmalla.

Tiedoston kirjoittamisessa voimme joko luoda uuden tiedoston tai lisätä tietoa olemassa olevan tiedoston vanhan tiedon perään. Molemmissa tapauksissa käytetään edellisestä osasta tuttua `open`-funktiota, mutta kirjoittamista varten funktiolle annetaan toinen parametri.

## Uuden tiedoston luominen

Uusi tiedosto luodaan antamalla `open`-funktiolle tiedoston nimen lisäksi avaustilaksi `w` (tulee sanasta "write"). Esimerkiksi

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    # tiedostoon kirjoittaminen
```

Huomaa, että **mikäli tiedosto on jo olemassa, kaikki sen sisältö ylikirjoitetaan**. Ole siis erittäin huolellinen uusia tiedostoja luodessasi.

Kun tiedosto on avattu, sinne voidaan kirjoittaa tietoa. Kirjoittaminen tapahtuu metodilla `write`, joka saa parametrikseen kirjoitettavan merkkijonon.

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!")
```

Ohjelman suorittamisen jälkeen samaan hakemistoon ilmestyy tiedosto `uusi_tiedosto.txt`, jonka sisältö näyttää tältä:

<sample-data>

Moi kaikki!

</sample-data>

Huomaa, että jos tiedostoon halutaan rivinvaihtoja, ne täytyy lisätä tekstiin itse. Esimerkiksi ohjelma

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!")
    tiedosto.write("Toinen rivi")
    tiedosto.write("Viimeinen rivi")
```

tuottaa seuraavanlaisen tiedoston:

<sample-data>

Moi kaikki!Toinen riviViimeinen rivi

</sample-data>

Tulostukset saadaan omille riveilleen lisäämällä rivien loppuun rivivaihtomerkki `\n`:

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!\n")
    tiedosto.write("Toinen rivi\n")
    tiedosto.write("Viimeinen rivi\n")
```

Nyt tiedosto `uusi_tiedosto.txt` näyttää tältä:

<sample-data>

Moi kaikki!
Toinen rivi
Viimeinen rivi

</sample-data>

<programming-exercise name='Inscription' tmcname='part06-10_inscription'>

Please write a program which asks for the name of the user and then creates an "inscription" in a file specified by the user. Please see the example below.

<sample-output>

Whom should I sign this to: **Ada**
Where shall I save it: **inscribed.txt**

</sample-output>

The contents of the file `inscribed.txt` would be

<sample-data>

Hi Ada, we hope you enjoy learning Python with us! Best, Mooc.fi Team

</sample-data>

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within an `if __name__ == "__main__"` block.

</programming-exercise>

## Tiedon lisääminen olemassaolevaan tiedostoon

Jos haluamme lisätä tietoa olemassa olevaan tiedostoon, voimme avata tiedoston tilassa `a` (lyhenne sanasta "append"). Tällöin tiedoston nykyistä sisältöä ei pyyhitä, vaan uusi tieto kirjoitetaan tiedoston loppuun.

Jos tiedostoa ei ole olemassa, tila `a` toimii samalla tavalla kuin tila `w`.

Seuraava ohjelma avaa edellisen esimerkin tuottaman tiedoston `uusi_tiedosto.txt` ja lisää sen perään pari riviä tekstiä:

```python
with open("uusi_tiedosto.txt", "a") as tiedosto:
    tiedosto.write("Rivi numero 4\n")
    tiedosto.write("Ja taas yksi.\n")
```

Ohjelman suorituksen jälkeen tiedosto näyttää tältä:

<sample-output>

Moi kaikki!
Toinen rivi
Viimeinen rivi
Rivi numero 4
Ja taas yksi.

</sample-output>

Tiedon lisääminen tiedostoon on kuitenkin suhteellisen harvoin tarvittava operaatio.

Tiedostoon lisäämisen sijaan on usein yksinkertaisinta kirjoittaa tiedosto kokonaan uudelleen. Näin joudutaan useimmiten tekemään jos esimerkiksi tiedoston sisältö muuttuu keskeltä tiedostoa.

<programming-exercise name='Diary' tmcname='part06-11_diary'>

Please write a program which works as a simply diary. The diary entries should be saved in the file `diary.txt`. When the program is executed, it should first read any entries already in the file.

NB: the automatic tests for this exercise will change the contents of the file. If you want to keep its contents, first make a copy of the file under a different name.

The program should work as follows:

<sample-output>

1 - add an entry, 2 - read entries, 0 - quit
Function: **1**
Diary entry: **Today I ate porridge**
Diary saved

1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
1 - add an entry, 2 - read entries, 0 - quit
Function: **1**
Diary entry: **I went to the sauna in the evening**
Diary saved

1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
I went to the sauna in the evening
1 - add an entry, 2 - read entries, 0 - quit
Function: **0**
Bye now!

</sample-output>

When the program is executed for the second time, this should happen:

<sample-output>

1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
I went to the sauna in the evening
1 - add an entry, 2 - read entries, 0 - quit
Function: **0**
Bye now!

</sample-output>

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within an `if __name__ == "__main__"` block.

</programming-exercise>

## CSV-tiedoston kirjoittaminen

CSV-tiedoston voi kirjoittaa rivi riviltä `write`-metodilla. Esimerkiksi seuraava esimerkki luo tiedoston `koodarit.csv`, jonka jokaisella rivillä on koodarin nimi, työympäristö, lempikieli ja kokemus vuosissa. Tiedot on erotettu puolipisteillä.

```python
with open("koodarit.csv", "w") as tiedosto:
    tiedosto.write("Erkki;Windows;Pascal;10\n")
    tiedosto.write("Matti;Linux;PHP;2\n")
    tiedosto.write("Antti;Linux;Java;17\n")
    tiedosto.write("Emilia;Mac;Cobol;9\n")
```

Tämän tuloksena on seuraava tiedosto:

<sample-output>

Erkki;Windows;Pascal;10
Matti;Linux;PHP;2
Antti;Linux;Java;17
Emilia;Mac;Cobol;9

</sample-output>

Tarkastellaan sitten tilannetta, jossa tiedostoon kirjoitettavat tiedot ovatkin muistissa listoina:

```python
koodarit = []
koodarit.append(["Erkki", "Windows", "Pascal", 10])
koodarit.append(["Matti", "Linux", "PHP", 2])
koodarit.append(["Antti", "Linux", "Java", 17])
koodarit.append(["Emilia", "Mac", "Cobol", 9])
```

Nyt voimme kirjoittaa koodarien tiedot CSV-tiedostoon näin:

```python
with open("koodarit.csv", "w") as tiedosto:
    for koodari in koodarit:
        rivi = f"{koodari[0]};{koodari[1]};{koodari[2]};{koodari[3]}"
        tiedosto.write(rivi+"\n")
```

Jos koodaria kuvaavissa listoissa olisi suuri määrä alkioita, olisi csv-tiedostoon kirjoitetavien rivien muodostaminen yllä olevalla tekniikalla työläähköä, ja rivit kannattaisikin koota silmukan avulla:

```python
with open("koodarit.csv", "w") as tiedosto:
    for koodari in koodarit:
        rivi = ""
        for arvo in koodari:
            rivi += f"{arvo};"
        rivi = rivi[:-1]
        tiedosto.write(rivi+"\n")
```

## Tiedoston tyhjentäminen ja poisto

Joissain tilanteissa ohjelmassa on tarvetta tyhjentää olemassaolevan tiedoston sisältö. Tämä onnistuu avaamalla tiedosto kirjoitustilassa "w" ja sulkemalla tiedosto välittömästi:

```python
with open("tyhjennettava_tiedosto.txt", "w") as tiedosto:
    pass
```

Nyt `with`-lohkossa on ainoastaan komento `pass`, joka ei tee mitään. Komento tarvitaan, sillä Python ei salli sellaisia lohkoja missä ei ole mitään komentoja.

Tiedoston tyhjennys on mahdollista tehdä myös ilman `with`-lohkokon käyttöä:

```python
open('tyhjennettava_tiedosto.txt', 'w').close()
```

<text-box variant='hint' name='Tiedoston poistaminen'>

Tiedosto voidaan myös poistaa kokonaan. Poisto tapahtuu seuraavasti:

```python
# poisto-komento tuodaan koodin käyttöön import-lauseella
import os

os.remove("tarpeeton_tiedosto.csv")
```

Tämä ei kuitenkaan teknisten rajoitteiden takia toimi palvelimella suoritettavissa testeissä, joten käytä ylläolevia tapoja jos joudut tehtävissä tyhjentämään tiedoston.

</text-box>


<programming-exercise name='Filtering the contents of a file' tmcname='part06-12_filtering_file_contents'>

The file `solutions.csv` contains some solutions to mathematics problems:

```csv
Arto;2+5;7
Pekka;3-2;1
Erkki;9+3;11
Arto;8-3;4
Pekka;5+5;10
...jne...
```

As you can see above, on each line the format is `name_of_student;problem;result`. All the operations are either addition or subtraction, and each has exactly two operands.

Please write a function named `filter_solutions()` which

* Reads the contents of the file `solutions.csv`
* writes those lines which have a _correct_ result into the file `correct.csv`
* writes those lines which have an _incorrect_ result into the file `incorrect.csv`

Using the example above, the file `correct.csv` would contain the lines 

```sh
Arto;2+5;7
Pekka;3-2;1
Pekka;5+5;10
```

The other two would be in the file `incorrect.csv`.

Please write the lines in the same order as they appear in the original file. Do not change the original file.

NB: the function should have the exact same result, no matter how many times it is called. That is, it shouldn't matter if the function is called once

```python
filter_solutions()
```

or multiple times in a row

```python
filter_solutions()
filter_solutions()
filter_solutions()
filter_solutions()
```

After the execution, the contents of the files `correct.csv` and `incorrect.csv` should be exactly the same in either case.

</programming-exercise>

<programming-exercise name='Store personal data' tmcname='part06-13_store_personal_data'>

Please write a function named `store_personal_data(person: tuple)`, which takes a tuple containing some identifying information as its argument.

The tuple contains the following elements:

* Name (string)
* Age (integer)
* Height (float)

This should be processed and written into the file `people.csv`. The file may already contain some data; the new entry goes to the end of the file. The data should be written in the format

name;age;height

Each entry should be on a separate line. If we call the function with the argument `("Paul Paulson", 37, 175.5)`, the function should write this line to the end of the file:

`Paul Paulson;37;175.5`

</programming-exercise>

## Tiedon käsittely CSV:nä

Tehdään vielä lopuksi ohjelma, joka lukee CSV-tiedostosta opiskelijoiden viikoittaiset kurssipistemäärät ja laskee näiden avulla kurssin arvosanan. Lopuksi ohjelma luo CSV-tiedoston, josta selviää opiskelijan yhteispistemäärä sekä arvosana

Ohjelman lukema CSV-tiedosto näyttää seuraavalta:

<sample-data>

Pekka;4;2;3;5;4;0;0
Paula;7;2;8;3;5;4;5
Pirjo;3;4;3;5;3;4;4
Emilia;6;6;5;5;0;4;8

</sample-data>

Ohjelman logiikka on jaettu kolmeen funktioon. Tiedoston lukeminen tapahtuu samaan tapaan kuin edellisessä aliluvussa: tiedot talletetaan sanakirjaan, jossa avaimena on opiskelijan nimi ja arvona lista viikkopisteistä:

```python
def lue_viikkopisteet(tiedostonimi):
    viikkopisteet = {}
    with open(tiedostonimi) as tiedosto:
        for rivi in tiedosto:
            osat = rivi.split(";")
            lista = []
            for pisteet in osat[1:]:
                lista.append(int(pisteet))
            viikkopisteet[osat[0]] = lista

    return viikkopisteet
```

Arvosanojen laskemista varten on tehty oma funktionsa, jota tiedostoon kirjoittava funktio hyödyntää:

```python
def arvosana(pisteet):
    if pisteet < 20:
        return 0
    elif pisteet < 25:
        return 1
    elif pisteet < 30:
        return 2
    elif pisteet < 35:
        return 3
    elif pisteet < 40:
        return 4
    else:
        return 5

def tallenna_tulokset(tiedostonimi, viikkopisteet):
    with open(tiedostonimi, "w") as tiedosto:
        for nimi, lista in viikkopisteet.items():
            summa = sum(lista)
            tiedosto.write(f"{nimi};{summa};{arvosana(summa)}\n")
```

Itse "pääohjelma" on nyt hyvin yksinkertainen. Huomaa, että luettavan ja kirjoitettavan tiedoston nimet annetaan funktioille parametrina:

```python
viikkopisteet = lue_viikkopisteet("viikkopisteet.csv")
tallenna_tulokset("tulokset.csv", viikkopisteet)
```

Suorituksen tuloksena oleva CSV-tiedosto näyttää seuraavalta:

<sample-data>

Pekka;18;0
Paula;34;3
Pirjo;26;2
Emilia;41;5

</sample-data>

Huomaa, miten ohjelma on koostettu suhteellisen yksinkertaisista, vain yhteen asiaan keskittyvistä funktioista. Tämä on yleisesti ottaen suositeltava tapa ohjelmoinnissa, se helpottaa ohjelman toiminnallisuuden varmistamista sekä myöhemmin ohjelmaan tehtävien muutosten sekä laajennusten tekemistä.

Jos esimerkiksi haluaisimme ohjelmaan toiminnallisuuden, joka tulostaa yhden opiskelijan arvosanan, olisi toiminnallisuus helppo koostaa käyttäen apuna jo valmiina olevaa arvosanan laskevaa funktiota:

```python
def hae_arvosana(haettava, viikkopisteet):
    for nimi, lista in viikkopisteet.items():
        if nimi == haettava:
            return arvosana(sum(lista))


viikkopisteet = lue_viikkopisteet("viikkopisteet.csv")
print(hae_arvosana("Paula", viikkopisteet))

```

<sample-data>

3

</sample-data>

Jos ohjelmasta halutaan muuttaa tai korjata "yhtä asiaa", esimerkiksi arvosanojen pisterajoja, kohdistuu muokkaus hyvin rakennetussa ohjelmassa ainoastaan yhteen tai muutamaan funktioon. Jos sama logiikka, esimerkiksi arvosanan laskeminen, olisi kopioitu useaan paikkaan, kasvaisi riski, että muutoksia ei muistettaisi tehdä kaikkiin oikeisiin paikkoihin.

<programming-exercise name='Course grading, part 4' tmcname='part06-14_course_grading_part_4'>

Let's revisit the course grading project from the previous section. 

As we left if last time, the program read and processed files containing student information, completed exercises and exam results. We'll add a file containing information about the course. An example of the format of the file:

<sample-data>

<pre>

name: Introduction to Programming
study credits: 5
</pre>

</sample-data>

The program should then create two files. There should be a file called `results.txt` with the following contents:

<sample-data>

<pre>
Introduction to Programming, 5 credits
======================================
name                          exercises exer_p    exam_p    total_p   grade
pekka peloton                 21        5         9         14        0
jaana javanainen              27        6         11        17        1
liisa virtanen                35        8         14        22        3
</pre>

</sample-data>

The statistics section is identical to the results printed out in part 3 of the project. The only addition here is the header section. 

Additionally, there should be a file called `results.csv` with the following format:

<sample-data>

<pre>
12345678;pekka peloton;0
12345687;jaana javanainen;1
12345699;liisa virtanen;3
</pre>

</sample-data>

When the program is executed, it should look like this:

<sample-output>

Student information: **students1.csv**
Exercises completed: **exercises1.csv**
Exam points: **exam_points1.csv**
Course information: **course1.txt**
Results written to files results.txt and results.csv

</sample-output>

That is, the program only asks for the names of the input files. All output should be written to the files. The user will only see a message confirming this.

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within an `if __name__ == "__main__"` block.

</programming-exercise>



<programming-exercise name='Word search' tmcname='part06-15_word_search'>

The exercise template includes the file `words.txt`, which contains words in English.

Please write a function named `find_words(search_term: str)`. It should return a list containing all the words in the file which match the search term.

The search term may include lowercase letters and the following wildcard characters:

* A dot `.` means that any single character is acceptable in its place. For example, `ca.` would yield words like _cat_ and _car_, `p.ng` would yield words like _ping_ and _pong_, and `.a.e` would yield words like _sane_, _care_ and _late_.
* An asterisk `*` at the _end_ of the search term means that any word which _begins_ with the search term is acceptable. An asterisk at the _beginning_ of the search term means that any word which _ends_ with the search term is acceptable. For example, `ca*` would yield words like _california_, _cat_, _caring_ and _catapult_, while `*ane` would yield words like _crane_, _insane_ and _aeroplane_. There can only ever be a single asterisk in the search term.
* If there are no wildcard characters in the search term, only words which match the search term exactly are returned. 

You may assume both wildcards are never used in the same search term.

The words in the file are all written in lowercase. You may also assume the argument to the function will be in lowercase entirely.

If no matching words are found, the function should return an empty list.

Hint: the Pythons string methods `startswith()` and `endswith()` may be useful here. You can search for more information about them online.

An example of the function in action:

```python
print(find_words("*vokes"))
```

<sample-output>

['convokes', 'equivokes', 'evokes', 'invokes', 'provokes', 'reinvokes', 'revokes']

</sample-output>

</programming-exercise>

<programming-exercise name='Muistava sanakirja' tmcname='part06-16_muistava_sanakirja'>

Please write a program which functions as a dictionary. The user can type in new entries or look for existing entries.

The program should work as follows:

<sample-output>

1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **auto**
The word in English: **car**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **roska**
The word in English: **garbage**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **laukku**
The word in English: **bag**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **bag**
roska - garbage
laukku - bag
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **car**
auto - car
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **laukku**
laukku - bag
1 - Add word, 2 - Search, 3 - Quit
Function: **3**
Bye!

</sample-output>

The dictionary entries should be written to a file called `dictionary.txt`. The program should first read the contents of the file. New entries are written to the end of the file whenever they are added to the dictionary.

The format of the data stored in the dictionary is up to you.

NB: the automatic tests for this exercise may change the contents of the file. If you want to keep its contents, first make a copy of the file under a different name.

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within an `if __name__ == "__main__"` block.


</programming-exercise>

<!---
A quiz to review the contents of this section:

<quiz id="69694e01-4c47-5b9d-8a00-b0d96a477dc7"></quiz>
-->
