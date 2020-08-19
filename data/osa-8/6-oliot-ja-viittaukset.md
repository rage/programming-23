---
path: '/osa-8/6-oliot-ja-viittaukset'
title: 'Oliot ja viittaukset'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät miten olioita voi tallentaa tietorakenteisiin
- Tiedät miten olioiden välitys parametrina toimii
- Osaa tallentaa olioita toisten olioiden sisään

</text-box>

Pythonissa kaikki arvot ovat olioita. Niinpä myös omista luokista luotuja olioita voi käsitellä kuin mitä tahansa muitakin olioita: niitä on esimerkiksi helppo tallentaa listaan:

```python

from datetime import date

# Esimerkkiluokka mallintaa kurssisuoritusta
class Kurssisuoritus:
    __kurssi = ""
    __opintopisteet = ""
    __suorituspvm = date(1900,1,1)

    def __init__(self, kurssi: str, opintopisteet: int, suorituspvm: date):
        self.kurssi = kurssi
        self.opintopisteet = opintopisteet
        self.suorituspvm = suorituspvm

    def anna_kurssi(self):
        return self.kurssi

    def anna_opintopisteet(self):
        return self.opintopisteet

    def anna_suorituspvm(self):
        return self.suorituspvm


if __name__ == "__main__":
    # Luodaan pari kurssisuoritusta ja lisätään listaan
    suoritukset = []

    matikka = Kurssisuoritus("Matematiikka 1", 5, date(2020, 3, 11))
    ohj1 = Kurssisuoritus("Ohjelmointi 1", 6, date(2019, 12, 17))

    suoritukset.append(matikka)
    suoritukset.append(ohj1)

    # Lisätään suoraan listaan muutama
    suoritukset.append(Kurssisuoritus("Fysiikka 2", 4, date(2019, 11, 10)))
    suoritukset.append(Kurssisuoritus("Ohjelmointi 2", 5, date(2020, 5, 19)))

    # Käydään läpi kaikki suoritukset, tulostetaan nimet ja lasketaan opintopisteet yhteen
    pisteet = 0
    for suoritus in suoritukset:
        print(suoritus.anna_kurssi())
        pisteet += suoritus.anna_opintopisteet()

    print("Pisteitä yhteensä:", pisteet)


```

Listaan ei itse asiassa oikeasti tallenneta olioita, vaan _viittauksia olioihin_. Niinpä sama olio voi esiintyä listassa useaan kertaan (eli käytännössä samaan olioon voidaan viitata useaan kertaan listassa ja sen ulkoupuolella):

KUVA

Esimerkiksi:

```python

class Koira:
    __nimi = ""

    def __init__(self, nimi):
        self.__nimi = nimi

    def aseta_nimi(self, nimi):
        self.__nimi = nimi

    def __repr__(self):
        return self.__nimi


k = Koira("Musti")
lista = (k, k, Koira("Musti"))
print(k)
print(lista)

print("Muutetaan arvoa...")
k.aseta_nimi("Rekku")
print(k)
print(lista)

print("Muutetaan arvoa listasta...")
lista[0].aseta_nimi("Fifi")
print(k)
print(lista)

print("Viimeinen olio listassa on eri olio kuin muut")
lista[2].aseta_nimi("Turre")
print(k)
print(lista)

```

<sample-output>

Musti
(Musti, Musti, Musti)
Muutetaan muuttujan k kautta arvoa...
Rekku
(Rekku, Rekku, Musti)
Muutetaan arvoa listasta...
Fifi
(Fifi, Fifi, Musti)
Viimeinen olio listassa on eri olio kuin muut
Fifi
(Fifi, Fifi, Turre)

</sample-output>

Listan kaksi ensimmäistä alkiota viittaavat samaan Koira-luokan olioon kuin muuttuja `k`. Niinpä olion sisältöä voidaan muuttaa minkä tahansa näistä viittauksista avulla. Viimeinen alkio listassa on viittaus kokonaan toiseen olioon - niinpä muutokset eivät vaikuta siihen (lukuunottamatta viimeistä muokkausta, joka kohdistuu tähän olioon).

Omista luokista muodostettuja olioita voi myös tallentaa esimerkiksi sanakirjaan (tai mihin tahansa tietorakenteeseen):

```python

# ESIMERKKI TÄHÄN

```

## Oliot parametrina

Koska omista luoduista luodut oliot ovat (yleensä) muuttuvia eli mutatoituvia, niiden toiminta parametrina välitettäessä muistuttaa listoista tuttua tapaa. Funktio, jolle olio välitetäään parametrina, voi muuttaa saamaansa oliota (edellyttäen että olio tarjoaa asiakkailleen muuttaamiseen tarvittavat operaatiot).

Tarkastellaan yksinkertaista esimerkkiä, jossa funktiolle välitetään Opiskelija-luokasta luotu olio. Funktion sisällä muutetaan opiskelijan nimi, ja muutos näkyy myös pääohjelmassa (koska molemmissa tilanteissa viitataan samaan olioon):

```python

class Opiskelija:
    __nimi = ""
    __opiskelijanumero = ""
    __opintopisteet = 0

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet: int):
        self.__nimi = nimi
        self.__opiskelijanumero = opiskelijanumero
        self.__opintopisteet = opintopisteet

    # Esimerkissä on toteutettu vain nimi-attribuutin asetusmetodi,
    # loput asetus- ja havainnointimetodit puuuttuvat
    def aseta_nimi(self, nimi: str):
        self.__nimi = nimi

    def __repr__(self):
        return f"Opiskelija, nimi: {self.__nimi}, opiskelijanumero: {self.__opiskelijanumero}, opintopisteet: {self.__opintopisteet}"


# Huomaa, että tyyppivihjeenä käytetään nyt oman luokan nimeä
def muuta_nimi(opiskelija: Opiskelija):
    opiskelija.aseta_nimi("Olli Opiskelija")

# Luodaan opiskelijaolio
o = Opiskelija("Olli Oppilas", "12345", 10)

print(o)
muuta_nimi(o)
print(o)

```

<sample-output>

Opiskelija, nimi: Olli Oppilas, opiskelijanumero: 12345, opintopisteet: 10
Opiskelija, nimi: Olli Opiskelija, opiskelijanumero: 12345, opintopisteet: 10

</sample-output>


Olion voi myös luoda funktiossa. Mikäli funktio palauttaa viittauksen olioon, on muodostettu olio käytettävissä myös pääohjelmassa:

```python

from random import randint, choice

class Opiskelija:
    __nimi = ""
    __opiskelijanumero = ""
    __opintopisteet = 0

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet: int):
        self.__nimi = nimi
        self.__opiskelijanumero = opiskelijanumero
        self.__opintopisteet = opintopisteet

    # Esimerkissä on toteutettu vain nimi-attribuutin asetusmetodi,
    # loput asetus- ja havainnointimetodit puuuttuvat
    def aseta_nimi(self, nimi: str):
        self.__nimi = nimi

    def __repr__(self):
        return f"Opiskelija, nimi: {self.__nimi}, opiskelijanumero: {self.__opiskelijanumero}, opintopisteet: {self.__opintopisteet}"


# Metodi luo ja palauttaa Opiskelija-olion, jolla on satunnainen nimi, opiskelijanumero ja pistemäärä
def uusi_opiskelija():
    etunimet = ["Arto","Pekka","Minna","Mari"]
    sukunimet = ["Virtanen", "Lahtinen", "Leinonen", "Pythonen"]

    # arvo nimi
    nimi = choice(etunimet) + " " + choice(sukunimet)

    # Arvo opiskelijanumero
    opnro = str(randint(10000,99999))

    # Arvo opintopistemääärä
    op = randint(0,300)

    # Luo ja palauta opiskelijaolio
    return Opiskelija(nimi, opnro, op)


if __name__ == "__main__":
    # kutsutaan metodia viideksi, tallennetaan tulokset listaan
    opiskelijat = []
    for i in range(5):
        opiskelijat.append(uusi_opiskelija())

    # Tulostetaan
    for opiskelija in opiskelijat:
        print(opiskelija)

```

<sample-output>

Opiskelija, nimi: Mari Lahtinen, opiskelijanumero: 36213, opintopisteet: 257
Opiskelija, nimi: Arto Virtanen, opiskelijanumero: 11859, opintopisteet: 55
Opiskelija, nimi: Mari Pythonen, opiskelijanumero: 77330, opintopisteet: 261
Opiskelija, nimi: Arto Pythonen, opiskelijanumero: 86451, opintopisteet: 263
Opiskelija, nimi: Minna Pythonen, opiskelijanumero: 86211, opintopisteet: 290

</sample-output>

# Oliot attribuutteina

Aikaisemmin nähtiin esimerkkejä luokista, joissa attribuutteina oli käytetty esimerkiksi listoja. Samalla tavalla myös omista luokista luotuja olioita voi käyttää toisten olioiden attribuutteina. Seuraavissa esimerkeissä on määritelty luokat Kurssi, Opiskelija ja Kurssisuoritus. Kurssisuorituksessa hyödynnetään kahta ensimmäistä luokkaa. Luokkien sisäinen toteutus on jätetty hyvin lyhyeksi, jotta esimerkki ei paisuisi mahdottoman pitkäksi.

Esimerkissä jokainen luokka on kirjoitettu omaan tiedostoonsa.

Esitellään aluksi luokka Kurssi, joka on määritelty tiedostossa `kurssi.py`:

```python

# Luokka mallintaa yhtä kurssia
class Kurssi:
    __nimi = ""
    __koodi = ""
    __opintopisteet = 0

    def __init__(self, nimi: str, koodi: str, opintopisteet: int):
        self.__nimi = nimi
        self.__koodi = koodi
        self.__opintopisteet = opintopisteet

    def anna_nimi(self):
        return self.__nimi

    def aseta_nimi(self, nimi: str):
        self.__nimi = nimi

    def anna_koodi(self):
        return self.__koodi

    def aseta_koodi(self, koodi: str):
        self.__koodi = koodi

    def anna_opintopisteet(self):
        return self.__opintopisteet

    def aseta_opintopisteet(self, opintopisteet: int):
        self.__opintopisteet = opintopisteet

    def __repr__(self):
        return f"{Kurssi}, nimi: {self.__nimi}, koodi: {self.__koodi}, opintopisteet: {self.__opintopisteet}"

```

Luokka Opiskelija mallintaa yhtä opiskelijaa. Luokka on määritelty tiedostossa `opiskelija.py`:

```python

class Opiskelija:
    __nimi = ""
    __opiskelijanumero = ""
    __opintopisteet = 0

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet: int):
        self.__nimi = nimi
        self.__opiskelijanumero = opiskelijanumero
        self.__opintopisteet = opintopisteet

    def anna_nimi(self):
        return self.__nimi

    def aseta_nimi(self, nimi: str):
        self.__nimi = nimi

    def anna_opiskelijanumero(self):
        return self.__opiskelijanumero

    def aseta_opiskelijanumero(self, opiskelijanumero: str):
        self.__opiskelijanumero = opiskelijanumero

    def anna_opintopisteet(self):
        return self.__opintopisteet

    def aseta_opintopisteet(self, opintopisteet: int):
        self.__opintopisteet = opintopisteet

    def __repr__(self):
        return f"{Opiskelija}, nimi: {self.__nimi}, opiskelijanumero: {self.__opiskelijanumero}, opintopisteet: {self.__opintopisteet}"

```

Luokka Opintosuoritus hyödyntää luokkia Kurssi ja Opiskelija suorituksen tallentamiseen. Huomaa, että luokat tuodaan mukaan `import`-lauseella:

```python

from kurssi import Kurssi
from opiskelija import Opiskelija

class Opintosuoritus:
    __opiskelija = Opiskelija("", "", 0)
    __kurssi = Kurssi("", "", 0)
    __arvosana = 0

    def __init__(self, opiskelija: Opiskelija, kurssi: Kurssi, arvosana: int):
        self.__opiskelija = opiskelija
        self.__kurssi = kurssi
        self.__arvosana = arvosana

    def anna_opiskelija(self):
        return self.__opiskelija

    def aseta_opiskelija(self, opiskelija: Opiskelija):
        self.__opiskelija = opiskelija

    def anna_kurssi(self):
        return self.__kurssi

    def aseta_kurssi(self, kurssi: Kurssi):
        self.__kurssi = kurssi

    def anna_arvosana(self):
        return self.__arvosana

    def aseta_arvosana(self, arvosana: int):
        self.__arvosana = arvosana

    def __repr__(self):
        return f"{Opintosuoritus}, opiskelija: {self.__opiskelija}, kurssi: {self.__kurssi}, arvosana: {self.__arvosana}"


```

Esimerkki opintosuoritusten lisäämisestä listaan:

```python

from opintosuoritus import Opintosuoritus

# Opiskelijat
olli = Opiskelija("Olli","1234",10)
pekka = Opiskelija("Pekka", "3210",23)
leena = Opiskelija("Leena", "9999", 43)
tiina = Opiskelija("Tiina", "3333", 8)

# ..listaksi
opiskelijat = [olli, pekka, leena, tiina]

# Kurssi
ohpe = Kurssi("Ohjelmoinnin perusteet", "ohpe1", 5)

# Luo suoritukset kaikille opiskelijoille, kaikille arvosanaksi 3
suoritukset = []
for opiskelija in opiskelijat:
    suoritukset.append(Opintosuoritus(opiskelija, ohpe, 3))

# Tulostetaan kaikista suorituksista opiskelijan nimi
for suoritus in suoritukset:
    print(suoritus.anna_opiskelija().anna_nimi())

```

<sample-output>

Olli
Pekka
Leena
Tiina

</sample-output>

Tarkastellaan lähemmin riviä `print(suoritus.anna_opiskelija().anna_nimi())`:

* `suoritus` on luokan `Opintosuoritus` mukainen olio
* Niinpä metodi `annaOpiskelija()` palauttaa `Opiskelija`-olion
* `Opiskelija`-luokan metodi `annaNimi()` palauttaa opiskelijan nimen








