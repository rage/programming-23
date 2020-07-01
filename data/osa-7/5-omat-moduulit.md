---
path: '/osa-7/5-omat-moduulit'
title: 'Oman moduulin tekeminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat luoda oman moduulin
- Tiedät, mitä Pythonin muuttuja `__name__` ja sen arvo `__main__` merkitsevät

</text-box>

Omien moduulien tekeminen on helppoa Pythonissa, koska mikä tahansa Python-koodia sisältävä tiedosto voi toimia moduulina. Tarkastellaan esimerkkinä seuraavaa tiedostoa `sanat.py`:

```python
def eka_sana(mjono: str):
    osat = mjono.split(" ")
    return osat[0]

def vika_sana(mjono: str):
    osat = mjono.split(" ")
    return osat[-1]

def sanojen_maara(mjono: str):
    osat = mjono.split(" ")
    return len(osat)
```

Voimme käyttää tässä tiedostossa olevia funktioita toisessa tiedostossa seuraavasti:

```python
import sanat

mjono = "Vesihiisi sihisi hississä"

print(sanat.eka_sana(mjono))
print(sanat.vika_sana(mjono))
print(sanat.sanojen_maara(mjono))
```

<sample-output>

Vesihiisi
hississä
3

</sample-output>

Huomaa moduulin kooditiedoston pitää sijaita joko samassa hakemistossa ohjelman kanssa tai jossakin Pythonin oletushakemistossa jotta sen voi ottaa käyttöön `import`-komennolla.

Voimme käyttää omaa moduulia samalla periaatteella kuin standardikirjaston moduuleja. Esimerkiksi näin:

```python
from sanat import eka_sana, vika_sana

lause = input("Anna lause: ")

print("Eka sana oli: " + eka_sana(lause))
print("Viimeinen sana oli: " + vika_sana(lause))
```

<sample-output>

Anna lause: **Python on metka ohjelmointikieli**
Eka sana oli: Python
Viimeinen sana oli: ohjelmointikieli

</sample-output>

## Hyötyä tyyppivihjeistä

Moduulissa on hyödyllistä, että funktioissa käytetään tyyppivihjeitä. Kun joku muu käyttää moduulia editorilla, joka ymmärtää tyyppivihjeitä, ne helpottavat moduulin käyttämistä.

Esimerkiksi Visual Studio Code näyttää funktion tyypit näin koodia kirjoittaessa:

<img src="7_vihje.png">

## Moduulin päätason koodi

Jos moduulissa on päätason koodia, joka ei ole funktion sisällä, koodi suoritetaan automaattisesti, kun moduuli otetaan mukaan `import`-komennolla toisessa tiedostossa.

Oletetaan, että `sanat.py`-tiedostoon on kirjoitettu muutama testitapaus:

```python
def eka_sana(mjono: str):
    osat = mjono.split(" ")
    return osat[0]

def vika_sana(mjono: str):
    osat = mjono.split(" ")
    return osat[-1]

def sanojen_maara(mjono: str):
    osat = mjono.split(" ")
    return len(osat)

print(eka_sana("Tämä on testi"))
print(vika_sana("Tämä on testeistä toinen"))
print(sanojen_maara("Yks kaks kolme neljä viisi"))
```

Kun moduuli otetaan nyt käyttöön `import`-lauseella, suoritetaan automaattisesti myös moduulissa funktioiden ulkopuolella oleva koodi:

```python
import sanat

mjono = "Vesihiisi sihisi hississä"

print(sanat.eka_sana(mjono))
print(sanat.vika_sana(mjono))
print(sanat.sanojen_maara(mjono))
```

<sample-output>

Tämä
toinen
5
Vesihiisi
hississä
3

</sample-output>

Tämä ei ole hyvä, koska moduulin käyttäjän ohjelmaa sotkee moduulissa oleva testitulostus.

Pythonista löytyy onneksi ratkaisu pulmaan. Ohjelmassa on mahdollista testata, suoritetaanko ohjelmaa itseään vai onko ohjelma otettu käyttöön moduulina `import`-lauseella. Tämä onnistuu muuttujan `__name__` avulla. Python tallentaa muuttujaan tiedon suoritettavasta ohjelmasta: jos ohjelmaa suoritetaan sellaisenaan, muuttujan arvo on merkkijono `__main__`. Jos ohjelma on tuotu osaksi jotain toista ohjelmaa, muuttujan arvona on suoritettavan ohjelman nimi (eli tässä tapauksessa `sanat`).

Moduuliin voidaan siis lisätä edellistä tietoa hyödyntäen ehtolause, joka avulla testikoodi suoritetaan ainoastaan silloin, kun ohjelma ajetaan omana itsenään eikä toisen ohjelman osaksi tuotuna:

```python
def eka_sana(mjono: str) -> str:
    osat = mjono.split(" ")
    return osat[0]

def vika_sana(mjono: str) -> str:
    osat = mjono.split(" ")
    return osat[-1]

def sanojen_maara(mjono: str) -> int:
    osat = mjono.split(" ")
    return len(osat)

if __name__ == "__main__":
    # Testataan funktioiden toimintaa
    print(eka_sana("Tämä on testi"))
    print(vika_sana("Tämä on testeistä toinen"))
    print(sanojen_lkm("Yks kaks kolme neljä viisi"))
```

Nyt moduulin itsensä suorittaminen suorittaa testikutsut:

<sample-output>

Tämä
toinen
5

</sample-output>

Kun moduuli sen sijaan tuodaan osaksi jotain muuta ohjelmaa, testejä ei suoriteta:

```python
import sanat

mjono = "Vesihiisi sihisi hississä"

print(sanat.eka_sana(mjono))
print(sanat.vika_sana(mjono))
print(sanat.sanojen_maara(mjono))
```

<sample-output>

Vesihiisi
hississä
3

</sample-output>


<quiz id="325baaca-2cae-540e-9f8f-948a567ef88f"></quiz>
