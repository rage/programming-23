---
path: '/osa-9/6-lisaa-esimerkkeja'
title: 'Lisää esimerkkejä'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tunnet lisää esimerkkejä luokista ja olioista
- Osaat käyttää parametrien oletusarvoja metodeissa

</text-box>

Tarkastellaan seuraavaksi esimerkkiä, joka muodostuu kahdesta luokasta. Luokka `Piste` mallintaa yhtä pistettä kaksiulotteisessa koordinaatistossa ja luokka `Jana` kahden pisteen välistä janaa. Luokkien toiminta on kommentoitu koodiin.

```python
import math

class Piste:
    """ Luokka mallintaa pistettä kaksiulotteisessa koordinaatistossa """

    def __init__(self, x: float, y: float):
        # Attribuutit ovat julkisia, koska mitkä tahansa arvot käyvät x:n ja y:n arvoiksi
        self.x = x
        self.y = y

    # Luokkametodi palauttaa uuden pisteen paikassa (0, 0)
    # Huomaa, että luokan sisältä voi palauttaa olion luokasta
    @classmethod
    def origo(cls):
        return Piste(0, 0)

    # Luokkametodi muodostaa uuden pisteen annetun pisteen perusteella
    # Uusi piste on peilikuva annetusta pisteestä jommankumman tai molempien akselien suhteen
    # Esimerkiksi pisteen (1, 3) peilikuva x-akselin suhteen on (-1, 3)
    @classmethod
    def peilikuva(cls, piste, peilaa_x: bool, peilaa_y: bool):
        x = piste.x
        y = piste.y
        if peilaa_x:
            x = -x
        if peilaa_y:
            y = -y

        return Piste(x, y)

    def __str__(self):
        return f"({self.x}, {self.y})"

class Jana:
    """ Luokka mallintaa janaa kaksiulotteisessa koordinaatistossa """

    def __init__(self, alku: Piste, loppu: Piste):
        # Attribuutit ovat julkisia, koska mitkä tahansa pisteet kelpaavat
        self.alku = alku
        self.loppu = loppu

    # Metodi laskee janan pituuden Pythagoraan lauseella
    def pituus(self):
        summa = (self.loppu.x - self.alku.x) ** 2 + (self.loppu.y - self.alku.y) ** 2
        return math.sqrt(summa)

    # Metodi palauttaa janan keskipisteen
    def keskipiste(self):
        keskix = (self.alku.x + self.loppu.x) / 2
        keskiy = (self.alku.y + self.loppu.y) / 2
        return Piste(keskix, keskiy)

    def __str__(self):
        return f"{self.alku} ... {self.loppu}"
```

```python
piste = Piste(1,3)
print(piste)

origo = Piste.origo()
print(origo)

piste2 = Piste.peilikuva(piste, True, True)
print(piste2)

jana = Jana(piste, piste2)
print(jana.pituus())
print(jana.keskipiste())
print(jana)
```

<sample-output>

(1, 3)
(0, 0)
(-1, -3)
6.324555320336759
(0.0, 0.0)
(1, 3) ... (-1, -3)

</sample-output>

## Parametrien oletusarvot

Pythonissa mille tahansa parametrille voidaan asettaa oletusarvo. Oletusarvoja voidaan käyttää sekä funktioiden että metodien parametreissa.

Jos parametrille on annettu oletusarvo, sille ei ole pakko antaa arvoa kutsuttaessa. Jos arvo annetaan, se syrjäyttää oletusarvon, ja jos arvoa ei anneta, käytetään oletusarvoa.

Oletusarvot ovat usein hyödyllisiä konstruktoreissa: jos on oletettavaa, ettei tiettyä tietoa ole aina olemassa oliota luodessa, on parempi antaa sille vakioarvo konstruktorissa kuin antaa tämä asiakkaan huoleksi. Tämä on asiakkaalle helpompaa ja myös ylläpitää olion sisäistä eheyttä, kun voidaan esimerkiksi olla varmoja, että "tyhjä" arvo on aina samanlainen (muuten se voisi olla esimerkiksi merkkijono `""`, arvo `None` tai merkkijono `"ei asetettu"`).

Tarkastellaan esimerkkinä luokkaa, joka mallintaa opiskelijaa. Pakollisia kenttiä luodessa ovat opiskelijanumero ja nimi ja näistä opiskelijanumeroa ei pysty myöhemmin muuttamaan. Opintopisteet ja muistiinpanot voi halutessaan antaa oliota luodessa, mutta niille on myös asetettu oletusarvot. Luokan toiminta on kommentoitu suoraan ohjelmakoodin yhteyteen.

```python
class Opiskelija:
    """ Mallintaaa yhtä opiskelijaa """

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet:int = 0, muistiinpanot:str = ""):
        # kutsuu asetusmetodia
        self.nimi = nimi

        if len(opiskelijanumero) < 5:
            raise ValueError("Opiskelijanumerossa tulee olla vähintään 5 merkkiä")

        self.__opiskelijanumero = opiskelijanumero

        # Kutsuu asetusmetodia
        self.opintopisteet = opintopisteet

        self.__muistiinpanot = muistiinpanot

    @property
    def nimi(self):
        return self.__nimi

    @nimi.setter
    def nimi(self, nimi):
        if nimi != "":
            self.__nimi = nimi
        else:
            raise ValueError("Nimi ei voi olla tyhjä")

    @property
    def opiskelijanumero(self):
        return self.__opiskelijanumero

    @property
    def opintopisteet(self):
        return self.__opintopisteet

    @opintopisteet.setter
    def opintopisteet(self, op):
        if op >= 0:
            self.__opintopisteet = op
        else:
            raise ValueError("Opintopisteet ei voi olla negatiivinen luku")

    @property
    def muistiinpanot(self):
        return self.__muistiinpanot

    @muistiinpanot.setter
    def muistiinpanot(self, muistiinpanot):
        self.muistiinpanot = muistiinpanot

    def yhteenveto(self):
        print(f"Opiskelija {self.__nimi} ({self.opiskelijanumero}):")
        print(f"- opintopisteitä {self.__opintopisteet}")
        print(f"- muistiinpanot: {self.muistiinpanot}")
```

```python
# Annetaan pelkkä nimi ja op.nro
opiskelija1 = Opiskelija("Olli Opiskelija", "12345")
opiskelija1.yhteenveto()

# Annetaan nimi, op.nro ja opintopisteet
opiskelija2 = Opiskelija("Outi Opiskelija", "54321", 25)
opiskelija2.yhteenveto()

# Annetaan kaikki tiedot
opiskelija3 = Opiskelija("Olavi Opiskelija", "99999", 140, "lisäaika tentissä")
opiskelija3.yhteenveto()

# Ei anneta opintopisteitä, mutta annetaan muistiinpanot
# Huomaa, että parametri pitää nyt nimetä, kun järjestys eroaa tavallisesta
opiskelija4 = Opiskelija("Onerva Opiskelija", "98765", muistiinpanot="poissaoleva lukuvuonna 20-21")
opiskelija4.yhteenveto()
```

<sample-output>

Opiskelija Olli Opiskelija (12345):
- opintopisteitä 0
- muistiinpanot:
Opiskelija Outi Opiskelija (54321):
- opintopisteitä 25
- muistiinpanot:
Opiskelija Olavi Opiskelija (99999):
- opintopisteitä 140
- muistiinpanot: lisäaika tentissä
Opiskelija Onerva Opiskelija (98765):
- opintopisteitä 0
- muistiinpanot: poissaoleva lukuvuonna 20-21

</sample-output>

Huomaa, että attribuutille opiskelijanumero ei ole määritelty asetusmetodia, koska ideana on, että opiskelijanumero ei voi muuttua.

Parametrien oletusarvojen käyttöön liittyy kuitenkin eräs huomattavan iso "mutta" joka ilmenee seuraavasti esimerkistä:

```python
class Opiskelija:
    def __init__(self, nimi, tehdyt_kurssit=[]):
        self.nimi = nimi
        self.tehdyt_kurssit = tehdyt_kurssit

    def lisaa_suoritus(self, kurssi):
        self.tehdyt_kurssit.append(kurssi)
```

```python
opiskelija1 = Opiskelija("Olli Opiskelija")
opiskelija2 = Opiskelija("Outi Opiskelija")

opiskelija1.lisaa_suoritus("Ohpe")
opiskelija1.lisaa_suoritus("Tira")

print(opiskelija1.tehdyt_kurssit)
print(opiskelija2.tehdyt_kurssit)
```

<sample-output>

['Ohpe', 'Tira']
['Ohpe', 'Tira']

</sample-output>

Huomataan siis, että kurssisuorituksen lisääminen Ollille muuttaa myös Outin kurssisuorituksia. Ilmiö johtuu siitä, että Python uudelleenkäyttää oletusarvoa. Yllä oleva tapa luoda opiskelijat vastaa siis seuraavaa koodia:

```python
kurssit = []
opiskelija1 = Opiskelija("Olli Opiskelija", kurssit)
opiskelija2 = Opiskelija("Outi Opiskelija", kurssit)
```

Tästä johtuen parametrin oletusarvona ei koskaan tulisi käyttää monimutkaisempia tietorakenteita kuten listoja. Korjattu versio luokan `Opiskelija` konstruktorista on seuraava:

```python
class Opiskelija:
    def __init__(self, nimi, tehdyt_kurssit=None):
        self.nimi = nimi
        if tehdyt_kurssit is None:
            self.tehdyt_kurssit = []
        else:
            self.tehdyt_kurssit = tehdyt_kurssit

    def lisaa_suoritus(self, kurssi):
        self.tehdyt_kurssit.append(kurssi)
```

```python
opiskelija1 = Opiskelija("Olli Opiskelija")
opiskelija2 = Opiskelija("Outi Opiskelija")

opiskelija1.lisaa_suoritus("Ohpe")
opiskelija1.lisaa_suoritus("Tira")

print(opiskelija1.tehdyt_kurssit)
print(opiskelija2.tehdyt_kurssit)
```

<sample-output>

['Ohpe', 'Tira']
[]

</sample-output>

## Lisätehtävä

Vaikka seuraava tehtävä on tässä luvussa, et tarvitse tehtävän ratkaisemiseen mitään muuta kun luvussa [Oliot attribuuttina](/osa-9/2-oliot-attribuuttina) esiteltyjä tekniikoita. Tehtävä on käytännössä hyvin samanlainen kuin tuon luvun  tehtävät [lahjapakkaus](/osa-9/2-oliot-attribuuttina#programming-exercise-lahjapakkaus) ja [huoneen lyhin](/osa-9/2-oliot-attribuuttina#programming-exercise-huoneen-lyhin).

<programming-exercise name='Tavara, Matkalaukku ja Lastiruuma' tmcname='osa09-15_tavara_matkalaukku_lastiruuma'>

Tässä tehtäväsarjassa tehdään luokat `Tavara`, `Matkalaukku` ja `Lastiruuma`, joiden avulla harjoitellaan lisää olioita, jotka sisältävät toisia olioita.

## Tavara-luokka

Tee luokka `Tavara`, josta muodostetut oliot vastaavat erilaisia tavaroita. Tallennettavat tiedot ovat tavaran nimi ja paino (kg).

Luokan tulee toimia seuraavasti

```python
kirja = Tavara("Aapiskukko", 2)
puhelin = Tavara("Nokia 3210", 1)

print("Kirjan nimi:", kirja.nimi())
print("Kirjan paino:", kirja.paino())

print("Kirja:", kirja)
print("Puhelin:", puhelin)
```

Ohjelman tulostuksen tulisi olla seuraava:

<sample-output>

Kirjan nimi: Aapiskukko
Kirjan paino: 2
Kirja: Aapiskukko (2 kg)
Puhelin: Nokia 3210 (1 kg)

</sample-output>

Tavaralla on siis metodit `paino` ja `nimi` jotka palauttavat tavaran tiedot.

Luokan tulee tallentaa tieto nimestä ja painosta kapseloituna, eli seuraava ei saa onnistua:

```python
kirja = Tavara("Aapiskukko", 2)
kirja.paino = 10
```

## Matkalaukku-luokka

Tee luokka `Matkalaukku`. Matkalaukkuun liittyy tavaroita ja maksimipaino, joka määrittelee tavaroiden suurimman mahdollisen yhteispainon.

Lisää luokkaan seuraavat:

- konstruktori, jolle annetaan maksimipaino
- metodi `lisaa_tavara`, joka lisää parametrina annettavan tavaran matkalaukkuun. Metodi ei palauta mitään arvoa.
- metodi `__str__`, joka palauttaa merkkijonon muotoa "x tavaraa (y kg)"

Luokan tulee valvoa, että sen sisältämien tavaroiden yhteispaino ei ylitä maksimipainoa. Jos maksimipaino ylittyisi lisättävän tavaran vuoksi, metodi `lisaa_tavara` ei saa lisätä uutta tavaraa laukkuun.

Seuraavassa on luokan käyttöesimerkki:

```python
kirja = Tavara("Aapiskukko", 2)
puhelin = Tavara("Nokia 3210", 1)
tiiliskivi = Tavara("Tiiliskivi", 4)

matkalaukku = Matkalaukku(5)
print(matkalaukku)

matkalaukku.lisaa_tavara(kirja)
print(matkalaukku)

matkalaukku.lisaa_tavara(puhelin)
print(matkalaukku)

matkalaukku.lisaa_tavara(tiiliskivi)
print(matkalaukku)
```

Ohjelman tulostuksen tulisi olla seuraava:

<sample-output>

0 tavaraa (0 kg)
1 tavaraa (2 kg)
2 tavaraa (3 kg)
2 tavaraa (3 kg)

</sample-output>

## Kielenhuoltoa

Ilmoitus "1 tavaraa" ei ole kovin hyvää suomea, vaan olisi parempi sanoa "1 tavara". Tee tämä muutos luokassa sijaitsevaan `__str__`-metodiin.

Nyt edellisen ohjelman tulostuksen tulisi olla seuraava:

<sample-output>

0 tavaraa (0 kg)
1 tavara (2 kg)
2 tavaraa (3 kg)
2 tavaraa (3 kg)

</sample-output>

## Kaikki tavarat

Lisää luokkaan seuraavat metodit:

- `tulosta_tavarat`, joka tulostaa kaikki matkalaukussa olevat tavarat
- `paino`, joka palauttaa matkalaukun yhteispainoa kuvaavan kokonaisluvun, joka on sen sisältävien tavaroiden painojen summa

Seuraavassa on luokan käyttöesimerkki:

```python
kirja = Tavara("Aapiskukko", 2)
puhelin = Tavara("Nokia 3210", 1)
tiiliskivi = Tavara("Tiiliskivi", 4)

matkalaukku = Matkalaukku(10)
matkalaukku.lisaa_tavara(kirja)
matkalaukku.lisaa_tavara(puhelin)
matkalaukku.lisaa_tavara(tiiliskivi)

print("Matkalaukussa on seuraavat tavarat:")
matkalaukku.tulosta_tavarat()
paino_yht = matkalaukku.paino()
print(f"Yhteispaino: {paino_yht} kg")
```

Ohjelman tulostuksen tulisi olla seuraava:

<sample-output>

Matkalaukussa on seuraavat tavarat:
Aapiskukko (2 kg)
Nokia 3210 (1 kg)
Tiiliskivi (4 kg)
Yhteispaino: 7 kg

</sample-output>

Muokkaa myös luokkaasi siten, että käytät vain kahta oliomuuttujaa. Toinen sisältää maksimipainon, toinen on lista laukussa olevista tavaroista.

## Raskain tavara

Lisää vielä luokkaan metodi `raskain_tavara`, joka palauttaa painoltaan suurimman tavaran. Jos yhtä raskaita tavaroita on useita, metodi voi palauttaa minkä tahansa niistä. Metodin tulee palauttaa olioviite. Jos laukku on tyhjä, palauta arvo `None`.

Seuraavassa on luokan käyttöesimerkki:

```python
kirja = Tavara("Aapiskukko", 2)
puhelin = Tavara("Nokia 3210", 1)
tiiliskivi = Tavara("Tiiliskivi", 4)

matkalaukku = Matkalaukku(10)
matkalaukku.lisaa_tavara(kirja)
matkalaukku.lisaa_tavara(puhelin)
matkalaukku.lisaa_tavara(tiiliskivi)

raskain = matkalaukku.raskain_tavara()
print(f"Raskain tavara: {raskain}")
```

Ohjelman tulostuksen tulisi olla seuraava:

<sample-output>

Raskain tavara: Tiiliskivi (4 kg)

</sample-output>

## Lastiruuma-luokka

Tee luokka `Lastiruuma`, johon liittyvät seuraavat metodit:

- konstruktori, jolle annetaan maksimipaino
- metodi `lisaa_matkalaukku`, joka lisää parametrina annetun matkalaukun lastiruumaan
- metodi `__str__`, joka palauttaa merkkijonon muotoa "x matkalaukkua, tilaa y kg"

Luokan tulee valvoa, että sen matkalaukkujen yhteispaino ei ylitä maksimipainoa. Jos maksimipaino ylittyisi uuden matkalaukun vuoksi, metodi `lisaa_matkalaukku` ei saa lisätä uutta matkalaukkua.

Seuraavassa on luokan käyttöesimerkki:

```python
lastiruuma = Lastiruuma(1000)
print(lastiruuma)

kirja = Tavara("Aapiskukko", 2)
puhelin = Tavara("Nokia 3210", 1)
tiiliskivi = Tavara("Tiiliskivi", 4)

adan_laukku = Matkalaukku(10)
adan_laukku.lisaa_tavara(kirja)
adan_laukku.lisaa_tavara(puhelin)

pekan_laukku = Matkalaukku(10)
pekan_laukku.lisaa_tavara(tiiliskivi)

lastiruuma.lisaa_matkalaukku(adan_laukku)
print(lastiruuma)

lastiruuma.lisaa_matkalaukku(pekan_laukku)
print(lastiruuma)
```

<sample-output>

0 matkalaukkua, tilaa 1000 kg
1 matkalaukku, tilaa 997 kg
2 matkalaukkua, tilaa 993 kg

</sample-output>

## Lastiruuman sisältö

Lisää luokkaan metodi `tulosta_tavarat`, joka tulostaa kaikki lastiruuman matkalaukuissa olevat tavarat.

Seuraavassa on luokan käyttöesimerkki:

```python
kirja = Tavara("Aapiskukko", 2)
puhelin = Tavara("Nokia 3210", 1)
tiiliskivi = Tavara("Tiiliskivi", 4)

adan_laukku = Matkalaukku(10)
adan_laukku.lisaa_tavara(kirja)
adan_laukku.lisaa_tavara(puhelin)

pekan_laukku = Matkalaukku(10)
pekan_laukku.lisaa_tavara(tiiliskivi)

lastiruuma = Lastiruuma(1000)
lastiruuma.lisaa_matkalaukku(adan_laukku)
lastiruuma.lisaa_matkalaukku(pekan_laukku)

print("Ruuman matkalaukuissa on seuraavat tavarat:")
lastiruuma.tulosta_tavarat()
```

Ohjelman tulostuksen tulisi olla seuraava:


<sample-output>

Ruuman matkalaukuissa on seuraavat tavarat:
Aapiskukko (2 kg)
Nokia 3210 (1 kg)
Tiiliskivi (4 kg)

</sample-output>

</programming-exercise>

Vastaa lopuksi osion loppukyselyyn:

<quiz id="b293be33-577b-5bc2-8579-66ec4e412d2b"></quiz>

