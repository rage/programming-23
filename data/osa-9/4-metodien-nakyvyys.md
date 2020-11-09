---
path: '/osa-9/4-metodien-nakyvyys'
title: 'Metodien näkyvyys'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, miten metodin näkyvyys määritellään Pythonissa
- Osaat kirjoittaa piilotettuja metodeita

</text-box>

Luokassa olevien metodien näkyvyyteen voidaan vaikuttaa samalla tavalla kuin attribuuttien näkyvyyyteen. Jos metodin nimi alkaa kahdella alaviivalla `__`, metodi ei ole näkyvissä asiakkaille.

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

```
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

<programming-exercise name='Palvelumaksu' tmcname='osa09-12_palvelumaksu'>

Kirjoita luokka `Pankkitili` joka mallintaa pankkitiliä. Luokalla tulee olla

* konstruktori, joka saa parametrikseen tilinomistajan (str), tilinumeron (str) ja saldon (float)
* metodi `talleta(summa: float)`, jolla tilille voidaan tallettaa rahaa
* metodi `nosta(summa: float)`, joka nostaa tililtä rahasumman
* havainnointimetodi `saldo`, joka palauttaa tilin saldon

Lisäksi luokalla on yksityinen metodi

* `__palvelumaksu()`, joka vähentää tililtä yhden prosentin rahaa. Luokassa kutsutaan tätä metodia aina, kun asiakas kutsuu jompaa kumpaa metodeista `talleta` tai `nosta`. Prosentti vähennetään aina varsinaisen operaation jälkeen (eli. esimerkiksi vasta sitten, kun rahat on talletettu).

Kaikki luokan attribuutit ovat yksityisiä.

Esimerkki luokan käytöstä:

```python
tili = Pankkitili("Raimo Rahakas", "12345-6789", 1000)
tili.nosta(100)
print(tili.saldo)
tili.talleta(100)
print(tili.saldo)

```

<sample-output>

891.0
981.09

</sample-output>


</programming-exercise>

