---
path: '/part-12/2-generators'
title: 'Generators'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, mitä tarkoitetaan generaattorilla Pythonissa
- Tiedät, mitä avainsana yield tekee
- Osaat kirjoittaa itse generaattorifunktioita

</text-box>

Eräissä tilanteissa olisi kätevää saada ohjelmassa seuraava alkio (tai useampi alkio) tietystä sarjasta ilman että muodostetaan koko sarjaa kerralla. Pythonissa tämä onnistuu näppärästi _generaattoreiden_ avulla. Generaattorifunktio muistuttaa normaalia arvon palauttavaa funktiota, mutta kun normaalifunktio palauttaa (tai ainakin sen pitäisi palauttaa) samalla syötteellä saman arvon, generaattorifunktio palauttaa seuraavan luvun sarjasta.

Generaattorien toiminta voidaan toteuttaa ohjelmissa myös muilla keinoilla (itse asiassa sama pätee useimpiin ohjelmointitekniikoihin), mutta niiden käyttö selkeyttää ja mahdollisesti säästää muistia tai muita resursseja tietyntyylisissä ohjelmissa.

## Avainsana yield

Generaattorifunktion toiminta perustuu avainsanaan `yield`. Tarkastellaan esimerkkinä funktiota, joka palauttaa yksi kerrallaan kokonaislukuja nollasta alkaen kunnes maksimiarvo on saavutettu:

```python

def laskuri(maksimi: int):
    luku = 0
    while luku <= maksimi:
        yield luku
        luku += 1

```

Nyt laskurilta voi pyytää seuraavan arvon funktiolla `next()`:

```python
if __name__ == "__main__":
    luvut = laskuri(10)
    print("Eka arvo:")
    print(next(luvut))
    print("Toka arvo:")
    print(next(luvut))
```

<sample-output>

Eka arvo:
0
Toka arvo:
1

</sample-output>

Niinkuin esimerkistä huomataan, `yield` muistuttaa `return`-komentoa siinä, että se palauttaa arvon funktiosta. Eroavaisuus on kuitenkin siinä, että yield palauttaa yksittäisen arvon, ja funktio "muistaa" mihin tilaan se jäi.

Arvoja voi pyytää vain niin kauan kun niitä on generaattorissa jäljellä - tämän jälkeen generaattorifunktio antaa poikkeuksen `StopIteration`:

```python
if __name__ == "__main__":
    luvut = laskuri(1)
    print(next(luvut))
    print(next(luvut))
    print(next(luvut))
```

<sample-output>

0
1
Traceback (most recent call last):
  File "generaattoriesimerkki.py", line 11, in <module>
    print(next(luvut))
StopIteration

</sample-output>

Poikkeuksen voi ottaa kiinni `try`-`except` lohkolla:

```python
if __name__ == "__main__":
    luvut = laskuri(1)
    try:
        print(next(luvut))
        print(next(luvut))
        print(next(luvut))
    except StopIteration:
        print("Luvut loppuivat kesken")
```

<sample-output>

0
1
Luvut loppuivat kesken

</sample-output>

Jos halutaan palauttaa kaikki generaattorin tuottamat alkiot, helpointa on iteroida ne läpi `for`-lauseella:

```python
if __name__ == "__main__":
    luvut = laskuri(5)
    for luku in luvut:
        print(luku)
```

<sample-output>

0
1
2
3
4
5

</sample-output>

<programming-exercise name='Even numbers' tmcname='part12-08_even_numbers'>

Please write a generator function named `even_numbers(beginning: int, maximum: int)` which takes two integers as its arguments. The function should produce even numbers starting from `beginning` and ending with, at most, `maximum`.

Two examples of how the function works:

```python
numbers = even_numbers(2, 10)
for number in numbers:
    print(number)
```

<sample-output>

2
4
6
8
10

</sample-output>

```python
numbers = even_numbers(11, 21)
for number in numbers:
    print(number)
```

<sample-output>

12
14
16
18
20

</sample-output>

</programming-exercise>

<programming-exercise name='Prime numbers' tmcname='part12-09_prime_numbers'>

A prime number is a number which is divisible only by itself and the number 1. By convention prime numbers aredefined as positive integers from the number 2 upwards. The first siz prime numbers are 2, 3, 5, 7, 11 and 13.

Please write a generator function `prime_numbers()` which creates a new generator. The generator should return new prime numbers, one by one in sequence, from 2 onwards. NB: this generator never terminates. It will generate numbers for as long as they are needed.

For example:

```python
numbers = prime_numbers()
for i in range(8):
    print(next(numbers))
```

<sample-output>

2
3
5
7
11
13
17
19

</sample-output>

Hint: you can use a loop to check if a number is a prime number. If we are checking the number `x`, the loop would go through the numbers `2` to `x-1`. If x is divisible by any one of these, it is not a prime number.

</programming-exercise>


## Generaattorikoosteet

Generaattorin voi luoda myös listakoostetta (list comprehension) muistuttavalla syntaksilla. Erotuksena listakoosteeseen on, että lauseke ympäröidään kaarisulkeilla hakasulkeiden sijasta.

Esimerkiksi

```python
# Generaattori palauttaa 2:n potensseja
neliot = (x ** 2 for x in range(1, 64))

print(neliot)

for i in range(5):
    print(next(neliot))
```

<sample-output>

<generator object &lt;genexpr&gt; at 0x000002B4224EBFC0>
1
4
9
16
25

</sample-output>

Toinen esimerkki, jossa generaattori tuottaa kolmimerkkisiä alijonoja englanninkielisistä aakkosista. Esimerkissä tulostetaan generaattorin 10 ensimmäistä alkiota:

```python
alijonot = ("abcdefghijklmnopqrstuvwxyz"[i : i + 3] for i in range(24))

# tulostetaan ensimmäiset 10 alijonoa
for i in range(10):
    print(next(alijonot))
```

<sample-output>

abc
bcd
cde
def
efg
fgh
ghi
hij
ijk
jkl

</sample-output>

<programming-exercise name='Random words' tmcname='part12-10_random_words'>

Please write a function named `word_generator(characters: str, length: int, amount: int)` which returns a new generator for generating random words based on the parameters given.

A random word is generated by selecting from the collection `characters` as many letters as indicated by `length`. The same character can appear many times in a word.

The generator returns as many words as specified by `amount` before terminating.

An example run of a word generator:

```python
wordgen = word_generator("abcdefg", 3, 5)
for word in wordgen:
    print(word)
```

<sample-output>

dbf
baf
ead
fga
ccc

</sample-output>

NB: it is up to you how you implement this function. You may just as well use either a "traditional" generator or a generator comprehension.

</programming-exercise>


