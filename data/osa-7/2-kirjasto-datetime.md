---
path: '/osa-7/2-kirjasto-datetime'
title: 'Päivämäärien ja kellonaikojen käsittely'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Usein ohjelmissa tarvittava ominaisuus on päivämäärien ja kellonaikojen käsittely. Erilaisten poikkeusten (esim. karkauspäivät) takia näiden käsittelyssä kannattaa käyttää ulkoista kirjastoa. Tässä osassa tutustutaan Pythonin kirjastoon `datetime`.

Tämän osion läpikäytyäsi

- Tiedät, miten päivämäärät ja kellonajat kannattaa tallentaa Pythonissa
- Osaat muodostaa ja manipuloida `datetime`-olioita
- Osaat vertailla päivämääriä ja kellonaikoja toisiinsa ja laskea niiden erotuksia

</text-box>

 Päivämäärien ja kellonaikojen hallinta ohjelmissa saattaa tuntua ensi alkuun yksinkertaiselta, mutta todellisuudessa se kannattaa yleensä jättää ulkoisten kirjastojen huoleksi. Esimerkiksi kahden ajankohdan välisen erotuksen laskemisessa pitää ottaa huomioon se, että eri kuukausissa on eri määärä päiviä, karkausvuodet ja muut poikkeukset. Myös erilaiset tavat merkitä aikoja voivat tuottaa hankaluuksia ohjelmoijalle: kun helmikuun kolmas päivä vuonna 2021 merkitään Suomessa muotoon 3.2.2021, merkitään se tyypillisesti Yhdysvalloissa muotoon 02/03/2021 ja useimpien tietokonejärjestelmien käyttämässä aikaleimajärjestelmässä muotoon 2021/02/03. Samalla tavalla kellonaikojen merkintään käytetään paitsi eri tarkkuuksia, myös 12 ja 24 tunnin järjestelmiä.

 ## Kirjasto datetime

 Pythonissa päivämäärien ja kellonaikojen hallintaan voidaan käyttää kirjastoa `datetime`. Kirjaston avulla voidaan muodostaa aikaa mallintavia olioita.

Tarkastellaan ensin ohjelmaa, jossa tallennetaan nykyinen aika luokan `datetime` tyyppiseen olioon.

 ```python

from datetime import datetime

# Nykyinen kellonaika
aika_nyt = datetime.now()

# Tulostetaan koko olio...
print(aika_nyt)

# Tulostetaan eri päivämääräkenttien arvoja
print("Päivämäärä: " + str(aika_nyt.day))
print("Kuukausi: " + str(aika_nyt.month))
print("Vuosi: " + str(aika_nyt.year))

# Tulostetaan aikakenttien arvoja
print("Tunnit nyt: " + str(aika_nyt.hour))
print("Minuutit nyt: " + str(aika_nyt.minute))
print("Sekunnit nyt: " + str(aika_nyt.second))

 ```

<sample-output>

2020-04-02 12:46:49.311393
Päivämäärä: 2
Kuukausi: 4
Vuosi: 2020
Tunnit nyt: 12
Minuutit nyt: 46
Sekunnit nyt: 49

</sample-output>

Päivämäärä voidaan muodostaa myös antamalla halutut arvot itse:

```python

from datetime import datetime

itsenäisyyspäivä = datetime(1917, 12, 6)

# Tulostetaan koko olio...
print(itsenäisyyspäivä)

# Tulostetaan eri päivämääräkenttien arvoja
print("Päivämäärä: " + str(itsenäisyyspäivä.day))
print("Kuukausi: " + str(itsenäisyyspäivä.month))
print("Vuosi: " + str(itsenäisyyspäivä.year))

# Aikakenttiä ei asetettu, joten arvot ovat kaikki nollia
print("Tunnit nyt: " + str(itsenäisyyspäivä.hour))
print("Minuutit nyt: " + str(itsenäisyyspäivä.minute))
print("Sekunnit nyt: " + str(itsenäisyyspäivä.second))

```

<sample-output>

1917-12-06 00:00:00
Päivämäärä: 6
Kuukausi: 12
Vuosi: 1917
Tunnit nyt: 0
Minuutit nyt: 0
Sekunnit nyt: 0

</sample-output>

## Luokka time

Luotaessa oliota luokasta `datetime` voidaan antaa myös tunnit, minuutit ja sekunnit, esimerkiksi

```python

# Kentät järjestyksessä
# vuosi, kuukausi, päivä, tunnit, minuutit, sekunnit
# eli 24.10.2018 kello 15.45
tenttiaika = datetime(2018, 10, 24, 15, 45, 00)

```

Jos halutaan kuitenkin mallintaa pelkkää aikaa päivämäärän sijasta, voidaan käyttää luokkaa `time`.

Esimerkiksi

```python

from datetime import time

# Parametrit järjestyksessä
# tunnit, minuutit, sekunnit
keskipäivä = time(12, 0, 0)
iltapäivä = time(15, 45, 15)

print(keskipäivä)
print(iltapäivä)

# kentät erikseen
print(iltapäivä.hour)
print(iltapäivä.minute)
print(iltapäivä.second)

#...tarvittaessa saadaan myös mikrosekunnit
print(iltapäivä.microsecond)

```

<sample-output>

12:00:00
15:45:15
15
45
15
0

</sample-output>


## Aikojen vertailu

Aikoja käsiteltäessä niiden vertailu toisiinsa on usein olennaista. Näin voidaan esimerkiksi järjestää tapahtumat aikajärjestykseen.

Sekä `datetime`- että `time`-olioita voidaan vertailla toisiinsa Pythonin normaalien vertailuoperaattorien avulla. Esimerkiksi

```python

from datetime import datetime

nyt = datetime.now()
ennen = datetime(2006, 10, 21)
tulevaisuus = datetime(2120, 6, 11)


if ennen < nyt:
    print("Ennen oli ennen")

if tulevaisuus > nyt:
    print("Tulevaisuus tulee joskus")

```

<sample-output>

Ennen oli ennen
Tulevaisuus tulee joskus

</sample-output>

Koska aikaolioita voidaan vertailla toisiinsa, aikoja sisältävän listan voi myös järjestää metodilla `sort` tai funktiolla `sorted`:

```python

from datetime import datetime

aikalista = []

aikalista.append(datetime(1976,9,9))
aikalista.append(datetime(1939,9,1))
aikalista.append(datetime(2015,12,24))
aikalista.append(datetime(1814,11,21))

aikalista.sort()
for aika in aikalista:
    print(aika)

```

<sample-output>

1814-11-21 00:00:00
1939-09-01 00:00:00
1976-09-09 00:00:00
2015-12-24 00:00:00

</sample-output>


## Kahden ajankohdan välinen ero

Kahden ajankohdan keskinäisen järjestyksen lisäksi on usein tärkeä tietää kuinka suuri ero ajankohtien välillä on. Pythonissa tämä onnistuu helposti vähentämällä `datetime`-olio toisesta samantyyppisestä oliosta. Lopputuloksena on uusi `timedelta`-tyyppinen olio, joka sisältää tiedon ajankohtien välisestä erosta.

Esimerkiksi

```python

from datetime import datetime, timedelta

talvisota_alkoi = datetime(1939,11,30)
nyt = datetime.now()

aikaa_kulunut = nyt - talvisota_alkoi
print(aikaa_kulunut)

# Yksittäiset ajat saa vain vuorokausina, sekunteina
# tai mikrosekunteina
print("Vuorokausia: " + str(aikaa_kulunut.days))
print("Sekunteja: " + str(aikaa_kulunut.seconds))

```

<sample-output>

29344 days, 13:53:14.620196
Vuorokausia: 29344
Sekunteja: 620196

</sample-output>

Huomaa, että `timedelta`-oliolta ei voi suoraan kysyä esimerkiksi vuosia, koska kahden ajankohdan välinen ero on mahdotonta kuvata kokonaisina vuosina tietämättä itse ajankohtia (johtuen esimerkiksi karkausvuosista).

Koska `timedelta`-oliolla ei esitetä ajankohtaa vaan ajan määrää, sen avulla voidaan näppärästi pyöräyttää aikaa eteen- tai taaksepäin.

```python

from datetime import datetime, timedelta

# Aika nyt
aika_nyt = datetime.now()


# 100 päivää, 0 sekuntia ja 0 mikrosekuntia
# Myös muoto timedelta(100) kävisi tässä tapauksessa
pv_100 = timedelta(100,0,0)

# Aika sadan päivän päästä
aika_myöhemmin = aika_nyt + pv_100

print("Nyt on " + str(aika_nyt))
print("100 päivän päästä on " + str(aika_myöhemmin))

```

<sample-output>

Nyt on 2020-04-02 14:22:59.807541
100 päivän päästä on 2020-07-11 14:22:59.807541

</sample-output>



## Aikatietojen muotoilu ja parsiminen

Aikatietojen muotoilun voisi toki tehdä katenoimalla merkkijonoja. Luokan `datetime` metodi `strftime` (**str**ing **f**ormat **time**) tarjoaa kuitenkin helpommat mahdollisuudet merkkijonon muodostamiseen ajasta.

Tarkastellaan esimerkkiä, jossa halutaan tulostaa päivämäärä muodossa "pv.kk.vvvv", eli esimerkiksi "25.11.2017":

```python

from datetime import datetime

# Nykyinen aika
aika_nyt = datetime.now()

# Merkkijono, joka sisältää päivämäärän
# muodossa pv.kk.vvvv
pvm = aika_nyt.strftime("%m.%d.%Y")

print("Päivämäärä nyt: " + pvm)

```

<sample-output>

Päivämäärä nyt: 04.02.2020

</sample-output>

Muotoilumerkkijonossa voidaan esimerkin mukaisesti käyttää tiettyjä määrättyjä kirjainlyhenteitä, jotka palauttavat olioon tallennetun ajankohdan eri yksiköitä. Tärkeimpiä on listattu seuraavassa taulukossa, kaikki lyhenteet löydät Pythonin <a href="https://docs.python.org/3/library/datetime.html#strftime-strptime-behavior">dokumentaatiosta</a>.

Lyhenne | Merkitys
:-------|:--------
`%d` | päivä (01-31)
`%m` | kuukausi (01-12)
`%Y` | vuosi nelinumeroisena
`%H` | tunnit 24 tunnin formaatissa
`%M` | minuutit (00 - 59)
`%S` | sekunit (00-59)

Ajankohta voi tulla ohjelmalle useassa eri muodossa. Ajan parsimiseksi `dateformat`-olioksi kirjastosta löytyy metodi `strptime` (**str**ing **p**arse **time**). Metodi toimii ikään kuin edellä esitetyn `strftime`-funktion vastakohtana: sille voidaan kertoa, missä muodossa aika on merkkijonossa esitetty. Tämän pohjalta metodi muodostaa uuden `datetime`-olion.

Esimerkiksi

```python

from datetime import datetime, timedelta

pvm_mjono = input("Anna syntymäpäiväsi muodossa pv.kk.vvvv: ")

# Parsitaan datetime-olioksi
synttäri = datetime.strptime(pvm_mjono, "%d.%m.%Y")

# Lisätään 1 vuosi
yks_vee = synttäri + timedelta(111)

print("Olit 111 päivää vanha "+ yks_vee.strftime("%d.%m.%Y"))

```

<sample-output>

Anna syntymäpäiväsi muodossa pv.kk.vvvv: **5.11.1986**
Olit 111 päivää vanha 24.02.1987

</sample-output>


