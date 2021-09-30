---
path: '/part-6/1-reading-files'
title: 'Reading files'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, miten tiedoston sisällön voi lukea Pythonissa
- Tiedät, mitä ovat tekstitiedosto ja CSV-tiedosto
- Osaat purkaa ja käsitellä CSV-tiedoston sisällön ohjelmassa

</text-box>

<!--the same text is in sections 3-1, 5-1 and 6-1, check them all if you're changing this-->
<text-box variant='hint' name="About the exercises on this course">

Becoming a proficient programmer requires a lot of practice, sometimes even quite mechanical practice. It also involves developing problem solving skills and applying intuition. This is why there are a lot of exercises of different kinds on this course. Some of them ask you to quite straightforwardly apply what you have learnt in the material, but some of them are intentionally more challenging and open-ended.

Some of the exercises might at first seem overwhelming, but this is nothing to worry about. None of the exercises is strictly mandatory, and in fact _only 25 % of the points in each part is required to pass the course._ You can find more details about passing the course on the [page on grading](/grading-and-exams).

**The exercises are not in any specific order of difficulty.** Each section usually introduces some new programming concepts, and these are then practised with both simpler and more complicated exercises. **If you come across an exercise that feels too difficult, move on to the next one.** You can always come back to the more difficult exercises if you have time later.

When the going inevitably gets tough, a word of consolation: a task that seems impossibly difficult this week will likely feel rather easy in about four weeks' time.

</text-box>

Yksi tavallinen ohjelmoinnin käyttötarkoitus on käsitellä tiedostoissa olevaa tietoa. Ohjelmat voivat lukea tietoa tiedostoista ja tallentaa tuloksia tiedostoihin. Tiedostojen avulla voimme käsitellä suuriakin aineistoja helposti automaattisesti.

Oletamme tällä kurssilla, että käsiteltävät tiedostot ovat _tekstitiedostoja_ eli ne muodostuvat riveistä, joilla on tekstiä. Esimerkiksi kurssilla käytetty Visual Studio Code -editori käsittelee tekstitiedostoja. Huomaa, että esimerkiksi Word-dokumentti ei ole tekstitiedosto, vaan siinä on tekstin lisäksi muotoilutietoja ja sen käsittely ohjelmallisesti olisi vaikeaa.

## Tiedostosta lukeminen

Käytetään esimerkkinä tiedostoa `esimerkki.txt`, jonka sisältönä on:

<sample-data>

Moi kaikki!
Esimerkkitiedostomme on kolmerivinen.
Viimeinen rivi.

</sample-data>

Hyvä tapa käsitellä tiedostoja Pythonissa on käyttää `with`-lausetta, jonka alkurivi avaa tiedoston. Tämän jälkeen tulee lohko, jonka sisällä tiedostoa voi käsitellä. Lohkon jälkeen tiedosto sulkeutuu automaattisesti, eikä sitä voi enää käsitellä.

Esimerkiksi seuraava koodi lukee ja tulostaa tiedoston sisällön:

```python
with open("esimerkki.txt") as tiedosto:
    sisalto = tiedosto.read()
    print(sisalto)
```

<sample-output>

Moi kaikki!
Esimerkkitiedostomme on kolmerivinen.
Viimeinen rivi.

</sample-output>

Koodissa muuttuja `tiedosto` on _tiedostokahva_, jonka kautta tiedostoa voi käsitellä avaamisen jälkeen. Tässä tapauksessa käytämme metodia `read`, joka palauttaa koko tiedoston sisällön yhtenä merkkijonona. Tässä tapauksessa palautettu merkkijono on seuraava:

```
"Moi kaikki!\nEsimerkkitiedostomme on kolmerivinen.\nViimeinen rivi."
```

## Tiedoston sisällön läpikäynti

Metodi `read` on näppärä, jos halutaan esimerkiksi tulostaa tiedoston sisältö kokonaisuudessaan ruudulle. Usein haluamme kuitenkin käsitellä tiedostoa rivi kerrallaan.

Voimme käyttää tiedoston sisällön lukemiseen `for`-silmukkaa, joka käy läpi tiedoston rivit yksi kerrallaan – siis samaan tapaan kuin esimerkiksi listan läpikäynnissä.

Seuraava esimerkki lukee saman tiedoston nyt käyttäen `for`-silmukkaa, poistaa joka rivin perästä rivinvaihdon ja laskee rivien yhteispituuden:

```python
with open("esimerkki.txt") as tiedosto:
    laskuri = 0
    yhteispituus = 0

    for rivi in tiedosto:
        rivi = rivi.replace("\n", "")
        laskuri += 1
        print("Rivi", laskuri, rivi)
        pituus = len(rivi)
        yhteispituus += pituus

print("Rivien yhteispituus:", yhteispituus)
```

<sample-output>

Rivi 1 Moi kaikki!
Rivi 2 Esimerkkitiedostomme on kolmerivinen.
Rivi 3 Viimeinen rivi.
Rivien yhteispituus: 63

</sample-output>

Huomaa, että rivien läpikäynnissä jokaisen rivin perässä on rivinvaihto `\n`. Yllä oleva koodi kuitenkin poistaa rivinvaihdot `replace`-funktiolla, joka korvaa rivinvaihdot tyhjillä merkkijonoilla. Tämän ansiosta tulostukseen ei tule ylimääräisiä rivivaihtoja ja ohjelma laskee oikein tiedoston rivien yhteispituuden.

<programming-exercise name='Largest number' tmcname='part06-01_largest_number'>

The file `numbers.txt` contains integer numbers, one number per line. The contents could look like this:

```sh
2
45
108
3
-10
1100
...etc...
```

Please write a function named `largest`, which reads the file and returns the largest number in the file.

Notice that the function does not take any arguments. The file you are working with is always named `numbers.txt`.

**NB:** If Visual Studio Code can't find the file and you have checked that there are no spelling errors, take a look at the instructions following this exercise.

</programming-exercise>

## What if Visual Studio Code cannot find my file?

Jos VS Code ei löydä tiedostoa suorittaessasi koodia (vihreää nappia painamalla) vaikka olet tarkastanut tiedoston nimen kirjoitusasun, voit kokeilla seuraavaa:

* Mene asetuksiin valikosta _File_ -> _Preferences_ -> _Settings_
* Etsi muutettava kohta hakusanalla "executeinfile"
* Valitse välilehti _Workspace_
* Laita raksi kohtaan _Python_ -> _Terminal_ -> _Execute In File Dir_

Oikein tehtynä asetus näyttää suunilleen seuraavalta:

<img src="6_1_1.png">

Jos edellinenkään ei toimi, voit kopioida kansiossa _src_ olevan testaukseen käytetyn tiedoston sisällön

<img src="6_1_2.png">

suoraan tehtäväkansion alle

<img src="6_1_3.png">

## Tiedostoja lukevan koodin debuggaus

Jos yrität käyttää VS Coden [debuggeria](/osa-4/1-vscode#debuggeri) tiedostoja lukevan koodin suorittamiseen, törmäät ikävään virheilmoitukseen:

<img src="6_1_4.png">

Syynä tälle on se, että debuggeri etsii tiedostoja tehtäväkansion juuresta eikä edes _Execute In File Dir_ -asetus ei asiaa muuta. Helpoin ratkaisu ongelmaan on edellisessä luvussa kuvattu testaukseen käytetyn tiedoston kopioiminen  tehtävähakemiston juureen.

Kun olet kopioinut tiedostot tehtävähakemiston juureen, joudut ehkä vielä käynnistämään visual studio coden uudelleen jotta kaikki toimisi.

## CSV-tiedoston lukeminen

CSV-tiedosto (_Comma Separated Values_) on tekstitiedosto, jonka jokaisella rivillä on tietyllä välimerkillä erotettua tietoa. Välimerkkinä on usein pilkku `,` tai puolipiste `;`, mutta mikä tahansa muukin merkki on periaatteessa mahdollinen.

CSV-tiedostoja käytetään usein erilaisten aineistojen esittämiseen. Myös Excelin ja muiden vastaavien ohjelmien taulukot voidaan tallentaa CSV-muodossa, jolloin niitä on helppo käsitellä muilla ohjelmilla.

Voimme lukea CSV-tiedoston rivit `for`-silmukalla, mutta miten erottaa rivillä olevat tiedot toisistaan? Helppo tapa on käyttää merkkijonojen `split`-metodia: metodille annetaan haluttu välimerkki, ja se palauttaa tiedot välimerkin mukaan eroteltuna listana merkkijonoja.

Esimerkki metodin käytöstä:

```python
teksti = "apina,banaani,cembalo"
sanat = teksti.split(",")
for sana in sanat:
    print(sana)
```

<sample-output>

apina
banaani
cembalo

</sample-output>

Tarkastellaan esimerkkinä tiedostoa `arvosanat.csv`, joka sisältää jokaisella rivillä aluksi opiskelijan nimen ja sen jälkeen tämän eri kursseista saamat arvosanat. Tiedot on erotettu toisistaan puolipisteillä.

<sample-data>

Pekka;5;4;5;3;4;5;5;4;2;4
Paula;3;4;2;4;4;2;3;1;3;3
Pirjo;4;5;5;4;5;5;4;5;4;4

</sample-data>

Seuraava ohjelma käy läpi tiedoston rivit, jakaa jokaisen rivin osiin ja näyttää opiskelijan nimen sekä arvosanat.

```python
with open("arvosanat.csv") as tiedosto:
    for rivi in tiedosto:
        rivi = rivi.replace("\n", "")
        osat = rivi.split(";")
        nimi = osat[0]
        arvosanat = osat[1:]
        print("Nimi:", nimi)
        print("Arvosanat:", arvosanat)
```

<sample-output>

Nimi: Pekka
Arvosanat: ['5', '4', '5', '3', '4', '5', '5', '4', '2', '4']
Nimi: Paula
Arvosanat: ['3', '4', '2', '4', '4', '2', '3', '1', '3', '3']
Nimi: Pirjo
Arvosanat: ['4', '5', '5', '4', '5', '5', '4', '5', '4', '4']

</sample-output>

<programming-exercise name='Fruit market' tmcname='part06-02_fruit_market'>

The file `fruits.csv` contains names of fruits, and their prices, in the format specified in this example:

```sh
banana;6.50
apple;4.95
orange;8.0
...etc...
```

Please write a function named `read_fruits`, which reads the file and returns a dictionary based on the contents. In the dictionary, the name of the fruit should be the key, and the value should be its price. Prices should be of type `float`.

NB: the function does not take any arguments. The file you are working with is always named `fruits.csv`.

</programming-exercise>

<programming-exercise name='Matrix' tmcname='part06-03_matrix'>

The file `matrix.txt` contains a matrix in the format specified in the example below:

```sh
1,0,2,8,2,1,3,2,5,2,2,2
9,2,4,5,2,4,2,4,1,10,4,2
...etc...
```

Please write two functions, named `matrix_sum` and `matrix_max`. Both go through the matrix in the file, and then return the sum of the elements or the element with the greatest value, as the names of the functions imply.

Please also write the function `row_sums`, which returns a list containing the sum of each row in the matrix. For example, calling `row_sums` when the matrix in the file is defined as

```sh
1,2,3
2,3,4
```

the function should return the list `[6, 9]`.

Hint: you can also include other helper functions in your program. It is very worthwhile to spend a moment considering which functionalities are shared by the three functions you are asked to write. Notice that the three functions named above do not take any arguments, but any helper functions you write may take arguments. The file you are working with is always named `matrix.txt`.

**NB:** If Visual Studio Code can't find the file and you have checked that there are no spelling errors, take a look at the instructions before this exercise.

</programming-exercise>

## Saman tiedoston lukeminen moneen kertaan

Joissain tilanteissa ohjelman on tarvetta lukea sama tiedosto useampaan kertaan. Tarkastellaan esimerkkinä seuraavaa ohjelmaa, joka käsittelee henkilötietoja sisältävää tiedostoa:

<sample-data>
Pekka;40;Helsinki
Emilia;34;Espoo
Erkki;42;Turku
Antti;100;Helsinki
Liisa;58;Suonenjoki
</sample-data>

```python
with open("henkilot.csv") as tiedosto:
    # tulostetaan nimet
    for rivi in tiedosto:
        osat = rivi.split(";")
        print("Nimi:", osat[0])

    # etsitään vanhin
    vanhimman_ika = -1
    for rivi in tiedosto:
        osat = rivi.split(";")
        nimi = osat[0]
        ika = int(osat[1])
        if ika > vanhimman_ika:
            vanhimman_ika = ika
            vanhin = nimi
    print("vanhin on", vanhin)
```

Ohjelma aiheuttaa erikoisen virheilmoituksen:

```python
Traceback (most recent call last):
    print("vanhin on"; vanhin)
UnboundLocalError: local variable 'vanhin' referenced before assignment
```

Syynä virheelle on se, että jälkimmäistä for-silmukkaa ei suoriteta ollenkaan, sillä tiedoston voi lukea vain kerran. Tämän jälkeen ollaan päästy "tiedoston loppuun", ja vaikka yritetään lukea tiedostosta lisää jälkimmäisessä silmukassa, tietoon ei päästä enää käsiksi.

Tiedosto onkin avattava uudelleen komennolla `open` toista lukukertaa varten:

```python
with open("henkilot.csv") as tiedosto:
    # tulostetaan nimet
    for rivi in tiedosto:
        osat = rivi.split(";")
        print("Nimi:", osat[0])

with open("henkilot.csv") as tiedosto:
    # etsitään vanhin
    vanhimman_ika = -1
    for rivi in tiedosto:
        osat = rivi.split(";")
        nimi = osat[0]
        ika = int(osat[1])
        if ika > vanhimman_ika:
            vanhimman_ika = ika
            vanhin = nimi
    print("vanhin on", vanhin)
```

Yleensä aina on kuitenkin parasta lukea tiedosto vain kerran ja tallentaa se muotoon, jota ohjelman toiminnallisuudet pystyvät hyödyntämään:

```python
henkilot = []
# luetaan tiedostosta henkilöt listaan
with open("henkilot.csv") as tiedosto:
    for rivi in tiedosto:
        osat = rivi.split(";")
        henkilot.append((osat[0], int(osat[1]), osat[2]))

# tulostetaan nimet
for henkilo in henkilot:
    print("Nimi:", henkilo[0])

# etsitään vanhin
vanhimman_ika = -1
for henkilo in henkilot:
    nimi = henkilo[0]
    ika = henkilo[1]
    if ika > vanhimman_ika:
        vanhimman_ika = ika
        vanhin = nimi
print("vanhin on", vanhin)
```

## Lisää CSV-tiedoston käsittelyä

Jatketaan opiskelijoiden arvosanoja sisältävän tiedoston `arvosanat.csv` käsittelyä. Tiedosto näyttää siis seuraavalta:

<sample-data>

Pekka;5;4;5;3;4;5;5;4;2;4
Paula;3;4;2;4;4;2;3;1;3;3
Pirjo;4;5;5;4;5;5;4;5;4;4

</sample-data>

Seuraava ohjelma luo tiedoston perusteella sanakirjan `arvosanat`, jossa jokainen avain on opiskelijan nimi ja vastaava arvo on lista arvosanoista. Ohjelma muuttaa arvosanat kokonaisluvuiksi, jotta niitä on mukavampaa käsitellä myöhemmin.

```python
arvosanat = {}
with open("arvosanat.csv") as tiedosto:
    for rivi in tiedosto:
        rivi = rivi.replace("\n", "")
        osat = rivi.split(";")
        nimi = osat[0]
        arvosanat[nimi] = []
        for arvosana in osat[1:]:
            arvosanat[nimi].append(int(arvosana))

print(arvosanat)
```

<sample-output>

{'Pekka': [5, 4, 5, 3, 4, 5, 5, 4, 2, 4], 'Paula': [3, 4, 2, 4, 4, 2, 3, 1, 3, 3], 'Pirjo': [4, 5, 5, 4, 5, 5, 4, 5, 4, 4]}

</sample-output>

Tämän jälkeen voimme vaikkapa tulostaa analyysin arvosanoista käymällä läpi sanakirjan `arvosanat` perusteella:

```python
for nimi, lista in arvosanat.items():
    paras = max(lista)
    keskiarvo = sum(lista) / len(lista)
    print(f"{nimi}: paras arvosana {paras}, keskiarvo {keskiarvo:.2f}")
```

<sample-output>

Pekka: paras arvosana 5, keskiarvo 4.10
Paula: paras arvosana 4, keskiarvo 2.90
Pirjo: paras arvosana 5, keskiarvo 4.50

</sample-output>

Kannattaa tutustua huolella esimerkkikoodiin. Se voi ensisilmäyksellä vaikuttaa monimutkaiselta, mutta ratkaisu on helposti sovellettavissa monenlaisiin datatiedostoihin.

## Eroon turhista riveistä, välilyönneistä ja rivinvaihdoista

Olemme tallentaneet Excelistä nimiä taulukon CSV-muodossa:

```sh
etunimi; sukunimi
Pekka; Python
Jaana; Java
Heikki; Haskell
```

Kuten tyypillistä, Excel on lisännyt sarakkeiden väliin erottimena toimivan puolipisteen lisäksi myös välilyönnin.

Haluamme tulostaa listalla olevat sukunimet. Koska ensimmäinen rivi kertoo sarakkeiden otsikot, ohitamme sen:

```python
sukunimet = []
with open("henkilot.csv") as tiedosto:
    for rivi in tiedosto:
        osat = rivi.split(";")
        # ohitetaan otsikkorivi
        if osat[0] == "etunimi":
            continue
        sukunimet.append(osat[1])

print(sukunimet)
```

Tulostus näyttää seuraavalta:

<sample-output>

[' Python\n', ' Java\n', ' Haskell']

</sample-output>

Kaikkiin paitsi viimeiseen rivin sukunimeen on jäänyt mukaan rivinvaihtomerkki, ja jokaisen sukunimen alkuun on jäänyt ikävä välilyönti.

Pääsisimme näistä eroon aiempien esimerkkien tapaan käyttämällä metodia `replace`, mutta parempi vaihtoehto tässä tilanteessa on käyttää metodia `strip`, joka poistaa merkkijonon alusta ja lopusta ns. whitespace-merkit, eli välilyönnit, rivinvaihdot ja muut normaalina merkkinä tulostumattomat merkit.

Kokeillaan metodin toimintaa konsolissa:

```python
>>> " koe ".strip()
'koe'
>>> "\n\ntesti\n".strip()
'testi'
>>>
```

Tarvittava muutos ohjelmaan on helppo:

```python
sukunimet = []
with open("henkilot.csv") as tiedosto:
    for rivi in tiedosto:
        osat = rivi.split(';')
        if osat[0] == "etunimi":
            continue # tämä oli otsikkorivi, ei huomioida!
        sukunimet.append(osat[1].strip())
print(sukunimet)
```

Tämän jälkeen tulostus on halutunlainen:

<sample-output>

['Python', 'Java', 'Haskell']

</sample-output>

Merkkijonoilla on myös metodit `lstrip` ja `rstrip`, jotka poistavat ainoastaan merkkijonon vasemmalla tai oikealla puolella olevia merkkejä.

```python
>>> " testimerkkijono  ".rstrip()
' testimerkkijono'
>>> " testimerkkijono  ".lstrip()
'testimerkkijono  '
```

## Eri tiedostoissa olevien tietojen yhdistely

On hyvin yleistä, että ohjelmassa tarvittava data on talletettu useaan erilliseen tiedostoon. Tarkastellaan esimerkkinä tilannetta, jossa yrityksen henkilöstön tiedot ovat omassa tiedostossaan `tyontekijat.csv`:

```csv
hetu;nimi;osoite;kaupunki
080488-123X;Pekka Mikkola;Vilppulantie 7;00700 Helsinki
290274-044S;Liisa Marttinen;Mannerheimintie 100 A 10;00100 Helsinki
010479-007Z;Arto Vihavainen;Pihapolku 4;01010 Kerava
010499-345K;Leevi Hellas;Tapiolantie 11 B;02000 Espoo
```

Työntekijöiden palkat taas ovat talletettu omaan tiedostoonsa `palkat.csv`

```csv
hetu;palkka;bonus
080488-123X;3300;0
290274-044S;4150;200
010479-007Z;1300;1200
```

Molempien tiedostojen riveillä on ensin _henkilötunnus_, joka kertoo kenen tiedoista on kyse. Käyttämällä henkilötunnusta yhdistävänä tekijänä, on helppo yhdistää henkilöiden nimet ja palkat toisiinsa, ja tehdä esimerkiksi ohjelma, joka tulostaa seuraavanlaisen näkymän henkilöiden ansioihin:

<sample-output>

<pre>
ansiot:
Pekka Mikkola    3300 euroa
Liisa Marttinen  4350 euroa
Arto Vihavainen  2500 euroa
</pre>

</sample-output>

Ohjelma käyttää aputietorakenteena kahta saankirjaa `nimet` ja `palkat`, joissa molemmissa avaimena toimii henkilötunnus:

```python
nimet = {}

with open("tyontekijat.csv") as tiedosto:
    for rivi in tiedosto:
        osat = rivi.split(';')
        if osat[0] == "hetu":
            continue
        nimet[osat[0]] = osat[1]

palkat = {}

with open("palkat.csv") as tiedosto:
    for rivi in tiedosto:
        osat = rivi.split(';')
        if osat[0] == "hetu":
            continue
        palkat[osat[0]] = int(osat[1]) +int(osat[2])

print("ansiot:")

for hetu, nimi in nimet.items():
    if hetu in palkat:
        palkka = palkat[hetu]
        print(f"{nimi:16} {palkka} euroa")
    else:
        print(f"{nimi:16} 0 euroa")
```

Ohjelma siis muodostaa ensin sanakirjat `nimet` ja `palkat`, joiden sisältö näyttää seuraavilta:

```sh
{
    '080488-123X': 'Pekka Mikkola',
    '290274-044S': 'Liisa Marttinen',
    '010479-007Z': 'Arto Vihavainen',
    '010499-345K': 'Leevi Hellas'
}

{
    '080488-123X': 3300,
    '290274-044S': 4350,
    '010479-007Z': 2500
}
```

Lopun for-silmukka yhdistää henkilöiden nimet ja niitä vastaavat palkat sanakirjojen avulla.

Ohjelma huomioi myös tilanteen, jossa henkilön palkkatietoja ei ole olemassa.

Huomaa, että koska ohjelma käyttää aputietorakenteena sanakirjaa, ei henkilöitä vastaavien rivien järjestyksellä ole merkitystä.

<programming-exercise name='Course grading, part 1' tmcname='part06-04_course_grading_part_1'>

This program works with two CSV files. One of them contains information about some students on a course:

```csv
id;first;last
12345678;peter;pythons
12345687;jean;javanese
12345699;alice;adder
```

The other contains the number of exercises each student has completed each week:

```csv
id;e1;e2;e3;e4;e5;e6;e7
12345678;4;1;1;4;5;2;4
12345687;3;5;3;1;5;4;6
12345699;10;2;2;7;10;2;2
```

As you can see above, both CSV files also have a header row, which tells you what each column contains.

Please write a program which asks the user for the names of these two files, reads the files, and then prints out the total number of exercises completed by each student. If the files have the contents in the examples above, the program should print out the following:

<sample-output>

Student information: **students1.csv**
Exercises completed: **exercises1.csv**
pekka peloton 21
jaana javanainen 27
liisa virtanen 35

</sample-output>

Hint: while testing your program, you may quickly run out of patience if you always have to type in the file names at the prompt. You might want to hard-code the user input, like so:

```python
if False:
    # this is never executed
    student_info = input("Student information: ")
    exercise_data = input("Exercises completed: ")
else:
    # hard-coded input
    student_info = "students1.csv"
    exercise_data = "exercises1.csv"
```

The actual functionality of the program is now "hidden" in the `False` branch of an `if` statement. It will never be executed.

Now, if you want to quickly verify the program works correctly also with user input, you can just replace `False` with `True`:

```python

if True:
    student_info = input("Student information: ")
    exercise_data = input("Exercises completed: ")
else:
    # now this is the False branch, and is never executed
    student_info = "students1.csv"
    exercise_data = "exercises1.csv"
```

When you have verified your program works correctly, you can remove the `if` structure, keeping the commands asking for input.

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within an `if __name__ == "__main__"` block.

**NB2:** If Visual Studio can't find the file and you have checked that there are no spelling errors, take a look at [these instructions](/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).

</programming-exercise>

<programming-exercise name='Course grading, part 2' tmcname='part06-05_course_grading_part_2'>

Let's expand the program created in the previous exercise. Now also the exam points awarded to each student are contained in a CSV file. The contents of the file follow this format:

```csv
opnro;k1;k2;k3
12345678;4;1;4
12345687;3;5;3
12345699;10;2;2
```

In the above example the student whose student number is 12345678 was awarded 4+1+4 points in the exam, which equals a total of 9 points. 

The program should again ask the user for the names of the files. Then the program should process the files and print out a grade for each student.

<sample-output>

Student information: **students1.csv**
Exercises completed: **exercises1.csv**
Exam points: **exam_points1.csv**
pekka peloton 0
jaana javanainen 1
liisa virtanen 3

</sample-output>

Each completed exercise is counted towards _exercise points_, so that completing at least 10 % of the total exercices awards 1 point, completing at least 20 % awards 2 points, etc. Completing all 40 exercises awards 10 points. The number of points awarded is always an integer number.

The final grade for the course is determined based on the sum of exam and exercise points according to the following table:

exam points + exercise points   | grade
:--:|:----:
0-14 | 0 (fail)
15-17 | 1
18-20 | 2
21-23 | 3
24-27 | 4
28- | 5

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within an `if __name__ == "__main__"` block.

</programming-exercise>

<programming-exercise name='Course grading, part 3' tmcname='part06-06_course_grading_part_3'>

This exercise will continue from the previous one. Now we shall print out some statistics based on the CSV files.

<sample-output>

Student information: **students1.csv**
Exercises completed: **exercises1.csv**
Exam points: **exam_points1.csv**
<pre>
name                          exercises exer_p    exam_p    total_p   grade
pekka peloton                 21        5         9         14        0
jaana javanainen              27        6         11        17        1
liisa virtanen                35        8         14        22        3
</pre>

</sample-output>

Each row contains the information for a single student. The number of exercises completed, the number of exercise points awarded, the number of exam points awarded, the total number of points awarded, and the grade are all displayed in tidy columns. The width of the column for the name should be 30 characters, while the other columns should be 10 characters wide.

You might find the f-strings covered in [part 4](/part-4/5-print-statement-formatting) useful here.

F-strings differentiate between strings and numbers when it comes to justifying columns:

```python
word = "python"
print(f"{word:10}continues")
print(f"{word:>10}continues")
```

<sample-output>

<pre>
python    continues
    pythoncontinues
</pre>

</sample-output>

As you can see above, by default strings are justified to the _left_ edge of the area specified for them. The `>` symbol can be used to justify to the right edge.

With number values the logic is reversed:

```python
number = 42
print(f"{number:10}continues")
print(f"{number:<10}continues")
```

<sample-output>

<pre>
        42continues
42        continues
</pre>

</sample-output>

With numbers the default behaviour is to justify to the _right_ edge. The symbol `<` can be used to justify to the left edge.

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within an `if __name__ == "__main__"` block.

</programming-exercise>

<programming-exercise name='Spell checker' tmcname='part06-07_spellchecker'>

Please write a program which asks the user to type in some text. Your program should then perform a spell check, and print out feedback to the user, so that all misspelled words have stars around them. Please see the two examples below:

<sample-output>

Write text: **We use ptython to make a spell checker**
<pre>
We use *ptython* to make a spell checker
</pre>

</sample-output>

<sample-output>

Write text: **This is acually a good and usefull program**
<pre>
This is *acually* good and *usefull* program
</pre>

</sample-output>

The case of the letters should be irrelevant to the functioning of your program.

The exercise template includes the file `wordlist.txt`, which contains all the words the spell checker should accept as correct.

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within an `if __name__ == "__main__"` block.

**NB2** If Visual Studio can't find the file and you have checked that there are no spelling errors, take a look at [these instructions](/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).


</programming-exercise>

<programming-exercise name='Recipe search' tmcname='part06-08_recipe_search'>

This exercise is about creating a program which allows the user to search for recipes based on their names, preparation times, or ingredients used. The program should read the recipes from a file submitted by the user.

Each recipe consists of three or more lines. The first line has the name of the recipe, the second line contains an integer number representing the preparation time in minutes, and the remaining line or lines contain the ingredients used, one on each line. The recipe ends with an empty line, with the exception of the final recipe in the file which just ends with the end of the file. So, there can be more than one recipe in a single file, like in the example below.

```sh
Pancakes
15
milk
eggs
flour
sugar
salt
butter

Meatballs
45
mince
eggs
breadcrumbs

Tofu rolls
30
tofu
rice
water
carrot
cucumber
avocado
wasabi

Cake pops
60
milk
bicarbonate
eggs
salt
sugar
cardamom
butter
```

**Hint:** it might be best to first read through all the lines in the file and pop them into a list, which is then easier to manipulate in the way described in the exercise.

#### Search for recipes based on the name of the recipe 

Please write a function named `search_by_name(filename: str, word: str)`, which takes a filename and a search string as its arguments. The function should go through the file and select all recipes whose _name_ contains the given search string. The names of these recipes are then returned in a list.

An example of the function in action:

```python
found_recipes = search_by_name("recipes1.txt", "cake")

for recipe in found_recipes:
    print(recipe)
```

<sample-output>

Pancakes
Cake pops

</sample-output>

As you can see in the example above, the case of the letters is irrelevant. The search term _cake_ returns both _Pancakes_ and _Cake pops_, even though the latter is capitalized.

**NB:** If Visual Studio can't find the file and you have checked that there are no spelling errors, take a look at [these instructions](/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).

#### Search for recipes based on the preparation time

Please write a function named `search_by_time(filename: str, prep_time: int)`, which takes a filename and an integer as its arguments. The function should go through the file and select all recipes whose preparation time is at most the number given.

The names of these recipes are again returned in a list, but the preparation time should be appended to each name. Please have a look at the example below.

```python
found_recipes = search_by_time("recipes1.txt", 20)

for recipe in found_recipes:
    print(recipe)
```

<sample-output>

Pancakes, preparation time 15 min

</sample-output>

#### Search for recipes based on the ingredients

**A word of caution:** this third part of the exercise is considerably more demanding than the previous two. If you feel like you aren't making headway, it may be worth your while to move on, complete the other exercises in this part of the material, and then come back to this exercise if you have time later. Remember, you can submit and receive points for the first two parts of this exercise even if you haven't completed the third part.

Please write a function named `search_by_ingredient(filename: str, ingredient: str)`, which takes a filename and a search string as its arguments. The function should go through the file and select all recipes whose _ingredients_ contain the given search string.

The names of these recipes are returned in a list just like in the second part, with the preparation time appended. Please have a look at the example below.

```python
found_recipes = search_by_ingredient("recipes1.txt", "eggs")

for recipe in found_recipes:
    print(recipe)
```

<sample-output>

Pancakes, preparation time 15 min
Meatballs, preparation time 45 min
Cake pops, preparation time 60 min

</sample-output>

</programming-exercise>

<programming-exercise name='City bikes' tmcname='part06-09_city_bikes'>

In this exercise we will write some functions for working on a file containing location data from the stations for [city bikes in Helsinki](https://www.hsl.fi/en/citybikes).

Each file will follow this format:

```csv
Longitude;Latitude;FID;name;total_slot;operative;id
24.950292890004903;60.155444793742276;1;Kaivopuisto;30;Yes;001
24.956347471358754;60.160959093887129;2;Laivasillankatu;12;Yes;002
24.944927399779715;60.158189199971673;3;Kapteeninpuistikko;16;Yes;003
```

Each station has a single line in the file. The line contains the coordinates, name, and other identifying information for the station.

#### Distance between stations

First, write a function named `get_station_data(filename: str)`. This function should read the names and locations of all the stations in the file, and return them in a dictionary with the following format:

<sample-output>

<pre>
{
  "Kaivopuisto: (24.950292890004903, 60.155444793742276),
  "Laivasillankatu: (24.956347471358754, 60.160959093887129),
  "Kapteeninpuistikko: (24.944927399779715, 60.158189199971673)
}
</pre>

</sample-output>

Dictionary keys are the names of the stations, and the value attached is a tuple containing the location coordinates of the station. The first element in the tuple is the _Longitude_ field, and the second is the _Latitude_ field.

Next, write a function named `distance(stations: dict, station1: str, station2: str)`, which returns the distance between the two stations given as arguments.

The distance is calculated using the Pythagorean theorem. The multiplication factors below are approximate values for converting latitudes and longitudes to distances in kilometres in the Helsinki region.

```python
# we will need the function sqrt from the math module 
import math

x_km = (longitude1 - longitude2) * 55.26
y_km = (latitude1 - latitude2) * 111.2
distance_km = math.sqrt(x_km**2 + y_km**2)
```

Some examples of the function in action:

```python
stations = get_station_data('stations1.csv')
d = distance(stations, "Designmuseo", "Hietalahdentori")
print(e)
d = distance(stations, "Viiskulma", "Kaivopuisto")
print(e)
```

<sample-output>

0.9032737292463177
0.7753594392019532

</sample-output>

**NB:** If Visual Studio can't find the file and you have checked that there are no spelling errors, take a look at [these instructions](/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file).

#### The greatest distance

Please write a function named `greatest_distance(stations: dict)`, which works out the two stations on the list with the greatest distance from each other. The function should return a tuple, where the first two elements are the names of the two stations, and the third element is the distance between the two.

```python
stations = get_station_data('stations1.csv')
station1, station2, greatest = greatest_distance(stations)
print(station1, station2, greatest)
```

<sample-output>

Laivasillankatu Hietalahdentori 1.478708873076181

</sample-output>

</programming-exercise>

<!---
A quiz to review the contents of this section:

<quiz id="69694e01-4c47-5b9d-8a00-b0d96a477dc7"></quiz>
-->
