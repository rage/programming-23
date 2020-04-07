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

Tarkastellaan viime kerralta tuttua esimerkkiä, jossa tulostetaan tieto siitä onko käyttäjän syöte pienempi vai suurempi kuin nolla:

```python

# Luetaan käyttäjältä syöte
luku = int(input("Anna luku: "))

# Testataan eri vaihtoehdot
if luku < 0:
    print("Luku on negatiivinen")

if luku >= 0:
    print("Luku on positiivinen tai nolla")

```

Ohjelma on hiukan kömpelö. Jokaisen mahdollisen syötteen kohdalla halutaan suorittaa vain toinen lohkoista, koska kaikki kokonaisluvut ovat _joko_ negatiivisia _tai_ positiivisia (sisältäen nollan). Ensimmäinen vertailu sisältää tavallaan kaiken olennaisen: jos tulos on tosi, luku on negatiivinen, ja jos se on epätosi, luku on positiivinen tai nolla.

Toisen vertailun sijasta onkin usein näppärämpää luoda vaihtoehtoinen haara, joka suoritetaan _jos ehto on epätosi_. Tätä tarkoitusta varten käytetään `else`-lausetta.

Edellinen esimerkki kirjoitettuna uudestaan:

```python

# Luetaan käyttäjältä syöte
luku = int(input("Anna luku: "))

# Testataan eri vaihtoehdot
if luku < 0:
    print("Luku on negatiivinen")
else:
    print("Luku on positiivinen tai nolla")

```

Kun käytetään if-else-rakennetta, suoritetaan vaihtoehtoisista lohkoista aina jompikumpi. Missään tilanteessa ei ole mahdollista, että suoritettaisiin molemmat lohkot tai ettei suoritettaisi kumpaakaan (edellyttäen toki, ettei ohjelma kaadu virheeseen).

<img src="2_2_1.png">

Huomaa, että else-haaraa ei voi olla olemassa ilman edeltävää if-haaraa. Koko if-else-rakenne lohkoineen muodostaa yhden _ehtolauseen_.

Toinen esimerkki, jossa tutkitaan onko käyttäjän syöttämä luku parillinen vai ei. Parillisuuden selvittämiseen käytetään jakojäänösoperaattoria `%`. Operaatio `a % b` palauttaa siis _jakojäännöksen_ jakolaskusta a jaettuna b:llä. Esimerkiksi operaation `5 % 2` arvo on 1, koska viisi jaettuna kahdella on kaksi, ja _jakojäännös on yksi_. Operaattorilla on kätevä testata luvun parillisuutta: jos kokonaisluvun jakojäännös on nolla, kun luku jaetaan kahdella, on luku parillinen. Jos jakojäännös on yksi, luku on pariton.

```python

# Luetaan käyttäjältä syöte
luku = int(input("Anna luku: "))

# Testataan onko parillinen
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
# Pin-koodi on merkkijono eikä kokonaisluku,
# jotta mahdolliset etunollat voidaan tallentaa
oikea_pin = "0321"
rahaa = 0

# Kysy koodi
koodi = input("Anna pin-koodi: ")

# Testataan menikö oikein
if koodi == oikea_pin:
    print("Koodi oikein.")
    print("Ota tästä rahaa!")
    rahaa = rahaa + 100
else:
    print("Koodi ei ollut oikea, ei rahaa sinulle.")

print("Rahaa on nyt " + str(rahaa) + " euroa.")

```

Kaksi esimerkkisuoritusta eri syötteillä:

<sample-output>

Anna pin-koodi: **0321**
Koodi oikein.
Ota tästä rahaa!
Rahaa on nyt 100 euroa.

</sample-output>

<sample-output>

Anna pin-koodi: **321**
Koodi ei ollut oikea, ei rahaa sinulle.
Rahaa on nyt 0 euroa.

</sample-output>


## Vaihtoehtoiset haarat elif-lauseella

Usein vaihtoehtoja on kuitenkin enemmän kuin kaksi. Esimerkiksi jalkapallo-ottelun lopputulosta käsitellessä olisi hyvä varautua kolmeen vaihtoehtoiseen lopputulokseen kotijoukkueen kannalta: voitto, häviö tai tasapeli.

Ehtolausetta voidaan laajentaa `elif`-haaralla. Se on lyhenne sanoista "else if", ja tarkoittaa nimensä mukaisesti vaihtoehtoa alkuperäiselle ehdolle.

<img src="2_2_2.png">

Tarkastellaan esimerkkiä, jossa selvitetään ottelun voittaja:

```python

# Kysytään maalimäärät
maalit_koti = int(input("Kotijoukkueen maalimäärä: "))
maalit_vieras = int(input("Vierasjoukkueen maalimäärä: "))

# Selvitetään ja tulostetaan voittaja
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

Kotijoukkueen maalimäärä: **0**
Vierasjoukkueen maalimäärä: **6**
Vierasjoukkue voitti!

Kotijoukkueen maalimäärä: **3**
Vierasjoukkueen maalimäärä: **3**
Tasapeli!

</sample-output>

Esimerkissä ehtolauseessa on siis kolme vaihtoehtoista haaraa, joista suoritetaan aina yksi.

`elif`-haaroja voi olla useampia, eikä `else`-haara ole pakollinen.

Esimerkiksi

```python

print("Joulukalenteri")
pvm = input("Mikä päivä nyt on? ")

# Kolme eri ehtoa samassa ehtolauseessa
if pvm == "24.12.":
    print("NYt on jouluaatto")
elif pvm == '25.12.':
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

<text-box variant="hint">

Päivämäärien käsittely on monimutkaisempaa kuin mitä ensi alkuun uskoisi. Ohjelmissa ei oikeasti kannatakaan käsitellä päivämääriä merkkijonoina, vaan käyttää tätä tarkoitusta varten erikseen luotuja _kirjastoja_, jotka osaavat ottaa huomioon esimerkiksi karkauspäivät ja muut poikkeukset. Aiheeseen palataan kurssin loppupuolella myöhemmin.

</text-box>


