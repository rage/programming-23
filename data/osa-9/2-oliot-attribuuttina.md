---
path: '/osa-9/2-oliot-attribuuttina'
title: 'Oliot attribuuttina'
hidden: False
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaa tallentaa olioita toisten olioiden sisään

</text-box>

Aikaisemmin nähtiin esimerkkejä luokista, joissa attribuutteina oli käytetty esimerkiksi listoja. Samalla tavalla myös omista luokista luotuja olioita voi käyttää toisten olioiden attribuutteina. Seuraavissa esimerkeissä on määritelty luokat Kurssi, Opiskelija ja Kurssisuoritus. Kurssisuorituksessa hyödynnetään kahta ensimmäistä luokkaa. Luokkien sisäinen toteutus on jätetty hyvin lyhyeksi, jotta esimerkki ei paisuisi mahdottoman pitkäksi.

Esimerkissä jokainen luokka on kirjoitettu omaan tiedostoonsa.

Esitellään aluksi luokka Kurssi, joka on määritelty tiedostossa `kurssi.py`:

```python

# Luokka mallintaa yhtä kurssia
class Kurssi:

    def __init__(self, nimi: str, koodi: str, opintopisteet: int):
        self.nimi = nimi
        self.koodi = koodi
        self.opintopisteet = opintopisteet

    def __repr__(self):
        return f"{Kurssi}, nimi: {self.nimi}, koodi: {self.koodi}, opintopisteet: {self.opintopisteet}"

```

Luokka Opiskelija mallintaa yhtä opiskelijaa. Luokka on määritelty tiedostossa `opiskelija.py`:

```python

class Opiskelija:

    def __init__(self, nimi: str, opiskelijanumero: str, opintopisteet: int):
        self.nimi = nimi
        self.opiskelijanumero = opiskelijanumero
        self.opintopisteet = opintopisteet

    def __repr__(self):
        return f"{Opiskelija}, nimi: {self.nimi}, opiskelijanumero: {self.opiskelijanumero}, opintopisteet: {self.opintopisteet}"

```

Luokka Opintosuoritus hyödyntää luokkia Kurssi ja Opiskelija suorituksen tallentamiseen. Huomaa, että luokat tuodaan mukaan `import`-lauseella:

```python

from kurssi import Kurssi
from opiskelija import Opiskelija

class Opintosuoritus:

    def __init__(self, opiskelija: Opiskelija, kurssi: Kurssi, arvosana: int):
        self.opiskelija = opiskelija
        self.kurssi = kurssi
        self.arvosana = arvosana

    def __repr__(self):
        return f"{Opintosuoritus}, opiskelija: {self.opiskelija}, kurssi: {self.kurssi}, arvosana: {self.arvosana}"


```

Esimerkki opintosuoritusten lisäämisestä listaan:

```python

from opintosuoritus import Opintosuoritus

# Opiskelijat
olli = Opiskelija("Olli","1234",10)
pekka = Opiskelija("Pekka", "3210",23)
leena = Opiskelija("Leena", "9999", 43)
tiina = Opiskelija("Tiina", "3333", 8)

# ..listaksi
opiskelijat = [olli, pekka, leena, tiina]

# Kurssi
ohpe = Kurssi("Ohjelmoinnin perusteet", "ohpe1", 5)

# Luo suoritukset kaikille opiskelijoille, kaikille arvosanaksi 3
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
* Niinpä muuttuja opiskelija viittaa suoritukseen tallennettuun `Opiskelija`-olioon
* `Opiskelija`-luokan muuttuja `nimi` sisältää opiskelijan nimen

<programming-exercise name='Lemmikit' tmcname='osa09-06_lemmikit'>

Tehtäväpohjassa tulee kaksi luokkaa, `Henkilo` ja `Lemmikki`. Jokaisella henkilöllä on yksi lemmikki. Täydennä luokan Henkilo metodia `__repr__` siten, että metodi palauttaa merkkijonon, joka kertoo henkilön nimen lisäksi lemmikin nimen ja rodun alta löytyvät esimerkkitulosteen mukaisesti.

Huomaa, että metodin palauttaman merkkijonon pitää olla _täsmälleen samanlainen kuin esimerkkitulosteessa esitetty_!

```python
hulda = Lemmikki("Hulda", "sekarotuinen koira")
leevi = Henkilo("Leevi", hulda)

print(leevi)
```

<sample-output>

Leevi, kaverina Hulda, joka on sekarotuinen koira

</sample-output>

</programming-exercise>

## Olion attribuuttina lista olioita

Äskeisissä esimerkeissä oliolla oli atrribuuttina yksittäinen toisen luokan olio, esim. henkilöllä on attribuuttina lemmikki-olio, opintosuorituksella attribuuttina kurssi-olio.

Olio-ohjelmoinnissa törmätään erittäin usein tilanteeseen, jossa oliolla on attribuuttina joukko toisen luokan oliota. Eräs tälläinen tilanne kuvaa joukkueen ja sen pelaajien välistä yhteyttä:

```python
class Pelaaja:
    def __int__(self, nimi: str, maalit: int):
        self.nimi = nimi
        self.maalit = maalit

     def __repr__(self):
        return f"{self.nimi} maaleja {self.maalit}"

class Joukkue:
    def __int__(self, nimi: str):
        self.nimi = nimi
        self.pelaajat = []

    def lisaa_pelaaja(self, pelaaja: Pelaaja):
        self.pelaajat.append(pelaaja)

    def __repr__(self):
        maalit = []
        for pelaaja in self.pelaajat:
            maalit.append(pelaaja.maalit)

        return f"Joukkue {self.nimi}, pelaajia {len(self.pelaajat)}. Pelaajien maalimäärät {maalit}"
```

Käyttöesimerkki

```python
kupa = Joukkue("Kumpulan pallo")
erkki = Pelaaja("Erkki", 10)
kupa.lisaa_pelaaja(erkki)
emilia = Pelaaja("Emilia", 22)
kupa.lisaa_pelaaja(emilia)
# huomaa, että parametriksi voidaan määritellä suoraan konstruktorin kutsu
kupa.lisaa_pelaaja(Pelaaja("Antti", 1))
print(kupa)
```

<sample-output>

Joukkue Kumpulan pallo, pelaajia 3. Pelaajien maalimäärät [10, 22, 1]"

</sample-output>

<programming-exercise name='Lahjapakkaus' tmcname='osa09-07_lahjapakkaus'>

Tässä tehtävässä harjoitellaan lahjojen pakkaamista. Tehdään luokat `Lahja` ja `Pakkaus`. Lahjalla on nimi ja paino, ja Pakkaus sisältää lahjoja.

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

Tee luokka `Pakkaus`, johon voi lisätä lahjoja, ja joka pitää kirjaa pakkauksessa olevien lahjojen yhteispainosta. Luokassa tulee olla seuraavat metodit

- `lisaa_lahja(self, lahja: Lahja)`, joka lisää parametrina annettavan lahjan pakkaukseen. Metodi ei palauta mitään arvoa.
- `yhteispaino(self)`, joka palauttaa pakkauksessa olevien lahjojen yhteispainon.

Seuraavassa on luokan käyttöesimerkki:


```python
kirja = Lahja("Aapiskukko", 2)

paketti = Pakkaus()
paketti.lisaa_lahja(kirja)
print(paketti.yhteispaino())

cd_levy = Lahja("Pink Floyd: Dark side of the moon", 1)
paketti.lisaa_lahja(cd_levy)
print(paketti.yhteispaino())
```

<sample-output>

2
3

</sample-output>

</programming-exercise>

## None eli viite ei mihinkään

Pythonissa muuttujat siis aina _viittaavat_ johonkin olioon. On kuitenkin tilanteita, joissa haluaisimme määrittää arvon, joka ei viittaa mihinkään. Arvoa `None` käytetään esittämään tyhjää viittausta.

Jos esimerkiksi luokkaan joukkue lisättäisiin metodi, joka etsii joukkueen pelaajan, saattaisi olla luontevaa esittää paluuarvolla `None` tilanne, jossa pelaajaa ei löydy:

```python
class Joukkue:
    def __int__(self, nimi: str):
        self.nimi = nimi
        self.pelaajat = []

    def lisaa_pelaaja(self, elaaja: Pelaaja):
        self.pelaajat.append(pelaaja)

    def etsi(self, etsitty_nimi):
        for pelaaja in self.pelaajat:
            if pelaaja.nimi == etsitty_nimi:
                return pelaaja

        return None
```

Käyttöesimerkki:

```python
kupa = Joukkue("Kumpulan pallo")
erkki = Pelaaja("Erkki", 10)
kupa.lisaa_pelaaja(erkki)
emilia = Pelaaja("Emilia", 22)
kupa.lisaa_pelaaja(emilia)
kupa.lisaa_pelaaja(Pelaaja("Antti", 1))

p1 = kupa.etsi("Aatti")
print(p1)
p2 = kupa.etsi("Jukkis")
print(p2)
```

<sample-output>

Antti maaleja 1
None

</sample-output>

`None`-arvojen kanssa pitää olla tarkkana. On hyvin tyypillistä, että ohjelmassa kutsutaan jotain metodia oliolle, joka onkin None:

```python
kupa = Joukkue("Kumpulan pallo")
erkki = Pelaaja("Erkki", 10)
kupa.lisaa_pelaaja(erkki)

p = kupa.etsi("Jukkis")
print(f"Jukkiksen maalimäärä {p.maalit}")
```

Jos näin tehdään, ohjelma kaatuu:

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'NoneType' object has no attribute 'maalit'

</sample-output>

None-arvojen varalta onkin syytä tehdä tarkistus ennen kuin riskialtista koodia kutsutaan

```python
kupa = Joukkue("Kumpulan pallo")
erkki = Pelaaja("Erkki", 10)
kupa.lisaa_pelaaja(erkki)

p = kupa.etsi("Jukkis")
if p!=None:
    print(f"Jukkiksen maalimäärä {p.maalit}")
else:
    print(f"Jukkis ei pelaa Kumpulan pallossa :(")
```

<sample-output>

Jukkis ei pelaa Kumpulan pallossa :(

<sample-output>

<programming-exercise name='Huoneen lyhin' tmcname='osa09-08_huoneen_lyhin'>

Tehtäväpohjassa on valmiina luokka `Henkilo`. Henkilöllä on nimi ja pituus. Toteutetaan tässä tehtävässä luokka `Huone`, jonne voi lisätä henkilöitä, ja jota voi käyttää henkilöiden pituusjärjestykseen asettamiseen — henkilön ottaminen huoneesta palauttaa aina lyhyimmän henkilön.

## Huone

Luo luokka Huone, joka sisältää oliomuuttujana listan henkilöitä, ja jolla on seuraavat metodit:

- `lisaa(henkilo: Henkilo)` lisää huoneeseen parametrina annetun henkilön.
- `on_tyhja()` - palauttaa boolean-tyyppisen arvon True tai False, joka kertoo onko huone tyhjä.
- `tulosta_tiedot()` tulostaa huoneessa olevat henkilöt

Seuraavassa käyttöesimerkki

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

Lisää luokalle Huone metodi `lyhin()`, joka palauttaa huoneeseen lisätyistä henkilöistä lyhimmän. Mikäli huone on tyhjä, metodi palauttaa None-viitteen. Metodin ei tule poistaa henkilöä huoneesta.

```python
huone = Huone()
print("Lyhin: " , huone.lyhin())
print("Huone tyhjä?", huone.on_tyhja())

huone.lisaa(Henkilo("Lea", 183))
huone.lisaa(Henkilo("Kenya", 182))
huone.lisaa(Henkilo("Auli", 186))
huone.lisaa(Henkilo("Nina", 172))

print("Huone tyhjä?", huone.on_tyhja())
huone.tulosta_tiedot()

print()

lyhin = huone.lyhin()
print(f"Lyhin: {lyhin.nimi}")

print()
huone.tulosta_tiedot()
```

<sample-output>

Lyhin: None
Huone tyhjä? True
Huone tyhjä? False
Huoneessa 4 henkilöä, yhteispituus 723 cm
Lea (183 cm)
Kenya (182 cm)
Auli (186 cm)
Nina (172 cm)

Lyhin: Nina

Huoneessa 4 henkilöä, yhteispituus 723 cm
Lea (183 cm)
Kenya (182 cm)
Auli (186 cm)
Nina (172 cm)

</sample-output>

## Huoneesta ottaminen

Lisää luokalle Huone `poista_lyhin()`, ottaa huoneesta lyhimmän henkilön. Mikäli huone on tyhjä, metodi palauttaa None-viitteen.

```python
huone = Huone()
print("Lyhin: " , huone.lyhin())

huone.lisaa(Henkilo("Lea", 183))
huone.lisaa(Henkilo("Kenya", 182))
huone.lisaa(Henkilo("Auli", 186))
huone.lisaa(Henkilo("Nina", 172))

huone.tulosta_tiedot()
print()

poistettu = huone.poista_lyhin()
print(f"Otettiin huoneesta: {poistettu.nimi}")

print()
huone.tulosta_tiedot()
```

<sample-output>

Huoneessa 4 henkilöä, yhteispituus 723 cm
Lea (183 cm)
Kenya (182 cm)
Auli (186 cm)
Nina (172 cm)

Otettiin huoneesta: Nina

Huoneessa 3 henkilöä, yhteispituus 551 cm
Lea (183 cm)
Kenya (182 cm)
Auli (186 cm)

</sample-output>

</programming-exercise>

