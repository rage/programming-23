---
path: '/osa-8/5-lisaa-esimerkkeja'
title: 'Lisää esimerkkejä'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tässä osiossa

- Tutustutaan metodiin __repr__
- Esitellään lisää esimerkkejä luokista ja niistä muodostettavista olioista

</text-box>


## Esimerkki 1: Luokka Suorakulmio

Tarkastellaan seuraavaksi luokkaa, joka mallintaa suorakulmiota kaksiulotteisessa koordinaatistossa.

```python

class Suorakulmio:

    # Konstruktori
    def __init__(self, ylakulma: tuple, leveys: int, korkeus: int):
        # Vasen yläkulma on tuple, jossa on kaksi arvoa
        # kokonaislukuina: x- ja y-koordinaatti
        self.vasen_ylakulma = ylakulma
        self.leveys = leveys
        self.korkeus = korkeus

    # Metodi palauttaa neliö pinta-alan
    def pinta_ala(self):
        return self.leveys * self.korkeus

    # Metodi palauttaa neliön piirin
    def piiri(self):
        return self.leveys * 2 + self.korkeus * 2

    # Metodi palauttaa neliön oikean alakulman koordinaatit
    def oikea_alakulma(self):
        x = self.vasen_ylakulma[0]
        y = self.vasen_ylakulma[1]
        return (x + self.leveys, y + self.korkeus)

    # Metodi siirtää neliötä koordinaatistossa
    def siirra(self, x_askeleet: int, y_askeleet: int):
        x = self.vasen_ylakulma[0] + x_askeleet
        y = self.vasen_ylakulma[1] + y_askeleet
        self.vasen_ylakulma = (x, y)

# Testataan
suorakulmio = Suorakulmio((1,1), 5, 3)
print(suorakulmio.piiri())
print(suorakulmio.pinta_ala())
print(suorakulmio.oikea_alakulma())

suorakulmio.siirra(3, 3)
print(suorakulmio.vasen_ylakulma) # Ei metodi, joten ei sulkuja perään
print(suorakulmio.oikea_alakulma())

```

<sample-output>

16
15
(6, 4)
(4, 4)
(9, 7)

</sample-output>

Suorakulmion koordinaatit on tallennettu tuplena, joka sisältää kaksi kokonaislukua (käyttötarkoituksesta riippuen voisi olla järkevää tallentaa koordinaatit myös liukulukuna). Olisi mahdollista kirjoittaa myös koordinaateille oma luokkansa, mutta tässä yhteydessä tuple on riittävän toimiva vaihtoehto. Suorakulmioluokkaa itseään on helppo laajentaa, jos tarvitaan lisää ominaisuuksia.

## Olion tulostaminen

Kun omasta luokasta luotu olio tulostetaan sellaisenaan print-lauseella, lopputulos ei (varsinkaan loppukäyttäjän kannalta) ole kovin selkeä:

``` python

# Viitaten edelliseen esimerkkiin: tulosteen suorakulmio-olio

sk = Suorakulmio((5, 3), 8, 4)
print(sk)

```

Ohjelma tulostaa jotain seuraavankaltaista:

<sample-output>

<__main__.Suorakulmio object at 0x000002D7BF148A90>

</sample-output>

Järkevämpi tulostus oliolle voidaan määritellä kirjoittamalla luokkaan metodi `__repr__(self)`, joka palauttaa merkkijonon. Python käyttää tätä merkkijonoa automaattisesti tulostuslauseesa. Ideana on, että metodilla voidaan palautta merkkijono joka esittää olion _tilan_ sellaisessa muodossa, että käyttäjän on helppo lukea se.

 Lisätään luokkaan Suorakulmio tämä metodi:

```python

class Suorakulmio:

    # Konstruktori
    def __init__(self, ylakulma: tuple, leveys: int, korkeus: int):
        self.vasen_ylakulma = ylakulma
        self.leveys = leveys
        self.korkeus = korkeus

    # Metodi palauttaa neliö pinta-alan
    def pinta_ala(self):
        return self.leveys * self.korkeus

    # Metodi palauttaa neliön piirin
    def piiri(self):
        return self.leveys * 2 + self.korkeus * 2

    # Metodi palauttaa neliön oikean alakulman koordinaatit
    def oikea_alakulma(self):
        x = self.vasen_ylakulma[0]
        y = self.vasen_ylakulma[1]
        return (x + self.leveys, y + self.korkeus)

    # Metodi siirtää neliötä koordinaatistossa
    def siirra(self, x_askeleet: int, y_askeleet: int):
        x = self.vasen_ylakulma[0] + x_askeleet
        y = self.vasen_ylakulma[1] + y_askeleet
        self.vasen_ylakulma = (x, y)

    # Metodi palauttaa olion tilan merkkijonona
    def __repr__(self):
        return f"Suorakulmio, vasen yläkulma: {self.vasen_ylakulma}, leveys: {self.leveys}, korkeus: {self.korkeus}"


```

Nyt print-lause tuottaa helpommin ymmärrettävän lopputuloksen:

```python

sk = Suorakulmio((5, 3), 8, 4)
print(sk)

```

<sample-output>

Suorakulmio, vasen yläkulma: (5, 3), leveys: 8, korkeus: 4

</sample-output>

<programming-exercise name='Kello' tmcname='osa08-12_kello'>

Toteuta luokka `Kello`, joka toimii seuraavaan tapaan:

```python
kello = Kello(23, 59, 55)
print(kello)
kello.tick()
print(kello)
kello.tick()
print(kello)
kello.tick()
print(kello)
kello.tick()
print(kello)
kello.tick()
print(kello)
kello.tick()
print(kello)

kello.aseta(12, 5)
print(kello)
```

<sample-output>
23:59:55
23:59:56
23:59:57
23:59:58
23:59:59
00:00:00
00:00:01
12:05:01
</sample-output>

Konstruktori siis antaa kellon tunneille, minuuteille ja sekunneille alkuarvot. Metodi `tick` vie kelloa sekunnin eteenpäin ja metodilla `aseta` voi asettaa kellon tunneille ja minuuteille uuden arvon.

</programming-exercise>

<programming-exercise name='Maksukortti' tmcname='osa08-13_maksukortti'>

Helsingin Yliopiston opiskelijaruokaloissa eli Unicafeissa opiskelijat maksavat lounaansa käyttäen maksukorttia.

Tässä tehtäväsäsarjassa tehdään luokka `Maksukortti`, jonka tarkoituksena on jäljitellä Unicafeissa tapahtuvaa maksutoimintaa.

### Luokan runko

Tee ohjelmaan uusi luokka nimeltä `Maksukortti`.

Tee ensin luokalle konstruktori, jolle annetaan kortin alkusaldo ja joka tallentaa sen olion sisäiseen muuttujaan. Tee sitten `__repr__`-metodi, joka palauttaa kortin saldon muodossa "Kortilla on rahaa X euroa".

Seuraavassa on luokan Maksukortti runko:

```python
class  Maksukortti:
    def __init__(self, alkusaldo: float):
        self.saldo = alkusaldo

    def __repr__(self):
        pass
```

Käyttöesimerkki

```python
kortti = Maksukortti(50)
print(kortti)
```

Ohjelman tulisi tuottaa seuraava tulostus:

<sample-output>

Kortilla on rahaa 50.0 euroa

</sample-output>

### Kortilla maksaminen

Täydennä Maksukortti-luokkaa seuraavilla metodeilla:

- `syo_edullisesti` joka vähentää kortin saldoa 2.60 eurolla
- `syo_maukkaasti` joka vähentää kortin saldoa 4.60 eurolla

Seuraava pääohjelma testaa luokkaa

```python
kortti = Maksukortti(50)
print(kortti)

kortti.syo_edullisesti()
print(kortti)

kortti.syo_maukkaasti()
kortti.syo_edullisesti()
print(kortti)
```

Ohjelman tulisi tuottaa seuraava tulostus:

<sample-output>

Kortilla on rahaa 50.0 euroa
Kortilla on rahaa 47.4 euroa
Kortilla on rahaa 40.2 euroa

</sample-output>

Huomaa, että kortin saldo ei saa mennä negatiiviseksi:

```python
kortti = Maksukortti(4)
print(kortti)

kortti.syo_edullisesti()
print(kortti)

kortti.syo_edullisesti()
print(kortti)
```

<sample-output>

Kortilla on rahaa 4.0 euroa
Kortilla on rahaa 1.4 euroa
Kortilla on rahaa 1.4 euroa

</sample-output>

Eli kortin saldo ei enää vähene jos maksettaessa saldo ei ole riittävä.

### Kortin lataaminen

Lisää `Maksukortti`-luokkaan metodi lataa_rahaa

Metodin tarkoituksena on kasvattaa kortin saldoa parametrina annetulla rahamäärällä. Kuitenkin kortin saldo saa olla korkeintaan 150 euroa, joten jos ladattava rahamäärä ylittäisi sen, saldoksi tulisi tulla silti tasan 150 euroa.

```python
kortti = Maksukortti(10)
print(kortti)
kortti.lataa_rahaa(15)
print(kortti)
kortti.lataa_rahaa(10)
print(kortti)
kortti.lataa_rahaa(200)
print(kortti)

# negatiivinen lataus ei vaikuta saldoon
kortti.lataa_rahaa(-10)
print(kortti)
```

<sample-output>

Kortilla on rahaa 10.0 euroa
Kortilla on rahaa 25.0 euroa
Kortilla on rahaa 35.0 euroa
Kortilla on rahaa 150.0 euroa
Kortilla on rahaa 150.0 euroa

</sample-output>

Jos kortille yritetään ladata negatiivinen summa, tulee metodin [tuottaa poikkeus](/osa-6/3-virheet) `ValueError`:

```python
kortti = new Maksukortti(10)
kortti.lataa_rahaa(-10)
```

<sample-output>

File "testi.py", line 3, in maksukortti
ValueError: Kortille ei saa ladata negatiivista summaa

</sample-output>

### Monta korttia

Tee pääohjelma, joka sisältää seuraavan tapahtumasarjan:

- Luo Pekan kortti. Kortin alkusaldo on 20 euroa
- Luo Matin kortti. Kortin alkusaldo on 30 euroa
- Pekka syö maukkaasti
- Matti syö edullisesti
- _Korttien arvot tulostetaan (molemmat omalle rivilleen, rivin alkuun kortin omistajan nimi)_
- Pekka lataa rahaa 20 euroa
- Matti syö maukkaasti
- _Korttien arvot tulostetaan (molemmat omalle rivilleen, rivin alkuun kortin omistajan nimi)_
- Pekka syö edullisesti
- Pekka syö edullisesti
- Matti lataa rahaa 50 euroa
- _Korttien arvot tulostetaan (molemmat omalle rivilleen, rivin alkuun kortin omistajan nimi)_

Pääohjelman runko

```python
pekan_kortti = Maksukortti(20)
matin_kortti = Maksukortti(30)
# tee koodi tänne
```

Tulostuksen tulee olla seuraava

<sample-output>

Pekka: Kortilla on rahaa 15.4 euroa
Matti: Kortilla on rahaa 27.4 euroa
Pekka: Kortilla on rahaa 35.4 euroa
Matti: Kortilla on rahaa 22.8 euroa
Pekka: Kortilla on rahaa 30.2 euroa
Matti: Kortilla on rahaa 72.8 euroa

</sample-output>

</programming-exercise>

## Esimerkki 2: TBC

LISÄÄ ESIMERKKEJÄ TÄHÄN, AINAKIN PARI ERILAISTA:
- Joku, jossa attribuuttina on lista tai dict

<programming-exercise name='Sarja' tmcname='osa08-14_sarja'>

### Luokka Sarja

Tee luokka `Sarja`, joka toimii seuraavasti

```python
dexter = Sarja("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
print(dexter)
```

<sample-output>

Dexter (8 esityskautta)
genret: Crime, Drama, Mystery, Thriller
ei arvosteluja

</sample-output>

Konstruktorissa siis asetetaan sarjan nimi, sen esityskausien lukumäärä sekä lista, joka kertoo mihin genreen sarja kuuluu.

**Vihje:** merkkijonotaulukko saadaan muutettua haluttuja välimerkkejä sisältäväksi merkkijonoksi metodin `join` avulla seuraavasti:

```python
lista = ["Crime", "Drama", "Mystery", "Thriller"]
merkkijono = ", ",join(lista)
print(merkkijono)
```

<sample-output>

Crime, Drama, Mystery, Thriller

</sample-output>

### Arvostelujen lisääminen

Tee luokalle metodi `arvostele(arvosana: int)`, jonka avulla sarjalle voi lisätä arvosanan, joka on kokonaisluku väliltä 0-5. Myös metodia `__repr__` tulee muuttaa.

```python
dexter = Sarja("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
dexter.arvostele(4)
dexter.arvostele(5)
dexter.arvostele(5)
dexter.arvostele(3)
dexter.arvostele(0)
print(dexter)
```

<sample-output>

Dexter (8 esityskautta)
genret: Crime, Drama, Mystery, Thriller
arvosteluja 5, keskiarvo 3.4 pistettä

</sample-output>

### Sarjojen haku

Tee kaksi funktiota `arvosana_vahintaan(arvosana: float, sarjat: list)` ja `sisaltaa_genren(genre: str, sarjat: list)`, joiden avulla on mahdollista etsiä listalla olevia sarjoja.

Metodit toimivat seuraavasti:

```python
s1 = Sarja("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
s1.arvostele(5)

s2 = Sarja("South Park", 24, ["Animation", "Comedy"])
s2.arvostele(3)

s3 = Sarja("Friends", 10, ["Romance", "Comedy"])
s3.arvostele(2)

sarjat = [s1, s2, s3]

print("arvosana vähintään 4.5:")
for sarja in arvosana_vahintaan(4.5, sarjat):
    print(sarja.nimi)

print("genre Comedy:")
for sarja in sisaltaa_genren("Comedy", sarjat):
    print(sarja.nimi)
```

<sample-output>

arvosana vähintään 4.5:
Dexter

genre Comedy:
South Park
Friends

</sample-output>

</programming-exercise>
