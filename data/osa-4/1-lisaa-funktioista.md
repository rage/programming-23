---
path: '/osa-4/1-lisaa-funktioista'
title: 'Lisää funktioista'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät lisää funktion parametrien käyttämisestä
- Osaat palauttaa arvon funktiosta ja käyttää sitä kutsukohdassa
- Osaat merkitä tyyppivihjeet parametreille ja paluuarvolle

</text-box>

Tutustuimme edellisen osan lopussa omien funktioiden toteuttamiseen. Jatketaan funktioiden parissa. Funktioiden määrittely tapahtuu avainsanan `def` avulla:

```python
def viesti():
    print("Tämä tulee funktiosta")
```

Näin määriteltyä funktiota nimeltä `viesti` kutsutaan seuraavasti:


```python
viesti()
```

Ohjelman tulostus on seuraava:

<sample-output>

Tämä tulee funktiosta

</sample-output>

## Funktion parametrit

Kuten muistamme, funktiolla voi olla yksi tai useampi parametri. Parametrit määritellään suluissa funktion nimen jälkeen.

Esimerkiksi seuraavassa koodissa funktiolla `tervehdi` on yksi parametri ja funktiolla `summa` on kaksi parametria.

```python
def tervehdi(nimi):
    print("Moikka,", nimi)

def summa(a, b):
    print("Parametrien summa on", a + b)
```

```python
tervehdi("Emilia")
summa(2, 3)
```

<sample-output>

Moikka, Emilia
Parametrien summa on 5

</sample-output>

<text-box variant='hint' name='Muodollinen ja todellinen parametri'>

Mitä oikeastaan tapahtuu, kun suoritetaan funktiokutsu `tervehdi("Emilia")`?

Funktion määrittelyssä `tervehdi(nimi)` oleva `nimi` on funktion
_muodollinen parametri_. Parametrin nimi on annettu funktion alussa,
ja sitä voidaan käyttää funktiossa muuttujan tavoin.

Funktion kutsussa `tervehdi("Emilia")` oleva `"Emilia"` on funktion
_todellinen parametri_. Kun funktiota kutsutaan, todellinen parametri
sijoitetaan muodollisen parametrin arvoksi.

Joskus termillä _parametri_ viitataan muodolliseen parametriin ja
termillä _argumentti_ viitataan todelliseen parametriin,
mutta monet myös käyttävät termejä sekaisin.

</text-box>

## Komento return

Funktiot voivat myös palauttaa arvoja. Meille jo tuttu Pythonin valmis funktio `input` _palauttaa_ käyttäjän antaman syötteen. Funktion palauttamaa arvo voidaan esimerkiksi sijoittaa muuttujaan:

```python
sana = input("syötä merkkijono: ")

luku = int(input("syötä kokonaisluku: "))
```

Myös itse määrittelemämme funktiot voivat palauttaa arvoja käyttämällä komentoa `return`.
Esimerkiksi seuraava funktio `summa` palauttaa
annettujen lukujen summan:

```python
def summa(a, b):
    return a + b

vastaus = summa(2, 3)

print("Summa:", vastaus)
```

<sample-output>

Summa: 5

</sample-output>

Seuraavassa on vielä toinen esimerkki, jossa funktio kysyy käyttäjän nimen ja palauttaa sen:

```python
def kysy_nimi():
    nimi = input("Mikä on nimesi? ")
    return nimi

nimi = kysy_nimi()
print("Moikka,", nimi)
```

<sample-output>

Mikä on nimesi? **Anna**
Moikka, Anna

</sample-output>

Komento `return` lopettaa funktion suorituksen saman tien.
Niinpä voimme tehdä seuraavan funktion:

```python
def pienin(a,b):
    if a < b:
        return a
    return b

print(pienin(3,7))
print(pienin(5,2))
```

Tässä ideana on, että jos `a` on pienempi kuin `b`, niin funktio palauttaa arvon `a` ja päättyy. Muuten funktion suoritus jatkuu eteenpäin, jolloin se palauttaa arvon `b`.

<sample-output>

3
2

</sample-output>

Voimme myös käyttää `return`-komentoa siihen, että poistumme funktiosta palauttamatta mitään:

```python
def tervehdi(nimi):
    if nimi == "":
        print("???")
        return
    print("Moikka, "+nimi)

tervehdi("Emilia")
tervehdi("")
tervehdi("Matti")
```

Jos `nimi` on tyhjä merkkijono, niin funktio tulostaa `???` ja päättyy.

<sample-output>

Moikka, Emilia
???
Moikka, Matti

</sample-output>

## Sisäkkäiset kutsut

Voimme kutsua funktiota myös toisen funktion sisältä. Esimerkiksi seuraavassa ohjelmassa funktio
`tervehdi_monesti` kutsuu funktiota `tervehdi` halutun määrän kertoja:

```python
def tervehdi(nimi):
    print("Moikka",nimi)

def tervehdi_monesti(nimi, kerrat):
    for i in range(kerrat):
        tervehdi(nimi)

tervehdi_monesti("Emilia", 3)
```

<sample-output>

Moikka, Emilia
Moikka, Emilia
Moikka, Emilia

</sample-output>

Toisaalta voimme antaa funktion palauttaman arvon
toiselle funktiolle:

```python
def summa(a, b):
    return a+b

print(summa(1, summa(2, 3)))
```

<sample-output>
6
</sample-output>

Tässä tapauksessa funktiokutsu `summa(2,3)` tuottaa arvon `5`,
minkä jälkeen uusi funktiokutsu `summa(1,5)` tuottaa arvon 6.

Funktioiden palauttamat arvot toimivat täysin samalla tavalla kuin mitkä tahansa arvot Pythonissa. Niitä voidaan tulostaa, sijoittaa muuttujaan, käyttää osana lausekkeita tai käyttää parametreina muissa funktiokutsuissa.

## Parametrin tyyppi

Kerrataan vielä tähän mennessä läpikäydyt tyypit:

Tyyppi | Pythonissa | Esimerkki
:------|:----------:|-----------
Kokonaisluku | `int` | `23`
Liukuluku | `float` | `-0.45`
Merkkijono | `str` | `"Pekka Python"`
Totuusaro | `bool` | `True`

Kun kutsumme funktiota, funktio toimii oikein vain,
jos annamme sille sopivan tyyppiset parametrit.
Tarkastellaan esimerkkinä seuraavaa funktiota:

```python
def tulosta_monesti(viesti, kerrat):
    for i in range(kerrat):
        print(viesti)
```

Funktio toimii mainiosti, jos kutsumme sitä näin:

```python
tulosta_monesti("Moikka", 5)
```

<sample-output>

Moikka
Moikka
Moikka
Moikka
Moikka

</sample-output>

Kuitenkaan funktio ei toimi, jos annamme sille väärän tyyppisen parametrin:

```python
tulosta_monesti("Moikka", "Emilia")
```

<sample-output>

TypeError: 'str' object cannot be interpreted as an integer

</sample-output>

Tässä ongelmaksi tulee, että funktion jälkimmäinen parametri `kerrat` sijoitetaan `range`-funktioon. Kun parametri on `"Emilia"` eikä kokonaisluku, tämä aiheuttaa virheen.

Voimme halutessamme antaa funktion määrittelyssä _tyyppivihjeen_, joka ilmaisee, millaista tietoa parametreihin on tarkoitus sijoittaa:

```python
def tulosta_monesti(viesti : str, kerrat : int):
    for i in range(kerrat):
        print(viesti)
```

Tämä kertoo funktion käyttäjälle, että parametrin `viesti` on tarkoitus olla merkkijono, kun taas parametrin `kerrat` on tarkoitus olla kokonaisluku.

Huomaa kuitenkin, että tyyppivihje vain neuvoo, mikä tyypin tulisi olla, mutta ei valvo sitä. Jos funktiolle annetaan väärän tyyppinen parametri, funktio suoritetaan kuitenkin, mutta se toimii mahdollisesti väärin.
