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

Funktio `map` suorittaa annetun operaation kaikille annetun iteroitavan sarjan alkioille. Niinpä `map` muistuttaa koostetta monessa mielessä, syntaksi tosin näyttää erilaiselta.

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


<programming-exercise name='Suoritukset' tmcname='osa12-11_suoritukset'>

Tehtäväpohjassa on mukana kurssisuoritusta kuvaava luokkaa `Suoritus`, jota toimii seuraavasti:

```python
suoritus = Suoritus("Pekka Python", "Ohjelmoinnin perusteet", 5)
print(suoritus.opiskelijan_nimi)
print(suoritus.kurssi)
print(suoritus.arvosana)
print(suoritus)
```

<sample-output>

Pekka Python
Ohjelmoinnin perusteet
5
Pekka Pyrhon, arvosana kurssilta Ohjelmoinnin perusteet 5

</sample-output>

## Suorittajat

Tee funktio `suorittajien_nimet(suoritukset: list)` joka saa parametriksi listan suoritus-oliota. Funktio palauttaa listan, miltä löytyy suorittajien nimet.

```python
s1 = Suoritus("Pekka Python", "Ohjelmoinnin perusteet", 3)
s2 = Suoritus("Olivia Ohjelmoija", "Ohjelmoinnin perusteet", 5)
s3 = Suoritus("Pekka Python", "Ohjelmoinnin jatkokurssi", 2)

for nimi in suorittajien_nimet([s1, s2, s3]):
    print(nimi)
```

<sample-output>

Pekka Python
Olivia Ohjelmoija
Pekka Python

</sample-output>

Toteuta funktio käyttäen `map`-funktiota!

## Kurssit

Tee funktio `kurssien_nimet(suoritukset: list)` joka saa parametriksi listan suoritus-oliota. Funkito palauttaa listan, miltä löytyy suorituksessa olevien kurssien nimet aakkosjärjestyksessä. Kukin kurssi esiintyy listalla vain kerran.

```python
s1 = Suoritus("Pekka Python", "Ohjelmoinnin perusteet", 3)
s2 = Suoritus("Olivia Ohjelmoija", "Ohjelmoinnin perusteet", 5)
s3 = Suoritus("Pekka Python", "Ohjelmoinnin jatkokurssi", 2)

for nimi in kurssien_nimet([s1, s2, s3]):
    print(nimi)
```
<sample-output>

Ohjelmoinnin jatkokurssi
Ohjelmoinnin perusteet

</sample-output>

Hyödynnä funkton toteutuksessa `map`-funktiota. Se ei tosin yksistään riitä, joten tarvitset muutakin...

</programming-exercise>

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

<programming-exercise name='Rajatut suoritukset' tmcname='osa12-12_rajatut_suoritukset'>

Tässä tehtävässä jatketaan luokan `Suoritus` käyttämistä

## Hyväksytyt suoritukset

Tee funktio `hyvaksytyt(suoritukset: list)` joka saa parametriksi listan suoritus-oliota. Funktio palauttaa listan, miltä löytyy suorituksista ne, joiden arvosana on vähintään 1.

```python
s1 = Suoritus("Pekka Python", "Ohjelmoinnin perusteet", 3)
s2 = Suoritus("Olivia Ohjelmoija", "Ohjelmoinnin perusteet", 5)
s3 = Suoritus("Pekka Python", "Ohjelmoinnin jatkokurssi", 0)

for suoritus in hyvaksytyt([s1, s2, s3]):
    print(suoritus)
```

<sample-output>

Pekka Pyrhon, arvosana kurssilta Ohjelmoinnin perusteet 3
Olivia Ohjelmoija arvosana kurssilta Ohjelmoinnin perusteet 5

</sample-output>

Toteuta funktio käyttäen `filter`-funktiota!

## Arvosanan suoritukset

Tee funktio `suoritus_arvosanalla(suoritukset: list, arvosana: int)` joka saa parametriksi listan suoritus-oliota sekä kokonaisluvun. Funkito palauttaa listan, miltä löytyy suorituksista ne, joiden arvosana on sama kuin toisen parametrin arvo.

```python
s1 = Suoritus("Pekka Python", "Ohjelmoinnin perusteet", 3)
s2 = Suoritus("Olivia Ohjelmoija", "Ohjelmoinnin perusteet", 5)
s3 = Suoritus("Pekka Python", "Tietoliikenteen perusteet", 3)
s4 = Suoritus("Olivia Ohjelmoija", "Johdatus yliopistomatematiikkaan", 3)

for suoritus in suoritus_arvosanalla([s1, s2, s3, s4]):
    print(suoritus)
```

<sample-output>

Pekka Python, arvosana kurssilta Ohjelmoinnin perusteet 3
Pekka Python, arvosana kurssilta Tietoliikenteen perusteet 3
Olivia Ohjelmoija, arvosana kurssilta Johdatus yliopistomatematiikkaan 3

</sample-output>

Toteuta funktio käyttäen `filter`-funktiota!

## Kurssin suorittajat

Tee funktio `kurssin_suorittajat(suoritukset: list, kurssi: str)` joka saa parametriksi listan suoritus-oliota sekä kurssin nimen. Funktio palauttaa niiden opiskelijoiden nimet, jotka ovat suorittaneet parametrina olevan kurssin arvosanalla joka on suurempi kuin nolla.

```python
s1 = Suoritus("Pekka Python", "Ohjelmoinnin perusteet", 3)
s2 = Suoritus("Olivia Ohjelmoija", "Tietoliikenteen perusteet", 5)
s3 = Suoritus("Pekka Python", "Tietoliikenteen perusteet", 0)
s4 = Suoritus("Niilo Nörtti", "Tietoliikenteen perusteet", 3)

for suoritus in kurssin_suorittajat([s1, s2, s3, s4], "Tietoliikenteen perusteet"):
    print(suoritus)
```

<sample-output>

Olivia Ohjelmoija
Niilo Nörtti

</sample-output>

Toteuta funktio käyttäen funktioita `filter`- ja `map`.

</programming-exercise>

## reduce

Viimeinen tarkastelemamme funktio on `reduce`. Niinkuin funktion nimi vihjaa, sen tarkoituksena on vähentää sarjan alkioiden määrä. Itse asiassa alkioiden sijasta `reduce` palauttaa yksittäisen arvon.

Ideana on, että aluksi annettu operaatio suoritetan kahdelle ensimmäiselle alkiolle. Sen jälkeen tämän tuloksena syntyneelle alkiolle ja kolmannelle alkiolle suoritetaan sama operaatio ja niin edelleen. Funktio siis yhdistää kaikki alkiot toisiinsa annetun operaation avulla.

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

<programming-exercise name='Opintopisteet' tmcname='osa12-13_opintopisteet'>

Tarkastellaan tässä tehtävässä hieman erilaista versiota luokasta `Suoritus`. Tällä kertaa se kuvastaa ainoastaan yksittäisen opiskelijan kurssisuorituksia. Luokka toimii seuraavasti:


```python
suoritus = Suoritus("Tietorakenteet ja algoritmit", 3, 10)
print(suoritus)
print(suoritus.kurssi)
print(suoritus.opintopisteet)
print(suoritus.arvosana)
```

<sample-output>

Tietorakenteet ja algoritmit (10 op) arvosana 3
Tietorakenteet ja algoritmit
10
3

</sample-output>

## Opintopistemäärä

Toteuta funktio `kaikkien_opintopisteiden_summa`, joka saa parametriksi listan suorituksia ja laskee suoritusten yhteenlasketun opintopistemäärän. Funktio toimii seuraavasti

```python
s1 = Suoritus("Ohjelmoinnin perusteet", 5, 5)
s2 = Suoritus("Ohjelmoinnin jatkokutssi", 4, 5)
s3 = Suoritus("Tietorakenteet ja algoritmit", 3, 10)
summa = kaikkien_opintopisteiden_summa([s1, s2, s3])
```

<sample-output>

20

</sample-output>

Toteuta funktio käyttäen `reduce`-funktiota!

## Hyväksyttyjen opintopistemäärä

Toteuta funktio `hyvaksyttyjen_opintopisteiden_summa`, joka saa parametriksi listan suorituksia ja laskee arvosanan 1 tai parempien omaavien suoritusten yhteenlasketun opintopistemäärän. Funktio toimii seuraavasti

```python
s1 = Suoritus("Ohjelmoinnin perusteet", 5, 5)
s2 = Suoritus("Ohjelmoinnin jatkokutssi", 4, 0)
s3 = Suoritus("Tietorakenteet ja algoritmit", 3, 10)
summa = hyvaksyttyjen_opintopisteiden_summa([s1, s2, s3])
```

<sample-output>

15

</sample-output>

Toteuta funktio käyttäen `reduce`- ja `filter`-funktiota!

## Hyväksyttyjen suoritusten keskiarvo

Toteuta funktio `keskiarvo`, joka saa parametriksi listan suorituksia ja laskee arvosanan 1 tai parempien omaavien suoritusten arvosanojen keskiarvon. Funktio toimii seuraavasti

```python
s1 = Suoritus("Ohjelmoinnin perusteet", 5, 5)
s2 = Suoritus("Ohjelmoinnin jatkokutssi", 4, 0)
s3 = Suoritus("Tietorakenteet ja algoritmit", 3, 10)
summa = keskiarvo([s1, s2, s3])
```

<sample-output>

4.0

</sample-output>

Hyödynnä funktion toteutuksessa `reduce`- ja `filter`-funktiota!


</programming-exercise>
