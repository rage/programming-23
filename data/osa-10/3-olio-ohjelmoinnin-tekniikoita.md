---
path: '/osa-10/3-olio-ohjelmoinnin-tekniikoita'
title: 'Olio-ohjelmoinnin tekniikoita'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tunnet muuttujan self eri käyttötarkoituksia
- Osaat ylikuormittaa operaattoreita omissa luokissa
- Tiedät miten muodostaa iteroitavan luokan

</text-box>

Luokka voi palauttaa metodista myös sen itsensätyyppisen olion. Luokan `Tuote` metodi `alennustuote` palauttaa uuden tuotteen, jolla on sama nimi kuin nykyisellä tuotteella, mutta 25% halvempi hinta:

```python

class Tuote:

    def __init__(self, nimi: str, hinta: float):
        self.__nimi = nimi
        self.__hinta = hinta

    def __repr__(self):
        return f"Tuote - nimi: {self.__nimi}, hinta: {self.__hinta}"

    def alennustuote(self):
        alennettu = Tuote(self.__nimi, self.__hinta * 0.75)
        return alennettu

```

<sample-output>

Tuote - nimi: Omena, hinta: 2.99
Tuote - nimi: Omena, hinta: 2.2425

</sample-output>

Kerrataaan vielä muuttujan `self` merkitys: luokan sisällä se viitaa nykyiseen olioon. Tyypillinen tapa käyttää muuttujaa onkin viitata olion omiin piirteisiin, esimerkiksi attribuuttien arvoihin. Muuttujaa voidaan käyttää myös palauttamaan koko olio (vaikka tälle onkin selvästi harvemmin tarvetta). Esimerkkiluokan `Tuote` metodi `halvempi` osaa palauttaa halvemman tuotteen, kun sille annetaan parametriksi toinen Tuote-luokan olio:

```python

class Tuote:

    def __init__(self, nimi: str, hinta: float):
        self.__nimi = nimi
        self.__hinta = hinta

    def __repr__(self):
        return f"Tuote - nimi: {self.__nimi}, hinta: {self.__hinta}"

    @property
    def hinta(self):
        return self.__hinta

    def halvempi(self, tuote):
        if self.__hinta < tuote.hinta:
            return self
        else:
            return tuote

# Testataan
omena = Tuote("Omena", 2.99)
appelsiini = Tuote("Appelsiini", 3.95)
banaani = Tuote("Banaani", 5.25)

print(appelsiini.halvempi(omena))
print(appelsiini.halvempi(banaani))

```

<sample-output>

Tuote - nimi: Omena, hinta: 2.99
Tuote - nimi: Appelsiini, hinta: 3.95

</sample-output>

Esimerkin vertailun toteutus vaikuttaa kuitenkin melko kömpelöltä - paljon parempi olisi, jos voisimme vertailla Tuote-olioita suoraan Pythonin vertailuoperaattoreilla.

## Operaattorien ylikuormitus

Pythonin lasku- ja vertailuoperaattorien käyttö omien olioiden kanssa on onneksi mahdollista. Tähän käytetään tekniikkaa, jonka nimi on _operaattorien ylikuormitus_. Kankeankuuloisesta termistä huolimatta operaatio itse on melko suoraviivainen: jos halutaan, että tietty operaattori toimii myös omasta luokasta muodostettujen olioiden kanssa, luokkaan kirjoitetaan vastaava metodi joka palauttaa oikean lopputuloksen. Periaate on vastaava kuin metodin `__repr__` kanssa: Python osaa käyttää tietyllä tapaa nimettyjä metodeja tietyissä operaatioissa.

Tarkastellaan ensin esimerkkiä, jossa `Tuote`-luokkaan on toteutettu metodi `__gt__` (lyhenne sanoista *g*reater *t*han) joka toteuttaa suurempi kuin -operaattorin. Tarkemmin sanottuna metodi palauttaa arvon `True`, jos nykyinen olio on suurempi kuin parametrina annettu olio.

```python



```
