---
path: '/osa-12/1-funktio-parametrina'
title: 'Funktio parametrina'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat järjestää listoja eri kriteerien mukaan
- Tiedät mitä tarkoitetaan lambda-lausekkeella
- Osaat hyödyntää lambda-lauseketta myös muiden Pythonin funktioiden kanssa
- Osaat välittää funktion parametrina funktiolle

</text-box>

Olemme jo aikaisemmin käyttäneet metodia `sort` ja funktiota `sorted` järjestämään listoja luonnolliseen järjestykseen. Metodit toimivat sellaisenaan hyvin luvuista ja merkkijonoista koostuvien listojen kanssa, mutta jos lista sisältää vähänkään monimutkaisempia alkioita - esimerkiksi tupleja, sanakirjoja tai omista luokista muodostettuja olioita, eteen saattaa tulla tilanne, jossa Python ei järjestä listaa niin kuin ohjelmoija toivoisi.

Esimerkiksi lista tupleja järjestetään oletuksena jokaisen tuplen ensimmäisen alkion perusteella:

```python
tuotteet = [("banaani", 5.95), ("omena", 3.95), ("appelsiini", 4.50), ("vesimeloni", 4.95)]

tuotteet.sort()

for tuote in tuotteet:
    print(tuote)
```

<sample-output>

('appelsiini', 4.5)
('banaani', 5.95)
('omena', 3.95)
('vesimeloni', 4.95)

</sample-output>

Mitä jos haluaisimme järjestää tuotelistan hinnan perusteella?

## Funktiot parametrina

Järjestysmetodille tai -funktiolle voidaan antaa toisena parametrina järjestyksen määäräävä avain. Avaimeksi annetaan funktio, joka kertoo miten yksittäisen alkion arvo määritetään. Suorittamalla funktion jokaiselle alkiolle Python voi järjestää ne palautettujen arvojen mukaiseen järjestykseen.

Esimerkiksi

```python
def hintajarjestys(alkio: tuple):
    # Palautetaan tuplen toinen alkio eli hinta
    return alkio[1]

if __name__ == "__main__":
    tuotteet = [("banaani", 5.95), ("omena", 3.95), ("appelsiini", 4.50), ("vesimeloni", 4.95)]

    # Hyödynnetään funktiota hintajarjestys
    tuotteet.sort(key=hintajarjestys)

    for tuote in tuotteet:
        print(tuote)
```

<sample-output>

('omena', 3.95)
('appelsiini', 4.5)
('vesimeloni', 4.95)
('banaani', 5.95)

</sample-output>

Nyt ohjelma järjestää listan hinnan mukaiseen järjestykseen. Mutta mitä ohjelmassa oikeastaan tapahtuu?

Funktion `hintajarjestys` määrittely on melko yksinkertainen: se saa parametrikseen yhden alkion ja palauttaa alkiolle arvon - tässä tapauksessa tuplen toisen alkion (joka esimerkissämme esittää tuotteen hintaa). Tarkastellaan kuitenkin lähemmin järjestysmetodia kutsuvaa riviä:

`tuotteet.sort(key=hintajarjestys)`

Rivillä annetaan metodille `sort` parametriksi funktio. _Ei_ siis funktion paluuarvoa, vaan _funktio kokonaisuudessaan_. Järjestysmetodi käyttää tätä viittausta ja kutsuu funktiota jokaiselle alkiolle.

Kutsut nähdään selkeästi lisäämällä vertailufunktioomme ylimääräinen tulostuslause:

```python
def hintajarjestys(alkio: tuple):
    # Tulostetaan alkio
    print(f"Kutsuttiin hintajarjestys({alkio})")

    # Palautetaan tuplen toinen alkio eli hinta
    return alkio[1]


tuotteet = [("banaani", 5.95), ("omena", 3.95), ("appelsiini", 4.50), ("vesimeloni", 4.95)]

# Hyödynnetään funktiota hintajarjestys
tuotteet.sort(key=hintajarjestys)

for tuote in tuotteet:
    print(tuote)
```

<sample-output>

Kutsuttiin hintajarjestys(('banaani', 5.95))
Kutsuttiin hintajarjestys(('omena', 3.95))
Kutsuttiin hintajarjestys(('appelsiini', 4.5))
Kutsuttiin hintajarjestys(('vesimeloni', 4.95))
('omena', 3.95)
('appelsiini', 4.5)
('vesimeloni', 4.95)
('banaani', 5.95)

</sample-output>

Kirjoitetaan samaa periaatetta hyödyntäen ohjelma, joka järjestää listan omasta `Opiskelija`-luokasta luotuja olioita kahden eri kriteerin avulla:

```python
class Opiskelija:
    """ Luokka mallintaa yhtä opiskelijaa """
    def __init__(self, nimi: str, tunnus: str, pisteet: int):
        self.nimi = nimi
        self.tunnus = tunnus
        self.pisteet = pisteet

    def __repr__(self):
        return f"{self.nimi} ({self.tunnus}), {self.pisteet} op."


def tunnuksen_mukaan(alkio: Opiskelija):
    return alkio.tunnus

def pisteiden_mukaan(alkio: Opiskelija):
    return alkio.pisteet


if __name__ == "__main__":
    o1 = Opiskelija("Aapeli", "a123", 220)
    o2 = Opiskelija("Maija", "m321", 210)
    o3 = Opiskelija("Anna", "a999", 131)

    opiskelijat = [o1, o2, o3]

    print("Tunnuksen mukaan:")
    for opiskelija in sorted(opiskelijat, key=tunnuksen_mukaan):
        print(opiskelija)

    print()

    print("Pisteiden mukaan:")
    for opiskelija in sorted(opiskelijat, key=pisteiden_mukaan):
        print(opiskelija)
```

<sample-output>

Aapeli (a123), 220 op.
Anna (a999), 131 op.
Maija (m321), 210 op.

Pisteiden mukaan:
Anna (a999), 131 op.
Maija (m321), 210 op.
Aapeli (a123), 220 op

</sample-output>

Järjestely toimii niinkuin pitää. Jos olioille arvon antavia funktioita `tunnuksen_mukaan` ja `pisteiden_mukaan` ei tarvita muuten, voimme kuitenkin vielä yksinkertaistaa ohjelmaa.

## Lambda-lauseke

Lambda-lausekkeen avulla voidaan luoda ns. anonyymi funktio, eli funktio joka muodostetaan sillä hetkellä kun sitä tarvitaan. Lausekkeen yleinen syntaksi on

`lambda <parametrit> : <lauseke>`

Esimerkiksi tuplelistan järjestys onnistuisi näin käyttämällä lambda-lauseketta:

```python
tuotteet = [("banaani", 5.95), ("omena", 3.95), ("appelsiini", 4.50), ("vesimeloni", 4.95)]

# Funktio luodaan "lennosta" lambda-lausekkeella:
tuotteet.sort(key=lambda alkio: alkio[1])

for tuote in tuotteet:
    print(tuote)
```

<sample-output>

('omena', 3.95)
('appelsiini', 4.5)
('vesimeloni', 4.95)
('banaani', 5.95)

</sample-output>

Lauseke

`lambda alkio: alkio[1]`

vastaa funktiomäärittelyä

```python

def hinta(alkio):
    return alkio[1]
```

...paitsi että lambda-lauseketta käyttäessä funktiolle ei anneta nimeä. Tämän takia muodostettavaa funktiota kutsutaan anonyymiksi funktioksi.

Muuten lambdan avulla muodostettava funktio on kuin mikä tahansa muukin funktio. Esimerkiksi seuraava esimerkki järjestää merkkijonot niiden viimeisten merkkien mukaiseen aakkosjärjestykseen:

```python
mjonot = ["Mikko", "Makke", "Maija", "Markku", "Mikki"]

for jono in sorted(mjonot, key=lambda jono: jono[-1]):
    print(jono)
```

<sample-output>

Maija
Makke
Mikki
Mikko
Markku

</sample-output>

Mennään vielä pidemmälle: yhdistämällä listakooste ja join-metodi lambda-lausekkeeseen, voidaan esimerkiksi järjestää merkkijonot niistä löytyvien vokaalien mukaiseen järjestykseen välittämättä muista merkeistä:

```python
mjonot = ["Mikko", "Makke", "Maija", "Markku", "Mikki"]

for jono in sorted(mjonot, key=lambda jono: "".join([m for m in jono if m in "aeiouyäö"])):
    print(jono)
```

<sample-output>

Makke
Maija
Markku
Mikki
Mikko

</sample-output>

Anonyymejä funktioita voi hyödyntää Pythonissa monien muidenkin valmiiden funktioiden yhteydessä. Esimerkiksi funktioille `min` ja `max` voidaan määritellä samalla tavalla parametri `key`, jonka perusteella minimi- tai maksimiarvo valitaan.

Esimerkissä poimitaan levyistä aluksi vanhin ja sitten pisin:

```python

class Levy:
    """Luokka mallintaa yhtä äänilevyä"""
    def __init__(self, nimi: str, esittaja: str, vuosi: int, kesto: int):
        self.nimi = nimi
        self.esittaja = esittaja
        self.vuosi = vuosi
        self.kesto = kesto


    def __repr__(self):
        return f"{self.nimi} ({self.esittaja}), {self.vuosi}. {self.kesto} min."

if __name__ == "__main__":
    l1 = Levy("Nevermind", "Nirvana", 1991, 43)
    l2 = Levy("Let It Be", "Beatles", 1969, 35)
    l3 = Levy("U2", "Joshua Tree", 1986, 50)

    levyt = [l1, l2, l3]


    print("Vanhin levy:")
    print(min(levyt, key=lambda levy: levy.vuosi))

    print("Pisin levy: ")
    print(max(levyt, key=lambda levy: levy.kesto))
```

<sample-output>

Vanhin levy:
Let It Be (Beatles), 1969. 35 min.
Pisin levy:
U2 (Joshua Tree), 1986. 50 min.

</sample-output>

## Funktiot parametreina omissa funktioissa

Pythonissa on siis mahdollista välittää viittaus johonkin funktioon toiselle funktiolle. Tarkastellaan vielä esimerkkinä omaa funktiota, joka saa paramerikseen toisen funktion:

```python
def suorita_operaatio(operaatio):
    # Kutsutaan välitettyä funktiota
    return operaatio(10, 5)

def summa(a: int, b: int):
    return a + b

def tulo(a: int, b: int):
    return a * b


if __name__ == "__main__":
    print(suorita_operaatio(summa))
    print(suorita_operaatio(tulo))
    print(suorita_operaatio(lambda x,y: x - y))

```

<sample-output>

15
50
5

</sample-output>

Funktion `suorita_operaatio` lopputulos siis riippuu siitä, mikä funktio sille on välitetty parametrina. Funktioksi kelpaa mikä tahansa funktio (niin def-lauseella määritelty kuin anonyymikin) jolla on kaksi parametria.

Vaikkei funktioiden välittäminen parametrina olekaan kaikkein yleisimmin tarvittava operaatio, on se joka tapauksessa hyödyllinen mekanismi. Esimerkiksi seuraava ohjelma kirjoittaa tiedostosta 1 halutut rivit tiedostoon 2. Rivien valintakriteeri annetaan funktiona, joka palauttaa True, jos rivi tulee kirjoittaa toiseen tiedostoon:

```python
def kopioi_rivit(lahde_nimi: str, kohde_nimi: str, kriteeri: lambda x: True):
    with open(lahde_nimi) as lahde, open(kohde_nimi, "w") as kohde:
        for rivi in lahde:
            # Poistetaan ensin tyhjät merkit alusta ja lopusta
            rivi = rivi.strip()

            if kriteeri(rivi):
                kohde.write(rivi + "\n")

# Esimerkkejä
if __name__ == "__main__":
    # Jos kolmatta parametria ei ole määritelty, kopioidaan kaikki
    kopioi_rivit("eka.txt", "toka.txt")

    # Kopioidaan kaikki ei-tyhjät rivit
    kopioi_rivit("eka.txt", "toka.txt", lambda rivi: len(rivi) > 0)

    # Kopioidaan kaikki rivit, joilla on sana "Python"
    kopioi_rivit("eka.txt", "toka.txt", lambda rivi: "Python" in rivi)

    # Kopioidaan kaikki rivit, jotka eivät pääty pisteeseen
    kopioi_rivit("eka.txt", "toka.txt", lambda rivi: rivi[-1] != ".")
```

Funktiossa parametrille `kriteeri` on määritelty oletusarvoksi lambda-lauseke `lambda x: True`, jonka tuottama anonyymi funktio palauttaa arvon `True` kaikille syötteille. Niinpä oletuksena kopioidaan kaikki rivit tiedostosta toiseen. Jos käyttäjä antaa kolmannelle parametrille arvon, tämä korvaa oletusarvon.

