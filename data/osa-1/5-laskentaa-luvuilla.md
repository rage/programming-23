---
path: "/osa-1/5-laskentaa"
title: "Laskentaa luvuilla"
hidden: false
---

<text-box variant='learningObjectives' nimi='Oppimistavoitteet'>

Tiedon tallentamisen lisäksi olennaista on osata käsitellä tietoa ja laskea erilaisia lopputuloksia tallennettuun tietoon perustuen. Tutustutaan tässä osassa luvuilla tehtäviin laskutoimituksiin omissa ohjelmissa.

Tämän osan suoritettuasi

- Osaat tehdä erilaisia laskutoimituksia muuttujien avulla.
- Osaat hyödyntää syötettä lukuttyyppisten arvojen lukemiseen
- Osaat muuntaa arvoja eri perustyyppien välillä

</text-box>

Aikaisemmissa osissa nähtiin esimerkkejä peruslaskutoimituksista lukutyyppisillä muuttujilla ja vakioarvoilla. Seuraavaan taulukkoon on koottu Pythonin yleisimmin käytössä olevat aritmeettiset **operaattorit** esimerkkeineen:

| Operaattori   | Merkitys      | Esimerkki    | Tulos |
|:-------------:|---------------|--------------|-------|
| `+`           | Yhteenlasku   | `2 + 4`      |`6`    |
| `-`           | Vähennyslasku | `10 - 2.5`   |`7.5`  |
| `*`           | Kertolasku    | `-2 * 123`   |`-246` |
| `/`           | Jakolasku     | `12 / 2`     |`6`    |
| `**`          | Potenssi      | `2 ** 3`     |`8`    |

Laskujärjestys noudattaa pääosin matematiikasta tuttuja sääntöjä: aluksi lasketaan potenssilaskut, sitten kerto- ja jakolaskut ja lopuksi yhteen- ja vähennyslaskut. Järjestystä voidaan muuttaa sulkujen avulla.

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

Jakolasku muodostaa poikkeuksen sääntöön: jos jakolaskun laskennallisessa tuloksessa on desimaaleja (esimerkiksi `2 / 3`), on tulos liukuluku, vaikka operandit olisivatkin kokonaislukuja.

Esimerkiksi

```python

pituus = 172.5
paino = 68.55

# Painoindeksi lasketaan jakamalla paino
# pituuden neliöllä. Pituus ilmoitetaan
# kaavassa metreinä.
bmi = paino / (pituus / 100) ** 2

print("Painoindeksi on " + str(bmi))

```

Luvun neliön voisi tietysti laskea myös kertomalla luvun itsellään, mutta yllä olevassa kaavassa lienee helpompi käyttää eksponenttioperaattoria `**`.

Ohjelma tulostaa

<sample-output>

Painoindeksi on 23.037177063642087

</sample-output>


## Lukutyyppisen syötteen lukeminen

Aikaisemmin käytettin `input`-funktiota lukemaan käyttäjältä merkkijonoja. Samaa funktiota voidaan käyttää myös lukutyyppisen tiedon lukemiseen. Tällaisessa tapauksessa muunnos merkkijonosta lukutyyppiin on kuitenkin tehtävä itse. Logiikka on samanlainen kuin edellisessä osassa opitussa lukutyyppisen tiedon muuntamisessa merkkijonoksi `str`-funktiolla - vain funktion nimi vaihtuu.

Tarkastellaan ensin esimerkkiä, jossa luetaan käyttäjältä pituus ja paino ja lasketaan painonideksi näiden avulla. Muokataan siis hiukan aiemmin esitettyä esimerkkiä:

```python

# Luetaan käyttäjältä pituus ja paino
paino_mjono = input("Anna paino: ")
pituus_mjono = input("Anna pituus: ")

# Muunnetaan merkkijonot liukuluvuiksi
paino = float(paino_mjono)
pituus  = float(pituus_mjono)

# Painoindeksi lasketaan jakamalla paino
# pituuden neliöllä. Pituus ilmoitetaan
# kaavassa metreinä.
pituus = pituus / 100 # muunnetaan metreiksi
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
pituus_string` ja `paino-string`, vaan muunnoksen voisi tehdä suoraankin:

```python

# Luetaan käyttäjältä pituus ja paino ja
# muunnetaan ne liukuluvuiksi
# pituus = float(input("Anna pituus: "))
paino = float(input("Anna paino: "))

# Painoindeksi lasketaan jakamalla paino
# pituuden neliöllä. Pituus ilmoitetaan
# kaavassa metreinä.
bmi = paino / (pituus / 100) ** 2

print("Painoindeksi on " + str(bmi))

```
Samalla tavalla syöte voidaan muuntaa kokonaisluvuksi funktion `int` avulla. Esimerkiksi:

```python

nimi = input("Mikä on nimesi? ")

# Luetaan merkkijono ja muunnetaan se kokonaisluvuksi
vuosi = int(input("Minä vuonna olet syntynyt? "))

# Lasketaan ikä
ikä = 2019 - vuosi

print("Moi, " + nimi + "!")

# Muistetaan taas muuntaa ikä merkkijonoksi tulostusta varten
print("Päättelin, että olit " + str(ikä) + " vuotta vanha vuoden 2019 lopussa.")

```

Ohjelman esimerkkisuoritus:

<sample-output>

Mikä on nimesi? **Pauliina**
Minä vuonna olet syntynyt? **1997**
Moi, Pauliina!
Päättelin, että olit 22 vuotta vanha vuoden 2019 lopussa.

</sample-output>



