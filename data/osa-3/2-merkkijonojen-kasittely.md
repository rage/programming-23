---
path: '/osa-3/2-merkkijonojen-kasittely'
title: 'Merkkijonojen käsittely'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat käyttää operaattoreita `+` ja `*` merkkijonojen kanssa
- Tiedät mitä tarkoittaa indeksointi
- Osaat selvittää merkkijonon pituuden
- Osaat poimia yksittäisiä merkkejä ja alijonoja merkkijonosta
- Osaat etsiä alijonon merkkijonosta
- Tiedät mitä tarkoitetaan metodilla Pythonissa ja miten se eroaa funktiosta

</text-box>

## Merkkijono-operaatiot

Olemme jo aiemmin yhdistäneet merkkijonoja `+`-operaattorin avulla:

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
    print(" "*n+rivi)
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


## Merkkijonon pituus ja indeksointi

Funktio `len` antaa kokonaisluvun, joka on merkkijonon pituus merkkeinä. Esimerkiksi `len("moi")` antaa 3, koska merkkijonossa `moi` on 3 merkkiä.

Seuraava ohjelma tulostaa käyttäjän syöttämän merkkijonon "alleviivattuna" monistamalla merkkiä `-` syötteen pituuden mukaisen määrän:

```python
mjono = input("Anna merkkijono: ")
print(mjono)
print("-"*len(mjono))
```

TODO: mitenhän tämän tulostuksen saisi järkevästi näkymään?

<sample-output>

Anna merkkijono: **Moi kaikki!**

Moi kaikki!
&#x2012;&#x2012;&#x2012;&#x2012;&#x2012;&#x2012;&#x2012;&#x2012;

</sample-output>

Pituuteen lasketaan mukaan kaikki merkkijonossa olevat merkit, mukaan lukien välilyönnit. Niinpä merkkijonon `moi moi` pituus on 7.

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

Pythonissa merkkeihin voi viitata myös alkaen merkkijonon lopusta käyttämällä negatiivisia indeksejä. Merkkijonon viimeinen merkki on indeksin -1 kohdalla, toiseksi viimeinen indeksin -2 kohdalla jne. Onkin kätevämpi kirjoittaa `m[-1]` kuin `m[len(m) - 1]`.

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


## Osajonot

Merkkijonon _osajono_ muodostuu perättäisistä merkeistä. Esimerkiksi merkkijonon `esimerkki` osajonoja ovat `esi`, `imer` ja `merkki`.

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
Yksi etu tässä on, että osajonon pituus saadaan mukavasti kaavalla `b-a`,
mutta toisaalta täytyy aina muistaa, että kohdassa `b` oleva merkki
ei tule mukaan osajonoon.

</text-box>

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

Operaattori `in` antaa tiedon osajonon esiintymisestä, muttei tietoa siitä, _mistä_ se löytyy. Tätä varten Pythonin merkkijonoissa metodi `find`, joka saa parametrikseen etsittävän osajonon palauttaa joko ensimmäisen indeksin, josta osajono löytyy tai `-1`, jos osajonoa ei löydy merkkijonosta.

Metodi tarkoittaa suunnilleen samaa kuin funktio, mutta se liittyy tiettyyn merkkijonoon. Metodin syntaksi näyttää tältä:

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
        print("Löytyi kohdasta",kohta)
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
