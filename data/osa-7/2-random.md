---
path: '/osa-7/2-random'
title: 'Satunnaisuus'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion suoritettuasi

- Tunnet moduulin `random` funktioita
- Osaat hyödyntää satunnaisuutta omissa ohjelmissasi

</text-box>

Tutustumme seuraavaksi moduuliin `random`, jossa on satunnaisuuteen liittyviä funktioita.

## Luvun arpominen

Funktio `randint(a,b)` antaa satunnaisen kokonaisluvun väliltä `a`...`b`. Esimerkiksi seuraava ohjelma simuloi nopan heittämistä:

```python
from random import randint

print("Noppa antaa:", randint(1,6))
```

Ohjelman tulos voisi olla vaikkapa:

<sample-output>

Noppa antaa: 4

</sample-output>

Seuraava ohjelma puolestaan heittää noppaa kymmenen kertaa:

```python
from random import randint

for i in range(10):
    print("Noppa antaa:", randint(1,6))
```

Ohjelman tulos voisi olla seuraava:

<sample-output>

Noppa antaa: 5
Noppa antaa: 4
Noppa antaa: 3
Noppa antaa: 2
Noppa antaa: 3
Noppa antaa: 4
Noppa antaa: 6
Noppa antaa: 4
Noppa antaa: 4
Noppa antaa: 3

</sample-output>

Huomaa, että funktio `randint` toimii vähän eri logiikalla kuin aiemmin tuttu funktio `range`. Kun kutsumme funktiota `randint(1,6)`, lukuväli 1...6, mutta kun kutsumme funktiota `range(1,6)`, lukuväli on 1...5.

## Lisää funktioita

Funktio `shuffle` sekoittaa sille annetun tietorakenteen. Esimerkiksi seuraava ohjelma sekoittaa listalla olevat sanat:

```python
from random import shuffle

sanat = ["apina","banaani","cembalo"]
shuffle(sanat)
print(sanat)
```

<sample-output>

['banaani', 'apina', 'cembalo']

</sample-output>

Funktio `choice` puolestaan valitsee satunnaisen alkion tietorakenteesta:

```python
from random import shuffle

sanat = ["apina","banaani","cembalo"]
print(choice(sanat))
```

<sample-output>

'cembalo'

</sample-output>

## Mistä satunnaisluvut tulevat?

Moduulin `random` toiminta perustuu algoritmiin, joka tuottaa satunnaislukuja tietyn lähtöarvon ja matemaattisten operaatioiden avulla. Lähtöarvoa kutsutaan myös nimellä _siemenarvo_ (_seed value_).

Voimme halutessamme antaa siemenarvon itse funktiolla `seed`:

```python
from random import randint, seed

seed(1337)
# tästä tulee aina sama satunnaisluku
print(randint(1,100))
```

Kun annamme siemenarvon itse, satunnaisuutta käyttävät funktiot antavat samat tulokset ohjelman jokaisella suorituskerralla. Kuitenkin tulokset voivat riippua käytetystä Pythonin versiosta.

TODO: Miten tämä on oikeasti? Toimiiko satunnaisuus samalla tavalla Pythonin eri versioissa ja järjestelmissä?

<text-box variant="info" name="Aito satunnaisuus">

Jos tarkkoja ollaan, moduulin `random` muodostamat luvut eivät ole aitoja satunnaislukuja, vaan _pseudosatunnaislukuja_. Tietokoneen avulla on vaikea arpoa täysin satunnaisia lukuja, koska sen toiminta on kaikilta osin ennustettavissa. Lähes kaikkeen käyttöön luvut ovat kuitenkin tarpeeksi satunnaisia. Aitoja satunnaislukuja muodostettaessa lähteenä käytetään yleensä jotain tietokoneen ulkopuolista satunnaista ilmiötä, esimerkiksi radioaktiivista taustasäteilyä tai äänentasoa.

Lisätietoa löydät esimerkiksi sivulta <a href="https://www.random.org/randomness/">random.org</a>.

</text-box>
