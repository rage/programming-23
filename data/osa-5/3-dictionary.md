---
path: '/osa-5/3-dictionary'
title: 'Sanakirja'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Listan lisäksi toinen Pythonin keskeinen tietorakenne on sanakirja (_dictionary_),
johon tallennetaan avain-arvo-pareja.

Tämän osion suoritettuasi

- Tiedät, mikä on sanakirja ja mikä sen toimintaperiaate on
- Osaat käyttää sanakirjaa eri tyyppisten avainten ja arvojen kanssa
- Osaat pyytää kaikki sanakirjan avaimet tai arvot kerralla
- Tunnet menetelmiä sanakirjan sisällön läpikäyntiin

</text-box>

Lista on kätevä tietorakenne, mutta sen rajoituksena on, että alkiot ovat indekseissä 0, 1, 2, jne.
ja jos haluamme löytää listalta tietyn alkion, on useimmissa tapauksissa käytävä alkiot läpi listan alusta alkaen. Jos lista on kooltaan pieni, ei asialla ole merkitystä, mutta listojen kasvaessa tuhansien alkioiden kokoiseksi, voi suorituskyvyllä olla merkitystä.

Pythonin _sanakirja_ (engl. dictionary) tarjoaa hieman listasta poikkeavan tavan tietojen organisoimiseen. Sanakirja ei talleta tietoa listan tapaan  peräkkäisiin indekseihin, vaan sen sijaan jokainen tietoalkio koostuu _avaimesta_ ja _arvosta_. Kun tiedetään avain, voidaan sen avulla pyytää helposti sanakirjasta vastaava arvo.

Tyypillinen esimerkki voisi olla vaikkapa yliopiston opiskelijarekisteri, jossa avain on opiskelijanumero ja arvona on tallennettu opiskelijan tiedot. Kun tiedetään halutun opiskelijan opiskelijanumero, löydetään opiskelijan tiedot nopeasti.

<img src="5_4_1.png">

Toisin kuin listassa, sanakirjassa alkioita ei ole järjestetty. Ei voida siis puhua ensimmäisestä tai viimeisestä alkiosta. Näiden sijasta on vain _joukko_ avaimia, joista jokainen viittaa yhteen alkioon:


## Sanakirjan käyttäminen

Seuraava ohjelma näyttää esimerkin sanakirjan käyttämisestä:

```python
sanakirja = {}

sanakirja["apina"] = "monkey"
sanakirja["banaani"] = "banana"
sanakirja["cembalo"] = "harpsichord"

print(len(sanakirja))
print(sanakirja)
print(sanakirja["apina"])
```

<sample-output>

3
{'apina': 'monkey', 'banaani': 'banana', 'cembalo': 'harpsichord'}
monkey

</sample-output>

Merkintä `{}` luo tyhjän sanakirjan, minkä jälkeen voimme lisätä sanakirjaan sisältöä. Tässä tapauksessa lisäämme kolme avainta `"apina"`, `"banaani"` ja `"cembalo"`,
joita vastaavat arvot `"monkey"`, `"banana"` ja `"harpsichord"`. Lopuksi tulostamme koko sanakirjan sisällön ja sitten avaimen `"apina"` arvon.

Voisimme käyttää tätä sanakirjaa vaikka seuraavasti:

```python
sana = input("Anna sana: ")
if sana in sanakirja:
    print("Käännös:", sanakirja[sana])
else:
    print("Sanaa ei löytynyt")
```

Tässä käytössä on `in`-operaattori, joka sanakirjan tapauksessa tarkastaa, onko siinä tiettyä avainta.
Mahdollisia ohjelman tulostuksia:

<sample-output>

Anna sana: **apina**
Käännös: monkey

</sample-output>

<sample-output>

Anna sana: **pöllö**
Sanaa ei löytynyt

</sample-output>

## Mitä sanakirjassa voi olla?

Vaikka tietorakenteen nimi on sanakirja, siinä ei ole usein sanakirjaa vain jotain muuta tietoa. Esimerkiksi seuraavassa sanakirjassa avaimet ovat merkkijonoja ja arvot ovat kokonaislukuja:

```python
tulokset = {}
tulokset["Maija"] = 4
tulokset["Liisa"] = 5
tulokset["Kalle"] = 2
```

Seuraavassa sanakirjassa puolestaan avaimet ovat kokonaislukuja ja arvot ovat listoja:

```python
listat = {}
listat[5] = [1,2,3]
listat[42] = [5,4,5,4,5]
listat[100] = [5,2,3]
```

## Avaimista ja arvoista

Tietty avain voi esiintyä sanakirjassa enintään kerran. Jos laitamme avaimen uudestaan, uusi arvo korvaa avaimen vanhan arvon:

```python
sanakirja["suuri"] = "big"
sanakirja["suuri"] = "large"
print(sanakirja["suuri"])
```

<sample-output>

large

</sample-output>

Sanakirjan avaimen vaatimuksena on, että se on mutatoitumaton. Tämän vuoksi emme voi käyttää listaa avaimena, koska lista voi muuttua. Esimerkiksi seuraava koodi ei toimi:

```python
sanakirja[[1,2,3]] = 5
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

<text-box variant="hint" name="Hajautustaulu">

Python tallentaa sanakirjan sisällön sisäisesti tietorakenteena nimeltä _hajautustaulu_ (_hash table_). Ideana on laskea avaimelle _hajautusarvo_ (_hash value_), jonka avulla määräytyy sen paikka muistissa. Yllä oleva virheilmoitus ilmaisee, että listalle ei voida laskea hajautusarvoa, joten se ei kelpaa sanakirjan avaimeksi.

Kurssilla [Tietorakenteet ja algoritmit](https://courses.helsinki.fi/fi/aytkt20001) tutustutaan tarkemmin hajautustauluihin, eli sanakirjojen pellin alla olevaan mekanismiin.

</text-box>

Arvoilla tällaisia vaatimuksia ei ole - hakemiston arvoksi voidaan tallentaa mitä tahansa. Sama arvo saa myös esiintyä samassa hakemistossa enemmän kuin yhden kerran.

## Sanakirjan läpikäynti

Sanakirjan läpikäyntiin voidaan käyttää totuttuun tapaan `for`-lausetta. Rakenne `for avain in sanakirja` sijoittaa yksi kerrallaan kaikki _avaimet_ sanakirjasta `sanakirja` muuttujaan `avain`.

<text-box variant="hint" name="Avainten järjestys">

Aiemmissa Pythonin versioissa avaimet saattoivat tulla läpikäynnin yhteydessä missä tahansa järjestyksessä. Tavallaan tämä on loogista, koska alkioilla ei ajatella olevan järjestystä sanakirjassa. Nykyisin Pythonin toteutusta on kuitenkin muutettu siten, että avaimet (yleensä) käydään läpi lisäysjärjestyksessä. Joka tapauksessa hyvä periaate on, että jos tarvitset _järjestettyä_ tietorakennetta, on parempi käyttää listaa kuin sanakirjaa.

TODO: Yleensä? Milloin näin tapahtuu ja milloin ei?

</text-box>

Esimerkiksi seuraava koodi tulostaa kaikki sanakirjan avaimet ja niiden arvot:

```python

sanakirja = {}

sanakirja["apina"] = "monkey"
sanakirja["banaani"] = "banana"
sanakirja["cembalo"] = "harpsichord"

for avain in sanakirja:
    print("avain:", avain)
    print("arvo:", sanakirja[avain])
```

<sample-output>

avain: apina
arvo: monkey
avain: banaani
arvo: banana
avain: cembalo
arvo: harpsichord

</sample-output>

Python tarjoaa myös mahdollisuuden käydä läpi samaan aikaan sekä avaimet että vastaavat arvot. Tämä onnistuu käyttämällä `items`-metodia, joka palauttaa kaikki avaimet ja arvot yksi kerrallaan:

```python

for avain, arvo in sanakirja.items():
    print("avain:", avain)
    print("arvo:", arvo)
```

## Sanakirja tiedon ryhmittelyssä

Käytimme eräässä aiemmassa esimerkissä listaa esittämään yksittäisen henkilön tietoja. Sanakirja on kuitenkin luontevampi mekanismi tilanteeseen.

Esimerkiksi seuraava koodi luo sanakirjan, jossa on tietoa henkilöstä:

```python
henkilo = {"nimi": "Pirjo Python", "pituus": 154, "paino": 61, "ikä:" 44}
```

Tämä tarkoittaa, että henkilön nimi on Pirjo Python, pituus on 154, paino on 61 ja ikä on 44.
Huomaa, että olisimme voineet tallentaa tiedot myös näin muuttujiin:

```python
nimi = "Pirjo Python"
pituus = 154
paino = 61
ika = 44
```

Sanakirjan etuna on kuitenkin, että se kokoaa kaikki samaan asiaan liittyvät tiedot yhteisen nimen alle, jonka kautta voimme viitata tietoihin. Periaatteessa lista tarjoaa saman edun:

```python
henkilo = [ "Pirjo Python", 153, 61, 44 ]
```

Listan huono puoli on että ohjelmoijan on oltava tarkkana sen suhteen mihin kohtaan listaa mikäkin arvo on talletettuna. Pitää siis muistaa, että `henkilo[2]` tarkoittaa painoa ja `henkilo[3]` ikää, eikä päinvastoin. Sanakirjassa tätä ongelmaa ei ole, sillä kaikki sanakirjan tallettamat erilliset tiedot on talletettu selkeästi nimetyn avaimen taakse


Esimerkiksi voimme käsitellä henkilöitä näin:

```python
henkilo1 = {"nimi": "Pirjo Python", "pituus": 154, "paino": 61, "ikä": 44}
henkilo2 = {"nimi": "Pekka Pythonen", "pituus": 174, "paino": 103, "ikä": 31}
henkilo3 = {"nimi": "Pedro Python", "pituus": 191, "paino": 71, "ikä": 14}

henkilot = [henkilo1, henkilo2, henkilo3]

for henkilo in henkilot:
    print(henkilo["nimi"])

yhteispituus = 0
for henkilo in henkilot:
    yhteispituus += henkilo["pituus"]

print("Keskipituus on", yhteispituus / len(henkilot))
```

<sample-output>

Pirjo Python
Pekka Pythonen
Pedro Python
Keskipituus on 173.0

</sample-output>

TODO += ei ole kerrottu vielä missään
