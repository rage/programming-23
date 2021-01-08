---
path: '/osa-7/3-aikojen-kasittely'
title: 'Aikojen käsittely'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät tavan käsitellä päivämääriä ja kellonaikoja Pythonissa
- Osaat muodostaa ja käyttää `datetime`-olioita
- Osaat vertailla päivämääriä ja kellonaikoja toisiinsa ja laskea niiden erotuksia

</text-box>

## Aikaolio

Moduulin [datetime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime) funktio [now](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.now) antaa aikaolion, jossa on nykyinen päivämäärä ja kellonaika. Voimme esimerkiksi tulostaa nykyhetken päivämäärän ja kellonajan näin:

```python
from datetime import datetime

aika = datetime.now()
print(aika)
```

<sample-output>

2020-10-13 12:46:49.311393

</sample-output>

Toinen tapa muodostaa aikaolio on määrittää ajanhetki itse:

```python
from datetime import datetime

aika = datetime(1952, 12, 24)
print(aika)
```

<sample-output>

1952-12-24 00:00:00

</sample-output>

Kun emme antaneet kellonaikaa, oletuksena on, että kyseessä on keskiyö.

Voimme hakea aikaoliosta ajan osia tähän tapaan:

```python
from datetime import datetime

aika = datetime(1952, 12, 24)
print("Päivä:", aika.day)
print("Kuukausi:", aika.month)
print("Vuosi:", aika.year)
```

<sample-output>

Päivä: 24
Kuukausi: 12
Vuosi: 1952

</sample-output>

Aikaoliolle voidaan antaa myös kellonaika halutulla tarkkuudella. Esimerkiksi:

```python
from datetime import datetime

pv1 = datetime(2020, 6, 30, 13, 00) # 30.6.2020 klo 13.00
pv2 = datetime(2020, 6, 30, 18, 45) # 30.6.2020 klo 18.45
```

## Aikojen vertailu ja ero

Voimme vertailla aikoja samaan tapaan kuin lukuja käyttämällä tuttuja vertailuoperaattoreita:

```python
from datetime import datetime

nyt = datetime.now()
juhannus = datetime(2020, 6, 20)

if nyt < juhannus:
    print("Ei ole vielä juhannus")
elif nyt == juhannus:
    print("Hyvää juhannusta!")
elif nyt > juhannus:
    print("Juhannus on mennyt")
```

<sample-output>

Juhannus on mennyt

</sample-output>

Voimme myös laskea kahden ajankohdan eron vähennyslaskuna:

```python
from datetime import datetime

nyt = datetime.now()
juhannus = datetime(2020, 6, 20)

ero = juhannus - nyt
print("Juhannukseen on vielä", ero.days, "päivää")
```

<sample-output>

Juhannukseen on vielä 37 päivää

</sample-output>

Huomaa, että vähennyslaskun tuloksena on [timedelta](https://docs.python.org/3/library/datetime.html?highlight=datetime#timedelta-objects)-olio, jolta voi kysyä vain rajoitetusti ajan yksikköjä. Voimme kysyä päivien määrän, mutta emme voi kysyä esimerkiksi vuosien määrää, koska vuoden pituus vaihtelee.

Timedelta-olion avulla on myös mahdollista selvittää, mikä ajanhetki saadaan kun tietty aika (viikkoina ja päivinä) lisätään johonkin ajanhetkeen:

```python
from datetime import datetime, timedelta
juhannus = datetime(2020, 6, 20)

viikko = timedelta(days=7)
viikon_paasta = juhannus + viikko

print("Kun viikko juhannuksesta kuluu on", viikon_paasta)

pitka_aika = timedelta(weeks=32, days=15)

print("Kun juhannuksesta kuluu 32 viikkoa ja 15 päivää on", juhannus + pitka_aika)
```

<sample-output>

Kun viikko juhannuksesta kuluu on 2020-06-27 00:00:00
Kun juhannuksesta kuluu 32 viikkoa ja 15 päivää on 2021-02-14 00:00:00

</sample-output>

Timedelta-olio toimii viikkojen ja päivien lisäksi tarkemmallakin tasolla:

```python
nyt = datetime.now()
keskiyo = datetime(2020, 6, 30)
erotus = keskiyo-nyt
print(f"keskiyöhön on vielä {erotus.seconds} sekuntia")
```

<sample-output>

keskiyöhön on vielä 8188 sekuntia

</sample-output>

<programming-exercise name='Kuinka vanha' tmcname='osa07-09_kuinka_vanha'>

Tee ohjelma, joka kysyy käyttäjän syntymäajan (erikseen päivä, kuukausi ja vuosi) ja tulostaa, kuinka monta päivää vanha käyttäjä oli 31.12.1999 seuraavan esimerkin mukaisesti:

<sample-output>

Päivä: **10**
Kuukausi: **9**
Vuosi: **1979**
Olit 7417 päivää vanha, kun vuosituhat vaihtui.

</sample-output>

<sample-output>

Päivä: **28**
Kuukausi: **3**
Vuosi: **2005**
Et ollut syntynyt, kun vuosituhat vaihtui.

</sample-output>

Voit olettaa, että kaikki annetut päivä-kuukausi-vuosi-yhdistelmät ovat mahdollisia (eli käyttäjä ei siis anna esim. syötettä 31.2.1999).

</programming-exercise>

<programming-exercise name='Henkilötunnus oikein?' tmcname='osa07-10_henkilotunnus_oikein'>

Tee funktio `onko_validi(hetu: str)`, joka palauttaa `True` tai `False` sen mukaan, onko annettu henkilötunnus oikea. Henkilötunnus on muotoa `ppkkvvXyyyz`, jossa `ppkkvv` kertoo syntymäajan (päivä/kuukausi/vuosi), `X` on syntymävuosisadasta riippuva välimerkki, `yyy` henkilökohtainen yksilönumero ja `z` tarkistemerkki.

Ohjelman tulee tarkastaa, että

* alkuosassa on ppkkvv-muodossa oleva päivämäärä, joka on olemassa oleva päivämäärä
* välimerkki on `+` (1800-luku), `-` (1900-luku) tai `A` (2000-luku) ja
* lopussa oleva tarkastusmerkki on oikein.

Tarkastusmerkki lasketaan jakamalla syntymäajasta ja yksilönumerosta muodostuva numerosarja 31:llä ja ottamalla tästä jakojäännös. Merkki valitaan sitten jakojäännöksen mukaisesta indeksistä merkkijonosta `0123456789ABCDEFHJKLMNPRSTUVWXY`. Esimerkiksi jos jakojäännös on 12, valitaan indeksissä 12 oleva merkki `C`.

Lisätietoa laskemisesta löydät esimerkiksi [Digi- ja väestötietoviraston sivuilta](https://dvv.fi/henkilotunnus).

**HUOM!** Pidä huolta, ettet jaa omaa henkilötunnustasi esimerkiksi testikoodin mukana, jos kysyt neuvoja tehtävään kurssin keskustelualueella tai muualla.

Oikeamuotoisia henkilötunnuksia testaamiseen ovat esimerkiksi seuraavat:

* 230827-906F
* 120488+246L
* 310823A9877

</programming-exercise>

## Aikojen muotoilu

Voimme muotoilla ajanhetken haluamallamme tavalla [strftime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.date.strftime)-metodin avulla. Esimerkiksi seuraava koodi tulostaa nykyisen päivämäärän muodossa `pp.kk.vvvv`:

```python
from datetime import datetime

aika = datetime.now()
print(aika.strftime("%d.%m.%Y"))
```

<sample-output>

04.02.2020

</sample-output>

Ajan muotoilussa käytetään tiettyjä kirjainlyhenteitä. Seuraavassa listassa on joitakin mahdollisia lyhenteitä (täydellinen lista on Pythonin [dokumentaatiossa](https://docs.python.org/3/library/time.html#time.strftime)):

Lyhenne | Merkitys
:-------|:--------
`%d` | päivä (01–31)
`%m` | kuukausi (01–12)
`%Y` | vuosi nelinumeroisena
`%H` | tunnit 24 tunnin formaatissa
`%M` | minuutit (00–59)
`%S` | sekunnit (00–59)

Voimme myös tehdä muotoilun toiseen suuntaan, jos esimerkiksi haluamme muuttaa käyttäjän antaman ajanhetken aikaolioksi. Tämä onnistuu metodilla [strptime](https://docs.python.org/3/library/datetime.html?highlight=datetime#datetime.datetime.strptime):

```python
from datetime import datetime

syote = input("Anna syntymäpäiväsi muodossa pv.kk.vvvv: ")
aika = datetime.strptime(syote, "%d.%m.%Y")

if aika < datetime(2000, 1, 1):
    print("Synnyit viime vuosituhannella")
else:
    print("Synnyit tällä vuosituhannella")
```

<sample-output>

Anna syntymäpäiväsi muodossa pv.kk.vvvv: **5.11.1986**
Synnyit viime vuosituhannella

</sample-output>

<programming-exercise name='Ruutuaika' tmcname='osa07-11_ruutuaika'>

Ohjelmassa kirjoitetaan käyttäjän määrittelemään tiedostoon "ruutuaikoja", eli käyttäjän television, tietokoneen ja mobiililaitteen ääressä tiettyinä päivinä viettämää aikaa.

Ohjelma toimii seuraavasti:

<sample-output>

Tiedosto: **kesakuun_loppu.txt**
Aloituspäivä: **24.6.2020**
Montako päivää: **5**
Anna ruutuajat kunakin päivänä minuutteina (TV tietokone mobiililaite):
Ruutuaika 24.06.2020: **60 120 0**
Ruutuaika 25.06.2020: **0 0 0**
Ruutuaika 26.06.2020: **180 0 0**
Ruutuaika 27.06.2020: **25 240 15**
Ruutuaika 28.06.2020: **45 90 5**
Tiedot tallennettu tiedostoon kesakuun_loppu.txt

</sample-output>

Kunkin päivän riville on siis annettu välilyönnillä eroteltuna kolme minuuttimäärää.

Ohjelma tallentaa tilaston ruutuajoista tiedostoon `kesakuun_loppu.txt`, joka näyttää yllä olevalla syötteellä seuraavalta:

<sample-data>

Ajanjakso: 24.06.2020-28.06.2020
Yht. minuutteja: 780
Keskim. minuutteja: 156.0
24.06.2020: 60/120/0
25.06.2020: 0/0/0
26.06.2020: 180/0/0
27.06.2020: 25/240/15
28.06.2020: 45/90/5

</sample-data>

</programming-exercise>

<quiz id="6fff0633-2f18-5e2b-9eab-6c8950c8378b"></quiz>

