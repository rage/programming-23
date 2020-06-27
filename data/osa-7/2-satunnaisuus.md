---
path: '/osa-7/2-satunnaisuus'
title: 'Satunnaisuus'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tunnet moduulin `random` funktioita
- Osaat hyödyntää satunnaisuutta omissa ohjelmissasi

</text-box>

## Luvun arpominen

Funktio `randint(a, b)` antaa satunnaisen kokonaisluvun väliltä `a`...`b`. Esimerkiksi seuraava ohjelma simuloi nopan heittämistä:

```python
from random import randint

print("Noppa antaa:", randint(1, 6))
```

Ohjelman tulos voisi olla vaikkapa:

<sample-output>

Noppa antaa: 4

</sample-output>

Seuraava ohjelma puolestaan heittää noppaa kymmenen kertaa:

```python
from random import randint

for i in range(10):
    print("Noppa antaa:", randint(1, 6))
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

Huomaa, että funktio `randint` toimii eri logiikalla kuin aiemmin käyttämämme funktio `range`, joka luo lukuvälin. Kun kutsumme funktiota `randint(1, 6)`, lukuväli 1...6, mutta kun kutsumme funktiota `range(1, 6)`, lukuväli on 1...5.

## Lisää funktioita

Funktio `shuffle` sekoittaa sille annetun tietorakenteen. Esimerkiksi seuraava ohjelma sekoittaa listalla olevat sanat:

```python
from random import shuffle

sanat = ["apina", "banaani", "cembalo"]
shuffle(sanat)
print(sanat)
```

<sample-output>

['banaani', 'apina', 'cembalo']

</sample-output>

Funktio `choice` puolestaan valitsee satunnaisen alkion tietorakenteesta:

```python
from random import shuffle

sanat = ["apina", "banaani", "cembalo"]
print(choice(sanat))
```

<sample-output>

'cembalo'

</sample-output>

## Lottorivin arvonta

Tarkastellaan esimerkkinä tilannetta, jossa haluamme arpoa lottorivin. Lotossa on yhteensä 40 numeroa, joista arvotaan 7 numeroa riviin.

Yksinkertainen tapa koettaa arpoa lottorivi on seuraava:

```python
from random import randint

for i in range(7):
    print(randint(1, 40))
```

Tämä ei ole kuitenkaan toimiva tapa, koska sama numero saattaa tulla useita kertoja riviin. Tarvitsemme jonkin menetelmän, joka varmistaa, että jokainen numero on eri numero.

Yksi mahdollisuus on tallentaa arvotut numerot listaan ja lisätä uusi numero listaan vain, jos sitä ei vielä ole siellä. Voimme jatkaa tätä, kunnes listassa on 7 numeroa:

```python
from random import randint

rivi = []
while len(rivi) < 7:
    uusi = randint(1, 40)
    if uusi not in rivi:
        rivi.append(uusi)

print(rivi)
```

Voimme kuitenkin toteuttaa arvonnan myös lyhyemmin funktion `shuffle` avulla:

```python
from random import shuffle

kaikki = list(range(1, 41))
shuffle(kaikki)
rivi = kaikki[0:7]
print(rivi)
```

Tässä ideana on, että luomme ensin listan, jossa on kaikki numerot väliltä 1–40. Tämän jälkeen sekoitamme listan ja valitsemme sitten 7 ensimmäistä numeroa riviin. Tämän ansiosta meidän ei tarvitse tehdä silmukkaa.

Itse asiassa voimme toteuttaa arvonnan vielä helpommin, koska Pythonin standardikirjastossa on myös funktio `sample`, joka valitsee annetusta tietorakenteesta halutun määrän alkioita:

```python
from random import sample

kaikki_luvut = list(range(1, 41))
rivi = sample(kaikki_luvut, 7)
print(rivi)
```

## Mistä satunnaisluvut tulevat?

Moduulin `random` toiminta perustuu algoritmiin, joka tuottaa satunnaislukuja tietyn lähtöarvon ja matemaattisten operaatioiden avulla. Lähtöarvoa kutsutaan myös nimellä _siemenarvo_ (engl. _seed value_).

Voimme halutessamme antaa siemenarvon itse funktiolla `seed`:

```python
from random import randint, seed

seed(1337)
# tästä tulee aina sama satunnaisluku
print(randint(1, 100))
```

Kun annamme siemenarvon itse, satunnaisuutta käyttävät funktiot antavat samat tulokset ohjelman jokaisella suorituskerralla. Kuitenkin tulokset voivat riippua käytetystä Pythonin versiosta.

<text-box variant="info" name="Aito satunnaisuus">

Jos tarkkoja ollaan, moduulin `random` muodostamat luvut eivät ole aitoja satunnaislukuja, vaan _pseudosatunnaislukuja_. Tietokoneen avulla on vaikea arpoa täysin satunnaisia lukuja, koska sen toiminta on kaikilta osin ennustettavissa. Monissa käyttötarkoituksissa luvut ovat kuitenkin tarpeeksi satunnaisia. Aitoja satunnaislukuja muodostettaessa lähteenä käytetään yleensä jotain tietokoneen ulkopuolista satunnaista ilmiötä, esimerkiksi radioaktiivista taustasäteilyä tai äänentasoa.

Lisätietoa löydät esimerkiksi sivulta <a href="https://www.random.org/randomness/">random.org</a>.

</text-box>
