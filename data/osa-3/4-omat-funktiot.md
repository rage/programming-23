---
path: '/osa-3/4-omat-funktiot'
title: 'Johdatus omiin funktioihin'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Ohjelmien jakaminen itsenäisiin funktioihin selkeyttää ohjelmien rakennetta, mahdollistaa koodin uudelleenkäytettävyyden ja tehostaa ohjelmointiprosessia.

Tämän osion suoritettuasi

- Ymmärrät funktion käsitteen
- Tiedät, miten funktiota kutsutaan
- Tiedät, miten funktio alustetaan Pythonissa
- Osaat luoda oman yksinkertaisen funktion ja kutsua sitä

</text-box>

Aikaisemmissa osissa on käytetty esimerkiksi funktioita `len`, `print` ja `input` eri tarkoituksiin. Nämä ovat Pythonin sisäänrakennettuja funktioita, mutta voimme myös määritellä omia funktioita.

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

<text-box variant="hint" name="Funktioiden käyttötarkoitus">

Funktioilla on muutama pääasiallinen käyttötarkoitus:

* Funktiot selkeyttävät ohjelman rakennetta, kun ohjelma jakautuu itsenäisiin kokonaisuuksiin.
* Funktiot helpottavat ohjelmakoodin uusiokäyttöä, kun tiettyä ohjelman osaa voidaan kutsua aina tarvittaessa.

</text-box>

Seuraavassa esimerkissä on määritelty kaksi funktiota, joiden avulla tulostetaan ruudulle "laatikko":

TODO: Ei ole hyvä esimerkki, tässä funktioista ei ole mitään hyötyä. Esimerkki toimisi ehkä paremmin parametrien kanssa.

```python
def vaaka():
    print("o" * 10)

def pysty():
    print("o" + 8 * " " + "o")

n = int(input("Kuinka korkea laatikko? "))

vaaka()
i = 0
while i <= n:
    pysty()
    i += 1
vaaka()
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

TODO: Tämäkään ei tunnu hyvältä esimerkiltä ilman parametreja. Ei ole hyvä, että jokaisen funktion sisällä on samanlaista koodia. Ilman funktioita (nykyisillä taidoilla ilman parametreja) luvut 1 ja 2 voisi kysyä samalla koodilla pääohjelmassa.

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
    print("1 Yhteenlasku")
    print("2 Kertolasku")
    print("3 Vähennyslasku")
    print("0 Lopetus")

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

1 Yhteenlasku
2 Kertolasku
3 Vähennyslasku
0 Lopetus
Mitä haluat laskea: **1**
Anna luku1: 4
Anna luku2: 9
Summa on 13
1 Yhteenlasku
2 Kertolasku
3 Vähennyslasku
0 Lopetus
Mitä haluat laskea: **2**
Anna luku1: 3
Anna luku2: 3
Tulo on 9
1 Yhteenlasku
2 Kertolasku
3 Vähennyslasku
0 Lopetus
Mitä haluat laskea: **3**
Anna luku1: 10
Anna luku2: 21
Erotus on -11
1 Yhteenlasku
2 Kertolasku
3 Vähennyslasku
0 Lopetus
Mitä haluat laskea: **0**

</sample-output>

## Funktion parametrit

Kaikkio määrittelemämme funktiot ovat olleet sellasia, että ne toimivat jokaisella kutsukerralla samalla tavalla. Esim.

```python
def viesti():
    print("Tämä on oma funktio!")
```

Kun kutsutaan funktiota kolme kertaa


```python
viesti()
viesti()
viesti()
```

tulostuu sama viesti kolmeen kertaan

<sample-output>

Tämä on oma funktio!
Tämä on oma funktio!
Tämä on oma funktio!

</sample-output>

Jokaisella kutsumiskerralla täsmälleen samalla tavalla toimivat funktiot ovat käyttökelpoisuudeltaan hyvin rajallisia.

Jos ajatellaan jo monta kertaa käyttämiämme Pythonin valmiita funktiota `print` ja `input`, niiden toiminta riippuu niille kutsuttaessa annettavasta _parametrista_:

```python
print("hei!")                     # parametrina merkkijono "hei!"
nimi = input("kerro nimesi: ")    # parametrina merkkijono "kerro nimesi: "
print(nimi)                       # parametrina muuttujan nimi arvo
```

Voimme määritellä parametreja myös omille funktillemme. Parametrit määritellään funktion nimen jälkeen olevien sulkujen sisällä:

```python
def tervehdi(n):
    print("hei " + n)
```

Jos funktiota kutsutaan kaksi kertaa

```python
tervehdi("Emilia")
tervehdi("maailma!")
```

tulostaa se kaksi erilaista tervehdystä:

<sample-output>

hei Emilia
hei maailma!

</sample-output>

Katsotaan funktion määrittelyä vielä tarkemmin:

```python
def tervehdi(n):
    print("hei " + n)
```

Määrittelimme ensimmäisellä rivillä että funktion parametri on nimeltään `n`. Toisella rivillä tulostuslause käyttää parametrissa `n` olevaa arvoa tulostukseen.

Kun funktiota kutsutaan, saa parametri _funktiokutsussa_ annettavan arvon. Esim. kun kutsutaan

```python
tervehdi("tämä merkkijono tulee parametrin arvoksi")
```

parametrin arvo funktiossa on merkkijono _"tämä merkkijono tulee parametrin arvoksi"_.

Jos kutsu on seuraava

```python
nimi = "Antti"
tervehdi(nimi)
```

parametrin arvo funktiossa on merkkijono _"Antti"_.

Parametrin voi nimetä haluamallaan tavalla, esimerkiksi seuraavasti:

```python
def tervehdi(keta_terhvehditaan):
    print("hei " + keta_terhvehditaan)
```

Parametrien ja myös _funktioiden_ nimeämistä koskevat samat säännöt mitä olemme jo aiemmin käsitelleet, eli nimien kannattaa olla kuvaavia, ja käytössä ovat ensisijaisesti pienet kirjaimet sekä alaviiva.

## Lukuja parametrina

Parametrit voivat luonnollisesti olla myös lukuja:

```python
def nelio(x):
    # funktio käyttää apumuuttujaa!
    tulos = x * x
    print("luvun " + str(x) + " neliö on " + str(tulos))

nelio(2)
nelio(5)
```

<sample-output>

luvun 2 neliö on 4
luvun 5 neliö on 25

</sample-output>

ja parametreja voi olla useita

```python
def summa(x, y):
    print("parametrien summa on " + str(x + y))

summa(1, 2)
summa(5, 24)
```

<sample-output>

parametrien summa on 3
parametrien summa on 29

</sample-output>

## Muutama lisähuomio

Kannattaa huomata että parametrien nimillä ei ole mitään tekemistä funktion "ulkopuolella" olevien samannimisten muuttujien kanssa. Eli jos meillä on funktio

```python
def summa(x, y):
    print("parametrien summa on " + str(x + y))
```

ja ohjelma kutsuu sitä seuraavasti:

```python
x = 100
y = 30
summa(1, 2)
summa(x+y, 10)
```

Tulostuu

<sample-output>

parametrien summa on 3
parametrien summa on 140

</sample-output>

Eli ensimmäisessä funktiokutsussa tulee funktion sisällä parametrin arvoiksi


```python
# parametrien arvot funktion sisällä kun kutsutaan summa(1, 2)
x = 1
y = 2
```

ja toisella kerralla

```python
# parametrien arvot funktion sisällä kun kutsutaan summa(x+y, 10)
x = 130
y = 10
```

Palaamme funktioihin ja parametrien määrittelyyn tarkemmin seuraavan osan alussa.
