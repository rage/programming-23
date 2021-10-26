---
path: '/part-9/2-objects-as-attributes'
title: 'Objects as attributes'
hidden: False
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Osaat tallentaa olioita toisten olioiden sisään
- Tiedät, mitä tarkoittaa `None`

</text-box>

Aikaisemmin nähtiin esimerkkejä luokista, joissa attribuutteina oli käytetty esimerkiksi listoja. Samalla tavalla myös omista luokista luotuja olioita voi käyttää toisten olioiden attribuutteina. Seuraavissa esimerkeissä on määritelty luokat `Kurssi`, `Opiskelija` ja `Opintosuoritus`. Opintosuorituksessa hyödynnetään kahta ensimmäistä luokkaa. Luokkien sisäinen toteutus on lyhyt, jotta esimerkki toisi esille oleellisen.

Esimerkissä jokainen luokka on kirjoitettu omaan tiedostoonsa.

Esitellään aluksi luokka `Kurssi`, joka on määritelty tiedostossa `kurssi.py`:

```python
class Kurssi:
    def __init__(self, nimi: str, koodi: str, opintopisteet: int):
        self.nimi = nimi
        self.koodi = koodi
        self.opintopisteet = opintopisteet
```

Luokka `Opiskelija` mallintaa yhtä opiskelijaa. Luokka on määritelty tiedostossa `opiskelija.py`:

```python
class Opiskelija:
    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet: int):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero
        self.opintopisteet = opintopisteet
```

Luokka `Opintosuoritus` hyödyntää luokkia `Kurssi` ja `Opiskelija` suorituksen tallentamiseen. Huomaa, että luokat tuodaan mukaan `import`-lauseella:

```python
from kurssi import Kurssi
from opiskelija import Opiskelija

class Opintosuoritus:
    def __init__(self, opiskelija: Opiskelija, kurssi: Kurssi, arvosana: int):
        self.opiskelija = opiskelija
        self.kurssi = kurssi
        self.arvosana = arvosana
```

Esimerkki opintosuoritusten lisäämisestä listaan:

```python
from opintosuoritus import Opintosuoritus
from kurssi import Kurssi
from opiskelija import Opiskelija

# Luodaan lista opiskelijoista
opiskelijat = []
opiskelijat.append(Opiskelija("Olli", "1234", 10))
opiskelijat.append(Opiskelija("Pekka", "3210", 23))
opiskelijat.append(Opiskelija("Leena", "9999", 43))
opiskelijat.append(Opiskelija("Tiina", "3333", 8))

# Kurssi Ohjelmoinnin perusteet
ohpe = Kurssi("Ohjelmoinnin perusteet", "ohpe1", 5)

# Annetaan suoritukset kaikille opiskelijoille, kaikille arvosanaksi 3
suoritukset = []
for opiskelija in opiskelijat:
    suoritukset.append(Opintosuoritus(opiskelija, ohpe, 3))

# Tulostetaan kaikista suorituksista opiskelijan nimi
for suoritus in suoritukset:
    print(suoritus.opiskelija.nimi)
```

<sample-output>

Olli
Pekka
Leena
Tiina

</sample-output>

Tarkastellaan lähemmin riviä `print(suoritus.opiskelija.nimi)`:

* `suoritus` on luokan `Opintosuoritus` mukainen olio
* Niinpä muuttuja `opiskelija` viittaa suoritukseen tallennettuun `Opiskelija`-olioon
* `Opiskelija`-luokan muuttuja `nimi` sisältää opiskelijan nimen

## Milloin import tarvitaan?

Edellisessä esimerkissä käytetään muutamassa kohdassa `import`:ia:

```python
from opintosuoritus import Opintosuoritus
from kurssi import Kurssi
from opiskelija import Opiskelija

# koodi
```

Importia tarvitaan vain jos tiedostossa käytetään jossain muualla  määriteltyä koodia. Näin on esimerkiksi kun käytetään jotain Pythonin valmista kalustoa, esim. matemaattisia operaatiota tarjoavaa moduulia `math`:

```python
import math

x = 10
print(f"luvun {x} {neliöjuuri math.sqrt(x)}")
```

Edellisessä tehtävässä oletettiin, että luokat on määritelty omissa tiedostoissaan. Esimerkki toteaa mm.
 _Esitellään aluksi luokka Kurssi, joka on määritelty tiedostossa kurssi.py_
ja importin tarve siis johtuu tästä.

Jos kaikki koodi sijoitetaan samaan tiedostoon, kuten kaikissa kurssin ohjelmointitehtävissä ohjeistetaan, **et tarvitse** `import`:ia luomiesi luokkien käytöön.

Jos siis päädyt kirjottamaan kurssilla seuraavanlaista koodia

```python
from henkilo import Henkilo

# koodi
```

ratkaisusi on todennäköisesti väärä! Lisää importin käytöstä [osan 7](/osa-7/1-moduulit/) materiaalissa.

<programming-exercise name='Pets' tmcname='part09-06_pets'>

The exercise template contains the outlines of two classes: `Person` and `Pet`. Each person has one pet. Please change the `__str__` method in the class `Person` so that it also prints out information about the person's pet as shown in the example below.

The string returned by the method _must follow the format specified below exactly_.

```python
hulda = Pet("Hulda", "mixed-breed dog")
levi = Person("Levi", hulda)

print(levi)
```

<sample-output>

Levi, whose pal is Hulda, a mixed-breed dog

</sample-output>

**NB:** all class definitions are in the same text file. You should not need to `import` anything.

</programming-exercise>

## Olion attribuuttina lista olioita

Äskeisissä esimerkeissä oliolla oli attribuuttina yksittäinen toisen luokan olio, esim. henkilöllä attribuuttina lemmikki ja opintosuorituksella attribuuttina kurssi.

Olio-ohjelmoinnissa törmätään kutenkin usein tilanteeseen, jossa oliolla on attribuuttina _joukko_ toisen luokan oliota. Eräs tälläinen tilanne kuvaa joukkueen ja sen pelaajien välistä yhteyttä:

```python
class Pelaaja:
    def __init__(self, nimi: str, maalit: int):
        self.nimi = nimi
        self.maalit = maalit

    def __str__(self):
        return f"{self.nimi} (maaleja {self.maalit})"

class Joukkue:
    def __init__(self, nimi: str):
        self.nimi = nimi
        self.pelaajat = []

    def lisaa_pelaaja(self, pelaaja: Pelaaja):
        self.pelaajat.append(pelaaja)

    def yhteenveto(self):
        maalit = []
        for pelaaja in self.pelaajat:
            maalit.append(pelaaja.maalit)
        print("Joukkue", self.nimi)
        print("Pelaajia", len(self.pelaajat))
        print("Pelaajien maalimäärät", maalit)
```

Käyttöesimerkki:

```python
kupa = Joukkue("Kumpulan pallo")
kupa.lisaa_pelaaja(Pelaaja("Erkki", 10))
kupa.lisaa_pelaaja(Pelaaja("Emilia", 22))
kupa.lisaa_pelaaja(Pelaaja("Antti", 1))
kupa.yhteenveto()
```

<sample-output>

Joukkue Kumpulan pallo
Pelaajia 3
Pelaajien maalimäärät [10, 22, 1]

</sample-output>

<programming-exercise name='A box of presents' tmcname='part09-07_box_of_presents'>

In this exercise you will practice wrapping presents. You will write two classes: `Present` and `Box`. A present has a name and a weight, and a box contains presents.

## The Present class

Please define the class `Present` which can be used to represent different kinds of presents. The class definition should contain attributes for the name and the weight (in kg) of the present. Instances of the class should work as follows:

```python
book = Present("ABC Book", 2)

print("The name of the present:", book.name)
print("The weight of the present:", book.weight)
print("Present:", book)
```

This should print out

<sample-output>

The name of the present: ABC Book
The weight of the present: 2
Present: ABC Book (2 kg)

</sample-output>

## The Box class

Please define the class `Box`. You should be able to add presents to the box, and the box should keep track of the combined weight of the presents within. The class definition should contain these methods:

- `add_present(self, present: Present)` which adds the present given as an argument to the box. The method has no return value.
- `total_weight(self)` which returns the combined weight of the presents in the box.

You may use the following code to test your class:

```python
book = Present("ABC Book", 2)

box = Box()
box.add_present(book)
print(box.total_weight())

cd = Present("Pink Floyd: Dark side of the moon", 1)
box.add_present(cd)
print(box.total_weight())
```

<sample-output>

2
3

</sample-output>

</programming-exercise>

## None eli viite ei mihinkään

Pythonissa muuttujat viittaavat aina johonkin olioon. On kuitenkin tilanteita, joissa haluaisimme määrittää arvon, joka ei viittaa mihinkään. Arvoa `None` käytetään esittämään tyhjää viittausta.

Jos esimerkiksi luokkaan joukkue lisättäisiin metodi, joka etsii joukkueen pelaajan, saattaisi olla luontevaa esittää paluuarvolla `None` tilanne, jossa pelaajaa ei löydy:

```python
class Pelaaja:
    def __init__(self, nimi: str, maalit: int):
        self.nimi = nimi
        self.maalit = maalit

    def __str__(self):
        return f"{self.nimi} (maaleja {self.maalit})"

class Joukkue:
    def __init__(self, nimi: str):
        self.nimi = nimi
        self.pelaajat = []

    def lisaa_pelaaja(self, pelaaja: Pelaaja):
        self.pelaajat.append(pelaaja)

    def etsi(self, nimi: str):
        for pelaaja in self.pelaajat:
            if pelaaja.nimi == nimi:
                return pelaaja
        return None
```

Käyttöesimerkki:

```python
kupa = Joukkue("Kumpulan pallo")
kupa.lisaa_pelaaja(Pelaaja("Erkki", 10))
kupa.lisaa_pelaaja(Pelaaja("Emilia", 22))
kupa.lisaa_pelaaja(Pelaaja("Antti", 1))

pelaaja1 = kupa.etsi("Antti")
print(pelaaja1)
pelaaja2 = kupa.etsi("Jukkis")
print(pelaaja2)
```

<sample-output>

Antti (maaleja 1)
None

</sample-output>

`None`-arvojen kanssa pitää olla tarkkana. On hyvin tyypillistä, että ohjelmassa kutsutaan jotain metodia oliolle (tai pyydetään attribuutin arvoa oliolta), joka onkin `None`:

```python
kupa = Joukkue("Kumpulan pallo")
kupa.lisaa_pelaaja(Pelaaja("Erkki", 10))

pelaaja = kupa.etsi("Jukkis")
print(f"Jukkiksen maalimäärä {pelaaja.maalit}")
```

Jos näin tehdään, ohjelma päättyy virheeseen:

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'NoneType' object has no attribute 'maalit'

</sample-output>

`None`-arvojen varalta onkin syytä tehdä tarkistus, ennen kuin riskialtista koodia kutsutaan:

```python
kupa = Joukkue("Kumpulan pallo")
kupa.lisaa_pelaaja(Pelaaja("Erkki", 10))

pelaaja = kupa.etsi("Jukkis")
if pelaaja is not None:
    print(f"Jukkiksen maalimäärä {p.maalit}")
else:
    print(f"Jukkis ei pelaa Kumpulan pallossa :(")
```

<sample-output>

Jukkis ei pelaa Kumpulan pallossa :(

</sample-output>

<programming-exercise name='The shortest person in the room' tmcname='part09-08_shortest_in_room'>

The exercise template contains the class `Person`. A person has a name and a height. In this exercise you will implement the class `Room`. You may add any number of persons to a room, and you may also search for and remove the shortest person from the room.

## Room

Please define the class `Room`. It should have a list of persons as an attribute, and also contain the following methods:

- `add(person: Person)` adds the person given as an argument to the room.
- `is_empty()` returns `True` or `False` depending on whether the room is empty.
- `print_contents()` prints out the contents of the list of persons in the room.

Please have a look at the following usage example:

```python
room = Room()
print("Is the room empty?", room.is_empty())
room.add(Person("Lea", 183))
room.add(Person("Kenya", 182))
room.add(Person("Ally", 186))
room.add(Person("Nina", 172))
room.add(Person("Dorothy", 185))
print("Is the room empty?", room.is_empty())
room.print_contents()
```

<sample-output>

Is the room empty? True
Is the room empty? False
There are 5 persons in the room, and their combined height is 908 cm
Lea (183 cm)
Kenya (182 cm)
Ally (186 cm)
Nina (172 cm)
Dorothy (185 cm)

</sample-output>

## The shortest person

Please define the method `shortest()` within the `Room` class definition. The method should return the shortest person in the room it is called on. If the room is empty, the method should return `None`. The method should _not_ remove the person fron the room.

```python
room = Room()

print("Is the room empty?", room.is_empty())
print("Shortest:", room.shortest())

room.add(Person("Lea", 183))
room.add(Person("Kenya", 182))
room.add(Person("Nina", 172))
room.add(Person("Ally", 186))

print()

print("Is the room empty?", room.is_empty())
print("Shortest:", room.shortest())

print()

room.print_contents()
```

<sample-output>

Is the room empty? True
Shortest: None

Is the room empty? False
Shortest: Nina

There are 4 persons in the room, and their combined height is 723 cm
Lea (183 cm)
Kenya (182 cm)
Nina (172 cm)
Ally (186 cm)

</sample-output>

## Removing a person from the room

Please define the method `remove_shortest()` within the `Room` class definition. The method should remove the shortest `Person` object from the room and return the reference to the object. If the rom is empty, the method should return `None`.

```python
room = Room()

room.add(Person("Lea", 183))
room.add(Person("Kenya", 182))
room.add(Person("Nina", 172))
room.add(Person("Ally", 186))
room.print_contents()

print()

removed = room.remove_shortest()
print(f"Removed from room: {removed.name}")

print()

room.print_contents()
```

<sample-output>

There are 4 persons in the room, and their combined height is 723 cm
Lea (183 cm)
Kenya (182 cm)
Nina (172 cm)
Ally (186 cm)

Removed from room: Nina

There are 3 persons in the room, and their combined height is 551 cm
Lea (183 cm)
Kenya (182 cm)
Ally (186 cm)

</sample-output>

**Hint**: in [part 4](/part-4/3-lists#removing-items-from-a-list) you will find instructions for removing items from a list.

**Hint2**: it is always possible to call another method of the same class from within a method. The following should work just fine:

```python
class Room:
    # ...
    def shortest(self):
        # your code goes here

    def remove_shortest(self):
        shortest_person = self.shortest()
        # ...
```

</programming-exercise>

