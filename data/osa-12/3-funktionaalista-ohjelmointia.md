---
path: '/osa-12/3-funktionaalista-ohjelmointia'
title: 'Funktionaalista ohjelmointia'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät mitä tarkoitetaan funktonaalisella ohjelmoinilla
- Osaat hyödyntää operaatioita map, reduce ja filter omissa ohjelmissasi

</text-box>

Funktionaalisella ohjelmoinnilla tarkoitetaan _ohjelmointiparadigmaa_, jossa vältetään tilan muutoksia mahdollisimman pitkälle. Muuttujien sijasta ohjelman suoritus perustuu funktionaalisessa ohjelmoinnissa mahdollisimman pitkälti funktioiden keskinäisiin kutsuihin.

Aikaisemmin esitetyt lambda-lausekkeet ja listakoosteet ovat esimerkkejä funktionaalisesta ohjelmointityylistä, koska niitä käyttämällä voidaan välttää ohjelman tilan muutokset - esimerkiksi lambda-lausekkeella voimme luoda funktion ilman että viittausta siihen tallennetaan mihinkään.

Funktionaalinen ohjelmointi on esimerkki ohjelmointiparadigmasta eli ohjelmointityylistä. Muita tyypillisiä ja kurssilla jo aiemmin käsiteltyjä paradigmoja ovat esimerkiksi

* imperatiivinen paradigma, joka perustuu peräkkäisiin komentoihin ja niiden suorittamiseen järjestyksessä
* proseduraalinen paradigma, jossa ohjelma jaetaan pienempiin aliohjelmiin. Imperatiivinen ja proseduraalinen paradigma tarkoittavat joidenkin määrittelyjen mukaan samaa asiaa.
* olio-ohjelmointi, jossa ohjelma ja sen tila mallinnetaan luokista muodostettujen olioiden avulla.

Pythonin monipuolisuus tulee hyvin esille siinä, että voimme hyödyntää siinä useita eri paradigmoja - jopa samoissa ohjelmissa. Näin voimme hyödyntää tehokkainta ja selkeintä tapaa ongelmien ratkaisemiseksi.

Tarkastellaan vielä muutamaan funktionaalisen ohjelmoinnin työkalua Pythonissa.

## map

Funktio `map` suorittaa annetun operaation kaikille annetun iteroitavan sarjan alkioille. Niinpä `map` muistuttaa koostetta monessa mielessä, syntaki tosin näyttää erilaiselta.

Tarkastellaan esimerkkinä funktiokutsua, joka muuttaa merkkijonot kokonaisluvuiksi:

```python
mjonolista = ["123","-10", "23", "98", "0", "-110"]

luvut = map(lambda x : int(x), mjonolista)

print(luvut)

for luku in luvut:
    print(luku)
```

<sample-output>

<map object at 0x0000021A4BFA9A90>
123
-10
23
98
0
-110

</sample-output>

Funktion `map` yleinen syntaksi on siis

`map(<funktio, jota alkioille kutsutaan>, <sarja, jonka alkioille funktiota kutsutaan>)`

Funktio palauttaa map-tyyppisen objektin, jonka voi joko iteroida läpi for-lauseella tai esimerkiksi muuttaa listaksi `list`-funktiolla:

```python
def alkukirjain_isoksi(mjono: str):
    alku = mjono[0]
    alku = alku.upper()
    return alku + mjono[1:]

testilista = ["eka", "toka", "kolmas", "neljäs"]

valmiit = map(alkukirjain_isoksi, testilista)

valmiit_lista = list(valmiit)
print(valmiit_lista)
```

<sample-output>

['Eka', 'Toka', 'Kolmas', 'Neljäs']

</sample-output>

Kuten esimerkistä huomataan, map-funktiossa voi tietysti käyttää lambda-lausekkeella luodun funktion lisäksi myös `def`-avainsanalla aiemmin määriteltyä nimettyä funktiota.

Edellinen esimerkki voitaisiin toteuttaa myös vaikkapa listakoosteen avulla, esimerkiksi:

```python
def alkukirjain_isoksi(mjono: str):
    alku = mjono[0]
    alku = alku.upper()
    return alku + mjono[1:]

testilista = ["eka", "toka", "kolmas", "neljäs"]


valmiit_lista = [alkukirjain_isoksi(alkio) for alkio in testilista]
print(valmiit_lista)
```

...tai esimerkiksi iteroimalla lista läpi for-lauseella ja tallentamalla käsitellyt alkiot uuteen listaan `append`-metodilla. Onkin tyypillistä, että saman asian voi toteuttaa usealla eri tavalla. Eri vaihtoehtojen tunteminen auttaa valitsemaan niistä ohjelmaan (ja omaan makuun) parhaiten sopivan.

## filter

Funktio `filter` muistuttaa funktiota `map`, mutta nimensä mukaisesti se ei poimi kaikkia alkioita lähteestä, vaan ainoastaan ne, joille annettu funktio palauttaa arvon True.

Tarkastellaan taas ensin esimerkkiä funktion käytöstä:

```python
luvut = [1, 2, 3, 5, 6, 4, 9, 10, 14, 15]

parilliset = filter(lambda luku: luku % 2 == 0, luvut)

for luku in parilliset:
    print(luku)
```

<sample-output>

2
6
4
10
14

</sample-output>

Sama esimerkki voitaisiin kirjoittaa ilman lambda-lauseketta määrittelemällä funktio `def`-avainsanalla:

```python
def onko_parillinen(luku: int):
    if luku % 2 == 0:
        return True
    return False

luvut = [1, 2, 3, 5, 6, 4, 9, 10, 14, 15]

parilliset = filter(onko_parillinen, luvut)

for luku in parilliset:
    print(luku)
```

Toiminnallisuuden kannalta ohjelmat ovat täysin yhtäläiset. Onkin mielipidekysymys kumpaa pitää selkeämpänä.

Tarkastellaan vielä toista esimerkkiä suodattamisesta. Ohjelmassa poimitaan kalalistasta ainoastaan ne kalat, jotka ovat vähintään 1000 gramman painoisia:

```python
class Kala:
    """ Luokka mallintaa tietynpainoista kalaa """
    def __init__(self, laji: str, paino: int):
        self.laji = laji
        self.paino = paino

    def __repr__(self):
        return f"{self.laji} ({self.paino} g.)"

if __name__ == "__main__":
    k1 = Kala("Hauki", 1870)
    k2 = Kala("Ahven", 763)
    k3 = Kala("Hauki", 3410)
    k4 = Kala("Turska", 2449)
    k5 = Kala("Särki", 210)

    kalat = [k1, k2, k3, k4, k5]

    ylikiloiset = filter(lambda kala : kala.paino >= 1000, kalat)

    for kala in ylikiloiset:
        print(kala)
```

<sample-output>

Hauki (1870 g.)
Hauki (3410 g.)
Turska (2449 g.)

</sample-output>

Taas kerran sama voitaisiin toteuttaa listakoosteena:

```python
ylikiloiset = [kala for kala in kalat if kala.paino >= 1000]
```

## reduce

Viimeinen tarkastelemamme funktio on `reduce`. Niinkuin funktion nimi vihjaa, sen tarkoituksena on vähentää sarjan alkioiden määrä. Itse asiassa alkioiden sijasta `reduce` palauttaa yksittäisen arvon.

Ideana on, että aluksi annettu operaatio suoritetan kahdelle ensimmäiselle alkiolle. Sen jälken tämän tuloksena syntyneelle alkiolle ja kolmannelle alkiolle suoritetaan sama operaatio ja niin edelleen. Funktio siis yhdistää kaikki alkiot toisiinsa annetun operaation avulla.

Ensimmäinen esimerkkimme laskee kaikkien listassa olevien kokonaislukujen tulon. Huomaa, että Pythonin versiosta 3 alkaen funktio `reduce` pitää erikseen ottaa käyttöön modulista `functools`.

```python
from functools import reduce

lista = [2, 2, 4, 3, 5, 2]

tulo = reduce(lambda x, y: x * y, lista)

print(tulo)
```

<sample-output>

240

</sample-output>

Ohjelma laskee aluksi kertolaskun 2 * 2 = 4, sen jälkeen kertolaskun 4 * 4 = 16, sitten 16 * 3 = 48 ja niin edelleen. Nimensä mukaisesti funktio siis pienentää listaa alkio kerrallaan kunnes jäljellä on enää yksi arvo:

KUVA

Toinen esimerkki yhdistelee merkkijonoja. Merkkijonojen väliin poimittava sana haetaan generaattorilta, joka palauttaa ikuisesti sanoja listalta "ja", "sekä", "ynnä" ja "ja lisäksi".

```python
from functools import reduce

def konjuktiot():
    klista = ["ja", "sekä", "ynnä", "ja lisäksi"]
    indeksi = 0
    while True:
        yield " " + klista[indeksi] + " "
        indeksi += 1
        # Jos päästiin listan loppuun...
        if indeksi == len(klista):
            # ...niin aloitetaan alusta
            indeksi = 0

if __name__ == "__main__":
    konjuktiogeneraattori = konjuktiot()

    sanat = ["Aku", "Mikki", "Tupu", "Hupu", "Lupu", "Tiku", "Taku", "Iines"]
    yhdistetty = reduce(lambda x, y : x + next(konjuktiogeneraattori) + y, sanat)

    print(yhdistetty)
```

<sample-output>

Aku ja Mikki sekä Tupu ynnä Hupu ja lisäksi Lupu ja Tiku sekä Taku ynnä Iines

</sample-output>
