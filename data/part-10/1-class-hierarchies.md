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
    k1 = Kirja("7 veljestä", "Aleksis rock")
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
7 veljestä (Aleksis rock)
Sinuhe (Mika Waltari)
Tuntematon sotilas (Väinö Linna)

Hyllyssä:
Tuntematon sotilas (Väinö Linna)
Sinuhe (Mika Waltari)
7 veljestä (Aleksis rock)

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

<programming-exercise name='Laptop computer' tmcname='part10-01_laptop_computer'>

The exercise template contains a class definition for a `Computer`, which has the attributes `model` and `speed`.

Please define a class named `LaptopComputer` which _inherits the class Computer_. The constructor of the new class should take a third argument: `weight` of type integer.

Please also include a `__str__` method. See the example below for the expected format of the default printout.

```python
laptop = LaptopComputer("NoteBook Pro15", 1500, 2)
print(laptop)
```

<sample-output>

NoteBook Pro15, 1500 MHz, 2 kg

</sample-output>

</programming-exercise>

<programming-exercise name='Game Museum' tmcname='part10-02_game_museum'>

The exercise template contains class definitions for a `ComputerGame` and a `GameWarehouse`. A GamesWarehouse object is used to store ComputerGame objects.

Please familiarize yourself with these classes. Then define a new class named `GameMuseum` which inherits the `GameWarehouse` class.

The GameMuseum class should _override_ the `list_games()` method so that it returns a list of only those games which were made before the year 1990.

The new class should also have a constructor which _calls the constructor from the parent class GameWarehouse_. The constructor takes no arguments.

You may use the following code to test your implementation:

```python
museum = GameMuseum()
museum.add_game(ComputerGame("Pacman", "Namco", 1980))
museum.add_game(ComputerGame("GTA 2", "Rockstar", 1999))
museum.add_game(ComputerGame("Bubble Bobble", "Taito", 1986))
for game in museum.list_games():
    print(game.name)
```

<sample-output>

Pacman
Bubble Bobble

</sample-output>

</programming-exercise>

<programming-exercise name='Areas' tmcname='part10-03_areas'>

The exercise template contains a class definition for a `Rectangle`. It represents a [rectangle shape](https://en.wikipedia.org/wiki/Rectangle). A Rectangle works like this:

```python
rectangle = Rectangle(2, 3)
print(rectangle)
print("area:", rectangle.area())
```

<sample-output>

rectangle 2x3
area: 6

</sample-output>

## Square

Please define a class named `Square` which inherits the `Rectangle` class. The sides of a [square](https://en.wikipedia.org/wiki/Square) are all of equal length, which makes the square a special case of the rectangle. The new class should not contain any new attributes.

A Square object is used as follows:

```python
square = Square(4)
print(square)
print("area:", square.area())
```

<sample-output>

square 4x4
area: 16

</sample-output>

</programming-exercise>

<programming-exercise name='Word game' tmcname='part10-04_word_game'>

The exercise template contains a class definition for a `WordGame`. It provides some basic functions for playing different word-based games:

```python
import random

class WordGame():
    def __init__(self, rounds: int):
        self.wins1 = 0
        self.wins2 = 0
        self.rounds = rounds

    def round_winner(self, player1_word: str, player2_word: str):
        # determine a random winner
        return random.randint(1, 2)

    def play(self):
        print("Word game:")
        for i in range(1, self.rounds+1):
            print(f"round {i}")
            answer1 = input("player1: ")
            answer2 = input("player2: ")

            if self.round_winner(answer1, answer2) == 1:
                self.wins1 += 1
                print("player 1 won")
            elif self.round_winner(answer1, answer2) == 2:
                self.wins2 += 1
                print("player 2 won")
            else:
                pass # it's a tie

        print("game over, wins:")
        print(f"player 1: {self.wins1}")
        print(f"player 2: {self.wins2}")
```

The game is played as follows:

```python
p = WordGame(3)
p.play()
```

<sample-output>

Word game:
round 1
player1: **longword**
player2: **??**
player 2 won
round 2
player1: **i'm the best**
player2: **wut?**
player 1 won
round 3
player1: **who's gonna win**
player2: **me**
player 1 won
game over, wins:
player 1: 2
player 2: 1

</sample-output>

In this "basic" version of the game the winner is determined randomly. The input from the players has no effect on the result.

## Longest word wins

Please define a class named `LongestWord`. It is a version of the game where whoever types in the longest word on each round wins.

The new version of the game is implemented by _inheriting_ the `WordGame` class. The `round_winner` method should also be suitably overridden. The outline of the new class is as follows:

```python
class LongestWord(WordGame):
    def __init__(self, rounds: int):
        super().__init__(rounds)

    def round_winner(self, player1_word: str, player2_word: str):
        # your code for determining the winner goes here
```

An example of how the new game is played:

```python
p = LongestWord(3)
p.play()
```

<sample-output>

Word game:
round 1
player1: **short**
player2: **longword**
player 2 won
round 2
player1: **sana**
player2: **wut?**
round 3
player1: **i'm the best**
player2: **no, me**
player 1 won
game over, wins:
player 1: 1
player 2: 1

</sample-output>

## Most vowels wins

Please define another WordGame class named `MostVowels`. In this version of the game whoever has squeezed more vowels into their word wins the round.

## Rock paper scissors

Finally, please define a class named `RockPaperScissors` which allows you to play a game of [rock paper scissors](https://en.wikipedia.org/wiki/Rock_paper_scissors).

The rules of the game are as follows:

- rock beats scissors (the rock can break the scissors but the scissors can't cut the rock)
- paper beats rock (the paper can cover the rock)
- scissors beats paper (the scissors can cut the paper)

If the input from either player is invalid, they lose the round. If both players type in something else than _rock_, _paper_ or _scissors_, the result is a tie.

An example of how the game is played:

```python
p = RockPaperScissors(4)
p.play()
```

<sample-output>

Word game:
round 1
player1: **rock**
player2: **rock**
round 2
player1: **rock**
player2: **paper**
player 2 won
round 3
player1: **scissors**
player2: **paper**
player 1 won
round 3
player1: **paper**
player2: **dynamite**
player 1 won
game over, wins:
player 1: 2
player 2: 1

</sample-output>

</programming-exercise>
