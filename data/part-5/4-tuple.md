---
path: '/part-5/4-tuple'
title: 'Tuple'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, millainen tietorakenne on tuple
- Osaat muodostaa tuplen erityyppisistä arvoista
- Tiedät, mitä eroa on tuplella ja listalla
- Tiedät esimerkkejä tyypillisistä tavoista käyttää tuplea

</text-box>

Tuple eli monikko on listan tapainen tietorakenne. Sen olennaiset erot listaan ovat:

* Tuple merkitään kaarisuluilla `(` ja `)`, lista merkitään hakasuluilla `[` ja `]`
* Tuple on _muuttumaton_, kun taas listan sisältö voi muuttua

Esimerkiksi seuraava koodi luo tuplen, jossa on pisteen koordinaatit:

```python
piste = (10, 20)
```

Tuplen sisällä oleviin alkioihin viitataan samalla tavalla kuin listassa:

```python
piste = (10, 20)
print("x-koordinaatti:", piste[0])
print("y-koordinaatti:", piste[1])
```

<sample-output>

x-koordinaatti: 10
y-koordinaatti: 20

</sample-output>

Tuplen määrittelyn jälkeen sen arvoa ei kuitenkaan voi muuttaa, eli seuraava koodi _ei_ toimi:

```python
piste = (10, 20)
piste[0] = 15
```

<sample-output>

TypeError: 'tuple' object does not support item assignment

</sample-output>

<programming-exercise name='Create a tuple' tmcname='part05-23_create_tuple'>

Please write a function named `create_tuple(x: int, y: int, z: int)`, which takes three integers as its arguments, and creates and returns a tuple based on the following criteria:

1. The first element in the tuple is the smallest of the arguments
2. The second element in the tuple is the greatest of the arguments
3. The third element in the tuple is the sum of the arguments

An example of its use:

```python

if __name__ == "__main__":
    print(create_tuple(5, 3, -1))

```

<sample-output>

(-1, 5, 7)

</sample-output>


</programming-exercise>

<programming-exercise name='The oldest person' tmcname='part05-24_oldest_person'>

Please write a function named `oldest_person(people: list)`, which takes a list of tuples as its argument. In each tuple, the first element is the name of a person, and the second element is their year of birth. The function should find the oldest person on the list and return their name.

An example of the function in action:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

print(oldest_person(people))
```

<sample-output>

Maija

</sample-output>

</programming-exercise>

<programming-exercise name='Older people' tmcname='part05-25_older_people'>

In this exercise we are handling tuples just like the ones described in the previous exercise.

Please write a function named `older_people(people: list, year: int)`, which selects all those people on the list who were born _before_ the year given as an argument. The function should return the names of these people in a new list.

An example of its use:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

older = older_people(people, 1979)
print(older)
```

<sample-output>

[ 'Adam', 'Mary' ]

</sample-output>

</programming-exercise>

## Miksi tuple on olemassa?

Tuplen ideana on tallentaa jokin kiinteä kokoelma arvoja, jotka liittyvät toisiinsa. Esimerkiksi kun tallennamme pisteen, jossa on x- ja y-koordinaatti, tuple on luonteva valinta, koska pisteeseen kuuluu aina kaksi arvoa:

```python
piste = (10, 20)
```

Voisimme sinänsä tallentaa pisteen myös listana:

```python
piste = [10, 20]
```

Tämä ei kuitenkaan tuntuisi yhtä hyvältä ratkaisulta, koska lista sisältää peräkkäisiä alkioita jossakin järjestyksessä ja sen koko voi muuttua. Kun tallennamme pisteen, haluamme tallentaa nimenomaan x- ja y-koordinaatin eikä listaa koordinaateista.

Koska tuple on muuttumaton, sitä voidaan käyttää sanakirjan avaimena (toisin kuin listaa).
Esimerkiksi seuraava ohjelma luo sanakirjan, jonka avaimet ovat pisteitä:

```python
pisteet = {}
pisteet[(3, 5)] = "apina"
pisteet[(5, 0)] = "banaani"
pisteet[(1, 2)] = "cembalo"
print(pisteet[(3, 5)])
```

<sample-output>
apina
</sample-output>

Vastaava koodi _ei_ toimisi, jos käyttäisimme listoja:

```python
pisteet = {}
pisteet[[3, 5]] = "apina"
pisteet[[5, 0]] = "banaani"
pisteet[[1, 2]] = "cembalo"
print(pisteet[[3, 5]])
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

## Tuple ilman sulkuja

Tuplen määrittelyssä ei ole pakko antaa sulkuja. Esimerkiksi seuraavat koodit toimivat samalla tavalla:

```python
luvut = (1, 2, 3)
```

```python
luvut = 1, 2, 3
```

Tämän ansiosta voimme tehdä luontevasti funktion, joka palauttaa useita arvoja tuplena. Tarkastellaan seuraavaa esimerkkiä:

```python
def minmax(lista):
  return min(lista), max(lista)

lista = [33, 5, 21, 7, 88, 312, 5]

pienin, suurin = minmax(lista)
print(f"Pienin luku on {pienin} ja suurin on {suurin}")
```

<sample-output>

Pienin luku on 5 ja suurin on 312

</sample-output>

Tämä funktio palauttaa kaksi arvoa tuplena, ja funktion paluuarvo vastaanotetaan "yhtä aikaa" kahteen muuttujaan:

```python
pienin, suurin = minmax(lista)
```

Tässä tapauksessa sijoitusoperaation vasemmalla puolella on tuple, jonka sisällä oleviin muuttujiin asetetaan funktion palauttaman tuplen sisältämät arvot:

```python
(pienin, suurin) = minmax(lista)
```

Sanakirjojen yhteydessä esiteltiin `items`-metodiin perustuvaa tapaa käydä läpi sanakirjan kaikki avaimet ja arvot:

```python
sanakirja = {}

sanakirja["apina"] = "monkey"
sanakirja["banaani"] = "banana"
sanakirja["cembalo"] = "harpsichord"

for avain, arvo in sanakirja.items():
    print("avain:", avain)
    print("arvo:", arvo)
```

Tässäkin Python käyttää taustalla tupleja: `sanakirja.items()` palauttaa yksi kerrallaan avain-arvo-parit tuplena, jonka ensimmäinen alkio on avain ja toinen arvo.

Vielä yksi tuplen käyttötarkoitus on kahden muuttujan arvon vaihtaminen keskenään:

```python
luku1, luku2 = luku2, luku1
```

Yllä oleva koodi vaihtaa keskenään muuttujien `luku1` ja `luku2` arvot, eli koodi toimii samoin kuin seuraava, apumuuttujaa käyttävä koodi:

```python
apu = luku1
luku1 = luku2
luku2 = apu
```

<programming-exercise name='Student database' tmcname='part05-26_student_database'>

In this series of exercises you will create a simple student database. Before diving in, please spend a moment reading through the instructions and thinking about what sort of data structures are necessary for organising the data stored by your program.

#### adding students

First write a function named `add_student`, which adds a new student to the database. Also write a preliminary version of the function `print_student`, which prints out the information of a single student.

These function are used as follows:

```python
students = {}
add_student(students, "Peter")
add_student(students, "Eliza")
print_student(students, "Peter")
print_student(students, "Eliza")
print_student(students, "Jack")
```

Your program should now print out

<sample-output>

<pre>
Peter:
 no completed courses
Eliza:
 no completed courses
Jack: no such person in the database
</pre>

</sample-output>

#### adding completed courses

Please write a function named `add_course`, which adds a completed course to the information of a specific student in the database. The course data is a tuple consisting of the name of the course and the grade:

```python
students = {}
add_student(students, "Peter")
add_course(students, "Peter", ("Introduction to Programming", 3))
add_course(students, "Peter", ("Advanced Course in Programming", 2))
print_student(students, "Peter")
```

When some courses have been added, the information printed out changes:

<sample-output>

<pre>
Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
</pre>

</sample-output>

#### repeating courses

Courses with grade 0 should be ignored when adding course information. Additionally, if the course is already in the database in that specific student's information, the grade recorded in the database should never be lowered if the course is repeated.

```python
students = {}
add_student(students, "Peter")
add_course(students, "Peter", ("Introduction to Programming", 3))
add_course(students, "Peter", ("Advanced Course in Programming", 2))
add_course(students, "Peter", ("Data Structures and Algorithms", 0))
add_course(students, "Peter", ("Introduction to Programming", 2))
print_student(students, "Peter")
```

<sample-output>

<pre>
Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
</pre>

</sample-output>

#### summary of database

Please write a function named `summary`, which prints out a summary based on all the information stored in the database.

```python
students = {}
add_student(students, "Peter")
add_student(students, "Eliza")
add_course(students, "Peter", ("Data Structures and Algorithms", 1))
add_course(students, "Peter", ("Introduction to Programming", 1))
add_course(students, "Peter", ("Advanced Course in Programming", 1))
add_course(students, "Eliza", ("Introduction to Programming", 5))
add_course(students, "Eliza", ("Introduction to Computer Science", 4))
summary(students)
```

This should print out

<sample-output>

<pre>
students 2
most courses completed 3 Peter
best average grade 4.5 Eliza
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name="A square of letters" tmcname="part05-27_letter_square">

This final exercise in this part is a relatively demanding problem solving task. It can be solved in many different ways. Even though this current section in the material covers tuples, tuples are not necessarily the best way to go about solving this.

Please write a program which prints out a square of letters as specified in the examples below. You may assume there will be at most 26 layers.

<sample-output>

Layers: **3**
<pre>
CCCCC
CBBBC
CBABC
CBBBC
CCCCC
</pre>

</sample-output>

<sample-output>

Layers: **4**
<pre>
DDDDDDD
DCCCCCD
DCBBBCD
DCBABCD
DCBBBCD
DCCCCCD
DDDDDDD
</pre>

</sample-output>

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within an `if __name__ == "__main__"` block.

</programming-exercise>

<!---
A quiz to review the contents of this section:

<quiz id="69694e01-4c47-5b9d-8a00-b0d96a477dc7"></quiz>
-->

Please respond to a quick questionnaire on this week's materials. 

<quiz id="58d819fb-3280-55b4-bef3-8045ebdb14fe"></quiz>
