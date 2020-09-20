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

</text-box>

Vain attribuutteja sisältävät luokat eivät käytännössä eroa juurikaan sanakirjoista. Seuraavassa esimerkissä on esitetty pankkitiliä mallintava rakenne sekä oman luokan että sanakirjan avulla toteutettuna:

```python

# Esimerkki omaa luokkaa käyttäen
class Pankkitili:

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

Ongelma voidaan (ainakin osittain) ratkaista piilottamalla attribuutit asiakkaalta. Käytännön toteutukseen palataan tarkemmin ensi viikolla.

<programming-exercise name='Vähenevä laskuri' tmcname='osa08-05_vaheneva_laskuri'>

Tässä tehtävässä on useampi osa. Jokainen osa vastaa yhtä tehtäväpistettä.

Tehtäväpohjan mukana tulee osittain valmiiksi toteutettu luokka `VahenevaLaskuri`:

```python
class VahenevaLaskuri:
    def __init__(self, arvo_alussa: int):
        self.arvo = arvo_alussa

    def tulosta_arvo(self):
        print("arvo:", self.arvo)

    def vahenna(self):
        pass

    # ja tänne muut metodit
```

Luokkaa käytetään seuraavasti

```python
laskuri = VahenevaLaskuri(10)
laskuri.tulosta_arvo()
laskuri.vahenna()
laskuri.tulosta_arvo()
laskuri.vahenna()
laskuri.tulosta_arvo()
```

<sample-output>

arvo: 10
arvo: 9
arvo: 8

</sample-output>


### Metodin vahene toteutus

Täydennä luokan runkoon metodin `vahene()` toteutus sellaiseksi, että se vähentää kutsuttavan olion oliomuuttujan arvo arvoa yhdellä. Kun olet toteuttanut metodin vahene(), edellisen esimerkin pääohjelman tulee toimia esimerkkitulosteen mukaan.

### Laskurin arvo ei saa olla negatiivinen

Täydennä metodin `vahene` toteutus sellaiseksi, ettei laskurin arvo mene koskaan negatiiviseksi. Eli jos laskurin arvo on jo 0, ei vähennys sitä enää vähennä.

```python
laskuri = VahenevaLaskuri(2)
laskuri.tulosta_arvo()
laskuri.vahenna()
laskuri.tulosta_arvo()
laskuri.vahenna()
laskuri.tulosta_arvo()
laskuri.vahenna()
laskuri.tulosta_arvo()
```

<sample-output>

arvo: 2
arvo: 1
arvo: 0
arvo: 0

</sample-output>

### Laskurin arvon nollaus

Tee laskurille metodi `nollaa()` joka nollaa laskurin arvon, esim:

```python
laskuri = VahenevaLaskuri(100)
laskuri.tulosta_arvo()
laskuri.nollaa()
```

<sample-output>

arvo: 100
arvo: 0

</sample-output>

### Alkuperäisen arvon palautus

Tee laskurille metodi `palauta_alkuperainen_arvo()` joka palauttaa laskurinlle sen alkuperäisen arvon, esim:

```python
laskuri = VahenevaLaskuri(55)
laskuri.vahenna()
laskuri.vahenna()
laskuri.vahenna()
laskuri.vahenna()
laskuri.tulosta_arvo()
laskuri.palauta_alkuperainen_arvo()
laskuri.tulosta_arvo()
```

<sample-output>

arvo: 55
arvo: 51
arvo: 55

</sample-output>

</programming-exercise>

Tarkastellaan kuitenkin vielä esimerkkiä luokasta, joka mallintaa pelaajan ennätystulosta. Luokkaan on kirjoitettu erilliset metodit, joilla voidaan tarkastaa ovatko annetut parametrit sopivia. Metodeja kutsutaan heti konstruktorissa. Näin varmistetaan luotavan olion sisäinen eheys.

```python

from datetime import date

class Ennatystulos:

    def __init__(self, pelaaja: str, pv: int, kk: int, vuosi: int, pisteet: int):
        # Oletusarvot
        self.pelaaja = ""
        self.pvm = date(1900,1,1)
        self.pisteet = 0

        if self.nimi_ok(pelaaja):
            self.pelaaja = pelaaja

        if self.pvm_ok(pv, kk, vuosi):
            self.pvm = date(vuosi, kk, pv)

        if self.pisteet_ok(pisteet):
            self.pisteet = pisteet

    # Apumetodit, joilla tarkistetaan ovatko syötteet ok
    def nimi_ok(self, nimi: str):
        return len(nimi) >= 2 # Nimessä vähintään kaksi merkkiä

    def pvm_ok(self, pv, kk, vuosi):
        try:
            date(vuosi, kk, pv)
            return True
        except:
            # Poikkeus, jos yritetään muodostaa epäkelpo päivämäärä
            return False

    def pisteet_ok(self, pisteet):
        return pisteet >= 0

if __name__ == "__main__":
    e = Ennatystulos("Pekka", 1, 11, 2020, 235)
    print(e.pisteet)
    print(e.pelaaja)
    print(e.pvm)

    # Epäkelpo arvo päivämäärälle
    e2 = Ennatystulos("Piia", 4, 13, 2019, 4555)
    print(e2.pisteet)
    print(e2.pelaaja)
    print(e2.pvm) # Tulostaa oletusarvon 1900-01-01

```

<sample-output>

235
Pekka
2020-11-01
4555
Piia
1900-01-01

</sample-output>

Esimerkistä huomataan, että myös olion omiin metodeihin pitää viitata `self`-määreen avulla kun niitä kutsutaan konstruktorista. Luokkiin voidaan kirjoitaa myös ns. _staattisia metodeita_, eli metodeita, jota voidaan kutsua ilman että luokasta muodostetaan oliota. Tähän palataan kuitenkin tarkemmin ensi kerralla.


