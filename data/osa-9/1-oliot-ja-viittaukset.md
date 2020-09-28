---
path: '/osa-9/1-oliot-ja-viittaukset'
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

    def __init__(self, kurssi: str, opintopisteet: int, suorituspvm: date):
        self.kurssi = kurssi
        self.opintopisteet = opintopisteet
        self.suorituspvm = suorituspvm


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
        print(suoritus.kurssi)
        pisteet += suoritus.opintopisteet

    print("Pisteitä yhteensä:", pisteet)


```

Listaan ei itse asiassa oikeasti tallenneta olioita, vaan _viittauksia olioihin_. Niinpä sama olio voi esiintyä listassa useaan kertaan (eli käytännössä samaan olioon voidaan viitata useaan kertaan listassa ja sen ulkoupuolella):

KUVA

Esimerkiksi:

```python

class Koira:

    def __init__(self, nimi):
        self.nimi = nimi

    def __repr__(self):
        return self.nimi


k = Koira("Musti")
lista = (k, k, Koira("Musti"))
print(k)
print(lista)

print("Muutetaan arvoa...")
k.nimi = "Rekku"
print(k)
print(lista)

print("Muutetaan arvoa listasta...")
lista[0].nimi = "Fifi"
print(k)
print(lista)

print("Viimeinen olio listassa on eri olio kuin muut")
lista[2].nimi = "Turre"
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

## Oliot funktioiden parametrina

Koska omista luoduista luodut oliot ovat (yleensä) muuttuvia eli mutatoituvia, niiden toiminta parametrina välitettäessä muistuttaa listoista tuttua tapaa. Funktio, jolle olio välitetäään parametrina, voi muuttaa saamaansa oliota (edellyttäen että olio tarjoaa asiakkailleen muuttaamiseen tarvittavat operaatiot).

Tarkastellaan yksinkertaista esimerkkiä, jossa funktiolle välitetään Opiskelija-luokasta luotu olio. Funktion sisällä muutetaan opiskelijan nimi, ja muutos näkyy myös pääohjelmassa (koska molemmissa tilanteissa viitataan samaan olioon):

```python

class Opiskelija:

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet: int):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero
        self.opintopisteet = opintopisteet

    def __repr__(self):
        return f"Opiskelija, nimi: {self.nimi}, opiskelijanumero: {self.opiskelijanumero}, opintopisteet: {self.opintopisteet}"


# Huomaa, että tyyppivihjeenä käytetään nyt oman luokan nimeä
def muuta_nimi(opiskelija: Opiskelija):
    opiskelija.nimi = "Olli Opiskelija"

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

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet: int):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero
        self.opintopisteet = opintopisteet

    def __repr__(self):
        return f"Opiskelija, nimi: {self.nimi}, opiskelijanumero: {self.opiskelijanumero}, opintopisteet: {self.opintopisteet}"


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
    # kutsutaan metodia viidesti, tallennetaan tulokset listaan
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

## Oliot funktioiden parametrina

Olit toimivat normaaliin tapaan myös _metodeinen_ parametrina. Tarkastellaan seuraavaa esimerkkiä:

```python
class Henkilo:

    def __init__(self, nimi: str, pituus: int):
        self.nimi = nimi
        self.pituus = pituus

class Huvipuistolaite:
    def __init__(self, nimi, pituusraja):
        self.kavijoita = 0
        self.nimi = nimi
        self.pituusraja = pituusraja

    def ota_kyytiin(self, henkilo: Henkilo):
        if henkilo.pituus<self.pituusraja:
            return False

        self.kavijoita += 1
        return True

    def __repr__(self):
        return f"laite: {self.nimi}, kävijöitä {self.kavijoita}"
```

Huvipuistolaitteen metodi `ota_kyytiin` saa nyt parametrina luokan `Henkilo` olion. Metodi tarkistaa onko parametrina oleva henkilö liian lyhyt laitteeseen, ja palauttaa tässä tapauksessa `False`. Jos henkilö on riittävän pitkä, kasvattaa huvipuistolaite kävijämäärää yhdellä ja metodi palauttaa `True`. Seuraavassa esimerkkisuoritus:

```python
hurjakuru = Huvipuistolaite("hurjakuru", 120)
jarkko = Henkilo("Jarkko", 172)
venla = Henkilo("Venla", 105)

ok = hurjakuru.ota_kyytiin(jarkko)
if ok:
    print(f"{jarkko.nimi} pääasi kyytiin")
else:
    print(f"{jarkko.nimi} liian lyhyt :(")

ok = hurjakuru.ota_kyytiin(venla)
if ok:
    print(f"{venla.nimi} pääasi kyytiin")
else:
    print(f"{venla.nimi} liian lyhyt :(")

print(hurjakuru)
```

<sample-output>

Jarkko pääasi kyytiin
Venla liian lyhyt :(
laite: hurjakuru, kävijöitä 1

</sample-output>

<programming-exercise name='Kasvatuslaitos' tmcname='osa09-02_kasvatuslaitos'>

Tehtäväpohjassasi on valmiina jo luokka `Henkilo` sekä runko luokalle `Kasvatuslaitos`. Kasvatuslaitosoliot käsittelevät ihmisiä eri tavalla, esim. punnitsevat ja syöttävät ihmisiä. Rakennamme tässä tehtävässä kasvatuslaitoksen. Luokan `Henkilö` koodiin ei tehtävässä ole tarkoitus koskea!

## Henkilöiden punnitseminen

Kasvatuslaitoksen luokkarungossa on valmiina runko metodille punnitse:

```python
class Kasvatuslaitos

    punnitse(self, henkilo: Henkilo ) {
        // palautetaan parametrina annetun henkilön paino
        return -1
```

Metodi saa parametrina henkilön ja metodin on tarkoitus palauttaa kutsujalleen parametrina olevan henkilön paino. Paino selviää kutsumalla parametrina olevan henkilön henkilo sopivaa metodia. Eli täydennä metodin koodi!


Seuraavassa on pääohjelma jossa kasvatuslaitos punnitsee kaksi henkilöä:

```python
haaganNeuvola = Kasvatuslaitos()

eero = Henkilo("Eero", 1, 110, 7)
pekka = Henkilo("Pekka", 33, 176, 85)

print(f"{eero.nimi}: paino {haaganNeuvola.punnitse(eero)} kg")
print(f"{pekka.nimi}: paino {haaganNeuvola.punnitse(pekka)} kg")
```

<sample-output>

Eero paino: 7 kiloa
Pekka paino: 85 kiloa

</sample-output>

## Syöttäminen

Parametrina olevan olion tilaa on mahdollista muuttaa. Tee kasvatuslaitokselle metodi public void syota(Henkilo henkilo) joka kasvattaa parametrina olevan henkilön painoa yhdellä.

Seuraavassa esimerkki, jossa henkilöt ensin punnitaan, ja tämän jälkeen neuvolassa syötetään eeroa kolme kertaa. Tämän jälkeen henkilöt taas punnitaan:

```python
haaganNeuvola = Kasvatuslaitos()

eero = Henkilo("Eero", 1, 110, 7)
pekka = Henkilo("Pekka", 33, 176, 85)

print(f"{eero.nimi}: paino {haaganNeuvola.punnitse(eero)} kg")
print(f"{pekka.nimi}: paino {haaganNeuvola.punnitse(pekka)} kg")

haaganNeuvola.syota(eero)
haaganNeuvola.syota(eero)
haaganNeuvola.syota(eero)

print(f"{eero.nimi}: paino {haaganNeuvola.punnitse(eero)} kg")
print(f"{pekka.nimi}: paino {haaganNeuvola.punnitse(pekka)} kg")
```

Tulostuksen pitäisi paljastaa että Eeron paino on noussut kolmella:

<sample-output>

Eero paino: 7 kiloa
Pekka paino: 85 kiloa

Eero paino: 10 kiloa
Pekka paino: 85 kiloa

</sample-output>

## Punnitusten laskeminen

Tee kasvatuslaitokselle metodi public int punnitukset() joka kertoo kuinka monta punnitusta kasvatuslaitos on ylipäätään tehnyt. Huom! Tarvitset uuden oliomuuttujan punnitusten lukumäärän laskemiseen! Testipääohjelma:

```python

haaganNeuvola = Kasvatuslaitos()

eero = Henkilo("Eero", 1, 110, 7)
pekka = Henkilo("Pekka", 33, 176, 85)

print(f"punnituksia tehty {haaganNeuvola.punnitukset}")

haaganNeuvola.punnitse(eero)
haaganNeuvola.punnitse(eero)

print(f"punnituksia tehty {haaganNeuvola.punnitukset}")

haaganNeuvola.punnitse(eero)
haaganNeuvola.punnitse(eero)
haaganNeuvola.punnitse(eero)
haaganNeuvola.punnitse(eero)

print(f"punnituksia tehty {haaganNeuvola.punnitukset}")

```

<sample-output>

punnituksia tehty 0
punnituksia tehty 2
punnituksia tehty 6

</sample-output>

</programming-exercise>

<programming-exercise name='Maksukortti ja kassapääte' tmcname='osa09-03_maksukortti_ja_kassapaate'>

## "Tyhmä" Maksukortti

## Kassapääte ja käteiskauppa

## Kortilla maksaminen

## Rahan lataaminen

</programming-exercise>

## Oliot attribuutteina

Aikaisemmin nähtiin esimerkkejä luokista, joissa attribuutteina oli käytetty esimerkiksi listoja. Samalla tavalla myös omista luokista luotuja olioita voi käyttää toisten olioiden attribuutteina. Seuraavissa esimerkeissä on määritelty luokat Kurssi, Opiskelija ja Kurssisuoritus. Kurssisuorituksessa hyödynnetään kahta ensimmäistä luokkaa. Luokkien sisäinen toteutus on jätetty hyvin lyhyeksi, jotta esimerkki ei paisuisi mahdottoman pitkäksi.

Esimerkissä jokainen luokka on kirjoitettu omaan tiedostoonsa.

Esitellään aluksi luokka Kurssi, joka on määritelty tiedostossa `kurssi.py`:

```python

# Luokka mallintaa yhtä kurssia
class Kurssi:

    def __init__(self, nimi: str, koodi: str, opintopisteet: int):
        self.nimi = nimi
        self.koodi = koodi
        self.opintopisteet = opintopisteet

    def __repr__(self):
        return f"{Kurssi}, nimi: {self.nimi}, koodi: {self.koodi}, opintopisteet: {self.opintopisteet}"

```

Luokka Opiskelija mallintaa yhtä opiskelijaa. Luokka on määritelty tiedostossa `opiskelija.py`:

```python

class Opiskelija:

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet: int):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero
        self.opintopisteet = opintopisteet

    def __repr__(self):
        return f"{Opiskelija}, nimi: {self.nimi}, opiskelijanumero: {self.opiskelijanumero}, opintopisteet: {self.opintopisteet}"

```

Luokka Opintosuoritus hyödyntää luokkia Kurssi ja Opiskelija suorituksen tallentamiseen. Huomaa, että luokat tuodaan mukaan `import`-lauseella:

```python

from kurssi import Kurssi
from opiskelija import Opiskelija

class Opintosuoritus:

    def __init__(self, opiskelija: Opiskelija, kurssi: Kurssi, arvosana: int):
        self.opiskelija = opiskelija
        self.kurssi = kurssi
        self.arvosana = arvosana

    def __repr__(self):
        return f"{Opintosuoritus}, opiskelija: {self.opiskelija}, kurssi: {self.kurssi}, arvosana: {self.arvosana}"


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
    print(suoritus.opiskelija.nimi)

```

<sample-output>

Olli
Pekka
Leena
Tiina

</sample-output>

Tarkastellaan lähemmin riviä `print(suoritus.opiskelija.nimi)`:

* `suoritus` on luokan `Opintosuoritus` mukainen olio
* Niinpä muuttuja opiskelija viittaa suoritukseen tallennettuun `Opiskelija`-olioon
* `Opiskelija`-luokan muuttuja `nimi` sisältää opiskelijan nimen








