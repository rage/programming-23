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

Aiemmissa osissa nähtiin esimerkkejä peruslaskutoimituksista. Seuraavaan taulukkoon on koottu Pythonin yleisimmät laskuoperaattorit esimerkkeineen:

| Operaattori   | Merkitys      | Esimerkki    | Tulos |
|:-------------:|---------------|--------------|-------|
| `+`           | Yhteenlasku   | `2 + 4`      |`6`    |
| `-`           | Vähennyslasku | `10 - 2.5`   |`7.5`  |
| `*`           | Kertolasku    | `-2 * 123`   |`-246` |
| `/`           | Jakolasku     | `12 / 2`     |`6.0`  |
| `**`          | Potenssi      | `2 ** 3`     |`8`    |

Laskujärjestys noudattaa matematiikasta tuttuja sääntöjä: aluksi lasketaan potenssilaskut, sitten kerto- ja jakolaskut ja lopuksi yhteen- ja vähennyslaskut. Järjestystä voidaan muuttaa sulkujen avulla.

Esimerkki:

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

Laskutoimituksen osana on yleensä *operandeja* ja *operaattoreita*:

<img src="1_5.png">

Yleensä operandien tyyppi ratkaisee lopputuloksen tyypin: jos lasketaan yhteen kaksi kokonaislukua, myös tulos on kokonaisluku. Jos taas vähennetään liukuluku toisesta liukuluvusta, myös tulos on liukuluku. Itse asiassa tulos on liukuluku, jos edes yksi operandeista lausekkeessa on liukuluku.

Jakolasku muodostaa Pythonissa poikkeuksen sääntöön: sen tulos liukuluku, vaikka operandit olisivatkin kokonaislukuja (esim. `1 / 5` tuottaa liukuluvun `0.2`).

Esimerkki:

```python
pituus = 172.5
paino = 68.55

# painoindeksi lasketaan jakamalla paino pituuden neliöllä
# pituus ilmoitetaan kaavassa metreinä
bmi = paino / (pituus / 100) ** 2

print("Painoindeksi on", bmi)
```

Ohjelma tulostaa

<sample-output>

Painoindeksi on 23.037177063642087

</sample-output>

## Lukuarvojen lukeminen

Aikaisemmin käytettin `input`-komentoa lukemaan käyttäjältä merkkijonoja. Samaa funktiota voidaan käyttää myös lukuarvojen lukemiseen. Tällaisessa tapauksessa muunnos merkkijonosta lukutyyppiin on kuitenkin tehtävä itse. Logiikka on samanlainen kuin edellisessä osassa opitussa `str`-funktiossa: vain funktion nimi vaihtuu.

Esimerkiksi voimme muuttaa merkkijonon kokonaisluvuksi funktiolla `int`. Seuraava ohjelma lukee käyttäjältä syntymävuoden muuttujaan `syote` ja luo sitten toisen muuttujan `vuosi`, jossa on vuosi kokonaisluvuksi muutettuna. Tämän jälkeen voimme suorittaa laskun `2020-vuosi`, jossa on mukana käyttäjän antama vuosi.

```python
syote = input("Minä vuonna olet syntynyt? ")
vuosi = int(syote)
print("Ikäsi vuoden 2020 lopussa:", 2020 -v uosi)
```
<sample-output>

Minä vuonna olet syntynyt? **1995**
Ikäsi vuoden 2020 lopussa: 25

</sample-output>

Yleensä ei kannata luoda kahta muuttujaa (tässä `syote` ja `vuosi`) lukuarvon lukemista varten, vaan voimme samalla kertaa lukea merkkijonon `input`-funktiolla ja muuttaa sen kokonaisluvuksi `int`-funktiolla:

```python
vuosi = int(input("Minä vuonna olet syntynyt? "))
print("Ikäsi vuoden 2020 lopussa:", 2020 - vuosi)
```

Vastaavasti voimme muuttaa merkkijonon liukuluvuksi funktiolla `float`. Seuraava ohjelma kysyy käyttäjän painon ja pituuden ja laskee näiden tietojen avulla painoindeksin:

```python
pituus = float(input("Anna pituus: "))
paino = float(input("Anna paino: "))

pituus = pituus / 100
bmi = paino / pituus ** 2

print("Painoindeksi on", bmi)
```

Ohjelman tulostus voisi näyttää vaikka seuraavalta:

<sample-output>

Anna pituus: **163**
Anna paino: **74.45**
Painoindeksi on 28.02137829801649

</sample-output>

## Muuttujien käyttöä

Tarkastellaan ohjelmaa, joka laskee kolmen käyttäjän syöttämän luvun summan:

```python
luku1 = int(input("Ensimmäinen luku: "))
luku2 = int(input("Toinen luku: "))
luku3 = int(input("Kolmas luku: "))

summa = luku1 + luku2 + luku3
print("Lukujen summa:", summa)
```

Ohjelman esimerkkisuoritus:

<sample-output>

Ensimmäinen luku: **5**
Toinen luku: **21**
Kolmas luku: **7**
Lukujen summa: 33

</sample-output>

Ohjelma käyttää nyt neljää muuttujaa. Tässä tilanteessa tultaisiin toimeen myös vähemmällä:

```python
summa = 0

luku = int(input("Ensimmäinen luku: "))
summa = summa + luku

luku = int(input("Toinen luku: "))
summa = summa + luku

luku = int(input("kolmas luku: "))
summa = summa + luku

print("Lukujen summa:", summa)
```

Nyt kaikki käyttäjän syötteet luetaan muuttujaan `luku`, jonka arvolla _kasvatetaan_ muuttujan `summa` arvoa joka kerta sen jälkeen kun käyttäjältä on saatu uusi syöte.

Seuraava komento siis _kasvattaa_ muuttujassa `summa` olevaa arvoa muuttujan `luku` arvolla:

```python
summa = summa + luku
```

Eli esimerkiksi jos ennen komentoa `summa` on 3 ja `luku` on 2, niin komennon suorittamisen jälkeen muuttujan `summa` arvona on 5.

Koska muuttujan arvon kasvattaminen on usein tarvittava toiminto, voimme kirjoittaa sen myös lyhyemmin näin:

```python
summa += luku
```

Tämän avulla saamme kirjoitettua ohjelman koodin tiiviimmin:

```python
summa = 0

luku = int(input("Ensimmäinen luku: "))
summa += luku

luku = int(input("Toinen luku: "))
summa += luku

luku = int(input("kolmas luku: "))
summa += luku

print("Lukujen summa:", summa)
```

Itse asiassa apumuuttujaa `luku` ei välttämättä tarvita ollenkaan. Käyttäjän antamat syötteet voitaisiin lisätätä yksi kerrallaan muuttujaan `summa` myös seuraavasti:

```python
summa = 0

summa += int(input("Ensimmäinen luku: "))
summa += int(input("Toinen luku: "))
summa += int(input("Kolmas luku: "))

print("Lukujen summa:", summa)
```

Riippuu toki tilanteesta, montako muuttujaa ohjelmassa tarvitaan. Jos käyttäjän kaikkien syötteiden arvo tulee muistaa, ei ole mahdollista "uusiokäyttää" samaa apumuuttujaa kaikkien syötteiden lukemiseen. Näin on seuraavassa esimerkissä:

```python
luku1 = int(input("Ensimmäinen luku: "))
luku2 = int(input("Toinen luku: "))

print(luku1, "+", luku2, "=", luku1 + luku2)
```

<sample-output>

Ensimmäinen luku: **2**
Toinen luku: **3**
2 + 3 = 5

</sample-output>

Toistaalta tässä ohjelmassa ei ole omaa muuttujaa summan arvon tallettamiseen.

Kannattaa kuitenkin huomata, että yhtä muuttujaa ei kannata "uusiokäyttää" kuin samankaltaisiin asioihin, esim. summattavien lukujen tilapäiseen tallentamiseen.

Esimerkiksi seuraavassa on uusiokäytetty muuttujaa `tieto` nimen ja kengännumeron tallettamiseen ja tämä ei ole missään nimessä järkevää:

```python
tieto = input("Mikä on nimesi? ")
print("Hei " + tieto + "!")

tieto = int(input("Mikä on ikäsi? "))
# ohjelma jatkuu...
```

Parempi on siis käyttää molempaa tarkoitusta varten omaa _kuvaavasti nimettyä_ muuttujaa:

```python
nimi = input("Mikä on nimesi? ")
print("Hei " + nimi + "!")

ika = int(input("Mikä on ikäsi? "))
# ohjelma jatkuu...
```
