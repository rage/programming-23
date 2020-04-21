---
path: "/osa-1/5-laskentaa"
title: "Laskentaa luvuilla"
hidden: false
---

<text-box variant='learningObjectives' nimi='Oppimistavoitteet'>

Tiedon tallentamisen lisäksi olennaista on osata käsitellä tietoa ja laskea erilaisia lopputuloksia tallennettuun tietoon perustuen. Tutustutaan tässä osassa luvuilla tehtäviin laskutoimituksiin omissa ohjelmissa.

Tämän osan suoritettuasi

- Osaat tehdä erilaisia laskutoimituksia muuttujien avulla.
- Osaat hyödyntää syötettä lukuarvojen lukemiseen
- Osaat muuntaa arvoja eri perustyyppien välillä

</text-box>

Aikaisemmissa osissa nähtiin esimerkkejä peruslaskutoimituksista.
Seuraavaan taulukkoon on koottu Pythonin yleisimmät laskuoperaattorit esimerkkeineen:

| Operaattori   | Merkitys      | Esimerkki    | Tulos |
|:-------------:|---------------|--------------|-------|
| `+`           | Yhteenlasku   | `2 + 4`      |`6`    |
| `-`           | Vähennyslasku | `10 - 2.5`   |`7.5`  |
| `*`           | Kertolasku    | `-2 * 123`   |`-246` |
| `/`           | Jakolasku     | `12 / 2`     |`6.0`    |
| `**`          | Potenssi      | `2 ** 3`     |`8`    |

Laskujärjestys noudattaa matematiikasta tuttuja sääntöjä:
aluksi lasketaan potenssilaskut, sitten kerto- ja jakolaskut ja lopuksi yhteen- ja vähennyslaskut. Järjestystä voidaan muuttaa sulkujen avulla.

Esimerkiksi

```python

print(2 + 3 * 3)
print((2 + 3) * 3)

```

Ohjelma tulostaa

<sample-output>

11
15

</sample-output>

## Operandit, operaattorit ja tyypit

Lausekkeessa on yleensä *operandeja* ja *operaattoreita*:

<img src="1_5.png">

Yleensä operandien tyyppi ratkaisee lopputuloksen tyypin: jos lasketaan yhteen kaksi kokonaislukua, myös tulos on kokonaisluku. Jos taas vähennetään liukuluku toisesta liukuluvusta, myös tulos on liukuluku. Itse asiassa tulos on liukuluku, jos edes yksi operandeista lausekkeessa on liukuluku.

Jakolasku muodostaa Pythonissa poikkeuksen sääntöön: sen tulos liukuluku, vaikka operandit olisivatkin kokonaislukuja (esim. `2 / 3`).

Esimerkiksi

```python

pituus = 172.5
paino = 68.55

# Painoindeksi lasketaan jakamalla paino pituuden neliöllä.
# Pituus ilmoitetaan kaavassa metreinä.
bmi = paino / (pituus / 100) ** 2

print("Painoindeksi on " + str(bmi))

```

Ohjelma tulostaa

<sample-output>

Painoindeksi on 23.037177063642087

</sample-output>


## Lukuarvojen lukeminen

Aikaisemmin käytettin `input`-komentoa lukemaan käyttäjältä merkkijonoja.
Samaa funktiota voidaan käyttää myös lukuarvojen lukemiseen.
Tällaisessa tapauksessa muunnos merkkijonosta lukutyyppiin on kuitenkin tehtävä itse.
Logiikka on samanlainen kuin edellisessä osassa opitussa `str`-funktiossa - vain funktion nimi vaihtuu.

Tarkastellaan ensin esimerkkiä, jossa luetaan käyttäjältä pituus ja paino ja lasketaan painonideksi näiden avulla. Muokataan siis hiukan aiemmin esitettyä esimerkkiä:

```python

# TODO: olisiko parempi käyttää samaa muuttujaa, _mjono ei ole ainakaan tyylikäs pääte (mikä on kurssin käytäntö?)

paino_mjono = input("Anna paino: ")
pituus_mjono = input("Anna pituus: ")

paino = float(paino_mjono)
pituus  = float(pituus_mjono)

pituus = pituus / 100
bmi = paino / pituus ** 2

print("Painoindeksi on " + str(bmi))

```

Ohjelman esimerkkitulostus voisi näyttää vaikka seuraavalta:

<sample-output>

Anna pituus: **163**
Anna paino: **74.45**
Painoindeksi on 28.02137829801649

</sample-output>

Muunnos merkkijonosta liukuluvuksi voidaan siis tehdä käyttäen funktiota `float`. Funktion syötteen pitää olla sellainen, että Python osaa muuntaa sen liukuluvuksi, muuten seuraa virhetilanne.

Huomaa, että syötteitä ei välttämättä olisi pakko tallentaa muuttujiin
`pituus_mjono` ja `paino_mjono`, vaan muunnoksen voisi tehdä suoraankin:

```python

paino = float(input("Anna paino: "))

bmi = paino / (pituus / 100) ** 2

print("Painoindeksi on " + str(bmi))

```
Samalla tavalla syöte voidaan muuntaa kokonaisluvuksi funktion `int` avulla. Esimerkiksi:

```python

nimi = input("Mikä on nimesi? ")

vuosi = int(input("Minä vuonna olet syntynyt? "))

print("Moi, " + nimi + "!")

print("Päättelin, että olet " + str(2020-vuosi) + " vuotta vanha vuoden 2020 lopussa.")

```

Ohjelman esimerkkisuoritus:

<sample-output>

Mikä on nimesi? **Pauliina**
Minä vuonna olet syntynyt? **1997**
Moi, Pauliina!
Päättelin, että olet 23 vuotta vanha vuoden 2020 lopussa.

</sample-output>

## Muuttujien käyttöä

Tarkastellaan ohjelmaa, joka laskee kolmen käyttäjän syöttämän luvun summan:

```python

luku1 = int(input("ensimmäinen luku: "))
luku2 = int(input("toinen luku: "))
luku3 = int(input("kolmas luku: "))

summa = luku1 + luku2 + luku3

print("syöttämiesi lukujen summa on " + str(summa))
```

Ohjelman esimerkkisuoritus:

<sample-output>

ensimmäinen luku: **5**
toinen luku: **21**
kolmas luku: **7**
syöttämiesi lukujen summa on 33

</sample-output>

Ohjelma käyttää nyt neljää muuttujaa. Tässä tilanteessa tultaisiin toimeen myös vähemmällä

```python

summa = 0

luku = int(input("ensimmäinen luku: "))

# summa saa arvoksi ensimmäisen luvun
summa = summa + luku

luku = int(input("toinen luku: "))

# lisätän summaan toinen luku
summa = summa + luku

luku = int(input("kolmas luku: "))

# ... ja vielä kolmas luku
summa = summa + luku

print("syöttämiesi lukujen summa on " + str(summa))
```

Nyt kaikki käyttäjän syötteet luetaan muuttujaan `luku`, jonka arvolla _kasvatetaan_ muuttujan `summa` arvoa joka kerta sen jälkeen kun käyttäjältä on saatu uusi syöte.

Seuraava komento siis _kasvattaa_ muuttujassa `summa` olevaa arvoa muuttujan `luku` arvolla:

```python
summa = summa + luku
```

Eli esimerkiksi jos ennen komentoa `summa` on 3 ja `luku` on 2, niin komennon suorittamisen jälkeen muuttujan `summa` arvona on 5.

Itseasiassa apumuuttujaa `luku` ei välttämättä tarvita ollenkaan. Käyttäjän antamat syötteet voitaisiin lisätätä yksi kerrallaan muuttujaan `summa` myös seuraavasti:

```python
summa = 0

summa = summa + int(input("ensimmäinen luku: "))

summa = summa + int(input("toinen luku: "))

summa = summa + int(input("kolmas luku: "))

print("syöttämiesi lukujen summa on " + str(summa))
```

Riippuu toki tilanteesta kuinka monta muuttujaa ohjelmassa tarvitaan. Jos käyttäjän kaikkien syötteiden arvo tulee muistaa, ei ole mahdollista "uusiokäyttää" samaa apumuuttujaa kaikkien syötteiden lukemiseen, näin on esim. seuraavassa esimerkissä

```python
luku1 = int(input("ensimmäinen luku: "))
luku2 = int(input("toinen luku: "))

print(str(luku1) + " + " + str(luku2) + " = " + str(luku1 + luku2))
```

<sample-output>

ensimmäinen luku: **2**
toinen luku: **3**
2 + 3 = 5

</sample-output>

Toistaalta tämä ohjelma ei välttämättä tarvitse omaa muuttujaansa summan arvon tallettamiseen.

Kannattaa kuitenkin huomata, että yhtä muuttujaa ei kannata "uusiokäyttää" kuin samankaltaisiin asioihin, esim. summattavien lukujen tilapäiseen tallentamiseen.

Esimerkiksi seuraavassa on uusiokäytetty muuttujaa `x` nimen ja kengännumeron tallettamiseen ja tämä ei ole missään nimessä järkevää:

```python
x = input("kerro nimesi: ")

print("Hei " + x + "!")

x = int(input("mikä on kengännumerosi: "))

# ohjelma jatkuu...
```

Parempi on siis käyttää molempaa tarkoitusta varten omaa _kuvaavasti niemttyä_ muuttujaa:

```python
nimi = input("kerro nimesi: ")

print("Hei " + nimi + "!")

kengan_numero = int(input("mikä on kengännumerosi: "))

# ohjelma jatkuu...
```

