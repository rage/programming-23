---
path: '/osa-4/2-listat'
title: 'Listat'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Kun tiedon määrä lisääntyy, ei sen tallentaminen yksittäisiin muuttujiin ole aina tarkoituksenmukaista. Aloitetaan siis tutustuminen tietorakenteisiin.

Tämän osion suoritettuasi

- Tiedät, mitä tarkoitetaan tietorakenteella
- Osaat muodostaa listan
- Osaat viitata listan yksittäisiin alkioihin
- Osaat lisätä ja poistaa alkioita
- Osaat hyödyntää valmiita funktioita ja metodeita listojen käsittelyyn

</text-box>

Tähän asti olemme tallentaneet ohjelmissa käytettävää tietoa muuttujien avulla. Yksittäisillä muuttujilla on kuitenkin rajoituksensa: jos halutaan kirjoittaa ohjelma, jossa käsitellään vaikka tuhatta samankaltaista arvoa, olisi työlästä ja aikaavievää kirjoittaa tätä tarkoitusta varten jokaiselle arvolle erillinen muuttuja.

Useampia arvoja onkin kätevä tallentaa johonkin _tietorakenteeseen_. Tietorakenteella tarkoitetaan ohjelmoinnissa toisiinsa liittyvien arvojen kokoelmaa. Tarkastellaan ensimmäisenä esimerkkinä _listaa_. Jokaista listalla olevaa arvoa kutsutaan alkioksi.

Listan sisältö kirjoitetaan hakasulkeiden sisään. Esimerkiksi seuraava koodi luo uuden tyhjän listan:

```python
lista = []
```

Seuraava koodi puolestaan luo listan, jossa on viisi alkiota:

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

print("Summa:", lista[0]+lista[1])
```

<sample-output>

7
2
5
Summa: 9

</sample-output>

Voimme tulostaa listan koko sisällön näin:

```python
lista = [7, 2, 2, 5, 2]
print(lista)
```

<sample-output>

[7, 2, 2, 5, 2]

</sample-output>

Listan alkioita voidaan myös muuttaa. Alkion arvon muuttaminen tapahtuu sijoittamalla uusi arvo vanhan paikalle - siis samalla tavalla kuin muuttujia käytettäessä:

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

Voimme lisätä listan loppuun uuden alkion `append`-metodin avulla. Voimme käyttää metodia vaikkapa näin:

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

Mikäli halutaan lisätä alkio johonkin muualle kuin listan loppuun, voidaan käyttää `insert`-metodia. Metodi lisää alkion halutun indeksin paikalle. Kaikkia listalla jo olevia alkioita lisäyspaikasta alkaen siirretään yhdellä askeleella eteenpäin:

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

* jos tiedetään, _missä_ poistettava alkio sijaitsee, voidaan käyttää metodia `pop`
* jos tiedetään, _mikä_ poistettavan alkion arvo on, käytetään metodia `remove`

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

Metodi `pop` myös palauttaa poistetun listan alkion:

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
lista = [1,3,4]

if 1 in lista:
    print("Listalla on alkio 1")

if 2 in lista:
    print("listalla on alkio 2")
```

<sample-output>

Listalla on alkio 1

<sample-output>

## Listan järjestäminen

Listan alkiot voidaan _järjestää_ pienimmästä suurimpaan metodin `sort` avulla.

```python
lista = [2,5,1,2,4]
lista.sort()
print(lista)
```

<sample-output>

[1, 2, 2, 4, 5]

</sample-output>

Toinen tapa on käyttää funktiota `sorted`, joka palauttaa järjestetyn listan:

```python
lista = [2,5,1,2,4]
print(sorted(lista))
```

<sample-output>

[1, 2, 2, 4, 5]

</sample-output>

Huomaa ero näissä tavoissa: `sort` muuttaa listan sisällön järjestetyksi, kun taas `sorted` luo uuden järjestetyn listan. Jälkimmäisessä tavassa voimme säilyttää myös listan alkuperäisen järjestyksen:

```python
a = [2,5,1,2,4]
b = sorted(a)
print(a)
print(b)
```

<sample-output>

[2, 5, 1, 2, 4]
[1, 2, 2, 4, 5]

</sample-output>

## Suurin, pienin ja summa

Funktiot `max` ja `min` antavat listan suurimman ja pienimmän alkion.
Funktio `sum` puolestaan laskee listan alkioiden summan.

```python
lista = [5,2,3,1,4]

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

## Lisää listan käsittelystä

Pythonisssa on paljon lisääkin mahdollisuuksia listan käsittelyyn. Voit tutustua niihin Pythonin [dokumentaation](https://docs.python.org/3/tutorial/datastructures.html) kautta.
