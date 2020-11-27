---
path: '/osa-12/4-saannolliset-lausekkeet'
title: 'Säännölliset lausekkeet'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät mitä tarkoitetan säännöllisellä lausekkeella
- Osaat hyödyntää säännöllisiä lausekkeita omissa ohjelmissasi

</text-box>

Python on mainio työkalu tekstin käsittelemiseen. Yksi työkalu tekstin käsittelemisessä ovat
_säännölliset lausekkeet_ (_regular expressions_), joiden avulla voi esimerkiksi poimia ja etsiä merkkijonoja, jotka ovat tietyn muotoisia. Tässä osiossa käydään läpi säännöllisten lausekkeiden perusteita, ja löydät lisää tietoa Pythonin omasta [tutoriaalista](https://docs.python.org/3/howto/regex.html).

## Mitä ovat säännölliset lausekkeet?

Säännölliset lausekkeet ovat tavallaan ohjelmointikieli ohjelmointikielen sisällä. Lausekkeilla on oma syntaksinsa, jonka mukaan ne määritellään. Ideana on, että säännöllisellä lausekkeella määritellään sellaisten merkkijonojen joukko, jotka ovat tiettyjen sääntöjen mukaisia.

Tarkistellaan yksinkertaista esimerkkiä lausekkeiden käytöstä ennen tarkempaa perehtymistä sääntöihin:

```python
import re

sanat = ["Python", "Ponneton", "Ponttooni", "Pullero", "Pallon"]

for sana in sanat:
    # merkkijonon tulee alkaa "P" ja päättyä "on"
    if re.search("^P.*on$", sana):
        print(sana, "löytyy!")
```

<sample-output>

Python löytyy!
Ponneton löytyy!
Pallon löytyy!

</sample-output>

Pythonissa säännöllisiä lausekkeita voi käsitellä moduulin `re` avulla. Esimerkiksi yllä olevassa koodissa oleva metodi `search` etsii merkkijonosta osaa, joka täsmää annettuun säännölliseen lausekkeeseen.

Toinen esimerkki etsii merkkijonosta luvut. Metodi `findall` palauttaa kaikki säännölliseen lausekkeeseen täsmäävät osajonot listana:

```python
import re

lause = "Eka, 2 !#kolmas 44 viisi 678xyz962"

luvut = re.findall("\d+", lause)

for luku in luvut:
    print(luku)
```

<sample-output>

2
44
678
962

</sample-output>

## Säännöllisten lausekkeiden syntaksi

Tarkastellaan seuraavaksi syntaksia, jota säännöllisissä lausekkeissa käytetään. Useimmissa esimerkeissä käytetään samaa testiohjelmaa eri syötteillä.

```python
import re

lauseke = input("Anna lauseke: ")

while True:
    mjono = input("Anna merkkijono: ")
    if mjono == "":
        break
    if re.search(lauseke, mjono):
        print("Osuma!")
    else:
        print("Ei osumaa.")
```

### Vaihtoehtoiset alijonot

Pystyviivalla voidaan erottaa vaihtoehtoisia osajonoja. Esimerkiksi lauseke `911|112` täsmää merkkijonoihin, joista löytyy joko osajono `911` tai osajono `112`.

Esimerkiksi

<sample-output>

Anna lauseke: aa|ee|ii
Anna testijono: saapas
Osuma!
Anna testijono: teema
Osuma!
Anna testijono: iilimato
Osuma!
Anna testijono: ooppera
Ei osumaa.
Anna testijono: uuttera
Ei osumaa.

</sample-output>


### Merkkijoukot

Hakasulkeiden väliin voidaan merkitä joukko hyväksyttyjä merkkejä. Esimerkiksi merkintä `[aeio]` täsmää jonoihin, joista löytyy jokin merkeistä a, e, i, tai o. Merkintätapa sallii myös väliviivan käytön. Merkintä `[0-68a-d]` hyväksyy jonot, joista löytyy numero nollasta kuuteen, kahdeksikko tai merkki väliltä a...d. Merkintä `[1-3][0-9]` hyväksyy kaksinumeroiset luvut väliltä 10...39.

Esimerkiksi:

<sample-output>

Anna lauseke: [C-FRSÖ]
Anna testijono: C
Osuma!
Anna testijono: E
Osuma!
Anna testijono: G
Ei osumaa.
Anna testijono: R
Osuma!
Anna testijono: Ö
Osuma!
Anna testijono: T
Ei osumaa.

</sample-output>

### Toistaminen

Lausekkeen osaa voidaan toistaa esimerkiksi seuraavien operaattorien avulla:

* `*` toistaa osaa minkä tahansa määrän kertoja (myös nolla)
* `+` toistaa osaa minkä tahansa määrän kertoja (ainakin yhden)
* `{m}` toistaa osaa täsmälleen `m` kertaa

Operaattorit viittaavat niitä edeltävään lausekkeen osaan. Esimerkiksi lauseke `ba+b` hyväksyy esimerkiksi osajonot `bab`, `baab` ja `baaaaaaaaaaab`. Lauseke `A[BCDE]*Z` puolestaan hyväksyy esimerkiksi osajonot `AZ`, `ADZ` tai `ABCDEBCDEBCDEZ`.

Esimerkiksi:

<sample-output>

Anna lauseke: 1[234]*5
Anna testijono: 15
Osuma!
Anna testijono: 125
Osuma!
Anna testijono: 145
Osuma!
Anna testijono: 12342345
Osuma!
Anna testijono: 126
Ei osumaa.
Anna testijono: 165
Ei osumaa.

</sample-output>


### Muita erikoismerkkejä

Pisteellä merkitään mitä tahansa yksittäistä merkkiä. Niinpä merkintä `c...o` vastaa esimerkiksi merkkijonoja `c-3po` tai `combo`. Merkillä `^` voidaan määritellä, että osuman pitää löytyä merkkijonon alusta, ja vastaavasti merkillä `$`, että sen on oltava lopussa. Näillä voidaan näppärästi myös rajata sääntö koskemaan vain annettuja merkkejä:

<sample-output>

Anna lauseke: ^[123]*$
Anna testijono: 4
Ei osumaa.
Anna testijono: 1221
Osuma!
Anna testijono: 333333333
Osuma!

</sample-output>

Kenoviivaa voidaan käyttää etsimään erikoismerkkejä. Merkintä `1+` tarkoitaa yhtä tai useampaa ykköstä, mutta merkintä `1\+` merkkijonoa `1+`.

Esimerkiksi

<sample-output>

Anna lauseke: ^\*
Anna testijono: moi*
Ei osumaa.
Anna testijono: m*o*i
Ei osumaa.
Anna testijono: *moi
Osuma!

</sample-output>

Kaarisulkeilla voidaan ryhmitellä lausekkeen osia. Esimerkiksi lauseke `(ab)+c` hyväksyy jonot `abc`, `ababc` ja `ababababababc`, mutta ei esimerkiksi jonoja `ac` tai `bc`.

Esimerkiksi

<sample-output>

Anna lauseke: ^(jabba).*(hut)$
Anna testijono: jabba the hut
Osuma!
Anna testijono: jabba a hut
Osuma!
Anna testijono: jarmo the hut
Ei osumaa.
Anna testijono: jabba the smut
Ei osumaa.

</sample-output>

<programming-exercise name='Säännölliset lausekkeet' tmcname='osa12-14_saannolliset_lausekkeet'>

Harjoitellaan hieman säännöllisten lausekkeiden käyttöä.

## Viikonpäivät

Tee säännöllisen lausekkeen avulla funktio `on_viikonpaiva(merkkijono: str)` joka palauttaa `True`, jos sen parametrina saama merkkijono sisältää viikonpäivän lyhenteen (ma, ti, ke, to, pe, la tai su).

Esimerkki funktion kutsumisesta:

```python
print(on_viikonpaiva("ma"))
print(on_viikonpaiva("pe"))
print(on_viikonpaiva("tu"))
```

<sample-output>

True
True
False

</sample-output>

## Vokaalitarkistus

Tee funktio `kaikki_vokaaleja(merkkijono: str)`, joka tarkistaa säännöllisen lausekkeen avulla, ovatko parametrina annetun merkkijonon kaikki merkit vokaaleja.

Esimerkki funktion kutsumisesta:

```python
print(kaikki_vokaaleja("eioueioieoieouyyyy"))
print(kaikki_vokaaleja("autoooo"))
```

<sample-output>

True
False

</sample-output>

## Kellonaika

Tee funktio `kellonaika(merkkijono: str)`, joka tarkistaa säännöllisen lausekkeen avulla, onko parametrina oleva merkkijono muotoa `tt:mm:ss` oleva kellonaika (tunnit, minuutit ja sekunnit kaksinumeroisina).

Esimerkki funktion kutsumisesta:

```python
print(kellonaika("12:43:01"))
print(kellonaika("ab:cd:ef"))
print(kellonaika("17:59:59"))
print(kellonaika("33:66:77"))
```

<sample-output>

True
False
True
False

</sample-output>

</programming-exercise>

## Loppuhuipennus

Harjoitellaan vielä osan lopussa hieman laajemman ohjelman tekemistä olioita hyödyntäen. Tämä tehtävä ei sijainnistaan huolimatta liity mitenkään säännöllisiin lausekkeisiin, mutta luvun [Funktio parametrina](/osa-12/1-funktio-parametrina) asia tulee olemaan tarpeen ja myös [listakoosteet](/osa-11/1-koosteet) voivat olla käyttökelpoisia.

Sovelluksen rakenteelle voi ottaa inspiraatiota osan 10 [viimeisestä luvusta](/osa-10/4-lisaa-esimerkkeja).

<programming-exercise name='Tilastot ojennukseen' tmcname='osa12-15_tilastot_ojennukseen'>

Tässä tehtävässä tehdään sovellus, jonka avulla on mahdollista tarkastella NHL-jääkiekkoliigan tilastoja muutamassa hieman erilaisessa muodossa.

Tehtäväpohjan mukana tulee kaksi json-muodossa olevaa tiedostoa `osa.json` ja `kaikki.json`, näistä ensimmäinen on tarkoitettu lähinnä testailun avuksi. Jälkimmäinen sisältää kaikkien kaudella 2019-20 pelanneiden pelaajien statistiikat.

Yksittäisen pelaajan tiedot ovat muodossa

```json
{
    "name": "Patrik Laine",
    "nationality": "FIN",
    "assists": 35,
    "goals": 28,
    "penalties": 22,
    "team": "WPG",
    "games": 68
},
```

ja molemmat tiedostoista sisältävät yksittäisten pelaajien tiedot taulukossa.

Jos et muista, miten json-muotoinen tiedosto saadaan luettua Python-ohjelmaan, voit kerrata tämän [osan 7 materiaalista](/osa-7/4-datan-kasittely#json-tiedoston-lukeminen).

Tee nyt ohjelma, joka kysyy aluksi tiedoston nimeä ja tarjoaa sitten seuraavat toiminnot:

- yksittäisen pelaajan tietojen haku nimen perusteella
- listaus joukkueiden nimien lyhenteistä (aakkosjärjestyksessä)
- listaus maiden nimien lyhenteistä (aakkosjärjestyksessä)

Näistä toiminnoista saa yhden pisteen. Ohjelman tulee toimia seuraavasti:

<sample-output>

tiedosto: **osa.json**
luettiin 14 pelaajan tiedot

komennot:
0 lopeta
1 hae pelaaja
2 joukkueet
3 maat
4 joukkueen pelaajat
5 maan pelaajat
6 eniten pisteitä
7 eniten maaleja

komento: **1**
nimi: **Travis Zajac**
<pre>
Travis Zajac         NJD   9 + 16 =  25
</pre>

komento: **2**
BUF
CGY
DAL
NJD
NYI
OTT
PIT
WPG
WSH

komento: **3**
CAN
CHE
CZE
SWE
USA

komento: **0**

</sample-output>

Huomaa, että pelaajien tulostusasun pitää olla täsmälleen seuraavanlainen:

<sample-output>

<pre>
Leon Draisaitl       EDM  43 + 67 = 110
Connor McDavid       EDM  34 + 63 =  97
Travis Zajac         NJD   9 + 16 =  25
Mike Green           EDM   3 +  8 =  11
Markus Granlund      EDM   3 +  1 =   4
123456789012345678901234567890123456789
</pre>

</sample-output>

Alimman rivin numerot on lisätty helpottamaan oikean merkkimäärän laskemista. Joukkueen nimen lyhenne siis tulostetaan alkaen rivin 22. merkistä. Plus on rivin 30. merkki ja = rivin 35. merkki. Kaikki luvut tulee tasata oikeaan reunaan omaa tulostusaluettaan. Tyhjät kohdat ovat välilyöntejä.

Tulostuksen muotoilu kannattaa hoitaa f-merkkijonoina samaan tapaan kuin [tässä](osa-6/1-tiedostojen-lukeminen#programming-exercise-kurssin-tulokset-osa-3) osan 6 tehtävässä.

Seuraavat toiminnot tuovat toisen pisteen:

- joukkueen pelaajien listaaminen pisteiden (joka saadaan laskemalla _goals_ + _assits_) mukaisessa järjestyksessä
- tietyn maan pelaajien listaaminen pisteiden mukaisessa järjestyksessä

Toiminnallisuus on seuraava:

<sample-output>

tiedosto: **osa.json**
luettiin 14 pelaajan tiedot

komennot:
0 lopeta
1 hae pelaaja
2 joukkueet
3 maat
4 joukkueen pelaajat
5 maan pelaajat
6 eniten pisteitä
7 eniten maaleja

komento: **4**
joukkue: **OTT**
<pre>
Drake Batherson      OTT   3 +  7 =  10
Jonathan Davidsson   OTT   0 +  1 =   1
</pre>

komento: **5**
maa: **CAN**
<pre>
Jared McCann         PIT  14 + 21 =  35
Travis Zajac         NJD   9 + 16 =  25
Taylor Fedun         DAL   2 +  7 =   9
Mark Jankowski       CGY   5 +  2 =   7
Logan Shaw           WPG   3 +  2 =   5
</pre>

komento: **0**

</sample-output>

Kolmannen pisteen saa seuraavilla toiminnoilla:

- n eniten pistettä saanutta pelaajaa
  - jos kahden pelaajan pistemäärä on sama, ratkaisee maalimäärä
- n eniten maaleja (_goals_) tehnyttä pelaajaa
  - jos kahden pelaajan maalimäärä on sama, järjestysksen ratkaisee se kummalla on vähemmän otteluja (_games_)

Toiminnallisuus on seuraava:

<sample-output>

tiedosto: **osa.json**
luettiin 14 pelaajan tiedot

komennot:
0 lopeta
1 hae pelaaja
2 joukkueet
3 maat
4 joukkueen pelaajat
5 maan pelaajat
6 eniten pisteitä
7 eniten maaleja

komento: **6**
kuinka monta: **2**
<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
</pre>

komento: **6**
kuinka monta: **5**

<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
John Klingberg       DAL   6 + 26 =  32
Travis Zajac         NJD   9 + 16 =  25
Conor Sheary         BUF  10 + 13 =  23
</pre>

komento: **7**
kuinka monta: **6**

<pre>
Jakub Vrana          WSH  25 + 27 =  52
Jared McCann         PIT  14 + 21 =  35
Conor Sheary         BUF  10 + 13 =  23
Travis Zajac         NJD   9 + 16 =  25
John Klingberg       DAL   6 + 26 =  32
Mark Jankowski       CGY   5 +  2 =   7
</pre>

komento: **0**

</sample-output>

</programming-exercise>

Vastaa lopuksi osion loppukyselyyn:

<quiz id="169e4e52-8797-5172-b8b1-dc075bfdc866"></quiz>


