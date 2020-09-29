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

Python on mainio työkalu tekstin käsittelemiseen. Sisäänrakennetut operaatiot ovat yksinkertaisia käyttää mutta melko tehokkaita.

Vaativampien operaatioiden toteuttaminen saattaa kuitenkin muodostua ongelmalliseksi. Tätä tarkoitusta varten Pythonista löytyy useimpien muiden ohjelmointikielten tapaan _säännölliset lausekkeet_ (_regular expressions_).

Säännöllisten lausekkeiden avulla on mahdollista määritellä hyvinkin monimutkaisia sääntöjä, joiden perusteella voidaan esimerkiski poimia, suodattaa tai etsiä alijonoja. Tässä osiossa käydään perusperiaatteen lisäksi läpi muutamia sääntöjä, lisää löydät esimerkiksi Pythonin mainiosta [tutoriaalista](https://docs.python.org/3/howto/regex.html).

## Mitä ovat säännölliset lausekkeet?

Säännölliset lausekkeet ovat tavallaan ohjelmointikieli ohjelmointikielen sisällä. Lauseilla on oma syntaksinsa, jonka mukaan ne määritellään. Ideana on, että säännöllisellä lausekkella määritellään sellaisten merkkijonojen joukko, jotka ovat tiettyjen sääntöjen mukaisia.

Tarkistellaan yksinkertaista esimerkkiä lausekkeiden käytöstä ennen tarkempaa perehtymistä sääntöihin:

```python
import re
# Merkkijonot, jotka alkavat alijonolla 'P' ja
# päättyvät alijonoon 'on'
merkkijono = re.compile("^P.*on$")

testit = ["Python", "Ponneton", "Ponttooni", "Pullero", "Pallon"]

for testisana in testit:
    if merkkijono.search(testisana):
        print(testisana, "löytyy!")
```

<sample-output>

Python löytyy!
Ponneton löytyy!
Pallon löytyy!

</sample-output>

Lauseke "lasketaan" valmiiksi re-modulista löytyvällä funktiolla `compile`, minkä jälkeen sen palauttamaa oliota voidaan käyttää merkkijonojen testaamiseen. Metodi `search` palauttaa arvon `None`, jos vastaavuutta ei löydy, joten sitä voidaan käyttää ehtolauseessa esimerkin tapaan. Mikäli vastaavuus löytyy, saadaan palautetusta `Match`-tyyppisestä oliosta tarvittaessa tarkempaa tietoa vastaavuudesta.

Toinen esimerkki etsii  merkkijonosta luvut. Metodin `findall` palauttaa kaikki sääntöön täsmäävät alijonot listana:

```python
import re

# Hyväksytään vain luvut
merkkijono = re.compile("\d+")

testilause = "Eka, 2 !#kolmas 44 viisi 678xyz962"

luvut = re.findall(merkkijono, testilause)

for luku in luvut:
    print(luku)
```

<sample-output>

2
44
678
962

</sample-output>

Molemmat ensimmäisistä esimerkeistä on kohtuullisen vaivatonta toteuttaa myös ilman säännöllisiä lausekkeita. Yleensä tällaisessa tapauksessa onkin järkevää hyödyntää Pythonin omia merkkijono-operaatioita. Näin koodista tulee useimmiten myös helpommin luettavaa.

## Säännöt

Tarkastellaan seuraavaksi sääntöjä, joita säännöllisissä lausekkeissa käytetään. Useimmissa esimerkeissä käytetään samaa testiohjelmaa eri syötteillä.

```python
import re

mjono = input("Anna lauseke: ")
lauseke = re.compile(mjono)

while True:
    testi = input("Anna testijono: ")
    if (testi == ""):
        break
    if lauseke.search(testi):
        print("Osuma!")
    else:
        print("Ei osumaa.")
```

### Vaihtoehtoiset alijonot

Pystyviivalla voidaan erottaa vaihtoehtoisia alijonoja. Esimerkiksi lauseke `911|112` täsmää merkkijonoihin, joista löytyy joko alijono `911` tai alijono `112`.

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

Hakasulkeiden väliin voidaan merkitä joukko hyväksyttyjä merkkejä. Esimerkiksi merkintä `[aeio]` täsmää jonoihin, joista löytyy jokin merkeistä a, e, i, tai o. Merkintätapa sallii myös väliviivan käytön. Merkintä [0-68a-d] hyväksyy jonot, joista löytyy numero nollasta kuuteen, kahdeksikko tai merkki väliltä a...d. Merkintä `[1-3][0-9]` hyväksyy kaksinumeroiset luvut väliltä 10...39.

Esimerkiksi

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

### Merkkien määrä

Merkkien määrää voidaan rajata ainakin seuraavien operaattorien avulla:

`*` kelpuuttaa nolla tai useamman osuman
`+` kelpuuttaa yhden tai useamman osuman
`{m}` kelpuuttaa täsmälleen m osumaa

Operaattorit viittaavat niitä edeltävään määrittelyyn. Esimerkiksi `ba+b` hyväksyy esimerkiksi alijonot `bab`, `baab` tai vaikka `baaaaaaaaaaab`. Samoin `A[BCDE]*Z` kelpuuttaa esimerkiksi alijonot `AZ`, `ADZ` tai `ABCDEBCDEBCDEZ`.


Esimerkiksi

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

Pisteellä merkitään mitä tahansa yksittäistä merkkiä. Niinpä merkintä `c...o` vastaa esimerkiksi merkkijonoja `c-3po` tai `combo`. Merkillä `^` voidaan määritellä, että osuman pitää löytyä merkkijonon alusta, ja vastaavasti merkillä `$`, että sen on oltava lopussa.

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

TODO: Lisää esimerkkejä?


