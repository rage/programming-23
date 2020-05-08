---
path: '/osa-5/2-viittaukset'
title: 'Viittaukset'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Myös listoja on kätevä käsitellä funktioiden avulla. Listojen välitys parametrina voi kuitenkin erota mutatoitumattomien arvojen käytöstä.

Tämän osan suoritettuasi

- Tiedät mitä tarkoitetaan viittaustyyppisellä muuttujalla
- TIedät, että samaan olioon voi olla useampia viittauksia
- Osaat käyttää listoja funktioiden parametreina
- Tiedät mitä tarkoitetaan funktion sivuvaikutuksella

</text-box>

Pythonissa jokainen muuttuja viittaa johonkin _olioon_, kuten lukuun, merkkijonoon tai listaan.
Yleensä viittausta kuvataan nuolena muuttujasta sen varsinaiseen arvoon:

<img src="5_2_1.png">

Viittaus siis kertoo mistä varsinainen arvo löytyy. Sen sijaan, että muuttujaan olisi tallennettu lista, siihen on tallennettu tieto siitä mistä lista löytyy.

Pythonin "sisäänrakennetut" tyypit, kuten `int`, `float`, `bool` ja `str` ovat _mutatoitumattomia_. Tämä tarkoittaa, että olion arvo ei voi koskaan muuttua. Sen sijaan se voidaan korvata uudella arvolla:

<img src="5_2_2.png">

Useat muut tyypit sen sijaan ovat mutatoituvia. Esimerkiksi listan sisältö voi muuttuja ilman että tarvitsee luoda kokonaan uusi lista:

<img src="5_2_3.png">

## Useampi viittaus samaan listaan

Mitä käytännössä tarkoittaa, että muuttujaan on tallennettu viittaus - ei varsinaista arvoa?

Tarkastellaan esimerkkinä listamuuttujan arvon kopiointia:

```python
a = [1,2,3]
b = a
b[0] = 10
```

Sijoitus `b = a` kopioi muuttujan `b` arvon muuttujaan `a`. On tärkeä kuitenkin huomata se, että muuttujan arvona _ei ole lista_ vaan _viittaus listaan_.

**Sijoitus `b = a` siis kopioi viittauksen.**

Tämä tarkoittaa, että kopioinnin jälkeen samaan listaan on kaksi viittausta:

<img src="5_2_4.png">

Listaa voidaan käsitellä kumman tahansa viittauksen avulla:

```python
lista = [1,2,3,4]
lista2 = lista

lista[0] = 10
lista2[1] = 20

print(lista)
print(lista2)
```

<sample-output>

[10, 20, 3, 100]
[10, 20, 3, 100]

</sample-output>

Mikäli samaan listaan on useampia viittauksia, sitä voidaan käsitellä minkä tahansa viittauksen kautta samalla tavalla.

## Listan kopiointi

Voimme kopioida listan viittauksen sijasta sen varsinaisen sisällön `[:]`-merkinnällä.
Tässä tapauksessa listat ovat erillisiä ja muutos yhdessä listassa ei vaikuta toiseen listaan.

```python
lista = [1,2,3,4]
lista2 = lista[:]

lista[0] = 10
lista2[1] = 20

print(lista)
print(lista2)
```

<sample-output>

[10, 2, 3, 4]
[1, 20, 3, 4]

</sample-output>

Merkintä `[:]` tarkoittaa, että erotamme listasta osan, joka alkaa listan alusta ja päättyy listan loppuun
(samaan tapaan kuin `[2:5]` tarkoittaa, että erotamme osan, joka alkaa kohdasta 2 ja päättyy ennen kohtaa 5).
Tämän sivuvaikutuksena listasta syntyy kopio.

## Lista funktion parametrina

Kun lista välitetään parametrina funktiolle, välitetään viittaus listaan. Tämä tarkoittaa, että lista voi muuttaa parametrinaan saamaansa listaa.

Esimerkiksi seuraava funktio lisää uuden alkion parametrinaan saamaansa listaan:

```python
def lisää_alkio(lista: list):
    lista.append(10)

lista = [1,2,3]
print(lista)
lisää_alkio(lista)
print(lista)
```

<sample-output>
[1, 2, 3]
[1, 2, 3, 10]
</sample-output>

Huomaa, että funktio `lisää_alkio` ei palauta mitään, vaan muuttaa parametrinaan saamaansa listaa. Toinen tapa olisi luoda uusi lista ja palauttaa se:

```python
def lisää_alkio(lista: list) -> list:
    lista2 = lista[:]
    lista2.append(10)
    return lista2

luvut = [1,2,3]
luvut2 = lisää_alkio(luvut)

print("Alkuperäinen lista:", luvut)
print("Uusi lista:", luvut2)
```

<sample-output>

Alkuperäinen lista: [1, 2, 3]
Uusi lista: [1, 2, 3, 10]

</sample-output>

## Funktioiden sivuvaikutukset

Koska funktio saa parametrinaan viittauksen listaan, se voi muuttaa tätä listaa. Jos funktion varsinaisena tarkoituksena ei ole muuttaa listaa, muutokset voivat aiheuttaa ongelmia toisaalla ohjelmassa.

Tarkastellaan esimerkkinä funktiota, jonka tarkoituksena on etsiä listan toiseksi pienin alkio:

```python
def toiseksi_pienin(lista: list) -> int:
    # järjestetyn listan toiseksi pienin alkio on kohdassa 1
    lista.sort()
    return lista[1]

luvut = [1,4,2,5,3,6,4,7]
print(toiseksi_pienin(luvut))
print(luvut)
```

<sample-output>
2
[1, 2, 3, 4, 4, 5, 6, 7]
</sample-output>

Funktio kyllä etsii ja löytää toiseksi pienimmän alkion, mutta sen lisäksi se muuttaa listan alkioiden järjestyksen. Jos järjestyksellä on merkitystä muualla ohjelmassa, funktion kutsuminen todennäköisesti aiheuttaa virheitä.
Esimerkin kaltaista dokumentoimatonta muutosta viittauksena saatuu olioon kutsutaan funktion _sivuvaikutukseksi_.

Sama esimerkki ilman sivuvaikutuksia:

```python
def toiseksi_pienin(lista: list) -> int:
    kopio = sorted(lista)
    return kopio[1]

luvut = [1,4,2,5,3,6,4,7]
print(toiseksi_pienin(luvut))
print(luvut)
```

<sample-output>

2
[1, 4, 2, 5, 3, 6, 4, 7]

</sample-output>

Koska funktio `sorted` palauttaa uuden järjestetyn listan, toiseksi pienimmän alkion etsiminen ei enää sotke listan alkuperäistä järjestystä.