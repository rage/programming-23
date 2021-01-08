---
path: '/osa-7/4-datan-kasittely'
title: 'Datan käsittely'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen:

- Osaat käyttää moduulia CSV-tiedoston käsittelyyn
- Osaat käyttää moduulia JSON-tiedoston käsittelyyn
- Osaat hakea netissä olevan tiedoston sisällön

</text-box>

## CSV-tiedoston lukeminen

Olemme tähän mennessä käsitelleet CSV-tiedostoja omalla koodilla, mutta tähän on myös valmis moduuli [csv](https://docs.python.org/3/library/csv.html), jota voi käyttää näin:

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

## JSON-tiedoston lukeminen

CSV-muodon lisäksi on olemassa muitakin koneluettavia tiedostomuotoja. Eräs näistä on erityisesti tietojen siirrossa yleisesti käytetty [JSON](https://www.json.org/json-en.html).

JSON-tiedostot ovat tekstitiedostoja, joilla on tietty tarkka muoto. Seuraavassa esimerkkinä JSON-tiedosto `kurssit.json`, jossa on tietoa kursseista:

```x
[
    {
        "nimi": "Ohjelmoinnin perusteet",
        "tunnus": "Ohpe",
        "periodit": [1, 3]
    },
    {
        "nimi": "Ohjelmoinnin jatkokurssi",
        "tunnus": "Ohja",
        "periodit": [2, 4]
    },
    {
        "nimi": "Tietokantasovellus",
        "tunnus": "Tsoha",
        "periodit": [1, 2, 3, 4]
    }
]
```


JSON-tiedostot näyttävät kohtuullisen tutulta Pythonin käyttäjille. Itse asiassa tiedoston sisältö vastaa Pythonin listaa, jonka sisällä on kolme sanakirjaa.

Standardikirjastossa on JSON-tiedostojen käsittelyyn moduuli [json](https://docs.python.org/3/library/json.html). Siinä oleva funktio `loads` muuttaa merkkijonona annetun JSON-datan Pythonin tietorakenteiksi. Esimerkiksi koodin

```python
import json

with open("kurssit.json") as tiedosto:
    data = tiedosto.read()
kurssit = json.loads(data)
print(kurssit)
```

tulos on seuraava:

<sample-output>

[{'nimi': 'Ohjelmoinnin perusteet', 'tunnus': 'Ohpe', 'periodit': [1, 3]}, {'nimi': 'Ohjelmoinnin jatkokurssi', 'tunnus': 'Ohja', 'periodit': [2, 4]}, {'nimi': 'Tietokantasovellus', 'tunnus': 'Tsoha', 'periodit': [1, 2, 3, 4]}]

</sample-output>

Koodia voisi jatkaa vaikka seuraavasti, jolloin koodi tulostaa jokaisen kurssin nimen:

```python
for kurssi in kurssit:
    print(kurssi["nimi"])
```

<sample-output>

Ohjelmoinnin perusteet
Ohjelmoinnin jatkokurssi
Tietokantasovellus

</sample-output>

<programming-exercise name='JSON-tiedoston käsittely' tmcname='osa07-12_jsontiedostot'>

Tarkastellaan JSON-tiedostoa, jossa on tietoa opiskelijoista seuraavassa muodossa:

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

Toteuta funktio `tulosta_henkilot(tiedosto: str)`, joka lukee esimerkin tavalla muodostetun JSON-tiedoston (jonka sisältönä voi olla mielivaltainen määrä henkilöitä) ja tulostaa ne seuraavassa muodossa:

<sample-output>

Pekka Pythonisti 27 vuotta (koodaus, kutominen)
Jaana Javanainen 24 vuotta (koodaus, kalliokiipeily, lukeminen)

</sample-output>

Harrastukset tulee luetella samassa järjestyksessä kuin ne on annettu JSON-tiedostossa.

</programming-exercise>

## Netissä olevan tiedoston hakeminen

Pythonin standardikirjaston funktion [urllib.request.urlopen](
https://docs.python.org/3/library/urllib.request.html#urllib.request.urlopen) avulla on helppo hakea internetistä sisältöä ohjelmista käsin.

Esim. seuraava koodi tulostaa Helsingin yliopiston etusivun sisällön:

```python
import urllib.request

pyynto = urllib.request.urlopen("https://helsinki.fi")
print(pyynto.read())
```

Ihmisille tarkoitetut sivut tosin eivät tulostu kovin selkeinä, mutta internetissä on myös runsaasti koneluettavaa dataa, joka on usein JSON-muodossa.

<programming-exercise name='Kurssien tilastot' tmcname='osa07-13_kurssistatistiikka'>

#### tieto kursseista

Osoitteesta <https://studies.cs.helsinki.fi/stats-mock/api/courses> löytyy JSON-muodossa muutaman laitoksen verkkokurssin perustiedot.

Tee funktio `hae_kaikki()` joka hakee ja palauttaa kaikkien menossa olevien kurssien (kentän `enabled` arvona `True`) tiedot listana tupleja. Paluuarvon muoto on seuraava:

<sample-output>

<pre>
[
    ('Full Stack Open 2020', 'ofs2019', 2020, 201),
    ('DevOps with Docker 2019', 'docker2019', 2019, 36),
    ('DevOps with Docker 2020', 'docker2020', 2020, 36),
    ('Beta DevOps with Kubernetes', 'beta-dwk-20', 2020, 28)
]
</pre>

</sample-output>

Jokainen tuple siis sisältää seuraavat arvot:

- kurssin koko nimi (`fullName`)
- nimi (`name`)
- vuosi (`year`)
- harjoitusten (`exercises`) yhteenlaskettu määrä


*Huom*: Tämän tehtävän testien toimivuuden osalta on oleellista, että haet tiedot funktiolla `urllib.request.urlopen`.

*Huom2:* Testeissä käytetään myös ovelaa kikkaa, joka hieman muuttaa internetistä tulevaa dataa ja tämän avulla varmistaa, että et huijaa tehtävässäsi palauttamalla "kovakoodattua" dataa.

*Huom3:* Jotkut Mac-käyttäjät ovat törmänneet tehtävässä seuraavaan ongelmaan:

```sh
File "/Library/Frameworks/Python.framework/Versions/3.8/lib/python3.8/urllib/request.py", line 1353, in do_open
    raise URLError(err)
urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1124)>
```

Ongelman ratkaisutapa riippuu siitä miten python on asennettu koneellesi. Joissain tapauksissa toimii seuraava:

```sh
cd "/Applications/Python 3.8/"
sudo "./Install Certificates.command
```

Huomaa, että cd-komennon polku riippuu käyttämästäsi Pythonin versiosta. Se voi olla myös "/Applications/Python 3.8/".

[Täällä](https://stackoverflow.com/questions/27835619/urllib-and-ssl-certificate-verify-failed-error) on ehdotettu useita erilaisia ratkaisuja ongelmaan.

Eräs kikka jota voit kokeilla, on seuraava:

```python
import urllib.request
import json
import ssl # lisää tämä kirjasto importeihin

def hae_kaikki():
    # ja tämä rivi funktioiden alkuun
    context = ssl._create_unverified_context()
    # muu koodi
```

Toinen tapa kiertää ongelma on seuraava:

 ```python
import urllib.request
import certifi # lisää tämä kirjasto importeihin
import json

def hae_kaikki():
    osoite = "https://studies.cs.helsinki.fi/stats-mock/api/courses"
    # lisätään kutsuun toinen parametri
    pyynto = urllib.request.urlopen(osoite, cafile=certifi.where())
    # muu koodi
```

#### yhden kurssin tiedot

Kunkin kurssin JSON-muotoinen tehtävästatistiikka löytyy omasta osoitteesta, joka saadaan vaihtamalla kurssin kenttä `name` seuraavassa tähtien paikalle <https://studies.cs.helsinki.fi/stats-mock/api/courses/****/stats>

Esimerkiksi kurssin `docker2019` tiedot ovat osoitteessa <https://studies.cs.helsinki.fi/stats-mock/api/courses/docker2019/stats>

Tee ohjelmaasi funktio `hae_kurssi(kurssi: str)`, joka palauttaa kurssin tarkemman tehtävästatistiikan.

Kun kutsutaan `hae_kurssi("docker2019")`, funktio palauttaa sanakirjan, jonka sisältö on seuraava:

<sample-output>

<pre>
{
    'viikkoja': 4,
    'opiskelijoita': 220,
    'tunteja': 5966,
    'tunteja_keskimaarin': 27,
    'tehtavia': 4988,
    'tehtavia_keskimaarin': 22
}
</pre>

</sample-output>

Sanakirjaan tallennetut arvot määrittyvät seuraavasti:

- `viikkoja`: kurssia vastaavan JSON-olioiden määrä
- `opiskelijoita` viikkojen opiskelijamäärien maksimi
- `tunteja`: kakkien viikkojen tuntimäärien (`hour_total`) summa
- `tunteja_keskimaarin`: edellinen jaettuna opiskelijamäärällä (kokonaislukuna pyöristettynä alaspäin)
- `tehtavia`: kakkien viikkojen tehtävämäärien (`exercise_total`) summa
- `tehtavia_keskimaarin`: edellinen jaettuna opiskelijamäärällä (kokonaislukuna pyöristettynä alaspäin)

*Huom*: Samat huomiot pätevät tähän osaan kuin edelliseen!

*Huom2*: löydät [math](https://docs.python.org/3/library/math.html) -moduulista funktion, jonka avulla kokonaisluvun alaspäin pyöristäminen on helppoa

</programming-exercise>

<programming-exercise name='Kuka huijasi' tmcname='osa07-14_kuka_huijasi'>

Tiedostossa `tentin_aloitus.csv` on tenttien aloitusaikoja muodossa `tunnus;hh:mm`. Esimerkiksi:

```csv
jarmo;09:00
timo;18:42
kalle;13:23
```

Lisäksi tiedostossa `palautus.csv` on tehtävien palautusaikoja muodossa `tunnus;tehtävä;pisteet;hh:mm`. Esimerkiksi:

```csv
jarmo;1;8;16:05
timo;2;10;21:22
jarmo;2;10;19:15
jne...
```

Tehtäväsi on etsiä ne opiskelijat, jotka ovat käyttäneet tenttiin yli 3 tuntia aikaa, eli opiskelijat, joiden _jonkin_ tehtävän palautus on tehty yli 3 tuntia tentin aloitusajasta. Palautuksia voi siis olla useampi. Voit olettaa, että kaikki ajat ovat saman vuorokauden puolella.

Kirjoita funktio `huijarit()`, joka palauttaa listan huijanneiden opiskelijoiden käyttäjätunnuksista.

</programming-exercise>

<programming-exercise name='Kuka huijasi, versio 2' tmcname='osa07-15_kuka_huijasi_2'>

Käytössäsi on edellisessä tehtävässä määritellyt datatiedostot. Kirjoita funktio `viralliset_pisteet()`, joka palauttaa sanakirjassa (dict) opiskelijoiden koepisteet seuraavien sääntöjen mukaan:

* Jos samaan tehtävänumeroon on tehty useita palautuksia, korkeimman pistemäärän palautus otetaan huomioon
* Jos tehtäväpalautus on tehty yli 3 tuntia tentin aloittamisen jälkeen, palautusta ei huomioida ollenkaan

Tehtävät on numeroitu 1–8 ja jokaisesta tehtävästä voi saada 0–6 pistettä.

Palautetussa sanakirjassa tunnus on avain ja tehtävien yhteispistemäärä arvo.

Vinkki: sisäkkäiset sanakirjat (dict) ovat mainio työkalua tallennettaessa eri opiskelijoiden pisteitä ja aikoja.

</programming-exercise>

## Moduulien etsiminen

Pythonin dokumentaatiosta löytyy tietoa kaikista standardikirjaston moduuleista:

* https://docs.python.org/3/library/

Standardikirjaston lisäksi verkosta löytyy lukuisia vapaasti käytettäviä kirjastoja eri tarpeisiin. Joitakin yleisesti käytettyjä moduuleja on täällä:

* https://wiki.python.org/moin/UsefulModules

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

Korjausehdotukset etsitään standardikirjaston moduulin [difflib](https://docs.python.org/3/library/difflib.html) tarjoaman funktion [get\_close\_matches](https://docs.python.org/3/library/difflib.html#difflib.get_close_matches) avulla.

*Huom*: jotta testit toimisivat, käytä funktiota "oletusasetuksilla", eli antamalla sille kaksi parametria: virheellinen sana ja lista oikeista sanoista.

</programming-exercise>

<quiz id="311e3116-a763-50b5-b79e-056fdccb3394"></quiz>
