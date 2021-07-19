---
path: '/part-4/4-definite-iteration'
title: 'Definite iteration'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know the difference between definite and indefinite iteration 
- You will know how a Python `for` loop works
- You will be able to use a `for` loop to iterate through lists and strings

</text-box>

YOu can use a `while` loop to go through the items in a list, just like we used while loops to go through strings. The following program prints out the items in the list, each on a separate line:

```python
my_list = [3, 2, 4, 5, 2]

index = 0
while index < len(my_list):
    print(my_list[index])
    index += 1
```

<sample-output>

3
2
4
5
2

</sample-output>

This obviously works, but it is a rather complicated way of going throigh a list, as we have to use a helper variable `index` to remember which item in the list we are at. Fortunately, Python offers a more intuitive way of traversing through lists, strings and other similar structures.

## The for loop

When you want to go through some ready collection of items, the Python `for` loop will do this for you. For instance, the loop can go through all items in a list from first to last.

When using a `while` loop the program doesn't "know" beforehand how many iterations the loop will perform. It will repeat until the condition becomes false, or the loop is otherwise broken out of. That is why it falls under _indefinite iteration_. With a for loop the number of iterations is determined when the loop is set up, and so it falls under _definite iteration_.

The idea is that the `for` loop takes the items in the collection one by one and performs the same actions on each. The programmer does not have to concern themselves with which item is being handled when. The syntax of the for loop is as follows:

```python
for <variable> in <collection>:
    <block>
```

The `for` loop takes an item in the collection, assigns it to the variable, processes the block of code, and moves on to the next item. When all items in the collection have been processed, execution of the program continues from the line after the loop.

<img src="4_3_1.png" alt="Iterating through a list">

The following program prints out all items in a list using a `for` loop:

```python
my_list = [3, 2, 4, 5, 2]

for item in my_list:
    print(item)
```

<sample-output>

3
2
4
5
2

</sample-output>

Compared to the example at the beginning of this section, the structure is much easier to understand here. A `for` loop makes straightforward traversal through a collection of items very simple.

The same principle applies to characters in a string:

```python
name = input("Please type in your name: ")

for character in name:
    print(character)
```

<sample-output>

Please type in your name: Grace
G
r
a
c
e

</sample-output>

<programming-exercise name='Tulostus tähdillä' tmcname='osa04-11a_tulostus_tahdilla'>

Tee ohjelma, joka pyytää käyttäjää syöttämään merkkijonon ja tulostaa sitten merkkijonon kirjaimet yksitellen allekkain.

Jokaisen kirjaimen jälkeen tulostetaan lisäksi tähti (*) omalle rivilleen.

Esimerkiksi:

<sample-output>

Anna merkkijono: **Python**
P
*
y
*
t
*
h
*
o
*
n
*

</sample-output>

**Huom:** tässä tehtävässä (eikä missään muussakaan tehtävissä missä _ei_ erikseen pyydetä funktioiden toteuttamista) mitään koodia __ei tule sijoittaa__
`if __name__ == "__main__"`-lohkoon!

</programming-exercise>

## Funktio `range`

Silmukkaa tarvitaan usein myös siihen, että haluamme toistaa jonkin asian tietyn määrän kertoja tai käydä läpi tietyn lukuvälin (esimerkiksi kaikki luvut väliltä 1–100). Myös tämä onnistuu kätevästi `for`-silmukalla funktion `range` avulla.

Voimme kutsua `range`-funktiota monella tavalla. Yksinkertaisin tapa on `range(n)`, jolloin silmukka käy läpi kokonaisluvut 0:sta lukuun `n`–1:

```python
for i in range(5):
    print(i)
```

<sample-output>

0
1
2
3
4

</sample-output>

Kun annamme kaksi parametria, `range(a, b)` aloittaa luvusta `a` ja lopettaa lukuun `b`–1:

```python
for i in range(3, 7):
    print(i)
```

<sample-output>

3
4
5
6

</sample-output>

Kun annamme kolme parametria, `range(a, b, c)` aloittaa luvusta `a`, lopettaa lukuun `b`–1 ja muuttaa lukua `c`:llä joka askeleella:

```python
for i in range(1, 9, 2):
    print(i)
```

<sample-output>

1
3
5
7

</sample-output>

Voimme myös antaa negatiivisen askeleen, jolloin luvut käydään läpi käänteisesti:

```python
for i in range(6, 2, -1):
    print(i)
```

<sample-output>

6
5
4
3

</sample-output>

<programming-exercise name='Negatiivisesta positiiviseen' tmcname='osa04-11b_negatiivisesta_positiiviseen'>

Tee ohjelma, joka lukee käyttäjältä positiivisen kokonaisluvun N. Ohjelma tulostaa sen jälkeen luvut väliltä -N...N _nollaa lukuunottamatta_. Jokainen luku tulostetaan omalle rivilleen.

Esimerkiksi

<sample-output>

Anna luku: **4**
-4
-3
-2
-1
1
2
3
4

</sample-output>

**Huom:** tässä tehtävässä (eikä missään muussakaan tehtävissä missä _ei_ erikseen pyydetä funktioiden toteuttamista) mitään koodia __ei tule sijoittaa__
`if __name__ == "__main__"`-lohkoon!

</programming-exercise>

## Lukuväli listaksi

Funktio `range` palauttaa lukuvälin, joka voidaan käydä läpi listan kaltaisesti mutta joka ei kuitenkaan ole lista. Tämän näkee siitä, että jos tulostamme funktion palauttaman arvon, näemme vain kuvauksen lukuvälistä:

```python
luvut = range(2, 7)
print(luvut)
```

<sample-output>

range(2, 7)

</sample-output>

Tutustumme asiaan tarkemmin Ohjelmoinnin jatkokurssilla, mutta on hyvä tietää, että voimme muuttaa lukuvälin my_listksi funktiolla `list`. Tällöin my_listan tulevat kaikki lukuväliin kuuluvat arvot:

```python
luvut = list(range(2, 7))
print(luvut)
```

<sample-output>

[2, 3, 4, 5, 6]

</sample-output>

## Muistutus tehtävien funktioita testaavasta omasta koodista

Funktiotehtävien tehtäväpohjat ovat tähän asti näyttäneet seuraavilta:

```python
# tee ratkaisu tänne
# funktiota kannattaa testata kutsumalla sitä täällä seuraavasti
if __name__ == "__main__":
    lause = "olipa kerran kauan sitten ohjelmoija"
    print(eka_sana(lause))
    print(toka_sana(lause))
    print(vika_sana(lause))
```

Tästä eteenpäin muistutusta siitä, että testikoodi on sijoitettava `if __name__ == "__main__"` -lohkoon, ei tehtäväpohjissa enää ole. Testit kuitenkin vaativat lohkon edelleen, eli joudut lisäämään sen itse.

**Huomaa kuitenkin**, että jotkut tehtävät, esim. hetken kuluttua vuorossa oleva _Palindromit_, edellyttävät funktioiden lisäksi myös funktiota kutsuvaa koodia. Tätä koodia _ei tule_ sijoittaa  `if __name__ == "__main__"` -lohkon sisälle. Testit eivät nimittäin suorita mitään kyseisen lohkon koodista.

<programming-exercise name='Tähdet' tmcname='osa04-12_tahdet'>

Tee funktio `lista_tahtina`, joka saa parametriksi listan kokonaislukuja. Funktio tulostaa joukon tähtirivejä siten, että listalla olevat luvut kertovat kunkin rivin tähtimäärän.

Esim. kutsuttaessa `lista_tahtina([3, 7, 1, 1, 2])` tulostus on:

<sample-output>

<pre>
***
*******
*
*
**
</pre>

</sample-output>

<!-- **Huomaa** että tällä hetkellä Windowsissa on ongelmia joidenkin tehtävien testien suorittamisessa. Jos törmäät seuraavaan virheilmoitukseen

<img src="4_3_2.png" alt="Listan iterointi">

voit suorittaa testit lähettämällä ne palvelimelle valitsemalla testien suoritusnapin oikealla puolella olevasta symbolista avautuvasta TMC-valikosta _Submit solutions_.

Ongelman saa korjattua menemällä laajennuksen asennusvalikkoon ja muuttamalla "TMC Data" -kohdassa tehtävien sijainnin johonkin toiseen sijaintiin, jonka tiedostopolku on lyhempi, allaolevassa kuvassa nappi _change path_. Siirrossa saattaa kestää hetken, joten odotathan operaation päättymistä.

<img src="4_3_3.png" alt="Listan iterointi">

Ongelmaan pyritään saamaan parempi ratkaisu lähipäivinä. -->

</programming-exercise>

<programming-exercise name='Anagrammi' tmcname='osa04-13_anagrammi'>

Tee funktio `anagrammi` joka saa parametriksi kaksi merkkijonoa. Funktio palauttaa `True`, jos merkkijonot ovat anagrammeja eli ne muodostuvat täsmälleen samoista kirjaimista.

Esimerkiksi funktiota voisi käyttää näin:

```python
print(anagrammi("talo", "tola")) # True
print(anagrammi("talo", "lato")) # True
print(anagrammi("talo", "olat")) # True
print(anagrammi("tammi", "mitta")) # False
print(anagrammi("python", "java")) # False
```

Vihje: funktio `sorted` toimii myös merkkijonoille.

</programming-exercise>

<programming-exercise name='Palindromit' tmcname='osa04-14_palindromit'>

Tee funktio `palindromi`, joka saa parametriksi merkkijonon ja palauttaa True, jos merkkijono on palindromi (eli samansisältöinen luettuna alusta loppuun tai lopusta alkuun).

Tee myös funktiota hyödyntävä pääohjelma, joka kyselee käyttäjältä sanoja niin kauan, kunnes käyttäjä syöttää palindromin:

<sample-output>

Anna sana: **python**
ei ollut palindromi
Anna sana: **java**
ei ollut palindromi
Anna palindromi: **kauppias**
ei ollut palindromi
Anna palindromi: **saippuakauppias**
saippuakauppias on palindromi!

</sample-output>

**Huomaa**, että pääohjelmaa **ei tule kirjoittaa**
`if __name__ == "__main__":`-lohkon sisälle

</programming-exercise>

<programming-exercise name='Positiivisten summa' tmcname='osa04-15_positiivisten_summa'>

Tee funktio `positiivisten_summa`, joka saa parametriksi kokonaislukuja sisältävän listan.

Funktio palauttaa listan positiivisten lukujen summan.

```python
my_list = [1, -2, 3, -4, 5]
vastaus = positiivisten_summa(my_list)
print("vastaus", vastaus)
```

<sample-output>

vastaus 9

</sample-output>

</programming-exercise>

Kertaa nyt tarvittaessa [edellisen osion](/osa-4/3-listat) luku _Lista funktion parametrina ja paluuarvona_!

<programming-exercise name='Parilliset' tmcname='osa04-16_parilliset'>

Tee funktio `parilliset`, joka saa parametriksi kokonaislukuja sisältävän listan.

Funktio palauttaa uuden listan, jolla on parametrina olevan listan sisältämät parilliset luvut.

```python
my_list = [1, 2, 3, 4, 5]
uusi_my_list = parilliset(my_list)
print("alkuperäinen", lista)
print("uusi", uusi_lista)
```

<sample-output>

alkuperäinen [1, 2, 3, 4, 5]
uusi [2, 4]

</sample-output>

</programming-exercise>

<programming-exercise name='Summalista' tmcname='osa04-17_summalista'>

Tee funktio `summa`, joka saa parametriksi kaksi kokonaislukuja sisältävää listaa. Molemmissa listoissa on sama määrä alkioita.

Funktio palauttaa uuden listan, jonka alkiot muodostuvat parametreina olevien listojen alkioiden summista.

Esim:

```python
a = [1, 2, 3]
b = [7, 8, 9]
print(summa(a, b)) # [8, 10, 12]
```

</programming-exercise>

<programming-exercise name='Uniikit' tmcname='osa04-18_uniikit'>

Tee funktio `uniikit`, joka saa parametriksi kokonaislukuja sisältävän listan.

Funktio palauttaa uuden listan, joka sisältää parametrina annetun listan luvut suuruusjärjestyksessä siten, että jokainen luku on listalla vain kerran.

```python
my_list = [3, 2, 2, 1, 3, 3, 1]
print(uniikit(my_list)) # [1, 2, 3]
```

</programming-exercise>

## Parhaan tai huonoimman etsiminen listalta

Ohjelmoinnissa tulee usein esiin tilanne, missä listalta on löydettävä jonkin kriteerin mukaan paras tai huonoin alkio. Ratkaisu onnistuu käyttämällä sopivaa apumuuttujaa, jonka avulla voidaan "muistaa" läpikäynnin aikana siihen mennessä löytynyt paras alkio. Tätä muistettavaa alkiota verrataan sitten yksi kerrallaan jokaiseen vastaantulevaan alkioon, ja lopulta on tiedossa koko listan paras.

Algoritmin "luonnos" on seuraavassa:

```python
paras = alkuarvo # sopiva alkuarvo riippuu tilanteesta
for alkio in my_list:
    if alkio parempi kuin paras:
        paras = alkio

# paras on nyt tiedossa!
```

Koodin yksityiskohdat riippuvat siitä minkä tyyppisiä alkioita listalla on ja mikä parhauden/huonouden vertailukriteeri on käytössä. Joissain tilanteissa myös apumuuttujia saatetaan tarvita useampia.

Harjoitellaan hieman tämän ratkaisumenetelmän käyttöä.

<programming-exercise name='Listan pisimmän pituus' tmcname='osa04-18a_listan_pimman_pituus'>

Tee funktio `pisimman_pituus`, joka saa parametriksi listan merkkijonoja. Funktio palauttaa tiedon mikä on listan pisimmän merkkijonon pituus.

```python
my_list = ["eka", "toka", "kolmas", "seitsemäs"]

tulos = pisimman_pituus(my_list)
print(tulos)
```

```python
my_list = ["pekka", "emilia", "venla", "eero", "antti", "juhani"]

tulos = pisimman_pituus(my_list)
print(tulos)
```

<sample-output>

9
6

</sample-output>

</programming-exercise>

<programming-exercise name='Listan lyhin' tmcname='osa04-18b_listan_lyhin'>

Tee funktio `lyhin`, joka saa parametriksi listan merkkijonoja. Funktio tulostaa listan lyhimmän merkkijonon. Jos samanpituisia on useita (testeissä näin ei ole), voi funktio palauttaa niistä minkä vaan. Funktio voi olettaa että listalla ei ole tyhjiä eli nollan pituisia merkkijonoja.


```python
my_list = ["eka", "toka", "kolmas", "seitsemäs"]

tulos = lyhin(my_list)
print(tulos)
```

```python
my_list = ["pekka", "emilia", "johanna", "venla", "eero", "antti"]

tulos = lyhin(my_list)
print(tulos)
```

<sample-output>

eka
eero

</sample-output>

</programming-exercise>

<programming-exercise name='Listan pisimmät' tmcname='osa04-19_listan_pisimmat'>

Tee funktio `pisimmat`, joka saa parametriksi listan merkkijonoja. Funktio palauttaa listan, joka sisältää parametrina annetun listan pisimmän merkkijonon. Jos pisimpiä merkkijonoja on useampia, funktio palauttaa ne kaikki listassa.

Nimien järjestyksen tuloslistassa tulee noudattaa nimien järjestystä alkuperäisessä listassa.

```python
my_list = ["eka", "toka", "kolmas", "seitsemäs"]

tulos = pisimmat(my_list)
print(tulos) # ['seitsemäs']
```

```python
my_list = ["pekka", "emilia", "venla", "eero", "antti", "juhani"]

tulos = pisimmat(my_list)
print(tulos) # ['emilia', 'juhani']
```

</programming-exercise>

A quiz to review the contents of this section:

<quiz id="b1a91143-3137-5833-a771-6801f541a43b"></quiz>
