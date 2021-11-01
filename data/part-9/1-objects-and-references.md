---
path: '/part-9/1-objects-and-references'
title: 'Objects and references'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

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

<programming-exercise name='The fastest car' tmcname='part09-01_fastest_car'>

The exercise template contains a class named `Car` which represents the features of a car through two attributes: `make (str)` and `top_speed (int)`.

Please write a function named `fastest_car(cars: list)` which takes a list of `Car` objects as its argument.

The function should return the make of the fastest car. You may assume there will always be a single car with the highest top speed. Do not change the list given as an argument, or make any changes to the `Car` class definition.

You may use the following code to test your function:

```python
if __name__ == "__main__":
    car1 = Car("Saab", 195)
    car2 = Car("Lada", 110)
    car3 = Car("Ferrari", 280)
    car4 = Car("Trabant", 85)

    cars = [car1, car2, car3, car4]
    print(fastest_car(cars))
```

<sample-output>

Ferrari

</sample-output>

</programming-exercise>

<programming-exercise name='Passing submissions' tmcname='part09-02_passing_submissions'>

The exercise template contains a class named `ExamSubmission` which, as the name implies, models an examinee's submission in an exam. The class has two attributes defined: `examinee (str)` and `points (int)`.

Please write a function named `passed(submissions: list, lowest_passing: int)` which takes a list of exam submissions and an integer number representing the lowest passing grade as its arguments.

The function should create and return a new list, which contains only the passed submissions from the original list. Please do not change the list given as an argument, or make any changes to the `ExamSubmission` class definition.

You may use the following code to test your function:

```python
if __name__ == "__main__":
    s1 = ExamSubmission("Peter", 12)
    s2 = ExamSubmission("Pippa", 19)
    s3 = ExamSubmission("Paul", 15)
    s4 = ExamSubmission("Phoebe", 9)
    s5 = ExamSubmission("Persephone", 17)

    passes = passed([s1, s2, s3, s4, s5], 15)
    for passing in passes:
        print(passing)
```

<sample-output>

ExamSubmission (examinee: Pippa, points: 19)
ExamSubmission (examinee: Paul, points: 15)
ExamSubmission (examinee: Persephone, points: 17)

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

Tässä vaiheessa kurssia `self`-määre saattaa vaikuttaa vielä hämärältä. Käytetään siis hetki sen pohtimiseen, milloin selfiä tulee käyttää, ja milloin sitä kannattaa olla käyttämättä.

Tarkastellaan esimerkkinä yksinkertaista luokkaa, jonka avulla joukosta sanoja on mahdollista muodostaa sanasto:

```python
class Sanasto:
    def __init__(self):
        self.sanat = []

    def lisaa_sana(self, sana: str):
        if not sana in self.sanat:
            self.sanat.append(sana)

    def tulosta(self):
        for sana in sorted(self.sanat):
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

Luokka tallentaa sanalistan oliomuuttujaan `self.sanat`. Tässä tapauksessa `self` tarvitaan ehdottomasti sekä luokan konstruktorissa että luokan muissa metodeissa tähän muuttujaan viitatessa, koska muuten sama lista ei ole kaikkien olion metodien käytettävissä.

Lisätään luokalle metodi `pisin_sana(self)` joka selvittää nimensä mukaisesti sanaston pisimmän sanan (tai yhden niistä).

Tehtävän voisi toteuttaa vaikkapa seuraavasti, mutta näemme kohta miksei se ole kovin hyvä idea:

```python
class Sanasto:
    def __init__(self):
        self.sanat = []

    # ...

    def pisin_sana(self):
        # määritellään kaksi apumuuttujaa
        self.pisin = ""
        self.pisimman_pituus = 0

        for sana in self.sanat:
            if len(sana) > self.pisimman_pituus:
                self.pisimman_pituus = len(sana)
                self.pisin = sana

        return self.pisin
```

Metodi siis käyttää kahta apumuuttujaa, jotka on määritelty käyttäen `self`-määrettä. Jos vielä halutaan hämmentää ohjelmakoodia lukevaa, apumuuttujat voisi lisäksi nimetä kryptisemmin, esim. `apu` ja `apu2`:

```python
class Sanasto:
    def __init__(self):
        self.sanat = []

    # ...

    def pisin_sana(self):
        # määritellään kaksi apumuuttujaa
        self.apu = ""
        self.apu2 = 0

        for sana in self.sanat:
            if len(sana) > self.apu2:
                self.apu2 = len(sana)
                self.apu = sana

        return self.apu
```

Kun muuttujan määrittely tehdään `self`-määreen avulla, liitetään muuttuja olion attribuutiksi, eli muuttuja tulee olemaan edelleen olemassa myös metodin suorituksen päätyttyä. Tämä on aivan tarpeetonta, koska kyseisiä apumuuttujia on tarkoitus käyttää vain metodissa `pisin_sana(self)`. Apumuuttujien määrittely `self`-määreen avulla on siis varsin huono idea.

Paitsi turhaa, apumuuttujien liittäminen `self`-määreella olion attribuuteiksi on myös riskialtista, varsinkin epämääräisesti nimettyjen apumuuttujien tapauksessa. Jos samaa apumuuttujaa `self.apu` käytetään monessa eri metodissa mutta täysin eri tarkoituksiin, voivat seuraukset olla arvaamattomat ja koodissa voi ilmetä hankalasti löydettäviä bugeja. 

Ongelma voi tulla esiin erityisesti silloin jos apumuuttujan alkuarvo annetaan jossain muualla, esimerkiksi konstruktorissa:

```python
class Sanasto:
    def __init__(self):
        self.sanat = []
        # määritellään apumuuttujia
        self.apu = ""
        self.apu2 = ""
        self.apu3 = ""
        self.apu4 = ""

    # ...

    def pisin_sana(self):
        for sana in self.sanat:
            # tämä ei toimi sillä apu2:n tyyppi on väärä
            if len(sana) > self.apu2:
                self.apu2 = len(sana)
                self.apu = sana

        return self.apu
```

Toisaalta uusien olion attribuuttien määrittely _muualla_ kuin konstruktorissa on sikäli vaarallista, että tällöin olion attribuutit riippuvat siitä, mitä metodeja on suoritettu. Kaikilla saman luokan avulla luoduilla olioilla ei välttämättä ole samoja attribuutteja, mistä seuraa helposti bugeja.

Siispä oikea tapa määritellä yhdessä metodissa käytettävät apumuuttujat on tehdä se _ilman_ `self`-määrettä:

```python
class Sanasto:
    def __init__(self):
        self.sanat = []

    # ...

    def pisin_sana(self):
        # tämä on oikea tapa määritellä yhden metodin sisäiset apumuuttujat
        pisin = ""
        pisimman_pituus = 0

        for sana in self.sanat:
            if len(sana) > pisimman_pituus:
                pisimman_pituus = len(sana)
                pisin = sana

        return pisin
```

Tällaisessa toteutuksessa apumuuttujat ovat olemassa ainoastaan metodin suorituksen aikana, ja niissä olevat arvot eivät pääse aiheuttamaan komplikaatioita muussa koodissa.

## Oliot funktioiden parametrina

Omista luokista luodut oliot ovat yleensä muuttuvia eli mutatoituvia, joten niiden toiminta parametrina välitettäessä muistuttaa esimerkiksi listoista tuttua tapaa: funktio, jolle olio välitetään parametrina, voi muuttaa kyseistä oliota.

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

Olion voi myös luoda funktion sisällä. Mikäli funktio palauttaa viittauksen olioon, on muodostettu olio käytettävissä myös pääohjelmassa:

```python
from random import randint, choice

class Opiskelija:
    def __init__(self, nimi: str, opiskelijanumero: str):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero

    def __str__(self):
        return f"{self.nimi} ({self.opiskelijanumero})"


# Funktio luo ja palauttaa Opiskelija-olion, jolla on satunnainen nimi ja opiskelijanumero
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

<programming-exercise name='Baby Centre' tmcname='part09-03_baby_centre'>

The exercise template contains a class named `Person` and a skeleton implementation for the class `BabyCentre`. A `BabyCentre` object performs various actions on a `Person` object. It may, for example, weigh or feed the person. In this exercise you will implement the rest of the `BabyCentre` class. Please do not change the class definition of `Person` in any way.

## Weighing persons

The `BabyCentre` class definition contains an outline for the function `weigh`:

```python
class BabyCentre:
    def weigh(self, person: Person):
        # return the weight of the person passed as an argument
        return -1
```

The method takes a `Person` object as its argument. It should return the weight of the person. You can access the weight of a person through the appropriate attribute defined in the `Person` class. Please fill in the rest of the implementation of the method `weigh`.

Below is an example of a main function where a `BabyCentre` weighs two separate `Person` objects:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
```

<sample-output>

Eric weighs 7 kg
Peter weighs 85 kg

</sample-output>

## Feeding

It is possible to change the state of an object passed as an argument. Please implement the method `feed(person: Person)` which increases by one the weight of the person passed as an argument.

In the following example two persons are weighed, and then one of them is fed three times. Then the persons are weighed again:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
print() 

baby_centre.feed(eric)
baby_centre.feed(eric)
baby_centre.feed(eric)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
```

The printout should reveal that Eric's weight has increased by three:

<sample-output>

Eric weighs 7 kg
Peter weighs 85 kg

Eric weighs 10 kg
Peter weighs 85 kg

</sample-output>

## Counting weigh-ins

Please implement the method `weigh_ins()` which returns the total number of weigh-ins a `BabyCentre` object has performed. NB: you will need a new attribute for keeping track of the number of weigh-ins. You can use the following code to test your method:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")
```

<sample-output>

Total number of weigh-ins is 0
Total number of weigh-ins is 2
Total number of weigh-ins is 6

</sample-output>

</programming-exercise>

<programming-exercise name='LunchCard and PaymentTerminal' tmcname='part09-04_lunchcard_and_paymentterminal'>

In the previous part there was an [exercise](/part-8/5-more-examples-of-classes#programming-exercise-lunchcard) where you implemented the class `LunchCard`. The card had separate methods for eating a regular and a special lunch, along with a method for depositing money on the card.

The `LunchCard` class, as you were asked to implement it, has some problmes, however. The card itself had knowledge of the prices of the different lunch options, and knew to subtract the right amount of money from the balance based on these. But imagine the prices changed, or there were new items introduced to the system, but several cards were already registered in the system. This would mean all existing cards would need to be replaced by versions with knowledge of the new prices.

A better solution would be to make the cards "stupid", ignorant of the prices of different products. The purpose of the card would be to simply keep track of the available balance. All more complicated features should be contained within another class: the payment terminal.

## A simpler LunchCard

Let's first implement a simpler version of the `LunchCard` class. The card should contain functionality only for finding out the current balance, depositing money on the card, and subtracting from the balance. Please fill in the `subtract_from_balance(amount)` method in the exercise template according to the instructions in the comments:

```python
class LunchCard:
    def __init__(self, balance: float):
        self.balance = balance

    def deposit_money(self, amount: float):
        self.balance += amount

    def subtract_from_balance(self, amount: float):
        pass
        # The amount should be subtracted from the balance only if there is enough money on the card
        # If the payment is successful, the method returns True, and otherwise it returns False
```

You may use the following code to test your function:

```python
if __name__ == "__main__":
    card = LunchCard(10)
    print("Balance", card.balance)
    result = card.subtract_from_balance(8)
    print("Payment successful:", result)
    print("Balance", card.balance)
    result = card.subtract_from_balance(4)
    print("Payment successful:", result)
    print("Balance", card.balance)
```

<sample-output>

Balance 10
Payment successful: True
Balance 2
Payment successful: False
Balance 2

</sample-output>

## The payment terminal and dealing with cash payments

In the student cafeteria it is possible to pay with either cash or a LunchCard. A payment terminal is used to handle both cash and card transactions. Let's start with the cash transactions.

Here we have a skeleton implementation for a `PaymentTerminal` class. Please implement the methods as described in the comments:

```python
class PaymentTerminal:
    def __init__(self):
        # Initially there is 1000 euros in cash available at the terminal
        self.funds = 1000
        self.lunches = 0
        self.specials = 0

    def eat_lunch(self, payment: float):
        # A regular lunch costs 2.50 euros.
        # Increase the value of the funds at the terminal by the price of the lunch,
        # increase the number of lunches sold, and return the appropriate change.
        # If the payment passed as an argument is not large enough to cover the price,
        # the lunch is not sold, and the entire sum is returned.

    def eat_special(self, payment: float):
        # A special lunch costs 4.30 euros.
        # Increase the value of the funds at the terminal by the price of the lunch,
        # increase the number of specials sold, and return the appropriate change.
        # If the payment passed as an argument is not large enough to cover the price,
        # the lunch is not sold, and the entire sum is returned.
```

You may use the following code to test your class:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("The change returned was", change)

change = exactum.eat_lunch(5)
print("The change returned was", change)

change = exactum.eat_special(4.3)
print("The change returned was", change)

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```

<sample-output>

The change returned was 7.5
The change returned was 2.5
The change returned was 0.0
Funds available at the terminal: 1009.3
Regular lunches sold: 2
Special lunches sold: 1

</sample-output>

## Dealing with card transactions

Now let's implement card transactions. We will need methods which take a `LunchCard` as an argument, and reduce the balance on the card by the price of the lunch. Below you will find the outlines of these functions. Please fill in the methods as described in the comments:

```python
class PaymentTerminal:
    # ...

    def eat_lunch_lunchcard(self, card: LunchCard):
        # A regular lunch costs 2.50 euros.
        # If there is enough money on the card, subtract the price of the lunch from the balance
        # and return True. If not, return False.


    def eat_special_lunchcard(self, card: LunchCard):
        # A special lunch costs 4.30 euros.
        # If there is enough money on the card, subtract the price of the lunch from the balance
        # and return True. If not, return False.
```

**NB:** when paying with a LunchCard the funds available at the terminal do not change. However, the lunches are still sold whenever there is the required balance available, so remember to increase the number of lunches sold appropriately.

You may use the following code to test your class:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("The change returned was", change)

card = LunchCard(7)

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
result = exactum.eat_lunch_lunchcard(card)
print("Payment successful:", result)

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```

<sample-output>

The change returned was 7.5
Payment successful: True
Payment successful: False
Payment successful: True
Funds available at the terminal: 1002.5
Regular lunches sold: 2
Special lunches sold: 1

</sample-output>

## Depositing money on the card

Finally, let's add a method which lets you deposit money on the card. The card owner pays this by cash, so the deposited sum is added to the funds available at the terminal. Here is an outline for the method:

```python
def deposit_money_on_card(self, card: LunchCard, amount: float):
    pass
```

You may use the following code to test your method:

```python
exactum = PaymentTerminal()

card = LunchCard(2)
print(f"Card balance is {card.balance} euros")

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)

exactum.deposit_money_on_card(card, 100)
print(f"Card balance is {card.balance} euros")

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
print(f"Card balance is {card.balance} euros")

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```

<sample-output>

Card balance is 2.0 euros
Payment successful: False
Card balance is 102.0 euros
Payment successful: True
Card balance is 97.7 euros
Funds available at the terminal: 1100
Regular lunches sold: 0
Special lunches sold: 1

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
    def vanhempi_kuin(self, toinen: "Henkilo"):
        return self.syntynyt < toinen.syntynyt:
```

Edellisestä esimerkistä kannattaa huomata se, että kun metodi saa parametrikseen toisen saman luokan olion, tulee tyyppivihje antaa hipsuissa, eli seuraava koodi aiheuttaisi virheen:

```python
class Henkilo:
    # ...

    # tämä ei toimi, Henkilo pitaa olla hipsuissa
    def vanhempi_kuin(self, toinen: Henkilo):
        return self.syntynyt < toinen.syntynyt:
```

<programming-exercise name='Comparing properties' tmcname='part09-05_comparing_properties'>

The database of a real estate agency keeps records of available properties with objects defined by the following class:

```python
class RealProperty:
    def __init__(self, rooms: int, square_meters: int, price_per_sqm: int):
        self.rooms = rooms
        self.square_meters = square_meters
        self.price_per_sqm = price_per_sqm
```

Your task is to implement methods which allow for comparison between available properties.

## Is it bigger?

Please write a method named `bigger(self, compared_to)` which returns `True` if the `RealProperty` object itself is bigger than the one it is compared to.

An example of how the function should work:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.bigger(downtown_two_bedroom))
print(suburbs_three_bedroom.bigger(downtown_two_bedroom))
```

<sample-output>

False
True

</sample-output>

## Price difference

Please write a method named `price_difference(self, compared_to)` which returns the difference in price between the `RealProperty` object itself and the one it is compared to. The price difference is the absolute value of the difference between the total prices of the two properties. The total price of a property is its price per square meter multiplied by the amount of square meters in the property.

An example of how the function should work:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.price_difference(downtown_two_bedroom))
print(suburbs_three_bedroom.price_difference(downtown_two_bedroom))
```

<sample-output>

71600
35400

</sample-output>

## Is it more expensive?

Please write a method named `more_expensive(self, compared_to)` which returns `True` if the `RealProperty` object itself is more expensive that the one it is compared to.

An example of how the function should work:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.more_expensive(downtown_two_bedroom))
print(suburbs_three_bedroom.more_expensive(downtown_two_bedroom))
```

<sample-output>

False
True

</sample-output>

</programming-exercise>
