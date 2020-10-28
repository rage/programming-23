---
path: '/osa-10/2-nakyvyysmaareet'
title: 'Näkyvyysmääreet'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät mitä eroa on näkyvyysmääreillä yksityinen ja suojattu
- Tiedät, miten piirteiden näkyvyys määritetään Pythonissa

</text-box>

Aikaisemmin mainittiin, että yliluokassa yksityiseksi määritettyihin piirteiisin ei pääse käsiksi aliluokassa. Tarkastellaan esimerkkinä luokkaa `Muistikirja`, jossa muistiinpanojen säilyttämiseen käytettävä lista-attribuutti on piilotettu asiakkailta:

```python

class Muistikirja:
    """ Muistikirjaan voidaan tallentaa muistiinpanoja merkkijonoina """

    def __init__(self):
        # yksityinen attribuutti
        self.__muistiinpanot = []

    def lisaa_muistiinpano(self, muistiinpano):
        self.__muistiinpanot.append(muistiinpano)

    def palauta_muistiinpano(self, indeksi):
        return self.__muistiinpanot[indeksi]

    def kaikki_muistiinpanot(self):
        return ",".join(self.__muistiinpanot)

```

Luokan sisäisen eheyden kannalta tietorakenteena toimivan listan piilottaminen asiakkaalta on sinänsä järkevää, koska luokka tarjoaa itse sopivat operaatiot muistiinpanojen lisäämiseksi ja selaamiseksi. Ongelmalliseksi tilanne muodostuu, jos yritetään kirjoittaa `Muistikirja`-luokan perivät luokka `ProMuistikirja`, johon halutaan lisätä muistiinpanojen etsiminen ja järjestäminen. Piilotetttu attribuutti ei ole käytettävissä myöskään aliluokissa; metodi `etsi_muistiinpanot` antaa kutsuttaessa virheen:

```python
class MuistikirjaPro(Muistikirja):
    """ Parempi muistikirja haku- ja järjestystoiminnoilla """
    def __init__(self):
        # Tämä on ok, koska luokan Muistikirja konstruktori
        # on julkinen
        Muistikirja.__init__(self)

    # Tämä antaa virheen
    def etsi_muistiinpanot(self, hakusana):
        loydetty = []
        # Attribuutti __muistiinpanot on yksityinen, eikä näy
        # aliluokalle
        for muistiinpano in self.__muistiinpanot:
            if hakusana in muistiinpano:
                loydetty.append(muistiinpano)

        return loydetty

```

## Suojatut piirteet

Toisin kuin joistain muista ohjelmointikielistä, Pythonista ei suoraan löydy ominaisuutta joka piilottaa piirteet asiakkailta mutta samaan aikaan avata ne mahdollisille aliluokille. Ratkaisuksi Python-yhteisö onkin päätynyt _konventioon_ eli yleisesti ymmärrettyyn merkintätapaan _suojatuille (eli protected)_  piirteille.

Koska piirre voidaan piilottaa kirjoittamalla sen tunnisteen (eli nimen) eteen kaksi alaviivaa

```python

def __init__(self):
    self.__muistiinpanot = []

```

on yleisesti sovittu että yhdellä alaviivalla alkavat piirteet ovat tarkoitettu ainoastaan luokan ja sen aliluokkien käyttöön, eikä niitä tulisi käyttää suoraan sen ulkopuolelta.

```python

def __init__(self):
    self._muistiinpanot = []

```

Alla on esitetty koko muistikirjaesimerkki uudestaan niin, että muistiinpanot on merkitty suojatuiksi yliluokassa yksityisen sijasta:

```python

class Muistikirja:
    """ Muistikirjaan voidaan tallentaa muistiinpanoja merkkijonoina """

    def __init__(self):
        # suojattu attribuutti
        self._muistiinpanot = []

    def lisaa_muistiinpano(self, muistiinpano):
        self._muistiinpanot.append(muistiinpano)

    def palauta_muistiinpano(self, indeksi):
        return self._muistiinpanot[indeksi]

    def kaikki_muistiinpanot(self):
        return ",".join(self._muistiinpanot)

class MuistikirjaPro(Muistikirja):
    """ Parempi muistikirja haku- ja järjestystoiminnoilla """
    def __init__(self):
        # Tämä on ok, koska luokan Muistikirja konstruktori
        # on julkinen
        Muistikirja.__init__(self)

    # Nyt metodi toimii, koska suojattu attribuutti näkyy
    # aliluokalle
    def etsi_muistiinpanot(self, hakusana):
        loydetty = []
        for muistiinpano in self._muistiinpanot:
            if hakusana in muistiinpano:
                loydetty.append(muistiinpano)

        return loydetty

```

Seuraavassa taulukossa on vielä esitetty piirteiden näkyvyys kaikkien eri suojausmääreiden tapauksessa:

Näkyvyysmääre	| Esimerkki | Näkyy asiakkaalle | Näkyy aliluokalle
:--:|:----:|:----:|:----:
Julkinen | `self.nimi` | kyllä | kyllä
Suojattu | `self._nimi` | ei | kyllä
Yksityinen | `self.__nimi` | ei | ei

Näkyvyysmääreet toimivat vastaavasti kaikkien piirteiden kanssa. Luokassa Henkilo oleva metodi `isot_alkukirjaimet` on suojattu, joten sitä voi käyttää myös aliluokassa Jalkapalloilija:

```python

class Henkilo:
    def __init__(self, nimi: str):
        self._nimi = self._isot_alkukirjaimet(nimi)

    def _isot_alkukirjaimet(self, nimi):
        nimi_isoilla = []
        for n in nimi.split(" "):
            nimi_isoilla.append(n.capitalize())

        return " ".join(nimi_isoilla)

    def __repr__(self):
        return self.__nimi

class Jalkapalloilija(Henkilo):

    def __init__(self, nimi: str, lempinimi: str, pelipaikka: str):
        Henkilo.__init__(self, nimi)
        # metodia voi kutsua, koska se on suojattu yliluokassa
        self.__lempinimi = self._isot_alkukirjaimet(lempinimi)
        self.__pelipaikka = pelipaikka

    def __repr__(self):
        r =  f"Jalkapalloilija - nimi:{self._nimi}, lempinimi: {self.__lempinimi}"
        r += f", pelipaikka: {self.__pelipaikka}"
        return r

# Testataan
if __name__ == "__main__":
    jp = Jalkapalloilija("petri pythonen", "pyttis", "hyökkääjä")
    print(jp)

```

<sample-output>

Jalkapalloilija - nimi:Petri Pythonen, lempinimi: Pyttis, pelipaikka: hyökkääjä

</sample-output>


<programming-exercise name='Superryhmä' tmcname='osa10_XX_superryhma'>

Tehtäväpohjassa on valmiina luokka `SuperSankari`.

Kirjoita luokka `SuperRyhma`, joka mallintaa supersankareista koostuvaa ryhmää. Luokalla pitää olla seuraava piirteet:

* **Suojatut** attribuutit nimi (merkkijono), kotipaikka (merkkijono) ja jasenet (lista)
* Konstruktori, joka saa parametrikseen tässä järjestyksessä nimen ja kotipaikan
* Asetus- ja havainnointimetodit nimelle ja kotipaikalle
* Metodi `lisaa_jasen(sankari: SuperSankari)`, joka lisää uuden jäsenen ryhmään
* Metodi `tulosta_ryhma, joka tulostaa ryhmän ja sen jäsenten tiedot alla olevan esimerkin mukaisesti

Esimerkki luokan käytöstä:

```python
supermiekkonen = SuperSankari("Supermiekkonen", "Supernopeus, supervoimakkuus")
nakymaton = SuperSankari("Näkymätön Makkonen", "Näkymättömyys")
ryhma_z = SuperRyhma("Ryhmä Z", "Kälviä")

ryhma_z.lisaa_jasen(supermiekkonen)
ryhma_z.lisaa_jasen(nakymaton)
print(ryhma_z)
```

<sample-output>

Ryhmä Z, Kälviä
Jäsenet:
Supermiekkonen, superkyvyt: Supernopeus, supervoimakkuus
Näkymätön Makkonen, superkyvyt: Näkymättömyys

</sample-output>

</programming-exercise>

<programming-exercise name='Salaiset Taikajuomat' tmcname='osa10_XX_salaiset_taikajuomat'>

Tehtäväpohjassa on luokka `Taikajuoma`, johon käyttäjä voi tallentaa reseptin. Luokasta löytyy konstruktorin lisäksi metodit

* `lisaa_aines(ainesosa: str, maara: float)` ja
* `tulosta_resepti()`

Kirjoita `Taikajuoma`-luokan perivä luokka `SalainenTaikajuoma`, jolla resepti voidaan suojata salasanalla.

Uusi luokka saa konstruktorissa taikajuoman nimen lisäksi salasanan.

Lisäksi luokalla on metodit

* `lisaa_aines(ainesosa: str, maara: float, salasana: str)` ja
* `tulosta_resepti(salasana: str)`

Jos metodeja kutsutaan väärällä salasanalla, ne antavat `ValueError`-poikkeuksen.

Uudet metodit kutsuvat perityn luokan metodeja, jos salasana on oikein! Älä siis leikkaa ja liimaa toteutuksia luokasta Taikajuoma.

Esimerkki luokan käytöstä:

```python
kutistus = SalainenTaikajuoma("Kutistus maksimus", "hokkuspokkus")
kutistus.lisaa_aines("Kärpässieni", 1.5, "hokkuspokkus")
kutistus.lisaa_aines("Taikahiekka", 3.0, "hokkuspokkus")
kutistus.lisaa_aines("Sammankonkutu", 4.0, "hokkuspokkus")
kutistus.tulosta_resepti("hokkuspokkus")

kutistus.tulosta_resepti("pokkushokkus") # VÄÄRÄ SALASANA!
```

<sample-output>

Kutistus maksimus:
Kärpässieni 1.5 grammaa
Taikahiekka 3.0 grammaa
Sammankonkutu 4.0 grammaa
Traceback (most recent call last):
  File "salaiset_taikajuomat.py", line 98, in <module>
    raise ValueError("Väärä salasana!")
ValueError: Väärä salasana!

</sample-output>

</programming-exercise>
