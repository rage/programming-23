---
path: '/osa-9/1-oliot-ja-viittaukset'
title: 'Oliot ja viittaukset'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, miten olioita voi tallentaa tietorakenteisiin
- Tiedät, miten olioiden välitys parametrina toimii

</text-box>

Pythonissa kaikki arvot ovat olioita ja myös omista luokista luotuja olioita voi käsitellä kuin mitä tahansa muitakin olioita. Esimerkiksi olioita voidaan tallentaa listaan:

```python
from datetime import date

class Kurssisuoritus:

    def __init__(self, kurssi: str, opintopisteet: int, suorituspvm: date):
        self.kurssi = kurssi
        self.opintopisteet = opintopisteet
        self.suorituspvm = suorituspvm


if __name__ == "__main__":
    # Luodaan pari kurssisuoritusta ja lisätään listaan
    suoritukset = []

    mat1 = Kurssisuoritus("Matematiikka 1", 5, date(2020, 3, 11))
    ohj1 = Kurssisuoritus("Ohjelmointi 1", 6, date(2019, 12, 17))

    suoritukset.append(mat1)
    suoritukset.append(ohj1)

    # Lisätään suoraan listaan muutama
    suoritukset.append(Kurssisuoritus("Fysiikka 2", 4, date(2019, 11, 10)))
    suoritukset.append(Kurssisuoritus("Ohjelmointi 2", 5, date(2020, 5, 19)))

    # Käydään läpi kaikki suoritukset, tulostetaan nimet ja lasketaan opintopisteet yhteen
    opintopisteet = 0
    for suoritus in suoritukset:
        print(suoritus.kurssi)
        opintopisteet += suoritus.opintopisteet

    print("Opintopisteitä yhteensä:", opintopisteet)
```

<sample-output>

Matematiikka 1
Ohjelmointi 1
Fysiikka 2
Ohjelmointi 2
Opintopisteitä yhteensä: 20

</sample-output>

<programming-exercise name='Nopein auto' tmcname='osa09-01_nopein_auto'>

Tehtäväpohjassa oleva luokka `Auto` mallintaa autoa kahden attribuutin avulla: `merkki (str)` ja `huippunopeus (int)`.

Kirjoita funktio `nopein_auto(autot: list)`, joka saa parametrikseen listan `Auto`-luokan olioita.

Funktio palauttaa listassa olevista autoista nopeimman auton merkin. Voit olettaa, että nopein auto on yksikäsitteinen. Älä muuta alkuperäistä listaa tai luokkaa `Auto`.

Esimerkki funktion testauksesta:

```python
if __name__ == "__main__":
    auto1 = Auto("Mersu", 195)
    auto2 = Auto("Lada", 110)
    auto3 = Auto("Ferrari", 280)
    auto4 = Auto("Trabant", 85)

    autot = [auto1, auto2, auto3, auto4]
    print(nopein_auto(autot))
```

<sample-output>

Ferrari

</sample-output>

</programming-exercise>

<programming-exercise name='Hyväksytyt suoritukset' tmcname='osa09-02_hyvaksytyt_suoritukset'>

Tehtäväpohjasta löytyy luokka `Koesuoritus`, joka mallintaa nimensä mukaisesti koesuoritusta. Sillä on kaksi attribuuttia, `suorittaja (str)` ja `pisteet (int)`.

Kirjoita funktio `hyvaksytyt(suoritukset: list, pisteraja: int)`, joka saa parametrikseen listan koesuorituksia ja alimman hyväksytyn pistemäärän kokonaislukuna.

Funktio muodostaa ja palauttaa uuden listan, johon on tallennettu ainoastaan hyväksytyt suoritukset listalta. Älä muuta alkuperäistä listaa tai luokkaa `Koesuoritus`.

Esimerkki funktion käytöstä:

```python
if __name__ == "__main__":
    s1 = Koesuoritus("Pekka", 12)
    s2 = Koesuoritus("Pirjo", 19)
    s3 = Koesuoritus("Pauli", 15)
    s4 = Koesuoritus("Pirkko", 9)
    s5 = Koesuoritus("Petriina", 17)

    hyv = hyvaksytyt([s1, s2, s3, s4, s5], 15)
    for hyvaksytty in hyv:
        print(hyvaksytty)
```

<sample-output>

Koesuoritus (suorittaja: Pirjo, pisteet: 19)
Koesuoritus (suorittaja: Pauli, pisteet: 15)
Koesuoritus (suorittaja: Petriina, pisteet: 17)

</programming-exercise>

Listaan ei tarkkaan ottaen tallenneta olioita vaan _viittauksia olioihin_. Niinpä sama olio voi esiintyä listassa useaan kertaan ja samaan olioon voidaan viitata useaan kertaan listassa ja sen ulkopuolella. Esimerkiksi näin:

```python
class Tuote:
    def __init__(self, nimi: int, yksikko: str):
        self.nimi = nimi
        self.yksikko = yksikko


if __name__ == "__main__":
    kauppalista = []
    maito = Tuote("Maito", "litra")

    kauppalista.append(maito)
    kauppalista.append(maito)
    kauppalista.append(Tuote("Kurkku", "kpl"))
```

<img src="9_1_1.png">

Jos samaan olioon on useampi kuin yksi viittaus, on lopputuloksen kannalta yhdentekevää, mitä viittauksista käytetään:

```python
class Koira:
    def __init__(self, nimi):
        self.nimi = nimi

    def __str__(self):
        return self.nimi

koirat = []
musti = Koira("Musti")
koirat.append(musti)
koirat.append(musti)
koirat.append(Koira("Musti"))

print("Koirat alussa:")
for koira in koirat:
    print(koira)

print("Kohdan 0 koira saa uuden nimen:")
koirat[0].nimi = "Rekku"
for koira in koirat:
    print(koira)

print("Kohdan 2 koira saa uuden nimen:")
koirat[2].nimi = "Fifi"
for koira in koirat:
    print(koira)
```

<sample-output>

Koirat alussa:
Musti
Musti
Musti
Kohdan 0 koira saa uuden nimen:
Rekku
Rekku
Musti
Kohdan 2 koira saa uuden nimen:
Rekku
Rekku
Fifi

</sample-output>

Listan kohdissa 0 ja 1 on viittaus samaan olioon,  joten olion sisältöä voidaan muuttaa kumman tahansa viittauksen kautta. Listan kohdassa 2 on kuitenkin viittaus toiseen olioon, minkä vuoksi tämän olion muuttaminen ei muuta muita.

Operaattorilla `is` voidaan tutkia, onko kyseessä täysin sama olio, ja operaattorilla `==` voidaan tutkia, onko kyseessä saman sisältöinen olio. Seuraava koodi havainnollistaa asiaa:


```python
lista1 = [1, 2, 3]
lista2 = [1, 2, 3]
lista3 = lista1

print(lista1 is lista2)
print(lista1 is lista3)
print(lista2 is lista3)

print()

print(lista1 == lista2)
print(lista1 == lista3)
print(lista2 == lista3)
```

<sample-output>

False
True
False

True
True
True

</sample-output>

Omista luokista muodostettuja olioita voidaan myös tallentaa esimerkiksi sanakirjaan ja muihin tietorakenteisiin:

```python
class Opiskelija:
    def __init__(self, nimi: str, op: int):
        self.nimi = nimi
        self.op = op

if __name__ == "__main__":
    # Käytetään avaimena opiskelijanumeroa ja arvona Opiskelija-oliota
    opiskelijat = {}
    opiskelijat["12345"] = Opiskelija("Olli Opiskelija", 10)
    opiskelijat["54321"] = Opiskelija("Outi Opiskelija", 67)
```

[Visualisaattori](http://www.pythontutor.com/visualize.html#mode=edit) osaa havainnollistaa nämäkin asiat hienosti:

<img src="9_1_2.png">


## Selfillä vai ilman?

Kurssin aikana on havaittu, että `self`-määreen käytössä on monilla opiskelijoilla ollut häilyvyyttä. Tarkastellaan nyt milloin selfiä tulee käyttää, ja milloin sitä kannattaa olla käyttämättä.

Tarkastellaan esimerkkinä yksinkertaista luokkaa, jonka avulla joukosta sanoja on mahdollista muodostaa sanasto:

```python
class Sanasto:
    def __init__(self):
        self.__sanat = []

    def lisaa_sana(self, sana: str):
        if not sana in self.__sanat:
            self.__sanat.append(sana)

    def tulosta(self):
        for sana in sorted(self.__sanat):
            print(sana)

sanasto = Sanasto()
sanasto.lisaa_sana("python")
sanasto.lisaa_sana("olio")
sanasto.lisaa_sana("olio-ohjelmointi")
sanasto.lisaa_sana("olio")
sanasto.lisaa_sana("nörtti")

sanasto.tulosta()
```

<sample-output>

nörtti
olio
olio-ohjelmointi
python

</sample-output>

Luokka tallentaa sanalistan oliomuuttujaan `self.__sanat`, tässä tapauksessa `self` tarvitaan ehdottomasti, muuten sama lista ei ole kaikkien olion metodien käytettävissä.

Lisätään luokalle metodi `pisin_sana(self)` joka selvittää nimensä mukaisesti sanaston pisimmän sanan (tai yhden niistä).

Kurssilla on nähty seuraavan kaltaisia ratkaisuja:

```python
class Sanasto:
    def __init__(self):
        self.__sanat = []

    # ...

    def pisin_sana(self):
        # määritellään kaksi apumuuttujaa
        self.pisin = ""
        self.pisimman_pituus = 0

        for sana in self.__sanat:
            if len(sana) > self.pisimman_pituus:
                self.pisimman_pituus = len(sana)
                self.pisin = sana

        return self.pisin
```

Metodi siis käyttää kahta apumuuttujaa, jotka on määritely käyttäen `self`-määrettä. Monet kurssin opiskelijat näyttävät kiintyneen huonoon muuttujien nimeämiseen, joten apumuuttujat saattaisivat olla nimetty kryptisemmin, esim. `apu` ja `apu2`:

```python
class Sanasto:
    def __init__(self):
        self.__sanat = []

    # ...

    def pisin_sana(self):
        # määritellään kaksi apumuuttujaa
        self.apu = ""
        self.apu2 = 0

        for sana in self.__sanat:
            if len(sana) > self.apu2:
                self.apu2 = len(sana)
                self.apu = sana

        return self.apu
```

Tässä yhteydessä apumuuttujien määrittely käyttäen `self`-määrettä on todella huono idea. Kun muuttujan määrittely tapahtuu näin, liitetään muuttuja olion attribuutiksi, eli muuttuja tulee olemaan edelleen olemassa myös metodin suorituksen päätyttyä. Tämä taas on aivan tarpeetonta, koska apumuttujia ei ole tarkoitus käyttää missään muualla  luokan koodia kuin metodissa `pisin_sana(self)`.

Turhien ja varsinkin epämääräisesti nimettyjen apumuuttujien liittäminen `self`-määreella olion attribuuteiksi on paitsi turhaa niin myös riskialtista. Jos samaa apumuuttujaa `self.apu` käytetään monessa eri metodissa mutta täysin eri tarkoituksiin, voivat seuraukset olla arvaamattomat ja koodissa voi ilmetä hankalasti löydettäviä bugeja.

Ongelma voi tulla esiin erityisesti silloin jos apumuuttujan alkuarvo annetaan jossain muualla, esimerkiksi konstruktorissa

```python
class Sanasto:
    def __init__(self):
        self.__sanat = []
        # määritellään apumuuttujia
        self.apu = ""
        self.apu2 = ""
        self.apu3 = ""
        self.apu4 = ""

    # ...

    def pisin_sana(self):
        for sana in self.__sanat:
            # tämä ei toimi sillä apu2:n tyyppi on väärä
            if len(sana) > self.apu2:
                self.apu2 = len(sana)
                self.apu = sana

        return self.apu
```

Siispä oikea tapa määritellä yhdessä metodissa käytettävät apumuuttujat on tehdä se _ilman_ `self`-määrettä:

```python
class Sanasto:
    def __init__(self):
        self.__sanat = []

    # ...

    def pisin_sana(self):
        # tämä on oikea tapa määritellä yhden metodin sisäiset apumuuttujat
        pisin = ""
        pisimman_pituus = 0

        for sana in self.__sanat:
            if len(sana) > pisimman_pituus:
                pisimman_pituus = len(sana)
                pisin = sana

        return pisin
```

Kun näin tapahtuu, ovat apumuuttujat olemassa ainoastaan metodin suorituksen aikana, ja niissä olevat arvot eivät pääse aiheuttamaan komplikaatioita muussa koodissa.

## Oliot funktioiden parametrina

Koska omista luoduista luodut oliot ovat yleensä muuttuvia eli mutatoituvia, niiden toiminta parametrina välitettäessä muistuttaa listoista tuttua tapaa: funktio, jolle olio välitetäään parametrina, voi muuttaa saamaansa oliota.

Tarkastellaan yksinkertaista esimerkkiä, jossa funktiolle välitetään `Opiskelija`-luokasta luotu olio. Funktion sisällä muutetaan opiskelijan nimi, ja muutos näkyy myös pääohjelmassa, koska molemmissa tilanteissa viitataan samaan olioon.

```python
class Opiskelija:
    def __init__(self, nimi: str, opiskelijanumero: str):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero

    def __str__(self):
        return f"{self.nimi} ({self.opiskelijanumero})"

# Huomaa, että tyyppivihjeenä käytetään nyt oman luokan nimeä
def muuta_nimi(opiskelija: Opiskelija):
    opiskelija.nimi = "Olli Opiskelija"

# Luodaan opiskelijaolio
olli = Opiskelija("Olli Oppilas", "12345")

print(olli)
muuta_nimi(olli)
print(olli)
```

<sample-output>

Olli Oppilas (12345)
Olli Opiskelija (12345)

</sample-output>

Olion voi myös luoda funktiossa. Mikäli funktio palauttaa viittauksen olioon, on muodostettu olio käytettävissä myös pääohjelmassa:

```python
from random import randint, choice

class Opiskelija:
    def __init__(self, nimi: str, opiskelijanumero: str):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero

    def __str__(self):
        return f"{self.nimi} ({self.opiskelijanumero})"


# Metodi luo ja palauttaa Opiskelija-olion, jolla on satunnainen nimi ja opiskelijanumero
def uusi_opiskelija():
    etunimet = ["Arto","Pekka","Minna","Mari"]
    sukunimet = ["Virtanen", "Lahtinen", "Leinonen", "Pythonen"]

    # arvo nimi
    nimi = choice(etunimet) + " " + choice(sukunimet)

    # Arvo opiskelijanumero
    opiskelijanumero = str(randint(10000,99999))

    # Luo ja palauta opiskelijaolio
    return Opiskelija(nimi, opiskelijanumero)

if __name__ == "__main__":
    # Kutsutaan metodia viidesti, tallennetaan tulokset listaan
    opiskelijat = []
    for i in range(5):
        opiskelijat.append(uusi_opiskelija())

    # Tulostetaan
    for opiskelija in opiskelijat:
        print(opiskelija)
```

<sample-output>

Mari Lahtinen (36213)
Arto Virtanen (11859)
Mari Pythonen (77330)
Arto Pythonen (86451)
Minna Pythonen (86211)

</sample-output>

## Oliot metodien parametrina

Oliot toimivat normaaliin tapaan myös _metodien_ parametrina. Tarkastellaan seuraavaa esimerkkiä:

```python
class Henkilo:
    def __init__(self, nimi: str, pituus: int):
        self.nimi = nimi
        self.pituus = pituus

class Huvipuistolaite:
    def __init__(self, nimi: str, pituusraja: int):
        self.kavijoita = 0
        self.nimi = nimi
        self.pituusraja = pituusraja

    def ota_kyytiin(self, henkilo: Henkilo):
        if henkilo.pituus >= self.pituusraja:
            self.kavijoita += 1
            print(f"{henkilo.nimi} pääsi kyytiin")
        else:
            print(f"{henkilo.nimi} liian lyhyt :(")

    def __str__(self):
        return f"{self.nimi} ({self.kavijoita} kävijää)"
```

Huvipuistolaitteen metodi `ota_kyytiin` saa nyt parametrina luokan `Henkilo` olion. Jos kävijä on riittävän pitkä, metodi päästää hänet laitteeseen ja lisää kävijöiden määrää. Seuraavassa esimerkkisuoritus:

```python
hurjakuru = Huvipuistolaite("Hurjakuru", 120)
jarkko = Henkilo("Jarkko", 172)
venla = Henkilo("Venla", 105)

hurjakuru.ota_kyytiin(jarkko)
hurjakuru.ota_kyytiin(venla)

print(hurjakuru)
```

<sample-output>

Jarkko pääsi kyytiin
Venla liian lyhyt :(
Hurjakuru (1 kävijää)

</sample-output>

<programming-exercise name='Kasvatuslaitos' tmcname='osa09-03_kasvatuslaitos'>

Tehtäväpohjassasi on valmiina jo luokka `Henkilo` sekä runko luokalle `Kasvatuslaitos`. Kasvatuslaitosoliot käsittelevät ihmisiä eri tavalla, esim. punnitsevat ja syöttävät ihmisiä. Rakennamme tässä tehtävässä kasvatuslaitoksen. Luokan `Henkilo` koodiin ei tehtävässä ole tarkoitus koskea!

## Henkilöiden punnitseminen

Kasvatuslaitoksen luokkarungossa on valmiina runko metodille punnitse:

```python
class Kasvatuslaitos:
    def punnitse(self, henkilo: Henkilo):
        # palautetaan parametrina annetun henkilön paino
        return -1
```

Metodi saa parametrina henkilön ja metodin on tarkoitus palauttaa kutsujalleen parametrina olevan henkilön paino. Paino selviää kutsumalla parametrina olevan henkilön henkilo sopivaa metodia. Sinun tulee täydentää metodin koodia sopivasti.

Seuraavassa on pääohjelma jossa kasvatuslaitos punnitsee kaksi henkilöä:

```python
haagan_neuvola = Kasvatuslaitos()

eero = Henkilo("Eero", 1, 110, 7)
pekka = Henkilo("Pekka", 33, 176, 85)

print(f"{eero.nimi} painaa {haagan_neuvola.punnitse(eero)} kg")
print(f"{pekka.nimi} painaa {haagan_neuvola.punnitse(pekka)} kg")
```

<sample-output>

Eero painaa 7 kg
Pekka painaa 85 kg

</sample-output>

## Syöttäminen

Parametrina olevan olion tilaa on mahdollista muuttaa. Tee kasvatuslaitokselle metodi `syota(henkilo: Henkilo)` joka kasvattaa parametrina olevan henkilön painoa yhdellä.

Seuraavassa on esimerkki, jossa henkilöt ensin punnitaan ja tämän jälkeen neuvolassa syötetään Eeroa kolme kertaa. Tämän jälkeen henkilöt taas punnitaan:

```python
haagan_neuvola = Kasvatuslaitos()

eero = Henkilo("Eero", 1, 110, 7)
pekka = Henkilo("Pekka", 33, 176, 85)

print(f"{eero.nimi} painaa {haagan_neuvola.punnitse(eero)} kg")
print(f"{pekka.nimi} painaa {haagan_neuvola.punnitse(pekka)} kg")

haagan_neuvola.syota(eero)
haagan_neuvola.syota(eero)
haagan_neuvola.syota(eero)

print(f"{eero.nimi} painaa {haagan_neuvola.punnitse(eero)} kg")
print(f"{pekka.nimi} painaa {haagan_neuvola.punnitse(pekka)} kg")
```

Tulostuksen pitäisi paljastaa, että Eeron paino on noussut kolmella:

<sample-output>

Eero painaa 7 kg
Pekka painaa 85 kg

Eero painaa 10 kg
Pekka painaa 85 kg

</sample-output>

## Punnitusten laskeminen

Tee kasvatuslaitokselle metodi `punnitukset()` joka kertoo, kuinka monta punnitusta kasvatuslaitos on ylipäätään tehnyt. Huom! Tarvitset uuden oliomuuttujan punnitusten lukumäärän laskemiseen. Testipääohjelma:

```python
haagan_neuvola = Kasvatuslaitos()

eero = Henkilo("Eero", 1, 110, 7)
pekka = Henkilo("Pekka", 33, 176, 85)

print(f"Punnituksia tehty {haagan_neuvola.punnitukset()}")

haagan_neuvola.punnitse(eero)
haagan_neuvola.punnitse(eero)

print(f"Punnituksia tehty {haagan_neuvola.punnitukset()}")

haagan_neuvola.punnitse(eero)
haagan_neuvola.punnitse(eero)
haagan_neuvola.punnitse(eero)
haagan_neuvola.punnitse(eero)

print(f"Punnituksia tehty {haagan_neuvola.punnitukset()}")
```

<sample-output>

Punnituksia tehty 0
Punnituksia tehty 2
Punnituksia tehty 6

</sample-output>

</programming-exercise>

<programming-exercise name='Maksukortti ja kassapääte' tmcname='osa09-04_maksukortti_ja_kassapaate'>

Teimme edellisessä osan [tehtävässä](/osa-8/5-lisaa-esimerkkeja#programming-exercise-maksukortti) luokan `Maksukortti`. Kortilla oli metodit edullisesti ja maukkaasti syömistä sekä rahan lataamista varten.

Edellisen osan tyylillä tehdyssä `Maksukortti`-luokassa oli kuitenkin ongelma. Kortti tiesi lounaiden hinnan ja osasi sen ansiosta vähentää saldoa oikean määrän. Entä kun hinnat nousevat? Tai jos myyntivalikoimaan tulee uusia tuotteita? Hintojen muuttaminen tarkoittaisi, että kaikki jo käytössä olevat kortit pitäisi korvata uudet hinnat tuntevilla korteilla.

Parempi ratkaisu on tehdä kortit "tyhmiksi", hinnoista ja myytävistä tuotteista tietämättömiksi pelkän saldon säilyttäjiksi. Kaikki äly kannattaakin laittaa erillisiin olioihin, kassapäätteisiin.

## "Tyhmä" maksukortti

Toteutetaan ensin `Maksukortti`-luokasta "tyhmä" versio. Kortilla on ainoastaan metodit saldon kysymiseen, rahan lataamiseen ja rahan ottamiseen. Täydennä alla ja tehtäväpohjassa olevaan luokkaan metodin `ota_rahaa(maara)` ohjeen mukaan:

```python
class Maksukortti:
    def __init__(self, saldo: float):
        self.saldo = saldo

    def lataa_rahaa(self, lisays: float):
        self.saldo += lisays

    def ota_rahaa(self, maara: float):
        pass
        # Toteuta metodi siten, että se ottaa kortilta rahaa vain, jos saldoa riittää
        # Onnistuessaan metodi palauttaa True ja muuten False
```

Testipääohjelma:

```python
if __name__ == "__main__":
    kortti = Maksukortti(10)
    print("Rahaa", kortti.saldo)
    tulos = kortti.ota_rahaa(8)
    print("Onnistuiko otto:", tulos)
    print("Rahaa", kortti.saldo)
    tulos = kortti.ota_rahaa(4)
    print("Onnistuiko otto:", tulos)
    print("Rahaa", kortti.saldo)
```

<sample-output>

Rahaa 10
Onnistuiko otto: True
Rahaa 2
Onnistuiko otto: False
Rahaa 2

</sample-output>

## Kassapääte ja käteiskauppa

Unicafessa asioidessa asiakas maksaa joko käteisellä tai maksukortilla. Myyjä käyttää kassapäätettä kortin veloittamiseen ja käteismaksujen hoitamiseen. Tehdään ensin kassapäätteestä käteismaksuihin sopiva versio.

Kassapäätteen runko on seuraavanlainen. Metodien kommentit kertovat halutun toiminnallisuuden.

```python
class Kassapaate:
    def __init__(self):
        # Kassassa on aluksi 1000 euroa rahaa
        self.rahaa = 1000
        self.edulliset = 0
        self.maukkaat = 0

    def syo_edullisesti(self, maksu: float):
        # Edullinen lounas maksaa 2.50 euroa.
        # Kasvatetaan kassan rahamäärää edullisen lounaan hinnalla ja palautetaan vaihtorahat
        # Jos parametrina annettu maksu ei ole riittävän suuri, ei lounasta myydä ja metodi palauttaa koko summan

    def syo_maukkaasti(self, maksu: float):
        # Maukas lounas maksaa 4.30 euroa.
        # Kasvatetaan kassan rahamäärää maukkaan lounaan hinnalla ja palautetaan vaihtorahat
        # Jos parametrina annettu maksu ei ole riittävän suuri, ei lounasta myydä ja metodi palauttaa koko summan
```

Käyttöesimerkki

```python
exactum = Kassapaate()

vaihtorahaa = exactum.syo_edullisesti(10)
print("Vaihtorahaa jäi", vaihtorahaa)

vaihtorahaa = exactum.syo_edullisesti(5)
print("Vaihtorahaa jäi", vaihtorahaa)

vaihtorahaa = exactum.syo_maukkaasti(4.3)
print("Vaihtorahaa jäi", vaihtorahaa)

print("Kassassa rahaa", exactum.rahaa)
print("Edullisia lounaita myyty", exactum.edulliset)
print("Maukkaita lounaita myyty", exactum.maukkaat)
```

<sample-output>

Vaihtorahaa jäi 7.5
Vaihtorahaa jäi 2.5
Vaihtorahaa jäi 0.0
Kassassa rahaa 1009.3
Edullisia lounaita myyty 2
Maukkaita lounaita myyty 1

</sample-output>

## Kortilla maksaminen

Laajennetaan kassapäätettä siten, että myös kortilla voi maksaa. Teemme kassapäätteelle siis metodit, joiden parametrina kassapääte saa maksukortin, jolta se vähentää valitun lounaan hinnan. Seuraavassa ovat uusien metodien rungot ja ohje niiden toteuttamiseksi:

```python
class Kassapaate:
    # ...

    def syo_edullisesti_kortilla(self, kortti: Maksukortti):
        # Edullinen lounas maksaa 2.50 euroa
        # Jos kortilla on tarpeeksi rahaa, vähennetään hinta kortilta ja palautetaan True
        # Muuten palautetaan False


    def syo_maukkaasti_kortilla(self, kortti: Maksukortti):
        # Maukas lounas maksaa 4.30 euroa.
        # Jos kortilla on tarpeeksi rahaa, vähennetään hinta kortilta ja palautetaan True
        # Muuten palautetaan False
```

**Huom:** kortilla maksaminen ei lisää kassapäätteessä olevan käteisen määrää.

Seuraavassa on testipääohjelma ja haluttu tulostus:

```python
exactum = Kassapaate()

vaihtorahaa = exactum.syo_edullisesti(10)
print("Vaihtorahaa jäi", vaihtorahaa)

kortti = Maksukortti(7)

tulos = exactum.syo_maukkaasti_kortilla(kortti)
print("Riittikö raha:", tulos)
tulos = exactum.syo_maukkaasti_kortilla(kortti)
print("Riittikö raha:", tulos)
tulos = exactum.syo_edullisesti_kortilla(kortti)
print("Riittikö raha:", tulos)

print("Kassassa rahaa", exactum.rahaa)
print("Edullisia lounaita myyty", exactum.edulliset)
print("Maukkaita lounaita myyty", exactum.maukkaat)
```

<sample-output>

Vaihtorahaa jäi 7.5
Riittikö raha: True
Riittikö raha: False
Riittikö raha: True
Kassassa rahaa 1002.5
Edullisia lounaita myyty 2
Maukkaita lounaita myyty 1

</sample-output>

## Rahan lataaminen

Lisätään vielä kassapäätteelle metodi jonka avulla kortille voidaan ladata lisää rahaa. Muista, että rahan lataamisen yhteydessä ladattava summa viedään kassapäätteeseen. Metodin runko:

```python
def lataa_rahaa_kortille(self, kortti: Maksukortti, summa: float):
    pass
```

Testipääohjelma ja esimerkkisyöte:

```python
exactum = Kassapaate()

antin_kortti = Maksukortti(2)
print(f"Kortilla rahaa {antin_kortti.saldo} euroa")

tulos = exactum.syo_maukkaasti_kortilla(antin_kortti)
print("Riittikö raha:", tulos)

exactum.lataa_rahaa_kortille(antin_kortti, 100)
print(f"Kortilla rahaa {antin_kortti.saldo} euroa")

tulos = exactum.syo_maukkaasti_kortilla(antin_kortti)
print("Riittikö raha:", tulos)
print(f"Kortilla rahaa {antin_kortti.saldo} euroa")

print("Kassassa rahaa", exactum.rahaa)
print("Edullisia lounaita myyty", exactum.edulliset)
print("Maukkaita lounaita myyty", exactum.maukkaat)
```

<sample-output>

Kortilla rahaa 2.0 euroa
Riittikö raha: False
Kortilla rahaa 102.0 euroa
Riittikö raha: True
Kortilla rahaa 97.7 euroa
Kassassa rahaa 1100
Edullisia lounaita myyty 0
Maukkaita lounaita myyty 1

</sample-output>

</programming-exercise>

## Saman luokan oliot metodien parametrina

Tarkastellaan jälleen kerran yhtä versiota luokasta `Henkilo`:

```python
class Henkilo:
    def __init__(self, nimi: str, syntynyt: int):
        self.nimi = nimi
        self.syntynyt = syntynyt
```

Oletetaan että olemme tekemässä ohjelmaa, joka vertailee henkilöiden ikiä. Voisimme tehdä tarkoitusta varten erillisen funktion:

```python
def vanhempi_kuin(henkilo1: Henkilo, henkilo2: Henkilo):
    if henkilo1.syntynyt < henkilo2.syntynyt:
        return True
    else:
        return False

muhammad = Henkilo("Muhammad ibn Musa al-Khwarizmi", 780)
pascal = Henkilo("Blaise Pascal", 1623)
grace = Henkilo("Grace Hopper", 1906)

if vanhempi_kuin(muhammad, pascal):
    print(f"{muhammad} on vanhempi kuin {pascal}")
else:
    print(f"{muhammad} ei ole vanhempi kuin {pascal}")

if vanhempi_kuin(grace, pascal):
    print(f"{grace} on vanhempi kuin {pascal}")
else:
    print(f"{grace} ei ole vanhempi kuin {pascal}")
```

<sample-output>

Muhammad ibn Musa al-Khwarizmi on vanhempi kuin Blaise Pascal
Grace Hopper ei ole vanhempi kuin  Blaise Pascal

</sample-output>

Olio-ohjelmoinnin henkeen kuuluu kuitenkin sijoittaa oliota käsittelevät "funktiot" luokan metodeiksi. Voisimmekin tehdä henkilölle metodin, jonka avulla henkilön ikää voidaan verrata _toiseen_ henkilöön:

```python
class Henkilo:
    def __init__(self, nimi: str, syntynyt: int):
        self.nimi = nimi
        self.syntynyt = syntynyt

    # huomaa, että tyyppivihje pitää antaa hipsuissa jos parametri on saman luokan olio!
    def vanhempi_kuin(self, toinen: "Henkilo"):
        if self.syntynyt < toinen.syntynyt:
            return True
        else:
            return False
```

Nyt siis olio itse on `self` ja `toinen` on henkilöolio, joka toimii vertailukohtana.

Huomaa, miten metodin kutsuminen eroaa funktion kutsumisesta:

```python
muhammad = Henkilo("Muhammad ibn Musa al-Khwarizmi", 780)
pascal = Henkilo("Blaise Pascal", 1623)
grace = Henkilo("Grace Hopper", 1906)

if muhammad.vanhempi_kuin(pascal):
    print(f"{muhammad.nimi} on vanhempi kuin {pascal.nimi}")
else:
    print(f"{muhammad.nimi} ei ole vanhempi kuin {pascal.nimi}")

if grace.vanhempi_kuin(pascal):
    print(f"{grace.nimi} on vanhempi kuin {pascal.nimi}")
else:
    print(f"{grace.nimi} ei ole vanhempi kuin {pascal.nimi}")
```

Pisteen vasemmalla puolella on siis verrattava henkilö, eli olio, johon metodin suorituksessa viittaa muuttuja `self`. Metodin parametrina taas on vertailukohta, eli metodin suorituksessa muuttujan `toinen` viittaama olio.

Ohjelman tulostus on sama kuin edellisessä funktiota käyttäneessä esimerkissä.

Huomaa, että if-else-rakenne metodissa `vanhempi_kuin` on oikeastaan turha, sillä vertailun arvona on suoraan haluamamme totuusarvo. Voimme siis yksinkertaistaa metodia seuraavasti:

```python
class Henkilo:
    def __init__(self, nimi: str, syntynyt: int):
        self.nimi = nimi
        self.syntynyt = syntynyt

    # huomaa, että tyyppivihje pitää antaa hipsuissa jos parametri on saman luokan olio!
    def vanhempi_kuin(self, toinen: "Henkilo)":
        return self.syntynyt < toinen.syntynyt:
```

Edellisestä esimerkistä kannattaa huomata se, että kun metodi saa parametrikseen toisen saman luokan olion, tulee tyyppivihe antaa hipsuissa, eli seuraava koodi aiheuttaisi virheen:

```python
class Henkilo:
    # ...

    # tämä ei toimi, Henkilo pitaa olla hipsuissa
    def vanhempi_kuin(self, toinen: Henkilo):
        return self.syntynyt < toinen.syntynyt:
```

<programming-exercise name='Asuntovertailu' tmcname='osa09-05_asuntovertailu'>

Asuntovälitystoimiston tietojärjestelmässä kuvataan myynnissä olevaa asuntoa seuraavasta luokasta tehdyillä olioilla:

```python
class Asunto:
    def __init__(self, huoneita: int, nelioita: int, neliohinta: int):
        self.huoneita = huoneita
        self.nelioita = nelioita
        self.neliohinta = neliohinta
```

Tehtävänä on toteuttaa metodeita, joiden avulla myynnissä olevia asuntoja voidaan vertailla.

## Onko suurempi

Tee metodi `suurempi(self, verrattava)`, joka palauttaa `True`, jos asunto-olio itse on pinta-alaltaan suurempi kuin verrattava asunto-olio.

Esimerkki metodin toiminnasta:

```python
eira_yksio = Asunto(1, 16, 5500)
kallio_kaksio = Asunto(2, 38, 4200)
jakomaki_kolmio = Asunto(3, 78, 2500)

print(eira_yksio.suurempi(kallio_kaksio))
print(jakomaki_kolmio.suurempi(kallio_kaksio))
```

<sample-output>

False
True

</sample-output>

## Hintaero

Tee metodi `hintaero(self, verrattava)`, joka palauttaa asunto-olion ja verrattavan asunto-olion hintaeron. Hintaero on asuntojen hintojen erotuksen (hinta lasketaan kertomalla neliöhinta neliöillä) itseisarvo.

Esimerkki metodin toiminnasta:

```python
eira_yksio = Asunto(1, 16, 5500)
kallio_kaksio = Asunto(2, 38, 4200)
jakomaki_kolmio = Asunto(3, 78, 2500)

print(eira_yksio.hintaero(kallio_kaksio))
print(jakomaki_kolmio.hintaero(kallio_kaksio))
```

<sample-output>

71600
35400

</sample-output>

## Onko kalliimpi?

Tee metodi `kalliimpi(self, verrattava)` joka palauttaa `True`, jos asunto-olio on kalliimpi kuin verrattavana oleva asunto-olio.

Esimerkki metodin toiminnasta:

```python
eira_yksio = Asunto(1, 16, 5500)
kallio_kaksio = Asunto(2, 38, 4200)
jakomaki_kolmio = Asunto(3, 78, 2500)

print(eira_yksio.kalliimpi(kallio_kaksio))
print(jakomaki_kolmio.kalliimpi(kallio_kaksio))
```

<sample-output>

False
True

</sample-output>

</programming-exercise>
