---
path: '/osa-2/2-else-elif'
title: 'Lisää ehtolauseita'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Ehtolauseet tarjoavat aikaisempaa esitetyn peruskäytön lisäksi monipuolisempia suorituksen ohjausmahdollisuuksia.

Tämän osion suoritettuasi

- Osaat luoda vaihtoehtoisia haaroja toistolauseisiin
- Ymmärrät `if`-, `elif`- ja `else`-lauseiden merkityksen ehtolauseessa
- Tiedät, miten jakojäännösoperaattori `%` toimii

</text-box>

Tarkastellaan viime kerralta tuttua esimerkkiä, jossa tulostetaan tieto siitä, onko käyttäjän syöte pienempi vai suurempi kuin nolla:

```python
luku = int(input("Anna luku: "))

if luku < 0:
    print("Luku on negatiivinen")

if luku >= 0:
    print("Luku on positiivinen tai nolla")
```

Ohjelma on hiukan kömpelö. Jokaisen mahdollisen syötteen kohdalla halutaan suorittaa vain toinen lohkoista, koska kaikki kokonaisluvut ovat _joko_ negatiivisia _tai_ positiivisia (sisältäen nollan). Ensimmäinen vertailu sisältää tavallaan kaiken olennaisen: jos tulos on tosi, luku on negatiivinen, ja jos se on epätosi, luku on positiivinen tai nolla.

Toisen vertailun sijasta onkin usein näppärämpää luoda vaihtoehtoinen haara, joka suoritetaan, _jos ehto on epätosi_. Tätä tarkoitusta varten käytetään `else`-lausetta.

Edellinen esimerkki kirjoitettuna uudestaan:

```python
luku = int(input("Anna luku: "))

if luku < 0:
    print("Luku on negatiivinen")
else:
    print("Luku on positiivinen tai nolla")
```

Kun käytetään if-else-rakennetta, suoritetaan vaihtoehtoisista lohkoista aina jompikumpi. Missään tilanteessa ei ole mahdollista, että suoritettaisiin molemmat lohkot tai ettei suoritettaisi kumpaakaan (edellyttäen toki, ettei ohjelma kaadu virheeseen).

<img src="2_2_1.png">

Huomaa, että else-haaraa ei voi olla olemassa ilman edeltävää if-haaraa. Koko if-else-rakenne lohkoineen muodostaa yhden _ehtolauseen_.

Seuraava esimerkki tutkii, onko käyttäjän syöttämä luku parillinen vai ei Parillisuuden selvittämiseen käytetään jakojäänösoperaattoria `%`. Operaatio `a % b` palauttaa _jakojäännöksen_, kun `a` jaetaan b:llä. Esimerkiksi jakojäännöksen `5 % 2` arvo on `1`. Jakojäännöksellä on kätevä testata luvun parillisuutta: jos luvun jakojäännös kahdella on nolla, luku on parillinen, ja muuten pariton.

```python
luku = int(input("Anna luku: "))

if luku % 2 == 0:
    print("Luku on parillinen")
else:
    print("Luku on pariton")
```

<sample-output>

Anna luku: **5**
Luku on pariton

</sample-output>

Kolmas esimerkki, jossa vertaillaan merkkijonojen samuutta:

```python
oikea = "kissa"
salasana = input("Anna salasana: ")

if salasana == oikea:
    print("Tervetuloa")
else:
    print("Pääsy kielletty")
```

Kaksi esimerkkisuoritusta eri syötteillä:

<sample-output>

Anna salasana: **kissa**
Tervetuloa

</sample-output>

<sample-output>

Anna salasana: **apina**
Pääsy kielletty

</sample-output>

## Vaihtoehtoiset haarat elif-lauseella

Usein vaihtoehtoja on kuitenkin enemmän kuin kaksi. Esimerkiksi jalkapallo-ottelun lopputulosta käsitellessä olisi hyvä varautua kolmeen vaihtoehtoiseen lopputulokseen kotijoukkueen kannalta: voitto, häviö tai tasapeli.

Ehtolausetta voidaan laajentaa `elif`-haaralla. Se on lyhenne sanoista "else if", ja tarkoittaa nimensä mukaisesti vaihtoehtoa alkuperäiselle ehdolle.

<img src="2_2_2.png">

Tarkastellaan esimerkkiä, jossa selvitetään ottelun voittaja:

```python
maalit_koti = int(input("Kotijoukkueen maalimäärä: "))
maalit_vieras = int(input("Vierasjoukkueen maalimäärä: "))

if maalit_koti > maalit_vieras:
    print("Kotijoukkue voitti!")
elif maalit_vieras > maalit_koti:
    print("Vierasjoukkue voitti!")
else:
    print("Tasapeli!")
```

Kolme esimerkkitulosta eri syötteilä:

<sample-output>

Kotijoukkueen maalimäärä: **4**
Vierasjoukkueen maalimäärä: **2**
Kotijoukkue voitti!

</sample-output>

<sample-output>

Kotijoukkueen maalimäärä: **0**
Vierasjoukkueen maalimäärä: **6**
Vierasjoukkue voitti!

</sample-output>

<sample-output>

Kotijoukkueen maalimäärä: **3**
Vierasjoukkueen maalimäärä: **3**
Tasapeli!

</sample-output>

Esimerkissä ehtolauseessa on siis kolme vaihtoehtoista haaraa, joista suoritetaan aina yksi. Ehtolauseessa `elif`-haaroja voi olla useampia, eikä `else`-haara ole pakollinen.

Esimerkiksi:

```python
print("Joulukalenteri")
pvm = input("Mikä päivä nyt on? ")

if pvm == "24.12.":
    print("Nyt on jouluaatto")
elif pvm == "25.12.":
    print("Nyt on joulupäivä")
elif pvm == "26.12.":
    print("Nyt on tapaninpäivä")

print("Kiitos ja hei.")
```

<sample-output>

Joulukalenteri
Mikä päivä nyt on? **25.12.**
Nyt on joulupäivä
Kiitos ja hei.

</sample-output>

Huomaa, että ehtolauseessa ei edellisessä esimerkissä ole ollenkaan else-haaraa. Jos käyttäjä syöttää jonkin sellaisen päivämäärän, jota ei täytä ehtoa jossain`if`- tai `elif`-lauseessa, ohjelmassa ei suoriteta mitään ehtolauseen kolmesta lohkosta.

<sample-output>

Joulukalenteri
Mikä päivä nyt on? **1.1.**
Kiitos ja hei.

</sample-output>

