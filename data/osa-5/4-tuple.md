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

TODO: Tässä oli esimerkki mutta se ei ollut hyvä, koska saman koodin olisi voinut tehdä tuplen sijasta yhtä hyvin listalla. Mitä aitoa motivaatiota keksisi tähän?

## Tuple eli monikko

Tuple muistuttaa huomattavasti listaa. Olennaiset erot ovat, että

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

Edellisessä osassa tallensimme sanakirjan avulla toisiinsa liittyvää tietoa:

```python
henkilo = {"nimi": "Pirjo Python", "pituus": 154, "paino": 61, "ikä:" 44}
```

Voimme käyttää myös tuplea samaan tarkoitukseen, tosin tällöin emme tallenna tietoa, mitä tiedot ovat:

```python
henkilo = ("Pirjo Python", 154, 61, 44)
```

## Tuple sanakirjan avaimena

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