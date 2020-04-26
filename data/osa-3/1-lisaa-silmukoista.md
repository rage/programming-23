---
path: '/osa-3/1-lisaa-silmukoista'
title: 'Lisää silmukoista'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Toistolauseet tarjoavat monipuolisia mahdollisuuksia toiston ohjaamiseen - jatketaan siis niihin tutustumista.

Tämän osion suoritettuasi

- Ymmärrät mitä tarkoitetaan _esiehtoisella toistolla_
- Tiedät mikä merkitys _alustuksella, ehdolla_ ja _muutoksella_ on toistolauseessa
- Osaat muodostaa silmukoita käyttäen `while`-lausetta

</text-box>

Viime osan lopussa opeteltiin käyttämään `while True` -silmukkaa toistuvan toiminnallisuuden aikaansaamiseksi. Itse asiassa `while`-lause mahdollistaa huomattavasti monipuolisempien toistorakenteiden muodostamisen.

Tällainen toistolause on yleisesti muotoa:

```python
while <ehtolauseke>:
    <lohko>
```

Toistolause vuorotellen tarkastaa ehdon ja suorittaa lohkossa olevan koodin, jos ehto pätee. Sitten kun ehto ei päde, ohjelman suoritus jatkuu toistolauseen jälkeiseltä riviltä.

<img src="3_1_1.png">

Esimerkiksi

```python
luku = 1

while luku < 10:
    print(luku)
    luku += 1
    
print("Suoritus valmis.")
```

<sample-output>

1
2
3
4
5
6
7
8
9
Suoritus valmis.

</sample-output>


Koska ehto tarkastetaan aina ennen lohkon suoritusta, on mahdollista, ettei lohkoa suoriteta kertaakaan. Esimerkiksi:

```python
luku = int(input("Anna luku: "))

while luku < 10:
    print(luku)
    luku += 1

print("Suoritus valmis.")
```

Jos syötteeksi annetaan luku, joka ei ole pienempi kuin 10, ei lohkoa suoriteta kertaakaan:

<sample-output>

Anna luku: 11
Suoritus valmis.

</sample-output>

## Alustus, testaus ja muutos

Monessa silmukassa on kolme osaa:

* _alustus_,
* _testaus_ ja
* _muutos_.

_Alustuksella_ tarkoitetaan silmukassa käytettävän muuttujan tai muuttujien alkuarvojen antamista. Tämä vaihe tehdään yleensä ennen toistolausetta. _Testaus_ kirjoitetaan `while`-lauseen yhteyteen, ja se määrittelee ehdon, jonka ollessa tosi silmukka suoritetaan. Joka kierroksella tapahtuva _muutos_ vie silmukan askeleen lähemmäs sen loppumista. Esimerkiksi

<img src="3_1_2.png">

Jos jokin kolmesta osasta puuttuu, toistolause joko ei toimi ollenkaan tai ei pääty koskaan. Tyypillinen virhe onkin muutos-osan unohtaminen:

```python
luku = 1

while luku < 10:
    print(luku)
    
print("Suoritus valmis.")
```

Koska muuttujan `luku` arvo ei koskaan muuutu, jää ohjelma suoritettaessa "ikuiseen silmukkaan", eli toistaa samaa koodia, kunnes käyttäjä katkaisee ohjelman suorituksen (esimerkiksi painamalla `CTRL` + `C`):

<sample-output>

1
1
1
1
1
...jne

</sample-output>


## Ehdoista tarkemmin

Toistolauseen ehtona voidaan käyttää mitä tahansa ehtolauseketta. Seuraava ohjelma tulostaa lukuja kolmen välein niin kauan kun luku on pienempi kuin 100 eikä se ole jaollinen viidellä:

```python
luku = int(input("Anna luku: "))

while luku < 100 and luku % 5 != 0:
    luku += 3
    print(luku)
```

Kaksi esimerkkitulostusta eri syötteillä:

<sample-output>

Anna luku: **28**
31
34
37

</sample-output>

<sample-output>

Anna luku: **96**
99

</sample-output>

Ehtolauseketta kirjoittaessa on tärkeä varmistua siitä, että silmukan suoritus päättyy. Esimerkiksi seuraava ohjelma on joko päättyvä tai ei-päättyvä riippuen alkuarvosta:

```python
luku = int(input("Anna luku: "))

while luku != 10:
    print(luku)
    luku += 2
```

Jos syötteeksi parillinen luku, joka on enintään 10, silmukan suoritus päättyy:

<sample-output>

Anna luku: **4**
4
6
8

</sample-output>

Muissa tapauksissa silmukka on kuitenkin ikuinen, koska muuttuja ei koskaan saavuta arvoa 10. Tällaisia syötteitä ovat esimerkiksi 3 ja 12.
