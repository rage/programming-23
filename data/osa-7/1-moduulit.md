---
path: '/osa-7/1-moduulit'
title: 'Moduulit'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Ohjelmointikielissä on usein toteutettu monia yleisesti tarvittavia operaatioita valmiiksi. Sen sijaan, että ohjelmoijan pitäisi toteuttaa kaikki toiminnallisuus alusta loppuun itse, hän voi hyödyntää valmiita kirjastoja omissa ohjelmissaan.

Tämän osion suoritettuasi

- Tiedät, mikä on moduuli
- Osaat ottaa käyttöön moduulin `import`-lauseella

</text-box>

TODO: Tässä on kyllä nyt ongelmana, että kurssilla ollaan puhuttu vain funktioista vaikka moduulissa voi olla muutakin (kuten luokkia)

Python-kielen ytimessä on joukko usein käytettyjä funktioita, kuten `print`, `int` ja `range`. Nämä funktiot ovat käytettävissä suoraan kaikissa Python-ohjelmissa.

Tämän lisäksi Pythonissa on laaja standardikirjasto, joka muodostuu moduuleista. Jokaisessa moduulissa on tiettyyn aiheeseen liittyviä funktioita. Tutustumme tässä osassa joihinkin hyödyllisiin moduuleihin.

## Moduulin käyttäminen

Komento `import` ottaa käyttöön halutun moduulin. Tarkastellaan esimerkkinä moduulia `math`, jossa on matemaattisia funktioita. Seuraava koodi laskee luvun neliöjuuren funktiolla `sqrt` ja logaritmin funktiolla `log`

```python
import math

# luvun 5 neliöjuuri
print(math.sqrt(5))
# luvun 8 logaritmi (2-kantainen)
print(math.log(8,2))
```

<sample-output>

2.23606797749979
3.0

</sample-output>

Koska funktiot ovat moduulissa `math`, viittaamme niihin koodissa nimillä `math.sqrt` ja `math.log`.

## Moduulin osien valinta

Toinen tapa käyttää moduulia on valita sieltä mukaan `from`-komennolla tiettyjä osia, joita haluamme käyttää. Esimerkiksi seuraava koodi ottaa käyttöön funktiot `sqrt` ja `log` moduulista `math`:

```python
from math import sqrt, log

print(sqrt(5))
print(log(5,2))
```

Tämän tavan etuna on, että voimme käyttää funktioita suoraan ilman `math`-etuliitettä.

Voimme myös ottaa suoraan käytettäväksi _kaiken_ moduulin sisällön tähden avulla:

```python
from math import *

print(sqrt(5))
print(log(5,2))
```

Tämä tapa voi olla kätevä testailussa ja pienissä ohjelmissa, mutta siinä on omat ongelmansa, kuten näemme myöhemmin.

## Moduulin sisältö

Pythonin dokumentaatio kertoo jokaisesta standardikirjaston moduulista, mitä moduuli sisältää ja kuinka sitä käytetään. Esimerkiksi moduulin `math` dokumentaatio on tässä:

* https://docs.python.org/3/library/math.html

Voimme myös tutkia funktion `dir` avulla moduulin sisältöä:

```python
import math

print(dir(math))
```

Funktio antaa listan nimistä, jotka moduuli määrittelee:

<sample-output>

['__doc__', '__name__', '__package__', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'hypot', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'modf', 'pi', 'pow', 'radians', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc']

</sample-output>
