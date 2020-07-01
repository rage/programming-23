---
path: '/osa-7/4-datan-kasittely'
title: 'Datan käsittely'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen:

- Osaat etsiä hakemistossa olevia tiedostoja
- Osaat käyttää moduulia CSV-tiedoston käsittelyyn

</text-box>

## Tiedostojen etsiminen

Moduulin [glob](https://docs.python.org/3/library/glob.html?highlight=glob#module-glob) avulla voi etsiä hakemistossa olevat tiedostot, joiden nimellä on annettu formaatti. Esimerkiksi seuraava koodi etsii tiedostot, joiden pääte on `.py` (eli kyseessä on Python-tiedosto):

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

Olemme tähän mennessä käsitelleet CSV-tiedostoja omalla koodilla, mutta tähän on myös valmis moduuli [csv](csv), jota voi käyttää näin:

```python
import csv

with open("testi.csv") as tiedosto:
    for rivi in csv.reader(tiedosto, delimiter=";"):
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

<programming-exercise name='json-tiedoston käsittely' tmcname='osa07-14_jsontiedostot'>

CSV-muodon lisäksi on olemassa muitekin "koneluettavia" tiedostomuotoja. Eräs näistä on erityisesti tietojen siirrossa hyvin yleisesti käytetty [JSON](https://www.json.org/json-en.html).

Json-tiedostot ovat tekstitiedostoja, joilla on tietty tarkka muoto. Seuraavassa esimerkkinä json-tiedosto, joka esittää joukkoa opiskelijoita:

```json
[
    {
        "nimi": "Pekka Pythonisti",
        "ika": 27,
        "harrastukset": [
            "koodaus",
            "kutominen"
        ]
    },
    {
        "nimi": "Jaana Javanainen",
        "ika": 24,
        "harrastukset": [
            "koodaus",
            "kalliokiipeily",
            "lukeminen"
        ]
    }
]
```

Json-tiedostot näyttävätkin kohtuullisen tutulta Pythonin käyttäjille. Itseasiassa esimerkin sisältämä _json-objekti_ on jo suoraan validia Pythonia-koodia, joka määrittelee listan, jonka sisällö on kaksi sanakirja-olioa.

Haasteeksi nouseekin se, miten tiedostossa oleva (tai internetistä haettava) json-muotoinen teksti saadaan muutetta eli parsittua Python-olioiksi.

Onneksi standardikirjasto sisältää tähän sopivan moduulin [json](https://docs.python.org/3/library/json.html).

Toteuta funktio `tulosta_henklilot(tiedosto: str)`, joka lukee esimerkin tavalla muodostetun json-tiedoston (jonka sisältönä voi olla mielivaltainen määrä henkilöitä) ja tulostaa ne seuraavassa muodossa:

<sample-output>

Pekka Pythonisti 27 vuotta (koodaus, kutominen)
Jaana Javanainen 24 vuotta (koodaus, kalliokiipeily, lukeminen)

</sample-output>

Harrastukset tulee luetella samassa järjestyksessä, mistä ne löytyvät json-tiedostosta.

Pääset tässä tehtävässä harjoittelemaan hieman standardikirjaston dokumentaation lukemista tulkitessasi miten kirjastoa [json](https://docs.python.org/3/library/json.html) käytetään! Kohta _Decoding JSON_ tekee sen mitä tehtävässä tarvitaan.

*Vihje* tässä tehtävässä tiedostoa ei kannata lukea riveittäin, vaan parasta on lukea sen sisältö kokonaan yhteen merkkijonoon [tämän luvun](osa-6/1-tiedostojen-lukeminen) ensimmäisen esimerkin tapaan.

</programming-exercise>

<programming-exercise name=' Kurssien tilastot' tmcname='osa07-15_kurssistatistiikka'>

Pythonin standardikirjastosta löytyvät funktion [urllib.request.urlopen](
https://docs.python.org/3/library/urllib.request.html#urllib.request.urlopen) avulla on helppo hakea internetistä sisältöä ohjelmista käsin:

Esim. seuravasti on mahdollista tulostaa Helsingin yliopiston etusivun sisältö:

```python
import urllib.request

pyynto = urllib.request.urlopen('https://helsinki.fi')
print(pyynto.read())
```

Ihmisille tarkoitetut sivut tosin eivät tulostu kovin selkeinä, mutta internetissä on myös runsaasti koneluettavaa dataa, joka on usein juurikin json-muodossa.

#### osa 1: tieto kursseista

Osoitteesta <https://studies.cs.helsinki.fi/stats/api/courses> löytyy muutaman laitoksen verkkokurssin perustiedot. Tee funktio ´hae_kaikki()´ joka hakee ja palauttaa kaikkien menossa olevien kurssien (kentän enabled arvona _true_) tiedot listana tupleja, joiden muoto on seuraava

<sample-output>

[
    ('Full Stack Open 2020', 'ofs2019', 2020, 201),
    ('DevOps with Docker 2019', 'docker2019', 2019, 36),
    ('DevOps with Docker 2020', 'docker2020', 2020, 36),
    ('Beta DevOps with Kubernetes', 'beta-dwk-20', 2020, 28)
]

</sample-output>

Jokainen tuple siis sisältää seuraavat arvot
- kurssin koko nimi (fullname)
- nimi (name)
- vuosi (year)
- harjoitusten (exercises) yhteenlaskettu määrä

*Huom:* kun suoritat testejä, huolehti että ohjelmassasi ei kutsuta toteuttamaasi funktiota!

*Huom2:* tämän tehtävän testien toimivuuden osalta on oleellista, että haet tiedot funktiolla `urllib.request.urlopen`.

*Huom3:* testit käyttävät samaa dataa kun osoitteesta <https://studies.cs.helsinki.fi/stats-mock/api/courses> löytyy.
Tässä vaihtoehtoisessa osoitteessa on sama data mitä varsinaisessa osoitteessa oli 30.6.

*Huom4:* testeissä käytetän myös ovelaa kikkaa, jonka hieman muuttaa internetistä tulevaa dataa, ja tämän avulla varmistaa, ettet huijaa tehtävässäsi palauttamalla "kovakoodattua" dataa.

#### osa 2: yhden kurssin tiedot

Kunkin kurssin tehtävästatistiikka löytyy omasta osoitteesta, joka saadaan vaihtamalla kurssin kenttä _name_ seuraavassa tähtien paikalle <https://studies.cs.helsinki.fi/stats/api/courses/****/stats>

Esimerkiksi kurssin _docker2019_ tiedot ovat osoitteessa <https://studies.cs.helsinki.fi/stats/api/courses/docker2019/stats>

Tee ohjelmaasi funktio `hae_kurssi(kurssi: str)` joka palauttaa kurssin tarkemman tehtävästatistiikan. Funktion

Kun kutsutaan `hae_kurssi("docker2019")` funktio palauttaa sanakirjan, jonka sisältö on seuraava

<sample-output>

{
    'viikkoja': 4,
    'opiskelijoita': 220,
    'tunteja': 5966,
    'tunteja_keskimaarin': 27,
    'tehtavia': 4988,
    'tehtavia_keskimaarin': 22
}

</sample-output>

Sanakirjaan talletetut arvot määrittyvät seuraavasti:

- _viikkoja_: kurssia vastaavan jsonin "olioiden" määrä
- *opiskelijoita* viikkojen opiskelijamäärien maksimi
- *tunteja*: kakkien viikkojen tuntimäärien summa
- *tunteja_keskimaarin*: edellinen jaettuna opsikelijamäärällä (kokonaislukuna)
- *tehtavia*: kakkien viikkojen tehtävämäärien summa
- *tehtavia_keskimaarin*: edellinen jaettuna opsikelijamäärällä (kokonaislukuna)

*Huom:* samat huomiot pätevät tähän osaan kuin edelliseen!

</programming-exercise>

<programming-exercise name='Spellchecker, versio 2' tmcname='osa07-16_spellchecker_versio2'>

Teemme tässä tehtävässä hieman parannellun version edellisen osan tehtävästä Spellchecker.


Edellisen osan version tapaan ohjelma pyytää käyttäjää kirjoittamaan rivin englanninkielistä tekstiä. Ohjelma suorittaa tekstille oikeinkirjoitustarkistuksen ja tulostaa saman tekstin siten, että kaikki väärin kirjoitetut sanat on ympäröity tähdillä. _Tämän lisäksi ohjelma antaa listan korjausehdotuksia väärin kirjotettuihin sanoihin._

Seuraavassa kaksi käyttöesimerkkiä:

<sample-output>

write text: **We use ptython to make a spell checker**
<pre>
We use *ptython* to make a spell checker
korjausehdotukset:
ptython: python, pythons, typhon
</pre>

</sample-output>

<sample-output>

write text: **this is acually a good and usefull program**
<pre>
this is *acually* a good and *usefull* program
korjausehdotukset:
acually: actually, tactually, factually
usefull: usefully, useful, museful
</pre>

</sample-output>

Korjausehdotukset etsitään standardikirjaston moduulin [difflib](https://docs.python.org/3/library/difflib.html) tarjoaman funktion [get\_closes\_matches](https://docs.python.org/3/library/difflib.html#difflib.get_close_matches) avulla.

*Huom:* jotta testit toimisivat, käytä funktiota "oletusasetuksilla", eli antamalla sille kaksi parametria, eli virheellinen sana sekä lista oikeista sanoista.

</programming-exercise>
