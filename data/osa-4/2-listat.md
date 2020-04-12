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

Tähän asti olemme tallentaneet ohjelmissa käytettävää tietoa muuttujien avulla. Yksittäisillä muuttujilla on kuitenkin rajoituksensa: jos halutaan kirjoittaa ohjelma, jossa käsitellään vaikka kymmentätuhatta (tai kymmentä miljoonaa) samankaltaista _datapistettä_, olisi työlästä ja aikaavievää kirjoittaa tätä tarkoitusta varten jokaiselle arvolle erillinen muuttuja.

Useampia arvoja onkin kätevä tallentaa johonkin _tietorakenteeseen_. Tietorakenteella tarkoitetaan ohjelmoinnissa toisiinsa liittyvien arvojen kokoelmaa. Tarkastellaan ensimmäisenä esimerkkinä _listaa_.

Pythonin lista on _dynaaminen tietorakenne_. Se tarkoittaa, että sekä listan koko voi muuttua sen alustuksen jälkeen. Listalle voidaan siis lisätä uusia _alkoita_ ja poistaa vanhoja alkioita.

Uusi tyhjä lista voidaan muodostaa kirjoittamalla tyhjät hakasulkeet peräkkäin. Jotta listaa voidaan käyttää alustuksen jälkeenkin, tallennetaan _viittaus_ johonkin muttujaan. Esimerkiksi

```python

lista = []

```

Tyhjän listan sijasta voidaan alustaa lista, jolla on valmiina alkoita:

```python

pisteet = [10, 9, 10, 8, 7, 7, 10, 7]

```

## Listan alkioihin viittaaminen

Listan alkiot on indeksoitu samalla tavalla kuin merkkijonon yksittäiset merkit. Tässäkin tapauksessa indeksointi alkaa nollasta:

<img src="4_2_1.png" alt="Lista indeksoidaan nollasta alkaen">

Yksittäiseen listan alkioon voidaan viitata samalla tavalla kuin merkkijonon yksittäisiin merkkeihin - käyttäen hakasulkunotaatiota. Esimerkiksi:

```python

# Alustetaan lista
lista = [2, 4, 6, 8, 10, 12]

# Tulostetaan muutaman alkion arvo...
print(lista[0])
print(lista[2])

# Viimeiseen alkioon voidaan taas viitata
# indeksin -1 avulla
print(lista[-1])

# Lasketaan alkioiden 0, 1 ja 2 summa:
summa = lista[0] + lista[1] + lista[2]
print("Summa: " + str(summa))

```

<sample-output>

2
6
12
Summa: 12

</sample-output>

Listan alkioita voidaan myös muuttaa. Alkion arvon muuttaminen tapahtuu sijoittamalla uusi arvo vanhan paikalle - siis samalla tavalla kuin muuttujia käytettäessä:

```python

# Alustetaan lista
arvosanat = [5, 3, 4, 3, 2, 1, 5]

# Myös koko listan voi tulostaa
print(arvosanat)

# Muutetaan pari arvosanaa
arvosanat[1] = 5
arvosanat[2] = 1
arvosanat[-1] = 4

# Tulostetaan muutoksen jälkeen
print(arvosanat)

```

<sample-output>

[5, 3, 4, 3, 2, 1, 5]
[5, 5, 1, 3, 2, 1, 4]

</sample-output>

## Alkioiden lisääminen ja poistaminen

Niinkuin aikaisemmin todettiin, lista on _dynaaminen tietorakenne_. Tämä tarkoittaa, että listalle voi lisätä alkioita ja siltä voi poistaa alkioita.

Alkoiden lisääminen tapahtuu `append`-metodin avulla. Metodi lisää uuden alkion listan viimeiseksi alkioksi:

```python

# Aluksi tyhjä lista
luvut = []

# Lisätään pari alkiota
luvut.append(5)
luvut.append(10)
luvut.append(3)

# ...tulostetaan
print(luvut)

```

<sample-output>

[5, 10, 3]

</sample-output>

Mikäli halutaan lisätä alkio johonkin muualle kuin listan loppuun, voidaan käyttää `insert`-metodia. Metodi lisää alkion halutun indeksin paikalle. Kaikkia listalla jo olevia alkioita lisäyspaikasta alkaen siirretään yhdellä askeleella eteenpäin:

<img src="4_2_2.png" alt = "Alkion lisäys listaan">

Esimerkiksi

```python

# Lista
luvut = [1, 2, 3, 4, 5, 6]

# Lisätään alkuun alkio
# Indeksiin 0 alkio 10
luvut.insert(0, 10)

print(luvut)

# Indeksiin 2 alkio 20
luvut.insert(2,20)

print(luvut)

```

<sample-output>

[10, 1, 2, 3, 4, 5, 6]
[10, 1, 20, 2, 3, 4, 5, 6]

</sample-output>

Alkioita voidaan poistaa listasta kahden eri lähtökohdan mukaisesti:

* jos tiedetään, _missä_ poistettava alkio sijaitsee, voidaan käyttää metodia `pop`
* jos tiedetään, _mikä_ poistettavan alkion arvo on, käytetään metodia `remove`

Metodille `pop` annetaan poistettavan alkion indeksi. Metodi myös palauttaa poistettavan arvon:

```python

# Lista lukuja
top_lista = [10, 9, 7, 5, 3, 1]

# Poistetaan ja tulostetaan kolme lukua listan alusta
n = 0
while n < 3:
    luku = top_lista.pop(0)
    print("Poistettiin: " + str(luku))
    n = n + 1

# Lista poiston jälkeen
print(top_lista)

```

<sample-output>

Poistettiin: 10
Poistettiin: 9
Poistettiin: 7
[5, 3, 1]

</sample-output>

Metodille `remove` annetaan indeksin sijasta poistettavan alkion arvo. Esimerkiksi:

```python

luvut = [7, 3, 4, 8, 1, 2, 3, 0]

# Poistetaan muutama luku
luvut.remove(7)
luvut.remove(8)
luvut.remove(3)

# Lista poiston jälkeen
print(luvut)

```

<sample-output>

4, 1, 2, 3, 0

</sample-output>

Huomaa, että metodi poistaa listalta _ensimmäisen_ alkion, jolla on annettu arvo. Jos alkiota ei löydy, seuraa virhe. Merkkijonoista tutulla tavalla alkion olemassaolon listalla voi testata `in`-operaattorin avulla:

```python

lista = [1,3,4]

if 1 in lista:
    print("Tämä on tosi")

if 2 in lista:
    print("Tämä ei ole, koska listalla ei ole kakkosta")

```

## Valmiit listaoperaatiot

Pythonista löytyy paljon valmiita operaatioita, joilla voidaan käsitellä listoja. Käydään tässä läpi muutama esimerkki, lisää löydät Pythonin [dokumentaatiosta](https://docs.python.org/3/tutorial/datastructures.html).

Lista voidaan järjestää _luonnolliseen järjestykseen_ käyttämällä joko metodia `sort` tai funktiota `sorted`. Kokonaislukutyyppisen listan tapauksessa tämä tarkoitaa sitä, että listan alkiot vaihdetaan suuruusjärjestyksen siten, että pienin alkio tulee ensimmäiseksi ja suurin viimeiseksi.

Tarkastellaan aluksi metodin `sort` toimintaa:

```python

lista = []

while (True):
    luku = int(input("Anna luku, -1 lopettaa: "))

    if luku == -1:
        break

    lista.append(luku)

# Järjestetään lista
lista.sort()

# ...ja lopuksi tulostetaan
print(lista)

```

<sample-output>

Anna luku, -1 lopettaa: 5
Anna luku, -1 lopettaa: 2
Anna luku, -1 lopettaa: 8
Anna luku, -1 lopettaa: 4
Anna luku, -1 lopettaa: 1
Anna luku, -1 lopettaa: -1
[1, 2, 4, 5, 8]

</sample-output>

Metodin `sort` ja funktion `sorted` ero on, että

* metodi `sort` muuttaa annetun listan alkiot oikeaan järjestykseen, mutta
* funktio `sorted` palauttaa uuden listan, jossa alkiot on järjestetty

Esimerkki havainnollistaa eroa:

```python

lista1 = [5,2,3,1,4]

lista1.sort()
print("Lista nyt: " + str(lista1))


lista2 = [5,2,3,1,4]
lista2_kopio = sorted(lista2)

print("Lista2 nyt: " + str(lista2))
print("Listan 2 kopio nyt: " + str(lista2_kopio))

```

<sample-output>

Lista nyt: [1, 2, 3, 4, 5]
Lista2 nyt: [5, 2, 3, 1, 4]
Listan 2 kopio nyt: [1, 2, 3, 4, 5]

</sample-output>

Muita käteviä listaoperaatiota ovat esimerkiksi funktiot `min`, `max` ja `sum`. Seuraava esimerkki havainnolistaa näiden käyttöä:

```python

lista = [5,2,3,1,4]

# Funktio max palauttaa listan suurimman alkion
suurin = max(lista)

# Funktio min palauttaa listan pienimmän alkion
pienin = min(lista)

# Funktio sum palauttaa listan alkioiden summan
summa = sum(lista)

print("Pienin: " + str(pienin))
print("Suurin: " + str(suurin))
print("Summa: " + str(summa))

```

<sample-output>

Pienin: 1
Suurin: 5
Summa: 15

</sample-output>
