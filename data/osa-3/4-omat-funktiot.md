---
path: '/osa-3/4-omat-funktiot'
title: 'Johdatus omiin funktioihin'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Ymmärrät funktion käsitteen
- Tiedät, miten funktiota kutsutaan
- Tiedät, miten funktio alustetaan Pythonissa
- Osaat luoda oman yksinkertaisen funktion ja kutsua sitä

</text-box>

Aikaisemmissa osissa on käytetty esimerkiksi funktioita `len`, `print` ja `input` eri tarkoituksiin. Funktiolla tarkoitetaan ohjelmointikielessä siis ohjelman itsenäistä kokonaisuutta, jota voidaan _kutsua_, jolle voidaan (usein) välittää _parametreja_ ja joka voi _palauttaa jonkin arvon. Edellämainitut funktiot on sisäänrakennettu Pythoniin. Näiden lisäksi käyttäjä voi myös määritellä omia funktioitaan.

Oma funktio määritellään avainsanalla `def` (lyhenne sanasta define). Funktiolle annetaan jokin _nimi_, ja nimen perään kirjoitetaan sulkuihin funktion _parametrit_. Parametreista puhutaan tarkemmin ensi viikolla, tällä kerralla funktion nimen perään kirjoitetaan vain tyhjät sulut.

Määrittelyä seuraavassa lohkossa annetaan funktioon kuuluvat ohjelmarivit (eli lauseet). Katsotaan esimerkkinä yksinkertaisen funktion määrittelyä:

```python

def tulosta_viesti():
    print("Tämä on oma funktio!")

```

Jos edellisen ohjelmakoodin sisältävä ohjelma suoritetaan, huomataan ettei ohjelma näytä tekevän mitään. Tämä johtuu siitä, että funktioiden sisältämä ohjelmakoodi suoritetaan vasta silloin, kun funktiota _kutsutaan_.

Funktion kutsuminen tapahtuu funktion nimellä. Sulkeet pitää kirjoittaa nimen perään, vaikkei parametreja olisikaan määritelty.

```python

def tulosta_viesti():
    print("Tämä on oma funktio!")

# Kutsutaan funktiota
tulosta_viesti()

```

<sample-output>

Tämä on oma funktio!

</sample-output>

Samaa funktiota voidaan määrittelyn jälkeen kutsua useita kertoja.

```python

def huuda():
    print("MOI KAIKKI!")
    print("-" * 11)
    print() # Tulostaa tyhjän rivin

while True:
    uudestaan = input("Kutsutaanko vielä (k/e): ")
    if uudestaan == "e":
        break
    elif uudestaan == "k":
        huuda()

```

<sample-output>

Kutsutaanko vielä (k/e): **k**
MOI KAIKKI!
-----------

Kutsutaanko vielä (k/e): **k**
MOI KAIKKI!
-----------

Kutsutaanko vielä (k/e): **e**

</sample-output>

<text-box variant = "hint">

## Funktioiden käyttötarkoitus

Funktioilla on muutama pääasiallinen käyttötarkoitus:

* Funktioiden käyttö selkeyttää ohjelman rakennetta jakamalla ohjelman itsenäisiin kokonaisuuksiin.
* Lisäksi funktiot helpottavat ohjelmakoodin uusiokäyttöä, kun tiettyä ohjelman osaa voidaan kutsua aina tarvittaessa.

</text-box>

Seuraavassa esimerkissä on määritelty kaksi funktiota, joiden avulla tulostetaan ruudulle "laatikko":

```python

def piirrä_vaaka():
    print("o" * 10)

def piirrä_pysty():
    print("o" + 8 * " " + "o")

n = int(input("Kuinka korkea laatikko? "))

piirrä_vaaka()

i = 0
while i <= n:
    piirrä_pysty()
    i = i + 1

piirrä_vaaka()

```

<sample-output>

````
Kuinka korkea laatikko? 5
oooooooooo
o        o
o        o
o        o
o        o
o        o
o        o
oooooooooo

````

</sample-output>

Viimeisenä esimerkkinä tarkastellaan yksinkertaista laskinohjelmaa, jossa kaikki kolme laskuoperaatiota on kirjoitettu omina funktioinaan.

```python

def laske_summa():
    luku1 = int(input("Anna luku1: "))
    luku2 = int(input("Anna luku2: "))
    print("Summa on " + str(luku1 + luku2))

def laske_tulo():
    luku1 = int(input("Anna luku1: "))
    luku2 = int(input("Anna luku2: "))
    print("Tulo on " + str(luku1 * luku2))

def laske_erotus():
    luku1 = int(input("Anna luku1: "))
    luku2 = int(input("Anna luku2: "))
    print("Erotus on " + str(luku1 - luku2))


while True:
    print("1. Yhteenlasku")
    print("2. Kertolasku")
    print("3. Vähennyslasku")
    print("0. Lopetus")

    valinta = input("Mitä haluat laskea: ")
    if valinta == "1":
        laske_summa()
    elif valinta == "2":
        laske_tulo()
    elif valinta == "3":
        laske_erotus()
    elif valinta == "0":
        break

```

<sample-output>

```

1. Yhteenlasku
2. Kertolasku
3. Vähennyslasku
0. Lopetus
Mitä haluat laskea: **1**
Anna luku1: 4
Anna luku2: 9
Summa on 13
1. Yhteenlasku
2. Kertolasku
3. Vähennyslasku
0. Lopetus
Mitä haluat laskea: **2**
Anna luku1: 3
Anna luku2: 3
Tulo on 9
1. Yhteenlasku
2. Kertolasku
3. Vähennyslasku
0. Lopetus
Mitä haluat laskea: **3**
Anna luku1: 10
Anna luku2: 21
Erotus on -11
1. Yhteenlasku
2. Kertolasku
3. Vähennyslasku
0. Lopetus
Mitä haluat laskea: **0**
```

</sample-output>
