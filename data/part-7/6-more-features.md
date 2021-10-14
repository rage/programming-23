---
path: '/part-7/6-more-features'
title: 'More Python features'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät lisää Pythonin ominaisuuksia

</text-box>

Tähän lukuun on koottu vielä joukko erinäisiä hyödyllisiä Pythoniin liittyviä ominaisuuksia.

## Yhden rivin ehto

Seuraavat koodit toimivat samalla tavalla:

```python
if x%2 == 0:
    print("parillinen")
else:
    print("pariton")
```

```python
print("parillinen" if x%2 == 0 else "pariton")
```

Jälkimmäisessä koodissa on yhden rivin ehto muotoa `a if [ehto] else b`. Tällaisen lausekkeen arvo on `a`, jos ehto pätee, ja muuten `b`.

Sama rakenne on joskus hyödyllinen kun tehdään ehdollinen sijoituslause. Esimerkiksi jos haluaisimme joko kasvattaa muuttujaa `y` tai nollata sen riippuen muuttujan `x` arvon parillisuudesta, sen sijaan että kirjoittaisimme

```python
if x%2 == 0:
    y += 1
else:
    y = 0
```

sama voitaisiin tehdä yhden rivin ehdolla seuraavasti

```python
y = y + 1 if x%2 == 0 else 0
```

## Tyhjä komento

Komento `pass` ei tee mitään. Voimme tehdä sen avulla esimerkiksi funktion `testi`, joka ei tee mitään:

```python
def testi():
    pass
```

Huomaa, että lohko ei voi olla tyhjä eli seuraava koodi ei toimisi:

```python
def testi():
```

## Silmukan else-osa

Kiinnostava Pythonin ominaisuus on, että ehtolauseen lisäksi myös silmukassa voi olla else-osa. Tämä osa suoritetaan, jos silmukka pääsee loppuun.

Esimerkiksi seuraava koodi etsii listalta parillista lukua. Jos sellainen löytyy, koodi tulostaa luvun ja silmukka päättyy. Kuitenkin jos lukua ei löytynyt, tästä tulee ilmoitus lopuksi.

```python
lista = [3,5,2,8,1]
for x in lista:
    if x%2 == 0:
        print("löytyi parillinen", x)
        break
else:
    print("ei löytynyt parillista")
```

Perinteinen tapa tehdä tällainen silmukka olisi käyttää apumuuttujaa, joka muistaa, löytyikö haluttua asiaa silmukan aikana:

```python
lista = [3,5,2,8,1]
loytyi = False
for x in lista:
    if x%2 == 0:
        print("löytyi parillinen", x)
        loytyi = True
        break
if not loytyi:
    print("ei löytynyt parillista")
```

Kuitenkin silmukan else-osan avulla vältymme muuttujan tekemiseltä.

## Funktion oletusparametri

Funktion parametrilla voi olla oletusarvo, joka tulee käyttöön silloin, jos parametria ei anneta. Näin on esimerkiksi seuraavassa funktiossa:

```python
def tervehdi(nimi="Emilia"):
    print("Moikka,", nimi)

tervehdi()
tervehdi("Erkki")
tervehdi("Matti")
```

<sample-output>

Moikka, Emilia
Moikka, Erkki
Moikka, Matti

</sample-output>

## Muuttuva määrä parametreja

Funktiolla voi olla myös muuttuva määrä parametreja, mikä merkitään laittamalla tähti parametrin eteen. Tällöin kaikki loput parametrit kasautuvat listaksi tähän parametriin.

Esimerkiksi seuraava funktio kertoo parametrien määrän ja summan:

```python
def testi(*lista):
    print("Annoit", len(lista), "parametria")
    print("Niiden summa on", sum(lista))

testi(1, 2, 3, 4, 5)
```

<sample-output>

Annoit 5 parametria
Niiden summa on 15

</sample-output>

<programming-exercise name='Your own programming language' tmcname='part07-18_own_programming_language'>

In this exercise you will write your own programming language executor. You can use any techniques and skills you have learnt on this course thus far.

The programs will consist of rows, and each row will be in one of the following formats:

* `PRINT [value]`: prints the value
* `MOV [variable] [value]`: assigns the value to the variable
* `ADD [variable] [value]`: adds the value to the variable
* `SUB [variable] [value]`: subtracts the value from the variable
* `MUL [variable] [value]`: multiplies the variable by the value
* `[location]:`: names a line of code, so it can be jumped to from elsewhere
* `JUMP [location]`: jumps to the location specified
* `IF [condition] JUMP [location]`: if the condition is true, jump to the location specified
* `END`: finish execution

The square brackets above are just a notation to signify operands; see below for usage examples. 

The program is executed line by line from the first line onwards. The execution ends when the executor comes across the command `END`, or when there are no more lines to execute.

Each program has 26 pre-defined variables, named `A` to `Z`. Each variable has the value 0 when the program begins. The notation `[variable]` refers to one of these 26 variables.

All the values processed by the program are integer numbers. The notation `[value]` refers either to a value stored in a variable, or an integer number typed in directly.

The notation `[location]` refers to any name of a location which consists of lowercase letters `a` to `z` and/or numbers `0` to `9`. Two different locations may not have the same name.

The notation `[condition]` refers to any expression in the format `[value] [comparison] [value]`, where `[comparison]` is one of the following operators: `==`, `!=`, `<`, `<=`, `>` and `>=`.

Please write a function named `run(program)`, which takes a list containing the program commands as its argument. Each item on the list is a line of code in the program. The function should return a new list, which contains the results of the `PRINT` commands executed during the program's run.

You may assume the function will only be given programs which are entirely in the correct format. You do not have to implement any input validation or error handling.

This exercise is worth two points. You will receive one point if the commands `PRINT`, `MOV`, `ADD`, `SUB`, `MUL` and `END` are working correctly. You will receice another point if the rest of the commands, which are used to implement loops, also work.

Below are some examples, which you may also use for testing. Example 1:

```python
program1 = []
program1.append("MOV A 1")
program1.append("MOV B 2")
program1.append("PRINT A")
program1.append("PRINT B")
program1.append("ADD A B")
program1.append("PRINT A")
program1.append("END")
result = run(program1)
print(result)
```

<sample-output>

[1, 2, 3]

</sample-output>

Example 2:

```python
program2 = []
program2.append("MOV A 1")
program2.append("MOV B 10")
program2.append("begin:")
program2.append("IF A >= B JUMP quit")
program2.append("PRINT A")
program2.append("PRINT B")
program2.append("ADD A 1")
program2.append("SUB B 1")
program2.append("JUMP begin")
program2.append("quit:")
program2.append("END")
result = run(program2)
print(result)
```

<sample-output>

[1, 10, 2, 9, 3, 8, 4, 7, 5, 6]

</sample-output>

Example 3 (factorial):

```python
program3 = []
program3.append("MOV A 1")
program3.append("MOV B 1")
program3.append("begin:")
program3.append("PRINT A")
program3.append("ADD B 1")
program3.append("MUL A B")
program3.append("IF B <= 10 JUMP begin")
program3.append("END")
result = run(program3)
print(result)
```

<sample-output>

[1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]

</sample-output>

Example 4 (prime numbers):

```python
program4 = []
program4.append("MOV N 50")
program4.append("PRINT 2")
program4.append("MOV A 3")
program4.append("begin:")
program4.append("MOV B 2")
program4.append("MOV Z 0")
program4.append("test:")
program4.append("MOV C B")
program4.append("new:")
program4.append("IF C == A JUMP error")
program4.append("IF C > A JUMP over")
program4.append("ADD C B")
program4.append("JUMP new")
program4.append("error:")
program4.append("MOV Z 1")
program4.append("JUMP over2")
program4.append("over:")
program4.append("ADD B 1")
program4.append("IF B < A JUMP test")
program4.append("over2:")
program4.append("IF Z == 1 JUMP over3")
program4.append("PRINT A")
program4.append("over3:")
program4.append("ADD A 1")
program4.append("IF A <= N JUMP begin")
result = run(program4)
print(result)
```

<sample-output>

[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

</sample-output>

</programming-exercise>

Please respond to the course feedback questionnaire. The questionnaire results help us improve the course.

<quiz id="0f5ead5e-ad00-50fc-b4af-c029ff1dcb22"></quiz>

