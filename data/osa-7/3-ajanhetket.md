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

Moduulin `datetime` funktio `now` antaa aikaolion, jossa on nykyinen päivämäärä ja kellonaika. Voimme esimerkiksi tulostaa nykyhetken päivämäärän ja kellonajan näin:

```python
from datetime import datetime

aika = datetime.now()
print(aika)
```

<sample-output>

2020-04-02 12:46:49.311393

</sample-output>

Toinen tapa muodostaa aikaolio on määrittää ajanhetki itse:

```python
from datetime import datetime

aika = datetime(1917, 12, 6)
print(aika)
```

<sample-output>

1917-12-06 00:00:00

</sample-output>

Kun emme antaneet kellonaikaa, oletuksena on, että kyseessä on keskiyö.

Voimme hakea aikaoliosta ajan osia tähän tapaan:

```python
from datetime import datetime

aika = datetime(1917, 12, 6)
print("Kuukausi:", aika.month)
print("Vuosi:", aika.year)
```

<sample-output>

Kuukausi: 12
Vuosi: 1917

</sample-output>

## Aikojen vertailu ja ero

Voimme vertailla aikoja samaan tapaan kuin lukuja käyttämällä tuttuja vertailuoperaattoreita. Seuraava koodi antaa näytteen tästä:

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

Huomaa, että vähennyslaskun tuloksena on `timedelta`-olio, jolta voi kysyä vain rajoitetusti ajan yksikköjä. Voimme kysyä päivien määrän, mutta emme voi kysyä esimerkiksi vuosien määrää, koska vuoden pituus vaihtelee.

## Aikojen muotoilu

Voimme muotoilla ajanhetken haluamallamme tavalla `strftime`-metodin avulla. Esimerkiksi seuraava koodi tulostaa nykyisen päivämäärän muodossa `pp.kk.vvvv`:

```python
from datetime import datetime

aika = datetime.now()
print(aika.strftime("%m.%d.%Y"))
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

Voimme myös tehdä muotoilun toiseen suuntaan, jos esimerkiksi haluamme muuttaa käyttäjän antaman ajanhetken aikaolioksi. Tämä onnistuu metodilla `strptime`:

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


