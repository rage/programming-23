---
path: '/osa-3/3-lisaa-silmukoista'
title: 'Lisää silmukoista'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Toistolauseen etenemistä ohjaamalla voidaan nopeuttaa tai selkeyttää ohjelmien rakennetta.

Tämän osion suoritettuasi

- Tiedät mitä `break`-lause tekee ja osaat käyttää sitä ohjelmissasi.
- Tiedät mitä `continue`-lause tekee ja osaat käyttää sitä ohjelmissasinpr

</text-box>

Aiemmin silmukoiden yhteydessä tutustuttiin `break`-komentoon. Komennolla voidaan katkaista silmukan suoritus välittömästi. Tyypillinen esimerkki lauseen käytöstä on silmukka, jossa kysytään käyttäjältä syötteitä, ja suoritus päättyy, kun käyttäjä syöttää tietyn syötteen (esimerkiksi tyhjän merkkijonon).

Vastaavaan toiminnallisuuteen päästään myös ilman `break`-komentoa sopivan ehdon avulla. Alla olevat esimerkit toteuttavat molemmat ohjelman, joka laskee käyttäjän syötteiden summan kun käyttäjä syöttää luvun -1:

```python
# 1. versio break-komennon avulla

summa = 0

while True:
    luku = int(input("Anna luku, -1 lopettaa: "))
    if luku == -1:
        break
    summa += luku

print ("Summa on", summa)
```

```python
# 2. versio ilman break-komentoa

summa = 0
luku = 0

while luku != -1:
    luku = int(input("Anna luku, -1 lopettaa: "))
    if luku != -1:
        summa += luku

print ("Summa on", summa)
```

Molempien ohjelmien esimerkkisuoritus voisi näyttää seuraavalta:

<sample-output>

Anna luku, -1 lopettaa: **2**
Anna luku, -1 lopettaa: **4**
Anna luku, -1 lopettaa: **5**
Anna luku, -1 lopettaa: **3**
Anna luku, -1 lopettaa: **-1**
Summa on 14

</sample-output>

Molemmat versiot ovat toiminnallisuudeltaan siis käytännössä samanlaisia. Ensimmäinen tapa on kuitenkin yleisemmin käytetty.

Komentoa `break` voidaan käyttää myös silloin, kun silmukassa on annettu jokin muu ehto kuin pelkkä totuusarvo `True`. Esimerkiksi seuraava silmukka jatkuu niin kauan, kuin annettujen lukujen summa on alle 100. Kuitenkin silmukka katkeaa myös, jos käyttäjä antaa luvun -1.

```python
summa = 0

while summa < 100:
    luku = int(input("Anna luku, -1 lopettaa: "))
    if luku == -1:
        break
    summa += luku

print("Summa on", summa)
```

Mahdollisia suorituksia:

<sample-output>

Anna luku, -1 lopettaa: **15**
Anna luku, -1 lopettaa: **8**
Anna luku, -1 lopettaa: **21**
Anna luku, -1 lopettaa: **-1**
Summa on 44

</sample-output>

<sample-output>

Anna luku, -1 lopettaa: **15**
Anna luku, -1 lopettaa: **8**
Anna luku, -1 lopettaa: **21**
Anna luku, -1 lopettaa: **45**
Anna luku, -1 lopettaa: **17**
Summa on 106

</sample-output>


Toisaalta voisimme toteuttaa vastaavasti toimivan silmukan myös näin:

```python
summa = 0

while True:
    luku = int(input("Anna luku, -1 lopettaa: "))
    if luku == -1:
        break
    summa += luku
    if summa >= 100:
        break

print("Summa on", summa)
```
## continue-lause

Komento `continue` on toinen tapa vaikuttaa silmukan suoritukseen. Kun silmukan sisällä tulee vastaan komento `continue`, hyppää suoritus välittömästi silmukan alkuun riville, jossa on silmukan ehto. Tämän jälkeen silmukan suoritus jatkuu normaalisti ehdon tarkastamisella:

<img src="3_3.png">

Esimerkiksi seuraava ohjelma laskee summaan mukaan vain luvut, jotka ovat pienempiä kuin 10. Jos luku on 10 tai suurempi, suoritus palaa silmukan alkuun eikä lukua lisätä summaan.

```python
summa = 0

while True:
    luku = int(input("Anna luku, -1 lopettaa: "))
    if luku == -1:
        break
    if luku >= 10:
        continue
    summa += luku

print("Summa on", summa)
```

<sample-output>

Anna luku, -1 lopettaa: **4**
Anna luku, -1 lopettaa: **7**
Anna luku, -1 lopettaa: **99**
Anna luku, -1 lopettaa: **5**
Anna luku, -1 lopettaa: **-1**
Summa on 16

</sample-output>

## Sisäkkäiset silmukat

Silmukoita voidaan kirjoittaa toisten silmukoiden sisään. Esimerkiksi seuraava ohjelma kysyy käyttäjältä silmukassa luvun ja tulostaa sen avulla lukujonon toisen silmukan avulla:

```python
while True:
    luku = int(input("Anna luku: "))
    if luku == -1:
        break
    while luku > 0:
        print(luku)
        luku -= 1
```

<sample-output>

Anna luku: **4**
4
3
2
1
Anna luku: **3**
3
2
1
Anna luku: **6**
6
5
4
3
2
1
Anna luku: **-1**

</Sample-output>

Huomaa, että komento `break` katkaisee aina uloimman silmukan, jonka sisällä se on. Esimerkiksi seuraava silmukka jatkuu ikuisesti, koska `break` katkaisee vain uloimman silmukan.

```python
while True:
    while True:
        break
```
