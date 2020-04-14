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

Pythonissa kaikki muuttujat ovat _viittaustyyppisiin muuttujiin_.
Tämä tarkoittaa, että muuttujan "arvo" on viittaus varsinaiseen sisältöön.

Viittaustyyppisessä muuttujassa muuttujan arvona on _viittaus johonkin olioon_. Olio voi olla esimerkiksi merkkijono tai lista. Yleensä viittausta kuvataan nuolena muuttujasta sen varsinaiseen arvoon:

<img src="5_2_1.png">

Viittaus siis kertoo mistä varsinainen arvo löytyy. Sen sijaan, että muuttujaan olisi tallennettu lista, siihen on tallennettu tieto siitä mistä lista löytyy.

Pythonin "sisäänrakennetut" tyypit, kuten `int`, `float`, `bool` ja `str` ovat _mutatoitumattomia_. Tämä tarkoittaa, että olion arvo ei voi koskaan muuttua. Sen sijaan se voidaan korvata uudella arvolla:

<img src="5_2_2.png">

Useat muut tyypit sen sijaan ovat mutatoituvia. Esimerkiksi listan sisältö voi muuttuja ilman että tarvitsee luoda kokonaan uusi lista:

<img src="5_2_3.png">

## Useampi viittaus samaan olioon

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

# Lista
lista = [1,2,3,4]

# toinen viittaus samaan listaan
lista2 = lista

# Muutetaan arvoja molempien viittausten kautta
lista[0] = 10
lista2[1] = 20
lista[-1] = 100

# Tulostetaan molempien viittausten kautta
print(lista)
print(lista2)

```

<sample-output>

[10, 20, 3, 100]
[10, 20, 3, 100]

</sample-output>

Mikäli samaan olioon on siis useampia viittauksia, sitä voidaan käsitellä minkä tahansa viittauksen kautta samalla tavalla. Tätä voisi verrata tilanteeseen, jossa talo sijaitsee kahden tien risteyksessä: ei ole väliä kumman osoitteen kautta taloon viitataan, kyseessä on kuitenkin sama talo.


## Listat funktioiden parametreina

Parametrit ovat muuttujia. Jos lista välitetään parametrina funktiolla, välitetään itse asiassa viittaus listaan. Tämä tarkoittaa, että lista voi muuttaa parametrinaan saamaansa listaa.

Esimerkiksi seuraava funktio lisää uuden alkion parametrinaan saamaansa listaan:

```python

def lisää_alkio(lista: list):
    lista.append(10)


# Testataan
lista = [1,2,3]
lisää_alkio(lista)
print(lista)

# ...ja vielä uudestaan
lisää_alkio(lista)
print(lista)

```

<sample-output>

[1, 2, 3, 10]
[1, 2, 3, 10, 10]

</sample-output>

On siis mahdollista, että listaan on viitataan sekä pääohjelmassa että sen kutsumassa funktiossa.

Huomaa, että funktio `lisää_alkio` ei palauta mitään, vaan muuttaa parametrinaan saamaansa listaa. Toinen tapa olisi luoda uusi lista ja palauttaa se:

```python

def lisää_alkio(lista: list) -> list:
    # Kopioidaan alkuperäinen lista
    lista2 = lista[:]

    # Lisätään kopioon uusi alkio
    lista2.append(10)

    # ...ja palautetaan se
    return lista2


# Testataan
luvut = [1,2,3]

# Otetaan paluuarvo talteen
luvut2 = lisää_alkio(luvut)

print("Alkuperäinen lista: " + str(luvut))
print("Uusi lista:         " + str(luvut2))

```

<sample-output>

Alkuperäinen lista: [1, 2, 3]
Uusi lista:         [1, 2, 3, 10]

</sample-output>

Huomaa, että listasta voi tehdä kopion ottamalla siitä "alilistan", joka sisältää kaikki alkiot. Näppärästi tämä käy jättämällä alilistaoperaatiosta sekä alku- että loppuindeksi pois (esimerkissä `lista2 = lista[:]`).

On siis eri asia kopioida viittaus kuin tehdä kopio listasta:

<img src="5_2_5.png">

## Funktioiden sivuvaikutukset

Koska funktio saa parametrinaan viittauksen listaan, se voi muuttaa tätä listaa. Jos funktion varsinaisena tarkoituksena ei ole muuttaa listaa, muutokset voivat aiheuttaa ongelmia toisaalla ohjelmassa.

Tarkastellaan esimerkkinä funktiota, jonka tarkoituksena on etsiä listan toiseksi pienin alkio:

```python

def toiseksi_pienin(lista: list) -> int:
    # Järjestetään lista
    lista.sort()

    # Nyt toinen alkio on toiseksi pienin
    return lista[1]

# Testataan
luvut = [1,4,2,5,3,6,4,7]
print(toiseksi_pienin(luvut))

print(luvut)

```

<sample-output>

2
[1, 2, 3, 4, 4, 5, 6, 7]

</sample-output>

Funktio kyllä etsii ja löytää toiseksi pienimmän alkion, mutta sen lisäksi se muuttaa listan alkioiden järjestyksen. Jos järjestyksellä on merkitystä muualla ohjelmassa, funktion kutsuminen todennäköisesti aiheuttaa virheitä.

Esimerkin kaltaista dokumentoimatonta muutosta viittauksena saatuu olioon kutsutaan funktion _sivuvaikutukseksi_. Tällaisia sivuvaikutuksia tulisi aina välttää. Mikäli edellisessä esimerkissä halutaan järjestää funktio, on parempi tehdä listasta uusi järjestetty kopio (kokonaan eri asia on toki se, että kannattaako listaa järjestää toiseksi pienimmän alkion löytämiseksi, vai olisiko tähän parempi tapa?).

Esimerkki ilman sivuvaikutuksia:

```python

def toiseksi_pienin(lista: list) -> int:
    # Tehdää listasta järjestetty kopio
    lista2 = sorted(lista)

    # Nyt toinen alkio on toiseksi pienin
    return lista2[1]

# Testataan
luvut = [1,4,2,5,3,6,4,7]
print(toiseksi_pienin(luvut))

print(luvut)

```

<sample-output>

2
[1, 4, 2, 5, 3, 6, 4, 7]

</sample-output>

Nyt toiseksi pienimmän alkion etsiminen ei sotke listan alkuperäistä järjestystä.


