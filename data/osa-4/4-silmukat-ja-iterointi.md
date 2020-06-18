---
path: '/osa-4/4-silmukat-ja-iterointi'
title: 'Silmukat ja iterointi'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, mitä tarkoitetaan iteroinnilla
- Tiedät, miten `for`-silmukka toimii
- Osaat käyttää `for`-silmukkaa listojen ja merkkijonojen läpikäyntiin

</text-box>

Voimme käydä listan alkiot läpi `while`-silmukalla samaan tapaan kuin olemme aiemmin käyneet läpi merkkijonon merkkejä. Esimerkiksi seuraava ohjelma tulostaa kaikki listan alkiot omille riveilleen:

```python
lista = [3, 2, 4, 5, 2]

kohta = 0
while kohta < len(lista):
    print(lista[kohta])
    kohta += 1
```

<sample-output>

3
2
4
5
2

</sample-output>

Tämä on kuitenkin melko vaivalloinen tapa, sillä joudumme käyttämään indeksimuuttujaa `kohta`, joka "muistaa", missä kohtaa listaa ollaan menossa. Nyt on aika opetella parempi tapa listan, merkkijonon tai muun vastaavan rakenteen läpikäyntiin.

## for-silmukka

Pythonin `for`-silmukka käy läpi annetun rakenteen sisällön. Esimerkiksi voimme käydä läpi kaikki listalla olevat alkiot vasemmalta oikealle. Ohjelmoinnissa tällaista läpikäyntiä kutsutaan myös nimellä _iterointi_.

Ideana on, että `for`-silmukka poimii yksi kerrallaan kunkin alkion ja suorittaa kaikille saman operaation. Näin ohjelmoijan ei tarvitse itse huolehtia, mistä kohdasta alkio haetaan missäkin vaiheessa. Silmukan syntaksi on seuraava:

```python
for <muuttuja> in <rakenne>:
    <lohko>
```

Kun `for`-silmukka käy listan läpi, se poimii vuorollaan kunkin alkion, sijoittaa sen muuttujaan ja suorittaa lohkon. Kun silmukka on käynyt kaikki alkiot läpi, ohjelman suoritus jatkuu silmukan jälkeiseltä riviltä.

<img src="4_3_1.png" alt="Listan iterointi">

Seuraava ohjelma tulostaa listan kaikki alkiot `for`-silmukan avulla:

```python
lista = [3, 2, 4, 5, 2]

for alkio in lista:
    print(alkio)
```

<sample-output>

3
2
4
5
2

</sample-output>

Jos verrataan tätä edelliseen esimerkkiin, huomataan, että `for`-silmukka selkeyttää suoraviivaista listan alkioiden läpikäyntiä huomattavasti.

Voimme käydä samalla idealla läpi myös merkkijonon merkit:

```python
nimi = input("Anna nimesi: ")

for merkki in nimi:
    print(merkki)
```

<sample-output>

Anna nimesi: Pekka
P
e
k
k
a

</sample-output>

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

## Lukuväli listaksi

Funktio `range` palauttaa lukuvälin, joka voidaan käydä läpi listan kaltaisesti mutta joka ei kuitenkaan ole lista. Tämän näkee siitä, että jos tulostamme funktion palauttaman arvon, näemme vain kuvauksen lukuvälistä:

```python
luvut = range(2, 7)
print(luvut)
```

<sample-output>

range(2, 7)

</sample-output>

Tutustumme asiaan tarkemmin Ohjelmoinnin jatkokurssilla, mutta on hyvä tietää, että voimme muuttaa lukuvälin listaksi funktiolla `list`. Tällöin listaan tulevat kaikki lukuväliin kuuluvat arvot:

```python
luvut = list(range(2, 7))
print(luvut)
```

<sample-output>

[2, 3, 4, 5, 6]

</sample-output>

<programming-exercise name='Tähdet' tmcname='osa04-12_tahdet'>

Tee funktio `lista_tahtina`, joka saa parametriksi listan kokonaislukuja. FUnktio tulostaa joukon tähtirivejä siten, että listalla olevat luvut kertovat kunkin rivin tähtimäärän.

Esim. kutsuttaessa `lista_tahtina([3, 7, 1, 1, 2])` tulostuu

<sample-output>

<pre>
***
*******
*
*
**
</pre>

</sample-output>


</programming-exercise>

<programming-exercise name='Anagrammi' tmcname='osa04-13_anagrammi'>

Tee funktio `anagrammi` joka saa parametriksi kaksi merkkijonoa. Funktio palauttaa True jos merkkijonot ovat anagrammeja, eli ne muodostuvat täsmälleem samoista kirjaimista.

Esimerkiksi seuraavat merkkijonot ovat anagrammeja:



```python
v1 = anagrammi("talo", "tola")
v2 = anagrammi("talo", "lato")
v3 = anagrammi("talo", "olat")
v4 = anagrammi("tammi", "mitta")
v5 = anagrammi("python", "java")

print(v1, v2, v3, v4, v5)
```
</pre>

<sample-output>
True True True False False
</sample-output>


</programming-exercise>

<programming-exercise name='Palindromit' tmcname='osa04-14_palindromit'>

Tee funktio `palindromi`, joka saa parametriksi merkkijonon ja palauttaa True jos merkkijono on palindromi (eli samansisältöinen luettuna alusta loppuun tai lopusta alkuun).

Tee myös funktiota hyödyntävä pääohjelma, joka kyselee käyttäjältä sanoja, niin kauan kunnes käyttäjä syöttää palindromin:

<sample-output>

anna sana: **python**
ei ollut palindromi
anna sana: **java**
ei ollut palindromi
anna palindromi: **kauppias**
ei ollut palindromi
anna palindromi: **saippuakauppias**
saippuakauppias on palindromi!

</sample-output>

</programming-exercise>

<programming-exercise name='Positiivisten summa' tmcname='osa04-15_positiivisten_summa'>

Tee funktio `positiivisten_summa`, joka saa parametriksi kokonaislukuja sisältävän listan.

Funktio _palauttaa_ listan positiivisten lukujen summan.

```python
lista = [1, -2, 3, -4, 5]
vastaus = positiivisten_summa(lista)
print("vastaus", vastaus)
```

<sample-output>

vastaus 9

</sample-output>

</programming-exercise>

Kertaa nyt tarvittaessa [edellisen osion](/osa-4/3-listat) luku _Lista funktion parametrina ja paluuarvona_!

<programming-exercise name='Parilliset' tmcname='osa04-16_parilliset'>

Tee funktio `parilliset`, joka saa parametriksi kokonaislukuja sisältävän lista.

Funktio _palauttaa_  uuden listan, jolla on parameterina olevalla listalla olevat parilliset luvut.

```python
lista = [1, 2, 3, 4, 5]
uusi_lista = parilliset(lista)
print("alkuperäinen", lista)
print("uusi", uusi_lista)
```

<sample-output>

alkuperäinen [1, 2, 3, 4, 5]
uusi [2, 4]

</sample-output>

</programming-exercise>

<programming-exercise name='Summavektori' tmcname='osa04-17_summavektori'>

Tee funktio `summa`, joka saa parametriksi kaksi kokonaislukuja sisältävää listaa. Molemmissa listoissa on sama määrä alkioita.

Funktio _palauttaa_ uuden listan, jonka alkiot muodostuvat parametreina olevien listojen alkioiden summista.

Esim:

```python
l1 = [1, 2, 3]
l2 = [7, 8, 9]

l3 = summa(l1, l2)

print("l1:", l1)
print("l2:", l2)
print("l3:", l3)
```

<sample-output>

l1: [1, 2, 3]
l2: [7, 8, 9]
l3: [8, 10, 12]

</sample-output>

</programming-exercise>

<programming-exercise name='Uniikit' tmcname='osa04-18_uniikit'>

Tee funktio `uniikit`, joka saa parametriksi kokonaislukuja sisältävän listan.

Funktio _palauttaa_ uuden lista, joka sisältää parmetrina saamansa luvut suuruusjärjestyksessä siten, että jokainen luku voi olla listalla vain kertaalleen.

```python
l1 = [3, 2, 2, 1, 3, 3, 1]

l2 = uniikit(l1)
print(l2)
```

<sample-output>

[1, 2, 3]

</sample-output>

</programming-exercise>

<programming-exercise name='Listan pisimmät' tmcname='osa04-19_listan_pisimmat'>

Tee funktio `pisimmat`, joka saa parametriksi listan merkkijonoja. Funktio palauttaa listan, joka sisältää sen parametrina saamansa listan pisimmän merkkijonon. Jos pisimpiä merkkijonoja on useampia, funktio palauttaa ne kaikki listassa.

Nimien järjestyksen tuloslistassa tulee noudattaa nimien järjestystä alkuperäisessä listassa.

```python
lista = ["eka", "toka", "kolmas", "seitsemäs"]

tulos = pisimmat(lista)
print(tulos)
```

<sample-output>

['seitsemäs']

</sample-output>

```python
lista = ["pekka", "emilia", "venla", "eero", "antti", "juhani"]

tulos = pisimmat(lista)
print(tulos)
```

<sample-output>

['emilia', 'juhani']

</sample-output>

</programming-exercise>

<quiz id="df430669-5bb3-5b05-851e-06dc41a3c029"></quiz>
