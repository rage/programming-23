---
path: '/osa-3/1-lisaa-silmukoista'
title: 'Lisää silmukoista'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Ymmärrät mitä tarkoitetaan _esiehtoisella toistolla_
- Tiedät mikä merkitys _alustuksella, ehdolla_ ja _muutoksella_ on toistolauseessa
- Osaat muodostaa silmukoita käyttäen `while`-lausetta

</text-box>

Viime osan lopussa opeteltiin käyttämättän `while(True)`-silmukkaa toistuvan toiminnallisuuden aikaansaamiseksi. Itse asiassa `while`-lause mahdollistaa huomattavasti monipuolisempien toistorakenteiden muodostamisen.

Tällainen toistolause on yleisesti muotoa:

```python
while <ehtolauseke>:
    <lohko>
```

Toistolause muistuttaa ehtolausetta: aluksi Python evaluoi ehtolausekkeen. Jos ehtolauseke saa arvon `True`, suoritetaan lohko. Poikkeuksena ehtolauseeseen on, että toistolauseessa ehtolauseke evaluoidaan uudestaan aina lohkon suorituksen jälkeen:

<img src="3_1_1.png">

Esimerkiksi

```python
# Alustetaan luku-muuttuja
luku = 1

# Lohko suoritetaan, jos luku on alle 10
while luku < 10:
    # Tulostetaan nykyinen arvo
    print(luku)

    # Kasvatetaan arvoa yhdellä
    luku = luku + 1

print("Valmis!")
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

</sample-output>


Koska ehtolauseke evaluoidaan aina ennen suoritusta, on mahdollista, ettei lohkoa suoriteta kertaakaan. Esimerkiksi:

```python

# Kysy lukua
luku = int(input("Anna luku: "))

# Suoritetaan lohkoa niin kauan
# kun luku on pienempi kuin 10
while luku < 10:

    # Tulosta ja kasvata
    print(luku)
    luku = luku + 1

print("Suoritus valmis.")

```

Jos syötteeksi annetaan luku, joka ei ole pienempi kuin 10, ei lohkoa suoriteta kertaakaan:

<sample-output>

Anna luku: 11
Suoritus valmis.

</sample-output>

Useissa ohjelmointikielissä on myös _loppuehtoinen toistolause_, eli toistolause jossa ehto evaluoidaan aina vasta lohkon suorittamisen jälkeen. Pythonissa tällaista ei kuitenkaan ole.

## Alustus, testaus ja muutos

Silmukassa on kolme olennaista osaa:

* _alustus_,
* _testaus_ ja
* _muutos_.

_Alustuksella_ tarkoitetaan silmukassa käytettävän muuttujan tai muuttujien alkuarvojen antamista. Tämä vaihe tehdään yleensä ennen toistolausetta. _Testaus_ kirjoitetaan `while`-lauseen yhteyteen, ja se määrittelee ehdon jonka ollessa tosi silmukka suoritetaan. Joka kierroksella tapahtuva _muutos_ vie silmukan askeleen lähemmäs sen loppumista. Esimerkiksi

<img src="3_1_2.png">

Jos jokin kolmesta osasta puuttuu, toistolause joko ei toimi ollenkaan tai ei pääty koskaan. Tyypillinen virhe onkin muutos-osan unohtaminen:

```python

# Alustus: annetaan muuttujalle alkuarvo
n = 1

print("Kymmenen kertotaulu:")

# Ehto: silmukkaa toistetaan niin kauan kun
# n:n arvo on pienempi tai yhtäsuuri kuin 15
while n <= 15:

    # Tulosta
    print(str(n) + " x 10 = " + str(n * 10))

print("Kertotaulu tulostettu!")

```

Koska muuttujan n arvo ei koskaan muuutu, jää ohjelma suoritettaessa "ikuiseen silmukkaan", eli tulostaa samaa riviä kunnes käyttäjä katkaisee ohjelman suorituksen (esimerkiksi painamalla `CTRL` + `C`):

<sample-output>

Kymmenen kertotaulu:
1 x 10 = 10
1 x 10 = 10
1 x 10 = 10
1 x 10 = 10
1 x 10 = 10
1 x 10 = 10
1 x 10 = 10
1 x 10 = 10
1 x 10 = 10
...jne

</sample-output>


## Ehtolausekkeesta tarkemmin

Toistolauseen ehtona voidaan käyttää mitä tahansa ehtolauseketta. Seuraava ohjelma tulostaa lukuja kolmen välein niin kauan kun luku on pienempi kuin 100 eikä se ole jaollinen viidellä:

```python

luku = int(input("Anna luku: "))

# Jos luku on alle sata eikä jaollinen viidellä...
while luku < 100 and luku % 5 != 0:

    # Kasvata ja tulosta
    luku = luku + 3
    print(luku)

```

Kaksi esimerkkitulostusta eri syötteillä:

<sample-output>

Anna luku: **28**
31
34
37
40

</sample-output>

<sample-output>

Anna luku: **99**
102

</sample-output>

Ehtolauseketta kirjoittaessa on tärkeä varmistua siitä, että silmukan suoritus päättyy. Esimerkiksi seuraava ohjelma on joko päättyvä tai ei-päättyvä riippuen alkuarvosta:

```python

# Kysy luku
luku = float(input("Anna luku: "))

# Silmukka pyörii niin kauan,
# että luku saa arvon 5.0
while luku != 5.0:
    print(luku)
    luku = luku + 0.5

```

Jos syötteeksi annetaan sopiva luku, silmukan suoritus päättyy:

<sample-output>

Anna luku: **2.5**
2.5
3.0
3.5
4.0
4.5

</sample-output>

Useimmilla syötteillä silmukka on kuitenkin ikuinen, koska muuttuja ei koskaan saavuta arvoa 5.0. Tällaisia syötteitä ovat esimerkiksi `0.1` ja `6`.
