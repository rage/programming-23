---
path: '/osa-9/4-metodien-nakyvyys'
title: 'Metodien näkyvyys'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät miten metodin näkyvyys määritellään Pythonissa
- Osaat kirjoittaa yksityisiä metodeita

</text-box>

Luokassa olevien metodien näkyvyyteen voidaan vaikuttaa samalla tavalla kuin attribuuttien näkyvyyyteen. Jos metodin nimi alkaa kahdella alaviivalla `__`, metodi ei ole näkyvissä asiakkaille.

Käytännössä mekanismia käytetään hiukan eri tavalla: yksityisten (eli piilotettujen) attribuuttien käyttöä varten kirjoitetaan usein julkiset havainnointi- ja asetusmetodit. Yksityinen metodi on kuitenkin yleensä tarkoitettu luokan sisäiseen käyttöön, apumetodiksi asiakkaalta piilotettujen operaatioiden toteuttamiseksi.

Piilotettua metodia voi kutsua luokan sisällä normaalisti, mutta kutsuttaessa pitää muistaa `self`-aluke. Tarkastellaan esimerkkinä sähköpostin vastaanottajaa mallintavaa luokkaa `Vastaanottaja`, jossa yksityistä apumetodia käytetään tarkistamaan sähköpostin oikeellisuus:

```python

class Vastaanottaja:

    def __init__(self, nimi: str, sposti: str):
        self.__nimi = nimi
        if self.__tarkasta_sposti(sposti):
            self.__sposti = sposti
        else:
            raise ValueError("Sähköposti ei kelpaa")

    def __tarkasta_sposti(self, sposti: str):
        # Naiivi tarkistus, jossa katsotaan että
        # osoitteessa on yli 5 merkkiä ja piste ja @-merkki
        return len(sposti) > 5 and "." in sposti and "@" in sposti

    # Havainnointi- ja asetusmetodit sekä __repr__ olisi toteutettu tässä

```

Jos asiakas yrittää kutsua metodia, seuraa virhe:

```python

if __name__ == "__main__":
    # Luodaan olio ja yritetään kutsua metodia
    pertti = Vastaanottaja("Pertti Keinonen", "pertti@example.com")
    pertti.__tarkasta_sposti("jokumuu@example.com")

```

<sample-output>

AttributeError: 'Vastaanottaja' object has no attribute '__tarkasta_sposti'

</sample-output>

Samaa apumetodia kannattaisi kutsua myös sähköpostia asettaessa - lisätään siis luokkaan esimerkin vuoksi havainnointi- ja asetusmetodit sähköpostille:

```python

class Vastaanottaja:

    def __init__(self, nimi: str, sposti: str):
        self.__nimi = nimi
        if self.__tarkasta_sposti(sposti):
            self.__sposti = sposti
        else:
            raise ValueError("Sähköposti ei kelpaa")

    def __tarkasta_sposti(self, sposti: str):
        # Naiivi tarkistus, jossa katsotaan että
        # osoitteessa on yli 5 merkkiä ja piste ja @-merkki
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

Tarkastellaan toista esimerkkiä. Luokka `Korttipakka` mallintaa nimensä mukaisesti 52 kortin korttipakkaa. Apumetodi `__alusta` luo uuden tyhjän pakan oliota luotaessa. Vastaava alustus voitaisiin toki tehdä myös metodissa `__init__`, mutta erillisen apumetodin käyttö tekee koodista siistimpää ja mahdollistaa alustusmetodin kutsumisen myös muualta luokasta tarvittaessa.

```python

from random import randint

class Korttipakka:

    # Konstruktorilla ei ole parametreja
    def __init__(self):
        self.__alusta_pakka()

    def __alusta_pakka(self):
        self.__pakka = []
        maat = ["pata", "hertta", "risti", "ruutu"]
        for maa in maat:
            for numero in range(1, 14):
                self.__pakka.append((maa, numero))

    # Julkinen metodi jakaa satunnaisen käden
    def jaa(self, korttien_maara: int):
        kasi = []
        for i in range(korttien_maara):
            kasi.append(self.__pakka.pop(randint(1, len(self.__pakka) - 1)))
        return kasi


# Testataan
if __name__ == "__main__":
    kp = Korttipakka()
    kasi = kp.jaa(5)
    print(kasi)

```

Ohjelma tulostaa esimerkiksi

<sample-output>

[('ruutu', 1), ('hertta', 13), ('hertta', 6), ('ruutu', 12), ('pata', 2)]

</sample-output>

Yksityisiä metodeja tarvitaan yleensä harvemmin kuin yksityisiä attribuutteja. Metodi kannattaa kirjoittaa yksityiseksi, jos asiakas ei tarvitse siihen suoraa pääsyä (ja varsinkin silloin, jos on todennäköistä, että asiakas voi sotkea olion sisäisen eheyden metodia kutsumalla).



