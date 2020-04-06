---
path: '/osa-7/4-omat-kirjastot'
title: 'Omat kirjastot'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Myös omia rutiineja voidaan koota kirjastoksi. Tämä helpottaa ohjelmakoodin uudelleenkäyttöä.

Tämän osan suoritettuasi

- Tiedät, miten omiin ohjelmatiedostoihin voi viitata toisissa ohjelmissa
- Osaat muodostaa oman kirjaston
- Tiedät, mitä tarkoitetaan pääohjelmalla `__main__`

</text-box>

Myös omia ohjelmia voi käyttää kirjastoina. Käytännössä kirjastona kannattaa käyttää sellaista ohjelmaa, joka muodostuu erillisistä luokista ja/tai funktioista.

Tarkastellaan esimerkkinä yksinkertaista ohjelmaa, joka on tallennettu tiedostoon merkkijonoapuri.py:

```python

def eka_sana(mjono: str) -> str:
    return mjono[:mjono.find(" ")]

def vika_sana(mjono: str) -> str:
    return mjono.split(" ")[-1]

def sanojen_lkm(mjono: str) -> int:
    return len(mjono.split(" "))

```

Merkkijonoapuria voidaan hyödyntää muissa omissa ohjelmissa kuten mitä tahansa muutakin kirjastoa:

```python

import merkkijonoapuri

esimerkkijono = "Vesihiisi sihisi hississä"

print(merkkijonoapuri.eka_sana(esimerkkijono))
print(merkkijonoapuri.vika_sana(esimerkkijono))
print(merkkijonoapuri.sanojen_lkm(esimerkkijono))

```

<sample-output>

Vesihiisi
hississä
3

</sample-output>

<text-box variant="info">

Huomaa, että jotta kirjasto voidaan tuoda ohjelmaan `import`-lauseella, sen pitää sijaita joko

a. Samassa hakemistossa kuin missä parhaillaan ajettava ohjelmakin on tai
b. jossain Pythonin oletushakemistossa

Oletushakemistot määritellään järjestelmämuuttujassa PYTHONPATH, jota voi tarkastella kirjastosta `sys` löytyvän muuttujan `path` avulla. Lisätietoa hakemistojen lisäämisestä (ja poistamisesta) löydät hakusanoilla `python PYTHONPATH` - hakuun kannattaa liittää käyttämäsi käyttöjärjestelmä.

</text-box>

Myös yksittäisiä operaatioita voi tuoda kirjastosta:

```python

from merkkijonoapuri import eka_sana, vika_sana

lause = input("Anna lause: ")

print("Eka sana oli: " + eka_sana(lause))
print("Viimeinen sana oli: " + vika_sana(lause))

```

<sample-output>

Anna lause: **Python on metka ohjelmointikieli**
Eka sana oli: Python
Viimeinen sana oli: ohjelmointikieli

</sample-output>

## Omat kirjastot ja pääohjelma

Jos kirjastossa on ohjelmakoodia, joka ei ole funktion tai luokan sisällä, se suoritetaan automaattisesti kun kirjasto tuodaan toiseen ohjelmaan `import`-käskyllä.

Oletetaan, että `merkkijonoapuri.py`-kirjastoon on kirjoitettu muutama testitapaus:

```python

def eka_sana(mjono: str) -> str:
    return mjono[:mjono.find(" ")]

def vika_sana(mjono: str) -> str:
    return mjono.split(" ")[-1]

def sanojen_lkm(mjono: str) -> int:
    return len(mjono.split(" "))


# Testataan metodien toimintaa
print(eka_sana("Tämä on testi"))
print(vika_sana("Tämä on testeistä toinen"))
print(sanojen_lkm("Yks kaks kolme neljä viisi"))


```

Kun kirjasto otetaan nyt käyttöön `import`-lauseella, suoritetaan automaattisesti myös pääohjelmassa (eli funktioiden ulkopuolella) oleva koodi:

```python

import merkkijonoapuri

esimerkkijono = "Vesihiisi sihisi hississä"

print(merkkijonoapuri.eka_sana(esimerkkijono))
print(merkkijonoapuri.vika_sana(esimerkkijono))
print(merkkijonoapuri.sanojen_lkm(esimerkkijono))

```

<sample-output>

Tämä
toinen
5
Vesihiisi
hississä
3

</sample-output>

Pythonista löytyy onneksi ratkaisu pulmaan. Pääohjelmassa on mahdollista testata suoritetaanko ohjelmaa itseään vai tuotiinko se osaksi jotain toista ohjelmaa `import`-lauseella. Tämä onnistuu muuttujan `__name__` avulla. Python tallentaa muuttujaan tiedon suorittavasta ohjelmasta: jos ohjelmaa suoritetaan sellaisenaan, muuttujan arvo on merkkijono `__main__`. Jos ohjelma on tuotu osaksi jotain toista ohjelmaa, muuttujan arvona on suoritettavan ohjelman nimi (eli tässä tapauksessa `merkkijonoapuri`).

Kirjastoon voidaan siis lisätä edellistä tietoa hyödyntäen ehtolause, joka avulla testikoodi suoritetaan ainoastaan silloin, kun ohjelma ajetaan omana itsenään eikä osana toista ohjelmaa:

```python

def eka_sana(mjono: str) -> str:
    return mjono[:mjono.find(" ")]

def vika_sana(mjono: str) -> str:
    return mjono.split(" ")[-1]

def sanojen_lkm(mjono: str) -> int:
    return len(mjono.split(" "))


if __name__ == "__main__":
    # Testataan metodien toimintaa
    print(eka_sana("Tämä on testi"))
    print(vika_sana("Tämä on testeistä toinen"))
    print(sanojen_lkm("Yks kaks kolme neljä viisi"))

```

Nyt kirjasto-ohjelman itsensä suorittaminen ajaa testi:

<sample-output>

Tämä
toinen
5

</sample-output>

Kun kirjasto sen sijaan tuodaan osaksi jotain muuta ohjelmaa...

```python

import merkkijonoapuri

esimerkkijono = "Vesihiisi sihisi hississä"

print(merkkijonoapuri.eka_sana(esimerkkijono))
print(merkkijonoapuri.vika_sana(esimerkkijono))
print(merkkijonoapuri.sanojen_lkm(esimerkkijono))

```

...testikoodia ei ajeta:

<sample-output>

Vesihiisi
hississä
3

</sample-output>
