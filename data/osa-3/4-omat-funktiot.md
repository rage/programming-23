---
path: '/osa-3/4-omat-funktiot'
title: 'Johdatus omiin funktioihin'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat luoda oman funktion ja kutsua sitä
- Ymmärrät, mikä on funktion parametri
- Osaat käyttää parametreja omissa funktioissa

</text-box>

Aikaisemmissa osissa on käytetty esimerkiksi funktioita `len`, `print` ja `input` eri tarkoituksiin. Nämä ovat Pythonin sisäänrakennettuja funktioita, mutta voimme myös määritellä omia funktioita.

## Funktion määrittely

Oma funktio määritellään avainsanalla `def` (lyhenne sanasta define). Funktiolle annetaan jokin _nimi_, jonka jälkeen on alku- ja loppusulku. Tämän jälkeen annetaan lohkossa funktioon kuuluva koodi.

Esimerkiksi seuraava koodi määrittelee funktion `viesti`:

```python
def viesti():
    print("Tämä on oma funktio!")
```

Jos yllä oleva ohjelma suoritetaan, se ei näytä tekevän mitään. Tämä johtuu siitä, että funktion sisältämä koodi suoritetaan vasta silloin, kun funktiota _kutsutaan_.

Funktion kutsuminen tapahtuu funktion nimellä. Esimerkiksi seuraava koodi kutsuu funktiota:

```python
def viesti():
    print("Tämä on oma funktio!")

viesti()
```

<sample-output>

Tämä on oma funktio!

</sample-output>

Samaa funktiota voidaan määrittelyn jälkeen kutsua useita kertoja.

```python
def viesti():
    print("Tämä on oma funktio!")

viesti()
viesti()
viesti()
```

<sample-output>

Tämä on oma funktio!
Tämä on oma funktio!
Tämä on oma funktio!

</sample-output>

## Funktion parametri

Usein funktiolla on yksi tai useampi _parametri_,
jolla sen toimintaan voi vaikuttaa.
Esimerkiksi Pythonin valmiissa funktioissa `print` ja `input`
parametrin avulla annetaan näytettävä teksti:

```python
print("Hei!")                     # parametrina merkkijono "Hei!"
nimi = input("Kerro nimesi: ")    # parametrina merkkijono "Kerro nimesi: "
print(nimi)                       # parametrina muuttujan nimi arvo
```

Voimme määritellä parametreja myös omille funktioillemme. Parametrit määritellään funktion nimen jälkeen olevien sulkujen sisällä:

```python
def tervehdi(kohde):
    print("Hei", kohde)
```

Jos funktiota kutsutaan kaksi kertaa

```python
tervehdi("Emilia")
tervehdi("maailma!")
```

tulostaa se kaksi erilaista tervehdystä:

<sample-output>

Hei Emilia
Hei maailma!

</sample-output>

Katsotaan funktion määrittelyä vielä tarkemmin:

```python
def tervehdi(kohde):
    print("Hei", kohde)
```

Määrittelimme ensimmäisellä rivillä, että funktion parametri on nimeltään `kohde`. Toisella rivillä `print`-komento käyttää parametrissa `kohde` olevaa arvoa.

Kun funktiota kutsutaan, saa parametri _funktiokutsussa_ annettavan arvon. Esimerkiksi kun kutsutaan

```python
nimi = "Antti"
tervehdi(nimi)
```

niin parametrin `kohde` arvo funktiossa on merkkijono `Antti`.

Parametrien ja myös funktioiden nimeämistä koskevat samat periaatteet kuin mitä olemme jo aiemmin käsitelleet, eli nimien kannattaa olla kuvaavia ja käytössä ovat ensisijaisesti pienet kirjaimet sekä alaviiva.

## Lisää esimerkkejä

Katsotaan vielä pari muuta esimerkkiä parametrien käyttämisestä. Seuraavassa funktiossa parametri on luku:

```python
def nelio(x):
    print("Luvun", x, "neliö on", x * x)

nelio(2)
nelio(5)
```

<sample-output>

Luvun 2 neliö on 4
Luvun 5 neliö on 25

</sample-output>

Seuraavassa esimerkissä funktion sisällä on ehtorakenne:

```python
def tervehdi(nimi):
    if nimi == "Emilia":
        print("Heippa,", nimi)
    else:
        print("Moikka,", nimi)
        
tervehdi("Emilia")
tervehdi("Matti")
```

<sample-output>

Heippa, Emilia
Moikka, Matti

</sample-output>

Seuraavassa funktiossa puolestaan on kaksi parametria:

```python
def summa(x, y):
    print("Parametrien summa on ", x + y)

summa(1, 2)
summa(5, 24)
```

<sample-output>

Parametrien summa on 3
Parametrien summa on 29

</sample-output>

Huomaa, että parametrien nimillä ei ole mitään tekemistä funktion ulkopuolella olevien muuttujien kanssa. Esimerkiksi jos kutsumme äskeistä funktiota

```python
x = 100
y = 30
summa(1, 2)
summa(x + y, 10)
```

niin tuloksena on:

<sample-output>

Parametrien summa on 3
Parametrien summa on 140

</sample-output>

Ensimmäisessä kutsussa parametrien arvot funktion sisällä ovat `x = 1` ja `y = 2`, ja toisessa kutsussa arvot ovat `x = 130` ja `y = 10`.

Palaamme funktioihin ja parametrien määrittelyyn tarkemmin seuraavan osan alussa.
