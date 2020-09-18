---
path: '/osa-3/2-merkkijonojen-kasittely'
title: 'Merkkijonojen käsittely'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat käyttää operaattoreita `+` ja `*` merkkijonojen kanssa
- Osaat laskea merkkijonon pituuden
- Tiedät, mitä tarkoittaa merkkijonon indeksointi
- Osaat etsiä osajonoja merkkijonosta

</text-box>

## Merkkijono-operaatiot

Merkkijonojen yhdistäminen siis tapahtuu `+`-operaattorin avulla:

```python
alku = "esi"
loppu = "merkki"
sana = alku+loppu
print(sana)
```

<sample-output>

esimerkki

</sample-output>

Myös `*`-operaattoria voidaan käyttää merkkijonojen yhteydessä. Jos toinen operandi kertolaskussa on merkkijono ja toinen kokonaisluku, saadaan merkkijonoa monistettua annettu määrä. Esimerkiksi:

```python
sana = "apina"
print(sana*3)
```

<sample-output>

apinaapinaapina

</sample-output>

Silmukan ja merkkijono-operaatioiden avulla voimme tehdä ohjelman,
joka piirtää pyramidin:

```python
n = 10 # pyramidin kerrosten määrä
rivi = "*"

while n > 0:
    print(" " * n + rivi)
    rivi += "**"
    n -= 1
```

Ohjelman tulostus on seuraava:

```x
          *
         ***
        *****
       *******
      *********
     ***********
    *************
   ***************
  *****************
 *******************
```

Silmukassa oleva `print`-komento tulostaa rivin, jonka alussa on `n` välilyöntiä ja sitten muuttujan `rivi` sisältö. Tämän jälkeen muuttujan `rivi` loppuun lisätään kaksi tähteä ja muuttujan `n` arvo vähenee yhdellä.

<in-browser-programming-exercise name="Monta jonoa" tmcname="osa03-05a_monistetut_jonot">

Kirjoita ohjelma, joka kysyy käyttäjältä merkkijonon ja määrän ja tulostaa sitten annettua merkkijonoa annetun määrän. Tulostuksen tulee tapahtua yhdelle riville yhteen pötköön.

Esimerkkisuoritus:

<sample-output>

Anna merkkijono: **heippa**
Anna määrä: **4**
heippaheippaheippaheippa

</sample-output>

</in-browser-programming-exercise>

## Merkkijonon pituus ja indeksointi

Funktio `len` palauttaa kokonaisluvun, joka on merkkijonon pituus merkkeinä. Esimerkiksi `len("moi")` palauttaa 3, koska merkkijonossa `moi` on 3 merkkiä.

Seuraava ohjelma tulostaa käyttäjän syöttämän merkkijonon "alleviivattuna" monistamalla merkkiä `-` syötteen pituuden mukaisen määrän:

```python
mjono = input("Anna merkkijono: ")
print(mjono)
print("-"*len(mjono))
```

<sample-output>

Anna merkkijono: **Moi kaikki!**

<pre>
Moi kaikki!
-----------
</pre>

</sample-output>

Pituuteen lasketaan mukaan kaikki merkkijonossa olevat merkit, mukaan lukien välilyönnit. Niinpä merkkijonon `moi moi` pituus on 7.

<in-browser-programming-exercise name="Pidempi jono" tmcname="osa03-05b_pidempi_jono">

Kirjoita ohjelma, joka kysyy käyttäjältä kaksi merkkijonoa ja tulostaa jonoista pidemmän (ts. sen, jossa on enemmän merkkejä). Jos jonot ovat yhtä pitkiä tulostetaan viesti "Jonot ovat yhtä pitkät"

Esimerkkisuorituksia:

<sample-output>

Anna jono 1: **moi**
Anna jono 2: **heippa**
heippa on pidempi

</sample-output>

<sample-output>

Anna jono 1: **moikkelis koikkelis**
Anna jono 2: **heipparallaa**
moikkelis koikkelis on pidempi

</sample-output>

<sample-output>

Anna jono 1: **moi**
Anna jono 2: **hei**
Jonot ovat yhtä pitkät

</sample-output>

</in-browser-programming-exercise>

Yksittäinen merkkijonon merkki voidaan hakea operaattorin `[]` avulla. Operaattori kirjoitetaan merkkijonon perään, ja hakasulkeiden väliin kirjoitetaan halutun merkin _indeksi_ eli kohta merkkijonossa.

Huomaa, että merkkien indeksointi alkaa nollasta: ensimmäinen merkki on siis indeksin 0 kohdalla, toinen indeksin 1 kohdalla jne.

<img src="3_2_1.png">

Esimerkiksi:

```python

mjono = input("Anna merkkijono: ")
print(mjono[0])
print(mjono[1])
print(mjono[3])

```

Ohjelma tulostaa:

<sample-output>

Anna merkkijono: **apina**
a
p
n

</sample-output>

Koska merkkijonon ensimmäinen merkki on indeksin 0 kohdalla, on viimeinen merkki vastaavasti indeksin _pituus_ – 1 kohdalla. Esimerkiksi seuraava ohjelma tulostaa merkkijonon ensimmäisen ja viimeisen merkin:

```python
mjono = input("Anna merkkijono: ")
print("Ensimmäinen: " + mjono[0])
print("Viimeinen: " + mjono[len(mjono) - 1])
```

<sample-output>

Anna merkkijono: **testi**
Ensimmäinen: t
Viimeinen: i

</sample-output>

Seuraava ohjelma puolestaan käy läpi kaikki merkkijonon merkit vasemmalta oikealle silmukan avulla:

```python
mjono = input("Anna merkkijono: ")
kohta = 0
while kohta < len(mjono):
    print(mjono[kohta])
    kohta += 1
```

<sample-output>

Anna merkkijono: **testi**
t
e
s
t
i

</sample-output>

Pythonissa merkkeihin voi viitata myös alkaen merkkijonon lopusta käyttämällä negatiivisia indeksejä. Merkkijonon viimeinen merkki on indeksin -1 kohdalla, toiseksi viimeinen indeksin -2 kohdalla jne. Onkin kätevämpi kirjoittaa `mjono[-1]` kuin `mjono[len(mjono) - 1]`.

<img src="3_2_2.png">

Tämän avulla aiempi ohjelma voidaan toteuttaa paremmin näin:

```python
mjono = input("Anna merkkijono: ")
print("Ensimmäinen: " + mjono[0])
print("Viimeinen: " + mjono[-1])
```

<sample-output>

Anna merkkijono: **testi**
Ensimmäinen: t
Viimeinen: i

</sample-output>

## IndexError: string index out of range

Merkkijonoa indeksöidessä tulee olla tarkkana indeksien kanssa. Jos viitataan merkkijonon ulkopuolelle, on seurauksena virheilmoitus _IndexError: string index out of range_:

```python
mjono = input("Anna merkkijono: ")
print("Kymmenes merkki: " + mjono[9])
```

<sample-output>

Anna merkkijono: **ohjelmoinnin perusteet**
Kymmenes merkki: n

</sample-output>

<sample-output>

Anna merkkijono: **python**

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: string index out of range

</sample-output>

Joskus virhetilanne johtuu ohjelmointivirheestä. Esimerkiksi merkkijonon viimeistä merkkiä tarkasteltaessa on yleistä indeksoida vahingossa yhtä liian pitkälle:

```python
mjono = input("Anna merkkijono: ")
print("Viimeinen merkki: " + mjono[len(mjono)])
```

Koska merkkijonojen indeksit alkavat nollasta, niin viimeinen merkki on indeksissä `len(mjono) - 1` eikä `len(mjono)`.

On myös tilanteita, joissa ohjelman on syytä varautua siihen, että virheen lähde on käyttäjän antama syöte:

```python
mjono = input("Anna merkkijono: ")
if len(mjono) > 0:
    print("ensimmäinen merkki: " + mjono[0])
else:
    print("merkkijonon pituus on nolla, eli ensimmäistä merkkiä ei ole")
```

Tyhjä syöte (käyttäjä painaa ainoastaan Enter) aiheuttaa usein ohjelman "kaatumisen", ellei koodari ole muistanut laittaa koodiin tarkistusta tilanteen varalta.

<in-browser-programming-exercise name="Lopusta alkuun" tmcname="osa03-05c_lopusta_alkuun">

Kirjoita ohjelma, joka kysyy käyttäjältä merkkijonon ja tulostaa sitten merkkijonon merkit allekkain käänteisessä järjestyksessä lopusta alkuun.

Esimerkkisuoritus:

<sample-output>

Anna merkkijono: **heippa**
a
p
p
i
e
h

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Toinen ja toiseksi viimeinen" tmcname="osa03-06_toinen_ja_toiseksi_viimeinen">


Tee ohjelma, joka kysyy käyttäjältä sanan ja kertoo, ovatko sen toinen ja toiseksi viimeinen merkki samoja.

<sample-output>

Anna sana: **python**
Toinen ja toiseksi viimeinen kirjain eroavat

</sample-output>

<sample-output>

Anna sana: **pascal**
Toinen ja toiseksi viimeinen kirjain on a

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Risuaitaviiva" tmcname="osa03-09_risuaitaviiva">

Tee ohjelma, joka piirtää käyttäjän määräämän levyisen risuaitaviivan.

<sample-output>

Leveys: **3**
<pre>
###
</pre>

</sample-output>

<sample-output>

Leveys: **8**
<pre>
########
</pre>

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Risuaitasuorakulmio" tmcname="osa03-10_risuaitanelio">

Laajenna edellistä niin, että käyttäjä syöttää myös piirrettävien rivien määrän

<sample-output>

Leveys: **10**
Korkeus: **3**
##########
##########
##########

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Alleviivaus" tmcname="osa03-11_alleviivaus">

Tee ohjelma, joka pyytää käyttäjältä merkkijonoja ja tulostaa kunkin merkkijonon oheisen esimerkin mukaisesti alleviivattuna. Ohjelman suoritus päättyy, kun käyttäjä syöttää tyhjän merkkijonon, eli merkkijonon jonka pituus on 0.

<sample-output>

Anna merkkijono: **Moi kaikki!**
<pre>
Moi kaikki!
-----------
</pre>
Anna merkkijono: **Tämä on testijono**
<pre>
Tämä on testijono
-----------------
</pre>
Anna merkkijono: **a**
<pre>
a
-
</pre>
Anna merkkijono:

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Tasaus oikeaan" tmcname="osa03-12_tasaus_oikeaan">

Tee ohjelma, joka kysyy käyttäjältä merkkijonon ja tulostaa sen niin, että tulostetuksi tulee tasan 20 merkkiä. Jos merkkijono on lyhyempi, alkuun tulee tarvittava määrä tähtiä `*`.

Voit olettaa, että syötetyssä merkkijonossa on enintään 20 merkkiä.

<sample-output>

Sana: **python**
<pre>
**************python
</pre>

</sample-output>

<sample-output>

Sana: **pitkämerkkijono**
<pre>
*****pitkämerkkijono
</pre>

</sample-output>

<sample-output>

Sana: **tosipitkämerkkijono**
<pre>
*tosipitkämerkkijono
</pre>

</sample-output>


</in-browser-programming-exercise>

<in-browser-programming-exercise name="Sanalaatikko" tmcname="osa03-13_sanalaatikko">

Tee ohjelma, joka kysyy käyttäjältä sanaa ja tulostaa sanan tähtiraameihin, joissa sana on keskellä. Raamien leveys on 30 merkkiä, ja voit olettaa, että sana mahtuu raameihin.

Huom! Jos sanan pituus on pariton, voit tulostaa sanan kumpaan tahansa mahdollisista keskikohdista.

<sample-output>

Sana: **koe**
<pre>
******************************
*            koe             *
******************************
</pre>

</sample-output>

<sample-output>

Sana: **python**
<pre>
******************************
*           python           *
******************************
</pre>

</sample-output>

</in-browser-programming-exercise>


## Osajonot

Merkkijonon _osajono_ muodostuu perättäisistä merkeistä, jotka löytyvät samassa järjestyksessä merkkijonosta.

Esimerkiksi merkkijonon `esimerkki` osajonoja ovat `esi`, `imer` ja `merkki`.

Voimme erottaa halutussa kohdassa olevan osajonon syntaksilla `[a:b]`,
mikä tarkoittaa, että osajono alkaa kohdasta `a` ja päättyy juuri ennen kohtaa `b`.
Voimme ajatella alku- ja loppukohdan merkkien vasemmalle puolelle piirretyiksi viivoiksi alla olevan kuvan mukaisesti:

<img src="3_2_3.png">

Seuraava esimerkki esittelee osajonojen hakemista:

```python
mjono = "saippuakauppias"

print(mjono[0:3])
print(mjono[4:10])

# jos alkukohta puuttuu, se on oletuksena 0
print(mjono[:3])

# jos loppukohta puuttuu, se on oletuksena merkkijonon pituus
print(mjono[4:])
```

<sample-output>

sai
puakau
sai
puakauppias

</sample-output>

<text-box variant='hint' name='Puoliavoimet välit'>

Merkkijonojen käsittelyssä väli `[a:b]` on _puoliavoin_ eli alkukohta `a`
kuuluu väliin mutta loppukohta `b` ei kuulu väliin. Miksi näin?

Tähän ei ole syvällistä syytä, vaan kyseessä on käytäntö, joka esiintyy
monessa ohjelmointikielessä.

Yksi etu tästä on, että osajonon pituus saadaan helposti laskettua kaavalla `b-a`.
Toisaalta täytyy aina muistaa, että kohdassa `b` oleva merkki
ei tule mukaan osajonoon.

</text-box>

<in-browser-programming-exercise name="Osajonot 1" tmcname="osa03-07_osajonot1">

Tee ohjelma, joka kysyy käyttäjältä merkkijonon ja tulostaa sitten kaikki sen ensimmäisestä merkistä alkavat osajonot pituusjärjestyksessä.

Esimerkkitulostus:

<sample-output>

Anna merkkijono: **testi**
t
te
tes
test
testi

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Osajonot 2" tmcname="osa03-08_osajonot2">

Tee ohjelma, joka kysyy käyttäjältä merkkijonon ja tulostaa sitten kaikki sen viimeiseen merkkiin päättyvät osajonot pituusjärjestyksessä.

Esimerkkitulostus:

<sample-output>

Anna merkkijono: **testi**
i
ti
sti
esti
testi

</sample-output>

</in-browser-programming-exercise>

## Osajonon etsiminen

Voimme tutkia `in`-operaattorin avulla, onko merkkijonossa tiettyä osajonoa.
Lauseke `a in b` on tosi, jos merkkijonossa `b` on osajono `a`.

Esimerkiksi

```python
mjono = "testi"

print("t" in mjono)
print("x" in mjono)
print("est" in mjono)
print("ets" in mjono)
```

<sample-output>

True
False
True
False

</sample-output>

Seuraava ohjelma antaa käyttäjän etsiä merkkijonon osajonoja:

```python
mjono = "saippuakauppias"

while True:
    osa = input("Mitä etsit? ")
    if osa in mjono:
        print("Löytyi")
    else:
        print("Ei löytynyt")
```

<sample-output>

Mitä etsit? **kaup**
Löytyi
Mitä etsit? **abc**
Ei löytynyt
Mitä etsit? **ippu**
Löytyi
...

</sample-output>

<in-browser-programming-exercise name="Löytyvätkö vokaalit" tmcname="osa03-13b_loytyvatko_vokaalit">

Tee ohjelma, joka kysyy käyttäjältä merkkijonon ja tulostaa sitten tiedon löytyvätkö vokaalit a, e ja o merkkijonosta.

Voit olettaa, että merkkijono on syötetty kokonaan pienillä kirjaimilla. Katso mallia esimerkkitulostuksesta.

Esimerkkitulostus:

<sample-output>

Anna merkkijono: **heippa sulle**
a löytyy
e löytyy
o ei löydy

</sample-output>

<sample-output>

Anna merkkijono: **moi**
a ei löydy
e ei löydy
o löytyy

</sample-output>


</in-browser-programming-exercise>

Operaattori `in` palauttaa tiedon osajonon esiintymisestä, muttei tietoa siitä, _mistä_ se löytyy. Tätä varten Pythonin merkkijonoissa _metodi_ `find`, joka saa parametrikseen etsittävän osajonon palauttaa joko ensimmäisen indeksin, josta osajono löytyy, tai `-1`, jos osajonoa ei löydy merkkijonosta.

Metodi tarkoittaa suunnilleen samaa kuin funktio, mutta se liittyy tiettyyn merkkijonoon. Metodia käytetään seuraavasti:

<img src="3_2_4.png">

Esimerkkejä metodin käyttämisestä:

```python
mjono = "testi"

print(mjono.find("t"))
print(mjono.find("x"))
print(mjono.find("est"))
print(mjono.find("ets"))
```

<sample-output>

0
-1
1
-1

</sample-output>

Voimme myös laajentaa hakuohjelmaa näin:

```python
mjono = "saippuakauppias"

while True:
    osa = input("Mitä etsit? ")
    kohta = mjono.find(osa)
    if kohta >= 0:
        print(f"Löytyi kohdasta {kohta}")
    else:
        print("Ei löytynyt")
```

<sample-output>

Mitä etsit? **kaup**
Löytyi kohdasta 7
Mitä etsit? **abc**
Ei löytynyt
Mitä etsit? **ippu**
Löytyi kohdasta 2
...

</sample-output>

<text-box variant='hint' name='Metodi'>

Merkkijonon sisältä merkkijonoa etsivä `find` on siis tekniseltä termiltään _metodi_. Metodit ovat sukua jo meille tutuille asioille eli _funktioille_. Metodit ovatkin eräänlaisia funktioita, mutta niiden suorittama operaatio kohdistuu siihen _olioon_, jonka kautta metodia kutsutaan, eli joka esiintyy metodikutsun alussa ennen metodin nimeä.

</text-box>

<in-browser-programming-exercise name="Ensimmäisen osajonon haku" tmcname="osa03-13c_osajonon_haku">

Tee ohjelma, joka kysyy käyttäjältä merkkijonoa ja yksittäistä merkkiä. Ohjelma tulostaa merkkijonosta löytyvän ensimmäisen kolmen merkin pituisen osajonon, jonka alkukirjain on käyttäjän syöttämä merkki. Voit olettaa, että merkkijono on vähintään kolmen merkin pituinen.

<sample-output>

Sana: **apinatalo**
Merkki: **a**
api

</sample-output>

<sample-output>

Sana: **banaani**
Merkki: **n**
naa

</sample-output>

<sample-output>

Sana: **tomaatti**
Merkki: **x**

</sample-output>

<sample-output>

Sana: **python**
Merkki: **n**

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Kaikkien osajonojen haku" tmcname="osa03-14_osajonojen_haku">

Tee edellisestä ohjelmasta laajennettu versio, joka tulostaa _kaikki merkkijonon sisältämät kolmen merkin pituiset osajonot_, joiden alkukirjain on käyttäjän syöttämä merkki. Voit olettaa, että merkkijono on vähintään kolmen merkin pituinen.

<sample-output>

Sana: **apinatalo**
Merkki: **a**
api
ata
alo

</sample-output>

<sample-output>

Sana: **banaani**
Merkki: **n**
naa

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Toinen esiintymä" tmcname="osa03-15_toinen_esiintyma">

Tee ohjelma, joka etsii merkkijonosta osajonon toisen esiintymän. Jos toista (tai edes ensimmäistä) esiintymää ei löydy, ohjelma tulostaa tästä tiedon.

Määritellään tässä yhteydessä, että esiintymät _eivät_ voi mennä päällekkäin, merkkijonossa `aaaa` osajonon `aa` toinen esiintymä löytyy siis indeksin 2 kohdalta.

Muutama esimerkkisuoritus:

<sample-output>

Anna merkkijono: **abcabc**
Anna osajono: **ab**
Osajonon toinen esiintymä on kohdassa 3.

</sample-output>

<sample-output>

Anna merkkijono: **saippuakauppias**
Anna osajono: **a**
Osajonon toinen esiintymä on kohdassa 6.

</sample-output>

<sample-output>

Anna merkkijono: **aybabtu**
Anna osajono: **ba**
Osajono ei esiinny merkkijonossa kahdesti.

</sample-output>

</in-browser-programming-exercise>

<quiz id="a7504c1e-c072-5449-b8d9-22d432c01062"></quiz>
