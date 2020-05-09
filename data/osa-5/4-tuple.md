---
path: '/osa-5/4-tuple'
title: 'Tuple'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tuple on listan tapainen tietorakenne, jossa on yksi tai useampi alkio tietyssä järjestyksessä.
Erona listaan tuple on mutatoitumaton, eli sen sisältö ei voi muuttua luomisen jälkeen.

Tämän osion suoritettuasi

- Tiedät mikä on tuple Pythonissa
- Osaat muodostaa tuplen erityyppisistä arvoista
- Tiedät, mitä eroa on tuplella ja listalla
- Tiedät esimerkkejä tyypillisistä tavoista käyttää tuplea

</text-box>

## Tuple eli monikko

Pythonissa on olemassa myös toinen listaa hyvin paljon muistuttava tietorakenne, tuple eli monikko.
Olennaiset erot ovat ovat seuraavat

* tuplea merkitään kaarisuluilla `(` ja `)`, lista merkitään hakasuluilla `[` ja `]`
* tuple on _mutatoitumaton_, kun listan sisältö taas voi muuttua

Esimerkiksi seuraava koodi luo tuplen, jossa on pisteen koordinaatit:

```python
piste = (10,20)
```

Tuplen sisällä oleviin alkioihin viitataan samalla tavalla kuin listassa:

```python
piste = (10,20)
print("x-koordinaatti:",piste[0])
print("y-koordinaatti:",piste[1])
```

<sample-output>

x-koordinaatti: 10
y-koordinaatti: 20

</sample-output>

Kuitenkaan tuplen määrittelyn jälkeen sen arvoa ei voi muuttaa, eli seuraava koodi _ei_ toimi:

```python
piste = (10,20)
piste[0] = 15
```

<sample-output>

TypeError: 'tuple' object does not support item assignment

</sample-output>

# Miksi tuple on olemassa?

Tuplen ideana on tallentaa jokin kiinteä kokoelma arvoja, jotka liittyvät toisiinsa. Esimerkiksi kun tallennamme pisteen, jossa on x- ja y-koordinaatti, tuple on luonteva valinta, koska pisteeseen kuuluu aina kaksi arvoa:

```python
piste = (10,20)
```

Voisimme sinänsä tallentaa pisteen myös listana:

```python
piste = [10,20]
```

Tämä ei kuitenkaan tuntuisi yhtä hyvältä ratkaisulta, koska lista sisältää peräkkäisiä alkioita jossakin järjestyksessä ja sen koko voi muuttua. Kun tallennamme pisteen, haluamme tallentaa nimenomaan x- ja y-koordinaatin eikä listaa koordinaateista.

Koska tuple on mutatoitumaton, sitä voidaan käyttää sanakirjan avaimena (toisin kuin listaa).
Esimerkiksi seuraava ohjelma luo sanakirjan, jonka avaimet ovat pisteitä:

```python
pisteet = {}
piste[(3,5)] = "apina"
piste[(5,0)] = "banaani"
piste[(1,2)] = "cembalo"
print(piste[(3,5)])
```

<sample-output>
apina
</sample-output>

Vastaava koodi _ei_ toimisi, jos käyttäisimme listoja:

```python
pisteet = {}
piste[[3,5]]] = "apina"
piste[[5,0]] = "banaani"
piste[[1,2]] = "cembalo"
print(piste[[3,5]])
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

Python käyttää "sisäisesti" tupleja muutaman hyödyllisen ominaisuuden toteuttamiseen.

Tuplejen avulla Pyhtonin funktiot voivat palauttaa useita arvoja. Tarkastellaan seuraavaa esimerkkiä:

```python
def minmax(lista):
  return min(lista), max(lista)

lista = [33, 5, 21, 7, 88, 312, 5]

p, s = minmax(lista)
print(f"suurin luku oli {s} ja pienin {p}")
```

<sample-output>

suurin luku oli 312 ja pienin 5

</sample-output>

Funktion koodi näyttää siltä, että se palauttaisi kaksi erillistä arvoa. Todellesuudessa funktio palauttaa tuplen, joka koostuu kahdesta arvosta. Python nimittäin mahdollistaa tuplejen määrittelyn ilman sulkumerkkejä:

```python
t = 1, 2, 3
print(t)
```

<sample-output>

(1, 2, 3)

</sample-output>

Funktion paluuarvo vastaanotetaan "yhtäaikaa" kahteen muuttujaan:

```python
p, s = minmax(lista)
```

Teknisesti ottaen tässäkin on kyse siitä, että sijoitusoperaation vasemmalla puolella on tuple, jonka sisällä oleviin muuttujiin asetetaan funktion palauttaman tuplen sisältämät arvot:

```python
(p, s) = minmax(lista)
```

Sanakirjojen yhteydessä demonstroitiin `items`-metodiin perusstuvaa tapaa käydä läpi sanakirjan kaikki avain, arvo -parit:

```python

sanakirja = {}

sanakirja["apina"] = "monkey"
sanakirja["banaani"] = "banana"
sanakirja["cembalo"] = "harpsichord"


for avain, arvo in sanakirja.items():
    print("avain:", avain)
    print("arvo:", arvo)
```

Tässäkin Python käyttää taustalla tupleja, `sanakirja.items()` palauttaa yksi kerrallaan avain, arvo -parit tuplena, jonka ensimmäinen alkio on _avain_ ja toinen _arvo_.

Vaikka siis tuple-rakenteelle ei välttämättä olekaan suoraa käyttöä ohjelman tietorakenteena, on tuple monissa ohjelmissa käytössä "taustalla".
