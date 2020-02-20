---
path: '/osa-2/3-ehtojen-yhdistäminen'
title: 'Ehtojen yhdistäminen'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat ketjuttaa Pythonin operaattoreita
- Tiedät mitä tarkoitetaan loogisilla operaattoreilla
- Osaat käyttää `and`-, `or`- ja `not`-operaattoreita ehtolausekkeissa
- Osaat kirjoittaa sisäkkäisiä ehtolauseita

</text-box>

Mitä tehdä tilanteissa, joissa yksi ehto ei riitä? Yhdellä ehtolausekkeella voidaan näppärästi testata, onko kokonaisluku pienempi kuin 10, mutta mitä jos halutaan kokonaisluku väliltä 2...8?

Pythonissa, toisin kuin useissa muissa ohjelmointikielissä, on mahdollista ketjuttaa useita ehtoja yhteen lausekkeeseen matematiikasta tutulla tavalla. Seuraava esimerkki tulostaa arvosanoista sanallisen arvion:

```python

arvosana = int(input("Anna arvosana (1-5): "))

if (arvosana == 1):
    print("Ei kovin hääppöinen arvosana.")
elif (2 <= arvosana <= 3):
    print("Kehityskelpoinen arvosana.")
else:
    print("Oikein hyvä arvosana!")

```

<sample-output>

Anna arvosana (1-5): **3**
Kehityskelpoinen arvosana.

</sample-output>

Ehto `2 <= arvosana <= 3` palauttaa arvon True jos arvosana on sekä suurempi tai yhtäsuuri kuin 2 että pienempi tai yhtäsuuri kuin 3.

Seuraavassa esimerkissä lasketaan nopeuteen perustuva sakko käyttäen oheista taulukkoa:

 nopeus | sakko
:-----|:------
< 50 | 0
51 - 70 | 200
71 - 80 | 500
81+ | 1000

```python

nopeus = int(input("Anna nopeus: "))

if nopeus < 50:
    sakko = 0
elif 50 < nopeus <= 70:
    sakko = 200
elif 70 < nopeus <= 80:
    sakko = 500
else:
    sakko = 1500

print("Sakkoa tupsahti " + str(sakko) + " euroa.")

```

Esimerkkisuoritus näyttä tältä, kun nopeudeksi annetaan 67:

<sample-output>

Anna nopeus: **67**
Sakkoa tupsahti 200 euroa.

</sample-output>

## Loogiset operaattorit: and

Pelkkä ehtojen ketjuttaminen ei kuitenkaan sekään aina riitä. Oletetaan tilanne, jossa ohjelman pitää ilmoitaa kasvaneesta riskistä mikäli henkilön ikä ylittää 50 ja paino 100 kiloa. Nyt haluamme siis yhdistää yhteen lausekkeeseen kaksi erillistä ehtoa.

Tämä onnistuu loogisilla operaattoreilla. Tarkastellaan aluksi `and`-operaattorin toimintaa edellä mainitun esimerkin avulla:

```python

paino = int(input("Anna paino: "))
ikä = int(input("Anna vielä ikä: "))

# Yhdistetään kaksi erillistä ehtoa
# yhdeksi ehtolausekkeeksi
if paino > 100 and ikä > 50:
    print("Riski on keskimääräistä suurempi.")
else:
    print("Normaali riski.")

```

Seuraavassa on ajettu ohjelma kahteen kertaan eri syötteillä:

<sample-output>

Anna paino: **106**
Anna vielä ikä: **44**
Normaali riski.

Anna paino: **105**
Anna vielä ikä: **59**
Riski on keskimääräistä suurempi.

</sample-output>


Esimerkissä koko ehtolause on tosi vain silloin kun molemmat `and`-operaattorilla toisiinsa yhdistetyt ehdot ovat tosia. Operaattori toimii siis jotakuinkin samoin kuin sana _ja_ puhekielessä: koko lause "muki on pöydällä ja siinä on kahvia" on totta vain silloin, kun molemmat ja-sanalla yhdistetyt osat ovat tosia. Jos jompikumpi (tai molemmat) ovat epätosia, muuttuu koko lause epätodeksi.

Operaattorilla voidaan yhdistää yhdeksi ehtolausekkeeksi niin monta ehtoa kuin halutaan. Esimerkiksi:

```python

# Kysy neljä lukua
n1 = int(input("Anna luku 1: "))
n2 = int(input("Anna luku 2: "))
n3 = int(input("Anna luku 3: "))
n4 = int(input("Anna luku 4: "))

# Selvitetään suurin luku
if n1 > n2 and n1 > n3 and n1 > n4:
    suurin = n1
elif n2 > n3 and n2 > n4:
    suurin = n2
elif n3 > n4:
    suurin = n3
else:
    suurin = n4

# ...ja tulostetaan
print(str(suurin) + " on suurin luku.")

```

<sample-output>

Anna luku 1: **2**
Anna luku 2: **4**
Anna luku 3: **1**
Anna luku 4: **1**
4 on suurin luku.

</sample-output>

Esimerkissä ensimmäisen ehtolauseke `n1 > n2 and n1 > n3 and n1 > n4` on tosi vain mikäli kaikki kolme ehtoa ovat tosia.


## Loogiset operaattorit: or ja not

Toinen usein tarvittava looginen operaattori on `or`. Kahden tai useamman `or`-operaattorilla yhdistetyn ehdon muodostama ehtolauseke on tosi, jos _vähintään yksi ehdoista on tosi_.

Esimerkiksi:

```python

nimi = input("Kerro etunimesi: ")

# Koko lauseke on tosi jos joku yhdistellyistä
# ehdoista on tosi
if nimi == "Tupu" or nimi == "Hupu" or nimi == "Lupu":
    print("Lienetkö Ankkojen sukua?")

```

<sample-output>

Kerro etunimesi: **Hupu**
Lienetkö Ankkojen sukua?

</sample-output>

Viimeinen Pythonin loogisista on `not`, joka kääntää totuusarvon vastakkaiseksi. Arvosta `True` tulee siis `False` ja arvosta `False` vastaavasti `True`. Operaation yhteydessä puhutaan myös _arvon komplementista_.

Esimerkiksi:

```python

# Onko lippu maksettu
maksettu = False

# Testataan, onko epätosi
if not maksettu:
    print("Lippua ei ole maksettu")
    ke = input("Haluatko maksaa k/e: ")
    if ke == "k":
        # Käännetään arvo
        maksettu = not maksettu

if maksettu:
    print("Nyt lippu on maksettu.")

```

Esimerkkitulostus:

<sample-output>

Lippua ei ole maksettu
Haluatko maksaa k/e: **k**
Nyt lippu on maksettu.

</sample-output>

Lauseke `maksettu = not maksettu` muuttaa muuttujan `maksettu` arvon komplementiksi. Järkevämpää olisi oikeastaan käyttää muotoa `maksettu = True`, jolloin esimerkiksi tuplamkasun yhteydessä maksutapahtuma ei katoaisi.

## Kaikki loogiset operaattorit

Alla olevassa taulukossa on kuvattu kaikkien loogisten operaattorien toiminta kahden operandin tapauksessa:

a   | b   | a and b | a or b | not a
:--:|:---:|:-------:|:------:|:----:
False | False | False | False | True
True | False | False | True | False
False | True | False | True | True
True | True | True | True | False

## Sisäkkäiset ehtolauseet

Ehtolauseita voidaan kirjoittaa toistensa sisään. Esimerkiksi seuraava ohjelma tunnistaa positiivista luvuista parittomat ja parilliset:

```python

luku = int(input("Anna luku: "))

# Testataan onko positiivinen
if luku >= 0:
    # Jos oli, testataan onko parillinen vai ei
    if luku % 2 == 0:
        print("Luku on parillinen")
    else:
        print("Luku on pariton")
# Jos ei ollut positiivinen...
else:
    print("Luku oli negatiivinen.")

```

Esimerkkitulostus kolmella eri syötteellä:

<sample-output>

Anna luku: **3**
Luku on pariton

Anna luku: **18**
Luku on parillinen

Anna luku: **-4**
Luku oli negatiivinen.

</sample-output>

Sisäkkäisiä ehtolauseita käytettäessä on tärkeä muistaa oikeat sisennykset: esimerkiksi `else`-haara yhdistetään oikeaan `if`-lauseeseen juuri saman sisennyksen perusteella.

Huomaa, että monissa tapauksissa voidaan käyttää joko sisäkkäisiä ehtolauseita tai loogisia operaattoreita. Seuraava esimerkki on toiminnallisesti sama kuin edellinen esimerkki (eli se tulostaa tiedon siitä onko positiivinen kokonaisluku parillinen vai pariton):

```python

luku = int(input("Anna luku: "))

# Testataan onko positiivinen ja parillinen
if luku > 0 and luku % 2 == 0:
    print("Luku on parillinen")
# ...tai onko positiivinen ja pariton
elif luku > 0 and luku % 2 != 0:
        print("Luku on pariton")
# Pakko olla negatiivinen
else:
    print("Luku oli negatiivinen.")

```

Se kumpaa tapaa käytetään pitää harkita tapauskohtaisesti. Edellisen esimerkin kohdalla ensimmäinen vaihtoehto näyttänee useimpien mielestä selkeämmältä.

