---
path: '/part-10/1-class-hierarchies'
title: 'Class hierarchies'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät mitä tarkoitetaan perinnällä
- Osaat kirjoittaa luokkia jotka perivät jonkin toisen luokan
- Tiedät miten eri piirteet periytyvät

</text-box>

## Luokkien erikoistaminen

Joskus tulee vastaan tilanne, jossa luokan toimintaa olisi hyvä pyrkiä erikoistamaan, mutta vain osalle olioista. Tarkastellaan esimerkkinä tilannetta, jossa meillä on kaksi luokkaa - Opiskelija ja Opettaja. Yksinkertaistuksen vuoksi luokista on jätetty pois kaikki asetus- ja havainnointimetodit.

```python

class Opiskelija:

    def __init__(self, nimi: str, opnro: str, sposti: str, opintopisteet: str):
        self.nimi = nimi
        self.opnro = opnro
        self.sposti = sposti
        self.opintopisteet = opintopisteet

class Opettaja:

    def __init__(self, nimi: str, sposti: str, huone: str, opetusvuosia: int):
        self.nimi = nimi
        self.sposti = sposti
        self.huone = huone
        self.opetusvuosia = opetusvuosia

```

Yksinkertaistetustakin esimerkistä huomataan, että luokilla on yhteisiä piirteitä - tässä tapauksessa nimi ja sähköpostiosoite. Monessa tilanteessa olisi hyvä, jos yhteisiä piirteitä voitaisin käsitellä yhdellä operaatiolla: oletetaan tilanne, jossa koulun sähköpostitunnus muuttuu. Toki voitaisiin kirjoittaa kaksi käsittelyfunktiota...

```python

def korjaa_email(o: Opiskelija):
    o.sposti = o.sposti.replace(".com", ".edu")

def korjaa_email2(o: Opettaja):
    o.sposti = o.sposti.replace(".com", ".edu")

```

...mutta saman koodin toistaminen kahteen kertaan tuntuu turhalta työltä, ja lisää virheiden mahdollisuutta. Olisi siis hyvä, jos molempien luokkien mukaisia olioita voitaisiin käsitellä samalla metodilla.

Luokat kuitenkin sisältävät myös piirteitä, joita toisella luokalla ei ole. Sen takia luokkien yhdistäminen ei tunnu järkevältä.

 ## Perintä

 Ratkaisu löytyy olio-ohjelmoinnin tekniikasta nimeltä _perintä_. Perinnällä tarkoitetaan sitä, että luokka _perii_ piirteet joltain toiselta luokalta. Näiden perittyjen piirteiden rinnalle luokka voi sitten toteuttaa uusia piirteitä.

 Opettaja- ja Opiskelija-luokilla voisi olla yhteinen _yliluokka_ `Henkilo`:

 ```python

class Henkilo:

    def __init__(self, nimi: str, sposti: str):
        self.nimi = nimi
        self.sposti = sposti

 ```

 Luokassa on toteutettu siis henkilöön liittyvät piirteet. Nyt luokat Opiskelija ja Opettaja voivat _periä_ luokan ja lisätä perittyjen ominaisuuksien rinnalle uusia piirteitä:

 Perintä tapahtuu kirjoittamalla luokan nimen perään perittävän luokan nimi sulkuihin:

 ```python

class Henkilo:

    def __init__(self, nimi: str, sposti: str):
        self.nimi = nimi
        self.sposti = sposti

    def vaihda_spostitunniste(self, uusi_tunniste: str):
        vanha = self.sposti.split("@")[1]
        self.sposti = self.sposti.replace(vanha, uusi_tunniste)

class Opiskelija(Henkilo):

    def __init__(self, nimi: str, opnro: str, sposti: str, opintopisteet: str):
        self.nimi = nimi
        self.opnro = opnro
        self.sposti = sposti
        self.opintopisteet = opintopisteet

class Opettaja(Henkilo):

    def __init__(self, nimi: str, sposti: str, huone: str, opetusvuosia: int):
        self.nimi = nimi
        self.sposti = sposti
        self.huone = huone
        self.opetusvuosia = opetusvuosia

# Testi
if __name__ == "__main__":
    olli = Opiskelija("Olli Opiskelija", "1234", "olli@example.com", 0)
    olli.vaihda_spostitunniste("example.edu")
    print(olli.sposti)

    outi = Opettaja("Outi Ope", "outi@example.fi", "A123", 2)
    outi.vaihda_spostitunniste("example.ex")
    print(outi.sposti)

 ```

 Koska sekä Opiskelija että Opettaja perivät luokan Henkilo, molemmilla on käytössään Henkilo-luokassa määritellyt piirteet, mukaanlukien metodi `vaihda_spostitunniste`.

 Tarkastellaan vielä toista esimerkkiä, jossa luokka Kirjahylly perii luokan Laatikko:

 ```python
class Kirja:
    """ Luokka mallintaa yksinkertaista kirjaa """
    def __init__(self, nimi: str, kirjailija: str):
        self.nimi = nimi
        self.kirjailija = kirjailija


class Kirjalaatikko:
    """ Luokka mallintaa laatikkoa, johon voidaan tallentaa kirjoja """

    def __init__(self):
        self.kirjat = []

    def lisaa_kirja(self, kirja: Kirja):
        self.kirjat.append(kirja)

    def listaa_kirjat(self):
        for kirja in self.kirjat:
            print(f"{kirja.nimi} ({kirja.kirjailija})")

class Kirjahylly(Kirjalaatikko):
    """ Luokka mallintaa yksinkertaista kirjahyllyä """

    def __init__(self):
        super().__init__()

    def lisaa_kirja(self, kirja: Kirja, paikka: int):
        self.kirjat.insert(paikka, kirja)


 ```

 Luokassa Kirjahylly on määritelty metodi `lisaa_kirja`. Samanniminen metodi on määritelty myös yliluokassa `Kirjalaatikko`. Tällaisessa tapauksessa puhutaan metodin _uudelleenmäärittelystä_ tai ylikirjoituksesta (overwriting): aliluokan samanniminen metodi korvaa yliluokan vastaavan metodin.

 Esimerkissämme idea on, että kirjalaatikossa kirja asetetaan aina laatikossa päällimäiseksi, mutta kirjahyllyssä voidaan määritellä asetuspaikka. Sen sijaan metodin `listaa_kirjat` uudelleenmäärittelyä ei ole nähty tarpeelliseksi - sama kirjojen listaus toimii niin laatikossa kuin hyllyssäkin (ainakin esimerkissämme).

 Tarkastellaan esimerkkiä luokkien käyttämisestä:

 ```python

if __name__ == "__main__":
    # Luodaan pari kirjaa testiksi
    k1 = Kirja("7 veljestä", "Aleksis Kivi")
    k2 = Kirja("Sinuhe", "Mika Waltari")
    k3 = Kirja("Tuntematon sotilas", "Väinö Linna")

    # Luodaan kirjalaatikko ja lisätään kirjat sinne
    laatikko = Kirjalaatikko()
    laatikko.lisaa_kirja(k1)
    laatikko.lisaa_kirja(k2)
    laatikko.lisaa_kirja(k3)

    # Luodaan kirjahylly ja lisätään kirjat sinne (aina hyllyn alkupäähän)
    hylly = Kirjahylly()
    hylly.lisaa_kirja(k1, 0)
    hylly.lisaa_kirja(k2, 0)
    hylly.lisaa_kirja(k3, 0)


    # Tulostetaan
    print("Laatikossa:")
    laatikko.listaa_kirjat()

    print()

    print("Hyllyssä:")
    hylly.listaa_kirjat()

 ```

 <sample-output>

Laatikossa:
7 veljestä (Aleksis Kivi)
Sinuhe (Mika Waltari)
Tuntematon sotilas (Väinö Linna)

Hyllyssä:
Tuntematon sotilas (Väinö Linna)
Sinuhe (Mika Waltari)
7 veljestä (Aleksis Kivi)

 </sample-output>

 Myös Kirjahylly-luokasta muodostettujen olioiden kautta voidaan käyttää metodia `listaa_kirjat`, koska perinnän ansiosta se on olemassa myös luokan `Kirjahylly` aliluokissa.

 ## Piirteiden periytyminen

 Aliluokka perii yliluokalta kaikki piirteet. Aliluokasta voidaan viitata suoraan yliluokan piirteisiin, paitsi jos yliluokassa on määritelty piirteet yksityisiksi (käyttämällä kahta alaviivaa muuttujan nimen edessä).

 Niinpä esimerkiksi Kirjahylly-luokasta voitaisiin viitata yliluokan konstruktoriin sen sijaan että kirjoitettaisiin toiminnallisuus uudestaan:

 ```python

 class Kirjahylly(Kirjalaatikko):

    def __init__(self):
        super().__init__()

```

Yliluokan konstuktoriin (tai yliluokkaan muutenkin) viitataan funktion `super()` avulla. Huomaa, että tässäkin tapauksessa parametri `self` lisätään automaattisesti.

Tarkastellaan toisena esimerkkinä luokkaa Gradu, joka perii luokan Kirja. Aliluokasta kutsutaan yliluokan konstruktoria:

```python

class Kirja:
    """ Luokka mallintaa yksinkertaista kirjaa """

    def __init__(self, nimi: str, kirjailija: str):
        self.nimi = nimi
        self.kirjailija = kirjailija


class Gradu(Kirja):
    """ Luokka mallintaa gradua eli ylemmän korkeakoulututkinnon lopputyötä """

    def __init__(self, nimi: str, kirjailija: str, arvosana: int):
        super().__init__(nimi, kirjailija)
        self.arvosana = arvosana

```

Nyt Gradu-luokan konstruktorista kutsutaan yliluokan (eli luokan Kirja) konstruktoria, jossa asetetaan attribuuttien `nimi` ja `kirjailija` arvot. Sen jälkeen aliluokan konstruktorissa asetetaan attribuutin `arvosana` arvo - tätä luonnollisesti ei voida tehdä yliluokan konstruktorissa, koska yliluokalla ei tällaista attribuuttia ole.

Luokkaa voidaan käyttää esimerkiksi näin:


```python

# Testataan
if __name__ == "__main__":
    gradu = Gradu("Python ja maailmankaikkeus", "Pekka Python", 3)

    # Tulostetaan kenttien arvot
    print(gradu.nimi)
    print(gradu.kirjailija)
    print(gradu.arvosana)

```

<sample-output>

Python ja maailmankaikkeus
Pekka Python
3

</sample-output>

Koska aliluokka `Gradu` perii kaikki yliluokan piirteet, se perii myös attribuutit `nimi` ja `kirjailija`. Arvot osalle attribuuteista annetaan yliluokan sisältä löytyvässä konstruktorissa.

Aliluokka voi myös viitata yliluokan metodiin, vaikka metodi olisikin määritelty uudestaan aliluokassa. Seuraavassa esimerkissä luokasta `Platinakortti` kutsutaan uudelleenmääritellyssä metodissa `bonuspisteet` yliluokan vastaavaa metodia.

```python

class Tuote:

    def __init__(self, nimi: str, hinta: float):
        self.nimi = nimi
        self.hinta = hinta

class Bonuskortti:

    def __init__(self):
        self.ostetut_tuotteet = []

    def lisaa_tuote(self, tuote: Tuote):
        self.ostetut_tuotteet.append(tuote)

    def laske_bonus(self):
        bonus = 0
        for tuote in self.ostetut_tuotteet:
            bonus += tuote.hinta * 0.05

        return bonus

class Platinakortti(Bonuskortti):

    def __init__(self):
        super().__init__()

    def laske_bonus(self):
        # Kutsutaan yliluokan metodia...
        bonus = super().laske_bonus()

        # ...ja lisätään vielä viisi prosenttia päälle
        bonus = bonus * 1.05
        return bonus


```

Nyt platinakortin bonus lasketaan hyödyntämällä aluksi yliluokan vastaavaa metodia ja lisäämällä sitten ylimääräiset 5 prosenttia tähän bonukseen. Esimerkki luokkien käytöstä:

```python
if __name__ == "__main__":
    kortti = Bonuskortti()
    kortti.lisaa_tuote(Tuote("Banaanit", 6.50))
    kortti.lisaa_tuote(Tuote("Mandariinit", 7.95))
    bonus = kortti.laske_bonus()

    kortti2 = Platinakortti()
    kortti2.lisaa_tuote(Tuote("Banaanit", 6.50))
    kortti2.lisaa_tuote(Tuote("Mandariinit", 7.95))
    bonus2 = kortti2.laske_bonus()

    print(bonus)
    print(bonus2)
```

<sample-output>

0.7225
0.7586250000000001

</sample-output>

<programming-exercise name='Kannettava tietokone' tmcname='osa10-01_kannettava_tietokone'>

Tehtäväpohjassa on määritelty luokka `Tietokone`, jolla on attribuutit `malli` ja `nopeus`.

Kirjoita luokka `KannettavaTietokone`, joka _perii luokan Tietokone_. Luokka saa konstruktorissa luokan Tietokone attribuuttien lisäksi kolmannen kokonaislukutyyppisen attribuutin `paino`.

Kirjoita luokkaan lisäksi metodi `__str__`, jonka avulla voi tulostaa esimerkkisuorituksen mukaisen tulosteen olion tilasta.

Esimerkki:

```python
ipm = KannettavaTietokone("IPM MikroMauri", 1500, 2)
print(ipm)
```

<sample-output>

IPM MikroMauri, 1500 MHz, 2 kg

</sample-output>

</programming-exercise>

<programming-exercise name='Pelimuseo' tmcname='osa10-02_pelimuseo'>

Tehtäväpohjassa on määritelty luokat `Tietokonepeli` ja `Pelivarasto`. Pelivarastoon voidaan säilöä tietokonepelejä.

Tutustu luokkien ohjelmakoodiin ja kirjoita sitten uusi luokka `Pelimuseo`, joka perii luokan `Pelivarasto`.

Pelimuseo-luokassa _uudelleentoteutetaan_ metodi `anna_pelit()` niin, että se palauttaa listassa ainoastaan ne pelit, jotka on tehty ennen vuotta 1990.

Lisäksi luokassa tulee olla konstruktori, josta _kutsutaan yliluokan Pelivarasto konstruktoria_. Konstruktorilla ei ole parametreja.

Esimerkiksi:

```python
museo = Pelimuseo()
museo.lisaa_peli(Tietokonepeli("Pacman", "Namco", 1980))
museo.lisaa_peli(Tietokonepeli("GTA 2", "Rockstar", 1999))
museo.lisaa_peli(Tietokonepeli("Bubble Bobble", "Taito", 1986))
for peli in museo.anna_pelit():
    print(peli.nimi)
```

<sample-output>

Pacman
Bubble Bobble

</sample-output>

</programming-exercise>

<programming-exercise name='Pinta-alat' tmcname='osa10-03_pinta_alat'>

Tehtäväpohjan mukana tulee luokka `Suorakulmio` joka nimensä mukaisesti mallintaa [suorakulmiota](https://fi.wikipedia.org/wiki/Suorakulmio). Luokkaa käytetään seuraavasti:

```python
suorakulmio = Suorakulmio(2, 3)
print(suorakulmio)
print("pinta-ala:", suorakulmio.pinta_ala())
```

<sample-output>

suorakulmio 2x3
pinta-ala: 6

</sample-output>

## Neliö

Toteuta luokka `Nelio` joka perii luokan `Suorakulmio`. Suorakulmiosta poiketen [neliön](https://fi.wikipedia.org/wiki/Neli%C3%B6_(geometria)) kaikki sivut ovat saman pituisia, eli neliö on eräänlainen yksinkertaisempi erikoistapaus suorakulmiosta. Luokka ei saa määritellä uusia attribuutteja!

Luokkaa käytetään seuraavasti:

```python
nelio = Nelio(4)
print(nelio)
print("pinta-ala:", nelio.pinta_ala())
```

<sample-output>

neliö 4x4
pinta-ala: 16

</sample-output>

</programming-exercise>

<programming-exercise name='Sanapeli' tmcname='osa10-04_sanapeli'>

Tehtäväpohja sisältää valmiin luokan `Sanapeli`, joka tarjoaa perustoiminnallisuuden erilaisten sanapelien pelaamiseen:

```python
import random

class Sanapeli():
    def __init__(self, kierrokset: int):
        self.voitot1 = 0
        self.voitot2 = 0
        self.kierrokset = kierrokset

    def kierroksen_voittaja(self, pelaaja1_sana: str, pelaaja2_sana: str):
        # arvotaan voittaja
        return random.randint(1, 2)

    def pelaa(self):
        print("Sanapeli:")
        for i in range(1, self.kierrokset+1):
            print(f"kierros {i}")
            vastaus1 = input("pelaaja1: ")
            vastaus2 = input("pelaaja2: ")

            if self.kierroksen_voittaja(vastaus1, vastaus2) == 1:
                self.voitot1 += 1
                print("pelaaja 1 voitti")
            elif self.kierroksen_voittaja(vastaus1, vastaus2) == 2:
                self.voitot2 += 1
                print("pelaaja 2 voitti")
            else:
                pass # tasapeli

        print("peli päättyi, voitot:")
        print(f"pelaaja 1: {self.voitot1}")
        print(f"pelaaja 2: {self.voitot2}")
```

Peliä käytetään seuraavasti:

```python
p = Sanapeli(3)
p.pelaa()
```

Esimerkkitulostus

<sample-output>

Sanapeli:
kierros 1
pelaaja1: **pitkäsana**
pelaaja2: **??**
pelaaja 2 voitti
kierros 2
pelaaja1: **olen paras**
pelaaja2: **mitä?**
pelaaja 1 voitti
kierros 3
pelaaja1: **kuka voittaa**
pelaaja2: **minä**
pelaaja 1 voitti
peli päättyi voitot:
pelaaja 1: 2
pelaaja 2: 1

</sample-output>

Tässä pelin "perusversiossa" voittaja ratkaistaan arpomalla, pelaajien antamilla syötteillä ei ole tulokseen vaikutusta.

## Pisin sana voittaa

Tee nyt luokka `PisinSana` eli pelin versio, missä kunkin kierroksen voittaja on sen kierroksen aikana pidemmän sanan syöttänyt käyttäjä.

Uusi versio toteuteaan _perimällä_ luokka `Sanapeli` ja ylikirjoittamalla sen metodi `kierroksen_voittaja` sopivalla tavalla. Uuden luokan runko on siis seuraavanlainen

```python
class PisinSana(Sanapeli):
    def __init__(self, kierrokset: int):
        super().__init__(kierrokset)

    def kierroksen_voittaja(self, pelaaja1_sana: str, pelaaja2_sana: str):
        # tänne voittajan ratkaiseva koodi
```

Esimerkki toiminnasta:

```python
p = PisinSana(3)
p.pelaa()
```

<sample-output>

Sanapeli:
kierros 1
pelaaja1: lyhyt
pelaaja2: pitkäsana
pelaaja 2 voitti
kierros 2
pelaaja1: sana
pelaaja2: vat?
kierros 3
pelaaja1: olen paras
pelaaja2: minäpäs
pelaaja 1 voitti
peli päättyi, voitot:
pelaaja 1: 1
pelaaja 2: 1

</sample-output>

## Eniten vokaaleja voittaa

Tee nyt luokka `EnitenVokaaleja` eli pelin versio, missä kunkin kierroksen voittaja on se pelaaja, jonka sanassa oli enemmän vokaaleja.

## Kivi, paperi, sakset

Tee nyt luokka `KiviPaperiSakset` joka mallintaa nimensä mukaisesti [kivi, paperi ja sakset](https://fi.wikipedia.org/wiki/Kivi,_paperi_ja_sakset) -peliä.

Pelin sännöt ovat seuraavat:

- kivi voittaa sakset (kivellä voi rikkoa sakset eikä saksilla voi leikata kiveä)
- paperi voittaa kiven (kiven voi peittää paperilla)
- sakset voittaa paperin (saksilla voi leikata paperia)

Jos pelaajan syöte on epäkelpo, eli se ei ole mikään sanoista _kivi, paperi, sakset_ pelaaja häviää kierroksen, ellei molempien syöte ole epäkelpo.

Esimerkki toiminnasta:

```python
p = KiviPaperiSakset(4)
p.pelaa()
```

<sample-output>

Sanapeli:
kierros 1
pelaaja1: kivi
pelaaja2: kivi
kierros 2
pelaaja1: kivi
pelaaja2: paperi
pelaaja 2 voitti
kierros 3
pelaaja1: sakset
pelaaja2: paperi
pelaaja 1 voitti
kierros 3
pelaaja1: paperi
pelaaja2: dynamiitti
pelaaja 1 voitti
peli päättyi, voitot:
pelaaja 1: 2
pelaaja 2: 1

</sample-output>

</programming-exercise>
