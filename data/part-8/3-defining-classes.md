---
path: '/part-8/3-defining-classes'
title: 'Defining classes'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, miten omia luokkia määritellään
- Osaat muodostaa itse määritellystä luokasta olion
- Osaat kirjoittaa konstruktorin
- Tiedät, mitä tarkoittaa avainsana `self`
- Tiedät, mitä ovat attribuutit ja miten niitä käytetään

</text-box>

Luokka määritellään avainsanan `class` avulla. Syntaksi on

```python
class LuokanNimi:
    # Luokan toteutus
```

Luokat nimetään yleensä _camel case_ -käytännöllä niin, että sanat kirjoitetaan yhteen ja jokainen sana alkaa isolla alkukirjaimella. Esimerkiksi seuraavat ovat tämän käytännön mukaisia luokkien nimiä:

* `Pankkitili`
* `OhjelmaApuri`
* `KirjastoTietokanta`
* `PythonKurssinArvosanat`

Yhdellä luokalla pyritään mallintamaan jokin sellainen yksittäinen kokonaisuus, jonka sisältämät tiedot liittyvät kiinteästi yhteen. Monimutkaisemmissa ratkaisuissa luokka voi sisältää toisia luokkia (esimerkiksi luokka `Kurssi` voisi sisältää luokan `Osasuoritus` mukaisia olioita).

Tarkastellaan esimerkkinä yksinkertaista luokkamäärittelyä, josta sisältö vielä puuttuu:

```python
class Pankkitili:
    pass
```

Koodissa määritellään luokka, jonka nimi on `Pankkitili`. Luokalle ei ole määritelty varsinaista sisältöä, mutta tästä huolimatta luokasta voidaan muodostaa olio.

Tarkastellaan ohjelmaa, jossa luokasta muodostetun olion sisälle on määritelty kaksi muuttujaa, `saldo` ja `omistaja`. Olion muuttujia kutsutaan _attribuuteiksi_. Attribuutista käytetään myös nimitystä _oliomuuttuja_.

Kun luokasta luodaan olio, voidaan attribuuttien arvoja käsitellä olion kautta:

```python
class Pankkitili:
    pass

pekan_tili = Pankkitili()
pekan_tili.omistaja = "Pekka Python"
pekan_tili.saldo = 5.0

print(pekan_tili.omistaja)
print(pekan_tili.saldo)
```

<sample-output>

Pekka Python
5.0

</sample-output>

Attribuutit ovat käytettävissä ainoastaan sen olion kautta, jossa ne on määritelty. Pankkitili-luokasta muodostetuilla olioilla on jokaisella omat arvonsa attribuuteille. Attribuuttien arvot haetaan olioiden kautta, esimerkiksi näin:

```python
tili = Pankkitili()
tili.saldo = 155.50

print(tili.saldo) # Viittaa tilin attribuuttiin saldo
print(saldo) # TÄSTÄ TULEE VIRHE, koska oliomuuttuja ei ole mukana!
```

## Konstruktorin lisääminen

Kuten edellisestä esimerkistä huomataan, luokasta voi luoda uuden olion kutsumalla konstruktoria, joka on muotoa `LuokanNimi()`. Yleensä olisi kuitenkin kätevä antaa attribuuteille arvot heti kun olio luodaan – nyt esimerkiksi Pankkitilin omistaja ja saldo asetetaan vasta, kun pankkitiliolio on luotu.

Attribuuttien asettamisessa ilman konstruktoria on myös se ongelma, että samasta luokasta luoduilla olioilla voi olla eri attribuutit. Seuraava ohjelmakoodi esimerkiksi antaa virheen, koska oliolle `pirjon_tili` ei ole määritelty attribuuttia `saldo`:

```python
class Pankkitili:
    pass

pekan_tili = Pankkitili()
pekan_tili.omistaja = "Pekka"
pekan_tili.saldo = 1400

pirjon_tili = Pankkitili()
pirjon_tili.omistaja = "Pirjo"

print(pekan_tili.saldo)
print(pirjon_tili.saldo) # TÄSTÄ TULEE VIRHE
```

Sen sijaan että attribuuttien arvot alustettaisiin luokan luomisen jälkeen, on huomattavasti parempi ajatus alustaa arvot samalla, kun luokasta luodaan olio.

Konstruktori kirjoitetaan luokan sisään metodina `__init__` yleensä heti luokan alkuun.

Tarkastellaan `Pankkitili`-luokkaa, johon on lisätty konstruktori:

```python
class Pankkitili:

    # Konstruktori
    def __init__(self, saldo: float, omistaja: str):
        self.saldo = saldo
        self.omistaja = omistaja
```

Konstruktorin nimi on aina `__init__`. Huomaa, että nimessä sanan `init` molemmilla puolilla on _kaksi alaviivaa_.

Konstruktorin ensimmäinen parametri on nimeltään `self`. Tämä viittaa olioon, jota käsitellään. Asetuslause

`self.saldo = saldo`

asettaa parametrina annetun saldon luotavan olion saldoksi. On tärkeä huomata, että tässä yhteydessä muuttuja `self.saldo` on eri muuttuja kuin muuttuja `saldo`:

* Muuttuja `self.saldo` viittaa olion attribuuttiin. Jokaisella Pankkitili-luokan oliolla on oma saldonsa.

* Muuttuja `saldo` on konstruktorimetodin `__init__` parametri, jolle annetaan arvo, kun metodia kutsutaan (eli kun halutaan luoda uusi olio luokasta).

Nyt kun konstruktorille on määritelty parametrit, voidaan attribuuttien arvot antaa oliota luotaessa:

```python
class Pankkitili:

    # Konstruktori
    def __init__(self, saldo: float, omistaja: str):
        self.saldo = saldo
        self.omistaja = omistaja

# Parametrille self ei anneta arvoa, vaan Python antaa sen
# automaattisesti
pekan_tili = Pankkitili(100, "Pekka Python")
pirjon_tili = Pankkitili(20000, "Pirjo Pythonen")

print(pekan_tili.saldo)
print(pirjon_tili.saldo)
```

<sample-output>

100
20000

</sample-output>

Esimerkistä huomataan, että olioiden luominen helpottuu, kun arvot voidaan antaa heti oliota muodostaessa. Samalla tämä varmistaa, että arvojen antaminen ei unohdu, ja ohjaa käyttäjää antamaan arvot attribuuteille.

Attribuuttien arvoja voi edelleen muuttaa myöhemmin ohjelmassa, vaikka alkuarvo olisikin annettu konstruktorissa:

```python
class Pankkitili:

    # Konstruktori
    def __init__(self, saldo: float, omistaja: str):
        self.saldo = saldo
        self.omistaja = omistaja

pekan_tili = Pankkitili(100, "Pekka Python")
print(pekan_tili.saldo)

# Saldoksi 1500
pekan_tili.saldo = 1500
print(pekan_tili.saldo)

# Lisätään saldoon 2000
pekan_tili.saldo += 2000
print(pekan_tili.saldo)
```

<sample-output>

100
1500
3500

</sample-output>

Tarkastellaan vielä toista esimerkkiä luokasta ja olioista. Kirjoitetaan luokka, joka mallintaa yhtä lottokierrosta:

```python
from datetime import date

class LottoKierros:

    def __init__(self, viikko: int, pvm: date, numerot: list):
        self.viikko = viikko
        self.pvm = pvm
        self.numerot = numerot


# Luodaan uusi lottokierros
kierros1 = LottoKierros(1, date(2021, 1, 2), [1,4,8,12,13,14,33])

# Tulostetaan tiedot
print(kierros1.viikko)
print(kierros1.pvm)

for numero in kierros1.numerot:
    print(numero)
```

<sample-output>

1
2021-01-02
1
4
8
12
13
14
33

</sample-output>

Attribuutit voivat olla siis minkä tahansa tyyppisiä – esimerkiksi edellisessä esimerkissä jokaiseen olioon tallennetaan lista ja päivämäärä.


<programming-exercise name='Book' tmcname='part08-05_book'>

Please write a class named `Book` with the attributes `name`, `author`, `genre` and `year`, along with a constructor which assigns initial values to these attributes.

Your class should work like this:

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)

print(f"{python.author}: {python.name} ({python.year})")
print(f"The genre of the book {everest.name} is {everest.genre}")
```

<sample-output>

Luciano Ramalho: Fluent Python (2015)
The genre of the book High Adventure is autobiography

</sample-output>

</programming-exercise>

<programming-exercise name='Three classes' tmcname='part08-06_three_classes'>

Please write the three classes specified below. Each class should have exactly the same names and types of attributes as listed.

Please also include a constructor in each class. The constructor should take the initial values of the attributes as its arguments, in the order listed below.

1. Class Checklist
- attribute header (string)
- attribute entries (list)

2. Class Customer
- attribute id (string)
- attribute balance (float)
- attribute discount (integer)

3. Class Cable
- attribute model (string)
- attribute length (float)
- attribute max_speed (integer)
- attribute bidirectional (Boolean)

</programming-exercise>

## Omien luokkien olioiden käyttö

Omasta luokasta muodostetut oliot käyttäytyvät esimerkiksi funktioiden parametrina ja paluuarvona samalla tavalla kuin muutkin oliot. Voisimme esimerkiksi tehdä pari apufunktiota tilien käsittelyyn:

```python
# funktio luo uuden tiliolion ja palauttaa sen
def avaa_tili(nimi: str):
    uusi_tili =  Pankkitili(0, nimi)
    return uusi_tili

# funktio asettaa parametrina saamansa rahasumman parametrina olevalle tilille
def laita_rahaa_tilille(tili: Pankkitili, summa: int):
    tili.saldo += summa

pekan_tili = avaa_tili("Pekka Python")
print(pekan_tili.saldo)

laita_rahaa_tilille(pekan_tili, 500)

print(pekan_tili.saldo)
```

<sample-output>

0
500

</sample-output>

<programming-exercise name='Define class: Pet' tmcname='part08-07_pet'>

Please define the class `Pet`. The class should include a constructor, which takes the initial values of the attributes `name`, `species` and `year_of_birth` as its arguments, in that specific order.

Please also write a function named `new_pet(name: str, species: str, year_of_birth: int)` _outside the class definition_. The function should create and return a new object of type `Pet`, as defined in the class `Pet`.

An example of how the function is used:

```python
fluffy = new_pet("Fluffy", "dog", 2017)
print(fluffy.name)
print(fluffy.species)
print(fluffy.year_of_birth)
```

<sample-output>

Fluffy
dog
2017

</sample-output>

</programming-exercise>

<programming-exercise name='The older book' tmcname='part08-08_older_book'>

Please write a function named `older_book(book1: Book, book2: Book)` which takes two objects of type `Book` as its arguments. The function should print out a message with the details of whichever is the older. It should print out a different message if the two books were written in the same year. Please see the examples below.

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)
norma = Book("Norma", "Sofi Oksanen", "crime", 2015)

older_book(python, everest)
older_book(python, norma)
```

<sample-output>

High Adventure is older, it was published in 1956
Fluent Python and Norma were published in 2015

</sample-output>

</programming-exercise>

<programming-exercise name='Books of a genre' tmcname='part08-09_books_of_genre'>

Please write a function named `books_of_genre(books: list, genre: str)` which takes a list of objects of type `Book` and a string representing a genre as its arguments.

The function should return a _new_ list, which contains the books with the desired genre from the original list. Please see the examples below.

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)
norma = Book("Norma", "Sofi Oksanen", "crime", 2015)

books = [python, everest, norma, Book("The Snowman", "Jo Nesbø", "crime", 2007)]

print("Books in the crime genre:")
for book in books_of_genre(books, "crime"):
    print(f"{book.author}: {book.name}")
```

<sample-output>

Books in the crime genre:
Sofi Oksanen: Norma
Jo Nesbø: The Snowman

</sample-output>

</programming-exercise>
