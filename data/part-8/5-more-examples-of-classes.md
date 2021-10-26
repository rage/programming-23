---
path: '/part-8/5-more-examples-of-classes'
title: 'More examples of classes'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Osaat luoda aiempaa monipuolisempia luokkia
- Osaat määritellä luokkaan metodin `__str__`

</text-box>


## Esimerkki 1: Luokka Suorakulmio

Tarkastellaan seuraavaksi luokkaa, joka mallintaa suorakulmiota kaksiulotteisessa koordinaatistossa:

```python
class Suorakulmio:
    def __init__(self, vasen_ylakulma: tuple, oikea_alakulma: tuple):
        self.vasen_ylakulma = vasen_ylakulma
        self.oikea_alakulma = oikea_alakulma
        self.leveys = oikea_alakulma[0]-vasen_ylakulma[0]
        self.korkeus = oikea_alakulma[1]-vasen_ylakulma[1]

    def pinta_ala(self):
        return self.leveys * self.korkeus

    def piiri(self):
        return self.leveys * 2 + self.korkeus * 2

    def siirra(self, x_muutos: int, y_muutos: int):
        kulma = self.vasen_ylakulma
        self.vasen_ylakulma = (kulma[0]+x_muutos, kulma[1]+y_muutos)
        kulma = self.oikea_alakulma
        self.oikea_alakulma = (kulma[0]+x_muutos, kulma[1]+y_muutos)
```

Kun suorakulmio luodaan, konstruktorille annetaan kaksi tuplea: vasemman yläkulman ja oikean alakulman sijainti (x- ja y-koordinaatit). Konstruktori laskee tämän perusteella suorakulmion leveyden ja korkeuden.

Metodit `pinta_ala` ja `piiri` laskevat suorakulmion pinta-alan ja piirin korkeuden ja leveyden perusteella. Metodi `siirra` puolestaan siirtää suorakulmiota koordinaatistossa annetun verran x- ja y-suunnissa.

Huomaa, että suorakulmio esitetään koordinaatistossa, jossa x-koordinaatit kasvavat vasemmalta oikealle ja y-koordinaatit kasvavat ylhäältä alaspäin. Tämä on usein käytetty koordinaatisto ohjelmoinnissa, koska on luontevaa esittää tietokoneen näyttö niin, että vasemman yläkulman x- ja y-koordinaatti on 0.

Seuraava koodi testaa luokkaa:

```python
suorakulmio = Suorakulmio((1, 1), (4, 3))
print(suorakulmio.vasen_ylakulma)
print(suorakulmio.oikea_alakulma)
print(suorakulmio.leveys)
print(suorakulmio.korkeus)
print(suorakulmio.piiri())
print(suorakulmio.pinta_ala())

suorakulmio.siirra(3, 3)
print(suorakulmio.vasen_ylakulma)
print(suorakulmio.oikea_alakulma)
```

<sample-output>

(1, 1)
(4, 3)
3
2
10
6
(4, 4)
(7, 6)

</sample-output>

## Olion tulostaminen

Kun omasta luokasta luotu olio tulostetaan sellaisenaan `print`-komennolla, lopputulos ei ole kovin selkeä:

```python
suorakulmio = Suorakulmio((1, 1), (4, 3))
print(suorakulmio)
```

Ohjelma tulostaa jotain seuraavankaltaista:

<sample-output>

<__main__.Suorakulmio object at 0x000002D7BF148A90>

</sample-output>

Järkevämpi tulostus saadaan lisäämällä luokkaan metodi `__str__`, joka palauttaa ymmärrettävän kuvauksen olion tilasta merkkijonona. Kun tämä metodi on määritelty, metodin palauttama kuvaus oliosta tulee näkyviin `print`-komennossa.

Lisätään luokkaan `Suorakulmio` metodi `__str__`:

```python
class Suorakulmio:

    # Luokan muu sisältö tähän kuten ennenkin...

    # Metodi palauttaa olion tilan merkkijonona
    def __str__(self):
        return f"suorakulmio {self.vasen_ylakulma} ... {self.oikea_alakulma}"
```

Nyt `print`-komento tuottaa luettavan lopputuloksen:

```python
suorakulmio = Suorakulmio((1, 1), (4, 3))
print(suorakulmio)
```

<sample-output>

suorakulmio (1, 1) ... (4, 3)

</sample-output>

Metodia `__str__` kutsutaan yleisemmin silloin, kun oliosta muodostetaan merkkijonokuvaus `str`-funktiolla. Seuraava koodi esittelee asiaa:

```python
suorakulmio = Suorakulmio((1, 1), (4, 3))
kuvaus = str(suorakulmio)
print(kuvaus)
```

<sample-output>

suorakulmio (1, 1) ... (4, 3)

</sample-output>


Metodin `__str__` lisäksi olioon voidaan määritellä samantapainen metodi `__repr__`, joka antaa teknisen kuvauksen olion tilasta. Tutustumme tähän metodiin tarkemmin myöhemmin.

<programming-exercise name='Stopwatch' tmcname='part08-13_stopwatch'>

The exercise template contains the following skeleton for the `Stopwatch` class:

```python
class Stopwatch:
    def __init__(self):
        self.seconds = 0
        self.minutes = 0
```

Please add to the class definition so that it works as follows:

```python
watch = Stopwatch()
for i in range(3600):
    print(watch)
    watch.tick()
```

<sample-output>

00:00
00:01
00:02
... many more lines printed out
00:59
01:00
01:01
... many, many more lines printed out
59:58
59:59
00:00
00:01

</sample-output>

So, the method `tick` adds one second to the stopwatch. The maximum value for both seconds and minutes is 59. Your class definition should also contain a `__str__` method, which returns a string representation of the state of the stopwatch, as shown in the example above.

**Hint:** it might make it easier to test the `tick` method if you temporarily set the initial values of the seconds and minutes to some value closer to 59 in the constructor. If you do change the initial values, remember to change them back before submitting.

</programming-exercise>

<programming-exercise name='Clock' tmcname='part08-14_clock'>

Please define a new class named `Clock` which expands on the capabilities of your `Stopwatch` class. It should work as follows:

```python
clock = Clock(23, 59, 55)
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)

clock.set(12, 5)
print(clock)
```

<sample-output>
23:59:55
23:59:56
23:59:57
23:59:58
23:59:59
00:00:00
00:00:01
12:05:00
</sample-output>

As you can see above, the constructor should take initial values for the hours, minutes and seconds as arguments, and set these appropriately. The `tick` method adds one second to the clock. The `set` method sets new values for the hours and the minutes, and _sets the seconds to zero_.

</programming-exercise>

<programming-exercise name='LunchCard' tmcname='part08-15_lunchcard'>

At Unicafe, the student cafeteria at the University of Helsinki, students can pay for their lunch with a special debit card.

In this exercise you will write a class called `LunchCard`, with the purpose of emulating the functions provided by the cafeteria's debit card.

### The structure of the new class

Please create a new class named `LunchCard`.

First write the constructor for the class. It should take the initial balance available on the card as an argument, and save it as an attribute. This is provided for you in the skeleton below.

Next, write a `__str__` method, which returns a string containing the balance: "The balance is X euros". The available balance should be printed out with one decimal place precision. Please see the example below for usage.

Here is a skeleton implementation for the class:

```python
class LunchCard:
    def __init__(self, balance: float):
        self.balance = balance

    def __str__(self):
        pass
```

A usage example:

```python
card = LunchCard(50)
print(card)
```

Executing the above should produce the following printout:

<sample-output>

The balance is 50.0 euros

</sample-output>

### Paying for lunch

Please implement the following methods in your LunchCard class:

- `eat_lunch` subtracts 2.60 euros from the balance on the card
- `eat_special` subtracts 4.60 euros from the balance on the card

You can use the following main function to test your class:

```python
card = LunchCard(50)
print(card)

card.eat_lunch()
print(card)

card.eat_special()
card.eat_lunch()
print(card)
```

This should produce the following printout:

<sample-output>

The balance is 50.0 euros
The balance is 47.4 euros
The balance is 40.2 euros

</sample-output>

Make sure the balance is never allowed to reach numbers below zero:

```python
card = LunchCard(4)
print(card)

card.eat_lunch()
print(card)

card.eat_lunch()
print(card)
```

<sample-output>

The balance is 4.0 euros
The balance is 1.4 euros
The balance is 1.4 euros

</sample-output>

If there is not enough money on the card to pay for the lunch, the price of the lunch should not be subtracted from the balance.

### Depositing money on the card

Implement the `deposit_money` method in your `LunchCard` class.

The method increases the balance on the card by the amount given as an argument.

```python
card = LunchCard(10)
print(card)
card.deposit_money(15)
print(card)
card.deposit_money(10)
print(card)
card.deposit_money(200)
print(card)
```

<sample-output>

The balance is 10.0 euros
The balance is 25.0 euros
The balance is 35.0 euros
The balance is 235.0 euros

</sample-output>

The method should account for arguments below zero by [raising an exception](/part-6/3-errors#raising-exceptions) of type `ValueError`:

```python
card = LunchCard(10)
card.deposit_money(-10)
```

<sample-output>

File "testi.py", line 3, in lunchcard
ValueError: You cannot deposit an amount of money less than zero

</sample-output>

**NB:** this method should _raise_ an exception. Please see the instructions for raising exceptions in [part 6](/part-6/3-errors#raising-exceptions). Under no circumstances should the method itself print out anything - the example above is a printout from the Python interpreter coming across the exception.

### Multiple cards

Please write a main function which contains the following sequence of events:

- Create a lunch card for Peter. The initial balance on the card is 20 euros.
- Create a lunch card for Grace. The initial balance on the card is 30 euros.
- Peter eats a regular lunch
- Grace eats the special
- _Print out the balance on each card (on separate lines, with the name of the owner at the beginning of the line)_
- Peter deposits 20 euros
- Grace eats the special
- _Print out the balance on each card (on separate lines, with the name of the owner at the beginning of the line)_
- Peter eats a regular lunch
- Peter eats a regular lunch
- Grace deposits 50 euros
- _Print out the balance on each card (on separate lines, with the name of the owner at the beginning of the line)_

Pääohjelman runko

```python
peters_card = LunchCard(20)
graces_card = LunchCard(30)
# the rest of your main function
```

Your main function should print out exactly the following:

<sample-output>

Peter: The balance is 15.4 euros
Grace: The balance is 27.4 euros
Peter: The balance is 35.4 euros
Grace: The balance is 22.8 euros
Peter: The balance is 30.2 euros
Grace: The balance is 72.8 euros

</sample-output>

</programming-exercise>

## Esimerkki 2: Tehtävälista

Seuraava luokka `Tehtavalista` toteuttaa tehtävälistan:

```python
class Tehtavalista:
    def __init__(self):
        self.tehtavat = []

    def lisaa(self, nimi: str, prioriteetti: int):
        self.tehtavat.append((prioriteetti, nimi))

    def hae_seuraava(self):
        self.tehtavat.sort()
        # Metodi pop poistaa ja palauttaa listan viimeisen alkion
        tehtava = self.tehtavat.pop()
        # Palautetaan tuplen jälkimmäinen osa eli tehtävän nimi
        return tehtava[1]

    def yhteensa(self):
        return len(self.tehtavat)

    def tyhjenna(self):
        self.tehtavat = []
```

Metodi `lisaa` lisää listalle uuden tehtävän tietyllä prioriteetilla ja metodi `hae_seuraava` poistaa ja palauttaa listan suurimman prioriteetin tehtävän. Lisäksi metodi `yhteensa` antaa listan tehtävien yhteismäärän ja metodi `tyhjenna` tyhjentää listan.

Tehtäviä säilytetään sisäisesti listassa, jossa on tuplena kunkin tehtävän prioriteetti ja nimi. Prioriteetti tallennetaan ensin, jolloin tärkein tehtävä on listan lopussa listan järjestämisen jälkeen. Tämän ansiosta tehtävän saa haettua ja poistettua listalta kätevästi `pop`-metodilla.

Seuraava koodi esittelee luokan käyttämistä:

```python
lista = Tehtavalista()
lista.lisaa("opiskelu", 50)
lista.lisaa("ulkoilu", 60)
lista.lisaa("siivous", 10)
print(lista.yhteensa())
print(lista.hae_seuraava())
print(lista.yhteensa())
lista.lisaa("treffit", 100)
print(lista.yhteensa())
print(lista.hae_seuraava())
print(lista.hae_seuraava())
print(lista.yhteensa())
lista.tyhjenna()
print(lista.yhteensa())
```

<sample-output>

3
ulkoilu
2
3
treffit
opiskelu
1
0

</sample-output>

<programming-exercise name='Series' tmcname='part08-16_series'>

### A class named Series

Please write a class named `Series` with the following functionality:

```python
dexter = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
print(dexter)
```

<sample-output>

Dexter (8 seasons)
genres: Crime, Drama, Mystery, Thriller
no reviews

</sample-output>

The constructor should take the name, the number of seasons and a list of genres for the series as its arguments.

**Hint:** whenever you need to produce a string from a list containing strings, with a separating character of your choice in between the entries, you can use the `join` method as follows:

```python
genre_list = ["Crime", "Drama", "Mystery", "Thriller"]
genre_string = ", ".join(genre_list)
print(genre_string)
```

<sample-output>

Crime, Drama, Mystery, Thriller

</sample-output>

### Adding reviews

Please implement the method `rate(rating: int)` which lets you add a rating between 0 and 5 to any series object. You will also need to adjust the `__str__` method so that in case there are ratings, the method prints out the number of ratings added, and their average rounded to one decimal point.

```python
dexter = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
dexter.rate(4)
dexter.rate(5)
dexter.rate(5)
dexter.rate(3)
dexter.rate(0)
print(dexter)
```

<sample-output>

Dexter (8 seasons)
genres: Crime, Drama, Mystery, Thriller
5 ratings, average 3.4 points

</sample-output>

### Searching for series

Please implement these two functions which allow you to search through a list of series: `minimum_rating(rating: float, series_list: list)` and `includes_genre(genre: str, series_list: list)`.

Here is an example of how the new methods are used:

```python
s1 = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
s1.rate(5)

s2 = Series("South Park", 24, ["Animation", "Comedy"])
s2.rate(3)

s3 = Series("Friends", 10, ["Romance", "Comedy"])
s3.rate(2)

series_list = [s1, s2, s3]

print("a minimum rating of 4.5:")
for series in minimum_rating(4.5, series_list):
    print(series.name)

print("genre Comedy:")
for series in includes_genre("Comedy", series_list):
    print(series.name)
```

<sample-output>

a minimum rating of 4.5:
Dexter

genre Comedy:
South Park
Friends

</sample-output>

The code above and the automatic tests for this exercise assume your class contains an attribute `name`. If you used some other attribute name to refer to the name of the series, please change it before submitting.

</programming-exercise>

Please respond to a quick questionnaire on this week's materials.

<quiz id="64b548e4-3428-503a-a2f5-4bbfb69e374e"></quiz>

