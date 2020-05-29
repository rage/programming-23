---
path: '/osa-2/3-ehtojen-yhdistäminen'
title: 'Ehtojen yhdistäminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat käyttää `and`-, `or`- ja `not`-operaattoreita ehdoissa
- Osaat kirjoittaa sisäkkäisiä ehtolauseita

</text-box>

## Loogiset operaattorit

Ehtojen yhdistämisessä voidaan käyttää loogisia operaattoreita `and` ja `or`.
Operaattori `and` vaatii, että useampi ehto pätee samaan aikaan,
ja operaattori `or` vaatii, että yksi tai useampi ehdoista pätee.

Esimerkiksi ehto `luku >= 5 and luku <= 8` vaatii,
että luku on samaan aikaan ainakin 5 ja enintään 8.
Toisin sanoen luvun tulee olla välillä 5..8.

```python
luku = int(input("Anna luku: "))
if luku >= 5 and luku <= 8:
    print("Luku on välillä 5..8")
```

Ehto `luku < 5 or luku > 8` puolestaan vaatii,
että luku on alle 5 tai yli 8.
Toisin sanoen luku ei saa olla välillä 5..8.

```python
luku = int(input("Anna luku: "))
if luku < 5 or luku > 8:
    print("Luku ei ole välillä 5..8")
```

Seuraava taulukko näyttää operaattoreiden toiminnan eri tilanteissa:

a   | b   | a and b | a or b |
:--:|:---:|:-------:|:------:|
False | False | False | False |
True | False | False | True |
False | True | False | True |
True | True | True | True |

Voimme käyttää ehdoissa myös operaattoria `not`, joka muuttaa ehdon
käänteiseksi. Esimerkiksi voisimme toteuttaa äskeisen koodin myös näin:

```python
luku = int(input("Anna luku: "))
if not (luku >= 5 and luku <= 8):
    print("Luku ei ole välillä 5..8")
```

<text-box variant='hint' name='Ehtojen ketjuttaminen'>

Ehto `x >= a and x <= b` on tavallinen tapa testata,
onko luku `x` välillä `a`..`b`.
Tällainen ehto toimii samalla tavalla eri ohjelmointikielissä.

Python-kielen erikoisuutena on, että myös lyhyempi ehto
`a <= x <= b` toimii, eli ehtoja on mahdollista ketjuttaa.
Tällaisia ehtoja käytetään kuitenkin melko harvoin,
ehkä tottumuksesta muihin ohjelmointikieliin.

</text-box>

## Lisää ehtoja

Seuraava ohjelma kysyy käyttäjältä neljä lukua ja selvittää sitten
luvuista suurimman ehtojen avulla:

```python
n1 = int(input("Anna luku 1: "))
n2 = int(input("Anna luku 2: "))
n3 = int(input("Anna luku 3: "))
n4 = int(input("Anna luku 4: "))

if n1 > n2 and n1 > n3 and n1 > n4:
    suurin = n1
elif n2 > n3 and n2 > n4:
    suurin = n2
elif n3 > n4:
    suurin = n3
else:
    suurin = n4

print(suurin, "on suurin luku.")
```

<sample-output>

Anna luku 1: **2**
Anna luku 2: **4**
Anna luku 3: **1**
Anna luku 4: **1**
4 on suurin luku.

</sample-output>

Esimerkissä ensimmäinen ehto `n1 > n2 and n1 > n3 and n1 > n4` on tosi vain, mikäli kaikki kolme ehtoa ovat tosia.

<in-browser-programming-exercise name="Iän tarkistus" tmcname="osa02-8_ian_tarkistus">

Tee ohjelma, joka kysyy käyttäjän ikää. Jos ikä ei ole uskottava (se on alle 5 tai mahdoton luku iälle), antaa ohjelma siihen liittyvän kommentin.

Vinkki: tarkastele esimerkkisuorituksia löytääksesi oikean vastineen eri vaihtoehdoille.

Esimerkkitulostuksia:

<sample-output>

Kerro ikäsi? **13**
Ok, olet siis 13-vuotias

</sample-output>

<sample-output>

Kerro ikäsi? **2**
En usko että osaat kirjoittaa...

</sample-output>

<sample-output>

Kerro ikäsi? **-4**
Taitaa olla virhe

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Veljenpojat" tmcname="osa02-9_veljenpojat">

Tee ohjelma, joka kysyy käyttäjän nimeä. Jos nimeksi syötetään Tupu, Hupu tai Lupu, ohjelma tunnistaa käyttäjän Aku Ankan veljenpojaksi.

Jos nimeksi annetaan Mortti tai Vertti, ohjelma vastaavasti tunnistaa käyttäjän Mikki Hiiren veljenpojaksi.

Esimerkkitulostuksia:

<sample-output>

Anna nimesi: **Mortti**
Olet luultavasti Mikki Hiiren veljenpoika.

</sample-output>

<sample-output>

Anna nimesi: **Hupu**
Olet luultavasti Aku Ankan veljenpoika.

</sample-output>

<sample-output>

Anna nimesi: **Keijo**
Et ole kenenkään tuntemani hahmon veljenpoika.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Arvosana ja pisteet" tmcname="osa02-10_arvosana_ja_pisteet">

Alla oleva taulukko kuvaa erään kurssin arvosanan muodostumista. Tee ohjelma, joka ilmoittaa kurssiarvosanan annetun taulukon mukaisesti.

pistemäärä   | arvosana
:--:|:----:
< 0 |  mahdotonta!
0-49 | hylätty
50-59 | 1
60-69 | 2
70-79 | 3
80-89| 4
90-100 | 5
> 100 |  mahdotonta!

Esimerkkitulostuksia:

<sample-output>

Anna pisteet [0-100]: **37**
Arvosana: hylätty

</sample-output>

<sample-output>

Anna pisteet [0-100]: **76**
Arvosana: 3

</sample-output>

<sample-output>

Anna pisteet [0-100]: **-3**
Arvosana: mahdotonta!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="FizzBuzz" tmcname="osa02-11_fizzbuzz">

Ohjelma kysyy käyttäjältä lukua. Jos luku on jaolleinen kolmella, tulostetaan Fizz. Jos luku on jaollinen viidellä, tulostetaan Buzz. Jos luku on jaollinen sekä kolmella, että viidellä, tulostetaan FizzBuzz

Esimerkkitulostuksia:

<sample-output>

Luku: **9**
Fizz

</sample-output>

<sample-output>

Luku: **7**

</sample-output>

<sample-output>

Luku: **20**
Buzz

</sample-output>

<sample-output>

Luku: **45**
FizzBuzz

</sample-output>

</in-browser-programming-exercise>

## Sisäkkäiset ehtolauseet

Ehtolauseita voidaan kirjoittaa toistensa sisään. Esimerkiksi seuraava ohjelma tunnistaa positiivisista luvuista parittomat ja parilliset:

```python
luku = int(input("Anna luku: "))

if luku >= 0:
    if luku % 2 == 0:
        print("Luku on parillinen")
    else:
        print("Luku on pariton")
else:
    print("Luku on negatiivinen")
```

Esimerkkitulostus kolmella eri syötteellä:

<sample-output>

Anna luku: **3**
Luku on pariton

Anna luku: **18**
Luku on parillinen

Anna luku: **-4**
Luku on negatiivinen

</sample-output>

Sisäkkäisiä ehtolauseita käytettäessä on tärkeä muistaa oikeat sisennykset. Esimerkiksi `else`-haara yhdistetään oikeaan `if`-lauseeseen juuri saman sisennyksen perusteella.

Huomaa, että monissa tapauksissa voidaan käyttää joko sisäkkäisiä ehtolauseita tai loogisia operaattoreita. Seuraava esimerkki on toiminnallisesti sama kuin edellinen esimerkki, eli se tulostaa tiedon siitä, onko positiivinen kokonaisluku parillinen vai pariton.

```python
luku = int(input("Anna luku: "))

if luku > 0 and luku % 2 == 0:
    print("Luku on parillinen")
elif luku > 0 and luku % 2 != 0:
    print("Luku on pariton")
else:
    print("Luku on negatiivinen.")
```

Tilanteesta riippuu, kumpaa tapaa kannattaa käyttää. Tässä esimerkissä ensimmäinen vaihtoehto tuntuu useimpien mielestä paremmalta.


<in-browser-programming-exercise name="Karkausvuosi" tmcname="osa02-12_karkausvuosi">

Vuosi on karkausvuosi, jos se on jaollinen 4:llä. Kuitenkin jos vuosi on jaollinen 100:lla, se on karkausvuosi vain silloin, kun se on jaollinen myös 400:lla.

Tee ohjelma, joka lukee käyttäjältä vuosiluvun, ja tarkistaa, onko vuosi karkausvuosi.

<sample-output>

Anna vuosi: **2011**
Vuosi ei ole karkausvuosi.

</sample-output>

<sample-output>

Anna vuosi: **2020**
Vuosi on karkausvuosi.

</sample-output>

<sample-output>

Anna vuosi: **1800**
Vuosi ei ole karkausvuosi.

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Aakkosjärjestyksessä keskimmäinen" tmcname="osa02-13_aakkosjarjestyksessa_keskimmainen">

Tee ohjelma, joka kysyy käyttäjältä kolme kirjainta. Ohjelma tulostaa kirjaimista aakkosjärjestyksessä keskimmäisen.

Voit olettaa, että kirjaimet ovat joko kaikki isoja tai kaikki pieniä kirjaimia.

Esimerkkisuorituksia:

<sample-output>

Anna 1. kirjain: x
Anna 2. kirjain: c
Anna 3. kirjain: p
Keskimmäinen kirjain on p

</sample-output>

<sample-output>

Anna 1. kirjain: C
Anna 2. kirjain: B
Anna 3. kirjain: A
Keskimmäinen kirjain on B

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Lahjaverolaskuri" tmcname="osa02-14_lahjaverolaskuri">

<https://www.vero.fi/henkiloasiakkaat/omaisuus/lahja/> Lahja tarkoittaa sitä, että omaisuus siirtyy toiselle henkilölle ilman korvausta. Lahjasta pitää maksaa lahjaveroa, jos samalta lahjanantajalta saatujen lahjojen arvo on kolmen vuoden aikana 5 000 euroa tai enemmän.

Kun lahja tulee lähimmiltä sukulaisilta, lahjaveron määrä määräytyy seuraavan taulukon mukaan (lähde <vero.fi>):

Lahja	| Vero alarajalla|	Veroprosentti ylimenevästä
:--:|:----:|:----:
5 000 — 25 000 |	100	|8
25 001 — 55 000	| 1 700|	10
55 001 — 200 000|	4 700	|12
200 001 — 1 000 000	|22 100|	15
1 000 001 —	|142 100|	17

Esimerkiksi 6000 euron lahjasta tulee maksaa veroa 180 euroa (100 + (6000-5000) * 0.08), ja 75000 euron lahjasta tulee maksaa veroa 7100 euroa (4700 + (75000-55000) * 0.12).

Tee ohjelma, joka laskee lahjaveron lähimmiltä sukulaisilta annetulle lahjalle. Alla on muutama esimerkki ohjelman toiminnasta.

<sample-output>

Lahjan suuruus? **3500**
Ei veroa!

</sample-output>

<sample-output>

Lahjan suuruus? **5000**
Vero: 100.0 euroa

</sample-output>

<sample-output>

Lahjan suuruus? **27500**
Vero: 1950.0 euroa

</sample-output>

</in-browser-programming-exercise>

