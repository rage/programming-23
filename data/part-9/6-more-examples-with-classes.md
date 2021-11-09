---
path: '/part-9/6-more-examples-with-classes'
title: 'More examples with classes'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be familiar with some more examples of classes and objects
- You will be able to use default values for parameters in your methods

</text-box>

**This translation will be finished on Tuesday 9.11., apologies for tardiness!**

The following example consists of two classes. The class `Point` is a model for a point in a two-dimensional space. The class `Line` is model for a line segment between two points. The code below is commented; please read the comments in order to understand how the classes work.

```python
import math

class Piste:
    """ Luokka mallintaa pistettä kaksiulotteisessa koordinaatistossa """

    def __init__(self, x: float, y: float):
        # Attribuutit ovat julkisia, koska mitkä tahansa arvot käyvät x:n ja y:n arvoiksi
        self.x = x
        self.y = y

    # Luokkametodi palauttaa uuden pisteen paikassa (0, 0)
    # Huomaa, että luokan sisältä voi palauttaa olion luokasta
    @classmethod
    def origo(cls):
        return Piste(0, 0)

    # Luokkametodi muodostaa uuden pisteen annetun pisteen perusteella
    # Uusi piste on peilikuva annetusta pisteestä jommankumman tai molempien akselien suhteen
    # Esimerkiksi pisteen (1, 3) peilikuva x-akselin suhteen on (1, -3)
    @classmethod
    def peilikuva(cls, piste, peilaa_x: bool, peilaa_y: bool):
        x = piste.x
        y = piste.y
        if peilaa_x:
            y = -y
        if peilaa_y:
            x = -x

        return Piste(x, y)

    def __str__(self):
        return f"({self.x}, {self.y})"

class Jana:
    """ Luokka mallintaa janaa kaksiulotteisessa koordinaatistossa """

    def __init__(self, alku: Piste, loppu: Piste):
        # Attribuutit ovat julkisia, koska mitkä tahansa pisteet kelpaavat
        self.alku = alku
        self.loppu = loppu

    # Metodi laskee janan pituuden Pythagoraan lauseella
    def pituus(self):
        summa = (self.loppu.x - self.alku.x) ** 2 + (self.loppu.y - self.alku.y) ** 2
        return math.sqrt(summa)

    # Metodi palauttaa janan keskipisteen
    def keskipiste(self):
        keskix = (self.alku.x + self.loppu.x) / 2
        keskiy = (self.alku.y + self.loppu.y) / 2
        return Piste(keskix, keskiy)

    def __str__(self):
        return f"{self.alku} ... {self.loppu}"
```

```python
piste = Piste(1,3)
print(piste)

origo = Piste.origo()
print(origo)

piste2 = Piste.peilikuva(piste, True, True)
print(piste2)

jana = Jana(piste, piste2)
print(jana.pituus())
print(jana.keskipiste())
print(jana)
```

<sample-output>

(1, 3)
(0, 0)
(-1, -3)
6.324555320336759
(0.0, 0.0)
(1, 3) ... (-1, -3)

</sample-output>

## Parametrien oletusarvot

Pythonissa mille tahansa parametrille voidaan asettaa oletusarvo. Oletusarvoja voidaan käyttää sekä funktioiden että metodien parametreissa.

Jos parametrille on annettu oletusarvo, sille ei ole pakko antaa arvoa kutsuttaessa. Jos arvo annetaan, se syrjäyttää oletusarvon, ja jos arvoa ei anneta, käytetään oletusarvoa.

Oletusarvot ovat usein hyödyllisiä konstruktoreissa: jos on oletettavaa, ettei tiettyä tietoa ole aina olemassa oliota luodessa, on parempi antaa sille vakioarvo konstruktorissa kuin antaa tämä asiakkaan huoleksi. Tämä on asiakkaalle helpompaa ja myös ylläpitää olion sisäistä eheyttä, kun voidaan esimerkiksi olla varmoja, että "tyhjä" arvo on aina samanlainen (muuten se voisi olla esimerkiksi merkkijono `""`, arvo `None` tai merkkijono `"ei asetettu"`).

Tarkastellaan esimerkkinä luokkaa, joka mallintaa opiskelijaa. Pakollisia kenttiä luodessa ovat opiskelijanumero ja nimi ja näistä opiskelijanumeroa ei pysty myöhemmin muuttamaan. Opintopisteet ja muistiinpanot voi halutessaan antaa oliota luodessa, mutta niille on myös asetettu oletusarvot. Luokan toiminta on kommentoitu suoraan ohjelmakoodin yhteyteen.

```python
class Opiskelija:
    """ Mallintaa yhtä opiskelijaa """

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet:int = 0, muistiinpanot:str = ""):
        # kutsuu asetusmetodia
        self.nimi = nimi

        if len(opiskelijanumero) < 5:
            raise ValueError("Opiskelijanumerossa tulee olla vähintään 5 merkkiä")

        self.__opiskelijanumero = opiskelijanumero

        # Kutsuu asetusmetodia
        self.opintopisteet = opintopisteet

        self.__muistiinpanot = muistiinpanot

    @property
    def nimi(self):
        return self.__nimi

    @nimi.setter
    def nimi(self, nimi):
        if nimi != "":
            self.__nimi = nimi
        else:
            raise ValueError("Nimi ei voi olla tyhjä")

    @property
    def opiskelijanumero(self):
        return self.__opiskelijanumero

    @property
    def opintopisteet(self):
        return self.__opintopisteet

    @opintopisteet.setter
    def opintopisteet(self, op):
        if op >= 0:
            self.__opintopisteet = op
        else:
            raise ValueError("Opintopisteet ei voi olla negatiivinen luku")

    @property
    def muistiinpanot(self):
        return self.__muistiinpanot

    @muistiinpanot.setter
    def muistiinpanot(self, muistiinpanot):
        self.muistiinpanot = muistiinpanot

    def yhteenveto(self):
        print(f"Opiskelija {self.__nimi} ({self.opiskelijanumero}):")
        print(f"- opintopisteitä {self.__opintopisteet}")
        print(f"- muistiinpanot: {self.muistiinpanot}")
```

```python
# Annetaan pelkkä nimi ja op.nro
opiskelija1 = Opiskelija("Olli Opiskelija", "12345")
opiskelija1.yhteenveto()

# Annetaan nimi, op.nro ja opintopisteet
opiskelija2 = Opiskelija("Outi Opiskelija", "54321", 25)
opiskelija2.yhteenveto()

# Annetaan kaikki tiedot
opiskelija3 = Opiskelija("Olavi Opiskelija", "99999", 140, "lisäaika tentissä")
opiskelija3.yhteenveto()

# Ei anneta opintopisteitä, mutta annetaan muistiinpanot
# Huomaa, että parametri pitää nyt nimetä, kun järjestys eroaa tavallisesta
opiskelija4 = Opiskelija("Onerva Opiskelija", "98765", muistiinpanot="poissaoleva lukuvuonna 20-21")
opiskelija4.yhteenveto()
```

<sample-output>

Opiskelija Olli Opiskelija (12345):
- opintopisteitä 0
- muistiinpanot:
Opiskelija Outi Opiskelija (54321):
- opintopisteitä 25
- muistiinpanot:
Opiskelija Olavi Opiskelija (99999):
- opintopisteitä 140
- muistiinpanot: lisäaika tentissä
Opiskelija Onerva Opiskelija (98765):
- opintopisteitä 0
- muistiinpanot: poissaoleva lukuvuonna 20-21

</sample-output>

Huomaa, että attribuutille opiskelijanumero ei ole määritelty asetusmetodia, koska ideana on, että opiskelijanumero ei voi muuttua.

Parametrien oletusarvojen käyttöön liittyy kuitenkin eräs huomattavan iso "mutta" joka ilmenee seuraavasti esimerkistä:

```python
class Opiskelija:
    def __init__(self, nimi, tehdyt_kurssit=[]):
        self.nimi = nimi
        self.tehdyt_kurssit = tehdyt_kurssit

    def lisaa_suoritus(self, kurssi):
        self.tehdyt_kurssit.append(kurssi)
```

```python
opiskelija1 = Opiskelija("Olli Opiskelija")
opiskelija2 = Opiskelija("Outi Opiskelija")

opiskelija1.lisaa_suoritus("Ohpe")
opiskelija1.lisaa_suoritus("Tira")

print(opiskelija1.tehdyt_kurssit)
print(opiskelija2.tehdyt_kurssit)
```

<sample-output>

['Ohpe', 'Tira']
['Ohpe', 'Tira']

</sample-output>

Huomataan siis, että kurssisuorituksen lisääminen Ollille muuttaa myös Outin kurssisuorituksia. Ilmiö johtuu siitä, että Python uudelleenkäyttää oletusarvoa. Yllä oleva tapa luoda opiskelijat vastaa siis seuraavaa koodia:

```python
kurssit = []
opiskelija1 = Opiskelija("Olli Opiskelija", kurssit)
opiskelija2 = Opiskelija("Outi Opiskelija", kurssit)
```

Tästä johtuen parametrin oletusarvona ei koskaan tulisi käyttää monimutkaisempia tietorakenteita kuten listoja. Korjattu versio luokan `Opiskelija` konstruktorista on seuraava:

```python
class Opiskelija:
    def __init__(self, nimi, tehdyt_kurssit=None):
        self.nimi = nimi
        if tehdyt_kurssit is None:
            self.tehdyt_kurssit = []
        else:
            self.tehdyt_kurssit = tehdyt_kurssit

    def lisaa_suoritus(self, kurssi):
        self.tehdyt_kurssit.append(kurssi)
```

```python
opiskelija1 = Opiskelija("Olli Opiskelija")
opiskelija2 = Opiskelija("Outi Opiskelija")

opiskelija1.lisaa_suoritus("Ohpe")
opiskelija1.lisaa_suoritus("Tira")

print(opiskelija1.tehdyt_kurssit)
print(opiskelija2.tehdyt_kurssit)
```

<sample-output>

['Ohpe', 'Tira']
[]

</sample-output>

## Loppuhuipennus

Vaikka seuraava tehtävä on tässä luvussa, et tarvitse tehtävän ratkaisemiseen mitään muuta kun luvussa [Oliot attribuuttina](/osa-9/2-oliot-attribuuttina) esiteltyjä tekniikoita. Tehtävä on käytännössä hyvin samanlainen kuin tuon luvun  tehtävät [lahjapakkaus](/osa-9/2-oliot-attribuuttina#programming-exercise-lahjapakkaus) ja [huoneen lyhin](/osa-9/2-oliot-attribuuttina#programming-exercise-huoneen-lyhin).

<programming-exercise name='Item, Suitcase and Cargo hold' tmcname='part09-15_item_suitcase_hold'>

In this series of exercises you will create the classes `Item`, `Suitcase` and `Cargo Hold`, which will let you further practice working on objects which contain references to other objects.

## Item

Please create a class named `Item` which is used to create items of different kinds. Each item has a name and a weight (in kilograms).

You can use the following code to test your class:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)

print("Name of the book:", book.name())
print("Weight of the book:", book.weight())

print("Book:", book)
print("Phone:", phone)
```

Your program should print out this:

<sample-output>

Name of the book: ABC Book
Weight of the book: 2
Book: ABC Book (2 kg)
Phone: Nokia 3210 (1 kg)

</sample-output>

An `Item` should provide the methods `weight` and `name`, which return the values stored in those attributes.

The name and weight should be encapsulated within the class. The following code should not work:

```python
book = Item("ABC Book", 2)
book.weight = 10
```

## Suitcase

Please write a class named `Suitcase`. You should be able to pack items into a suitcase. A suitcase also has a maximum combined weight for the items stored within.

Your class should contains the following members:

- a constructor which takes the maximum weight as an argument
- a method named `add_item` which adds the item given as an argument to the suitcase. The method has no return value.
- a `__str__` method which returns a string in the format "x items (y kg)"

The class should make sure that the combined weight of the items stored within any `Suitcase` does not exceed the maximum weight set for that instance. If the maximum weight would be exceeded when the `add_item` method is called, the new item should not be added to the suitcase.

Your class should work as follows:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(5)
print(suitcase)

suitcase.add_item(book)
print(suitcase)

suitcase.add_item(phone)
print(suitcase)

suitcase.add_item(brick)
print(suitcase)
```

Executing the above should print out

<sample-output>

0 items (0 kg)
1 items (2 kg)
2 items (3 kg)
2 items (3 kg)

</sample-output>

## Mind your language

The notification "1 items" is not very grammatical. Instead, it should say "1 item". Please make the required changes to your `__str__` method.

The previous example should now print out

<sample-output>

0 items (0 kg)
1 item (2 kg)
2 items (3 kg)
2 items (3 kg)

</sample-output>

## All the items

Please add the following methods to your `Suitcase` class definition:

- `print_items` prints out all the items stored in the suitcase
- `weight` returns an integer number representing the combined weight of all the items stored in the suitcase

Your class should now work with the following program:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(10)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

print("The suitcase contains the following items:")
suitcase.print_items()
combined_weight = suitcase.weight()
print(f"Combined weight: {combined_weight} kg")
```

Executing the above program should print out this:

<sample-output>

The suitcase contains the following items:
ABC Book (2 kg)
Nokia 3210 (1 kg)
Brick (4 kg)
Combined weight: 7 kg

</sample-output>

If you have implemented your `Suitcase` class with more than two instance variables, please make the required changes so that each instance has only two data attributes: the maximum weight and a list of items within.

## The heaviest item

Please add a new method to your `Suitcase` class: `heaviest_item` should return the `Item` which is the heaviest. If there are two or more items with the same, heaviest weight, the method may return any one of these. The method should return a reference to an object. If the suitcase is empty, the method should return `None`.

Your class should now work with the following program:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(10)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

heaviest = suitcase.heaviest_item()
print(f"The heaviest item: {heaviest}")
```

Executing the above program should print out this:

<sample-output>

The heaviest item: Brick (4 kg)

</sample-output>

## Cargo hold

Please write a class named `CargoHold` with the following methods:

- a constructor which takes the maximum weight as an argument
- a method named `add_suitcase` which adds the suitcase given as an argument to the cargo hold
- a `__str__` method which returns a string in the format "x suitcases, space for y kg"

The class should make sure that the combined weight of the items stored within any `CargoHold` does not exceed the maximum weight set for that instance. If the maximum weight would be exceeded when the `add_suitcase` method is called, the new item should not be added to the cargo hold.

Your class should now work with the following program:

```python
cargo_hold = CargoHold(1000)
print(cargo_hold)

book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

adas_suitcase = Suitcase(10)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(10)
peters_suitcase.add_item(brick)

cargo_hold.add_suitcase(adas_suitcase)
print(cargo_hold)

cargo_hold.add_suitcase(peters_suitcase)
print(cargo_hold)
```

<sample-output>

0 suitcases, space for 1000 kg
1 suitcase, space for 997 kg
2 suitcases, space for 993 kg

</sample-output>

## The contents of the cargo hold

Please add a method named `print_items` to your `CargoHold` class. It should print out all the items in all the suitcases within the cargo hold.

Your class should now work with the following program:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

adas_suitcase = Suitcase(10)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(10)
peters_suitcase.add_item(brick)

cargo_hold = CargoHold(1000)
cargo_hold.add_suitcase(adas_suitcase)
cargo_hold.add_suitcase(peters_suitcase)

print("The suitcases in the cargo hold contain the following items:")
cargo_hold.print_items()
```

Executing the above program should print out this:

<sample-output>

The suitcases in the cargo hold contain the following items:
ABC Book (2 kg)
Nokia 3210 (1 kg)
Brick (4 kg)

</sample-output>

</programming-exercise>

Please respond to a quick questionnaire on this week's materials.

<quiz id="c5152550-712f-52c2-9188-adacb8f455ed"></quiz>

