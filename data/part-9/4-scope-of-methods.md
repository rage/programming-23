---
path: '/part-9/4-scope-of-methods'
title: 'Scope of methods'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, miten metodin näkyvyys määritellään Pythonissa
- Osaat kirjoittaa piilotettuja metodeita

</text-box>

Luokassa olevien metodien näkyvyyteen voidaan vaikuttaa samalla tavalla kuin attribuuttien näkyvyyteen. Jos metodin nimi alkaa kahdella alaviivalla `__`, metodi ei ole näkyvissä asiakkaille.

Käytännössä mekanismia käytetään hiukan eri tavalla: piilotettujen attribuuttien käyttöä varten kirjoitetaan usein julkiset havainnointi- ja asetusmetodit. Piilotettu metodi on kuitenkin yleensä tarkoitettu vain luokan sisäiseen käyttöön, apumetodiksi asiakkaalta piilotettujen operaatioiden toteuttamiseksi.

Piilotettua metodia voidaan kutsua luokan sisällä normaalisti, mutta kutsuttaessa pitää muistaa `self`-aluke. Tarkastellaan esimerkkinä sähköpostin vastaanottajaa mallintavaa luokkaa `Vastaanottaja`, jossa yksityistä apumetodia käytetään tarkistamaan sähköpostiosoitteen oikeellisuus:

```python
class Vastaanottaja:
    def __init__(self, nimi: str, sposti: str):
        self.__nimi = nimi
        if self.__tarkasta_sposti(sposti):
            self.__sposti = sposti
        else:
            raise ValueError("Sähköposti ei kelpaa")

    def __tarkasta_sposti(self, sposti: str):
        # Yksinkertainen tarkastus: osoitteessa on yli 5 merkkiä ja piste ja @-merkki
        return len(sposti) > 5 and "." in sposti and "@" in sposti
```

Jos asiakas yrittää kutsua metodia, seuraa virhe:

```python
pertti = Vastaanottaja("Pertti Keinonen", "pertti@example.com")
pertti.__tarkasta_sposti("jokumuu@example.com")
```

<sample-output>

AttributeError: 'Vastaanottaja' object has no attribute '__tarkasta_sposti'

</sample-output>

Samaa apumetodia kannattaa kutsua myös sähköpostia asettaessa - lisätään siis luokkaan esimerkin vuoksi havainnointi- ja asetusmetodit sähköpostille:

```python
class Vastaanottaja:
    def __init__(self, nimi: str, sposti: str):
        self.__nimi = nimi
        if self.__tarkasta_sposti(sposti):
            self.__sposti = sposti
        else:
            raise ValueError("Sähköposti ei kelpaa")

    def __tarkasta_sposti(self, sposti: str):
        # Yksinkertainen tarkastus: osoitteessa on yli 5 merkkiä ja piste ja @-merkki
        return len(sposti) > 5 and "." in sposti and "@" in sposti

    @property
    def sposti(self):
        return self.__sposti

    @sposti.setter
    def sposti(self, sposti: str):
        if self.__tarkasta_sposti(sposti):
            self.__sposti = sposti
        else:
            raise ValueError("Sähköposti ei kelpaa")
```

Tarkastellaan sitten toista esimerkkiä. Luokka `Korttipakka` mallintaa nimensä mukaisesti 52 kortin korttipakkaa. Apumetodi `__alusta_pakka` luo uuden sekoitetun pakan oliota luotaessa. Vastaava alustus voitaisiin toki tehdä myös metodissa `__init__`, mutta erillisen apumetodin käyttö tekee koodista siistimpää ja mahdollistaa alustusmetodin kutsumisen myös muualta luokasta tarvittaessa.

```python
from random import shuffle

class Korttipakka:
    def __init__(self):
        self.__alusta_pakka()

    def __alusta_pakka(self):
        self.__pakka = []
        # Laitetaan kaikki kortit pakkaan
        maat = ["pata", "hertta", "risti", "ruutu"]
        for maa in maat:
            for numero in range(1, 14):
                self.__pakka.append((maa, numero))
        # Sekoitetaan pakka
        shuffle(self.__pakka)

    def jaa(self, korttien_maara: int):
        kasi = []
        # Siirretään pakasta ylimmät kortit käteen
        for i in range(korttien_maara):
            kasi.append(self.__pakka.pop())
        return kasi
```

Seuraava koodi testaa luokkaa:

```python
korttipakka = Korttipakka()
kasi1 = korttipakka.jaa(5)
print(kasi1)
kasi2 = korttipakka.jaa(5)
print(kasi2)
```

Ohjelma tulostaa esimerkiksi

<sample-output>

[('pata', 7), ('pata', 11), ('hertta', 7), ('ruutu', 3), ('pata', 4)]
[('risti', 8), ('pata', 12), ('ruutu', 13), ('risti', 11), ('pata', 10)]

</sample-output>

Piilotettuja metodeja tarvitaan yleensä harvemmin kuin piilotettuja attribuutteja. Metodi kannattaa piilottaa, jos asiakas ei tarvitse siihen suoraa pääsyä, ja varsinkin silloin, jos on todennäköistä, että asiakas voisi sotkea olion sisäisen eheyden metodia kutsumalla.

<programming-exercise name='Service charge' tmcname='part09-12_service_charge'>

Please create a class named `BankAccount` which models a bank account. The class should contain 

* a constructor which takes the name of the owner (str), account number (str) and balance (float) as arguments
* a method `deposit(amount: float)` for depositing money to the account
* a method `withdraw(amount: float)` for withdrawing money from the account
* a getter method `balance` which returns the balance of the account

The class should also contain the private method

* `__service_charge()`, which decrease the balance of the account by one percent. Whenever either of the methods `deposit` or `withdraw` is called, this method should also be called. The service charge is calculated and subtracted only after the actual operation is completed (that is, after the amount specified has been added to or subtracted from the balance).

All data attributes within the class definition should be private.

You may use the following code for testing your class:

```python
account = BankAccount("Randy Riches", "12345-6789", 1000)
account.withdraw(100)
print(account.balance)
account.deposit(100)
print(account.balance)

```

<sample-output>

891.0
981.09

</sample-output>


</programming-exercise>

