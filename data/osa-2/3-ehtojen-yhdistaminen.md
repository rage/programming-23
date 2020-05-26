---
path: '/osa-2/3-ehtojen-yhdistäminen'
title: 'Ehtojen yhdistäminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat käyttää `and`-, `or`- ja `not`-operaattoreita ehdoissa
- Osaat kirjoittaa sisäkkäisiä ehtolauseita

</text-box>

## Loogiset operaattorit

Ehtojen yhdistämisessä voidaan käyttää loogisia operaattoreita `and` ja `or`.
Operaattori `and` vaatii, että useampi ehto pätee samaan aikaan,
ja operaattori `or` vaatii, että yksi tai useampi ehdoista pätee.

Esimerkiksi ehto `luku >= 5 and luku <= 8` vaatii,
että luku on samaan aikaan ainakin 5 ja enintään 8.
Toisin sanoen luvun tulee olla välillä 5..8.

```python
luku = int(input("Anna luku: "))
if luku >= 5 and luku <= 8:
    print("Luku on välillä 5..8")
```

Ehto `luku < 5 or luku > 8` puolestaan vaatii,
että luku on alle 5 tai yli 8.
Toisin sanoen luku ei saa olla välillä 5..8.

```python
luku = int(input("Anna luku: "))
if luku < 5 or luku > 8:
    print("Luku ei ole välillä 5..8")
```

Seuraava taulukko näyttää operaattoreiden toiminnan eri tilanteissa:

a   | b   | a and b | a or b |
:--:|:---:|:-------:|:------:|
False | False | False | False |
True | False | False | True |
False | True | False | True |
True | True | True | True |

Voimme käyttää ehdoissa myös operaattoria `not`, joka muuttaa ehdon
käänteiseksi. Esimerkiksi voisimme toteuttaa äskeisen koodin myös näin:

```python
luku = int(input("Anna luku: "))
if not (luku >= 5 and luku <= 8):
    print("Luku ei ole välillä 5..8")
```

<text-box variant='hint' name='Ehtojen ketjuttaminen'>

Ehto `x >= a and x <= b` on tavallinen tapa testata,
onko luku `x` välillä `a`..`b`.
Tällainen ehto toimii samalla tavalla eri ohjelmointikielissä.

Python-kielen erikoisuutena on, että myös lyhyempi ehto
`a <= x <= b` toimii, eli ehtoja on mahdollista ketjuttaa.
Tällaisia ehtoja käytetään kuitenkin melko harvoin,
ehkä tottumuksesta muihin ohjelmointikieliin.

</text-box>

## Lisää ehtoja

Seuraava ohjelma kysyy käyttäjältä neljä lukua ja selvittää sitten
luvuista suurimman ehtojen avulla:

```python
n1 = int(input("Anna luku 1: "))
n2 = int(input("Anna luku 2: "))
n3 = int(input("Anna luku 3: "))
n4 = int(input("Anna luku 4: "))

if n1 > n2 and n1 > n3 and n1 > n4:
    suurin = n1
elif n2 > n3 and n2 > n4:
    suurin = n2
elif n3 > n4:
    suurin = n3
else:
    suurin = n4

print(suurin, "on suurin luku.")
```

<sample-output>

Anna luku 1: **2**
Anna luku 2: **4**
Anna luku 3: **1**
Anna luku 4: **1**
4 on suurin luku.

</sample-output>

Esimerkissä ensimmäinen ehto `n1 > n2 and n1 > n3 and n1 > n4` on tosi vain, mikäli kaikki kolme ehtoa ovat tosia.

## Sisäkkäiset ehtolauseet

Ehtolauseita voidaan kirjoittaa toistensa sisään. Esimerkiksi seuraava ohjelma tunnistaa positiivista luvuista parittomat ja parilliset:

```python
luku = int(input("Anna luku: "))

if luku >= 0:
    if luku % 2 == 0:
        print("Luku on parillinen")
    else:
        print("Luku on pariton")
else:
    print("Luku on negatiivinen")
```

Esimerkkitulostus kolmella eri syötteellä:

<sample-output>

Anna luku: **3**
Luku on pariton

Anna luku: **18**
Luku on parillinen

Anna luku: **-4**
Luku on negatiivinen

</sample-output>

Sisäkkäisiä ehtolauseita käytettäessä on tärkeä muistaa oikeat sisennykset. Esimerkiksi `else`-haara yhdistetään oikeaan `if`-lauseeseen juuri saman sisennyksen perusteella.

Huomaa, että monissa tapauksissa voidaan käyttää joko sisäkkäisiä ehtolauseita tai loogisia operaattoreita. Seuraava esimerkki on toiminnallisesti sama kuin edellinen esimerkki, eli se tulostaa tiedon siitä, onko positiivinen kokonaisluku parillinen vai pariton.

```python
luku = int(input("Anna luku: "))

if luku > 0 and luku % 2 == 0:
    print("Luku on parillinen")
elif luku > 0 and luku % 2 != 0:
    print("Luku on pariton")
else:
    print("Luku on negatiivinen.")
```

Tilanteesta riippuu, kumpaa tapaa kannattaa käyttää. Tässä esimerkissä ensimmäinen vaihtoehto tuntuu useimpien mielestä paremmalta.
