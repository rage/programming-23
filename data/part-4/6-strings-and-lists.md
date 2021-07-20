---
path: '/part-4/6-strings-and-lists'
title: 'More strings and lists'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be familiar with more methods for slicing strings and lists
- You will understand what immutability of strings means
- You will be able to use the methods `count` and `replace`

</text-box>

You are already familiar with the `[]` syntax for accessing a part of a string:

```python
my_string = "exemplary"
print(my_string[3:7])
```

<sample-output>

mpla

</sample-output>

The same syntax works with lists. Lists can be sliced just like strings:

```python
my_list = [3,4,2,4,6,1,2,4,2]
print(my_list[3:7])
```

<sample-output>

[4, 6, 1, 2]

</sample-output>

## More slices

In fact the `[]` syntax works very similarly to the `range` function, which means we can also give it a step:

```python
my_string = "exemplary"
print(my_string[0:7:2])
my_list = [1,2,3,4,5,6,7,8]
print(my_list[6:2:-1])
```

<sample-output>

eepa
[7, 6, 5, 4]

</sample-output>

If we omit either of the indices, the operator defaults to including everything. Among other things, this allows us to write a very short program to reverse a string:

```python
my_string = input("Please type in a string: ")
print(my_string[::-1])
```

<sample-output>

Please type in a string: **exemplary**
yralpmexe

</sample-output>

## Warning: using global variables within functions

We know it is possible to assign new variables within function definitions, but the function can also see variables assigned outside it, in the main function. Such variables are called _global_ variables.

Using global variables from within functions is usually a bad idea. Among other issues, doing that may cause bugs that are difficult to trace.

Below is an example of a function that uses a global variable "by mistake":

```python
def print_reversed(names: list):
    # using the global variable instead of the parameter by accident
    i = len(name_list) - 1
    while i >= 0:
        print(name_list[i])
        i -= 1

# here the global variable is assigned
name_list = ["Steve", "Jean", "Katherine", "Paul"]
print_reversed(name_list)
print()
print_reversed(["Huey", "Dewey", "Louie"])
```

<sample-output>

Paul
Katherine
Jean
Steve

Paul
Katherine
Jean
Steve

</sample-output>

Even though the function calls both have the right kind of arguments, the function always prints out what is stored in the global variable `name_list`.

To make matters even more muddled, remember that all code for testing your functions should be placed within the `if __name__ == "__main__":` block for the automatic tests. The previous example should be modified:

```python
def print_reversed(names: list):
    # using the global variable instead of the parameter by accident
    i = len(name_list) - 1
    while i>=0:
        print(name_list[i])
        i -= 1

# All the code for testing the function should be within this block
if __name__ == "__main__":
    # here the global variable is assigned
    name_list = ["Steve", "Jean", "Katherine", "Paul"]
    print_reversed(name_list)
    print()
    print_reversed(["Huey", "Dewey", "Louie"])
```

Notice the global variable is assgined within the `if` block now.

The automatic tests in the TMC system are executed without running any of the code in the `if` block. So, in this latter example the function couldn't even theoretically work at all, since it refers to the variable `name_list`, which doesn't exist at all when the tests are executed.

<programming-exercise name='Everything reversed' tmcname='part04-33_everything_reversed'>

Please write a function named `everything_reversed` which takes a list of strings as an argument. The function returns a new list with all of the items on the original list reversed. Also the order of items should be reversed on the new list.

An example of how the function should work:

```python
my_list = ["Hi", "there", "example", "one more"]
new_list = everything_reversed(my_list)
print(new_list)
```

<sample-output>

['erom eno', 'elpmaxe', 'ereht', 'iH']

</sample-output>

</programming-exercise>

## Strings are immutable

Strings and lists have a lot in common, especially in the way they behave with different operators. The main difference is that strings are _immutable_, that is, they cannot be changed.

```python
my_string = "exemplary"
my_string[0] = "a"
```

Strings cannot be changed, so the execution of this program causes an error:

<sample-output>

TypeError: 'str' object does not support item assignment

</sample-output>

A similar error follows if you try to sort a string with the `sort` method.

Strings themselves are immutable, but the variables holding them are not. A string can be replaced by another string.

The following two examples are thus fundamentally different:

```python
my_list = [1,2,3]
my_list[0] = 10
```

<img src="4_4_1.png">

```python
my_string = "Hi"
my_string = my_string + "!"
```

<img src="4_4_2.png">

The first example changes the contents of the referenced list. The second example replaces the reference to the original string with a reference to another string. The original string is still somewhere in computer memory, but there is no reference to it, and it cannot be used in the program any longer.

We will return to this subject in the next part, where references to lists are explored in more detail.

## More methods for lists and strings

The method `count` counts the number of times the specified item or substring occurs in the target. The method works similarly with both strings and lists: 

```python
my_string = "How much wood would a woodchuck chuck if a woodchuck could chuck wood"
print(my_string.count("ch"))

my_list = [1,2,3,1,4,5,1,6]
print(my_list.count(1))
```

<sample-output>

5
3

</sample-output>

The method will not count overlapping occurrences. For example, in the string `aaaa` the method counts only two occurrences of the substring `aa`, even though there would actually be three if overlapping occurrences were allowed.

The method `replace` creates a new string, where a specified substring is replaced with another string:

```python
my_string = "Hi there"
new_string = my_string.replace("Hi", "Hey")
print(new_string)
```

<sample-output>

Hey there

</sample-output>

The method will replace all occurrences of the substring:

```python
sentence = "sheila sells seashells on the seashore"
print(sentence.replace("she", "SHE"))
```

<sample-output>

SHEila sells seaSHElls on the seashore

</sample-output>

A typical mistake when using the `replace` method is forgetting strings are immutable:

```python
my_string = "Python is fun"

# Replaces the substring but doesn't store the result...
my_string.replace("Python", "Java")
print(my_string)
```

<sample-output>

Python is fun

</sample-output>

If the old string is no longer needed, the new string can be assigned to the same variable:

```python
my_string = "Python is fun"

# Replaces the substring and stores the result in the same variable
my_string = my_string.replace("Python", "Java")
print(my_string)
```

<sample-output>

Java is fun

</sample-output>

<programming-exercise name='Most common character' tmcname='part04-34_most_common_character'>

Please write a function named `most_common_character` which takes a string argument. The function returns the character which has the most occurrences within the string. If there are many characters with equally many occurrences, the one which appears first in the string should be returned.

An example of expected behaviour:

```python
first_string = "abcbdbe"
print(most_common_character(first_string))

second_string = "exemplaryelementary"
print(most_common_character(second_string))
```

<sample-output>

b
e

</sample-output>

</programming-exercise>


<programming-exercise name='No vowels allowed' tmcname='part04-23_no_vowels'>

Please write a function named `no_vowels` which takes a string argument, The function returns a new string which is the same as the original but with all vowels removed. 

You can assume the string will contain only characters from the lowercase English alphabet a...z.

An example of expected behaviour:

```python
my_string = "this is an example"
print(no_vowels(my_string))
```

<sample-output>

ths s n exmpl

</sample-output>

</programming-exercise>


<programming-exercise name='No shouting allowed' tmcname='part04-36_no_shouting'>

The Python string method `isupper()` returns `True` if a string consists of _only_ uppercase characters.

Some examples:

```python
print("XYZ".isupper())

is_it_upper = "Abc".isupper()
print(is_it_upper)
```

<sample-output>

True
False

</sample-output>

Please use the `isupper` method to write a function named `no_shouting` which takes a list of strings as an argument. The function returns a new list containing only those items from the original which do not consist of solely uppercase characters.

An example of expected behaviour:

```python
my_list = ["ABC", "def", "UPPER", "ANOTHERUPPER", "lower", "another lower", "Capitalized"]
pruned_list = no_shouting(my_list)
print(pruned_list)
```

<sample-output>

['def', 'lower', 'another lower', 'Capitalized']

</sample-output>

</programming-exercise>

<programming-exercise name='Neighbours in a list' tmcname='part04-37_neighbours_in_list'>

Let's decide that the items in a list are neighbours if their difference is 1. So, items 1 and 2 would be neighbours, and so would items 56 and 55.

Please write a function named `longest_series_of_neighbours` which looks for the longest series of neighbours within the list, and returns its length. 

For example, in the list `[1, 2, 5, 4, 3, 4]` the longest list of neighbours would be  `[5, 4, 3, 4]`, with a length of 4.

An example function call:

```python
my_list = [1, 2, 5, 7, 6, 5, 6, 3, 4, 1, 0]
print(longest_series_of_neighbours(my_list))
```

<sample-output>

4

</sample-output>

</programming-exercise>

## Laajemman ohjelman tekeminen

Tämän osan huipentaa ensimmäinen hieman laajempi ohjelma, jota tehdessäsi pääset soveltamaan kaikkea tähän asti opeteltua.

Sääntö numero yksi isompaa tai oikeastaan mitä tahansa ohjelmaa tehdessä on se, että ei kannata yrittää ratkaista kaikkia ongelmia yhtä aikaa. Ohjelma kannattaa rakentaa pienistä paloista kuten sopivista apufunktioista, ja kunkin palan toimivuus kannattaa varmistaa ennen kun alkaa rakentaa seuraavaa palaa. Jos näin ei tee, on aika varmaa että edessä on suuri kaaos.

Isompaa ohjelmaa rakentaessa on järkevää testailla ohjelman funktioita aluksi erillään pääohjelmasta. Yksi helppo tapa on tehdä myös pääohjelmasta oma funktio, esimerkiksi nimeltään `main`, jonka ohjelman funktioiden ulkopuoleinen osa käynnistää. Esimerkiksi seuraavaa tehtävää voitaisiin ruveta lähestymään näin:

```python
def main():
    pisteet = []
    # ohjelman koodi tänne

main()
```

Näin ohjelman apumetodeja on mahdollista testata ilman pääohjelman suorittamista:

```python
# apumetodi, joka laskee arvosanan pisteiden perusteella
def arvosana(pisteet):
    # koodia

def main():
    pisteet = []
    # ohjelman koodi tänne

# kommentoidaan pääohjelma pois
#main()

# testataan apumetodia
pistemaara = 35
tulos = arvosana(pistemaara)
print(tulos)
```

## Tiedon välittäminen funktiosta toiseen

Jos ohjelma koostuu useista funktioista, nousee esiin kysymys, miten tietoa siirretään funktiosta toiseen.

Seuraavassa on esimerkki ohjelmasta, joka lukee käyttäjältä joukon kokonaislukuarvoja. Sen jälkeen ohjelma tulostaa arvot ja tekee niille vielä "analyysin". Ohjelma on jaettu kolmeen erilliseen funktioon:

```python
def lue_kayttajalta(maara: int):
    print(f"Syötä {maara} lukua:")
    luvut = []

    for i in range(maara):
        luku = int(input("Anna luku: "))
        luvut.append(luku)

    return luvut

def tulosta(luvut: list):
    print("Luvut ovat: ")
    for luku in luvut:
        print(luku)

def analysoi(luvut: list):
    keskiarvo = sum(luvut) / len(luvut)
    return f"Lukuja yhteensä {len(luvut)}, keskiarvo {keskiarvo}, pienin {min(luvut)} ja suurin {max(luvut)}"

# funktioita käyttävä "pääohjelma"
syotteet = lue_kayttajalta(5)
tulosta(syotteet)
analyysin_tulos = analysoi(syotteet)
print(analyysin_tulos)
```

Esimerkkisuoritus:

<sample-output>

Syötä 5 lukua:
Anna luku: **10**
Anna luku: **34**
Anna luku: **-32**
Anna luku: **99**
Anna luku: **-53**
Luvut ovat:
10
34
-32
99
-53
Lukuja yhteensä 5, keskiarvo 11.6, pienin -53 ja suurin 99

</sample-output>

Perusperiaatteena ohjelmassa on se, että pääohjelma "tallentaa" ohjelman käsittelemän tiedon eli tässä tapauksessa käyttäjän syöttämät luvut muuttujassa `syotteet`.

Jos lukuja on tarve käsitellä jossain funktiossa, ne välitetään sinne parametrina. Näin tapahtuu funktioissa `tulosta` ja `analysoi`. Jos taas funktio tuottaa tietoa, jota muut ohjelman osat tarvitsevat, palauttaa funktio datan `return`-komennolla. Näin tekevät käyttäjän syötteen lukeva funktio `lue_kayttajalta` sekä analyysin tekevä funktio `analysoi`.

Olisi periaatteessa mahdollista, että funktiot käyttäisivät suoraan "pääohjelman" globaalia muuttujaa `syotteet`. Se [ei kuitenkaan ole järkevää](https://softwareengineering.stackexchange.com/questions/148108/why-is-global-state-so-evil), sillä jos funktiot muuttamaan globaalia muuttujaa, voi ohjelmassa alkaa tapahtua jotain hallitsematonta, varsinkin kun funktioiden määrä kasvaa.

Tiedon välitys funktioihin ja niistä ulos on siis järkevintä hoitaa parametrien ja paluuarvojen avulla.

Jos haluaisimme tehdä edellisen esimerkin ohjelman siten, että sen pääohjelma eriytettäisiin omaan funktioon `main`, siirrettäisiin ohjelman käsittelemä data pääohjelmaa edustavan funktion sisäiseksi muuttujaksi:

```python
# pääohjelmaa edustava funktio
def main():
    syotteet = lue_kayttajalta(5)
    tulosta(syotteet)
    analyysin_tulos = analysoi(syotteet)

    print(analyysin_tulos)

# ohjelman käynnistys
main()
```

<programming-exercise name='Arvosanatilasto' tmcname='part04-38_arvosanatilasto'>

Tässä tehtävässä toteutetaan ohjelma kurssin arvosanatilastojen tulostamiseen.

Ohjelmalle syötetään rivejä, jotka sisältävät yhden opiskelijan koepistemäärän sekä tehtyjen harjoitustehtävien määrän. Ohjelma tulostaa niiden perusteella arvosanoihin liittyviä tilastoja.

Koepisteet ovat kokonaislukuja väliltä 0–20. Tehtyjen harjoitustehtävien lukumäärät taas kokonaislukuja väliltä 0–100.

Ohjelma kyselee käyttäjältä rivejä niin kauan, kunnes käyttäjä syöttää tyhjän rivin. Voit olettaa, että kaikki rivit on syötetty "oikein", eli rivillä on joko kaksi kokonaislukua tai rivi on tyhjä.

Koepisteiden ja harjoitustehtävien syöttäminen etenee seuraavasti:

<sample-output>

Koepisteet ja harjoitusten määrä: **15 87**
Koepisteet ja harjoitusten määrä: **10 55**
Koepisteet ja harjoitusten määrä: **11 40**
Koepisteet ja harjoitusten määrä: **4 17**
Koepisteet ja harjoitusten määrä:
Tilasto:

</sample-output>

Kun käyttäjä on syöttänyt tyhjän rivin, tulostaa ohjelma tilastot.

Tilastot muodostuvat seuraavasti:

Tehtyjen harjoitustehtävien lukumäärästä saa _harjoituspisteitä_ siten, että vähintään 10 % tehtävämäärästä tuo yhden harjoituspisteen, 20 % tuo 2 harjoituspistettä, jne., ja 100 % eli 100 harjoitustehtävää tuo 10 harjoituspistettä. Harjoitustehtävistä saatava pistemäärä on kokonaisluku.

Kurssin arvosana määräytyy kokeen pistemäärän ja harjoitustehtävistä saatavien pisteiden summasta seuraavan taulukon mukaan:

koepisteet+harjoituspisteet   | arvosana
:--:|:----:
0–14 | 0 (eli hylätty)
15–17 | 1
18–20 | 2
21–23 | 3
24–27 | 4
28–30 | 5

Edelliseen on kuitenkin poikkeus: jos kokeen pistemäärä on alle 10, on arvosana kokonaispistemäärästä riippumatta 0 eli hylätty.

Yllä olevalla esimerkkisyötteellä ohjelma tulostaa seuraavat tilastot:

<sample-output>

<pre>
Tilasto:
Pisteiden keskiarvo: 14.5
Hyväksymisprosentti: 75.0
Arvosanajakauma:
  5:
  4:
  3: *
  2:
  1: **
  0: *
</pre>

</sample-output>

Desimaaliluvut tulostetaan yhden desimaalin tarkkuudella.

**Huom:** tässä tehtävässä (eikä missään muussakaan tehtävissä missä _ei_ erikseen pyydetä funktioiden toteuttamista) mitään koodia __ei tule sijoittaa__
`if __name__ == "__main__"`-lohkoon! Eli jos ohjelmasi toiminnallisuus on esim. funktiossa `main`, tulee sitä kutsuva koodi kirjoittaa normaaliin tapaan, eikä ym. if-lohkoon kuten on tehtävä niissä tehtävissä, joissa edellytetään funktioiden toteuttamista.

**Vihje:**

Ohjelman syöte koostuu riveistä joilla on peräkkäin kaksi numeroa:

<sample-output>

Koepisteet ja harjoitusten määrä: **15 87**

</sample-output>

Syöterivi pitää pilkkoa ensin kahtia ja muuttaa palaset kokonaisluvuksi `int`-funktiolla. Rivin pilkkominen onnistuu samaalla tavalla kun tehtävässä [Eka, toka ja vika sana](/osa-4/2-lisaa-funktioista). Siihen on olemassa myös hieman helpompi keino, merkkijonojen metodi `split`. Googlaa jos haluat, käytä esim. hakusanoja *python string split*.

<!-- **Huomaa** että tällä hetkellä Windowsissa on ongelmia joidenkin tehtävien testien suorittamisessa. Jos törmäät seuraavaan virheilmoitukseen

<img src="4_3_2.png" alt="Listan iterointi">

voit suorittaa testit lähettämällä ne palvelimelle valitsemalla testien suoritusnapin oikealla puolella olevasta symbolista avautuvasta TMC-valikosta _Submit solutions_.

Ongelman saa korjattua menemällä laajennuksen asennusvalikkoon ja muuttamalla "TMC Data" -kohdassa tehtävien sijainnin johonkin toiseen sijaintiin, jonka tiedostopolku on lyhempi, allaolevassa kuvassa nappi _change path_. Siirrossa saattaa kestää hetken, joten odotathan operaation päättymistä.

<img src="4_3_3.png" alt="Listan iterointi">

Ongelmaan pyritään saamaan parempi ratkaisu lähipäivinä. -->


</programming-exercise>

A quiz to review the contents of this section:

<quiz id="925f1715-d762-5e44-a812-be13bff1aa44"></quiz>

Please respond to a quick questionnaire on this week's materials. 

<quiz id="af22017f-32f0-551f-9756-297208f5de1a"></quiz>
