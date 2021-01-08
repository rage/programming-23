---
path: '/osa-2/4-yksinkertainen-silmukka'
title: 'Yksinkertainen silmukka'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, mitä silmukka tarkoittaa ohjelmoinnissa
- Osaat käyttää `while True` -silmukkaa osana ohjelmaasi
- Tiedät, miten toisto voidaan katkaista `break`-komennolla

</text-box>

Silmukka eli toistolause on ehtolauseen lisäksi keskeinen ohjausrakenne ohjelmoinnissa. Aloitetaan toistamiseen tutustuminen tarkastelemalla Pythonin `while`-silmukkaa yksinkertaisten esimerkkien kautta. Ensi viikolla tutustutaan sitten monipuolisemmin sen mahdollisuuksiin.

Periaatteessa silmukka muistuttaa ehtolausetta. Ideana kuitenkin on, että sen avulla voidaan toistaa samaa koodia useamman kerran.

Tarkastellaan esimerkkiä, jossa ohjelma laskee käyttäjän syöttämien lukujen neliöitä niin kauan, että käyttäjä syöttää negatiivisen luvun:

```python
while True:
    luku = int(input("Anna luku, -1 lopettaa: "))

    if luku == -1:
        break

    print(luku ** 2)

print("Kiitos ja moi!")
```

Ohjelman esimerkkisuoritus:

<sample-output>

Anna luku, -1 lopettaa: **2**
4
Anna luku, -1 lopettaa: **4**
16
Anna luku, -1 lopettaa: **10**
100
Anna luku, -1 lopettaa: **-1**
Kiitos ja moi!

</sample-output>

Kuten esimerkistä huomataan, ohjelman kysyy `while`-lauseen ansiosta käyttäjältä useita lukuja. Sitten kun käyttäjän syöte on -1, suoritetaan `break`-komento, jolloin suoritus hyppää ensimmäiselle lohkon jälkeiselle riville.

Silmukoita käytettäessä on oltava tarkkana, että ei jouduta tilanteeseen, missä silmukan suoritus ei koskaan lopu. Muutetaan edellistä esimerkkiä seuraavasti

```python
luku = int(input("Anna luku, -1 lopettaa: "))
while True:
    if luku == -1:
        break

    print(luku ** 2)

print("Kiitos ja moi!")
```

Nyt siis lukua kysytään _silmukan ulkopuolella_. Jos käyttäjä antaa minkä tahansa muun luvun kuin -1:n, ei silmukasta tulla koskaan pois, eli syntyy _ikuinen silmukka_. Tällöin silmukassa olevaa lohkoa suoritetaan ikuisesti:

<sample-output>

Anna luku, -1 lopettaa: **2**
4
4
4
4
4
4
4
4
(jatkuu ikuisesti...)

</sample-output>

Seuraavassa esimerkkinä ohjelma, joka antaa käyttäjän jatkaa eteenpäin vasta sen jälkeen, kun käyttäjä on syöttänyt oikean PIN-koodin _1234_:

```python
while True:
    koodi = input("Anna PIN-koodi: ")
    if koodi == "1234":
        break
    print("Väärin... yritä uudelleen")

print("PIN-koodi oikein!")
```

<sample-output>

Anna PIN-koodi: **0000**
Väärin... yritä uudelleen
Anna PIN-koodi: **9999**
Väärin... yritä uudelleen
Anna PIN-koodi: **1234**
PIN-koodi oikein!

</sample-output>

<in-browser-programming-exercise name="Jatketaanko" tmcname="osa02-15_jatketaanko">

Kirjoita edellä olevaa toistolause-esimerkkiä mukaillen ohjelma, joka tulostaa viestin "moi" ja kysyy käyttäjältä "Jatketaanko?" kunnes käyttäjä syöttää merkkijonon "ei". Tämän jälkeen tulostetaan merkkijono "ei sitten" ja suoritus päättyy.

Esimerkkitulostus

<sample-output>

moi
Jatketaanko? **kyllä**
moi
Jatketaanko? **yes**
moi
Jatketaanko? **jawohl**
moi
Jatketaanko? **ei**
ei sitten

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Syötteen rajaus" tmcname="osa02-16_syotteen_rajaus">

Kirjoita ohjelma, joka kysyy käyttäjältä lukuja. Mikäli luku on negatiivinen (eli pienempi kuin nolla), käyttäjälle tulostetaan viesti "Epäkelpo luku" ja käyttäjältä kysytään uutta lukua. Jos taas luku on nolla, lukujen lukeminen lopetetaan ja ohjelma poistuu toistolauseesta.

Mikäli luku on positiivinen, ohjelma tulostaa luvun neliöjuuren käyttäen `sqrt`-funktiota, joka on tuotu ohjelmaan `import`-lauseella. Esimerkki funktion käytöstä:

```python
# Tämä pitää olla ohjelman alussa, jotta sqrt toimii
from math import sqrt

print(sqrt(9))
```

<sample-output>

3.0

</sample-output>

Esimerkki ohjelman suorituksesta:

<sample-output>

Syötä luku: **16**
4.0
Syötä luku: **4**
2.0
Syötä luku: **-3**
Epäkelpo luku
Syötä luku: **1**
1.0
Syötä luku: **0**
Lopetetaan...

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Lähtölaskenta" tmcname="osa02-17_lahtolaskenta">

Tehtäväpohjassa olevan ohjelman

```python
luku = 5
print("Lähtölaskenta!")
while True:
  print(luku)
  luku = luku - 1
  if luku > 0:
    break

print("Nyt!")
```

olisi tarkoitus toimia seuraavasti:

<sample-output>

Lähtölaskenta!
5
4
3
2
1
Nyt!

</sample-output>

Korjaa ohjelmassa oleva ongelma.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Salasana uudelleen" tmcname="osa02-18_salasana_uudelleen">

Tee ohjelma, joka kysyy käyttäjältä salasanaa ja tämän jälkeen pyytää toistamaan salasanan niin kauan, kunnes käyttäjä syöttää ensimmäisenä annetun salasanan uudelleen.

<sample-output>

Salasana: **sekred**
Toista salasana: **salainen**
Ei ollut sama!
Toista salasana: **enmuistaenää123**
Ei ollut sama!
Toista salasana: **sekred**
Käyttäjätunnus luotu!

</sample-output>

</in-browser-programming-exercise>

## silmukka ja apumuuttujat

Tehdään vielä PIN-koodin tarkastavasta ohjelmasta monimutkaisempi versio, joka antaa käyttäjälle vain kolme mahdollisuutta yrittää PIN-koodin syöttämistä.

Ohjelma käyttää nyt kahta apumuuttujaa. Muuttuja `yritykset` pitää kirjaa siitä, kuinka monta kertaa käyttäjä on syöttänyt koodin.  Muuttuja `onnistui` saa arvokseen joko `True` tai `False` riippuen siitä, onnistuuko kirjautuminen.

```python
yritykset = 0

while True:
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1

    if tunnus == "1234":
        onnistui = True
        break

    if yritykset == 3:
        onnistui = False
        break

    # tänne tullaan jos väärin JA ei ole jo kolmea yritystä
    print("Väärin... yritä uudelleen")

if onnistui:
    print("Pinkoodi oikein!")
else:
    print("Liian monta yritystä...")
```

<sample-output>

Anna PIN-koodi: **0000**
Väärin... yritä uudelleen
Anna PIN-koodi: **1234**
PIN-koodi oikein!

</sample-output>

<sample-output>

Anna PIN-koodi: **0000**
Väärin... yritä uudelleen
Anna PIN-koodi: **9999**
Väärin... yritä uudelleen
Anna PIN-koodi: **4321**
Liian monta yritystä...

</sample-output>

Silmukasta tullaan siis ulos, jos käyttäjä syöttää oikean PIN-koodin _tai_ jos yrityksiä tehdään liian monta. Silmukan jälkeinen if-lause tarkastaa muuttujan `onnistui` arvon perusteella, onko kirjautuminen onnistunut vai ei.

## pro-tip: debuggaustulostus silmukassa

Kun ohjelmat alkavat sisältää silmukoita, kasvavat mahdolliset bugienkin lähteet ihan uudelle tasolle, ja tämän osan [ensimmäisessä luvussa](/osa-2/1-ohjelmoinnin-termeja) mainittujen debugtulostuksien teko muuttuu entistäkin tärkeämmäksi.

Esim. jos edellinen esimerkki olisi koodattu hieman väärin:

```python
yritykset = 0

while True:
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1

    if yritykset == 3:
        onnistui = False
        break

    if tunnus == "1234":
        onnistui = True
        break

    print("Väärin... yritä uudelleen")

if onnistui:
    print("Pinkoodi oikein!")
else:
    print("Liian monta yritystä...")
```

ohjelma toimii kummalliseti, se antaa yrittää PIN-koodia kolmesti, mutta valittaa että yrityksiä on liian monta vaikka lopussa syötettiin oikea koodi:

<sample-output>

Anna PIN-koodi: **0000**
Väärin... yritä uudelleen
Anna PIN-koodi: **9999**
Väärin... yritä uudelleen
Anna PIN-koodi: **1234**
Liian monta yritystä...

</sample-output>

Bugin syy selviää lisäämällä sopivia debug-tulostuksia:

```python
while True:
    print("whilen lohko alkaa:")
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1

    print("yritykset:", yritykset)
    print("ehto1:", yritykset == 3)
    if yritykset == 3:
        onnistui = False
        break

    print("tunnus:", tunnus)
    print("ehto2:", tunnus == "1234")
    if tunnus == "1234":
        onnistui = True
        break

    print("Väärin... yritä uudelleen")
```

<sample-output>

whilen lohko alkaa:
Anna PIN-koodi: **2233**
yritykset: 1
ehto1: False
tunnus: 2233
ehto2: False
Väärin... yritä uudelleen
whilen lohko alkaa:
Anna PIN-koodi: **4545**
yritykset: 2
ehto1: False
tunnus: 4545
ehto2: False
Väärin... yritä uudelleen
whilen lohko alkaa:
Anna PIN-koodi: **1234**
yritykset: 3
ehto1: True
Liian monta yritystä...

</sample-output>

Kun tulostuksia silmäillään hieman huomataan, että kolmannella while-lohkon suorituksella ensimmäisen _if_-komennon ehto on arvoltaan tosi, ja silmukasta poistutaan ennen kuin ehditään tarkastaa oliko juuri syötetty salasana oikein:

```python
  while True:
    # ....

    # tämä lohko on liian aikaisin
    if yritykset == 3:
        onnistui = False
        break

    # tänne ei päästä enää kolmannella yrityksellä...
    if tunnus == "1234":
        onnistui = True
        break
```

<in-browser-programming-exercise name="PIN ja yritysten määrä" tmcname="osa02-19_pin_ja_yritysten_maara">

Tee sovellus, joka kysyy käyttäjältä PIN-koodia niin kauan, kunnes käyttäjä antaa oikean PIN-koodin _4321_. Ohjelma kertoo yritysten lukumäärän:

<sample-output>

PIN-koodi: **3245**
Väärin
PIN-koodi: **1234**
Väärin
PIN-koodi: **0000**
Väärin
PIN-koodi: **4321**
Oikein, tarvitsit 4 yritystä

</sample-output>

Tulostus on hieman erilainen jos PIN-koodi on oikea heti ensimmäiselä yrityksellä:

<sample-output>

PIN-koodi: **4321**
Oikein, tarvitsit vain yhden yrityksen!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Seuraava karkausvuosi" tmcname="osa02-20_seuraava_karkausvuosi">

Tee ohjelma, joka kyselee käyttäjältä vuosilukua ja kertoo milloin on seuraava karkausvuosi.

<sample-output>

Vuosi: **2019**
Vuotta 2019 seuraava karkausvuosi on 2020

</sample-output>

Jos käyttäjän syöttämä vuosi on karkausvuosi (kuten esim. 2020) ei ohjelma kerro tätä vuotta vaan sitä seuraavan karkausvuoden:

<sample-output>

Vuosi: **2020**
Vuotta 2020 seuraava karkausvuosi on 2024

</sample-output>

</in-browser-programming-exercise>

## Merkkijonon kokoaminen plus-operaattorilla

PIN-koodin tarkastavassa esimerkissä käytimme apumuuttujaa `yritykset` pitämään kirjaa siitä kuinka monta kertaa PIN-koodi on syötetty:

```python
yritykset = 0

while True:
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1
    # ...
```

Muuttuja alustetaan arvoon nolla silmukan ulkopuolella, ja jokainen silmukan suoritus kasvattaa sen arvoa yhdellä.

Vastaava idea toimii myös merkkijonoille. Voisimme laajentaa ohjelmaa siten, että se kokoaa yhteen merkkijonoon kaikki käyttäjän syöttämät PIN-koodit:

```python

tunnukset = ""
yritykset = 0

while True:
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1
    tunnukset += tunnus + ", "
    # ...
```

Apumuuttuja saa aluksi arvokseen _tyhjän merkkijonon_, eli merkkijonon jonka pituus on nolla:

```python
tunnukset = ""
```

Silmukan sisällä merkkijonoa kasvatetaan lisäämällä siihen aina silmukassa syötetty tunnus ja pilkku:

```python
    tunnus = input("Anna PIN-koodi: ")
    tunnukset += tunnus + ", "
```

Jos käyttäjä syöttäisi tunnukset _1111 2222 1234_ olisi muuttujan `tunnukset` arvo lopulta

<sample-output>

1111, 2222, 1234,

</sample-output>


<in-browser-programming-exercise name="Tarina" tmcname="osa02-21_tarina">

### Osa 1

Tee ohjelma, joka pyytää käyttäjää syöttämään sanoja. Kun käyttäjä syöttää sanan `loppu`, ohjelma tulostaa sanoista muodostuneen tarinan ja suoritus päättyy.

<sample-output>

Anna sana: **Olipa**
Anna sana: **kerran**
Anna sana: **pieni**
Anna sana: **talo**
Anna sana: **preerialla**
Anna sana: **loppu**
Olipa kerran pieni talo preerialla

</sample-output>

### Osa 2

Muokkaa edellisen tehtävän ohjelmaa niin, että sanojen syöttäminen päättyy, jos käyttäjä syöttää sanan `loppu` tai käyttäjä syöttää saman sanan kaksi kertaa peräkkäin.

<sample-output>

Anna sana: **Alussa**
Anna sana: **oli**
Anna sana: **suo**
Anna sana: **kuokka**
Anna sana: **ja**
Anna sana: **Jussi**
Anna sana: **Jussi**
Alussa oli suo kuokka ja Jussi

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Lukujen käsittelyä" tmcname="osa02-22_lukujen_kasittelya">

Tee ohjelma, joka pyytää käyttäjää syöttämään kokonaislukuja. Ohjelma pyytää lukuja niin kauan kunnes käyttäjä syöttää nollan.

<sample-output>

Syötä kokonaislukuja, 0 lopettaa:
Luku: **5**
Luku: **22**
Luku: **9**
Luku: **-2**
Luku: **0**

</sample-output>

### Osa 1: lukumäärä

Syötteiden lukemisen jälkeen ohjelman tulee tulostaa syötettyjen lukujen lukumäärä. Syötteen loppumisesta kertovaa nollaa ei tule ottaa huomioon lukumäärässä.

Tarvitset tässä uuden muuttujan, jonka avulla pidät kirjaa luettujen lukujen määrästä.

<sample-output>

... lukujen kysely
Lukuja yhteensä 4

</sample-output>

### Osa 2: summa

Laajenna ohjelmaa siten, että se tulostaa syötettyjen lukujen summa. Syötteen loppumisesta kertovaa nollaa ei tule ottaa huomioon summan laskemisessa.

Ohjelman tulostus laajenee seuraavasti:

<sample-output>

... lukujen kysely
Lukuja yhteensä 4
Lukujen summa 34

</sample-output>

### Osa 3: keskiarvo

Laajenna ohjelmaa siten, että se tulostaa syötettyjen lukujen keskiarvon. Syötteen loppumisesta kertovaa nollaa ei tule ottaa huomioon keskiarvon laskemisessa. Voit olettaa, että käyttäjä syöttää aina vähintään yhden luvun.

<sample-output>

... lukujen kysely
Lukuja yhteensä 4
Lukujen summa 34
Lukujen keskiarvo 8.5

</sample-output>

#### Osa 4: positiiviset ja negatiiviset

Laajenna ohjelmaa siten, että se tulostaa positiivisten ja negatiivisten lukujen lukumäärät

<sample-output>

... lukujen kysely
Lukuja yhteensä 4
Lukujen summa 34
Lukujen keskiarvo 8.5
Positiivisia 3
Negatiivisia 1

</sample-output>

</in-browser-programming-exercise>

<quiz id="63a51999-e525-5f1d-a333-b26392a5585b"></quiz>

Vastaa lopuksi koko toista osaa koskevaan loppukyselyyn:

<quiz id="90b0d94a-54b0-5c0f-aa19-9832ae67e9b9"></quiz>
