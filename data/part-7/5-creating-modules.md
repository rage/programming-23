---
path: '/part-7/5-creating-modules'
title: 'Creating your own modules'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Osaat luoda oman moduulin
- Tiedät, mitä Pythonin muuttuja `__name__` ja sen arvo `__main__` merkitsevät

</text-box>

Omien moduulien tekeminen on helppoa Pythonissa, koska mikä tahansa Python-koodia sisältävä tiedosto voi toimia moduulina. Tarkastellaan esimerkkinä seuraavaa tiedostoa `sanat.py`:

```python
def eka_sana(my_string: str):
    osat = my_string.split(" ")
    return osat[0]

def vika_sana(my_string: str):
    osat = my_string.split(" ")
    return osat[-1]

def sanojen_maara(my_string: str):
    osat = my_string.split(" ")
    return len(osat)
```

Voimme käyttää tässä tiedostossa olevia funktioita toisessa tiedostossa seuraavasti:

```python
import sanat

my_string = "Vesihiisi sihisi hississä"

print(sanat.eka_sana(my_string))
print(sanat.vika_sana(my_string))
print(sanat.sanojen_maara(my_string))
```

<sample-output>

Vesihiisi
hississä
3

</sample-output>

Huomaa, että moduulin kooditiedoston pitää sijaita joko samassa hakemistossa ohjelman kanssa tai jossakin Pythonin oletushakemistossa, jotta sen voi ottaa käyttöön `import`-komennolla.

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
def eka_sana(my_string: str):
    osat = my_string.split(" ")
    return osat[0]

def vika_sana(my_string: str):
    osat = my_string.split(" ")
    return osat[-1]

def sanojen_maara(my_string: str):
    osat = my_string.split(" ")
    return len(osat)

print(eka_sana("Tämä on testi"))
print(vika_sana("Tämä on testeistä toinen"))
print(sanojen_maara("Yks kaks kolme neljä viisi"))
```

Kun moduuli otetaan nyt käyttöön `import`-lauseella, suoritetaan automaattisesti myös moduulissa funktioiden ulkopuolella oleva koodi:

```python
import sanat

my_string = "Vesihiisi sihisi hississä"

print(sanat.eka_sana(my_string))
print(sanat.vika_sana(my_string))
print(sanat.sanojen_maara(my_string))
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

Moduuliin voidaan siis lisätä edellistä tietoa hyödyntäen ehtolause, jonka avulla testikoodi suoritetaan ainoastaan silloin, kun ohjelma ajetaan omana itsenään eikä toisen ohjelman osaksi tuotuna:

```python
def eka_sana(my_string: str) -> str:
    osat = my_string.split(" ")
    return osat[0]

def vika_sana(my_string: str) -> str:
    osat = my_string.split(" ")
    return osat[-1]

def sanojen_maara(my_string: str) -> int:
    osat = my_string.split(" ")
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

my_string = "Vesihiisi sihisi hississä"

print(sanat.eka_sana(my_string))
print(sanat.vika_sana(my_string))
print(sanat.sanojen_maara(my_string))
```

<sample-output>

Vesihiisi
hississä
3

</sample-output>

<programming-exercise name='String helper' tmcname='part07-17_string_helper'>

Please write a module named `string_helper`, which contains the following functions:

The function `change_case(orig_string: str)` creates and returns a new version of the parameter string. The lowercase letters in the original should be uppercase, and uppercase letters should be lowercase.

The function `split_in_half(orig_string: str` splits the parameter string in half, and returns the results in a tuple. If the original has an odd number of characters, the first half should be shorter.

The function `remove_special_characters(orig_string: str)` returns a new version of the parameter string, with all special characters removed. Only lowercase and uppercase letters, numbers and spaces are allowed in the returned string.

Some examples of how the module would be used:

```python
import string_helper

my_string = "Well hello there!"

print(string_helper.change_case(my_string))

p1, p2 = string_helper.split_in_half(my_string)

print(p1)
print(p2)

m2 = string_helper.remove_special_characters("This is a test, lets see how it goes!!!11!")
print(m2)
```

<sample-output>

wELL HELLO THERE!
Well hel
lo there!
This is a test lets see how it goes11

</sample-output>

</programming-exercise>

<!---
<quiz id="2203412c-628c-54a3-bd77-edebd5ce4f67"></quiz>
-->

Please respond to a quick questionnaire on this week's materials. 

<quiz id="5f783cb4-d322-536a-abe5-fdb6da6a8395"></quiz>
