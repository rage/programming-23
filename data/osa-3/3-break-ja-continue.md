---
path: '/osa-3/3-break-ja-continue'
title: 'Silmukoiden suorituksen ohjaaminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Toistolauseen etenemistä ohjaamalla voidaan nopeuttaa tai selkeyttää ohjelmien rakennetta.

Tämän osion suoritettuasi

- Tiedät mitä `break`-lause tekee ja osaat käyttää sitä ohjelmissasi.
- Tiedät mitä `continue`-lause tekee ja osaat käyttää sitä ohjelmissasinpr

</text-box>

Aiemmin silmukoiden yhteydessä tutustuttiin pintapuolisesti `break`-lauseeseen. Lauseella voidaan katkaista silmukan suoritus välittömästi. Tyypillinen esimerkki lauseen käytöstä on silmukka, jossa kysytään käyttäjältä syötteitä, ja suoritus päättyy kun käyttäjä syöttää tietyn syötteen (esimerkiksi tyhjän merkkijonon).

Vastaavaan toiminnallisuuteen päästään tietenkin ilman `break`-lausettakin sopivalla ehtolausekkeella. Alla olevat esimerkit toteuttavat molemmat ohjelman, joka laskee käyttäjän syötteiden summan kun käyttäjä syöttää luvun -1:

```python

# 1. versio, jossa käytetään break-lausetta

summa = 0

# "ikuinen" silmukka
while True:

    # Kysy syöte, jos -1 niin lopetetaan
    luku = int(input("Anna luku, -1 lopettaa: "))

    if luku == -1:
        break

    # Jos ei ollut -1, lisätään summaan
    summa = summa + luku

# Lopuksi tulostetaan summa
print ("Summa on " + str(summa))

```

```python

# 2. versio, jossa ei käytetä break-lausetta

summa = 0

# muuttuja luku pitää alustaa, jotta sitä voidaan
# käyttää ehtolausekkeessa
luku = 0

# Silmukka, jota toistetaan kunhan luku ei ole -1
while luku != -1:

    # Kysy syöte, jos -1 niin lopetetaan
    luku = int(input("Anna luku, -1 lopettaa: "))

    # Jos ei ollut -1, lisätään summaan
    if luku != -1:
        summa = summa + luku

# Lopuksi tulostetaan summa
print ("Summa on " + str(summa))

```

Molempien ohjelmien esimerkkisuoritus voisi näyttää seuraavalta:

<sample-output>

Anna luku, -1 lopettaa: **2**
Anna luku, -1 lopettaa: **4**
Anna luku, -1 lopettaa: **5**
Anna luku, -1 lopettaa: **3**
Anna luku, -1 lopettaa: **-1**
Summa on 14

</sample-output>

Molemmat versiot ovat toiminnallisuudeltaan siis käytännössä samanlaisia. Onkin makuasia kumpaa tapaa haluaa käyttää.

`break`-lausetta voidaan käyttää myös silloin, kun toistolauseessa on annettu jokin oikea ehtolauseke (eli jokin muu ehto kuin pelkkä vakiomuotoinen totuusarvo `True`). Tällöin voidaan esimerkiksi katkaista silmukka, kun sen suorittama tehtävä on täytetty vaikka jonkin sarjan läpikäynti olisikin vielä kesken.

Esimerkiksi seuraava silmukka tutkii käyttäjän antamaa merkkijonoa ja yrittää löytää siitä kaksi samaa merkkiä peräkkäin. Jos tällaiset merkit löytyvät, päätetään silmukan suoritus break-lauseella. Silmukan suoritus päättyy joka tapauksessa, jos päästään merkkijonon loppuun asti.

```python

merkkijono = input("Anna merkkijono: ")

# Edellinen merkki, aluksi tyhjä
edellinen = ""

# indeksimuuttuja
indeksi = 0

# Tieto siitä löytyikö kaksi peräkkäistä samaa merkkiä
löytyi = False

while indeksi < len(merkkijono):
    # testaa onko sama kuin edellinen merkki...
    if merkkijono[indeksi] == edellinen:
        löytyi = True
        break

    # Ei ollut: muuta edellisen arvo
    edellinen = merkkijono[indeksi]

    # ...ja kasvata indeksiä
    indeksi = indeksi + 1

if löytyi:
    print("Merkkijonosta löytyi 2 peräkkäistä samaa merkkiä")
else:
    print("Peräkkäisiä samoja merkkejä ei löytynyt")

```

Ohjelma suoritettuna kahdella eri syötteellä:

<sample-output>

Anna merkkijono: **testataanpa tätä**
Merkkijonosta löytyi 2 peräkkäistä samaa merkkiä

Anna merkkijono: **tämä on toinen testi**
Peräkkäisiä samoja merkkejä ei löytynyt

</sample-output>

Silmukan suoritus voidaan katkaista merkkiparin löytyessä, jos haluamme ainoastaan tietää löytyykö merkkijonosta tällainen pari. Katkaisemalla suoritus ensimmäisen parin löydettyä vältytään turhien operaatioiden suorittamiselta. Esimerkkiohjelmassa merkitys on korkeintaan mikrosekunteja, mutta periaate on sama pidemmilläkin suoritusajoilla.

Jos haluaisimme kuitenkin esimerkiksi laskea kaikkien tällaisten parien määrät, pitäisi merkkijono tietysti käydä läpi alusta loppuun. Riippuu siis tilanteesta, onko järkevää joissain tapauksissa poikkaista silmukan suoritus ennenaikaisesti.

## continue-lause

`break`-lauseen lisäksi Pythonista löytyy toinenkin lause, jolla silmukoiden suoritusta voidaan kontrolloida: `continue`.

Lauseen toiminta muistuttaa hiukan `break`-lausetta, mutta silmukan suorituksen katkaisemisen sijasta `continue` päättää silmukan _nykyisen kierroksen_. Kun silmukan sisällä tulee siis vastaan lause `continue`, hyppää suoritus välittömästi silmukan ensimmäiselle riville (eli riville, jolla määritellään silmukan suoritukseen vaikuttava ehtolause). Tämän jälkeen silmukan suoritus jatkuu normaalisti ehtolauseen tarkastamisella:

<img src="3_3.png">

Esimerkiksi:

```python

luku = 0

while luku < 20:
    # Kasvatetaan aluksi
    luku = luku + 1

    if luku % 2 == 0 or luku % 3 == 0:
        # Lohkon suorittaminen päättyy ja suoritus palaa
        # takaisin ehtolausekkeen tarkastamiseen
        continue

    # Luku ei ollut kahdella tai kolmella jaollinen
    print(luku)

```

<sample-output>

1
5
7
11
13
17
19

</sample-output>

Huomaa, että mikäli muuttujan kasvatus esimerkissä tehtäisiin ehtolauseen jälkeen, olisi seurauksena ikuinen silmukka. `continue`-lausetta käytettäessä onkin aina varmistuttava, että ehtolause etenee kohti loppuehtoaan myös silloin, kun kierroksen yli hypätään.

Niinkuin edellisestä esimerkistä ehkä huomataan, `continue`-lauseenkin käytön voi yleensä kiertää ehtolauseella. Tyypillinen tapa käyttää lausetta onkin siistiä ohjelmakoodia tarkastelemalla silmukan alussa, onko alkio sellainen jota ei edes haluta käsitellä - näin vältytään ainakin yhdeltä ylimääräiseltä sisennykseltä, jonka ehtolauseet aiheuttaisivat.

## Sisäkkäiset silmukat

Toistolauseita voidaan kirjoittaa toisten toistolauseiden sisään. Tarkastellaan esimerkkinä ohjelmaa, joka tulostaa viisi kertotaulua:

```python

# Nyt tarvitaan kaksi indeksiä, yksi alustetaan tässä...
luku1 = 1

while luku1 <= 5:
    # ...ja toinen joka ulomman kierroksen aluksi tässä
    luku2 = 1
    while luku2 <= 5:
        rivi = str(luku1) + " x " + str(luku2)
        rivi = rivi + " = " + str(luku1 * luku2)

        print(rivi)

        luku2 = luku2 + 1

    # Kun sisempi silmukka on suoritettu,
    # kasvatetaan lukua 1
    luku1 = luku1 + 1

```

<sample-output>

1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
1 x 4 = 4
1 x 5 = 5
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
2 x 4 = 8
2 x 5 = 10
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15
4 x 1 = 4
4 x 2 = 8
4 x 3 = 12
4 x 4 = 16
4 x 5 = 20
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25

</Sample-output>

Sisäkkäisiä silmukoita käytettäessä on tärkeää varmistua, että lauseet kuuluvat oikeisiin lohkoihin. Miten edellinen esimerkki toimisi, jos luvun 1 kasvatus tapahtuisi sisemmän lohkon sisällä?

Huomaa, että useita silmukoita käytettäessä `break`-lause katkaisee aina sen lohkon suorituksen, jonka sisään se on kirjoitettu.

Esimerkiksi

```python

mjono = ""

while len(mjono) < 6:
    mjono = mjono + "a"

    while (True):
        mjono = mjono + "b"
        break

print(mjono)

```

<sample-output>

ababab

</sample-output>

Esimerkissä `break`-lauseen suoritus päättää sisemmän silmukan suorituksen, jolloin suoritus palaa takaisin ulompaan silmukkaan. Näin merkkijonoon lisätään vuorotellen a- ja b-kirjaimia kunnes pituus ei ole enää alle 6.
