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

Luokka voi palauttaa metodista myös sen itsensä tyyppisen olion. Luokan `Tuote` metodi `alennustuote` palauttaa uuden tuotteen, jolla on sama nimi kuin nykyisellä tuotteella, mutta 25% halvempi hinta:

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

class Tuote:
    def __init__(self, nimi: str, hinta: float):
        self.__nimi = nimi
        self.__hinta = hinta

    def __repr__(self):
        return f"Tuote - nimi: {self.__nimi}, hinta: {self.__hinta}"

    @property
    def hinta(self):
        return self.__hinta

    def __gt__(self, toinen_tuote):
        if self.hinta > toinen_tuote.hinta:
            return True
        else:
            return False

```

Metodi `__gt__` palauttaa siis arvon `True`, jos nykyisen tuotteen hinta on suurempi kuin parametrina annetun tuotteen. Metodi voidaan itse asiassa kirjoittaa lyhyemminkin:

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

    def __gt__(self, toinen_tuote):
        return self.hinta > toinen_tuote.hinta

```

Nyt luokan olioita voidaan vertailla käyttäen `>`-operaattoria samalla tavalla kuin vaikkapa kokonaislukuja:

```python

if __name__ == "__main__":
    appelsiini = Tuote("Appelsiini", 4.90)
    omena = Tuote("Omena", 3.95)

    if (appelsiini > omena):
        print("Appelsiini on suurempi")
    else:
        print("Omena on suurempi")

```

<sample-output>

Appelsiini on suurempi

</sample-output>

Olioiden suuruusluokan vertailua toteuttaessa täytyy päättää millä perusteella suuruusjärjestys määritetään. Voisimme myös haluta, että tuotteet järjestetään hinnan sijasta nimen mukaiseen aakkosjärjestykseen. Tällöin omena olisikin appelsiinia "suurempi":

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

    @property
    def nimi(self):
        return self.__nimi

    def __gt__(self, toinen_tuote):
        return self.nimi > toinen_tuote.nimi


# Testataan
if __name__ == "__main__":
    appelsiini = Tuote("Appelsiini", 4.90)
    omena = Tuote("Omena", 3.95)

    if (appelsiini > omena):
        print("Appelsiini on suurempi")
    else:
        print("Omena on suurempi")

```

<sample-output>

Omena on suurempi

</sample-output>

## Muut operaattorit

Eräitä tyypillisiä vertailuoperaattoreita ja näiden vastinmetodit on esitetty seuraavassa taulukossa:

Operaattori | Merkitys perinteisesti | Metodin nimi
:--:|:--:|:--:
`<` | Pienempi kuin | `__lt__(self, toinen)`
`>` | Suurempi kuin | `__gt__(self, toinen)`
`==` | Yhtä suuri kuin | `__eq__(self, toinen)`
`!=` | Eri suuri kuin | `__ne__(self, toinen)`
`<=` | Pienempi tai yhtäsuuri kuin | `__le__(self, toinen)`
`>=` | Suurempi tai yhtäsuuri kuin | `__ge__(self, toinen)`

Lisäksi luokissa voidaan uudelleentoteuttaa tiettyjä muita operaattoreita, esimerkiksi

Operaattori | Merkitys perinteisesti | Metodin nimi
:--:|:--:|:--:
`+` | Yhdistäminen | `__add__(self, toinen)`
`-` | Vähentäminen | `__sub__(self, toinen)`
`*` | Monistaminen | `__mul__(self, toinen)`
`/` | Jakaminen | `__truediv__(self, toinen)`
`//` | Kokonaisjakaminen | `__floordiv__(self, toinen)`

Lisää operaattoreita ja metodien nimien vastineita löydät helposti Googlella.

Huomaa, että vain hyvin harvoin on tarvetta toteuttaa kaikkia operaatioita omassa luokassa - esimerkiksi jakaminen on loogisesti operaatio, jota on hankala perustella useimmille luokille (mitä tulee, kun jaetaan tiedosto kolmella saati toisella tiedostolla?) Tiettyjen operaattoreiden toteuttamisesta voi kuitenkin olla hyötyä, mikäli vastaavat operaatiot ovat loogisia luokalle.

Tarkastellaan esimerkkinä luokkaa joka mallintaa yhtä muistiinpanoa. Kahden muistiinpanon yhdistäminen `+`-operaattorilla tuottaa uuden, yhdistetyn muistiinpanon, kun on toteutettu metodi `__add__`:

```python

from datetime import datetime

class Muistiinpano:
    def __init__(self, pvm: datetime, merkinta: str):
        self.pvm = pvm
        self.merkinta = merkinta

    def __repr__(self):
        return f"Muistiinpano - pvm: {self.pvm}, merkintä: {self.merkinta}"

    def __add__(self, toinen):
        # Uuden muistiinpanon ajaksi nykyinen aika
        uusi_muistiinpano = Muistiinpano(datetime.now(), "")
        uusi_muistiinpano.merkinta = self.merkinta + " ja " + toinen.merkinta
        return uusi_muistiinpano

# Testataan
if __name__ == "__main__":
    mp1 = Muistiinpano(datetime(2016, 12, 17), "Muista ostaa lahjoja")
    mp2 = Muistiinpano(datetime(2016, 12, 23), "Muista hakea kuusi")

    # Nyt voidaan yhdistää plussalla - tämä kutsuu metodia __add__
    # luokassa Muistiipano
    joulumuistot = mp1 + mp2
    print(joulumuistot)

```

<sample-output>

Muistiinpano - pvm: 2020-09-09 14:13:02.163170, merkintä: Muista ostaa lahjoja ja Muista hakea kuusi

</sample-output>

<programming-exercise name='Raha' tmcname='osa10_'>

Tehtäväpohjasta löytyy luokan `Raha` runko. Tässä tehtävässä laajennetaan runkoa muutamilla operaattoreilla, ja korjataan pari rungossa olevaa pientä ongelmaa

## Korjaa merkkijonoesitys

Rahan merkkijonoesityksen muodostava metodi ei ole nyt ihan kunnossa. Seuraavassa esimerkissä muodstetaan kaksi raha-olioa, joista jälkimmäinen ei tulostu oikein:

```python
e1 = Raha(4, 10)
e2 = Raha(2, 5)  # kaksi euroa ja viisi senttiä

print(e1)
print(e2)
```

<sample-output>

4.10 eur
2.5 eur

</sample-output>

Korjaa luokan metodi `__repr__(self)` siten, että tulostus on seuraava:

<sample-output>

4.10 eur
2.05 eur

</sample-output>

## Yhtäsuuruus

Määrittele raha-oliolle funktio  `__eq__(self, toinen)`, jonka avulla rahan yhtäsuuruusvertailu saadaan toimimaan:

```python
e1 = Raha(4, 10)
e2 = Raha(2, 5)
e3 = Raha(4, 10)

print(e1)
print(e2)
print(e3)
print(e1 == e2)
print(e1 == e3)
```

<sample-output>

4.10 eur
2.05 eur
4.10 eur
False
True

</sample-output>

## Muut vertailut

Toteuta rahalle myös seuraavat vertailuoperaatorit `<`, `>`, `!=`.

```python
e1 = Raha(4, 10)
e2 = Raha(2, 5)

print(e1 != e2)
print(e1 < e2)
print(e1 > e2)
```

<sample-output>

True
False
True

</sample-output>

## Plus ja miinus

Toteuta rahalle yhteen- ja vähennyslaskuoperaatiot. Molempien operaatioiden tulee palauttaa uusi rahaolio, ja ne eivät saa muuttaa olioa itseään tai parametrina olevaa olioa!

Huomaa, että rahan arvo ei voi olla negatiivinen. Negatiiviseen tulokseen päätyvän vähennyslaskuyrityksen tulee aiheuttaa poikkeus.

```python
e1 = Raha(4, 5)
e2 = Raha(2, 95)

e3 = e1 + e2
e4= e1 - e2

print(e3)
print(e4)

e5 = e2-e1
```

<sample-output>

7.00 eur
1.10 eur
Traceback (most recent call last):
  File "tiedosto.py", line 416, in <module>
    e5 = e2-e1
  File "tiedosto.py", line 404, in __sub__
    raise ValueError(f"negatiivinen tulos ei sallittu")
ValueError: negatiivinen tulos ei sallittu

</sample-output>

## Arvoa ei voi muuttaa

Luokassa on täälä hetkellä vielä pieni ongelma. Käyttäjä voi "hujaamalla" muttaa rahan arvoa:

```python
print(e1)
e1.eurot = 1000
print(e1)
```

<sample-output>

4.05 eur
1000.05 eur

</sample-output>

Muuta luokkan toteutus [kapseloiduksi](/osa-9/3-kapselointi#kapselointi) siten, että huijaus ei onnistu.

</programming-exercise>

<programming-exercise name='Murtoluku' tmcname='osa10_'>
</programming-exercise>

## Iteraattorit

Olemme aikaisemmin käyttääneet for-lausetta erilaisten tietorakenteiden ja tiedostojen _iterointiin_ eli läpikäyntiin. Tyypillinen tapaus olisi vaikkapa seuraavanlainen funktio:

```python

def laske_positiiviset(lista: list):
    n = 0
    for alkio in lista:
        if alkio > 0:
            n += 1
    return n

```

Funktio käy läpi listan alkio kerrallaan ja laskee positiivisten alkioiden määärän.

Iterointi on mahdollista toteuttaa myös omiin luokkiin. Hyödyllistä tämä on silloin, kun luokasta muodostetut oliot tallentavat suuremman määrän alkiota. Esimerkiksi aikaisemmin kirjoitettiin luokka, joka mallintaa kirjahyllyä - olisi näppärä, jos kaikki kirjahyllyn kirjat voisi käydä läpi yhdessä silmukassa. Samalla tavalla opiskelijarekisterin kaikkien opiskelijoiden läpikäynti for-lauseella olisi kätevää.

Iterointi mahdollistuu toteuttamalla luokkaan iteraattorimetodit `__iter__` ha  `__next__`. Käsitellään metodien toimintaa tarkemmin, kun on ensin tarkasteltu esimerkkinä kirjahyllylyokkaa, joka mahdollistaa kirjojen läpikäynnin:

```python

class Kirja:
    def __init__(self, nimi: str, kirjailija: str, sivuja: int):
        self.nimi = nimi
        self.kirjailija = kirjailija
        self.sivuja = sivuja

class Kirjahylly:
    def __init__(self):
        self._kirjat = []
        # laskuri iteraattoria varten
        self.__laskuri = 0

    def lisaa_kirja(self, kirja: Kirja):
        self._kirjat.append(kirja)

    # Iteraattorin alustusmetodi
    # Tässä tulee alustaa iteroinnissa käytettävä(t) muuttuja(t)
    def __iter__(self):
        self.n = 0
        # Metodi palauttaa viittauksen olioon itseensä, koska
        # iteraattori on toteutettu samassa luokassa
        return self

    # Metodi palauttaa seuraavan alkion
    # Jos ei ole enempää alkioita, heitetään tapahtuma
    # StopIteration
    def __next__(self):
        if self.n < len(self._kirjat):
            # Poimitaan listasta nykyinen
            kirja = self._kirjat[self.n]
            # Kasvatetaan laskuria yhdellä
            self.n += 1
            # ...ja palautetaan
            return kirja
        else:
            # Ei enempää kirjoja
            raise StopIteration

```

Metodissa `__iter__` siis alustetaan iteroinnissa tarvittava muuttuja tai muuttujat - tässä tapauksessa riittää, että meillä on laskuri joka osoittaa listan nykyiseen alkioon. Lisäksi tarvitaan metodi `__next__`, joka palauttaa seuraavan alkion. Esimerkkitapauksessa palautetaan listasta alkio muuttujan `n` kohdalta ja kasvatetaan muuttujan arvoa yhdellä. Jos listassa ei ole enempää alkiota, "nostetaan" poikkeus `StopIteration`, joka kertoo iteroijalle (esim. for-silmukalle), että kaikki alkiot on käyty läpi.

Nyt voidaan käydä kirjahyllyn kirjat läpi esimerkiksi for-silmukassa näppärästi:

```python

if __name__ == "__main__":
    k1 = Kirja("Elämäni Pythoniassa", "Pekka Python", 123)
    k2 = Kirja("Vanhus ja Java", "Ernest Hemingjava", 204)
    k3 = Kirja("C-itsemän veljestä", "Keijo Koodari", 997)

    hylly = Kirjahylly()
    hylly.lisaa_kirja(k1)
    hylly.lisaa_kirja(k2)
    hylly.lisaa_kirja(k3)

    # Tulostetaan kaikkien kirjojen nimet
    for kirja in hylly:
        print(kirja.nimi)

```

<sample-output>

Elämäni Pythoniassa
Vanhus ja Java
C-itsemän veljestä

</sample-output>








