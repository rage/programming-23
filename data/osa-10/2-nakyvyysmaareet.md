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

Miten siis piilottaa piirteet asiakkailta mutta samaan aikaan avata ne mahdollisille aliluokille? Ratkaisuksi Pythonissa on määritelty _suojattu (eli protected)_  näkyvyys piirteille.

Piirre voidaan piilottaa kirjoittamalla sen tunnisteen (eli nimen) eteen kaksi alaviivaa:

```python

def __init__(self):
    self.__muistiinpanot = []

```

Mikäli alaviivoja on vain yksi, piirre on _suojattu_, eli se näkyy aliluokissa mutta ei asiakkaille:

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
        self.__muistiinpanot.append(muistiinpano)

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


