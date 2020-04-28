---
path: '/osa-2/4-yksinkertainen-silmukka'
title: 'Yksinkertainen silmukka'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Toimintojen toistaminen on eräs tehokkaimmista työkaluista ohjelmoinnissa: aloitetaan siis tutustuminen toistolauseeseen.

Tämän osion suoritettuasi

- Tiedät, mitä tarkoitetaan toistolauseella
- Osaat käyttää yksinkertaista `while(True)`-silmukkaa osana ohjelmaasi
- Tiedät, miten toisto voidaan katkaista `break`-komennolla

</text-box>

Toisto on ehtolauseen lisäksi keskeinen ohjausrakenne ohjelmoinnissa. Aloitetaan toistoon tutustuminen tarkastelemalla Pythonin `while`-lausetta yksinkertaisten esimerkkien kautta. Ensi viikolla tutustutaan sitten monipuolisemmin sen mahdollisuuksiin.

Periaatteessa `while`-lause muistuttaa ehtolausetta. Ideana kuitenkin on, että sen avulla voidaan toistaa samaa koodia useamman kerran.

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

Kuten esimerkistä huomataan, ohjelman suoritus jatkuu `while`-lauseen ansiosta niin kauan, että suoritetaan lause `break`. Heti kun `break`-komento suoritetaan eli kun käyttäjän syöte on -1, hyppää suoritus ensimmäiselle lohkon jälkeiselle riville.

Seuraavassa esimerkkinä ohjelma, joka päästää käyttän "kirjautumaan" vasta sen jälkeen kun käyttäjä on syöttänyt oikean pinkoodin _1234_:

```python
while True:
    tunnus = input("pinkoodi: ")

    if tunnus == "1234":
        break

    print("väärin... yritä uudelleen")


print("Pinkoodi oikein!")
```

<sample-output>

pinkoodi: **0000**
väärin... yritä uudelleen
pinkoodi: **9999**
väärin... yritä uudelleen
pinkoodi: **1234**
väärin... yritä uudelleen
Pinkoodi oikein!

</sample-output>

Tehdään vielä samasta ohjelmasta monimutkaisempi versio, joka antaa käyttäjälle vain kolme mahdollisuutta yrittää pinkoodin syöttämistä.

Ohjelma käyttää nyt kahta apumuuttujaa, `yritykset` pitää kirjaa siitä, kuinka monta kertaa käyttäjä on syöttänyt.  Muuttja `onnistui` saa arvokseen joko `True` tai `False` riippuen siitä onnistuuko kirjautuminen.

```python
yritykset = 0

while True:
    tunnus = input("pinkoodi: ")
    yritykset = yritykset + 1

    if tunnus == "1234":
        onnistui = True
        break

    if yritykset > 3:
        onnistui = False
        break

    # tänne tullaan jos väärin JA ei ole jo kolmea yritystä
    print("väärin... yritä uudelleen")


if onnistui==True:
  print("Pinkoodi oikein!")
else:
  print("Liian monta yritystä...")
```

<sample-output>

pinkoodi: **0000**
väärin... yritä uudelleen
pinkoodi: **1234**
Pinkoodi oikein!

</sample-output>

<sample-output>

pinkoodi: **0000**
väärin... yritä uudelleen
pinkoodi: **9999**
väärin... yritä uudelleen
pinkoodi: **4321**
Liian monta yritystä...

</sample-output>

Silmukasta tullaan siis ulos jos käyttäjä syöttää oikean pinkoodin _tai_ jos yrityksiä tehdään liian monta. Toistolauseen jälkeinen _if_-lause tarkastaa muutujan `onnistui` arvon perusteella sen onko "kirjautuminen" onnistunut vai ei.
