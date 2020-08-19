---
path: '/osa-8/4-metodit-omissa-luokissa'
title: 'Metodit omissa luokissa'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen:

- Tiedät miten metodit toimivat luokissa
- Osaat kirjoittaa metodeita omiin luokkiin
- Ymmärrät mitä tarkoitetaan kapseloinnilla ja asiakkaalla olio-ohjelmoinnissa
- Tiedät miten attribuutit suojataan
- Tiedät mitä tarkoittavat havainnointi- ja asetusmetodit ja miten sellaiset muodostetaan

</text-box>

Vain attribuutteja sisältävät luokat eivät käytännössä eroa juurikaan sanakirjoista. Seuraavassa esimerkissä on esitetty pankkitiliä mallintava rakenne sekä oman luokan että sanakirjan avulla toteutettuna:

```python

# Esimerkki omaa luokkaa käyttäen
class Pankkitili:
    tilinumero = ""
    omistaja = ""
    saldo = 0.0
    vuosikorko = 0.0

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.tilinumero = tilinumero
        self.omistaja = omistaja
        self.saldo = saldo
        self.vuosikorko = vuosikorko

pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500.0, 0.015)

```

```python

# Esimerkki sanakirjaa käyttäen
pekan_tili = {"tilinumero": "12345-678", "omistaja": "Pekka Python", "saldo": 1500.0, "vuosikorko": 0.0}

```

Sanakirjaa käyttäen rakenteen toteutus on huomattavasti suoraviivaisempaa (ja ohjelmakoodi lyhyempää). Luokan hyötynä tässä yhteydessä on, että se määrittelee rakenteen "tiukemmin", jolloin kaikki luokasta muodostetut oliot ovat rakenteeltaan samanlaisia.

Luokilla on kuitenkin tässä yhteydessä myös se etu, että niihin voidaan lisätä attribuuttien lisäksi myös toiminnallisuutta. Itse asiassa olio-ohjelmoinnissa eräs periaatteista onkin, että olioon on yhdistetty sekä tallennettavat tiedot että operaatiot, joilla tietoa voidaan käsitellä.

## Metodit luokissa

Metodi tarkoittaa luokkaan sidottua aliohjelmaa. Yleensä metodin toiminta kohdistuu vain yhteen olioon. Metodifunktio kirjoitetaan luokan sisälle, ja siinä voi käsitellä attribuuttien arvoja niin kuin mitä tahansa muuttujia.

Katsotaan esimerkkinä Pankkitili-luokan metodi, joka lisää koron pankkitilille:

```python

class Pankkitili:
    tilinumero = ""
    omistaja = ""
    saldo = 0.0
    vuosikorko = 0.0

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.tilinumero = tilinumero
        self.omistaja = omistaja
        self.saldo = saldo
        self.vuosikorko = vuosikorko

    # Metodi lisää koron tilin saldoon
    def lisaa_korko(self):
        self.saldo += self.saldo * self.vuosikorko


pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500.0, 0.015)
pekan_tili.lisaa_korko()
print(pekan_tili.saldo)

```

<sample-output>

1522.5

</sample-output>

Metodi `lisaa_korko` siis kertoo olion saldon vuorikorkoprosentilla ja lisää tuloksen nykyiseen saldoon. Metodin toiminta siis kohdistuu siihen olioon, jonka kautta sitä kutsutaan.

Katsotaan vielä toinen esimerkki, jossa luokasta on muodostettu useampi olio:

```python

# Luokka Pankkitili on määritelty edellisessä esimerkissä

pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500.0, 0.015)
pirjon_tili = Pankkitili("99999-999", "Pirjo Pythonen", 1500.0, 0.05)
paulin_tili = Pankkitili("1111-222", "Pauli Paulinen", 1500.0, 0.001)

# Lisätään korko Pekalle ja Pirjolle, mutta ei Paulille
pekan_tili.lisaa_korko()
pirjon_tili.lisaa_korko()

# Tulostetaan kaikki
print(pekan_tili.saldo)
print(pirjon_tili.saldo)
print(paulin_tili.saldo)

```

<sample-output>

1522.5
1575.0
1500.0

</sample-output>

Korko lisätään vain siis siihen tiliin, jonka kautta metodia kutsutaan. Esimerkistä huomataan, että Pekalle ja Pirjolle lisätään eri korkoprosentit, ja Paulin tilin saldo ei muutu ollenkaan, koska olion `paulin_tili` kautta ei kutsuta metodia `lisaa_korko`.

## Kapselointi

Olio-ohjelmoinnin yhteydessä puhutaan usein olioiden _asiakkaista_. Asiakkaalla (client) tarkoitetaan ohjelmakoodia, jossa olio muodostetaan ja sen "palveluita" käytetään kutsumalla olion metodeita. Kun olion tietosisältöä käsitellään vain olion tarjoamien metodien avulla, voidaan varmistua siitä, että olion _sisäinen eheys_ säilyy. Käytännössä tämä tarkoittaa esimerkiksi sitä, että Pankkitili-luokassa tarjotaan metodi, jolla tililtä nostetaan rahaa (sen sijaan että asiakas käsittelisi suoraan attribuuttia `saldo`). Tässä metodissa voidaan sitten varmistaa, ettei tililtä nosteta enempää rahaa kuin mitä tilillä on katetta.

Esimerkiksi:

```python

class Pankkitili:
    tilinumero = ""
    omistaja = ""
    saldo = 0.0
    vuosikorko = 0.0

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.tilinumero = tilinumero
        self.omistaja = omistaja
        self.saldo = saldo
        self.vuosikorko = vuosikorko

    # Metodi lisää koron tilin saldoon
    def lisaa_korko(self):
        self.saldo += self.saldo * self.vuosikorko

    # Metodilla "nostetaan" tililtä rahaa
    # Metodi palauttaa true, jos nosto onnistuu, muuten False
    def nosto(self, nostosumma: float):
        if nostosumma <= self.saldo:
            self.saldo -= nostosumma
            return True

        return False


pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500.0, 0.015)

if pekan_tili.nosto(1000):
    print("Nosto onnistui, tilin saldo on nyt", pekan_tili.saldo)
else:
    print("Nosto ei onnistunut, rahaa ei ole tarpeeksi.")


# Yritetään uudestaan
if pekan_tili.nosto(1000):
    print("Nosto onnistui, tilin saldo on nyt", pekan_tili.saldo)
else:
    print("Nosto ei onnistunut, rahaa ei ole tarpeeksi.")

```

<sample-output>

Nosto onnistui, tilin saldo on nyt 500.0
Nosto ei onnistunut, rahaa ei ole tarpeeksi.

</sample-output>

Olion sisäisen eheyden säilyttämistä ja sopivien metodien tarjoamista asiakkalle kutsutaan _kapseloinniksi_. Nimi vihjaa mistä on kyse: piilotetaan, eli "kapseloidaan" tiedot ja toteutus asiakkaalta, ja tarjotaan operaatiot (eli käytännössä metodit), joiden avulla tietoja voi käsitellä.

Pelkkä metodin lisäys ei kuitenkaan piilota attribuuttia: vaikka pankkitililuokkaan olisikin lisätty metodi rahan nostamiseksi, asiakas voi edelleen muokata `saldo`-attribuutin arvoa suoraan:

```python

pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500.0, 0.015)

# Yritetään nostaa 2000
if pekan_tili.nosto(2000):
    print("Nosto onnistui, tilin saldo on nyt", pekan_tili.saldo)
else:
    print("Nosto ei onnistunut, rahaa ei ole tarpeeksi.")

    # Nostetaan "väkisin" 2000
    pekan_tili.saldo -= 2000

print("Saldo nyt:", pekan_tili.saldo)

```

## Asetus- ja havainnointimetodit

Attribuutin arvo voidaan piilottaa lisäämällä sen nimen eteen kaksi alaviivaa (eli sen sijaan, että attribuutin nimi olisi vaikkapa `saldo`, se onkin nyt `__saldo`). Tämän jälkeen asiakas ei voi suoraan viitata attribuuttiin, vaan yritys tuottaa virheilmoituksen:

```python

class Pankkitili:
    tilinumero = ""
    omistaja = ""
    __saldo = 0.0
    vuosikorko = 0.0

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.tilinumero = tilinumero
        self.omistaja = omistaja
        self.__saldo = saldo
        self.vuosikorko = vuosikorko

    # Metodi lisää koron tilin saldoon
    def lisaa_korko(self):
        self.__saldo += self.__saldo * self.vuosikorko

    # Metodilla "nostetaan" tililtä rahaa
    # Metodi palauttaa true, jos nosto onnistuu, muuten False
    def nosto(self, nostosumma: float):
        if nostosumma <= self.saldo:
            self.__saldo -= nostosumma
            return True

        return False


pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500, 0.015)

# Saldoa EI VOI nyt kutsua suoraan, tämä aiheuttaa virheen
print(pekan_tili.__saldo)

```

<sample-output>

AttributeError: 'Pankkitili' object has no attribute '__saldo'

</sample-output>

Mikäli halutaan, että asiakas pystyy edelleen lukemaan attribuutin arvon, pitää sille kirjoittaa niinsanottu _havainnointimetodi_. Havainnointimetodi palauttaa attribuutin arvon:

```python

class Pankkitili:
    tilinumero = ""
    omistaja = ""
    __saldo = 0.0
    vuosikorko = 0.0

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.tilinumero = tilinumero
        self.omistaja = omistaja
        self.__saldo = saldo
        self.vuosikorko = vuosikorko

    # Metodi lisää koron tilin saldoon
    def lisaa_korko(self):
        self.__saldo += self.__saldo * self.vuosikorko

    # Metodilla "nostetaan" tililtä rahaa
    # Metodi palauttaa true, jos nosto onnistuu, muuten False
    def nosto(self, nostosumma: float):
        if nostosumma <= self.saldo:
            self.__saldo -= nostosumma
            return True

        return False

    # Julkinen havainnointimetodi, jolla käyttäjä voi pyytää saldon
    def anna_saldo(self):
        return self.__saldo


pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500, 0.015)

# Tämä toimii
print(pekan_tili.anna_saldo())

```

Nyt Pekka-paran tilille ei kuitenkaan voi lisätä rahaa, vaan ainoastaan nostaa sitä. Lisätään siis myös metodi, jolla voidaan tallettaa tilille lisää rahaa:

```python

class Pankkitili:
    tilinumero = ""
    omistaja = ""
    __saldo = 0.0
    vuosikorko = 0.0

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.tilinumero = tilinumero
        self.omistaja = omistaja
        self.__saldo = saldo
        self.vuosikorko = vuosikorko

    # Metodi lisää koron tilin saldoon
    def lisaa_korko(self):
        self.__saldo += self.__saldo * self.vuosikorko

    # Metodilla "nostetaan" tililtä rahaa
    # Metodi palauttaa true, jos nosto onnistuu, muuten False
    def nosto(self, nostosumma: float):
        if nostosumma <= self.saldo:
            self.__saldo -= nostosumma
            return True

        return False

    # Julkinen havainnointimetodi, jolla käyttäjä voi pyytää saldon
    def anna_saldo(self):
        return self.__saldo

    # Julkinen metodi, jolla voidaan tallettaa tilile rahaa
    def talleta(self, rahasumma: float):
        self.__saldo += rahasumma



pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500, 0.015)

print(pekan_tili.anna_saldo())
pekan_tili.talleta(10000)
print(pekan_tili.anna_saldo())

```

## Parametrien validointi asetusmetodeissa

Asetusmetodissa olisi hyvä tarkastaa, että annettu arvo on kelvollinen. Nyt negatiivisen rahasumman tallettaminen vähentää tililtä rahaa. Lisätää vielä lopuille attribuuteille asetus- ja havainnointimetodit ja lisätään asetusmetodeihin tarkastukset arvoille:

```python

class Pankkitili:
    __tilinumero = ""
    __omistaja = ""
    __saldo = 0.0
    __vuosikorko = 0.0

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.__tilinumero = tilinumero
        self.__omistaja = omistaja
        self.__saldo = saldo
        self.__vuosikorko = vuosikorko

    # Metodi lisää koron tilin saldoon
    def lisaa_korko(self):
        self.__saldo += self.__saldo * self.vuosikorko

    # Metodilla "nostetaan" tililtä rahaa
    # Metodi palauttaa true, jos nosto onnistuu, muuten False
    def nosto(self, nostosumma: float):
        if nostosumma <= self.saldo:
            self.__saldo -= nostosumma
            return True

        return False

    # Saldon havainnointi ja asetus
    def anna_saldo(self):
        return self.__saldo

    def talleta(self, rahasumma: float):
        if rahasumma > 0:
            self.__saldo += rahasumma

    # Tilinumeron asetus ja havainnointi
    def anna_tilinumero(self):
        return self.__tilinumero

    def aseta_tilinumero(self, tilinumero: str):
        if tilinumero != "" and "-" in tilinumero:
            self.__tilinumero = tilinumero

    # Omistajan asetus ja havainnointi
    def anna_omistaja(self):
        return self.__omistaja

    def aseta_omistaja(self, omistaja: str):
        if omistaja != "":
            self.__omistaja = omistaja

    # Korkoprosentin asetus ja havainnointi
    def anna_vuosikorko(self):
        return self.__vuosikorko

    def aseta_vuosikorko(self, vuosikorko: float):
        if vuosikorko > 0:
            self.__vuosikorko == vuosikorko

```

Kapseloinnin tarkoituksena on siis varmistaa asiakkaan puolesta, että olio ei päädy virheelliseen tilaan. Virheellinen tila tarkoittaa tilaa, jossa yhdellä tai useammalla olion attribuutilla on arvo, jota ei voida käsitellä. Esimerkkejä tällaisista arvoista olisivat vaikka päivämäärä 33.2.2019, tyhjä merkkijonon nimenä tai henkilön negatiivinen ikä.

Vastaavat tarkastukset olisi toki hyvä tehdä myös konstruktorissa oliota luotaessa. Yksi helppo tapa on kutsua asetusmetodeita konstruktorista, jotta testejä ei tarvitse kirjoittaa useaan kertaan:

```python

class Pankkitili:
    __tilinumero = ""
    __omistaja = ""
    __saldo = 0.0
    __vuosikorko = 0.0

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.aseta_tilinumero(tilinumero)
        self.aseta_omistaja(omistaja)
        self.aseta_vuosikorko(vuosikorko)

        if saldo >= 0:
            self.__saldo = saldo


    # Metodi lisää koron tilin saldoon
    def lisaa_korko(self):
        self.__saldo += self.__saldo * self.vuosikorko

    # Metodilla "nostetaan" tililtä rahaa
    # Metodi palauttaa true, jos nosto onnistuu, muuten False
    def nosto(self, nostosumma: float):
        if nostosumma <= self.saldo:
            self.__saldo -= nostosumma
            return True

        return False

    # Saldon havainnointi ja asetus
    def anna_saldo(self):
        return self.__saldo

    def talleta(self, rahasumma: float):
        if rahasumma > 0:
            self.__saldo += rahasumma

    # Tilinumeron asetus ja havainnointi
    def anna_tilinumero(self):
        return self.__tilinumero

    def aseta_tilinumero(self, tilinumero: str):
        if tilinumero != "" and "-" in tilinumero:
            self.__tilinumero = tilinumero

    # Omistajan asetus ja havainnointi
    def anna_omistaja(self):
        return self.__omistaja

    def aseta_omistaja(self, omistaja: str):
        if omistaja != "":
            self.__omistaja = omistaja

    # Korkoprosentin asetus ja havainnointi
    def anna_vuosikorko(self):
        return self.__vuosikorko

    def aseta_vuosikorko(self, vuosikorko: float):
        if vuosikorko > 0:
            self.__vuosikorko == vuosikorko

```

