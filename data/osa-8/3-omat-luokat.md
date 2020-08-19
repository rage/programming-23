---
path: '/osa-8/3-omat-luokat'
title: 'Omat luokat'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät miten omia luokkia määritellään
- Osaat muodostaa itse määritellystä luokasta olion
- Osaat kirjoittaa konstruktorimetodin
- Tiedät mitä tarkoittaa avainsana self
- Tiedät mitä ovat attribuutit ja miten niitä käytetään

</text-box>

Luokka määritellään avainsanan `class` avulla. Syntaksi on

```python

class LuokanNimi:
    # Luokan toteutus

```

Luokat nimetään yleensä ns. _camel case_ -järjestelmässä, jossa sanat kirjoitetaan yhteen ja jokainen sana alkaa isolla alkukirjaimella. Esimerkkejä luokkien nimistä olisiva siis vaikkapa

* Pankkitili
* OhjelmaApuri
* KirjastoTietokanta
* PythonKurssinArvosanat

Yhdellä luokalla pyritään mallintamaan jokin sellainen yksittäinen kokonaisuus, jonka sisältämät tiedot liittyvät kiinteästi yhteen. Monimutkaisemmissa ratkaisuissa luokka voi sisältää toisia luokkia (esimerkiksi luokka Kurssi voisi sisältää luokan Osasuoritus mukaisia olioita).

Tarkastellaan esimerkkinä yksinkertaista luokkamäärittelyä:

```python

class Pankkitili:
    saldo = 0.0
    omistaja = ""

```

Ohjelmakoodissa määritellään luokka, jonka nimi on `Pankkitili`. Luokan sisälle on määritelty kaksi muuttujaa, `saldo` ja `omistaja`. Luokassa määriteltyjä muuttujia kutsutaan _attribuuteiksi_ (huomaa kaksi t-kirjainta). Attribuutti tarkoittaa siis jotain olion muuttujaa - attribuutista käytetään myös nimitystä _oliomuuttuja_.

Kun luokasta luodaan olio, voidaan attribuuttien arvoja käsitellä olion kautta:

```python

class Pankkitili:
    saldo = 0.0
    omistaja = ""

pekan_tili = Pankkitili()
pekan_tili.omistaja = "Pekka Python"
pekan_tili.saldo = 5.0

print(pekan_tili.omistaja)
print(pekan_tili.saldo)

```

<sample-output>

Pekka Python
5.0

</sample-output>

Jos samasta luokasta luodaan useampi olio, niillä on jokaisella omat itsenäiset arvonsa attribuuteille:

```python

class Pankkitili:
    saldo = 0.0
    omistaja = ""

pekan_tili = Pankkitili()
pekan_tili.omistaja = "Pekka Python"
pekan_tili.saldo = 5.0

pirjon_tili = Pankkitili()
pirjon_tili.omistaja = "Pirjo Pythonen"
pirjon_tili.saldo = 1500.0

print(pekan_tili.omistaja)
print(pekan_tili.saldo)

print()

print(pirjon_tili.omistaja)
print(pirjon_tili.saldo)

```

<sample-output>

Pekka Python
5.0

Pirjo Pythonen
1500.0

</sample-output>

<text-box variant="info" name="Attribuuttien näkyvyys">

Attribuutit ovat käytettävissä ainoastaan määrittelyluokkansa sisällä. Niitä ei voi siis käyttää luokan ulkopuolelta muuta kuin luomalla luokasta olion.

Tämä on sikäli loogista, että attribuutit saavat lopulliset arvonsa vasta kun luokasta luodaan olio. Luokassa olevaa attribuutit määrittelevää koodia ei suoriteta ennen kuin luokan konstruktoria kutsutaan. Tästä lisää seuraavassa osassa.

</text-box>

## Konstruktorin lisääminen

Niin kuin edellisestä esimerkistä huomataan, luokasta voi luoda uuden olion kutsumalla konstruktoria, joka on muotoa `LuokanNimi()`. Yleensä olisi kuitenkin kätevä antaa attrbuuteille arvot heti kun olio luodaan - nyt esimerkiksi Pankkitilin omistaja ja saldo asetetaan vasta kun pankkitiliolio on luotu.

Konstruktorimetodi kirjoitetaan luokan sisään samalla tavalla kuin attribuutitkin (ja yleensä aina attribuuttien määrityksen jälkeen).

Tarkastellaan Pankkitili-luokkaa, johon on lisätty konstruktori:

```python

class Pankkitili:
    saldo = 0.0
    omistaja = ""

    # Konstruktori
    def __init__(self, saldo: float, omistaja: str):
        self.saldo = saldo
        self.omistaja = omistaja

```

Konstruktorimetodi nimi on aina `__init__`. Huomaa, että nimessä sanan init molemmilla puolilla on _kaksi alaviivaa_.

Konstruktorin ensimmäinen parametri on nimeltään `self`. Tämä viittaa olioon, jota käsitellään. Asetuslause

`self.saldo = saldo`

asettaa annetun saldon luotavan olion saldoksi. On siis tärkeä huomata, että muuttuja `self.saldo` on eri muuttuja kuin muuttuja `saldo`.

KUVA

Nyt kun konstruktorille on määritelty parametrit, voidaan attribuuttien arvot antaa oliota luotaessa:

```python

class Pankkitili:
    saldo = 0.0
    omistaja = ""

    # Konstruktori
    def __init__(self, saldo: float, omistaja: str):
        self.saldo = saldo
        self.omistaja = omistaja


# Parametrille self ei anneta arvoa, vaan Python antaa sen
# automaattisesti
pekan_tili = Pankkitili(100, "Pekka Python")
pirjon_tili = Pankkitili(20000, "Pirjo Pythonen")

print(pekan_tili.saldo)
print(pirjon_tili.saldo)

```

<sample-output>

100
20000

</sample-output>

Esimerkistä huomataan, että olioiden muodostaminen helpottuu, kun arvot voidaan antaa heti oliota muodostaessa. Samalla tämä varmistaa, että arvojen antaminen ei unohdu, ja käytännössä pakottaa käyttäjän antamaan arvot attribuuteille.

Attribuuttien arvoja voi edelleen muuttaa myöhemmin ohjelmakoodissa, vaikka alkuarvo olisikin annettu konstruktorissa:

```python

class Pankkitili:
    saldo = 0.0
    omistaja = ""

    # Konstruktori
    def __init__(self, saldo: float, omistaja: str):
        self.saldo = saldo
        self.omistaja = omistaja


pekan_tili = Pankkitili(100, "Pekka Python")
print(pekan_tili.saldo)

# Saldoksi 1500
pekan_tili.saldo = 1500
print(pekan_tili.saldo)

# Lisätään saldoon 2000
pekan_tili.saldo += 2000
print(pekan_tili.saldo)

```

<sample-output>

100
1500
3500

</sample-output>

Tarkastellaan vielä toista esimerkkiä luokasta ja olioista. Kirjoitetaan luokka, joka mallintaa yhtä lottokierrosta:

```python

from datetime import date

class LottoKierros:
    viikko = 0
    pvm = date(1900,1,1)
    numerot = []

    def __init__(self, viikko: int, pvm: date, numerot: list):
        self.viikko = viikko
        self.pvm = pvm
        self.numerot = numerot


# Luodaan uusi lottokierros
ekan_viikon_lotto = LottoKierros(1, date(2021, 1, 2), [1,4,8,12,13,14,33])

# Tulostetaan tiedot
print(ekan_viikon_lotto.viikko)
print(ekan_viikon_lotto.pvm)

for numero in ekan_viikon_lotto.numerot:
    print(numero)

```

<sample-output>

1
2021-01-02
1
4
8
12
13
14
33

</sample-output>

Attribuutit voivat olla siis minkä tahansa tyyppisiä - esimerkiksi edellisessä esimerkissä jokaiseen olioon tallennetaan lista ja päivämääräolio.




