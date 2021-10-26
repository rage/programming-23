---
path: '/part-8/4-defining-methods'
title: 'Defining methods'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, miten metodit toimivat luokissa
- Osaat kirjoittaa metodeita omiin luokkiin
- Ymmärrät, mitä tarkoitetaan kapseloinnilla ja asiakkaalla olio-ohjelmoinnissa

</text-box>

Vain attribuutteja sisältävät luokat eivät käytännössä eroa juurikaan sanakirjoista. Seuraavassa esimerkissä on esitetty pankkitiliä mallintava rakenne sekä oman luokan että sanakirjan avulla toteutettuna:

```python
# Esimerkki omaa luokkaa käyttäen
class Pankkitili:

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.tilinumero = tilinumero
        self.omistaja = omistaja
        self.saldo = saldo
        self.vuosikorko = vuosikorko

pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500.0, 0.015)
```

```python
# Esimerkki sanakirjaa käyttäen
pekan_tili = {"tilinumero": "12345-678", "omistaja": "Pekka Python", "saldo": 1500.0, "vuosikorko": 0.0}
```

Sanakirjaa käyttäen rakenteen toteutus on huomattavasti suoraviivaisempi ja koodi on lyhyempi. Luokan hyötynä tässä tapauksessa on, että se määrittelee rakenteen "tiukemmin", jolloin kaikki luokasta muodostetut oliot ovat rakenteeltaan samanlaisia. Luokka on lisäksi nimetty: oliota muodostaessa viitataan `Pankkitili`-luokkaan ja olion tyyppi on `Pankkitili` eikä sanakirja.

Luokilla on lisäksi etuna, että niihin voidaan lisätä attribuuttien lisäksi myös toiminnallisuutta. Yksi olio-ohjelmoinnin periaatteista onkin, että olioon on yhdistetty sekä tallennettavat tiedot että operaatiot, joilla tietoa voidaan käsitellä.

## Metodit luokissa

Metodi tarkoittaa luokkaan sidottua aliohjelmaa. Yleensä metodin toiminta kohdistuu vain yhteen olioon. Metodi kirjoitetaan luokan sisälle, ja se voi käsitellä attribuutteja kuten mitä tahansa muuttujia.

Katsotaan esimerkkinä `Pankkitili`-luokan metodia, joka lisää koron pankkitilille:

```python
class Pankkitili:

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.tilinumero = tilinumero
        self.omistaja = omistaja
        self.saldo = saldo
        self.vuosikorko = vuosikorko

    # Metodi lisää koron tilin saldoon
    def lisaa_korko(self):
        self.saldo += self.saldo * self.vuosikorko


pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500.0, 0.015)
pekan_tili.lisaa_korko()
print(pekan_tili.saldo)
```

<sample-output>

1522.5

</sample-output>

Metodi `lisaa_korko` kertoo olion saldon vuosikorkoprosentilla ja lisää tuloksen nykyiseen saldoon. Metodin toiminta kohdistuu siihen olioon, jonka kautta sitä kutsutaan.

Katsotaan vielä toinen esimerkki, jossa luokasta on muodostettu useampi olio:

```python
# Luokka Pankkitili on määritelty edellisessä esimerkissä

pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500.0, 0.015)
pirjon_tili = Pankkitili("99999-999", "Pirjo Pythonen", 1500.0, 0.05)
paulin_tili = Pankkitili("1111-222", "Pauli Paulinen", 1500.0, 0.001)

# Lisätään korko Pekalle ja Pirjolle, mutta ei Paulille
pekan_tili.lisaa_korko()
pirjon_tili.lisaa_korko()

# Tulostetaan kaikki
print(pekan_tili.saldo)
print(pirjon_tili.saldo)
print(paulin_tili.saldo)
```

<sample-output>

1522.5
1575.0
1500.0

</sample-output>

Korko lisätään vain siihen tiliin, jonka kautta metodia kutsutaan. Esimerkistä huomataan, että Pekalle ja Pirjolle lisätään eri korkoprosentit ja Paulin tilin saldo ei muutu ollenkaan, koska olion `paulin_tili` kautta ei kutsuta metodia `lisaa_korko`.

## Kapselointi

Olio-ohjelmoinnin yhteydessä puhutaan usein olioiden _asiakkaista_. Asiakkaalla (client) tarkoitetaan koodin osaa, joka muodostaa olion ja käyttää sen palveluita kutsumalla metodeita. Kun olion tietosisältöä käsitellään vain olion tarjoamien metodien avulla, voidaan varmistua siitä, että olion _sisäinen eheys_ säilyy. Käytännössä tämä tarkoittaa esimerkiksi sitä, että `Pankkitili`-luokassa tarjotaan metodi, jolla tililtä nostetaan rahaa, sen sijaan, että asiakas käsittelisi suoraan attribuuttia `saldo`. Tässä metodissa voidaan sitten esimerkiksi varmistaa, ettei tililtä nosteta enempää katetta enempää rahaa.

Esimerkiksi:

```python
class Pankkitili:

    def __init__(self, tilinumero: str, omistaja: str, saldo: float, vuosikorko: float):
        self.tilinumero = tilinumero
        self.omistaja = omistaja
        self.saldo = saldo
        self.vuosikorko = vuosikorko

    # Metodi lisää koron tilin saldoon
    def lisaa_korko(self):
        self.saldo += self.saldo * self.vuosikorko

    # Metodilla "nostetaan" tililtä rahaa
    # Metodi palauttaa true, jos nosto onnistuu, muuten False
    def nosto(self, nostosumma: float):
        if nostosumma <= self.saldo:
            self.saldo -= nostosumma
            return True

        return False

pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500.0, 0.015)

if pekan_tili.nosto(1000):
    print("Nosto onnistui, tilin saldo on nyt", pekan_tili.saldo)
else:
    print("Nosto ei onnistunut, rahaa ei ole tarpeeksi.")

# Yritetään uudestaan
if pekan_tili.nosto(1000):
    print("Nosto onnistui, tilin saldo on nyt", pekan_tili.saldo)
else:
    print("Nosto ei onnistunut, rahaa ei ole tarpeeksi.")
```

<sample-output>

Nosto onnistui, tilin saldo on nyt 500.0
Nosto ei onnistunut, rahaa ei ole tarpeeksi.

</sample-output>

Olion sisäisen eheyden säilyttämistä ja sopivien metodien tarjoamista asiakkaalle kutsutaan _kapseloinniksi_. Tämä tarkoittaa, että olion toteutus piilotetaan asiakkaalta ja olio tarjoaa ulkopuolelle metodit, joiden avulla tietoja voi käsitellä.

Pelkkä metodin lisäys ei kuitenkaan piilota attribuuttia: vaikka luokkaan `Pankkitili` onkin lisätty metodi `nosto` rahan nostamiseksi, asiakas voi edelleen muokata `saldo`-attribuutin arvoa suoraan:

```python
pekan_tili = Pankkitili("12345-678", "Pekka Python", 1500.0, 0.015)

# Yritetään nostaa 2000
if pekan_tili.nosto(2000):
    print("Nosto onnistui, tilin saldo on nyt", pekan_tili.saldo)
else:
    print("Nosto ei onnistunut, rahaa ei ole tarpeeksi.")

    # Nostetaan "väkisin" 2000
    pekan_tili.saldo -= 2000

print("Saldo nyt:", pekan_tili.saldo)
```

Ongelma voidaan ainakin osittain ratkaista piilottamalla attribuutit asiakkaalta. Käytännön toteutukseen palataan tarkemmin ensi viikolla.

<programming-exercise name='Decreasing counter' tmcname='part08-10_decreasing_counter'>

This exercise has multiple parts. You can submit the parts separately. Each part is worth one exercise point.

The exercise template contains a partially completed class `DecreasingCounter`:

```python
class DecreasingCounter:
    def __init__(self, initial_value: int):
        self.value = initial_value

    def print_value(self):
        print("value:", self.value)

    def decrease_value(self):
        pass

    # define the rest of your methods here
```

The class can now be used as shown below, and should produce the following printout after completing the first part of the exercise:

```python
counter = DecreasingCounter(10)
counter.print_value()
counter.decrease_value()
counter.print_value()
counter.decrease_value()
counter.print_value()
```

<sample-output>

value: 10
value: 9
value: 8

</sample-output>


### Decreasing the value of the counter

Please complete the method `decrease_value` defined in the template, so that it decreases the value stored in the counter by one. See the example above for expected behaviour.

### The counter must not have a negative value

Please add functionality to your `decrease_value` method, so that the value of the counter will never reach negative values. If the value of the counter is 0, it will not be further decreased.

```python
counter = DecreasingCounter(2)
counter.print_value()
counter.decrease_value()
counter.print_value()
counter.decrease_value()
counter.print_value()
counter.decrease_value()
counter.print_value()
```

<sample-output>

value: 2
value: 1
value: 0
value: 0

</sample-output>

### Setting the value to zero

Please add a method `set_to_zero` which sets the value of the counter to 0:

```python
counter = DecreasingCounter(100)
counter.print_value()
counter.set_to_zero()
counter.print_value()
```

<sample-output>

value: 100
value: 0

</sample-output>

### Resetting the counter

Please add a method `reset_original_value()` which resets the counter to its initial state:

```python
counter = DecreasingCounter(55)
counter.decrease_value()
counter.decrease_value()
counter.decrease_value()
counter.decrease_value()
counter.print_value()
counter.reset_original_value()
counter.print_value()
```

<sample-output>

value: 51
value: 55

</sample-output>

</programming-exercise>

Tarkastellaan vielä esimerkkiä luokasta, joka mallintaa pelaajan ennätystulosta. Luokkaan on kirjoitettu erilliset metodit, joilla voidaan tarkastaa, ovatko annetut parametrit sopivia. Metodeja kutsutaan heti konstruktorissa. Näin varmistetaan luotavan olion sisäinen eheys.

```python
from datetime import date

class Ennatystulos:

    def __init__(self, pelaaja: str, paiva: int, kuukausi: int, vuosi: int, pisteet: int):
        # Oletusarvot
        self.pelaaja = ""
        self.paivamaara = date(1900, 1, 1)
        self.pisteet = 0

        if self.nimi_ok(pelaaja):
            self.pelaaja = pelaaja

        if self.pvm_ok(paiva, kuukausi, vuosi):
            self.paivamaara = date(vuosi, kuukausi, paiva)

        if self.pisteet_ok(pisteet):
            self.pisteet = pisteet

    # Apumetodit, joilla tarkistetaan ovatko syötteet ok
    def nimi_ok(self, nimi: str):
        return len(nimi) >= 2 # Nimessä vähintään kaksi merkkiä

    def pvm_ok(self, paiva, kuukausi, vuosi):
        try:
            date(vuosi, kuukausi, paiva)
            return True
        except:
            # Poikkeus, jos yritetään muodostaa epäkelpo päivämäärä
            return False

    def pisteet_ok(self, pisteet):
        return pisteet >= 0

if __name__ == "__main__":
    tulos1 = Ennatystulos("Pekka", 1, 11, 2020, 235)
    print(tulos1.pisteet)
    print(tulos1.pelaaja)
    print(tulos1.paivamaara)

    # Epäkelpo arvo päivämäärälle
    tulos2 = Ennatystulos("Piia", 4, 13, 2019, 4555)
    print(tulos2.pisteet)
    print(tulos2.pelaaja)
    print(tulos2.paivamaara) # Tulostaa oletusarvon 1900-01-01
```

<sample-output>

235
Pekka
2020-11-01
4555
Piia
1900-01-01

</sample-output>

Esimerkistä huomataan, että myös olion omiin metodeihin pitää viitata `self`-määreen avulla, kun niitä kutsutaan konstruktorista. Luokkiin voidaan kirjoitaa myös _staattisia metodeita_ eli metodeita, joita voidaan kutsua ilman, että luokasta muodostetaan oliota. Tähän palataan kuitenkin tarkemmin ensi viikolla.

Määrettä `self` käytetään kuitenkin vain silloin, kun viitataan _olion piirteisiin_ (eli metodeihin tai olion attribuutteihin). Olion metodeissa voidaan käyttää myös paikallisia muuttujia. Tämä on suositeltavaa, jos muuttujaan ei ole tarvetta viitata metodin ulkopuolella.

Paikallinen muuttuja määritellään ilman `self`-määrettä - eli samoin kuin esimerkiksi kaikki muuttujat kurssin ensimmäisellä puoliskolla.

Esimerkiksi

```python
class Bonuskortti:
    def __init__(self, nimi: str, saldo: float):
        self.nimi = nimi
        self.saldo = saldo

    def lisaa_bonus(self):
        # Nyt muuttuja bonus on paikallinen muuttuja,
        # eikä olion attribuutti - siihen siis ei voi
        # viitata olion kautta
        bonus = self.saldo * 0.25
        self.saldo += bonus

    def lisaa_superbonus(self):
        # Myös muuttuja superbonus on paikallinen muuttuja
        # Yleensä apumuuttujina käytetään paikallisia
        # muuttujia, koska niihin ei ole tarvetta
        # viitatata muissa metodeissa tai olion kautta
        superbonus = self.saldo * 0.5
        self.saldo += superbonus

    def __str__(self):
        return f"Bonuskortti(nimi={self.nimi}, saldo={self.saldo})"
```

<programming-exercise name="First and last name" tmcname='part08-11_first_and_last_name'>

Please write a class named `Person` with a _single attribute_ `name`, which is set with an argument given to the constructor.

Please also add two methods:

The method `return_first_name` should return the first name of the person, while the method `return_last_name` should return the last name of the person.

You may assume that the name passed to the constructor will contain exactly two name elements separated with a space character.

An example use case:

```python
if __name__ == "__main__":
    pekka = Person("Peter Pythons")
    print(pekka.return_first_name())
    print(pekka.return_last_name())

    pauli = Person("Paula Pythonnen")
    print(pauli.return_first_name())
    print(pauli.return_last_name())
```

<sample-output>

Peter
Pythons
Paula
Pythonnen

</sample-output>


</programming-exercise>

<programming-exercise name='Statistics on numbers' tmcname='part08-12_number_stats'>

In this exercise you are asked to create a program for working with numbers, similarly to the exercise completed at the [end of part 2](/part-2/4-simple-loops#programming-exercise-working-with-numbers) in the Introduction to Programming course. This time you will define a class for the purpose.

### Count the numbers

Please write a class named `NumberStats` with the following methods:

- the method `add_number` adds a new number to the statistical record
- the method `count_numbers` returns the count of how many numbers have been added

At this point there is no need to store the numbers themselves in any data structure. It is enough to simply remember how many have been added. The `add_number` method does take an argument, but there is no need to process the actual value in any way just yet.

The exercise template contains the following skeleton for the class definition:

```python
class  NumberStats:
    def __init__(self):
        self.numbers = 0

    def add_number(self, number:int):
        pass

    def count_numbers(self):
        pass
```

```python
stats = NumberStats()
stats.add_number(3)
stats.add_number(5)
stats.add_number(1)
stats.add_number(2)
print("Numbers added:", stats.count_numbers())
```

<sample-output>

Numbers added: 4

</sample-output>

### The sum and the mean

Please add the following methods to your class definition:

- the method `get_sum` should return the sum of the numbers added (if no numbers have been added, the method should return 0)
- the method `mean` should return the mean of the numbers added (if no numbers have been added, the method should return 0)

```python
stats = NumberStats()
stats.add_number(3)
stats.add_number(5)
stats.add_number(1)
stats.add_number(2)
print("Numbers added:", stats.count_numbers())
print("Sum of numbers:", stats.get_sum())
print("Mean of numbers:", stats.mean())
```

<sample-output>

Numbers added: 4
Sum of numbers: 11
Mean of numbers: 2.75

</sample-output>

### User input

Please write a main program which keeps asking the user for integer numbers until the user types in -1. The program should then print out the sum and the mean of the numbers typed in.

Your program should use a `NumberStats` object to keep a record of the numbers added.

NB: you do not need to change the `NumberStats` class in this part of the exercise, provided it passed the tests for the previous part of the exercise. Use an instance of the class to complete this part.

NB2: your main program should not be contained in a `if __name__ == "__main__"` block, or the tests will not work.

<sample-output>

Please type in integer numbers:
**4**
**2**
**5**
**2**
**-1**
Sum of numbers: 13
Mean of numbers: 4.5

</sample-output>

### Multiple sums

Please add to your main program so that it also counts separately the sum of the even and the odd numbers added.

NB: do not change your `NumberStats` class definition in this part of exercise, either. Instead, define three `NumberStats` objects. One of them should keep track of all the numbers, another should track the even numbers, and the third should track the odd numbers typed in.

NB2: your main program should not be contained in a `if __name__ == "__main__"` block, or the tests will not work.

Please have look at this example of how your main function should work:

<sample-output>

Please type in integer numbers:
**4**
**2**
**5**
**2**
**-1**
Sum of numbers: 13
Mean of numbers: 3.25
Sum of even numbers: 8
Sum of odd numbers: 5

</sample-output>



</programming-exercise>
