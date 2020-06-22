---
path: '/osa-6/2-tiedostojen-kirjoittaminen'
title: 'Tiedostojen kirjoittaminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat luoda itse tiedoston Pythonilla
- Osaat kirjoittaa tekstimuotoista tietoa tiedostoon
- Tiedät, miten Pythonin `join`-metodin avulla voidaan yhdistää alkiot yhdeksi merkkijonoksi
- Osaat kirjoittaa CSV-muotoisen tiedoston omasta datastasi

</text-box>

Tiedoston lukemisen lisäksi voimme myös kirjoittaa tiedostoon tietoa ohjelmassa. Tyypillinen esimerkki on ohjelman tulosten tallentaminen tiedostoon, jotta niitä voidaan käyttää myös myöhemmin tai muokata edelleen jollain toisella ohjelmalla.

Tiedoston kirjoittamisessa voimme joko luoda uuden tiedoston tai lisätä tietoa olemassa olevan tiedoston vanhan tiedon perään. Molemmissa tapauksissa käytetään edellisestä osasta tuttua `open`-funktiota, mutta kirjoittamista varten funktiolle annetaan toinen parametri.

## Uuden tiedoston luominen

Uusi tiedosto luodaan antamalla `open`-funktiolle tiedoston nimen lisäksi avaustilaksi `w` (tulee sanasta "write"). Esimerkiksi

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    # tiedostoon kirjoittaminen
```

Huomaa, että **mikäli tiedosto on jo olemassa, kaikki sen sisältö ylikirjoitetaan**. Ole siis erittäin huolellinen uusia tiedostoja luodessasi.

Kun tiedosto on avattu, sinne voidaan kirjoittaa tietoa. Kirjoittaminen tapahtuu metodilla `write`, joka saa parametrikseen kirjoitettavan merkkijonon.

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!")
```

Ohjelman suorittamisen jälkeen samaan hakemistoon ilmestyy tiedosto `uusi_tiedosto.txt`, jonka sisältö näyttää tältä:

<sample-data>

Moi kaikki!

</sample-data>

Huomaa, että jos tiedostoon halutaan rivinvaihtoja, ne täytyy lisätä tekstiin itse. Esimerkiksi ohjelma

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!")
    tiedosto.write("Toinen rivi")
    tiedosto.write("Viimeinen rivi")
```

tuottaa seuraavanlaisen tiedoston:

<sample-data>

Moi kaikki!Toinen riviViimeinen rivi

</sample-data>

Tulostukset saadaan omille riveilleen lisäämällä rivien loppuun rivivaihtomerkki `\n`:

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!\n")
    tiedosto.write("Toinen rivi\n"")
    tiedosto.write("Viimeinen rivi\n"")
```

Nyt tiedosto `uusi_tiedosto.txt` näyttää tältä:

<sample-data>

Moi kaikki!
Toinen rivi
Viimeinen rivi

</sample-data>

## Tiedon lisääminen olemassaolevaan tiedostoon

Jos haluamme lisätä tietoa olemassa olevaan tiedostoon, voimme avata tiedoston tilassa `a` (lyhenne sanasta "append"). Tällöin tiedoston nykyistä sisältöä ei pyyhitä, vaan uusi tieto kirjoitetaan tiedoston loppuun.

Jos tiedostoa ei ole olemassa, tila `a` toimii samalla tavalla kuin tila `w`.

Seuraava ohjelma avaa edellisen esimerkin tuottaman tiedoston `uusi_tiedosto.txt` ja lisää sen perään pari riviä tekstiä:

```python
with open("uusi_tiedosto.txt", "a") as tiedosto:
    tiedosto.write("Rivi numero 4\n")
    tiedosto.write("Ja taas yksi.\n")
```

Ohjelman suorituksen jälkeen tiedosto näyttää tältä:

<sample-output>

Moi kaikki!
Toinen rivi
Viimeinen rivi
Rivi numero 4
Ja taas yksi.

</sample-output>

## CSV-tiedoston kirjoittaminen

CSV-tiedoston voi kirjoittaa rivi riviltä `write`-metodilla. Esimerkiksi seuraava esimerkki luo tiedoston `koodarit.csv`, jonka jokaisella rivillä on koodarin nimi, työympäristö ja lempikieli. Tiedot on erotettu puolipisteillä.

```python
with open("koodarit.csv", "w") as tiedosto:
    tiedosto.write("Erkki;Windows;Pascal\n")
    tiedosto.write("Matti;Linux;PHP\n")
    tiedosto.write("Antti;Linux;Java\n")
    tiedosto.write("Emilia;Mac;Cobol\n")
```

Tämän tuloksena on seuraava tiedosto:

<sample-output>

Erkki;Windows;Pascal
Matti;Linux;PHP
Antti;Linux;Java
Emilia;Mac;Cobol

</sample-output>


Tarkastellaan sitten tilannetta, jossa tiedostoon kirjoitettavat tiedot ovatkin muistissa listoina:

```python
koodarit = []
koodarit.append(["Erkki", "Windows", "Pascal"])
koodarit.append(["Matti", "Linux", "PHP"])
koodarit.append(["Antti", "Linux", "Java"])
koodarit.append(["Emilia", "Mac", "Cobol"])
```

Kätevä tapa muuttaa lista CSV-tiedoston riviksi on käyttää metodia `join`, joka on tavallaan käänteinen metodille `split`. Metodi `join` yhdistää halutulla erotinmerkillä annetun listan merkkijonoja, esimerkiksi näin:

```python
lista = ["apina", "banaani", "cembalo"]
print(",".join(lista))
```

<sample-output>

apina,banaani,cembalo

</sample-output>

Nyt voimme kirjoittaa koodarien tiedot CSV-tiedostoon näin:

```python
with open("koodarit.csv", "w") as tiedosto:
    for koodari in koodarit:
        rivi = ";".join(koodari)
        tiedosto.write(rivi+"\n")
```

## Tiedon käsittely CSV:nä

Tehdään vielä lopuksi ohjelma, joka lukee CSV-tiedostosta opiskelijoiden viikoittaiset kurssipistemäärät ja laskee näiden avulla kurssin arvosanan. Lopuksi ohjelma luo CSV-tiedoston, mistä selviää opiskelijan yhteispistemäärä sekä arvosana

Ohjelman lukema CSV näytää seuraavalta:

<sample-data>

Pekka;4;2;3;5;4;0;0
Paula;7;2;8;3;5;4;5
Pirjo;3;4;3;5;3;4;4
Emilia;6;6;5;5;0;4;8

</sample-data>


Ohjelman logiikka on jaettu kolmeen funktioon, tiedoston lukeminen tapahtuu samaan tapaan kuin edellisessä aliluvussa, tiedot talletetaan sanakirjaan, missä avaimena on opiskelijan nimi ja arvona taulukko viikkopisteistä:

```python
def lue_viikkopisteet(tiedostonimi):
    viikkopisteet = {}
    with open(tiedostonimi) as tiedosto:
        for rivi in tiedosto:
            osat = rivi.split(";")
            lista = []
            for pisteet in osat[1:]:
                lista.append(int(pisteet))
            viikkopisteet[osat[0]] = lista

    return viikkopisteet
```

Arvosanojen laskemista varten on tehty oma funktionsa, jota tiedostoon kirjoittava funktio hyödyntää:

```python
def arvosana(pisteet):
    if pisteet < 20:
        return 0
    elif pisteet < 25:
        return 1
    elif pisteet < 30:
        return 2
    elif pisteet < 35:
        return 3
    elif pisteet < 40:
        return 4
    else:
        return 5

def tallenna_tulokset(tiedostonimi, viikkopisteet):
    with open(tiedostonimi, "w") as tiedosto:
        for nimi, lista in viikkopisteet.items():
            summa = sum(lista)
            tiedosto.write(f"{nimi};{summa};{arvosana(summa)}\n")
```

Itse "pääohjelma" on nyt hyvin yksinkertainen. Huomaa, että luettavan ja kirjoitettavan tiedoston nimet annetaan funktioille parametrina:

```python
viikkopisteet = lue_viikkopisteet("viikkopisteet.csv")
tallenna_tulokset("tulokset.csv", viikkopisteet)
```

Suorituksen tuloksena oleva CSV-tiedosto näyttää seuraavalta:

<sample-data>

Pekka;18;0
Paula;34;3
Pirjo;26;2
Emilia;41;5

</sample-data>

TODO: Alla oleva perustelu ei ole hyvä. Vaikka koko koodi olisi pääohjelmassa ilman funktioita, niin pisterajojen tms. muutos riittäisi tehdä yhteen paikkaan.

Huomaa, miten ohjelma on koostettu suhteellisen yksinkertaisista, vain yhteen asiaan keskittyvistä funktioista. Tämä on yleisesti ottaen suositeltava tapa ohjelmoinnissa, se helpottaa ohjelman toiminnallisuuden varmistamista sekä myöhemmin ohjelmaan tehtävien muutosten tekemistä. Jos ohjelmasta halutaan muuttaa "yhtä asiaa", esimerkiksi arvosanojen pisterajoja, kohdistuu muokkaus hyvin rakennetussa ohjelmassa ainoastaan yhteen tai muutamaan funktioon.
