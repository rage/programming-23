---
path: '/part-10/2-access-modifiers'
title: 'Access modifiers'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

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

Luokan sisäisen eheyden kannalta tietorakenteena toimivan listan piilottaminen asiakkaalta on sinänsä järkevää, koska luokka tarjoaa itse sopivat operaatiot muistiinpanojen lisäämiseksi ja selaamiseksi. Ongelmalliseksi tilanne muodostuu, jos yritetään kirjoittaa `Muistikirja`-luokan perivät luokka `ProMuistikirja`, johon halutaan lisätä muistiinpanojen etsiminen ja järjestäminen. Piilotettu attribuutti ei ole käytettävissä myöskään aliluokissa; metodi `etsi_muistiinpanot` antaa kutsuttaessa virheen:

```python
class MuistikirjaPro(Muistikirja):
    """ Parempi muistikirja haku- ja järjestystoiminnoilla """
    def __init__(self):
        # Tämä on ok, koska luokan Muistikirja konstruktori
        # on julkinen
        super().__init__()

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

<sample-output>
    
AttributeError: 'MuistikirjaPro' object has no attribute '_MuistikirjaPro__muistiinpanot'

</sample-output>



## Suojatut piirteet

Toisin kuin joistain muista ohjelmointikielistä, Pythonista ei suoraan löydy ominaisuutta joka piilottaa piirteet asiakkailta mutta samaan aikaan avaa ne mahdollisille aliluokille. Ratkaisuksi Python-yhteisö onkin päätynyt _konventioon_ eli yleisesti ymmärrettyyn merkintätapaan _suojatuille_ (eli _protected_)  piirteille.

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
        super().__init__()

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
        super().__init__(nimi)
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


<programming-exercise name='Supergroup' tmcname='part10-05_supergroup'>

The exercise template contains a class definition for a `SuperHero`.

Please define a class named `SuperGroup` which represents a group of superheroes. The class should contain the following members:

* **Protected** attributes name (str), location (str) and members (list)
* A constructor which takes the name and location of the group as arguments, in that order
* Getter methods for the name and location attributes
* A method named `add_member(hero: SuperHero)` which adds a new member to the group
* A method named `print_group` which prints out information about the group and its members, following the format specified below

An example of the class in action:

```python
superperson = SuperHero("SuperPerson", "Superspeed, superstrength")
invisible = SuperHero("Invisible Inca", "Invisibility")
revengers = SuperGroup("Revengers", "Emerald City")

revengers.add_member(superperson)
revengers.add_member(invisible)
revengers.print_group()
```

<sample-output>

Revengers, Emerald City
Members:
SuperPerson, superskills: Superspeed, superstrength
Invisible Inca, superskills: Invisibility

</sample-output>

If you need a refresher on getter and setter methods, please have a look at [this section in the previous part](/part-9/3-encapsulation#getters-and-setters) of the material.

</programming-exercise>

<programming-exercise name='Secret magic potion' tmcname='part10-06_secret_magic_potion'>

The exercise template contains a class definition for a `MagicPotion` which allows you to save a recipe for a magic potion. The class definition contains a constructor along with the methods

* `add_ingredient(ingredient: str, amount: float)` and
* `print_recipe()`

Please define a class named `SecretMagicPotion` which inherits the `MagicPotion` class and allows you to also protect the recipe with a password.

The new class should have a constructor which also takes the password string as an argument.

The class should also contain the following methods:

* `add_ingredient(ingredient: str, amount: float, password: str)`
* `print_recipe(password: str)`

If the password argument to these methods is wrong, the methods should raise a `ValueError` exception.

If the password is correct, each method should call the relevant method in the parent class. Do not copy and paste anything from the MagicPotion class.

An example of how this would work:

```python
diminuendo = SecretMagicPotion("Diminuendo maximus", "hocuspocus")
diminuendo.add_ingredient("Toadstool", 1.5, "hocuspocus")
diminuendo.add_ingredient("Magic sand", 3.0, "hocuspocus")
diminuendo.add_ingredient("Frogspawn", 4.0, "hocuspocus")
diminuendo.print_recipe("hocuspocus")

diminuendo.print_recipe("pocushocus") # WRONG password!
```

<sample-output>

Diminuendo maximus:
Toadstool 1.5 grams
Magic sand 3.0 grams
Frogspawn 4.0 grams
Traceback (most recent call last):
  File "secret_magic_potion.py", line 98, in <module>
    raise ValueError("Wrong password!")
ValueError: Wrong password!

</sample-output>

</programming-exercise>
