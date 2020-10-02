---
path: '/osa-10/1-luokkahierarkiat'
title: 'Luokkahierarkiat'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät mitä tarkoitetaan perinnällä
- Osaat kirjoittaa luokkia jotka perivät jonkin toisen luokan
- Tiedät miten eri piirteet periytyvät

</text-box>

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

Yksinkertaistetustakin esimerkistä huomataan, että luokilla on yhteisiä piirteitä - tässä tapauksessa nimi ja puhelinnumero. Itse asiassa yhteisiä piirteitä olisi oikeasti paljon enemmänkin (esimerkiksi henkilötunnus, sähköpostiosoite ja osoite). Monessa tilanteessa olisi hyvä, jos yhteisiä piirteitä voitaisin käsitellä yhdellä operaatiolla: oletetaan tilanne, jossa koulun sähköpostitunnus muuttuu. Toki voitaisiin kirjoittaa kaksi käsittelfunktiota...

```python

def korjaa_email(o: Opiskelija):
    o.sposti = o.sposti.replace(".com", ".edu")

def korjaa_email2(o: Opettaja):
    o.sposti = o.sposti.replace(".com", ".edu")

```

...mutta saman koodin toistaminen kahteen kertaan olisi hassua. Olisi siis hyvä, jos molempien luokkien mukaisia olioita voitaisiin käsitellä yhdessä nipussa.

 Luokat kuitenkin sisältävät myös piirteitä, joita toisella luokalla ei ole. Sen takia luokkien yhdistäminen ei tunnu järkevältä.

 ## Perintä

 Ratkaisu löytyy olio-ohjelmoinnin tekniikasta nimeltä _perintä_. Perinnällä tarkoitetaan sitä, että luokka _perii_ piirteet joltain toiselta luokalta. Näiden perittyjen piirteiden rinnalle luokka voi sitten toteuttaa uusia piirteitä.

 Opettaja- ja Opiskelija-luokilla voisi olla yhteinen _yliluokka_ `Henkilo`:

 ```python

class Henkilo:

    def __init__(self, nimi: str, sposti: str):
        this.nimi = nimi
        this.sposti = sposti

 ```

 Luokassa on toteutettu siis henkilöön liittyvät piirteet. Nyt luoka Opiskelija ja Opettaja voivat _periä_ luokan ja lisätä perittyjen ominaisuuksien rinnalle uusia piirteitä:

 Perintä tapahtuu kirjoittamalla luokan nimen perään perittävän luokan nimi sulkuihin:

 ```python

class Henkilo:

    def __init__(self, nimi: str, sposti: str):
        this.nimi = nimi
        this.sposti = sposti

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
    """ Luokka mallinta laatikkoa, johon voidaan tallentaa kirjoja """

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
        Kirjalaatikko.__init__(self)

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
        Kirjalaatikko.__init__(self)

```

Yliluokan metodiin viitataan yliluokan nimellä. Huomaa, että tässä tapauksessa `self` pitää antaa parametriksi, vaikka yleensä Python lisää sen automaattisesti.

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
        Kirja.__init__(self, nimi, kirjailija)
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
        Bonuskortti.__init__(self)

    def laske_bonus(self):
        # Kutsutaan yliluokan metodia...
        bonus = Bonuskortti.laske_bonus(self)

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


<programming-exercise name='Pinta-alat' tmcname='osa10_'>
</programming-exercise>
