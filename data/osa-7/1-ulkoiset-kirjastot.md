---
path: '/osa-7/1-ulkoiset-kirjastot'
title: 'Ulkoisten kirjastojen käyttö'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Ohjelmointikielissä on usein toteutettu monia asioita valmiiksi ns. kirjastoihin. Sen sijaan, että ohjelmoijan pitäisi toteuttaa kaikki toiminnallisuus alusta loppuun itse, hän voi hyödyntää valmiita kirjastoja omissa ohjelmissaan.

Tämän osion läpikäytyäsi

- Tiedät miten Pythonin `import` lause toimii
- Osaat etsiä tietoa valmiiden kirjastojen tarjoamista rutiineista

</text-box>

Vaikka erityisesti ohjelmointia opetellessa on hyvä harjoitella tekemään useimmat operaatiot itse, on hyvä tiedostaa, että ohjelmointikielten mukana tulee paljon valmiita operaatioita käytettäväksi. Ulkoisten kirjastojen avulla voidaan helposti toteuttaa erilaisia toiminnallisuuksia, joiden aikaansaaminen olisi muuten työlästä tai muuten vaikeaa.

"Valmiiden" (eli Pythonin perusasennukseen kuuluvien) kirjastojen lisäksi Pythoniin löytyy paljon muita kirjastoja, esimerkiksi peliohjelmointiin, vaativiin laskentaoperaatioihin tai koneoppimiseen. Näiden kirjastojen lataamista ja käyttöönottoa käsitellään lyhyesti jatkokurssin Python-osuuden lopussa.

## Kirjastojen käyttöönotto

Ulkoinen kirjasto otetaan käyttöön `import`-lauseella. Lausetta voidaan käyttää kahdella eri tavalla:

1. Voidaan luoda linkki koko ulkoiseen kirjastoon tai
2. Voidaan luoda linkki nimettyihin operaatioihin ulkoisessa kirjastossa

Tarkastellaan ensin ensimmäistä käyttötapausta. Käytetään esimerkkinä kirjastoa `random`, jonka avulla voidaan arpoa satunnaislukuja. Satunnaisluvuilla on käyttöä esimerkiksi peleissä, salausalgoritmeissa, tilastotieteessä tai ohjelmien testaamisessa.

<text-box variant="info">

Jos tarkkoja ollaan, `random`-kirjaston muodostamat luvut eivät ole aitoja satunnaislukuja, vaan ns. _pseudosatunnaislukuja_. Tietokoneen avulla on vaikea arpoa täysin satunnaisia lukuja, koska sen toiminta on kaikilta osin ennustettavissa. Lähes kaikkeen käyttöön luvut ovat kuitenkin tarpeeksi satunnaisia. Aitoja satunnaislukuja muodostettaessa lähteenä käytetään yleensä jotain tietokoneen ulkopuolista satunnaista ilmiötä, esimerkiksi radioaktiivista taustasäteilyä tai äänentasoa.

Lisätietoa löydät esimerkiksi sivulta <a href="https://www.random.org/randomness/">random.org</a>.

</text-box>

Koko kirjasto saadaan käyttöön syntaksin `import <kirjaston_nimi>` avulla. Kun linkki kirjastoon on muodostettu, voidaan kirjastoon kuuluvia operaatioita käyttää syntaksin `kirjaston_nimi.operaation_nimi` avulla.

Seuraava esimerkkiohjelma tuo käyttöön kirjaston `random` ja tulostaa viisi satunnaislukua väliltä [1,10]:

```python

# Otetaan käyttöön kirjasto random
import random

# Tulostetaan viisi lukua
for i in range(5):
    # satunnaisluku väliltä n,m arvotaan
    # operaation randint avulla
    print(random.randint(1,10))

```

<sample-output>

4
1
6
2
10

</sample-output>

Huomaa, että toisin kuin monessa muussa yhteydessä, operaatiossa `randint` ovat mukana myös päätepisteet: satunnainen luku voi siis olla myös 1 tai 10.

Toinen kätevä operaatio kirjastossa `random` on `choice`, joka poimii yhden satunnaisen alkion annetusta tietorakenteesta.

Funktio `muodosta_ryhmä` saa parametrikseen listan nimiä (tai mitä vain alkioita), ja muodostaa näistä pyydetyn kokoisen ryhmän.

```python

import random

def muodosta_ryhmä(alkiot: list, koko: int) -> list:
    # Tehdään listasta kopio, jottei rikota alkuperäistä
    kopio = alkiot[:]

    # tuloslista
    ryhmä = []

    # Poimitaan yksi kerrallaan alkiot satunnaisesti ja poistetaan
    # ne samalla, jottei samaa jäsentä lisätä kahdeksi
    for i in range(koko):
        jäsen = random.choice(kopio)
        ryhmä.append(jäsen)
        kopio.remove(jäsen)

    return ryhmä


# Testataan
tyypit = ["Pekka","Pirjo","Pate","Paula","Pentti","Piia","Pilli","Pulla","Palle","Pandora"]
print(muodosta_ryhmä(tyypit, 4))

```

<sample-output>

['Pate', 'Pandora', 'Pilli', 'Palle']

</sample-output>

<text-box variant="info">

Toisin kuin useissa muissa ohjelmointikielissä, Pythonissa `import`-lausetta voi käyttää missä tahansa ohjelman osassa. On kuitenkin suositeltavaa niputtaa kaikki importit heti ohjelman alkuun - tämä paranta ohjelman luettavuutta ja helpottaa muita ohjelmoijia.

</text-box>

## Yksittäisten operaatioiden käyttöönotto

Jos kirjastosta tarvitaan vain yksittäisiä operaatiota, on usein järkevämpää määritellä operaatiot `import`-lausetta käytettäessä.

Syntaksi tällaisessa tapauksessa on seuraava:

`from <kirjasto> import <operaatio(t)>`

Kun operaatio on määritelty, ei siihen viitattaessa tarvitse enää käyttää kirjasto nimeä, vaan pelkkä operaation nimi riittää.

Esimerkiksi

```python

# Kerrotaan, että random-kirjastosta otetaan käyttöön
# operaation randint
from random import randint

# Funktio noppa palauttaa arvon väliltä 1...6
def noppa() -> int:
    return randint(1,6)

# Testataan: heitetään noppaa viidesti
for i in range(5):
    print(noppa())

```

<sample-output>

3
4
4
2
1

</sample-output>

Useampia operaaatiota voidaan tuoda käyttöön samalla lauseella erottamalla ne toisistaan pilkulla:

```python

# Kerrotaan, että random-kirjastosta otetaan käyttöön
# operaatiot randint ja choice
from random import randint, choice

# Testataan operaatioita
print(randint(1,100))

lista = list(range(1,10,2))
print(choice(lista))

```

<sample-output>

36
4

</sample-output>

Operaatioille voidaan haluattaessa antaa _alias_ käyttämällä `as`-operaattoria. Tämä on erityisen kätevää, kun tuotavia operaatioita on paljon tai kun eri kirjastoissa on samannimisiä operaatioita.

Esimerkiksi

```python

# Kerrotaan, että random-kirjastosta otetaan käyttöön
# operaatio randint ja nimetään se uudestaan
# nimellä satunnaisluku
from random import randint as satunnaisluku

# Tulostetaan pari lukua
for i in range(6):
    print(satunnaisluku(1,100))

```

<sample-output>

93
66
26
6
46
64

</sample-output>

