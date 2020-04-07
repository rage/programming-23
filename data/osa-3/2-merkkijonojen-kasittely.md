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

kerto = int(input("Minkä kertotaulun haluat? "))

# silmukkamuuttuja
luku = 1
while luku <= 10:
    # Kootaan merkkijono "pala" kerrallaan
    # Lukutyypit muunnetaan merkkijonoiksi str-funktiolla
    rivi = str(luku)
    rivi = rivi + " * "
    rivi = rivi + str(kerto)
    rivi = rivi + " = "
    rivi = rivi + str(luku * kerto)

    print(rivi)

    # Lopuksi muistetaan kasvattaa silmukkamuuttujaa
    luku = luku + 1

```

<sample-output>

Minkä kertotaulun haluat? **7**
1 * 7 = 7
2 * 7 = 14
3 * 7 = 21
4 * 7 = 28
5 * 7 = 35
6 * 7 = 42
7 * 7 = 49
8 * 7 = 56
9 * 7 = 63
10 * 7 = 70

</sample-output>

Myös `*`-operaattoria voidaan käyttää merkkijonojen yhteydessä. Jos toinen operandi kertolaskussa on merkkijono ja toinen kokonaisluku, saadan lopputulokseksi samaa merkkijonoa monistettuna annettu määrä. Esimerkiksi `5 * "abc" == "abcabcabcabcabc"`.

Esimerkkinä ohjelma, joka piirtää pyramidin:

```python

# Muuttuja n kertoo tyhjien välien määrän
n = 10

while n > 0:
    rivi = ""
    # Alkuun tyhjiä
    rivi = n * " "

    # ...ja sen jälkeen tähtiä
    rivi = rivi + (10 - n) * "**"

    print(rivi)

    # Vähennetään yhdellä
    n = n - 1

```

<sample-output>

```
         **
        ****
       ******
      ********
     **********
    ************
   **************
  ****************
 ******************
```

</sample-output>

## Merkkijonon pituus ja indeksointi

Merkkijonon pituuden voi palauttaa `len`-funktion avulla. Funktio palauttaa parametrina annetun merkkijonon merkkien määrän kokonaislukuna. Esimerkiksi `len("moi")` palauttaisi 3, koska merkkijonossa "moi" on kolme merkkiä. Seuraava esimerkki tulostaa käyttäjän syöttämän merkkijonon "alleviivattuna" muodostamalla alleviivauksen monistamalla merkkiä "-" syötteen pituuden mukaisen määrän:

```python
# Luetaan syöte
mjono = input("Anna merkkijono: ")

# Muodostetaan "alleviivaus":
alleviivaus = "-" * len(mjono)

# Tulostetaan
print(mjono)
print(alleviivaus)

```

<sample-output>

Anna merkkijono: Moi kaikki!
Moi kaikki!
-----------

</sample-output>

Pituuteen lasketaan mukaan kaikki merkkijonossa olevat merkit, ja myös välilyönti lasketaan merkiksi. Niinpä merkkijonon `Moi moi` pituus on seitsemän merkkiä.

Yksittäinen merkki merkkijonosta voidaan palauttaa operaattorin `[]` avulla. Operaattori kirjoitetaan merkkijonon (yleensä merkkijonomuuttujan) perään, ja hakasulkeiden väliin kirjoitetaan halutun merkin _indeksi_ eli järjestysluku.

Huomaa, että merkkien indeksointi alkaa nollasta: ensimmäinen merkki on siis indeksin nolla kohdalla, toinen indeksin 1 kohdalla jne.

<img src="3_2_1.png">

Esimerkiksi

```python

merkkijono = "abcdef"

print(merkkijono[0])
print(merkkijono[1])
print(merkkijono[3])

```

Ohjelma tulostaa:

<sample-output>

a
b
d

</sample-output>


Koska merkkijonon ensimmäinen merkki on indeksin 0 kohdalla, on viimeinen merkki vastaavasti indeksin _pituus - 1_ kohdalla. Esimerkiksi:

```python

mjono = input("Anna merkkijono: ")

# Testataan, että pituus on yli yksi
# jotta merkkijonossa on eka ja toka merkki
if len(mjono) > 1:
    print("Eka merkki: " + mjono[0])
    print("Toka merkki: " + mjono[1])

    # Viimeinen merkki on paikassa pituus - 1
    print("Viimeinen merkki: " + mjono[len(mjono) - 1])

# Kaikki merkit alusta loppuun
indeksi = 0

# Toistetaan niin kauan kun indeksi on pienempi kuin pituus
while indeksi < len(mjono):
    # Tulosta yksi merkki
    print(mjono[indeksi])

    # ...ja kasvata indeksiä
    indeksi = indeksi + 1

```

<sample-output>

Anna merkkijono: Esimerkki
Eka merkki: E
Toka merkki: s
Viimeinen merkki: i
E
s
i
m
e
r
k
k
i

</sample-output>

Pythonissa merkkeihin voi viitata myös alkaen merkkijonon lopusta käyttämällä negatiivisia indeksejä. Merkkijonon viimeinen merkki on indeksin -1 kohdalla, toiseksi viimeinen indeksin -2 kohdalla jne. Yleensä onkin kätevämpi kirjoittaa `m[-1]` kuin `m[len(m) - 1]`.

<img src="3_2_2.png">

## Alijonot

Yksittäisten merkkien lisäksi merkkijonosta voidaan palauttaa _alijono_ (myös termiä _osajono_ käytetään). Käytännössä tämä tarkoittaa pienempää osaa tai "siivua" merkkijonosta, esimerkiksi lauseen yksittäistä sanaa.

Alijono palautetaan syntaksilla `merkkijono[alkuindeksi : loppuindeksi]`. Alkuindeksin kohdalla oleva merkki tulee mukaan alijonoon, mutta loppuindeksin kohdalla oleva ei tule. Indeksit kannattaakin ajatella esimerkiksi merkkien vasemmalle puolelle piirretyiksi viivoiksi alla olevan kuvan mukaisesti:

<img src="3_2_3.png">

Minkä takia indeksit sitten toimivat näin? Tähän lienee kaksi syytä: ensinnäkin, indeksit toimivat samalla tavalla useimmissa muissa ohjelmointikielissä (jolloin kielestä toiseen siirtyminen on helpompaa). Toinen syy lienee se, että kun loppuindeksin mukaista merkkiä ei oteta mukaan alijonoon, voidaan alijonon pituus laskea kaavalla `loppuindeksi - alkuindeksi`.

Seuraava esimerkki esittelee alijonojen palauttamista:

```python

# Merkkijono
esimerkkijono = "Moi kaikki!";

print(esimerkkijono[0:3])

toka_sana = esimerkkijono[4:10]
print(toka_sana)

# Alku- tai loppuparametrin voi jättää pois
# Alkuparametriksi oletetaan tällöin 0
# ja loppuparametriksi merkkijonon pituus
print(esimerkkijono[:2])
print(esimerkkijono[4:])

```

<sample-output>

Moi
kaikki
Mo
kaikki!

</sample-output>

Huomaa, että alijonoa palautettaessa Python hyväksyy myös merkkijonon alkua edeltävät tai lopun yli menevät indeksit. Yksittäistä merkkiä palauttaessa tällaisen indeksin käyttäminen antaa kuitenkin virheen.

Esimerkiksi

```python



```

## Alijonon etsiminen merkkijonosta

Yksittäisen merkin tai alijonon esiintyminen merkkijonossa voidaan selvittää `in`-operaattorin avulla. Lauseke `alijono in merkkijono` palauttaa arvon True, jos annettu alijono (tai yksittäinen merkki) löytyy merkkijonosta.

Esimerkiksi

```python

mjono = "Vesihiisi sihisi hississä"

print("V" in mjono)
print("v" in mjono)

if "sihisi hississä" in mjono:
    print("Kuulen sihinää")

if "Vesi " in mjono:
    print("Vettäkin on")
else:
    print("Vesi puuttuu")


```

<sample-output>

True
False
Kuulen sihinää
Vesi puuttuu

</sample-output>

Huomaa ero pienten ja isojen kirjaimien välillä: `v in mjono` evaluoituu arvoksi `False`, koska merkkijonosta `mjono` ei löydy pientä v-kirjainta.

Viimeinen ehtolause esimerkissä tulostaa `Vesi puuttuu`, koska merkkijonosta ei löydy alijonoa jossa sanaa Vesi seuraisi välilyönti: `Vesi `.

`in`-operaattori palauttaa tiedon alijonon esiintymisestä, muttei tietoa siitä _mistä se löytyy_. Tätä varten Pythonissa on _metodi_ `find`.

<text-box variant="hint">

Metodilla tarkoitetaan (yleensä) funktiota, joka on sidottu johonkin _objektiin_. Metodin toiminta kohdistuu siihen sidottuun objektiin.

Pythonissa metodia kutsutaan kirjoittamalla objektin perään piste ja metodin nimi. Kun siis _funktiota_ `len` kutsutaan esim. näin:

`len("Moikka!")`

...kutsutaan metodia `find` esim. näin:

`"Moikka".find("Moi")`

</text-box>

`find` saa parametrikseen etsittävän alijonon, ja palauttaa joko _ensimmäisen indeksin, josta alijono löytyy_ tai `-1`, jos alijonoa ei löydy merkkijonosta.

Metodin syntaksi näyttää siis tältä:

<img src="3_2_4.png">

Esimerkkejä metodin käyttämisestä:

```python

while True:
    mjono = input("Anna merkkijono, tyhjä lopettaa: ")

    # Jos tyhjä merkkijono, lopetetaan
    if mjono == "":
        break

    alijono = input("Anna alijono: ")

    # Etsitään alijono merkkijonosta...
    indeksi = mjono.find(alijono)

    # Tulostetaan
    if indeksi > -1:
        print("Alijono löytyy indeksin " + str(indeksi) + " kohdalta")
    else:
        print("Alijonoa ei löydy merkkijonosta.")

print("Kiitos alijonotuksesta.")

```

<sample-output>

Anna merkkijono, tyhjä lopettaa: **Vesihiisi sihisi**
Anna alijono: **hiisi**
Alijono löytyy indeksin 4 kohdalta
Anna merkkijono, tyhjä lopettaa: **abcabc**
Anna alijono: **abca**
Alijono löytyy indeksin 0 kohdalta
Anna merkkijono, tyhjä lopettaa: **sihisikö hiisi?**
Anna alijono: **Hiisi**
Alijonoa ei löydy merkkijonosta.
Anna merkkijono, tyhjä lopettaa:
Kiitos alijonotuksesta.

</sample-output>
