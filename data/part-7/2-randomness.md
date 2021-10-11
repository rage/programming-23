---
path: '/part-7/2-randomness'
title: 'Randomness'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tunnet moduulin `random` funktioita
- Osaat hyödyntää satunnaisuutta omissa ohjelmissasi

</text-box>

Tässä luvussa tutustutaan standardikirjaston moduuliin [random](https://docs.python.org/3/library/random.html?highlight=random#module-random), joka tarjoaa välineistöä satunnaislukujen generointiin ja muuhun satunnaiseen toiminnallisuuteen.

Tässä ja seuraavissa luvuissa esiteltävien funktioiden yhteyteen on lisäilty linkkejä standardikirjaston [dokumentaatioon](https://docs.python.org/3/library/). Linkkejä kannattaa klikkailla ja pikkuhiljaa totutella siihen, miltä dokumentaatio näyttää.

## Luvun arpominen

Funktio [randint(a, b)](https://docs.python.org/3/library/random.html?highlight=random#random.randint) antaa satunnaisen kokonaisluvun väliltä `a`...`b`. Esimerkiksi seuraava ohjelma simuloi nopan heittämistä:

```python
from random import randint

print("Noppa antaa:", randint(1, 6))
```

Ohjelman tulos voisi olla vaikkapa:

<sample-output>

Noppa antaa: 4

</sample-output>

Seuraava ohjelma puolestaan heittää noppaa kymmenen kertaa:

```python
from random import randint

for i in range(10):
    print("Noppa antaa:", randint(1, 6))
```

Ohjelman tulos voisi olla seuraava:

<sample-output>

Noppa antaa: 5
Noppa antaa: 4
Noppa antaa: 3
Noppa antaa: 2
Noppa antaa: 3
Noppa antaa: 4
Noppa antaa: 6
Noppa antaa: 4
Noppa antaa: 4
Noppa antaa: 3

</sample-output>

Huomaa, että funktio `randint` toimii eri logiikalla kuin aiemmin käyttämämme funktio `range`, joka luo lukuvälin. Kun kutsumme funktiota `randint(1, 6)`, lukuväli on 1...6, mutta kun kutsumme funktiota `range(1, 6)`, lukuväli on 1...5.

## Lisää funktioita

Funktio [shuffle](https://docs.python.org/3/library/random.html?highlight=random#random.shuffle) sekoittaa sille annetun tietorakenteen. Esimerkiksi seuraava ohjelma sekoittaa listalla olevat sanat:

```python
from random import shuffle

sanat = ["apina", "banaani", "cembalo"]
shuffle(sanat)
print(sanat)
```

<sample-output>

['banaani', 'apina', 'cembalo']

</sample-output>

Funktio `choice` puolestaan valitsee satunnaisen alkion tietorakenteesta:

```python
from random import choice

sanat = ["apina", "banaani", "cembalo"]
print(choice(sanat))
```

<sample-output>

'cembalo'

</sample-output>

## Lottorivin arvonta

Tarkastellaan esimerkkinä tilannetta, jossa haluamme arpoa lottorivin. Lotossa on yhteensä 40 numeroa, joista arvotaan 7 numeroa riviin.

Yksinkertainen tapa koettaa arpoa lottorivi on seuraava:

```python
from random import randint

for i in range(7):
    print(randint(1, 40))
```

Tämä ei ole kuitenkaan toimiva tapa, koska sama numero saattaa tulla useita kertoja riviin. Tarvitsemme jonkin menetelmän, joka varmistaa, että jokainen numero on eri numero.

Yksi mahdollisuus on tallentaa arvotut numerot listaan ja lisätä uusi numero listaan vain, jos sitä ei vielä ole siellä. Voimme jatkaa tätä, kunnes listassa on 7 numeroa:

```python
from random import randint

rivi = []
while len(rivi) < 7:
    uusi = randint(1, 40)
    if uusi not in rivi:
        rivi.append(uusi)

print(rivi)
```

Voimme kuitenkin toteuttaa arvonnan myös lyhyemmin funktion `shuffle` avulla:

```python
from random import shuffle

kaikki = list(range(1, 41))
shuffle(kaikki)
rivi = kaikki[0:7]
print(rivi)
```

Tässä ideana on, että luomme ensin listan, jossa on kaikki numerot väliltä 1–40. Tämän jälkeen sekoitamme listan ja valitsemme sitten 7 ensimmäistä numeroa riviin. Tämän ansiosta meidän ei tarvitse tehdä silmukkaa.

Itse asiassa voimme toteuttaa arvonnan vielä helpommin, koska Pythonin standardikirjastossa on myös funktio [sample](https://docs.python.org/3/library/random.html?highlight=random#random.sample), joka valitsee annetusta tietorakenteesta halutun määrän alkioita:

```python
from random import sample

kaikki_luvut = list(range(1, 41))
rivi = sample(kaikki_luvut, 7)
print(rivi)
```

<programming-exercise name='Lottery numbers' tmcname='part07-04_lottery_numbers'>

Please write a function named `lottery_numbers(amount: int, lower: int, upper: int)`, which generates as many random numbers as specified by the first argument. All numbers should fall within the bounds `lower` to `upper`. The numbers should be stored in a list and returned. The numbers should be in ascending order in the returned list.

As these are lottery numbers, no number should appear twice in the list.

An example of how the function should work:

```python
for number in lottery_numbers(7, 1, 40):
    print(number)
```

<sample-output>

4
7
11
16
22
29
38

</sample-output>

</programming-exercise>

## Mistä satunnaisluvut tulevat?

Moduulin [random](https://docs.python.org/3/library/random.html) toiminta perustuu algoritmiin, joka tuottaa satunnaislukuja tietyn lähtöarvon ja matemaattisten operaatioiden avulla. Lähtöarvoa kutsutaan myös nimellä _siemenarvo_ (engl. _seed value_).

Voimme halutessamme antaa siemenarvon itse funktiolla [seed](https://docs.python.org/3/library/random.html?highlight=random#random.seed):

```python
from random import randint, seed

seed(1337)
# tästä tulee aina sama satunnaisluku
print(randint(1, 100))
```

Kun annamme siemenarvon itse, satunnaisuutta käyttävät funktiot antavat samat tulokset ohjelman jokaisella suorituskerralla. Tulokset voivat kuitenkin riippua käytetystä Pythonin versiosta.

<text-box variant="info" name="Aito satunnaisuus">

Jos tarkkoja ollaan, moduulin `random` muodostamat luvut eivät ole aitoja satunnaislukuja, vaan _pseudosatunnaislukuja_. Tietokoneen avulla on vaikea arpoa täysin satunnaisia lukuja, koska sen toiminta on kaikilta osin ennustettavissa. Monissa käyttötarkoituksissa luvut ovat kuitenkin tarpeeksi satunnaisia. Aitoja satunnaislukuja muodostettaessa lähteenä käytetään yleensä jotain tietokoneen ulkopuolista satunnaista ilmiötä, esimerkiksi radioaktiivista taustasäteilyä tai äänentasoa.

Lisätietoa löydät esimerkiksi sivulta <a href="https://www.random.org/randomness/">random.org</a>.

</text-box>

<programming-exercise name='Password generator, part 1' tmcname='part07-05_password_generator_1'>

Please write a function which creates passwords of a desired length, consisting of lowercase characters a to z.

An example of how the function should work:

```python
for i in range(10):
    print(generate_password(8))
```

<sample-output>

lttehepy
olsxttjl
cbjncrzo
dwxqjdgu
gpfdcecs
jabyvgar
xnbbonbl
ktmsjyww
ejhprmel
rjkoacib

</sample-output>

</programming-exercise>

<programming-exercise name='Password generator, part 2' tmcname='part07-06_password_generator_2'>

Please write an improved version of your password generator. The function now takes three arguments:

* If the second argument is `True`, the generated password should also contain one or more numbers.
* If the third argument is `True`, the generated password should also contain one or more of these special characters: `!?=+-()#`.

Despite these two additional arguments, the password should always contain at least one lowercase alphabet. You may assume the function will only be called with combinations of arguments that are possible to formulate into passwords following these rules. That is, the arguments will not specify e.g. a password of length 2 which contains both a number and a special characters, for then there would not be space for the mandatory lowercase letter.

An example of how the function should work:

```python
for i in range(10):
    print(generate_strong_password(8, True, True))
```

<sample-output>

2?0n+u31
u=m4nl94
n#=i6r#(
da9?zvm?
7h)!)g?!
a=59x2n5
(jr6n3b5
9n(4i+2!
32+qba#=
n?b0a7ey

</sample-output>

</programming-exercise>

<programming-exercise name='Dice roller' tmcname='part07-07_dice_roller'>

In this exercise you will write some functions which can be used in games that involve dice.

Instead of normal dice this exercise specifies _non-transitive dice_. You can read up on these [here](https://singingbanana.com/dice/article.htm) or [watch this video](https://www.youtube.com/watch?v=LrIp6CKUlH8).

You will use three dice:

- Die A has the sides 3, 3, 3, 3, 3, 6
- Die B has the sides 2, 2, 2, 5, 5, 5
- Die C has the sides 1, 4, 4, 4, 4, 4

</pre>

Please write a function named `roll(die: str)`, which rolls the die specified by the argument. An example of how this should work:

```python
for i in range(20):
    print(roll("A"), " ", end="")
print()
for i in range(20):
    print(roll("B"), " ", end="")
print()
for i in range(20):
    print(roll("C"), " ", end="")
```

<sample-output>

3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  6  3  6  3
2  2  5  2  2  5  5  2  2  5  2  5  5  5  2  5  2  2  2  2
4  4  4  4  4  1  1  4  4  4  1  4  4  4  4  4  4  4  4  4

</sample-output>

Also write a function named  `play(die1: str, die2: str, times: int)`, which throws both dice as many times as specified by the third argument. The function should return a tuple. The first item should be the number of times die 1 won, the second the number of times die 2 won, and the third item should be the number of ties.

```python
result = play("A", "C", 1000)
print(result)
result = play("B", "B", 1000)
print(result)
```

<sample-output>

(292, 708, 0)
(249, 273, 478)

</sample-output>

</programming-exercise>

<programming-exercise name='Random words' tmcname='part07-08_random_words'>

The exercise template contains the file `words.txt`, which contains some English language words, one on each line.

Please write a function named `words(n: int, alku: str)`, which returns a list containing `n` random words from the `words.txt` file. All words should begin with the string specified by the second argument. 

The same word should not appear twice in the list. If there are not enough words beginning with the specified string, the function should raise a `ValueError` exception.

An example of the function in action:

```python
word_list = words(3, "ca")
for word in word_list:
    print(word)
```

<sample-output>

cat
car
carbon

</sample-output>

</programming-exercise>

<!---
<quiz id="d53a6898-f390-55ef-b266-95694bcbe704"></quiz>
-->