---
path: '/osa-8/1-oliot-ja-metodit'
title: 'Oliot ja metodit'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, mitä tarkoitetaan oliolla
- Ymmärrät, mitä tarkoitetaan olioiden itsenäisyydellä
- Osaat muodostaa ja käsitellä olioita

</text-box>

Tämä on Ohjelmoinnin jatkokurssin ensimmäinen osa, ja kurssilla käytetään VS Codea samaan tapaan kuin Ohjelmoinnin perusteissa. Jos et ole käyttänyt ennen VS Codea, löydät [tästä](https://www.mooc.fi/fi/installation/vscode) ohjeet ympäristön asentamiseen.

Kuten kurssin ensimmäisen puolikkaan aikana huomattiin, on usein hyödyllistä yhdistää samaan asiaan liittyvät tiedot yhdeksi kokonaisuudeksi. Esimerkiksi kirjaa on kätevä mallintaa vaikkapa tuplen tai sanakirjan avulla, kun kaikki kirjaan liittyvät tiedot voidaan tallentaa samaan rakenteeseen.

Tuplea käyttämällä esimerkki voisi näyttää tältä:

```python
nimi = "Nuoruuteni näppäilyt"
kirjailija = "Pekka Python"
vuosi = 1992

# Yhdistetään yhdeksi tupleksi
kirja = (nimi, kirjailija, vuosi)

# Tulostetaan kirjan nimi
print(kirja[0])
```

Sanakirjassa on tässä yhteydessä se etu, että avaimina voidaan käyttää merkkijonoja kokonaislukujen sijasta. Näin ollen alkioille voidaan antaa niiden sisältöä kuvaavat nimet:

```python
nimi = "Nuoruuteni näppäilyt"
kirjailija = "Pekka Python"
vuosi = 1992

# Yhdistetään yhdeksi sanakirjaksi
kirja = {"nimi": nimi, "kirjailija": kirjailija, "vuosi": vuosi}

# Tulostetaan kirjan nimi
print(kirja["nimi"])
```

Molemmissa tapauksissa tietojen tallentaminen tietorakenteeseen muodostaa _olion_. Olio on itsenäinen kokonaisuus, joka sisältää (tässä tapauksessa) toisiinsa liittyvää tietoa. Itsenäisyys tarkoittaa sitä, että olioon tehdyt muutokset eivät vaikuta muihin olioihin.

Jos esimerkiksi muodostetaan sanakirjaa käyttäen kaksi kirjaoliota, ensimmäiseen kirjaan tehdyt muutokset eivät vaikuta toiseen kirjaan:

```python
kirja1 = {"nimi": "Vanhus ja Python", "kirjailija": "Ernest Pythonen", "vuosi": 1952}
kirja2 = {"nimi": "Seitsemän Pythonia", "kirjailija": "Aleksis Python", "vuosi": 1894}

print(kirja1["nimi"])
print(kirja2["nimi"])

kirja1["nimi"] = "Jäähyväiset aaseille"

print(kirja1["nimi"])
print(kirja2["nimi"])
```

<sample-output>

Vanhus ja Python
Seitsemän Pythonia
Jäähyväiset aaseille
Seitsemän Pythonia

</sample-output>

<img src="8_1_1.png">

<text-box variant="info" name="Oliot Pythonissa">

Kuten kurssin ensimmäisen puolikkaan aikana kerrottiin, Pythonissa kaikki arvot ovat itse asiassa olioita. Tämä tarkoittaa, että muuttujan arvo on _viittaus olioon_, ja varsinainen tieto on tallennettu olioon. Kun esimerkiksi alustetaan muuttuja `a = 3`, ei muuttujan `a` arvo ole 3 vaan _viittaus olioon, jonka sisältö on arvo 3_.

Useimmissa muissa ohjelmointikielissä on olioiden lisäksi ns. perustyyppisiä arvoja (esimerkiksi kokonais- ja liukuluvut sekä totuusarvot), jotka tallennetaan sellaisenaan muuttujiin. Pythonissakin perustyyppiset oliot (kuten vaikkapa luvut, totuusarvot tai merkkijonot) ovat kuitenkin muuttumattomia eli _mutatoitumattomia_. Ohjelmoijan kannalta niiden käyttö ei siis käytännössä eroa perustyyppisistä arvoista.

</text-box>

## Oliot ja metodit

Olioiden tietosisältöä voidaaan havainnoida ja muuttaa _metodien_ avulla. Metodi on funktio, jonka toiminta kohdistuu annettuun olioon. Metodin erottaa muista funktioista tapa, jolla sitä kutsutaan: ensin kirjoitetaan kohdeolio ja sen perään kutsuttava metodi pisteellä erotettuna. Esimerkiksi sanakirja-olion kaikki arvot voidaan palauttaa metodin `values` avulla:

```python
# muodostetaan sanakirjatyyppinen kirjaolio
kirja = {"nimi": "Vanhus ja Python", "kirjailija": "Ernest Pythonen", "vuosi": 1952}

# Tulostetaan kaikki arvot
# Metodikutsu values() kirjoitetaan muuttujan perään
# pisteellä erotettuna
for arvo in kirja.values():
    print(arvo)
```

<sample-output>

Vanhus ja Python
Ernest Pythonen
1952

</sample-output>

Samalla tavalla merkkijonometodit kohdistuvat siihen merkkijonoon, jonka kautta niitä kutsutaan. Esimerkiksi merkkijonon metodeja ovat `count` ja `find`:

```python
nimi = "Keijo Keksitty"

# Tulostetaan K-kirjaimien määrä
print(nimi.count("K"))

# K-kirjaimien määrä toisessa jonossa
print("Karkkilan Kolisevat Karjut".count("K"))

# Osajonon Keksitty indeksi
print(nimi.find("Keksitty"))

# Tästä merkkijonosta osajonoa ei löydy
print("Ihan eri jono".find("Keksitty"))
```

<sample-output>

2
3
6
-1

</sample-output>

Merkkijonometodit palauttavat arvoja, mutta niiden avulla ei voida muuttaa merkkijonoa. Kuitenkin esimerkiksi lista-olion metodien avulla voidaan muuttaa listan sisältöä:

```python
lista = [1,2,3]

# Lisätään pari alkiota
lista.append(5)
lista.append(1)

print(lista)

# Poistetaan alkio alusta
lista.pop(0)

print(lista)
```

<sample-output>

[1, 2, 3, 5, 1]
[2, 3, 5, 1]

</sample-output>

<programming-exercise name='Pienin keskiarvo' tmcname='osa08-01_pienin_keskiarvo'>

Tee funktio `pienin_keskiarvo(henkilo1: dict, henkilo2: dict, henkilo3: dict)`, joka saa parametrikseen kolme sanakirjaoliota.

Jokaisessa sanakirjaoliossa on alkiot, joihin viittaavat nämä avaimet:

* `"nimi"`: kilpailijan nimi
* `"tulos1"`: kilpailijan ensimmäinen tulos (kokonaisluku väliltä 1...10)
* `"tulos2"`: kilpailijan toinen tulos (kuten yllä)
* `"tulos3"`: kilpailijan kolmas tulos (kuten yllä)

Funktio laskee kaikkien kilpailijoiden tulosten keskiarvot ja palauttaa sen kilpailijan, jonka keskiarvo on pienin. Funktion palautusarvona on sanakirjaolio.

Voit olettaa, että vain yhdellä henkilöllä on pienin keskiarvo.

Esimerkki funktion kutsumisesta:

```python
henkilo1 = {"nimi": "Keijo", "tulos1": 2, "tulos2": 3, "tulos3": 3}
henkilo2 = {"nimi": "Reijo", "tulos1": 5, "tulos2": 1, "tulos3": 8}
henkilo3 = {"nimi": "Veijo", "tulos1": 3, "tulos2": 1, "tulos3": 1}

print(pienin_keskiarvo(henkilo1, henkilo2, henkilo3))
```

<sample-output>

{'nimi': 'Veijo', 'tulos1': 3, 'tulos2': 1, 'tulos3': 1}

</sample-output>

</programming-exercise>

<programming-exercise name='Rivien summat' tmcname='osa08-02_rivien_summmat '>

Listan alkioiden arvot ovat viittauksia olioihin. Tämä pätee myös silloin, kun mallinnetaan matriisia: jokainen päälistan alkion arvo on viittaus toiseen listaan (jonka alkiot taas ovat viittauksia arvoihin).

Tee funktio `rivien_summat(matriisi: list)`, joka saa parametrikseen kokonaislukuja sisältävän matriisin.

Funktio lisää jokaiselle matriisin riville uuden alkion, jonka arvo on rivin alkioiden summa. Funktio ei palauta mitään, vaan muokkaa parametrinaan saamaansa matriisia.

Esimerkki funktion kutsumisesta:

```python
matriisi = [[1, 2], [3, 4]]
rivien_summat(matriisi)
print(matriisi)
```

<sample-output>

[[1, 2, 3], [3, 4, 7]]

</sample-output>

</programming-exercise>
