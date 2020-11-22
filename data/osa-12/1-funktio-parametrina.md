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

Järjestysmetodille tai -funktiolle voidaan antaa toisena parametrina järjestyksen määräävä avain. Avaimeksi annetaan funktio, joka kertoo miten yksittäisen alkion arvo määritetään. Suorittamalla funktion jokaiselle alkiolle Python voi järjestää ne palautettujen arvojen mukaiseen järjestykseen.

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

Järjestys saadaa käännettyä _päinvastaiseksi_ hyödyntämällä sekä metodista `sort` että funktiosta ´sorted` löytyvää toista parametria `reversed`:

```python
tuotteet.sort(key=hintajarjestys, reverse=True)

t2 = sorted(tuotteet, key=hintajarjestys, reverse=True)
```

## Funktion sisällä määritelty funktio

Jos haluaisimme siirtää edellisessä esimerkissä tehdyn järjestämisen omaan funktioonsa `jarjesta_hinnan_mukaan`, voisimme toteuttaa sen seuraavasti:

```python
def hintajarjestys(alkio: tuple):
    return alkio[1]

def jarjesta_hinnan_mukaan(alkiot: list):
    # käytetään täällä funktiota hintajarjestys
    return sorted(alkiot, key=hintajarjestys)

tuotteet = [("banaani", 5.95), ("omena", 3.95), ("appelsiini", 4.50), ("vesimeloni", 4.95)]

for tuote in jarjesta_hinnan_mukaan(tuotteet):
    print(tuote)
```

Jos järjestämisen käyttämää apufunktiota `hintajarjestys` ei käytetä missään muussa kohtaa ohjelmaa kuin funktiossa `jarjesta_hinnan_mukaan`, sen määrittely voitaisiin siirtää funktion sisälle:

```python
def jarjesta_hinnan_mukaan(alkiot: list):
    # määritellään apufunktio tällä kertaa funktion sisällä
    def hintajarjestys(alkio: tuple):
        return alkio[1]

    return sorted(alkiot, key=hintajarjestys)
```

<programming-exercise name='Järjestys varastosaldon mukaan' tmcname='osa12-01_varastosaldo'>

Tee funktio `jarjesta_varastosaldon_mukaan(alkiot: list)`. Funktio saa parametrina listan tupleja, joissa kolmantena alkiona on tuotteiden varastosaldo. Funktio järjestää parametrinaan saamat tuotteet varastosaldojen  mukaiseen kasvavaan järjestykseen.  Funktio ei muuta parametrina olevaa listaa, vaan palauttaa uuden listan.

Funktio toimii seuraavasti:

```python
tuotteet = [("banaani", 5.95, 12), ("omena", 3.95, 3), ("appelsiini", 4.50, 2), ("vesimeloni", 4.95, 22)]

for tuote in jarjesta_varastosaldon_mukaan(tuotteet):
    print(f"{tuote[0]} {tuote[2]} kpl")
```

<sample-output>
appelsiini 2 kpl
omena 3 kpl
banaani 12 kpl
vesimeloni 22 kpl

</sample-output>

</programming-exercise>

<programming-exercise name='Järjestys tuotantokausien mukaan' tmcname='osa12-02_tuotantokaudet'>

Tee funktio `jarjesta_tuotantokausien_mukaan(alkiot: list)`. Funktio saa parametrina listan sanakirjoja, jotka edustavat yksittäisiä TV-sarjoja, ja järjestää ne tuotantokausien lukumäärän mukaiseen kasvavaan järjestykseen. Funktio ei muuta parametrina olevaa listaa, vaan palauttaa uuden listan.

Funktio toimii seuraavasti:

```python
sarjat = [{ "nimi": "Dexter", "pisteet" : 8.6, "kausia":9 }, { "nimi": "Friends", "pisteet" : 8.9, "kausia":10 },  { "nimi": "Simpsons", "pisteet" : 8.7, "kausia":32 }  ]

for sarja in jarjesta_tuotantokausien_mukaan(sarjat):
    print(f"{sarja['nimi']}  {sarja['kausia']} tuotantokautta")
```

<sample-output>
Dexter 9 tuotantokautta
Friends 10 tuotantokautta
Simpsons 32 tuotantokautta

</sample-output>

</programming-exercise>

<programming-exercise name='Järjestys pisteiden mukaan' tmcname='osa12-03_pisteiden_mukaan'>

Tee funktio `jarjesta_pisteiden_mukaan(alkiot: list)`. Funktio saa parametrina listan sanakirjoja, jotka edustavat yksittäisiä TV-sarjoja, ja järjestää ne _pisteiden mukaiseen laskevaan järjestykseen_.  Funktio ei muuta parametrina olevaa listaa, vaan palauttaa uuden listan.

```python
sarjat = [{ "nimi": "Dexter", "pisteet" : 8.6, "kausia":9 }, { "nimi": "Friends", "pisteet" : 8.9, "kausia":10 },  { "nimi": "Simpsons", "pisteet" : 8.7, "kausia":32 }  ]

print´("IMDB:n mukainen pistemäärä")
for sarja in jarjesta_pisteiden_mukaan(tuotteet):
    print(f"{sarja['nimi']}  {sarja['pisteet']}")
```

<sample-output>
IMDB:n mukainen pistemäärä
Friends 8.9
Simpsons 8.7
Dexter 8.6

</sample-output>

</programming-exercise>

## Omien olioiden alkioiden järjestäminen

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

<programming-exercise name='Kiipeilyreitti' tmcname='osa12-04_kiipeilyreitti'>

Tehtäväpohjan mukana tulee valmis luokka `Kiipeilyreitti`, jota käytetään seuraavasti:

```python
reitti1 = Kiipeilyreitti("Kantti", 38, "6A+")
reitti2 = Kiipeilyreitti("Smooth operator", 9, "7A")
reitti3 = Kiipeilyreitti("Syncro", 14, "8C+")


print(reitti1)
print(reitti2)
print(reitti3.nimi, reitti3.pituus, reitti3.grade)
```

<sample-output>

Kantti, pituus 38 metriä, grade 6A+
Smooth operator, pituus 9 metriä, grade 7A
Syncro 14 8B+

</sample-output>

## Pituuden mukainen järjestys

Tee funktio `pituuden_mukaan(reitit: list)` joka palauttaa kiipeilyreitit pituuden mukaan käänteisessä järjestyksessä.

Funktio toimii seuraavasti:

```python
r1 = Kiipeilyreitti("Kantti", 38, "6A+")
r2 = Kiipeilyreitti("Smooth operator", 11, "7A")
r3 = Kiipeilyreitti("Syncro", 14, "8C+")
r4 = Kiipeilyreitti("Pieniä askelia", 12, "6A+")

reitit = [r1, r2, r3, r4]

for reitti in pituuden_mukaan(reitit):
    print(reitti)
```

<sample-output>

Kantti, pituus 38 metriä, grade 6A+
Syncro, pituus 14 metriä, grade 8C+
Pieniä askelia, pituus 12 metriä, grade 6A+
Smooth operator, pituus 9 metriä, grade 7A

</sample-output>

## Vaikeuden mukainen järjestys

Tee funktio `vaikeuden_mukaan(reitit: list)` joka palauttaa kiipeilyreitit vaikeuden (eli graden) mukaan laskevassa järjestyksessä. Jos reittien vaikeus on sama, ratkaisee pituus vaikeuden. Pidempi on vaikeampi. Kiipeilyreittien vaikeusasteikko on _4, 4+, 5, 5+, 6A, 6A+, ..._ eli käytännössä se seuraa aakkosjärjestystä.

Funktio toimii seuraavasti:

```python
r1 = Kiipeilyreitti("Kantti", 38, "6A+")
r2 = Kiipeilyreitti("Smooth operator", 11, "7A")
r3 = Kiipeilyreitti("Syncro", 14, "8C+")
r4 = Kiipeilyreitti("Pieniä askelia", 12, "6A+")

reitit = [r1, r2, r3, r4]
for reitti in vaikeuden_mukaan(reitit):
    print(reitti)
```

<sample-output>

Syncro, pituus 14 metriä, grade 8C+
Smooth operator, pituus 11 metriä, grade 7A
Kantti, pituus 38 metriä, grade 6A+
Pieniä askelia, pituus 12 metriä, grade 6A+

</sample-output>

*Vihje* jos järjestysperusteena on lista tai tuple, järjestetään ensisijaiseti ensimmäisen alkion mukaan, toissijaisesti toisen:

```python
lista = [("a", 4),("a", 2),("b", 30), ("b", 0) ]
print(sorted(lista))
```

<sample-output>

[('a', 2), ('a', 4), ('b', 0), ('b', 30)]

</sample-output>

</programming-exercise>

<programming-exercise name='Kiipeilykalliot' tmcname='osa12-05_kiipeilykalliot/'>

Tehtäväpohjasta löytyy luokan `Kiipeilyreitti` lisäksi luokka `Kiipeilykallio`.

```python
k1 = Kiipeilykallio("Olhava")
k1.lisaa_reitti(Kiipeilyreitti("Kantti", 38, "6A+"))
k1.lisaa_reitti(Kiipeilyreitti("Suuri leikkaus", 36, "6B"))
k1.lisaa_reitti(Kiipeilyreitti("Ruotsalaisten reitti", 42, "5+"))

k2 = Kiipeilykallio("Nummi")
k2.lisaa_reitti(Kiipeilyreitti("Syncro", 14, "8C+"))

k3 = Kiipeilykallio("Nalkkilan släbi")
k3.lisaa_reitti(Kiipeilyreitti("Pieniä askelia", 12, "6A+"))
k3.lisaa_reitti(Kiipeilyreitti("Smooth operator", 11, "7A"))
k3.lisaa_reitti(Kiipeilyreitti("Possu ei pidä", 12 , "6B+"))
k3.lisaa_reitti(Kiipeilyreitti("Hedelmätarha", 8, "6A"))

print(k1)
print(k3.nimi, k3.reitteja())
print(k3.vaikein_reitti())
```

<sample-output>

Olhava, 3 reittiä, vaikein 6B
Nalkkilan slabi 4
Smooth operator, pituus 9 metriä, grade 7A

</sample-output>

## Reittien määrän mukaan

Tee funktio `reittien_maaran_mukaan`, joka järjestää kiipeilykalliot reittien määrän mukaiseen kasvavaan suuruusjärjestykseen.

```python
# k1, k2 ja k3 määritelty kuten edellä
kalliot = [k1, k2, k3]
for kallio in reittien_maaran_mukaan(kalliot):
    print(kallio)

```

<sample-output>

Nummi, 1 reittiä, vaikein 8C+
Olhava, 3 reittiä, vaikein 6B
Nalkkilan slabi, 4 reittiä, vaikein 7A

</sample-output>

## Vaikeimman reitin mukaan

Tee funktio `vaikeimman_reitin_mukaan`, joka järjestää kiipeilykalliot kalliolta löytyvän vaikeimman reitin mukaiseen _laskevaan_ suuruusjärjestykseen.

```python
# k1, k2 ja k3 määritelty kuten edellä
kalliot = [k1, k2, k3]
for kallio in vaikeimman_reitin_mukaan(kalliot):
    print(kallio)

```

<sample-output>

Nummi, 1 reittiä, vaikein 8C+
Nalkkilan slabi, 4 reittiä, vaikein 7A
Olhava, 3 reittiä, vaikein 6B

</sample-output>

</programming-exercise>

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

...paitsi että lambda-lauseketta käytettäessä funktiolle ei anneta nimeä. Tämän takia muodostettavaa funktiota kutsutaan anonyymiksi funktioksi.

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
    l3 = Levy("Joshua Tree", "U2", 1986, 50)

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

<programming-exercise name='Palloilijat' tmcname='osa12-06_palloilijat'>

Tehtäväpohjasta löytyy luokka Palloilija, jolla on seuraavat julkiset piirteet:

* nimi
* pelinumero
* tehtyjen maalien määrä `maalit`
* annettujen syöttöjen määrä `syotot`
* peliminuuttien määärä `minuutit`

Kirjoita seuraavien tehtävänantojen mukaiset funktiot

Huomaa, että jokaisessa funktiossa palautetaan erityyppiset tiedot!

## Eniten maaleja

Kirjoita funktio `eniten_maaleja`, joka saa parametrikseen listan palloilijoita.

Funktio palauttaa merkkijonona sen pelaajan _nimen_, joka on tehnyt eniten maaleja.

## Eniten pisteitä

Kirjoita funktio `eniten_pisteita`, joka saa parametrikseen listan palloilijoita.

Funktio palauttaa _tuplena_ sen pelaajan nimen ja pelinumeron, joka on tehnyt yhteensä eniten pisteitä. Pisteisiin lasketaan siis sekä maalit että syötöt.

## Vähiten peliminuuttjea

Kirjoita funktio `vahiten_minuutteja`, joka sa parametrikseen listan palloilijoita.

Funktio palauttaa sen _Palloilija-olion_, jolla on vähiten peliminuutteja kaikista pelaajista.


</programming-exercise>

## Funktiot parametreina omissa funktioissa

Pythonissa on siis mahdollista välittää viittaus johonkin funktioon toiselle funktiolle. Tarkastellaan vielä esimerkkinä omaa funktiota, joka saa parametrikseen toisen funktion:

```python
# tyyppivihje callable viittaa funktioon
def suorita_operaatio(operaatio: callable):
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

<programming-exercise name='Tuotteiden haku' tmcname='osa12-07_tuotteiden_haku'>

Tässä tehtävässä käsitellään tupleina esitettäviä tuotteita, jotka on esimerkeissä alustettu muuttujaan `tuotteet` seuraavasti:

```python
tuotteet = [("banaani", 5.95, 12), ("omena", 3.95, 3), ("appelsiini", 4.50, 2), ("vesimeloni", 4.95, 22), ("Kaali", 0.99, 1)]
```

Jokaisessa tuplessa ensimmäinen alkio siis edustaa nimeä, seuraava hintaa ja kolmas määrää.

Toteuta funktio `hae(tuotteet: list, kriteeri: callable)`, missä toisena parametrina on funktio, joka saa parametriksi yhden tuotetta edustavan tuplen ja palauttaa totuusarvon. Funktio palauttaa listassa parametrina annetuista tuotteista ne, jotka toteuttavat kriteerin.

Sopiva kriteeri voisi olla esimerkiksi seuraavanlainen

```python
def hinta_alle_4_euroa(tuote):
    return tuote[1] < 4
```

Funktio siis palauttaa _True_ jos tuotteen hinta on alle 4 euroa.

Funktio `haku` toimii seuraavasti:

```python
for tuote in hae(tuotteet, hinta_alle_4_euroa):
    print(tuote)
```

<sample-output>

('omena', 3.95, 3)
('kaali', 0.99, 1)

</sample-output>

Kriteerifunktion voi myös määritellä lambda-funktiona. Seuraava käyttää funktiota `haku` etsimään tuotteet, joita on vähintään 11 kappaletta:

```python
for tuote in hae(tuotteet, lambda t: t[2]>10):
    print(tuote)
```

<sample-output>

('banaani', 5.95, 12)
('vesimeloni', 4.95, 22)

</sample-output>

</programming-exercise>

