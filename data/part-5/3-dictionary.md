---
path: '/part-5/3-dictionary'
title: 'Dictionary'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, millainen tietorakenne on sanakirja
- Osaat käyttää sanakirjaa erityyppisten avainten ja arvojen kanssa
- Osaat käydä läpi sanakirjan sisällön
- Tunnet joitakin sanakirjan käyttötarkoituksia ohjelmoinnissa

</text-box>

Lista on kätevä tietorakenne, mutta sen rajoituksena on, että alkiot ovat indekseissä 0, 1, 2, jne. Tämä hankaloittaa alkioiden etsimistä listalta: jotta löydämme tietyn alkion, on pahimmassa tapauksessa käytävä läpi koko lista.

Tutustumme seuraavaksi _sanakirjaan_, (englanniksi _dictionary_) joka on listan lisäksi toinen Pythonin perustietorakenne. Sanakirjassa jokainen alkio koostuu _avaimesta_ ja _arvosta_, ja voimme etsiä ja muuttaa tietoa avaimen perusteella.

## Sanakirjan käyttäminen

Seuraava ohjelma näyttää esimerkin sanakirjan käyttämisestä:

```python
sanakirja = {}

sanakirja["apina"] = "monkey"
sanakirja["banaani"] = "banana"
sanakirja["cembalo"] = "harpsichord"

print(len(sanakirja))
print(sanakirja)
print(sanakirja["apina"])
```

<sample-output>

3
{'apina': 'monkey', 'banaani': 'banana', 'cembalo': 'harpsichord'}
monkey

</sample-output>

Merkintä `{}` luo tyhjän sanakirjan, minkä jälkeen voimme lisätä sanakirjaan sisältöä. Tässä tapauksessa lisäämme kolme avainta `"apina"`, `"banaani"` ja `"cembalo"`, joita vastaavat arvot `"monkey"`, `"banana"` ja `"harpsichord"`. Lopuksi tulostamme koko sanakirjan sisällön ja sitten avaimen `"apina"` arvon.

Voisimme käyttää tätä sanakirjaa vaikka seuraavasti:

```python
sana = input("Anna sana: ")
if sana in sanakirja:
    print("Käännös:", sanakirja[sana])
else:
    print("Sanaa ei löytynyt")
```

Tässä käytössä on `in`-operaattori, joka sanakirjan tapauksessa tarkastaa, onko siinä tiettyä avainta. Mahdollisia ohjelman tulostuksia:

<sample-output>

Anna sana: **apina**
Käännös: monkey

</sample-output>

<sample-output>

Anna sana: **pöllö**
Sanaa ei löytynyt

</sample-output>

## Mitä sanakirjassa voi olla?

Vaikka tietorakenteen name on sanakirja, siinä ei ole usein sanakirjaa vaan jotain muuta tietoa. Esimerkiksi seuraavassa sanakirjassa avaimet ovat merkkijonoja ja arvot ovat kokonaislukuja:

```python
tulokset = {}
tulokset["Maija"] = 4
tulokset["Liisa"] = 5
tulokset["Kalle"] = 2
```

Seuraavassa sanakirjassa puolestaan avaimet ovat kokonaislukuja ja arvot ovat listoja:

```python
listat = {}
listat[5] = [1, 2, 3]
listat[42] = [5, 4, 5, 4, 5]
listat[100] = [5, 2, 3]
```

## Avaimista ja arvoista

Tietty avain voi esiintyä sanakirjassa enintään kerran. Jos asetamme samalle avaimelle uuden arvon, korvaa uusi arvo vanhan arvon:

```python
sanakirja["suuri"] = "big"
sanakirja["suuri"] = "large"
print(sanakirja["suuri"])
```

<sample-output>

large

</sample-output>

Sanakirjan avaimen vaatimuksena on, että sen tulee olla muuttumaton. Tämän vuoksi emme voi käyttää listaa avaimena, koska lista voi muuttua. Esimerkiksi seuraava koodi ei toimi:

```python
sanakirja[[1, 2, 3]] = 5
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

<text-box variant="hint" name="Hajautustaulu">

Python tallentaa sanakirjan sisällön sisäisesti tietorakenteena nimeltä _hajautustaulu_ (_hash table_). Ideana on laskea avaimelle _hajautusarvo_ (_hash value_), jonka avulla määräytyy avaimen paikka muistissa. Yllä oleva virheilmoitus ilmaisee, että listalle ei voida laskea hajautusarvoa, joten se ei kelpaa sanakirjan avaimeksi.

Kurssilla _Tietorakenteet ja algoritmit_ tutustutaan tarkemmin hajautustauluihin, eli sanakirjojen pellin alla olevaan mekanismiin.

</text-box>

Huomaa, että sanakirjassa olevaa avainta vastaavan arvon ei tarvitse olla muuttumaton, vaan voimme tallentaa mitä tahansa tietoa arvoiksi. Sama arvo voi myös esiintyä samassa hakemistossa enemmän kuin yhden kerran.

<programming-exercise name='Times ten' tmcname='part05-14_times_ten'>

Please write a function named `times_ten(start_index: int, end_index: int)`, which creates and returns a new dictionary. The keys of the dictionary should be the numbers between `start_index` and `end_index` inclusive

The value mapped to each key should be the key times ten.

For example:

```python
d = times_ten(3, 6)
print(d)
```

<sample-output>

{3: 30, 4: 40, 5: 50, 6: 60}

</sample-output>

</programming-exercise>

<programming-exercise name='Factorials' tmcname='part05-15_factorials'>

Please write a function named `factorials(n: int)`, which returns the factorials of the numbers 1 to `n` in a dictionary so that the number is the key, and the factorial of that number is the value mapped to it.

A reminder: the factorial of the number `n` is written `n`! and is calculated by multiplying the number by each integer smaller than itself. For example, the factorial of 4 is 4 * 3 * 2 * 1 = 24.

An example of the function in action:

```python
k = factorials(5)
print(k[1])
print(k[3])
print(k[5])
```

<sample-output>

1
6
120

</sample-output>

</programming-exercise>

## Sanakirjan läpikäynti

Sanakirjan läpikäyntiin voidaan käyttää tuttuun tapaan `for`-silmukkaa. Rakenne `for avain in sanakirja` käy läpi kaikki sanakirjan avaimet yksi kerrallaan. Esimerkiksi seuraava koodi tulostaa kaikki sanakirjan avaimet ja niiden arvot:

```python
sanakirja = {}

sanakirja["apina"] = "monkey"
sanakirja["banaani"] = "banana"
sanakirja["cembalo"] = "harpsichord"

for avain in sanakirja:
    print("avain:", avain)
    print("arvo:", sanakirja[avain])
```

<sample-output>

avain: apina
arvo: monkey
avain: banaani
arvo: banana
avain: cembalo
arvo: harpsichord

</sample-output>

Python tarjoaa myös mahdollisuuden käydä läpi samaan aikaan sekä avaimet että vastaavat arvot. Tämä onnistuu käyttämällä `items`-metodia, joka palauttaa kaikki avaimet ja arvot yksi kerrallaan:

```python

for avain, arvo in sanakirja.items():
    print("avain:", avain)
    print("arvo:", arvo)
```

Huomaa, että läpikäynnissä avaimet tulevat samassa järjestyksessä kuin ne on lisätty sanakirjaan. Sanakirjan avainten järjestyksellä ei kuitenkaan yleensä ole merkitystä sovelluksissa.

## Sanakirjan edistyneempi käyttö

Tarkastellaan tilannetta, jossa listassa on joukko sanoja:

```python
sanalista = [
  "banaani", "maito", "olut", "juusto", "piimä", "mehu", "makkara",
  "tomaatti", "kurkku", "voi", "margariini", "juusto", "makkara",
  "olut", "piimä", "piimä", "voi", "olut", "suklaa"
]
```

Haluamme analysoida sanalistaa eri tavoin, kuten selvittää, montako kertaa kukin sana listalla esiintyy.

Sanakirja sopii tähän tilanteeseen hyvin. Ideana on käydä listan sanat läpi yksi kerrallaan ja ylläpitää sanakirjassa tietoa sanojen esiintymiskerroista:

```python
def lukumaarat(lista):
    sanat = {}
    for sana in lista:
        # jos sana ei ole vielä tullut vastaan, alusta avaimen arvo
        if sana not in sanat:
            sanat[sana] = 0
        # kasvata sanan esiintymislukumäärää
        sanat[sana] += 1
    return sanat

# kutsutaan funktiota
print(lukumaarat(sanalista))
```

Ohjelman tulostus on seuraavassa:

<sample-output>

{'banaani': 1, 'maito': 1, 'olut': 3, 'juusto': 2, 'piimä': 3, 'mehu': 1, 'makkara': 2, 'tomaatti': 1, 'kurkku': 1, 'voi': 2, 'margariini': 1, 'suklaa': 1}

</sample-output>

Tehdään vielä toinen sanalistaa käsittelevä metodi, joka jaottelee listalla olevat sanat niiden alkukirjaimen mukaan:

```python
def alkukirjaimen_mukaan(lista):
    ryhmat = {}
    for sana in lista:
        alkukirjain = sana[0]
        # alusta alkukirjaimeen liittyvä lista kun kirjain tulee vastaan 1. kerran
        if alkukirjain not in ryhmat:
            ryhmat[alkukirjain] = []
        # lisää sana alkukirjainta vastaavalle listalle
        ryhmat[alkukirjain].append(sana)
    return ryhmat

ryhmat = alkukirjaimen_mukaan(sanalista)

for avain, arvo in ryhmat.items():
    print(f"kirjaimella {avain} alkavat sanat: ")
    for sana in arvo:
        print(sana)
```

Funktio toimii pitkälti saman periaatteen mukaan kuin edellisen esimerkin funktio. Tällä kertaa kuitenkin sanakirjassa avaimiin (eli alkukirjaimiin) liittyvät arvot ovat listoja.

Ohjelman tulostus on seuraavassa:

<sample-output>

kirjaimella b alkavat sanat:
  banaani
kirjaimella m alkavat sanat:
  maito
  mehu
  makkara
  margariini
  makkara
kirjaimella o alkavat sanat:
  olut
  olut
  olut
kirjaimella j alkavat sanat:
  juusto
  juusto
kirjaimella p alkavat sanat:
  piimä
  piimä
  piimä
kirjaimella t alkavat sanat:
  tomaatti
kirjaimella k alkavat sanat:
  kurkku
kirjaimella v alkavat sanat:
  voi
  voi
kirjaimella s alkavat sanat:
  suklaa

</sample-output>

<programming-exercise name='Histogram' tmcname='part05-16_histogram'>

Please write a function named `histogram`, which takes a string as its argument. The function should print out a histogram representing the number of times each letter occurs in the string. Each occurrence of a letter should be represented by a star on the specific line for that letter. 

For example, `histogram("abba")` would print out this:

<sample-output>

<pre>
a **
b **
</pre>

</sample-output>

The function call `histogram("statistically")` should print out:

<sample-output>

<pre>
s **
t ***
a **
i **
c *
l **
y *
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Phone book, version 1' tmcname='part05-17_phone_book_v1'>

Please write a phone book application. It should work as follows:

<sample-output>

command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **040-5466745**
ok!
command (1 search, 2 add, 3 quit): **2**
name: **emily**
number: **045-1212344**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
command (1 search, 2 add, 3 quit): **1**
name: **mary**
no number in phone book
command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **09-22223333**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
09-22223333
command (1 search, 2 add, 3 quit): **3**
quitting...

</sample-output>

As you can see above, each name can be attached to a single number only. If a new entry with the same name is added, the number attached to the old entry is replaced with the new number.

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within an `if __name__ == "__main__"` block.

</programming-exercise>

<programming-exercise name='Phone book, version 2' tmcname='part05-18_phone_book_v2'>

Please write an improved version of the phone book application. Each entry should now accommodate multiple phone numbers. The application should work otherwise exactly as above, but this time _all_ numbers attached to a name should be printed.

<sample-output>

command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **040-5466745**
ok!
command (1 search, 2 add, 3 quit): **2**
name: **emily**
number: **045-1212344**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
command (1 search, 2 add, 3 quit): **1**
name: **mary**
no number in phone book
command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **09-22223333**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
09-22223333
command (1 search, 2 add, 3 quit): **3**
quitting...

</programming-exercise>

## Avaimien poistaminen sanakirjasta

Sanakirjasta on mahdollista myös poistaa avain-arvo-pareja. Menetelmiä tähän on kaksi. Ensimmäinen näistä on komento `del`:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "Lehtori"}
del henkilokunta["Arto"]
print(henkilokunta)
```

<sample-output>

{'Antti': 'lehtori', 'Emilia': 'professori'}

</sample-output>

Jos komentoa `del` kutsutaan avaimille, joita sanakirjassa ei ole, seurauksena on virhe:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "lehtori"}
del henkilokunta["Jukka"]
```

<sample-output>

<pre>
>>> del henkilokunta["Jukka"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'Jukka'
</pre>

</sample-output>

Ennen poistoa on siis syytä tarkistaa, että poistettava avain löytyy sanakirjasta:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "lehtori"}
if "Jukka" in henkilokunta:
  del henkilokunta["Jukka"]
  print("Poistettiin")
else:
  print("Poistettavaa henkilöä ei löytynyt henkilökunnasta")
```

Toinen vaihtoehto alkion poistamiseen on metodi `pop`:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "lehtori"}
poistettu = henkilokunta.pop("Arto")
print(henkilokunta)
print("Poistettiin", poistettu)
```

<sample-output>

{'Antti': 'lehtori', 'Emilia': 'professori'}
Poistettiin lehtori

</sample-output>

Metodi `pop` siis myös palauttaa poistettua avainta vastaavan arvon.

Oletusarvoisesti myös `pop` aiheuttaa virheen, jos sanakirjasta yritetään poistaa avain, jota siellä ei ole. Metodille on kuitenkin mahdollista antaa toisena parametrina _oletusarvoinen paluuarvo_, joka palautetaan siinä tilanteessa, kun poistettavaa ei löydy. Esimerkiksi arvo `None`, joka tarkoittaa "ei mitään", sopii hyvin tälläisiin tilanteisiin:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "lehtori"}
poistettu = henkilokunta.pop("Jukka", None)
if poistettu == None:
  print("Poistettavaa henkilöä ei löytynyt henkilökunnasta")
else:
  print("Poistettiin", poistettu)
```

<sample-output>

Poistettavaa henkilöä ei löytynyt henkilökunnasta

</sample-output>

Kannattaa huomata, että jos on tarvetta poistaa koko sanakirjan sisältö:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "lehtori"}
for avain in henkilokunta:
  del henkilokunta[avain]
```

seurauksena on virheilmoitus

<sample-output>

RuntimeError: dictionary changed size during iteration

</sample-output>

Syynä on se, että käytäessä läpi rakennetta `for`-lauseella, ei sen sisältöä saa muuttaa.

Koko sanakirjan tyhjennys onnistuu komennolla:

```python
henkilokunta.clear()
```

<programming-exercise name='Invert a dictionary' tmcname='part05-19_invert_dictionary'>

Please write a function named `invert(dictionary: dict)`, which takes a dictionary as its argument. The dictionary should be inverted in place so that values become keys and keys become values.

An example of its use:

```python
s = {1: "first", 2: "second", 3: "third", 4: "fourth"}
invert(s)
print(s)
```

<sample-output>

{"first": 1, "second": 2, "third": 3, "fourth": 4}

</sample-output>

**NB:** the same principles covered [here](/part-5/2-references#using-lists-as-parameters-in-functions) regarding lists also hold for dictionaries passed as arguments.

If you have trouble completing this exercise, the [visualisation tool](http://www.pythontutor.com/visualize.html#mode=edit) might help you understand what your code is or isn't doing.

</programming-exercise>

<programming-exercise name='Numbers spelled out' tmcname='part05-20_numbers_spelled_out'>

Please write a function named `dict_of_numbers()`, which returns a new dictionary. The dictionary should have the numbers from 0 to 99 as its keys. The value attached to each key should be the number spelled out in words. Please have a look at the example below:

```python
numbers = dict_of_numbers()
print(numbers[2])
print(numbers[11])
print(numbers[45])
print(numbers[99])
print(numbers[0])
```

<sample-output>

two
eleven
forty-five
ninety-nine
zero

</sample-output>

NB: Please don't formulate each spelled out number by hand. Figure out how you can use loops and dictionaries in your solution.

</programming-exercise>

## Sanakirja tiedon ryhmittelyssä

Voimme käyttää sanakirjaa myös tiedon ryhmittelyssä. Esimerkiksi seuraava koodi luo sanakirjan, jossa on tietoa henkilöstä:

```python
henkilo = {"name": "Pirjo Python", "pituus": 154, "paino": 61, "ikä:" 44}
```

Tämä tarkoittaa, että henkilön name on Pirjo Python, pituus on 154, paino on 61 ja ikä on 44.
Huomaa, että olisimme voineet tallentaa tiedot myös näin muuttujiin:

```python
name = "Pirjo Python"
pituus = 154
paino = 61
ika = 44
```

Sanakirjan etuna on kuitenkin, että se kokoaa kaikki samaan asiaan liittyvät tiedot yhteisen nimen alle, jonka kautta voimme viitata tietoihin. Periaatteessa lista tarjoaa saman edun:

```python
henkilo = ["Pirjo Python", 153, 61, 44]
```

Listan huono puoli on kuitenkin, että ohjelmoijan on muistettava, mihin kohtaan listaa mikäkin arvo tallennetaan. Pitää siis muistaa esimerkiksi, että `henkilo[2]` tarkoittaa painoa ja `henkilo[3]` ikää. Sanakirjassa tätä ongelmaa ei ole, sillä kaikki sanakirjassa olevat erilliset tiedot on tallennettu selkeästi nimetyn avaimen taakse.

Esimerkiksi voimme käsitellä henkilöitä näin:

```python
henkilo1 = {"name": "Pirjo Python", "pituus": 154, "paino": 61, "ikä": 44}
henkilo2 = {"name": "Victor Pythingen", "pituus": 174, "runtime": 103, "ikä": 31}
henkilo3 = {"name": "Pedro Python", "pituus": 191, "paino": 71, "ikä": 14}

henkilot = [henkilo1, henkilo2, henkilo3]

for henkilo in henkilot:
    print(henkilo["name"])

yhteispituus = 0
for henkilo in henkilot:
    yhteispituus += henkilo["pituus"]

print("Keskipituus on", yhteispituus / len(henkilot))
```

<sample-output>

Pirjo Python
Victor Pythingen
Pedro Python
Keskipituus on 173.runtime

</sample-output>

<programming-exercise name='Movie database' tmcname='part05-21_movie_database'>

Please write a function named `add_movie(database: list, name: str, director: str, year: int, runtime: int)`, which adds a new movie object into a movie database.

The database is a list, and each movie object on the list is a dictionary. The dictionary should contain the following keys.

* name
* director
* year
* runtime

The values attached to these keys are given as arguments to the function.

An example of its use:

```python
database = []
add_movie(database, "Gone with the Python", "Victor Pything", 2017, 116)
add_movie(database, "Pythons on a Plane", "Renny Pytholin", 2001, 94)
print(database)
```

<sample-output>

[{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116}, {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94}]

</sample-output>

</programming-exercise>

<programming-exercise name='Find movies' tmcname='part05-22_find_movies'>

Please write a function named `find_movies(database: list, search_term: str)`, which processes the movie database created in the previous exercise. The function should formulate a new list, which contains only the movies whose title includes the word searched for. Capitalisation is irrelevant here. A search for `ana` should return a list containing both `Anaconda` and `Management`.

Esimerkki:

```python
database = [{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116},
{"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94},
{"name": "Dawn of the Dead Programmers", "director": "M. Night Python", "year": 2011, "runtime": 101}]

my_list = find_movies(database, "python")
print(my_list)
```

<sample-output>

[{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116}, {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94}]

</sample-output>

</programming-exercise>

<!---
A quiz to review the contents of this section:

<quiz id="6361eeca-a2e2-5577-892c-749706d754f0"></quiz>
-->
