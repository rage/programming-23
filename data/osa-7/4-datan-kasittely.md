---
path: '/osa-7/4-datan-kasittely'
title: 'Datan käsittely'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion suoritettuasi:

- Osaat etsiä hakemistossa olevia tiedostoja
- Osaat käyttää moduulia CSV-tiedoston käsittelyyn

</text-box>

## Tiedostojen etsiminen

Moduulin `glob` avulla voi etsiä hakemistossa olevat tiedostot, joiden nimellä on annettu formaatti. Esimerkiksi seuraava koodi etsii tiedostot, joiden pääte on `.py` (eli kyseessä on Python-tiedosto):

```python
from glob import glob

for nimi in glob("*.py"):
    print(nimi)
```

Ohjelman suoritus voisi näyttää vaikkapa seuraavalta:

<sample-output>

apina.py
banaani.py
cembalo.py
testi.py

</sample-output>

Tämä tarkoittaa, että hakemistossa on neljä Python-tiedostoa, joiden nimet ovat `apina.py`, `banaani.py`, `cembalo.py` ja `testi.py`.

## CSV-tiedoston lukeminen

Olemme tähän mennessä käsitelleet CSV-tiedostoja omalla koodilla, mutta tähän on myös valmis moduuli `csv`, jota voi käyttää näin:

```python
import csv

with open("testi.csv") as tiedosto:
    for rivi in csv.reader(tiedosto, iter=";"):
        print(rivi)
```

Yllä oleva koodi lukee rivit CSV-tiedostosta `testi.csv`, jossa erotinmerkki on `;`. Esimerkiksi jos tiedoston sisältö on

```x
012121212;5
012345678;2
015151515;4
```

niin koodi antaa seuraavan tuloksen:

<sample-output>

['012121212', '5']
['012345678', '2']
['015151515', '4']

</sample-output>

Mitä hyötyä on käyttää moduulia sen sijaan, että toteuttaa lukemisen itse `split`-funktiolla? Yksi hyöty on, että moduulin toteutus toimii myös silloin, kun arvona on merkkijono, jonka sisällä on erotinmerkki. Esimerkiksi jos tiedoston sisältö on

```x
"aaa;bbb";"ccc;ddd"
```

niin koodin tulos on:

<sample-output>

['aaa;bbb', 'ccc;ddd']

</sample-output>

Jos vain jakaisimme rivin osiin `;`-merkkien kohdista, lukeminen ei toimisi oikein, koska myös merkkijonot jakaantuisivat.

## Yhteenveto tiedostoista

Voimme nyt toteuttaa ohjelman, joka käy läpi kaikki hakemistossa olevat CSV-tiedostot ja koostaa yhteenvedon niissä olevista tiedoista. Ohjelma olettaa, että jokaisessa tiedostossa on tietyn kurssin tulokset.

```python
from glob import glob
import csv

tulokset = {}

for nimi in glob("*.csv"):
    kurssi = nimi.split(".")[0]
    with open(nimi) as tiedosto:
        for rivi in csv.reader(tiedosto, delimiter=";"):
            opnro, tulos = rivi
            if opnro not in tulokset:
                tulokset[opnro] = []
            tulokset[opnro].append((kurssi,tulos))

print(tulokset)
```

Tiedosto `ohpe.txt`:

```x
012121212;5
012345678;2
015151515;4
```

Tiedosto `ohja.txt`:

```x
012121212;3
012345678;5
015151515;5
```

Tiedosto `tira.txt`:

```x
012121212;3
015151515;2
```

Ohjelman antama tulos:

<sample-output>

{'012121212': [('ohpe', '5'), ('ohja', '3'), ('tira', '3')], '012345678': [('ohpe', '2'), ('ohja', '5')], '015151515': [('ohpe', '4'), ('ohja', '5'), ('tira', '2')]}

</sample-output>

Voisimme vielä parantaa tulostusta vaikkapa näin:

```python
for opnro in tulokset:
    print(opnro,"tulokset:")
    for tulos in tulokset[opnro]:
        print(" ", tulos[0], tulos[1])
```

<sample-output>

012121212 tulokset:
  ohpe 5
  ohja 3
  tira 3
012345678 tulokset:
  ohpe 2
  ohja 5
015151515 tulokset:
  ohpe 4
  ohja 5
  tira 2

</sample-output>

## Moduulien etsiminen

Pythonin dokumentaatiosta löytyy tietoa kaikista standardikirjaston moduuleista:

* https://docs.python.org/3/library/

Standardikirjaston lisäksi verkosta löytyy lukuisia vapaasti käytettäviä kirjastoja eri tarpeisiin. Joitakin yleisesti käytettyjä moduuleja on täällä:

* https://wiki.python.org/moin/UsefulModules

