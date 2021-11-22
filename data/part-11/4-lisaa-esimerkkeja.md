---
path: '/part-11/4-lisaa-esimerkkeja'
title: 'Lisää esimerkkejä'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Käydään läpi muutamia binääripuuhun liittyviä rekursiivisia esimerkkialgoritmeja

</text-box>


Rekursion todellinen hyöty tulee esiin tilanteissa, joissa iteratiivinen ratkaisu on hankala kirjoittaa. Tarkastellaan esimerkkinä _binääripuuta_. Binääripuulla tarkoitetaan puurakennetta, jossa jokaisella alkiolla on korkeintaan kaksi "lasta". Binääripuu voisi siis näyttää esim. tältä (huomaa, että vaikka tietojenkäsittelijöitä pidetään joissain yhteyksissä luonnontieteilijöinä, käsityksemme puiden kasvusuunnasta on nurinkurinen):

<img src="11_4_1.png">

Binääripuiden (ja puiden yleensäkin) käsittely rekursiivisesti on ainakin teoriassa helppoa: jos halutaan tehdä jokin operaatio binääripuun kaikille alkioille - esim. etsiä jokin tietty alkio puusta, voidaan kirjoittaa rekursiivinen algoritmi, joka

1. Käsittelee nykyisen alkion
2. Kutsuu itseään vasemmasta lapsesta alkavalle "alipuulle"
3. Kutsuu itseään oikeasta lapsesta alkavalle "alipuulle"

<img src="11_4_2.png">

Kun koko rekursiivinen algoritmi on käsitelty, on vierailtu kerran puun jokaisessa solussa. Iteratiivinen versio algoritmista on yleensä hankalampi kirjoittaa, koska kirjanpito vieralluista alkioista menee äkkiä monimutkaiseksi.

Binääripuuta voidaan mallintaa helposti kirjoittamalla luokka, joka mallintaa yhtä alkiota puussa. Alkiolla on arvon lisäksi tieto vasemmasta ja oikeasta lapsestaan:

```python

class Alkio:
    """ Luokka mallintaa yhtä alkiota binääripuussa """
    def __init__(self, arvo, left_child:'Alkio' = None, right_child:'Alkio' = None):
        self.arvo = arvo
        self.left_child = left_child
        self.right_child = right_child
```

Nyt jos halutaan mallintaa esimerkiksi oheisen kaltainen puu:

<img src="11_4_3.png">

...se voidaan muodostaa seuraavalla ohjelmalla:

```python
if __name__ == "__main__":
    puu = Alkio(2)

    tree.left_child = Alkio(3)
    tree.left_child.left_child = Alkio(5)
    tree.left_child.right_child = Alkio(8)

    tree.right_child = Alkio(4)
    tree.right_child.right_child = Alkio(11)

```

## Rekursiiviset binääripuualgoritmit

Tarkastellaan ensin algoritmia, joka tulostaa kaikki binääripuun alkiot allekkain. Käytetään esimerkkinä tässä ja tulevissa tehtävissä yllä muodostettua puuta.

Funktio saa parametrikseen juurialkion (eli kaikkein ylimmäisenä olevan alkion, jonka _jälkeläisiä_ kaikki muut alkiot ovat):

```python

def tulosta_alkiot(juuri: Alkio):
    print(juuri.arvo)

    if juuri.left_child is not None:
        tulosta_alkiot(juuri.left_child)

    if juuri.right_child is not None:
        tulosta_alkiot(juuri.right_child)

```

Funktio tulostaa annetun alkion arvon, ja sen jälkeen kutsuu itseään uudestaan vasemmalle ja oikealla alipuulle (edellyttäen, että vasen ja/tai oikea alkio on määritelty). Algoritmi on melko yksinkertainen, mutta käy tehokkaasti läpi kaikki puun alkiot riippumatta puun koosta. Algoritmi ei myöskään vieraile missään puun alkiossa kahta kertaa.

Kun funktiolle annetaan parametriksi aikaisemmin luodun binääripuun juurialkio `puu`, se tulostaa

<sample-output>

2
3
5
8
4
11

</sample-output>

Vastaavalla tavalla voidaan kirjoittaa algoritmi, joka laskee kaikkien puun alkioiden summan:

```python

def sum_of_nodes(juuri: Alkio):
    summa = juuri.arvo

    if juuri.left_child is not None:
        summa += sum_of_nodes(juuri.left_child)

    if juuri.right_child is not None:
        summa += sum_of_nodes(juuri.right_child)

    return summa

```

Muuttuja `summa` alustetaan nykyisen alkion arvolla. Tämän jälkeen siihen lisätään rekursiivisesti vasemman ja oikean alipuun summat (tarkastaen taas ensin, että ne ovat olemassa). Lopuksi summa palautetaan.

<programming-exercise name='Greatest node' tmcname='part11-16_greatest_node'>

Please write a function named `greatest_node(root: Node)` which takes the root node of a binary tree as its argument.

The function should return the node with the greatest value within the tree. The tree should be traversed recursively.

Hint: the function `sum_of_nodes` in the example above may come in handy.

An example of how the function should work:

```python

if __name__ == "__main__":
    tree = Node(2)

    tree.left_child = Node(3)
    tree.left_child.left_child = Node(5)
    tree.left_child.right_child = Node(8)

    tree.right_child = Node(4)
    tree.right_child.right_child = Node(11)

    print(greatest_node(tree))

```

<sample-output>

11

</sample-output>

</programming-exercise>

## Järjestetty binääripuu

Binääripuusta on erityisesti hyötyä silloin, kun alkiot on järjestetty tietyllä tavalla. Alkion löytäminen järjestetystä puusta on nopeaa.

Tarkastellaan esimerkkinä puuta, jossa alkiot on järjestetty seuraavasti: jokaisen alkion vasen lapsi on pienempi kuin alkio itse, ja vastaavasti oikea alkio on suurempi kuin alkio itse.

<img src="11_4_1.png">

Nyt alkion etsimiseen voidaan kirjoittaa rekursiivinen algoritmi, joka toimii hyvin samankaltaisesti kuin aiemmin tarkastelemamme binäärihaku: jos juurialkio on tarkasteltava alkio, palautetaan arvo `True`. Muuten jatketaan rekursiivisesti hakua joko vasemmasta tai oikeasta alipuusta. Jos alkio on tyhjä, palautetaan `False`.

```python

def etsi_alkio(juuri: Alkio, arvo):
    if juuri is None:
        return False

    if arvo == juuri.arvo:
        return True

    if arvo > juuri.arvo:
        return etsi_alkio(juuri.right_child, arvo)

    return etsi_alkio(juuri.left_child, arvo)

```

<programming-exercise name='Bosses and subordinates' tmcname='part11-17_bosses_and_subordinates'>

The class `Employee` models an employee of a company:

```python
class Employee:
    def __init__(self, name: str):
        self.name = name
        self.subordinates = []

    def add_subordinate(self, employee: 'Employee'):
        self.subordinates.append(employee)
```

Please write a function named `count_subordinates(employee: Employee)` which recursively counts the number of subordinates each employee has.

An example of the function in action:

```python
if __name__ == "__main__":
    t1 = Employee("Sally")
    t2 = Employee("Eric")
    t3 = Employee("Matthew")
    t4 = Employee("Emily")
    t5 = Employee("Andy")
    t6 = Employee("Claire")
    t1.add_subordinate(t4)
    t1.add_subordinate(t6)
    t4.add_subordinate(t2)
    t4.add_subordinate(t3)
    t4.add_subordinate(t5)
    print(count_subordinates(t1))
    print(count_subordinates(t4))
    print(count_subordinates(t5))
```

<sample-output>

5
3
0

</sample-output>

</programming-exercise>

## Revisiting the times before recursion

Let's finish off this part of the material with a slightly larger exercise concentrating on object oriented programming principles. We do not recommend using recursion in this series of tasks, but list comprehension techniques will come in useful.

<programming-exercise name='OrderBook' tmcname='part11-18_order_book'>

In this exercise you will write two different classes, which will in turn form the backbone of the _following_ exercise, where you will write an interactive application.

## Task

Please write the class `Task` which models a single task in a software company's likst of tasks. Tasks have
- a description
- an estimate of the hours required for completing the task
- the name of the programmer assigned to the task
- a field for keeping track of whether the task is finished
- a unique identifier

The class is used as follows:

```python
t1 = Task("program hello world", "Eric", 3)
print(t1.id, t1.description, t1.programmer, t1.workload)
print(t1)
print(t1.is_finished())
t1.mark_finished()
print(t1)
print(t1.is_finished())
t2 = Task("program webstore", "Andy", 10)
t3 = Task("program mobile app for workload accounting", "Eric", 25)
print(t2)
print(t3)
```

<sample-output>

1 program hello world Eric 3
1: program hello world (3 hours), programmer Eric NOT FINISHED
False
1: program hello world (3 hours), programmer Eric FINISHED
True
2: program webstore (10 hours), programmer Andy NOT FINISHED
3: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED

</sample-output>

Some clarifications:
- the state of the task (finished or not yet finished) can be checked with the function `is_finished(self)` which returns a Boolean value
- a task is not finished when it is created
- a task is marked as finished by calling the method `mark_finished(self)`
- the id of a task is a running number which starts with 1. The id of the first task is 1, the id of the second is 2, and so forth.

**Hint**: id can be implemented as a [class variable](/part-9/5-class-attributes#class-variables).

## OrderBook

Please write a class named `OrderBook` which collects all the tasks ordered from the software company. Thetasks should be modelled with the class `Task` you just wrote.

The basic version of an OrderBook is used as follows:

```python
orders = OrderBook()
orders.add_order("program webstore", "Andy", 10)
orders.add_order("program mobile app for workload accounting", "Eric", 25)
orders.add_order("program app for practicing mathematics", "Andy", 100)

for order in orders.all_orders():
    print(order)

print()

for programmer in orders.programmers():
    print(programmer)
```

<sample-output>

1: program webstore (10 hours), programmer Andy NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED
3: program app for practicing mathematics (100 hours), programmer Andy NOT FINISHED

Andy
Eric

</sample-output>

At this stage your `OrderBook` should provide three methods:
- `add_order(self, description, programmer, workload)` which adds a new order to the OrderBook. An OrderBook stores the orders internally as `Task` objects. NB: the method should take exactly the attributes mentioned, or else the automated tests will not work correctly.
- `all_orders(self)` returns a list of all the tasks stored in the OrderBook
- `programmers(self)` returns a list of the names of all the programmers with tasks stored in the OrderBook. The list should contain each programmer only once

**Hint:** an easy method for removing duplicates is handling the list initially as a [set](https://docs.python.org/3.8/library/stdtypes.html#set). A set is a collection of items where each unique item appears only once. A `set` can be then converted back into a list, and we can be sure each item is then unique:

```python
my_list = [1,1,3,6,4,1,3]
my_list2 = list(set(my_list))
print(my_list)
print(my_list2)
```

<sample-output>

[1, 1, 3, 6, 4, 1, 3]
[1, 3, 4, 6]

</sample-output>

## Some more features for OrderBook

Please write three more methods in your `OrderBook` class.

The method `mark_finished(self, id: int)` takes the id of the task as its argument and marks the relevant task as finished:

```python
orders = OrderBook()
orders.add_order("program webstore", "Andy", 10)
orders.add_order("program mobile app for workload accounting", "Eric", 25)
orders.add_order("program app for practicing mathematics", "Andy", 100)

orders.mark_finished(1)
orders.mark_finished(2)

for order in orders.all_orders():
    print(order)
```

<sample-output>

1: program webstore (10 hours), programmer Andy FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric FINISHED
3: program app for practicing mathematics (100 hours), programmer Andy NOT FINISHED

</sample-output>

If there is no task with the given id, the method should raise a `ValueError` exception. If you need a refresher on raising exceptions, please have a look at [part 6](/part-6/3-errors#raising-exceptions).

The methods `finished_orders(self)` and `unfinished_orders(self)` work as expected: both return a list containing the relevant tasks from the OrderBook.

## Finishing touches to OrderBook

Please write one last method in your `OrderBook` class: `status_of_programmer(self, programmer: str)` which returns a _tuple_. The tuple should contain the number of finished and unfinished tasks the programmer has, along with the hours spent on each task.

```python
orders = OrderBook()
orders.add_order("program webstore", "Andy", 10)
orders.add_order("program mobile app for workload accounting", "Andy", 25)
orders.add_order("program app for practicing mathematics", "Andy", 100)
orders.add_order("program the next facebook", "Eric", 1000)

orders.mark_finished(1)
orders.mark_finished(2)

status = orders.status_of_programmer("Andy")
print(status)
```

<sample-output>

(2, 1, 35, 100)

</sample-output>

The first item in the tuple is the number of _finished_ tasks, while the second item is the number of _unfinished_ tasks. The third and fourth items are the sums of workload estimates for the finished and unfinished tasks, respectively.

If there is no task with the given id, the method should raise a `ValueError` exception.

</programming-exercise>

<programming-exercise name='Order book application' tmcname='part11-19_order_book_application'>

In this exercise you will create a digital application for administering the tasks ordered from a software company. The implementation is completely up to you, but you may use the building blocks from the previous exercise in your application. The examples in the [last section of part 10](/part-10/4-application-development) can also prove useful.

## Without error handling

The application should work _exactly_ as follows:

<sample-output>

commands:
0 exit
1 add order
2 list finished tasks
3 list unfinished tasks
4 mark task as finished
5 programmers
6 status of programmer

command: **1**
description: **program the next facebook**
programmer and workload estimate: **jonah 1000**
added!

command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric 25**
added!

command: **1**
description: **program an app for music theory revision**
programmer and workload estimate: **nina 12**
added!

command: **1**
description: **program the next twitter**
programmer and workload estimate: **jonah 55**
added!

command: **2**
no finished tasks

command: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer eric NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED
4: program the next twitter (55 hours), programmer jonah NOT FINISHED

command: **4**
id: **2**
marked as finished

command: **4**
id: **4**
marked as finished

command: **2**
2: program mobile app for workload accounting (25 hours), programmer eric FINISHED
4: program the next twitter (55 hours), programmer jonah FINISHED

command: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED

command: **5**
jonah
eric
nina

command: **6**
programmer: **jonah**
tasks: finished 2 not finished 1, hours: done 55 scheduled 1000

</sample-output>

The first exercise point is granted for a working application when all user input is flawless.

## Handling error in user input

To gain the second exercise point for this exercise your application is expected to recover from erroneus user input. Any input which does not follow the specified format should produce an error message _erroneous input_, and result in yet another repeat of the loop asking for a new command:

<sample-output>

command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric xxx**
erroneous input

command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric**
erroneous input

command: **4**
id: **1000000**
erroneous input

command: **4**
id: **XXXX**
erroneous input

command: **6**
programmer: **unknownprogrammer**
erroneous input

</sample-output>

</programming-exercise>

Please respond to a quick questionnaire on this part of the course.

<quiz id="2496aa8e-2b2d-532b-83ab-64547a036f86"></quiz>

