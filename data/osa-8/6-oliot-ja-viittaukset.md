---
path: '/osa-8/6-oliot-ja-viittaukset'
title: 'Oliot ja viittaukset'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät miten olioita voi tallentaa tietorakenteisiin
- Tiedät miten olioiden välitys parametrina toimii
- Osaa tallentaa olioita toisten olioiden sisään

</text-box>

Pythonissa kaikki arvot ovat olioita. Niinpä myös omista luokista luotuja olioita voi käsitellä kuin mitä tahansa muitakin olioita: niitä on esimerkiksi helppo tallentaa listaan:

```python

from datetime import date

# Esimerkkiluokka mallintaa kurssisuoritusta
class Kurssisuoritus:
    __kurssi = ""
    __opintopisteet = ""
    __suorituspvm = date(1900,1,1)

    def __init__(self, kurssi: str, opintopisteet: int, suorituspvm: date):
        self.kurssi = kurssi
        self.opintopisteet = opintopisteet
        self.suorituspvm = suorituspvm

    def anna_kurssi(self):
        return self.kurssi

    def anna_opintopisteet(self):
        return self.opintopisteet

    def anna_suorituspvm(self):
        return self.suorituspvm


if __name__ == "__main__":
    # Luodaan pari kurssisuoritusta ja lisätään listaan
    suoritukset = []

    matikka = Kurssisuoritus("Matematiikka 1", 5, date(2020, 3, 11))
    ohj1 = Kurssisuoritus("Ohjelmointi 1", 6, date(2019, 12, 17))

    suoritukset.append(matikka)
    suoritukset.append(ohj1)

    # Lisätään suoraan listaan muutama
    suoritukset.append(Kurssisuoritus("Fysiikka 2", 4, date(2019, 11, 10)))
    suoritukset.append(Kurssisuoritus("Ohjelmointi 2", 5, date(2020, 5, 19)))

    # Käydään läpi kaikki suoritukset, tulostetaan nimet ja lasketaan opintopisteet yhteen
    pisteet = 0
    for suoritus in suoritukset:
        print(suoritus.anna_kurssi())
        pisteet += suoritus.anna_opintopisteet()

    print("Pisteitä yhteensä:", pisteet)


```

Pythonissa listaan ei itse asiassa oikeasti tallenneta olioita, vaan viittauksia olioihin. Niinpä sama olio voi esiintyä listassa useaan kertaan (eli käytännössä samaan olioon voidaan viitata useaan kertaan listassa ja sen ulkoupuolella):

KUVA

Esimerkiksi:

```python

class Koira:
    __nimi = ""

    def __init__(self, nimi):
        self.__nimi = nimi

    def aseta_nimi(self, nimi):
        self.__nimi = nimi

    def __repr__(self):
        return self.__nimi


k = Koira("Musti")
lista = (k, k, Koira("Musti"))
print(k)
print(lista)

print("Muutetaan arvoa...")
k.aseta_nimi("Rekku")
print(k)
print(lista)

print("Muutetaan arvoa listasta...")
lista[0].aseta_nimi("Fifi")
print(k)
print(lista)

print("Viimeinen olio listassa on eri olio kuin muut")
lista[2].aseta_nimi("Turre")
print(k)
print(lista)

```

<sample-output>

Musti
(Musti, Musti, Musti)
Muutetaan muuttujan k kautta arvoa...
Rekku
(Rekku, Rekku, Musti)
Muutetaan arvoa listasta...
Fifi
(Fifi, Fifi, Musti)
Viimeinen olio listassa on eri olio kuin muut
Fifi
(Fifi, Fifi, Turre)

</sample-output>

Listan kaksi ensimmäistä alkiota viittaavat samaan Koira-luokan olioon kuin muuttuja `k`. Niinpä olion sisältöä voidaan muuttaa minkä tahansa näistä viittauksista avulla. Viimeinen alkio listassa on viittaus kokonaan toiseen olioon.

Omista luokista muodostettuja olioita voi myös tallentaa esimerkiksi sanakirjaan (tai mihin tahansa tietorakenteeseen):

```python

# ESIMERKKI TÄHÄN

```

## Oliot parametrina

Koska omista luoduista luodut oliot ovat (yleensä) muuttuvia eli mutatoituvia, niiden toiminta parametrina välitettäessä muistuttaa listoista tuttua tapaa. Funktio, jolle olio välitetäään parametrina, voi muuttaa saamaansa oliota (edellyttäen että olio tarjoaa asiakkailleen muuttaamiseen tarvittavat operaatiot).

Tarkastellaan yksinkertaista esimerkkiä, jossa funktiolle välitetään Opiskelija-luokasta luotu olio. Funktion sisällä muutetaan opiskelijan nimi, ja muutos näkyy myös pääohjelmassa (koska molemmissa tilanteissa viitataan samaan olioon):

```python

# ESIMERKKI TÄHÄN

```

Olion voi myös luoda funktiossa. Mikäli funktio palauttaa viittauksen olioon, on muodostettu olio käytettävissä myös pääohjelmassa:

```python

# ESIMERKKI TÄHÄN

```

# Oliot attribuutteina

Aikaisemmin nähtiin esimerkkejä luokista, joissa attribuutteina oli käytetty esimerkiksi listoja. Samalla tavalla myös omista luokista luotuja olioita voi käyttää toisten olioiden attribuutteina. Esimerkiksi:

```python

# ESIMERKKI TÄHÄN

```







