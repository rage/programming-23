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
Väärin... yritä uudelleen
Anna PIN-koodi oikein!

</sample-output>

Tehdään vielä samasta ohjelmasta monimutkaisempi versio, joka antaa käyttäjälle vain kolme mahdollisuutta yrittää PIN-koodin syöttämistä.

Ohjelma käyttää nyt kahta apumuuttujaa. Muuttuja `yritykset` pitää kirjaa siitä, kuinka monta kertaa käyttäjä on syöttänyt koodin.  Muuttuja `onnistui` saa arvokseen joko `True` tai `False` riippuen siitä, onnistuuko kirjautuminen.

```python
yritykset = 0

while True:
    tunnus = input("Anna PIN-koodi: ")
    yritykset += 1

    if tunnus == "1234":
        onnistui = True
        break

    if yritykset > 3:
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

<in-browser-programming-exercise name="Lukujen käsittelyä" tmcname="osa02-23_lukujen_kasittelya">

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
