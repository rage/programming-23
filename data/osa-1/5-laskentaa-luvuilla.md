---
path: "/osa-1/5-laskentaa"
title: "Laskentaa luvuilla"
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

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

**KUVA**

Yleensä operandien tyyppi ratkaisee lopputuloksen tyypin: jos lasketaan yhteen kaksi kokonaislukua, myös tulos on kokonaisluku. Jos taas vähennetään liukuluku toisesta liukuluvusta, myös tulos on liukuluku.

Jakolasku muodostaa poikkeuksen sääntöön: jos jakolaskun laskennallisessa tuloksessa on desimaaleja (esimerkiksi `2 / 3`), on tulos liukuluku, vaikka operandit olisivatkin kokonaislukuja.

Esimerkiksi

```python
height = 172.5
weight = 68.55

# Painoindeksi lasketaan jakamalla paino
# pituuden neliöllä
bmi = weight / height ** 2

print("Painoindeksi on " + str(bmi))
```

Luvun neliön voisi tietysti laskea myös kertomalla luvun itsellään (eli `bmi = weight / (height * height)`)

Ohjelma tulostaa

<sample-output>
  
Painoindeksi on 0.002303717706364209

</sample-output>






