---
path: '/osa-9/2-oliot-attribuuttina'
title: 'Oliot attribuuttina'
hidden: False
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat tallentaa olioita toisten olioiden sisään
- Tiedät, mitä tarkoittaa `None`

</text-box>

Aikaisemmin nähtiin esimerkkejä luokista, joissa attribuutteina oli käytetty esimerkiksi listoja. Samalla tavalla myös omista luokista luotuja olioita voi käyttää toisten olioiden attribuutteina. Seuraavissa esimerkeissä on määritelty luokat `Kurssi`, `Opiskelija` ja `Kurssisuoritus`. Kurssisuorituksessa hyödynnetään kahta ensimmäistä luokkaa. Luokkien sisäinen toteutus on lyhyt, jotta esimerkki toisi esille oleellisen.

Esimerkissä jokainen luokka on kirjoitettu omaan tiedostoonsa.

Esitellään aluksi luokka `Kurssi`, joka on määritelty tiedostossa `kurssi.py`:

```python
class Kurssi:
    def __init__(self, nimi: str, koodi: str, opintopisteet: int):
        self.nimi = nimi
        self.koodi = koodi
        self.opintopisteet = opintopisteet
```

Luokka `Opiskelija` mallintaa yhtä opiskelijaa. Luokka on määritelty tiedostossa `opiskelija.py`:

```python
class Opiskelija:
    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet: int):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero
        self.opintopisteet = opintopisteet
```

Luokka `Opintosuoritus` hyödyntää luokkia `Kurssi` ja `Opiskelija` suorituksen tallentamiseen. Huomaa, että luokat tuodaan mukaan `import`-lauseella:

```python
from kurssi import Kurssi
from opiskelija import Opiskelija

class Opintosuoritus:
    def __init__(self, opiskelija: Opiskelija, kurssi: Kurssi, arvosana: int):
        self.opiskelija = opiskelija
        self.kurssi = kurssi
        self.arvosana = arvosana
```

Esimerkki opintosuoritusten lisäämisestä listaan:

```python
from opintosuoritus import Opintosuoritus
from kurssi import Kurssi
from opiskelija import Opiskelija

# Luodaan lista opiskelijoista
opiskelijat = []
opiskelijat.append(Opiskelija("Olli", "1234", 10))
opiskelijat.append(Opiskelija("Pekka", "3210", 23))
opiskelijat.append(Opiskelija("Leena", "9999", 43))
opiskelijat.append(Opiskelija("Tiina", "3333", 8))

# Kurssi Ohjelmoinnin perusteet
ohpe = Kurssi("Ohjelmoinnin perusteet", "ohpe1", 5)

# Annetaan suoritukset kaikille opiskelijoille, kaikille arvosanaksi 3
suoritukset = []
for opiskelija in opiskelijat:
    suoritukset.append(Opintosuoritus(opiskelija, ohpe, 3))

# Tulostetaan kaikista suorituksista opiskelijan nimi
for suoritus in suoritukset:
    print(suoritus.opiskelija.nimi)
```

<sample-output>

Olli
Pekka
Leena
Tiina

</sample-output>

Tarkastellaan lähemmin riviä `print(suoritus.opiskelija.nimi)`:

* `suoritus` on luokan `Opintosuoritus` mukainen olio
* Niinpä muuttuja `opiskelija` viittaa suoritukseen tallennettuun `Opiskelija`-olioon
* `Opiskelija`-luokan muuttuja `nimi` sisältää opiskelijan nimen

## Milloin import tarvitaan?

Edellisessä esimerkissä käytetään muutamassa kohdassa `import`:ia:

```python
from opintosuoritus import Opintosuoritus
from kurssi import Kurssi
from opiskelija import Opiskelija

# koodi
```

Importia tarvitaan vain jos tiedostossa käytetään jossain muualla  määriteltyä koodia. Näin on esimerkiksi kun käytetään jotain Pythonin valmista kalustoa, esim. matemaattisia operaatiota tarjoavaa moduulia `math`:

```python
import math

x = 10
print(f"luvun {x} {neliöjuuri math.sqrt(x)}")
```

Edellisessä tehtävässä oletettiin, että luokat on määritelyt omissa tiedostoissa. Esimerkki toteaa mm.
 _Esitellään aluksi luokka Kurssi, joka on määritelty tiedostossa kurssi.py_

Ja importin tarve siis johtuu tästä.

Jos kaikki koodi sijoitetaan samaan tiedostoon, kuten kaikissa kurssin tehtäväissä tapahtuu, **et tarvitse** `import`:ia luokkien käytöön.

Jos siis päädyt kirjottamaan kurssilla seuraavanlaista koodia

```python
from henkilo import Henkilo

# koodi
```

Ratkaisusi on todennäköisesti väärä! Lisää importin käytöstä [osan 7](/osa-7/1-moduulit/) materiaalissa.

<programming-exercise name='Lemmikit' tmcname='osa09-06_lemmikki'>

Tehtäväpohjassa tulee kaksi luokkaa, `Henkilo` ja `Lemmikki`. Jokaisella henkilöllä on yksi lemmikki. Täydennä luokan `Henkilo` metodia `__str__` siten, että metodi palauttaa merkkijonon, joka kertoo henkilön nimen lisäksi lemmikin nimen ja rodun alta löytyvät esimerkkitulosteen mukaisesti.

Huomaa, että metodin palauttaman merkkijonon pitää olla _täsmälleen samanlainen kuin esimerkkitulosteessa esitetty_!

```python
hulda = Lemmikki("Hulda", "sekarotuinen koira")
leevi = Henkilo("Leevi", hulda)

print(leevi)
```

<sample-output>

Leevi, kaverina Hulda, joka on sekarotuinen koira

</sample-output>

**Huom:** koska kaikki koodi tulee samaan tiedostoon, etä tarvitse tehtävässä `import`:ia ollenkaan!

</programming-exercise>

## Olion attribuuttina lista olioita

Äskeisissä esimerkeissä oliolla oli attribuuttina yksittäinen toisen luokan olio, esim. henkilöllä attribuuttina lemmikki ja opintosuorituksella attribuuttina kurssi.

Olio-ohjelmoinnissa törmätään kutenkin usein tilanteeseen, jossa oliolla on attribuuttina joukko toisen luokan oliota. Eräs tälläinen tilanne kuvaa joukkueen ja sen pelaajien välistä yhteyttä:

```python
class Pelaaja:
    def __init__(self, nimi: str, maalit: int):
        self.nimi = nimi
        self.maalit = maalit

    def __str__(self):
        return f"{self.nimi} (maaleja {self.maalit})"

class Joukkue:
    def __init__(self, nimi: str):
        self.nimi = nimi
        self.pelaajat = []

    def lisaa_pelaaja(self, pelaaja: Pelaaja):
        self.pelaajat.append(pelaaja)

    def yhteenveto(self):
        maalit = []
        for pelaaja in self.pelaajat:
            maalit.append(pelaaja.maalit)
        print("Joukkue", self.nimi)
        print("Pelaajia", len(self.pelaajat))
        print("Pelaajien maalimäärät", maalit)
```

Käyttöesimerkki:

```python
kupa = Joukkue("Kumpulan pallo")
kupa.lisaa_pelaaja(Pelaaja("Erkki", 10))
kupa.lisaa_pelaaja(Pelaaja("Emilia", 22))
kupa.lisaa_pelaaja(Pelaaja("Antti", 1))
kupa.yhteenveto()
```

<sample-output>

Joukkue Kumpulan pallo
Pelaajia 3
Pelaajien maalimäärät [10, 22, 1]

</sample-output>

<programming-exercise name='Lahjapakkaus' tmcname='osa09-07_lahjapakkaus'>

Tässä tehtävässä harjoitellaan lahjojen pakkaamista. Tehdään luokat `Lahja` ja `Pakkaus`. Lahjalla on nimi ja paino, ja pakkaus sisältää lahjoja.

## Lahja-luokka

Tee luokka `Lahja`, josta muodostetut oliot kuvaavat erilaisia lahjoja. Tallennettavat tiedot ovat tavaran nimi ja paino (kg). Luokan olioiden tulee toimia seuraavasti:

```python
kirja = Lahja("Aapiskukko", 2)

print("Lahjan nimi:", kirja.nimi)
print("Lahjan paino:" ,kirja.paino)
print("Lahja:", kirja)
```

Ohjelman tulostuksen tulisi olla seuraava:

<sample-output>

Lahjan nimi: Aapiskukko
Lahjan paino: 2
Lahja: Aapiskukko (2 kg)

</sample-output>

## Pakkaus-luokka

Tee luokka `Pakkaus`, johon voi lisätä lahjoja ja joka pitää kirjaa pakkauksessa olevien lahjojen yhteispainosta. Luokassa tulee olla seuraavat metodit

- `lisaa_lahja(self, lahja: Lahja)`, joka lisää parametrina annettavan lahjan pakkaukseen. Metodi ei palauta mitään arvoa.
- `yhteispaino(self)`, joka palauttaa pakkauksessa olevien lahjojen yhteispainon.

Seuraavassa on luokan käyttöesimerkki:

```python
kirja = Lahja("Aapiskukko", 2)

pakkaus = Pakkaus()
pakkaus.lisaa_lahja(kirja)
print(pakkaus.yhteispaino())

cd_levy = Lahja("Pink Floyd: Dark side of the moon", 1)
pakkaus.lisaa_lahja(cd_levy)
print(pakkaus.yhteispaino())
```

<sample-output>

2
3

</sample-output>

</programming-exercise>

## None eli viite ei mihinkään

Pythonissa muuttujat viittaavat aina johonkin olioon. On kuitenkin tilanteita, joissa haluaisimme määrittää arvon, joka ei viittaa mihinkään. Arvoa `None` käytetään esittämään tyhjää viittausta.

Jos esimerkiksi luokkaan joukkue lisättäisiin metodi, joka etsii joukkueen pelaajan, saattaisi olla luontevaa esittää paluuarvolla `None` tilanne, jossa pelaajaa ei löydy:

```python
class Pelaaja:
    def __init__(self, nimi: str, maalit: int):
        self.nimi = nimi
        self.maalit = maalit

    def __str__(self):
        return f"{self.nimi} (maaleja {self.maalit})"

class Joukkue:
    def __init__(self, nimi: str):
        self.nimi = nimi
        self.pelaajat = []

    def lisaa_pelaaja(self, pelaaja: Pelaaja):
        self.pelaajat.append(pelaaja)

    def etsi(self, nimi: str):
        for pelaaja in self.pelaajat:
            if pelaaja.nimi == nimi:
                return pelaaja
        return None
```

Käyttöesimerkki:

```python
kupa = Joukkue("Kumpulan pallo")
kupa.lisaa_pelaaja(Pelaaja("Erkki", 10))
kupa.lisaa_pelaaja(Pelaaja("Emilia", 22))
kupa.lisaa_pelaaja(Pelaaja("Antti", 1))

pelaaja1 = kupa.etsi("Antti")
print(pelaaja1)
pelaaja2 = kupa.etsi("Jukkis")
print(pelaaja2)
```

<sample-output>

Antti (maaleja 1)
None

</sample-output>

`None`-arvojen kanssa pitää olla tarkkana. On hyvin tyypillistä, että ohjelmassa kutsutaan jotain metodia oliolle, joka onkin `None`:

```python
kupa = Joukkue("Kumpulan pallo")
kupa.lisaa_pelaaja(Pelaaja("Erkki", 10))

pelaaja = kupa.etsi("Jukkis")
print(f"Jukkiksen maalimäärä {pelaaja.maalit}")
```

Jos näin tehdään, ohjelma päättyy virheeseen:

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'NoneType' object has no attribute 'maalit'

</sample-output>

`None`-arvojen varalta onkin syytä tehdä tarkistus, ennen kuin riskialtista koodia kutsutaan:

```python
kupa = Joukkue("Kumpulan pallo")
kupa.lisaa_pelaaja(Pelaaja("Erkki", 10))

pelaaja = kupa.etsi("Jukkis")
if pelaaja is not None:
    print(f"Jukkiksen maalimäärä {p.maalit}")
else:
    print(f"Jukkis ei pelaa Kumpulan pallossa :(")
```

<sample-output>

Jukkis ei pelaa Kumpulan pallossa :(

</sample-output>

<programming-exercise name='Huoneen lyhin' tmcname='osa09-08_huoneen_lyhin'>

Tehtäväpohjassa on valmiina luokka `Henkilo`. Henkilöllä on nimi ja pituus. Toteutetaan tässä tehtävässä luokka `Huone`, jonne voi lisätä henkilöitä ja josta voi hakea ja poistaa lyhimmän henkilön.

## Huone

Luo luokka `Huone`, jonka sisällä on lista henkilöitä ja jolla on seuraavat metodit:

- `lisaa(henkilo: Henkilo)` lisää huoneeseen parametrina annetun henkilön.
- `on_tyhja()` - palauttaa arvon `True` tai `False`, joka kertoo, onko huone tyhjä.
- `tulosta_tiedot()` tulostaa huoneessa olevat henkilöt

Seuraavassa käyttöesimerkki:

```python
huone = Huone()
print("Huone tyhjä?", huone.on_tyhja())
huone.lisaa(Henkilo("Lea", 183))
huone.lisaa(Henkilo("Kenya", 182))
huone.lisaa(Henkilo("Auli", 186))
huone.lisaa(Henkilo("Nina", 172))
huone.lisaa(Henkilo("Terhi", 185))
print("Huone tyhjä?", huone.on_tyhja())
huone.tulosta_tiedot()
```

<sample-output>

Huone tyhjä? True
Huone tyhjä? False
Huoneessa 5 henkilöä, yhteispituus 908 cm
Lea (183 cm)
Kenya (182 cm)
Auli (186 cm)
Nina (172 cm)
Terhi (185 cm)

</sample-output>

## Lyhin henkilö

Lisää luokalle `Huone` metodi `lyhin()`, joka palauttaa huoneeseen lisätyistä henkilöistä lyhimmän. Mikäli huone on tyhjä, metodi palauttaa `None`-viitteen. Metodin ei tule poistaa henkilöä huoneesta.

```python
huone = Huone()

print("Huone tyhjä?", huone.on_tyhja())
print("Lyhin:", huone.lyhin())

huone.lisaa(Henkilo("Lea", 183))
huone.lisaa(Henkilo("Kenya", 182))
huone.lisaa(Henkilo("Nina", 172))
huone.lisaa(Henkilo("Auli", 186))

print()

print("Huone tyhjä?", huone.on_tyhja())
print("Lyhin:", huone.lyhin())

print()

huone.tulosta_tiedot()
```

<sample-output>

Huone tyhjä? True
Lyhin: None

Huone tyhjä? False
Lyhin: Nina

Huoneessa 4 henkilöä, yhteispituus 723 cm
Lea (183 cm)
Kenya (182 cm)
Nina (172 cm)
Auli (186 cm)

</sample-output>

## Huoneesta ottaminen

Lisää luokalle `Huone` metodi `poista_lyhin()`, joka poistaa ja palauttaa huoneesta lyhimmän henkilön. Mikäli huone on tyhjä, metodi palauttaa `None`-viitteen.

```python
huone = Huone()

huone.lisaa(Henkilo("Lea", 183))
huone.lisaa(Henkilo("Kenya", 182))
huone.lisaa(Henkilo("Nina", 172))
huone.lisaa(Henkilo("Auli", 186))
huone.tulosta_tiedot()

print()

poistettu = huone.poista_lyhin()
print(f"Otettiin huoneesta {poistettu.nimi}")

print()

huone.tulosta_tiedot()
```

<sample-output>

Huoneessa 4 henkilöä, yhteispituus 723 cm
Lea (183 cm)
Kenya (182 cm)
Nina (172 cm)
Auli (186 cm)

Otettiin huoneesta Nina

Huoneessa 3 henkilöä, yhteispituus 551 cm
Lea (183 cm)
Kenya (182 cm)
Auli (186 cm)

</sample-output>

**Vihje**: [osassa 4](/osa-4/3-listat#alkioiden-lisaaminen-ja-poistaminen) kerrottiin, miten alkion poistaminen listalta onnistuu.

**Vihje2**: muista, että metodissa on mahdollista kutsua saman olion toista metodia. Eli seuraava koodi toimii:

```python
class Huone:
    # ...
    def lyhin(self):
        # koodi

    def poista_lyhin(self):
        lyhin_henkilo = self.lyhin()
        # ...
```

</programming-exercise>

