---
path: '/osa-3/4-break-ja-continue'
title: 'Silmukoiden kontrolloinnista'
hidden: true
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

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

    # Muuta edellisen arvo
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

Jos haluaisimme kuitenkin esimerkiksi laskea kaikki tällaiset parit, pitäisi merkkijono tietysti käydä aina läpi alusta loppuun. Riippuu siis tilanteesta, onko järkevää joissain tapauksissa poikkaista silmukan suoritus ennenaikaisesti.

## continue-lause

`break`-lauseen lisäksi Pythonista löytyy toinenkin lause, jolla silmukoiden suoritusta voidaan kontrolloida: `continue`.

Lauseen toiminta muistuttaa hiukan `break`-lausetta, mutta silmukan suorituksen katkaisemisen sijasta `continue` päättää silmukan _nykyisen kierroksen_. Kun silmukan sisällä tulee siis vastaan lause `continue`, hyppää suoritus välittömästi silmukan ensimmäiselle riville (eli riville, jolla määritellään silmukan suoritukseen vaikuttava ehtolause).

Esimerkiksi:

```python

```


## Sisäkkäiset silmukat
