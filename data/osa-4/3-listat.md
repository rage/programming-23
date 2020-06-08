---
path: '/osa-4/2-listat'
title: 'Listat'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, mitä lista tarkoittaa ohjelmoinnissa
- Osaat viitata listan yksittäisiin alkioihin
- Osaat lisätä ja poistaa listan alkioita
- Osaat hyödyntää valmiita funktioita ja metodeita listojen käsittelyyn

</text-box>

Tähän asti olemme tallentaneet ohjelmissa käytettävää tietoa muuttujien avulla. Yksittäisillä muuttujilla on kuitenkin rajoituksensa. Jos ohjelman käsittelemä tiedon määrä on vaihteleva ja saattaa olla suuri, olisi vaivalloista määritellä jokaiselle arvolle erillinen muuttuja.

_Lista_ on kokoelma tietoa, johon viitataan yhteisen nimen kautta. Listan sisältö kirjoitetaan hakasulkeiden sisään, ja jokaista listalla olevaa arvoa kutsutaan _alkioksi_.

Esimerkiksi seuraava koodi luo uuden tyhjän listan:

```python
lista = []
```

Seuraava koodi puolestaan luo listan, jossa on valmiina viisi alkiota:

```python
lista = [7, 2, 2, 5, 2]
```

## Listan alkioihin viittaaminen

Listan alkiot on indeksoitu samalla tavalla kuin merkkijonon yksittäiset merkit. Tässäkin tapauksessa indeksointi alkaa nollasta:

<img src="4_2_1.png" alt="Lista indeksoidaan nollasta alkaen">

Yksittäiseen listan alkioon voidaan viitata samalla tavalla kuin merkkijonon yksittäisiin merkkeihin hakasulkujen avulla. Esimerkiksi:

```python
lista = [7, 2, 2, 5, 2]

print(lista[0])
print(lista[1])
print(lista[3])

print("Kahden ekan summa:", lista[0] + lista[1])
```

<sample-output>

7
2
5
Kahden ekan summa: 9

</sample-output>

Voimme tulostaa listan koko sisällön näin:

```python
lista = [7, 2, 2, 5, 2]
print(lista)
```

<sample-output>

[7, 2, 2, 5, 2]

</sample-output>

Listan alkioita voidaan myös muuttaa. Alkion arvon muuttaminen tapahtuu sijoittamalla uusi arvo vanhan paikalle – siis samalla tavalla kuin muuttujia käytettäessä:

```python
lista = [7, 2, 2, 5, 2]
print(lista)
lista[1] = 3
print(lista)
```

<sample-output>

[7, 2, 2, 5, 2]
[7, 3, 2, 5, 2]

</sample-output>

## Alkioiden lisääminen ja poistaminen

Listan loppuun voidaan lisätä uusia alkoita `append`-metodin avulla. Metodia käytetään seuraavasti:

```python
luvut = []
luvut.append(5)
luvut.append(10)
luvut.append(3)
print(luvut)
```

<sample-output>

[5, 10, 3]

</sample-output>

<text-box variant='hint' name='Metodi'>

Listan loppuun uusia alkoita lisäävä `append` on siis tekniseltä termiltään _metodi_. Metodit ovat sukua jo meille tutuille asioille eli _funktioille_. Metodit ovatkin eräänlaisia funktiota, mutta niiden suorittama operaatio kohdistuu siihen _olioon_, jonka kautta metodia kutsutaan, eli joka esiintyy metodikutsun alussa ennen metodin nimeä.

</text-box>

Seuraavassa esimerkissä ohjelman käytössä on kaksi erillistä listaa:

```python
luvut = []
kengannumerot = []

luvut.append(5)
luvut.append(10)
luvut.append(3)

kengannumerot.append(37)
kengannumerot.append(44)
kengannumerot.append(40)
kengannumerot.append(28)

print("Luvut:")
print(luvut)

print("Kengännumerot:")
print(kengannumerot)
```

Lisäys menee siis siihen listaan, mihin metodikutsu kohdistetaan:

<sample-output>

Luvut:
[5, 10, 3]
Kengännumerot:
[37, 44, 40, 28]

</sample-output>

Mikäli halutaan lisätä alkio johonkin muualle kuin listan loppuun, voidaan käyttää `insert`-metodia. Metodi lisää alkion halutun indeksin paikalle. Kaikkia listalla valmiina olevia alkioita lisäyspaikasta alkaen siirretään yhdellä askeleella eteenpäin:

<img src="4_2_2.png" alt = "Alkion lisäys listaan">

Esimerkiksi

```python
luvut = [1, 2, 3, 4, 5, 6]
luvut.insert(0, 10)
print(luvut)
luvut.insert(2, 20)
print(luvut)
```

<sample-output>

[10, 1, 2, 3, 4, 5, 6]
[10, 1, 20, 2, 3, 4, 5, 6]

</sample-output>

Alkioita voidaan poistaa listasta kahden eri lähtökohdan mukaisesti:

* Jos tiedetään, _missä_ poistettava alkio sijaitsee, voidaan käyttää metodia `pop`.
* Jos tiedetään, _mikä_ poistettavan alkion arvo on, käytetään metodia `remove`.

Metodille `pop` annetaan poistettavan alkion indeksi. Esimerkiksi seuraava koodi poistaa listalta alkiot kohdista 2 ja 3. Huomaa, että alkioiden indeksit muuttuvat poiston jälkeen.

```python
lista = [1, 2, 3, 4, 5, 6]

lista.pop(2)
print(lista)
lista.pop(3)
print(lista)
```

<sample-output>

[1, 2, 4, 5, 6]
[1, 2, 4, 6]

</sample-output>

Metodi `pop` myös _palauttaa_ poistetun listan alkion:

```python
lista = [4, 2, 7, 2, 5]

luku = lista.pop(2)
print(luku)
print(lista)
```

<sample-output>

7
[4, 2, 2, 5]

</sample-output>

Metodille `remove` annetaan indeksin sijasta poistettavan alkion arvo. Esimerkiksi:

```python
lista = [1, 2, 3, 4, 5, 6]

lista.remove(2)
print(lista)
lista.remove(5)
print(lista)
```

<sample-output>

[1, 3, 4, 5, 6]
[1, 3, 4, 6]

</sample-output>

Huomaa, että metodi poistaa listalta _ensimmäisen_ alkion, jolla on annettu arvo:

```python
lista = [1, 2, 1, 2]

lista.remove(1)
print(lista)
lista.remove(1)
print(lista)
```

<sample-output>

[2, 1, 2]
[2, 2]

</sample-output>

Jos listalla ei ole poistettavaa alkiota, seuraa virhe. Merkkijonoista tutulla tavalla alkion olemassaolon listalla voi testata `in`-operaattorin avulla:

```python
lista = [1, 3, 4]

if 1 in lista:
    print("Listalla on alkio 1")

if 2 in lista:
    print("listalla on alkio 2")
```

<sample-output>

Listalla on alkio 1

</sample-output>

## Listan järjestäminen

Listan alkiot voidaan _järjestää_ pienimmästä suurimpaan metodin `sort` avulla:

```python
lista = [2,5,1,2,4]
lista.sort()
print(lista)
```

<sample-output>

[1, 2, 2, 4, 5]

</sample-output>

Toinen tapa on käyttää funktiota `sorted`, joka _palauttaa_ järjestetyn listan:

```python
lista = [2,5,1,2,4]
print(sorted(lista))
```

<sample-output>

[1, 2, 2, 4, 5]

</sample-output>

Huomaa ero näissä tavoissa: `sort` muuttaa listan sisällön järjestetyksi, kun taas `sorted` luo uuden järjestetyn listan. Jälkimmäisessä tavassa voimme säilyttää myös listan alkuperäisen järjestyksen:

```python
alkuperainen = [2, 5, 1, 2, 4]
jarjestetty = sorted(alkuperainen)
print(alkuperainen)
print(jarjestetty)
```

<sample-output>

[2, 5, 1, 2, 4]
[1, 2, 2, 4, 5]

</sample-output>

## Suurin, pienin ja summa

Funktiot `max` ja `min` antavat listan suurimman ja pienimmän alkion.
Funktio `sum` puolestaan laskee listan alkioiden summan.

```python
lista = [5, 2, 3, 1, 4]

suurin = max(lista)
pienin = min(lista)
summa = sum(lista)

print("Pienin:", pienin)
print("Suurin:", suurin)
print("Summa:", summa)
```

<sample-output>

Pienin: 1
Suurin: 5
Summa: 15

</sample-output>


## Metodit vs. funktiot

Pythonissa on ehkä hieman hämmentävästi käytössä kaksi eri tapaa listojen käsittelyyn.

Suurin osa käsittelystä tapahtuu _metodien_ avulla. Esimerkiksi `append` ja `sort` ovat metodeja, joita kutsutaan listamuuttujan kautta pistenotaatiolla:

```python
lista = []

# metodikutsuja
lista.append(3)
lista.append(1)
lista.append(7)
lista.append(2)

# metodikutsu
lista.sort()
```

 Sen sijaan esimerkiksi `max`,  `min`, `len` ja `sorted` ovat _funktioita_, joille lista annetaan parametrina:

```python
lista = [3, 2, 7, 1]

# funktiokutsuissa lista on parametrina
suurin = max(lista)
pienin = min(lista)
pituus = len(lista)

print("Pienin:", pienin)
print("Suurin:", suurin)
print("Listan pituus:", summa)

# funktiokutsu: lista on parametrina, järjestetty lista paluuarvona
jarjestyksessa = sorted(lista)
print(jarjestyksessa)
```

<sample-output>

Pienin: 1
Suurin: 7
Listan pituus: 4
[1, 2, 3, 7]

</sample-output>

## Lista funktion parametrina ja paluuarvona

Omatekemiemme funktioiden parametreina voi olla myös listoja. Seuraavassa on funktio, joka selvittää parametrina listan _mediaanin_ eli keskimmäisen alkion järjestetyssä listassa:

```python
def mediaani(lista: list):
  jarjestetty = lista.sorted()
  keskikohta = len(jarjestetty) // 2
  return jarjestetty[keskikohta]
```

Funktio selvittää mediaanin tekemällä parametrinaan saamasta listasta järjestetyn version ja palauttamalla sen keskimmäisen alkion. Huomaa, että käytössä on kokonaislukujakolasku `//`, koska listan indeksin tulee olla kokonaisluku.

Seuraavassa on esimerkki funktion käytöstä:

```python
kengannumerot = [45, 44, 36, 39, 40]
print("Kengännumeroiden mediaani on", mediaani(kengannumerot))

iat = [1, 56, 34, 22, 5, 77, 5]
print("Ikien mediaani on", mediaani(iat))
```

<sample-output>

Kengännumeroiden mediaani on 40
Ikien mediaani on 22

</sample-output>

Funktio voi myös palauttaa listan. Seuraavassa on funktio, joka palauttaa listan käyttäjän syöttämiä kokonaislukuja:

```python
def lue_luvut()
    luvut = []
    while True:
        syote = input("Anna luku (tyhjä lopettaa): ")
        if len(syote) == 0:
            break
        luvut.append(int(syote))
    return luvut
```

Funktio käyttää lista-tyyppistä apumuuttujaa `luvut`, johon se lisää kaikki käyttäjän antamat luvut. Silmukan jälkeen funktio palauttaa `return`-komennon avulla listan `luvut`.

Funktiota käytetään seuraavasti:

```python
luvut = lue_luvut()

print("Suurin luku on", max(luvut))
print("Lukujen mediaani on", mediaani(luvut))
```

<sample-output>

Anna luku (tyhjä lopettaa): **5**
Anna luku (tyhjä lopettaa): **-22**
Anna luku (tyhjä lopettaa): **4**
Anna luku (tyhjä lopettaa): **35**
Anna luku (tyhjä lopettaa): **1**
Anna luku (tyhjä lopettaa):
Suurin luku on 35
Lukujen mediaani on 5

</sample-output>

Pieni esimerkkiohjelmamme demonstroi jo yhtä funktioiden tärkeimmäistä käyttötarkoituksista: niiden avulla ohjelma saadaan jaettua loogisiin selkeästi ymmärrettäviin kokonaisuuksiin.

Sinänsä sama ohjelma olisi voitu tehdä myös ilman funktiota:

```python
luvut = []
while True:
    syote = input("Anna luku (tyhjä lopettaa): ")
    if len(syote) == 0:
        break
    luvut.append(int(syote))

jarjestetty = luvut.sorted()
keskikohta = len(jarjestetty) // 2
mediaani = jarjestetty[keskikohta]

print("Suurin luku on", max(luvut))
print("Lukujen mediaani on", mediaani)
```

Nyt kuitenkin ohjelman logiikan seuraaminen on vaikeampaa, koska ei ole enää yhtä selvää, mitkä komennot liittyvät minkäkin kokonaisuuden (syötteiden lukeminen, mediaanin laskeminen, ohjelman muu toiminta) toteuttamiseen.

Jako funktioiksi siis selkeyttää koodin rakennetta ja tuo esille loogisia kokonaisuuksia. Tämän ansiosta on myös helpompaa varmistaa, että ohjelma toimii halutulla tavalla, koska voimme testata erikseen tiettyä funktiota (esim. toimiiko funktio `mediaani` oikein).

Ohjelman rakenteen loogisen jakamisen lisäksi funktioiden toinen käyttötarkoitus on koodin _uusiokäyttö_. Jos ohjelmassa on tarvetta tehdä samankaltainen operaatio useaan kertaan, kannattaa sitä varten luoda oma selkeästi nimetty funktio:

```python
print("Kengännumerot:")
kengat = lue_luvut()

print("Painot:")
painot = lue_luvut()

print("Pituudet:")
pituudet = lue_luvut()
```

## Lisää listan käsittelystä

Pythonissa on paljon muitakin mahdollisuuksia listan käsittelyyn. Voit tutustua niihin Pythonin [dokumentaation](https://docs.python.org/3/tutorial/datastructures.html) kautta.
