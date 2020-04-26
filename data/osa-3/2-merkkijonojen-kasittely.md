---
path: '/osa-3/2-merkkijonojen-kasittely'
title: 'Merkkijonojen käsittely'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tekstin ja muun merkkimuotoisen tiedon käsittely on eräs ohjelmien perusoperaatioista. Python tarjoaa tehokkaita keinoja merkkijonojen käsittelyyn.

Tämän osion suoritettuasi

- Osaat käyttää operaattoreita `+` ja `*` merkkijonojen kanssa
- Tiedät mitä tarkoittaa indeksointi
- Osaat selvittää merkkijonon pituuden
- Osaat poimia yksittäisiä merkkejä ja alijonoja merkkijonosta
- Osaat etsiä alijonon merkkijonosta
- Tiedät mitä tarkoitetaan metodilla Pythonissa ja miten se eroaa funktiosta

</text-box>

Aikaisemmissa osissa on opittu, että `+`-operaattori toimii eri tavalla merkkijonoja ja lukutyyppisiä arvoja käytettäessä. Kaksi merkkijonoa voidaan yhdistää toisiinsa (eli _katenoida_) käyttäen `+`-operaattoria:

```python
alku = "esi"
loppu = "merkki"
sana = alku+loppu
print(sana)
```

<sample-output>

esimerkki

</sample-output>

Myös `*`-operaattoria voidaan käyttää merkkijonojen yhteydessä. Jos toinen operandi kertolaskussa on merkkijono ja toinen kokonaisluku, saadan lopputulokseksi samaa merkkijonoa monistettuna annettu määrä. Esimerkiksi:

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

<sample-output>

```
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

</sample-output>

## Merkkijonon pituus ja indeksointi

Funktio `len` antaa kokonaisluvun, joka on merkkijonon pituus merkkeinä. Esimerkiksi `len("moi")` antaa 3, koska merkkijonossa `"moi"` on 3 merkkiä. Seuraava esimerkki tulostaa käyttäjän syöttämän merkkijonon "alleviivattuna" muodostamalla alleviivauksen monistamalla merkkiä "-" syötteen pituuden mukaisen määrän:

```python
mjono = input("Anna merkkijono: ")
print(mjono)
print("-"*len(mjono))
```

<sample-output>

Anna merkkijono: **Moi kaikki!**

Moi kaikki!
&#x2012;&#x2012;&#x2012;&#x2012;&#x2012;&#x2012;&#x2012;&#x2012;

</sample-output>

Pituuteen lasketaan mukaan kaikki merkkijonossa olevat merkit, mukaan lukien välilyönnit. Niinpä merkkijonon `moi moi` pituus on 7.

Yksittäinen merkki merkkijonosta voidaan hakea operaattorin `[]` avulla. Operaattori kirjoitetaan merkkijonon perään, ja hakasulkeiden väliin kirjoitetaan halutun merkin _indeksi_ eli kohta merkkijonossa.

Huomaa, että merkkien indeksointi alkaa nollasta: ensimmäinen merkki on siis indeksin 0 kohdalla, toinen indeksin 1 kohdalla jne.

<img src="3_2_1.png">

Esimerkiksi

```python

mjono = "abcdef"

print(mjono[0])
print(mjono[1])
print(mjono[3])

```

Ohjelma tulostaa:

<sample-output>

a
b
d

</sample-output>


Koska merkkijonon ensimmäinen merkki on indeksin 0 kohdalla, on viimeinen merkki vastaavasti indeksin _pituus - 1_ kohdalla. Esimerkiksi seuraava ohjelma tulostaa merkkijonon ensimmäisen ja viimeisen merkin:

```python
mjono = input("Anna merkkijono: ")
print("Ensimmäinen: " + mjono[0])
print("Viimeinen: " + mjono[len(mjono) - 1])
```

<sample-output>

Anna merkkijono: **esimerkki**
Ensimmäinen: e
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

Anna merkkijono: **esimerkki**
e
s
i
m
e
r
k
k
i

</sample-output>

Pythonissa merkkeihin voi viitata myös alkaen merkkijonon lopusta käyttämällä negatiivisia indeksejä. Merkkijonon viimeinen merkki on indeksin -1 kohdalla, toiseksi viimeinen indeksin -2 kohdalla jne. Onkin kätevämpi kirjoittaa `m[-1]` kuin `m[len(m) - 1]`.

<img src="3_2_2.png">

## Osajonot

Merkkijonon _osajono_ muodostuu perättäisistä merkeistä. Esimerkiksi merkkijonon `esimerkki` osajonoja ovat `esi`, `imer` ja `rkk`.

Voimme erottaa halutussa kohdassa olevan osajonon syntaksilla `[a:b]`,
mikä tarkoittaa, että osajono alkaa kohdasta `a` ja päättyy juuri ennen kohtaa `b`.
Voimme ajatella alku- ja loppukohdan merkkien vasemmalle puolelle piirretyiksi viivoiksi alla olevan kuvan mukaisesti:

<img src="3_2_3.png">

Minkä takia indeksit sitten toimivat näin? Tähän lienee kaksi syytä: ensinnäkin, indeksit toimivat samalla tavalla useimmissa muissa ohjelmointikielissä (jolloin kielestä toiseen siirtyminen on helpompaa). Toinen syy lienee se, että kun loppuindeksin mukaista merkkiä ei oteta mukaan alijonoon, voidaan alijonon pituus laskea kaavalla `loppuindeksi - alkuindeksi`.

Seuraava esimerkki esittelee osajonojen hakemista:

```python
mjono = "Moi kaikki!"

print(mjono[0:3])
print(mjono[4:10])

# jos alkukohta puuttuu, se on oletuksena 0
print(mjono[:2])
# jos alkukohta puuttuu, se on oletuksena merkkijonon pituus
print(mjono[4:])
```

<sample-output>

Moi
kaikki
Mo
kaikki!

</sample-output>

## Osajonon etsiminen merkkijonosta

Voimme tutkia `in`-operaattorin avulla, onko merkkijonossa tiettyä osajonoa.
Lauseke `a in b` on tosi, jos merkkijonossa `b` on osajono `a`.

Esimerkiksi

```python
mjono = "esimerkki"

print("m" in mjono)
print("x" in mjono)
print("erk" in mjono)
print("mrk" in mjono)
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

Operaattori `in` antaa tiedon osajonon esiintymisestä, muttei tietoa siitä, _mistä_ se löytyy. Tätä varten Pythonissa on metodi `find`.

<text-box variant="hint" name="Metodit">

TODO: Onkohan tämä hyvä hetki kertoa tästä? Ei ole vielä kerrottu, mikä on olio?

Metodilla tarkoitetaan funktiota, joka liittyy johonkin olioon, kuten merkkijonoon.

Metodia kutsutaan kirjoittamalla olion nimen perään piste ja metodin nimi. Kun siis _funktiota_ `len` kutsutaan esim. näin:

`len("Moikka!")`

...kutsutaan metodia `find` esim. näin:

`"Moikka".find("Moi")`

</text-box>

Metodi `find` saa parametrikseen etsittävän osajonon, ja metodi palauttaa joko ensimmäisen indeksin, josta osajono löytyy tai `-1`, jos osajonoa ei löydy merkkijonosta.

Metodin syntaksi näyttää siis tältä:

<img src="3_2_4.png">

Esimerkkejä metodin käyttämisestä:

```python
mjono = "esimerkki"

print(mjono.find("m"))
print(mjono.find("x"))
print(mjono.find("erk"))
print(mjono.find("mrk"))
```

<sample-output>

3
-1
4
-1

</sample-output>

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
