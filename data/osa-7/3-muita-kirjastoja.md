---
path: '/osa-7/3-muita-kirjastoja'
title: 'Esimerkkejä muista kirjastoista'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Edellä esitettyjen kirjastojen lisäksi Pythonin mukana tulee lukuisia muita hyödyllisiä kirjastoja. Tutustutaan vielä muutamaan ja tarkastellaan samalla Pythonin dokumentaatiota vähän tarkemmin.

Tämän osion suoritettuasi:

- Tunnet eräitä tärkeitä Pythonin mukana tulevia kirjastoja
- Osaat hyödyntää kirjastoja Pythonin dokumentaation avulla

</text-box>

Pythonin mukana tulee paljon valmiita kirjastoja. Lähes loputtomasti lisää löytää helposti Googlella. Kaikkea ei siis voi opetella ulkoa, eikä siihen ole onneksi tarvettakaan - tiedon haku kuuluu olennaisena osana ohjelmoijan työkalupakettiin. Googlen lisäksi tietoa kannattaa etsiä [Pythonin omasta dokumentaatiosta](https://docs.python.org/3/library/), erityisesti Pythonin perusasennukseen kuuluvia kirjastoja käytettäessä.

Tarkastellaan vielä esimerkkinä muutamaa peruskäytössä hyödyllistä kirjastoa ja opetellaan samalla lukemaan Pythonin dokumentaatiota.

## Matemaattiset perusoperaatiot: kirjasto math

Peruslaskutoimituksia varten Pythonin mukana tulee kirjasto `math`. Kirjastosta löytyy operaatioita yleisimpiin matemaattisiin operaatioihin.

Avataan aluksi [kirjaston dokumentaatiosivu](https://docs.python.org/3/library/math.html). Alla olevassa ruudunkaappauksessa (2.4.2020) näkyy pieni osa sivua:

<img src="7_3_1.png">

Pythonin kirjastojen dokumenttisivuilla on kaikilla yleensä sama rakenne: niissä on esitelty kirjaston sisältämät funktiot ja kerrottu niiden toiminnasta. Usein mukana on myös yksinkertaisia koodiesimerkkejä.

Jos kirjasto on ennestään tuttu, muttet muista etsimäsi funktion nimeä, nopea tapa listata kirjaston sisältämät operaatiot on käyttää Pythonin komentoa `dir <kirjasto>`. Funktio palauttaa kirjaston sisältämät operaatiot listana - usein sitä onkin järkevintä käyttää komentoriviltä ohjelman sijasta:

```python

>>> import math
>>> dir(math)

```

<sample-output>

['__doc__', '__loader__', '__name__', '__package__', '__spec__', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'gcd', 'hypot', 'inf', 'isclose', 'isfinite', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'modf', 'nan', 'pi', 'pow', 'radians', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'tau', 'trunc']

</sample-output>

Myös useimmat editorit tarjoavat avusteena listan modulin sisältämistä operaatioista. Esimerkiksi Visual Studio Code tarjoaa operaatioita valittavaksi, kunhan kirjasto `math` on otettu käyttöön `import`-lauseella ohjelman alussa:

<img src="7_3_2.png">

Esimerkkifunktio laskee pallon pinta-alan annetun säteen perusteella:

```python

from math import pi

def pallon_pinta_ala(säde: float) -> float:
    return 4 * pi * säde ** 2


```

## Merkkijonoapuvälineitä: kirjasto string

Kirjasto [string]("https://docs.python.org/3/library/string.html) sisältää hyödyllisiä vakioarvoja ja työkaluja merkkijonojen käsittelyyn.

Alla olevassa esimerkissä on toteutettu funktio, joka laskee välimerkkien määrän merkkijonosta:

```python

from string import punctuation

def välimerkkejä(mjono: str) -> int:
    n = 0
    for merkki in mjono:
        if merkki in punctuation:
            n += 1
    return n

```

Lause `n += 1` vastaa lausetta `n = n + 1`. Samalla tavalla esimerkiksi lause `a *= 5` vastaa lausetta `a = a * 5`.


# Verkkosivun sisällön lukeminen: kirjastot urllib.request ja webbrowser

Python tarjoaa helpon tavan verkkosivun sisällön lukemiseen kirjaston [urllib.request](https://docs.python.org/3/library/urllib.request.html) avulla.

Esimerkki lukee verkkosivun `www.example.com` sisällön ja tallentaa sen tiedostoon `example.html`:

```python

from urllib.request import urlopen

with urlopen("http://www.example.com") as url, open("example.html","w") as tiedosto:
    # luetaan sivun sisältö
    data = url.read()

    # muunnetaan tavumuotoinen data
    # merkkijonoksi ennen kirjoittamista
    tiedosto.write(str(data))

```

Ohjelman suorittaminen omalla koneella saattaa vaatia esimerkiksi palomuurin avaamista Python-tulkille. Älä tee muutoksia koneesi verkkoasetuksiin, jos et tiedä mitä olet tekemässä.

Huomaa, että `with`-lauseelle voidaan antaa useampi avattava resurssi yhtäaikaa. Esimerkkiohjelmassa avataan sekä yhteys verkkosivuun että tiedosto kirjoittamista varten.

Verkkosivuihin luotava yhteys mahdollistaa vain tiedon lukemisen, tiedon kirjoittamista verko yli ei käsitellä tällä kurssilla.

Verkossa olevat sivut on usein kirjoitettu HTML-merkkauskielellä. Metodi `read` palauttaa siis HTML-kielisen tiedoston. HTML-kielen käsittelyä varten Pythonista löytyy kirjasto [html.parser](https://docs.python.org/3/library/html.parser.html).

Verkkosivun voi avata ulkoiseen selaimeen kirjaston [webbrowser](https://docs.python.org/3/library/webbrowser.html?highlight=webbrowser#module-webbrowser) avulla. Esimerkiksi

```python

import webbrowser

# Avataan sivu python.org
webbrowser.open("https://www.python.org")

```

Huomaa, että metodi `open` pyytää oletusselainta avaamaan kyseisen sivun, muttei avaa pääsyä sivun sisältöön Python-ohjelmalle. Kirjasto on kuitenkin kätevä esimerkiksi silloin, jos vaikka haluat avata ohjelman ohjesivun verkosta.

## Ulkoiset kirjastot

Pythonin mukana tulevien kirjastojen lisäksi verkosta löytyy lukuisia vapaasti käytettäviä kirjastoja eri tarpeisiin.

Pythonin dokumentaatioon on koottu lista joistakin yleisesti käytetyistä kirjastoista eri tarpeisiin:

<https://wiki.python.org/moin/UsefulModules>

