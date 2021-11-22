---
path: '/part-11/1-comprehensions'
title: 'Comprehensions'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät mitä tarkoitetaan koosteella (comprehension)
- Osaat hyödyntää koosteita uusien listojen muodostamiseen

</text-box>

Ohjelmointiin liittyy usein erilaisten sekvenssien (eli sarjojen) käsittely. Aikaisemmissa osissa on käytetty runsaasti aikaa merkkijonojen, listojen ja sanakirjojen käsittelyyn eri tavoilla.

Oletetaan tilanne, jossa meillä on lista kokonaislukuja. Tämän listan perusteella meidän pitäisi luoda vastaava merkkijonolista.

Perinteinen tapa toteuttaa operaatio näyttäisi esimerkiksi tältä:

```python
luvut = [1, 2, 3, 6, 5, 4, 7]

merkkijonot = []
for luku in luvut:
    merkkijonot.append(str(luku))
```

## Listakooste

Python tarjoaa kuitenin "pythonmaisemman" tavan uuden listan muodostamiseksi vanhan perusteella. Menetelmää voidaan kutsua "listakoosteeksi", mutta huomattavasti yleisempää on käyttää englanninkielistä nimeä _list comprehension_.

Menetelmässä ideana on kuvata yhden rivin lausekkeella, mikä operaatio listan kaikille alkioille tehdään, ennen kuin ne tallennetaan uuteen listaan.

Esimerkiksi yllä esitetty ohjelma, joka luo merkkijonolistan kokonaislukulistan perusteella, näyttäisi listakoostetta hyödyntäen tältä:

```python
luvut = [1, 2, 3, 6, 5, 4, 7]
merkkijonot = [str(luku) for luku in luvut]
```

Koosteessa näyttää siis olevan jotakuinkin samat elementit kuin perinteisessäkin toteutuksessa, mutta syntaksi on uudenlainen. Yleisemmin listakoosteen syntaksi voitaisiin esittää esimerkiksi näin:

`[<lauseke> for <alkio> in <sarja>]`

Koosteen ympärillä olevat hakasulkeet kertovat, että lopputuloksena on uusi lista. Koosteessa poimitaan yksi kerrallaan alkio alkuperäisestä sarjasta (esimerkkimme tapauksessa listasta) ja tallennetaan siihen liittyvän lausekkeen arvo uuteen listaan. Lopputuloksena on lista, jossa on yhtä paljon alkioita kuin alkuperäisessä listassa ja kaikki alkiot on käsitelty samalla tavalla.

<img src="11_1_2.png">

Toisessa esimerkissä jokainen alkuperäisen listan alkio kerrotaan kymmenellä ja tallennetaan uuteen listaan:

```python
luvut = list(range(1,10))
print(luvut)

luvut_kerrottuna = [luku * 10 for luku in luvut]
print(luvut_kerrottuna)
```

<sample-output>

[1, 2, 3, 4, 5, 6, 7, 8, 9]
[10, 20, 30, 40, 50, 60, 70, 80, 90]

</sample-output>

Lauseke voi olla mikä tahansa Pythonin lauseke. Esimerkiksi koosteessa voidaan kutsua itse määriteltyä funktiota:

```python
def kertoma(n: int):
    """ Funktio laskee positiivisen luvun n kertoman n! """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    lista = [5, 2, 4, 3, 0]
    kertomat = [kertoma(luku) for luku in lista]
    print(kertomat)
```

<sample-output>

[120, 2, 24, 6, 1]

</sample-output>

Sama ohjelma esitettynä perinteisellä silmukalla näyttäisi tältä:

```python

def kertoma(n: int):
    """ Funktio laskee positiivisen luvun n kertoman n! """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    lista = [5, 2, 4, 3, 0]
    kertomat = []
    for luku in lista:
        kertomat.append(kertoma(luku))
    print(kertomat)

```

Koosteen avulla on siis mahdollista ilmaista sama toiminnallisuus tiiviimmin ja silti yhä helposti luettavassa muodossa.

Palauttamalla funktiosta suoraan kooste saadaan aikaiseksi hyvin tiivistä koodia:

```python
def kertomat(luvut: list):
    return [kertoma(luku) for luku in luvut]
```

<programming-exercise name='Square roots' tmcname='part11-01_square_roots'>

Please write a function named `square_roots(numbers: list)` which takes a list of integers as its argument. The function should return a new list containing the square roots of the original integers. The [math](https://docs.python.org/3/library/math.html) module from the Python standard library contains a suitable function for calculating the square root.

The function should use a list comprehension technique. The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword.

The function should work as follows:

```python
lines = square_roots([1,2,3,4])
for line in lines:
    print(line)
```

<sample-output>

1.0
1.4142135623730951
1.7320508075688772
2.0

</sample-output>

</programming-exercise>

<programming-exercise name='Star rows' tmcname='part11-02_rows_of_stars'>

Please write a function named `rows_of_stars(numbers: list)` which takes a list of integers as its argument. The function should return a new list containing rows of stars. The length of each row should correspond to the integer at the same index in the original list. The function should use a list comprehension technique to achieve this.

The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword.

The function should work as follows:

```python
rows = rows_of_stars([1,2,3,4])
for row in rows:
    print(row)

print()

rows = rows_of_stars([4, 3, 2, 1, 10])
for row in rows:
    print(row)
```

<sample-output>

<pre>
*
**
***
****

****
***
**
*
**********
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Best exam result' tmcname='part11-03_best_exam_result'>

The exercise template contains the class definition `ExamResult`. The class has the following public attributes:

* name
* grade1
* grade2
* grade3

Please write a function named `best_results(results: list)` which takes a list of ExamResult objects as its argument.

The function should return a new list containing only the best result from each ExamResult object. The function should use a list comprehension technique to achieve this.

The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword.

The function should work as follows:

```python
result1 = ExamResult("Peter",5,3,4)
result2 = ExamResult("Pippa",3,4,1)
result3 = ExamResult("Paul",2,1,3)
results = [result1, result2, result3]
print(best_results(results))
```

<sample-output>

[5, 4, 3]

</sample-output>

</programming-exercise>

<programming-exercise name='Lengths' tmcname='part11-04_lengths'>

Please write a function named `lengths(lists: list)` which takes a list containing lists of integers as its argument. The function should return a new list containing the lengths of the lists within the arguent list.

The function should use a list comprehension technique to achieve this. The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword.

The function should work as follows:

```python
lists = [[1,2,3,4,5], [324, -1, 31, 7],[]]
print(lengths(lists))
```

<sample-output>

[5, 4, 0]

</sample-output>

</programming-exercise>


## Alkoiden suodatus

Edellisissä esimerkeissä uusi lista muodostettiin kaikista alkuperäisen listan alkioista. Joskus on kuitenkin näppärää, jos voitaisiin valita alkuperäiseltä listalta vain tietyt alkiot. Koosteessa tämä onnistuu yhdistämällä siihen ehto-osa. Yleinen syntaksi on seuraava:

`[<lauseke> for <alkio> in <sarja> if <ehtolauseke>]`

Erotuksena aiempaan koosteen loppuun kirjoitetaan siis ehtolause. Ainoastaan ne alkiot poimitaan mukaan tuloslistaan, joiden kohdalla ehtolauseke on tosi.

Esimerkissä poimitaan kaikki parilliset alkiot uuteen listaan. Huomaa, että lausekkeena on esimerkissä ainoastaan listan alkio eli poimittavia alkioita ei käsitellä minkään operaation avulla ennen sijoittamista uuteen listaan:

```python
lista = [1, 1, 2, 3, 4, 6, 4, 5, 7, 10, 12, 3]

parilliset = [alkio for alkio in lista if alkio % 2 == 0]
print(parilliset)
```

<sample-output>

[2, 4, 6, 4, 10, 12]

</sample-output>

Jos lausekkeeksi on määritelty jotain muuta kuin pelkkä alkio, mukaan otetuille alkoille toteutetaan tämä operaatio kuten ennenkin. Muokataan edellistä esimerkkiä niin, että uudessa listassa on kaikki alkuperäisen listan parilliset alkiot kerrotuna kymmenellä:

```python
lista = [1, 1, 2, 3, 4, 6, 4, 5, 7, 10, 12, 3]

parilliset = [alkio * 10 for alkio in lista if alkio % 2 == 0]
print(parilliset)
```

<sample-output>

[20, 40, 60, 40, 100, 120]

</sample-output>

Seuraavassa esimerkissä lasketaan ainoastaan positiivisten alkioiden kertoma:

```python
def kertoma(n: int):
    """ Funktio laskee positiivisen luvun n kertoman n! """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    lista = [-2, 3, -1, 4, -10, 5, 1]
    kertomat = [kertoma(luku) for luku in lista if luku > 0]
    print(kertomat)
```

<sample-output>

[6, 24, 120, 1]

</sample-output>

Tarkastellaan vielä edellisestä jatkettua esimerkkiä, jossa kertoma lasketaan vain parillisista positiivista luvuista. Lisäksi listaan tallennetaan tuplessa sekä alkuperäinen alkio että kertoma:

```python

def kertoma(n: int):
    """ Funktio laskee positiivisen luvun n kertoman n! """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    lista = [-2, 3, 2, 1, 4, -10, 5, 1, 6]
    kertomat = [(luku, kertoma(luku)) for luku in lista if luku > 0 and luku % 2 == 0]
    print(kertomat)

```

<sample-output>

[(2, 2), (4, 24), (6, 720)]

</sample-output>

Esimerkissä lauseke on siis `(luku, kertoma(luku))`, joka muodostaa tuplen, jossa ensimmäinen alkio on alkio alkuperäisestä listasta ja toinen alkio kertoma-funktion palauttama arvo. Ehtolauseke on `luku > 0 and luku % 2 == 0`, jossa valikoidaan mukaan vain alkiot, jotka ovat sekä positiivisia että jaollisia kahdella.

<programming-exercise name='Remove smaller than' tmcname='part11-05_remove_smaller_than'>

Please write a function named `remove_smaller_than(numbers: list, limit: int)` which takes a list of integers and a limit value (also in integer format) as its arguments.

The function should use a list comprehension technique to produce a new list without the values which are smaller than the limit value.

The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword.

An example of the function in use:

```python
numbers = [1,65, 32, -6, 9, 11]
print(remove_smaller_than(numbers, 10))

print(remove_smaller_than([-4, 7, 8, -100], 0))
```

<sample-output>

[65, 32, 11]
[7, 8]

</sample-output>

</programming-exercise>

<programming-exercise name='Begin with a vowel' tmcname='part11-06_begin_with_vowel'>

Please write a function named `begin_with_vowel(words: list)` which takeas a list of strings as its argument.

The function should use a list comprehension technique to create and return a new list, containing only those words from the original list which begin with a vowel (a, e, i, o, u). Both lowercase and uppercase letters should be fine.

The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword.

An example of the function in use:

```python
word_list = ["automobile","motorbike","Animal","cat","Dog","APPLE","orange"]
for vowelled in begin_with_vowel(word_list):
    print(vowelled)
```

<sample-output>

automobile
Animal
APPLE
orange

</sample-output>

</programming-exercise>

## Vaihtoehtoinen haara suodatuksessa

Koosteessa voi käyttää ehtolauseen ohella myös vaihtoehtoista haaraa. Tämä onnistuu käyttämällä jo aiemmin mainittua _ehtolauseketta_:

`<lauseke 1> if <ehto> else <lauseke 2>`

...joka saa arvokseen joko lausekkeen 1 tai 2 arvon riippuen siitä, onko ehto tosi vai epätosi.

Niinpä esim. ohjelma, joka tulostaa kahdesta luvusta suuremman yhdellä print-lauseella voisi näyttää tältä:

```python
luku1 = int(input("Anna luku 1:"))
luku2 = int(input("Anna luku 2:"))
print (luku1 if luku1 > luku2 else luku2)
```

Kun yhdistetään syntaksi listakoosteeseen, saadaan seuraavankaltainen rakenne:

`[<lauseke 1> if <ehto> else <lauseke 2> for <alkio> in <sarja>]`

Lopputuloksena syntyvässä listassa on yksi alkio jokaista alkuperäisen sarjan alkiota kohti. Jokaiselle alkiolle suoritetaan joko lauseke 1 tai lauseke 2 riippuen siitä onko ehtolauseke tosi vai ei.

Seuraava esimerkki muodostaa uuden listan, jossa alkuperäisen listan negatiiviset alkiot on käännetty vastaluvuikseen - positiiviset alkiot kelpuutetaan sellaisenaan. Käytännössä koostelause siis muodostaa listan alkuperäisen listan itseisarvoista.

```python

luvut = [1, -3, 45, -110, 2, 9, -11]
itseisarvot = [luku if luku >= 0 else -luku for luku in luvut]
print(itseisarvot)

```

<sample-output>

[1, 3, 45, 110, 2, 9, 11]

</sample-output>

Suoritettava lauseke on siis `luku` (eli alkio sellaisenaan), jos ehto `luku >= 0` on tosi, muuten suoritetaan lauseke `-luku`.

Seuraavassa esimerkissä funktio `merkkijonojen_pituudet` saa parametrikseen sekalaisia alkioita sisältävän listan. Funktio laskee merkkijonoista tuloslistaan pituuden, muun tyyppisten alkioiden kohdalle asetetaan -1.

```python

def merkkijonojen_pituudet(lista: list):
    """ Funktio palauttaa uudessa listassa merkkijonojen pituudet """
    return [len(alkio) if type(alkio) == str else -1 for alkio in lista]

if __name__ == "__main__":
    testilista = ["moi", 3, True, "kaikki", -123.344, "heipparallaa", 2, False]
    pituudet = merkkijonojen_pituudet(testilista)
    print(pituudet)

```

<sample-output>

[3, -1, -1, 6, -1, 12, -1, -1]

</sample-output>


<programming-exercise name='Lottery numbers' tmcname='part11-07_lottery_numbers'>

## LotteryNumbers matched

Please write a class named `LotteryNumbers` which takes the week number (an integer value) and a list of seven integers as its constructor arguments. The list should contain the correct lottery numbers for the given week. 

Please also write a method named `number_of_hits(numbers: list)` which takes a list of integers as its argument. The method returns the number of correct entries in the parameter list.

The method should use a list comprehension technique to achieve this. The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword.

An example of how the class is used:

```python
week5 = LotteryNumbers(5, [1,2,3,4,5,6,7])
my_numbers = [1,4,7,11,13,19,24]

print(week5.number_of_hits(my_numbers))
```

<sample-output>

3

</sample-output>

## LotteryNumbers matched in place

Please write a method named `hits_in_place(numbers)` which takes a list of weven integers as its argument and returns a new list of seven integers. The new list contains only those items from the parameter list which match the week's correct numbers. These must remain at the same indexes as they were in the parameter list. The rest of the indexes should be filled with values `-1`.

The method should use a list comprehension technique to achieve this. The maximum length of the function is two lines of code, including the header line beginning with the `def` keyword.

Please take a look at the example below:

```python
week8 = LotteryNumbers(8, [1,2,3,10,20,30,33])
my_numbers = [1,4,7,10,11,20,30]

print(week8.hits_in_place(my_numbers))
```

<sample-output>

[1, -1, -1, 10, -1, 20, 30]

</sample-output>

</programming-exercises>
