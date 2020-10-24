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

    # Metodi palauttaa suorakulmion pinta-alan
    def pinta_ala(self):
        return self.leveys * self.korkeus

    # Metodi palauttaa suorakulmion piirin
    def piiri(self):
        return self.leveys * 2 + self.korkeus * 2

    # Metodi palauttaa suorakulmion oikean alakulman koordinaatit
    def oikea_alakulma(self):
        x = self.vasen_ylakulma[0]
        y = self.vasen_ylakulma[1]
        return (x + self.leveys, y + self.korkeus)

    # Metodi siirtää suorakulmiota koordinaatistossa
    def siirra(self, x_askeleet: int, y_askeleet: int):
        x = self.vasen_ylakulma[0] + x_askeleet
        y = self.vasen_ylakulma[1] + y_askeleet
        self.vasen_ylakulma = (x, y)

# Testataan
suorakulmio = Suorakulmio((1, 1), 5, 3)
print(suorakulmio.piiri())
print(suorakulmio.pinta_ala())
print(suorakulmio.oikea_alakulma())

suorakulmio.siirra(3, 3)
print(suorakulmio.vasen_ylakulma) # Ei metodi, joten ei sulkuja perään
print(suorakulmio.oikea_alakulma())
```

TODO: ei ole kyllä tyylikästä, että `vasen_ylakulma` ei ole metodi mutta `oikea_alakulma` on

<sample-output>

16
15
(6, 4)
(4, 4)
(9, 7)

</sample-output>

Suorakulmion koordinaatit on tallennettu tuplena, joka sisältää kaksi kokonaislukua (käyttötarkoituksesta riippuen voisi olla järkevää tallentaa koordinaatit myös liukulukuna). Olisi mahdollista kirjoittaa myös koordinaateille oma luokkansa, mutta tässä yhteydessä tuple on riittävä vaihtoehto. Suorakulmioluokkaa itseään on helppo laajentaa, jos tarvitaan lisää ominaisuuksia.

## Olion tulostaminen

Kun omasta luokasta luotu olio tulostetaan sellaisenaan print-lauseella, lopputulos ei (varsinkaan loppukäyttäjän kannalta) ole kovin selkeä:

``` python
# Viitaten edelliseen esimerkkiin: tulosteen suorakulmio-olio

suorakulmio = Suorakulmio((5, 3), 8, 4)
print(suorakulmio)
```

Ohjelma tulostaa jotain seuraavankaltaista:

<sample-output>

<__main__.Suorakulmio object at 0x000002D7BF148A90>

</sample-output>

Järkevämpi tulostus oliolle voidaan määritellä kirjoittamalla luokkaan metodi `__repr__(self)`, joka palauttaa merkkijonon. Python käyttää tätä merkkijonoa automaattisesti tulostuslauseessa. Ideana on, että metodilla voidaan palauttaa merkkijono, joka esittää olion _tilan_ jossain luettavassa muodossa.

Lisätään luokkaan Suorakulmio tämä metodi:

```python
class Suorakulmio:

    # Konstruktori
    def __init__(self, ylakulma: tuple, leveys: int, korkeus: int):
        self.vasen_ylakulma = ylakulma
        self.leveys = leveys
        self.korkeus = korkeus

    # (Luokan metodit tässä välissä)

    # Metodi palauttaa olion tilan merkkijonona
    def __repr__(self):
        return f"Suorakulmio, vasen yläkulma: {self.vasen_ylakulma}, leveys: {self.leveys}, korkeus: {self.korkeus}"
```

Nyt `print`-lause tuottaa luettavan lopputuloksen:

```python
suorakulmio = Suorakulmio((5, 3), 8, 4)
print(suorakulmio)
```

<sample-output>

Suorakulmio, vasen yläkulma: (5, 3), leveys: 8, korkeus: 4

</sample-output>

<programming-exercise name='Sekuntikello' tmcname='osa08-11a_sekuntikello'>

Tehtäväpohjassa on mukana luokan `Sekuntikello` runko:

```python
class Sekuntikello:
    def __init__(self):
        self.sekunnit = 0
        self.minuutit = 0
```

Laajenna luokkaa siten, että se toimii seuraavasti:

```python
kello = Sekuntikello()
for i in range(3600):
    print(kello)
    kello.tick()
```

<sample-output>

00:00
00:01
00:02
... tässä välissä monta riviä
00:59
01:00
01:01
... tässä välissä erittäin monta riviä
59:58
59:59
00:00
00:01

</sample-output>

Metodi `tick` vie siis kelloa sekunnin eteenpäin, ja sekä sekuntien että minuuttien arvo on suuruudeltaan korkeintaan 59.

**Vihje:** voit metodin `tick` testailua helpottaa se, että asetat tilapäisesti konstruktorissa sekunneille ja minuuteille valmiiksi jonkin suuremman arvon kuin 0.

</programming-exercise>

<programming-exercise name='Kello' tmcname='osa08-12_kello'>

Toteuta edellistä tehtävää laajentava luokka `Kello`, joka toimii seuraavaan tapaan:

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
12:05:00
</sample-output>

Konstruktori siis antaa kellon tunneille, minuuteille ja sekunneille alkuarvot. Metodi `tick` vie kelloa sekunnin eteenpäin ja metodilla `aseta` voi asettaa kellon tunneille ja minuuteille uuden arvon ja _nollaa sekunnit_.

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

Lisää `Maksukortti`-luokkaan metodi `lataa_rahaa`.

Metodin tarkoituksena on kasvattaa kortin saldoa parametrina annetulla rahamäärällä.

```python
kortti = Maksukortti(10)
print(kortti)
kortti.lataa_rahaa(15)
print(kortti)
kortti.lataa_rahaa(10)
print(kortti)
kortti.lataa_rahaa(200)
print(kortti)
```

<sample-output>

Kortilla on rahaa 10.0 euroa
Kortilla on rahaa 25.0 euroa
Kortilla on rahaa 35.0 euroa
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

## Esimerkki 2: Tehtävälista

Seuraava luokka `Tehtavalista` toteuttaa tehtävälistan, johon voi lisätä uuden tehtävän tietyllä prioriteetilla ja hakea seuraavaksi suoritettavan tehtävän. Muita toimintoja ovat listalla olevien tehtävien määrän hakeminen sekä listan tyhjentäminen.

```python
class Tehtavalista:
    def __init__(self):
        self.tehtavat = []

    def lisaa(self, nimi: str, prioriteetti: int):
        self.tehtavat.append((prioriteetti, nimi))

    def hae_seuraava(self):
        self.tehtavat.sort()
        # Metodi pop poistaa ja palauttaa listan viimeisen alkion
        tehtava = self.tehtavat.pop()
        # Palautetaan tuplen jälkimmäinen osa eli tehtävän nimi
        return tehtava[1]

    def yhteensa(self):
        return len(self.tehtavat)

    def tyhjenna(self):
        self.tehtavat = []

lista = Tehtavalista()
lista.lisaa("opiskelu", 50)
lista.lisaa("ulkoilu", 60)
lista.lisaa("siivous", 10)
print(lista.yhteensa()) # 3
print(lista.hae_seuraava()) # ulkoilu
print(lista.yhteensa()) # 2
lista.lisaa("treffit", 100)
print(lista.yhteensa()) # 3
print(lista.hae_seuraava()) # treffit
print(lista.hae_seuraava()) # opiskelu
print(lista.yhteensa()) # 1
lista.tyhjenna()
print(lista.yhteensa()) # 0
```

Tässä luokassa tehtäviä säilytetään listassa, jossa on tuplena kunkin tehtävän prioriteetti ja nimi. Prioriteetti tallennetaan ensin, jolloin tärkein tehtävä on listan lopussa listan järjestämisen jälkeen. Tämän ansiosta tehtävän saa haettua ja poistettua listalta kätevästi `pop`-metodilla.

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
merkkijono = ", ".join(lista)
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
