---
path: '/part-12/3-functional-programming'
title: 'Functional programming'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

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

Tarkastellaan vielä muutamaa funktionaalisen ohjelmoinnin työkalua Pythonissa.

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

Kannattaa huomata, että `map`-funktion palauttama lopputulos ei ole lista, vaan _iteraattori_-olio ja vaikka se käyttäytyykin listan tapaan monissa tilanteissa, niin näin ei ole aina.

Tarkastellaan seuraavaa esimerkkiä:

```python
def alkukirjain_isoksi(mjono: str):
    alku = mjono[0]
    alku = alku.upper()
    return alku + mjono[1:]

testilista = ["eka", "toka", "kolmas", "neljäs"]

# talletetaan map-funktion tulos
valmiit = map(alkukirjain_isoksi, testilista)

for sana in valmiit:
  print(sana)

print("sama uusiksi:")
for sana in valmiit:
  print(sana)
```

Tulostus on seuraava:

<sample-output>

Eka
Toka
Kolmas
Neljäs
sama uusiksi:

</sample-output>

Eli kun `map`-funktion tuloksena olevat nimet yritetään tulostaa toiseen kertaan, ei tulostu mitään. Syynä tälle on se, läpikäynti `for`-lauseella käy iteroottorin oliot jo läpi, ja kun samaa yritetään toistamiseenn, ei ole enää mitään läpikäytävää!

Jos ohjelma haluaa tarkastella `map`-funktion tulosta useampaan kertaan, tulee tulos esimerkiksi muuttaa listaksi antamalla se parametriksi `list`-konstruktorille:

```python
testilista = ["eka", "toka", "kolmas", "neljäs"]

# muutetaan map-funktion palauttama iteraattori listaksi
valmiit = list(map(alkukirjain_isoksi, testilista))

for sana in valmiit:
  print(sana)

print("sama uusiksi:")
for sana in valmiit:
  print(sana)
```

<sample-output>

Eka
Toka
Kolmas
Neljäs
sama uusiksi:
Eka
Toka
Kolmas
Neljäs

</sample-output>

## map ja oliot

Funktiolla `map` voidaan toki käsitellä myös omien luokkien olioita. Asiaan ei liity mitään tavanomaisesta poikkeavaa. Tarkastellaan seuraavaa esimerkkiä

```python
class Pankkitili:
    def __init__(self, numero: str, nimi: str, saldo: float):
        self.__numero = numero
        self.nimi = nimi
        self.__saldo = saldo

    def lisaa_rahaa(self, rahasumma: float):
        if rahasumma > 0:
            self.__saldo += rahasumma

    def hae_saldo(self):
        return self.__saldo

t1 = Pankkitili("123456", "Reijo Rahakas", 5000)
t2 = Pankkitili("12321", "Keijo Köyhä ", 1)
t3 = Pankkitili("223344", "Maija Miljonääri ", 1000000)

tilit = [t1, t2, t3]

asiakkaat = map(lambda t: t.nimi, tilit)
for nimi in asiakkaat:
  print(nimi)

saldot = map(lambda t: t.hae_saldo(), tilit)
for saldo in saldot:
  print(saldo)
```

<sample-output>

Reijo Rahakas
Keijo Köyhä
Maija Miljonääri
5000
1
1000000

</sample-output>

Koodissa selvitetään ensin funktion `map` avulla tilien omistajat. Huomaa miten lambda-funktiolla haetaan attribuuttina oleva nimi pankkitiliolioista:

```python
asiakkaat = map(lambda t: t.nimi, tilit)
```

Tämän jälkeen haetaan samalla tyylillä jokaisen pankkitilin saldo. Lambda-funktio on nyt hieman erilainen, sillä saldo saadaan selville kutsumalla pankkitiliolion metodia:

```python
saldot = map(lambda t: t.hae_saldo(), tilit)
```

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
Pekka Python, arvosana kurssilta Ohjelmoinnin perusteet 5

</sample-output>

## Suorittajat

Tee funktio `suorittajien_nimet(suoritukset: list)` joka saa parametriksi listan suoritus-oliota. Funktio palauttaa listan, jolta löytyy suorittajien nimet.

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

Tee funktio `kurssien_nimet(suoritukset: list)` joka saa parametriksi listan suoritus-oliota. Funktto palauttaa listan, jolla on suorituksessa olevien kurssien nimet aakkosjärjestyksessä. Kukin kurssi esiintyy listalla vain kerran.

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

## filter palauttaa iteraattorin

Funktion `map` tapaan, myös funktio `filter` palauttaa listan sijaan _iteraattorin_ ja on tilanteita joissa on syytä olla varuillaan sillä iteraattorin voi käydä läpi vain kerran. Eli seuraava yritys tulostaa suuret kalat kahteen kertaan ei onnistu:

```python
k1 = Kala("Hauki", 1870)
k2 = Kala("Ahven", 763)
k3 = Kala("Hauki", 3410)
k4 = Kala("Turska", 2449)
k5 = Kala("Särki", 210)

kalat = [k1, k2, k3, k4, k5]

ylikiloiset = filter(lambda kala : kala.paino >= 1000, kalat)

for kala in ylikiloiset:
    print(kala)

print("sama uudelleen")

for kala in ylikiloiset:
    print(kala)
```

Tulostuu

<sample-output>

Hauki (1870 g.)
Hauki (3410 g.)
Turska (2449 g.)
sama uudelleen

</sample-output>

Jos funktion `filter` tulosta on tarve käsitellä useaan kertaan, tulee se muuttuaa esimerkiksi listaksi:

```python
kalat = [k1, k2, k3, k4, k5]

# muutetaan tulos listaksi kutsumalla list-konstruktorioa
ylikiloiset = list(filter(lambda kala : kala.paino >= 1000, kalat))
```

<programming-exercise name='Rajatut suoritukset' tmcname='osa12-12_rajatut_suoritukset'>

Tässä tehtävässä jatketaan luokan `Suoritus` käyttämistä

## Hyväksytyt suoritukset

Tee funktio `hyvaksytyt(suoritukset: list)` joka saa parametriksi listan suoritus-oliota. Funktio palauttaa listan, jolta löytyy suorituksista ne, joiden arvosana on vähintään 1.

```python
s1 = Suoritus("Pekka Python", "Ohjelmoinnin perusteet", 3)
s2 = Suoritus("Olivia Ohjelmoija", "Ohjelmoinnin perusteet", 5)
s3 = Suoritus("Pekka Python", "Ohjelmoinnin jatkokurssi", 0)

for suoritus in hyvaksytyt([s1, s2, s3]):
    print(suoritus)
```

<sample-output>

Pekka Python, arvosana kurssilta Ohjelmoinnin perusteet 3
Olivia Ohjelmoija arvosana kurssilta Ohjelmoinnin perusteet 5

</sample-output>

Toteuta funktio käyttäen `filter`-funktiota!

## Arvosanan suoritukset

Tee funktio `suoritus_arvosanalla(suoritukset: list, arvosana: int)` joka saa parametriksi listan suoritus-oliota sekä kokonaisluvun. Funktio palauttaa listan, jolta löytyy suorituksista ne, joiden arvosana on sama kuin toisen parametrin arvo.

```python
s1 = Suoritus("Pekka Python", "Ohjelmoinnin perusteet", 3)
s2 = Suoritus("Olivia Ohjelmoija", "Ohjelmoinnin perusteet", 5)
s3 = Suoritus("Pekka Python", "Tietoliikenteen perusteet", 3)
s4 = Suoritus("Olivia Ohjelmoija", "Johdatus yliopistomatematiikkaan", 3)

for suoritus in suoritus_arvosanalla([s1, s2, s3, s4], 3):
    print(suoritus)
```

<sample-output>

Pekka Python, arvosana kurssilta Ohjelmoinnin perusteet 3
Pekka Python, arvosana kurssilta Tietoliikenteen perusteet 3
Olivia Ohjelmoija, arvosana kurssilta Johdatus yliopistomatematiikkaan 3

</sample-output>

Toteuta funktio käyttäen `filter`-funktiota!

## Kurssin suorittajat

Tee funktio `kurssin_suorittajat(suoritukset: list, kurssi: str)` joka saa parametriksi listan suoritus-oliota sekä kurssin nimen. Funktio palauttaa _aakkosjärjestyksessä_ niiden opiskelijoiden nimet, jotka ovat suorittaneet parametrina olevan kurssin arvosanalla joka on suurempi kuin nolla.

```python
s1 = Suoritus("Pekka Python", "Ohjelmoinnin perusteet", 3)
s2 = Suoritus("Olivia Ohjelmoija", "Tietoliikenteen perusteet", 5)
s3 = Suoritus("Pekka Python", "Tietoliikenteen perusteet", 0)
s4 = Suoritus("Niilo Nörtti", "Tietoliikenteen perusteet", 3)

for suoritus in kurssin_suorittajat([s1, s2, s3, s4], "Tietoliikenteen perusteet"):
    print(suoritus)
```

<sample-output>

Niilo Nörtti
Olivia Ohjelmoija

</sample-output>

Toteuta funktio käyttäen funktioita `filter` ja `map`.

</programming-exercise>

## reduce

Viimeinen tarkastelemamme funktio on `reduce`. Kuten funktion nimi vihjaa, sen tarkoituksena on vähentää sarjan alkioiden määrä. Itse asiassa alkioiden sijasta `reduce` palauttaa yksittäisen arvon.

Reduce toimii sitten, että se pitää mukanaan koko ajan _arvoa_, jota se muuttaa yksi kerrallaan käydessään läpi listan alkioita.

Seuraavassa on esimerkki, joka summaa `reduce`-funktion avulla listan luvut yhteen. Huomaa, että Pythonin versiosta 3 alkaen funktio `reduce` pitää erikseen ottaa käyttöön moduulista `functools`.

```python
from functools import reduce

lista = [2, 3, 1, 5]

lukujen_summa = reduce(lambda summa, alkio: summa + alkio, lista, 0)

print(lukujen_summa)
```

<sample-output>

11

</sample-output>

Tarkastellaan esimerkkiä hieman tarkemmin. Funktio `reduce` saa kolme parametria. Parametreista toisena on läpikäytävä lista, ja kolmantena on laskennan alkuarvo. Koska laskemme listan alkioiden summaa, on sopiva alkuarvo nolla.

Ensimmäisenä parametrina on funktio, joka suorittaa toimenpiteen yksi kerrallaan kullekin listan alkiolle. Tällä kertaa funktio on seuraava:

```python
lambda summa, alkio: summa + alkio
```

Funktiolla on kaksi parametria. Näistä ensimmäinen on laskennan sen hetkinen tulos ja toinen parametri on käsittelyvuorossa oleva listan alkio. Funktio laskee uuden arvon parametriensa perusteella. Tässä tapauksessa uusi arvio on vanha summa _plus_ kyseisen alkion arvo.

Funktion `reduce` toiminta hahmottuu kenties selkeämmin, jos käytetään lambdan sijaan normaalia funktiota apuna ja tehdään funktiosta aputulostuksia:

```python
from functools import reduce

lista = [2, 3, 1, 5]

# reducen apufunktio joka huolehtii yhden alkion arvon lisäämisestä summaan
def summaaja(summa, alkio):
  print(f"summa nyt {summa}, vuorossa alkio {alkio}")
  # uusi summa on vanha summa + alkion arvo
  return summa + alkio

lukujen_summa = reduce(summaaja, lista, 0)

print(lukujen_summa)
```

Ohjelma tulostaa:

<sample-output>

summa nyt 0, vuorossa alkio 2
summa nyt 2, vuorossa alkio 3
summa nyt 5, vuorossa alkio 1
summa nyt 6, vuorossa alkio 5
11

</sample-output>

Ensimmäisenä siis käsitellään listan alkio, jonka arvo on 2. Tässä vaiheessa summa on 0, eli sillä on reducelle annettu alkuarvo. Funktio laskee ja palauttaa näiden summan eli 0 + 2.

Tämä arvo on parametrin `summa` arvona kun funktiota kutsutaan seuraavalle listan alkiolle eli luvulle 3. Funktio laskee ja palauttaa 2 + 3, joka taas toimii parametrina seuraavalle funktiokutsulle.

Toinen esimerkkimme laskee kaikkien listassa olevien kokonaislukujen tulon.

```python
from functools import reduce

lista = [2, 2, 4, 3, 5, 2]

tulo = reduce(lambda tulo, alkio: tulo * alkio, lista, 1)

print(tulo)
```

<sample-output>

480

</sample-output>

Koska on kyse tulosta, ei alkuarvo voi olla nyt 0 (miten käy jos se olisi nolla?), vaan sopiva arvo sille on 1.

Aivan kuten `filter` ja `map`, myös `reduce` voi käsitellä minkä tahansa tyyppisiä olioita.

Tarkastellaan esimerkkinä pankin tilien yhteenlasketun saldon selvittämistä reducella:

```python
class Pankkitili:
    def __init__(self, numero: str, nimi: str, saldo: float):
        self.__numero = numero
        self.nimi = nimi
        self.__saldo = saldo

    def lisaa_rahaa(self, rahasumma: float):
        if rahasumma > 0:
            self.__saldo += rahasumma

    def hae_saldo(self):
        return self.__saldo

t1 = Pankkitili("123456", "Reijo Rahakas", 5000)
t2 = Pankkitili("12321", "Keijo Köyhä ", 1)
t3 = Pankkitili("223344", "Maija Miljonääri ", 1000000)

tilit = [t1, t2, t3]

from functools import reduce

def saldojen_summaaja(yht_saldo, tili):
  return yht_saldo + tili.hae_saldo()

saldot_yhteensa = reduce(saldojen_summaaja, tilit, 0)

print("pankissa rahaa yhteensä")
print(saldot_yhteensa)
```

Ohjelma tulostaa:

<sample-output>

pankissa rahaa yhteensä
1005001

</sample-output>

Huomaa miten funktio `saldojen_summaaja` "kaivaa" saldon jokaisen tiliolion sisältä kutsumalla tilille saldon palauttavaa metodia:

```python
def saldojen_summaaja(yht_saldo, tili):
  return yht_saldo + tili.hae_saldo()
```

<text-box variant='hint' name='Alkuarvoton reduce'>

Funktion `reduce` kolmas parametri eli alkuarvo ei itse asiassa ole kaikissa tilanteissa pakollinen. Esimerkiksi summan laskeminen onnistuisi _ilman_ alkuarvoa:

```python
lista = [2, 3, 1, 5]

lukujen_summa = reduce(lambda summa, alkio: summa + alkio, lista)

print(lukujen_summa)
```

Jos alkuarvoa ei anneta, toimii listan ensimmäinen luku alkuarvona ja "redusointi" aloitetaan vasta listan toisesta alkiosta.

Huomaa, että jos käsiteltävän listan alkiot ovat eri tyyppisiä kuin laskettava arvo, on `reduce`-funktion kolmas parametri välttämätön. Jos yrittäisimme olla tili-esimerkissä käyttämättä alkuarvoa:

```python
saldot_yhteensa = reduce(saldojen_summaaja, tilit)
```

olisi seurauksena virhe

```python
TypeError: unsupported operand type(s) for +: 'Pankkitili' and 'int'
```

sillä `reduce`-funktion parametri `yht_saldo` saisi ensimmäisellä kerralla arvokseen listan ensimmäisen pankkitilin ja sen summaaminen pankkitilin saldoon ei olisi mahdollista.

</text-box>

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
print(summa)
```

<sample-output>

20

</sample-output>

Toteuta funktio käyttäen `reduce`-funktiota!

## Hyväksyttyjen opintopistemäärä

Toteuta funktio `hyvaksyttyjen_opintopisteiden_summa`, joka saa parametriksi listan suorituksia ja laskee arvosanan 1 tai parempien omaavien suoritusten yhteenlasketun opintopistemäärän. Funktio toimii seuraavasti

```python
s1 = Suoritus("Ohjelmoinnin perusteet", 5, 5)
s2 = Suoritus("Ohjelmoinnin jatkokutssi", 0, 4)
s3 = Suoritus("Tietorakenteet ja algoritmit", 3, 10)
summa = hyvaksyttyjen_opintopisteiden_summa([s1, s2, s3])
print(summa)
```

<sample-output>

15

</sample-output>

Toteuta funktio käyttäen `reduce`- ja `filter`-funktiota!

## Hyväksyttyjen suoritusten keskiarvo

Toteuta funktio `keskiarvo`, joka saa parametriksi listan suorituksia ja laskee arvosanan 1 tai parempien omaavien suoritusten arvosanojen keskiarvon. Funktio toimii seuraavasti

```python
s1 = Suoritus("Ohjelmoinnin perusteet", 5, 5)
s2 = Suoritus("Ohjelmoinnin jatkokutssi", 0, 4)
s3 = Suoritus("Tietorakenteet ja algoritmit", 3, 10)
summa = keskiarvo([s1, s2, s3])
print(summa)
```

<sample-output>

4.0

</sample-output>

Hyödynnä funktion toteutuksessa `reduce`- ja `filter`-funktiota!

[Tämä](/osa-12/3-funktionaalista-ohjelmointia#filter-palauttaa-iteraattorin) lienee syytä pitää mielessä tätä tehtävää tehdessä-

</programming-exercise>
