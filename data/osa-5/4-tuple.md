---
path: '/osa-5/4-tuple'
title: 'Tuple eli monikko'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Ohjelmoinnissa olisi usein tärkeää yhdistää useita arvoja toisiinsa - esimerkiksi pisteen X- ja Y-koordinaatit olisi kätevää yhdistää samaan rakenteeseen. Tätä tarkoitusta varten Pythonissa on tietorakenne nimeltä tuple.

Tämän osion suoritettuasi

- Tiedät mikä on _tuple_ eli monikko Pythonissa
- Osaat muodostaa tuplen erityyppisistä arvoista
- Tiedät, mitä eroa on tuplella ja listalla
- Tiedät esimerkkejä tyypillisistä tavoista käyttää tuplea

</text-box>

Usein olisi näppärää pystyä yhdistämään arvoja jotenkin toisiinsa. Mikäli toisiinsa liittyviä arvoja tallennetaan esimerkiksi kahdelle erilliselle listalle, seuraa listojen uudelleenjärjestelystä (tai alkioiden poistosta tms.) ongelmia. Tarkastellaan aluksi esimerkkiä tästä:

```python

# Listat nimiä ja ikiä varten
nimet = []
iät = []

while True:
    nimi = input("Anna nimi, tyhjä lopettaa: ")
    if (nimi == ""):
        break
    ikä = int(input("Anna ikä: "))

    # Lisätään listoille
    nimet.append(nimi)
    iät.append(ikä)

# Järjestetään molemmat...
nimet.sort()
iät.sort()

# Nyt nimet ja iät eivät enää ole samassa järjetyksessä:
print(nimet)
print(iät)

```

<sample-output>

Anna nimi, tyhjä lopettaa: Petri
Anna ikä: 23
Anna nimi, tyhjä lopettaa: Pekka
Anna ikä: 34
Anna nimi, tyhjä lopettaa: Paula
Anna ikä: 51
Anna nimi, tyhjä lopettaa:
['Paula', 'Pekka', 'Petri']
[23, 34, 51]

</sample-output>

Koska kahteen erilliseen listan tallennetuilla alkiolla ei ole toisiinsa minkäänlaista luonnollista yhteyttä, ei listojen järjestämisen jälkeen ole mitään keinoa selvittää mitkä alkiot kuuluvat yhteen.

Ongelman voisi toki ratkaista käyttämällä sisäkkäisiä listoja, mutta Pythonissa on tähän paremmin soveltuva ratkaisu: tietorakenne _tuple_ eli _monikko_.

## Tuple eli monikko

Tietorakenteena _tuple_ muistuttaa huomattavasti listaa. Suurimmat erot syntaksin kannalta ovat, että

* tuplea merkittäessä käytetään sulkeita, listaa merkittäessä hakasulkeita
* tuple on _mutatoitumaton_, kun listan sisältö taas voi muuttua

Esimerkiksi kahdesta kokonaisluvusta muodostuvan koordinaattiparin sisältävän tuplen voisi luoda vaikka näin:

```python

koordinaatit = (10, 20)

```

Tuplen sisältämiin alkioihin viitataan samoin kuin listankin alkioihin, eli hakasulkunotaatiolla:

```python

koordinaatit = (10,20)

print("Eka koordinaatti: " + str(koordinaatit[0]))
print("Toka koordinaatti: " + str(koordinaatit[1]))

```

<sample-output>

Eka koordinaatti: 10
Toka koordinaatti: 20

</sample-output>

# Tuple on arvojen muodostama ryhmä

Tuplen (eli monikon) ideana on sitoa toisiinsa kuuluvia arvoja yhteen. Tarkastellaan miten osan alussa esitelty nimiä ja ikiä tallentava ohjelma voitaisiin kirjoittaa käyttäen tupleja:

```python

# Lista henkilöitä varten
henkilöt = []

while True:
    nimi = input("Anna nimi, tyhjä lopettaa: ")
    if (nimi == ""):
        break
    ikä = int(input("Anna ikä: "))

    # Luodaan tuple...
    henkilö = (nimi, ikä)

    # ...ja lisätään listalle
    henkilöt.append(henkilö)

# Järjestetään lista
henkilöt.sort()

# Nimet ja iät ovat edelleen kytkettyinä toisiinsa
print(henkilöt)

```

<sample-output>

[('Paula', 51), ('Pekka', 34), ('Petri', 23)]

</sample-output>



## Tuplet ovat mutatoitumattomia

Koska tuplet ovat mutatoitumattomia, ei niihin voi lisätä alkioita eikä niistä voi poistaa alkioita. Tämä ei yleensä ole ongelma, koska tuplejen rakenteen ei ole tarkoituskaan muuttua. Tuplen alkioiden arvoja ei kuitenkaan voi muuttaa, mikä saattaisi esimerkiksi henkilöitä tallentaessa olla ongelma - sekä ihmisen ikä että nimi voivat muuttua.

Ratkaisuna on ylikirjoittaa tuple toisella tuplella, jossa arvot ovat muuttuneet. Seuraavassa esimerkissä funktio `vanhenna` saa parametrikseen tuplen, johon on tallennettu henkilön nimi ja ikä. Funktio palauttaa uuden tuplen, jossa on kasvatettu henkilön ikaa yhdellä vuodella.

```python

def vanhenna(henkilö: tuple) -> tuple:
    nimi = henkilö[0]
    ikä = henkilö[1]

    # Kasvata ikää
    ikä = ikä + 1

    # palauta uusi tuple
    return (nimi, ikä)

# Testataan
hlö = ("Pekka", 23)

hlö = vanhenna(hlö)

print("Nimi: " + hlö[0] + ", ikä: " + str(hlö[1]))

```

<sample-output>

Nimi: Pekka, ikä: 24

</sample-output>

Tarkastellaan toisena esimerkkinä funktiota, joka saa parametrikseen listan koordinaatteja. Funktio siirtää kaikkia koordinaatteja yhden pykälän oikealle (eli lisää X-koordinaattiin arvon yksi):

```python

def siirrä_oikealle(koordinaatit: list):
    for i in range(len(koordinaatit)):
        koordinaatit[i] = (koordinaatit[i][0] + 1, koordinaatit[i][1])

# Testataan
k = [(1,4), (-2, 3), (0,0)]
siirrä_oikealle(k)
print(k)


```

<sample-output>

[(2, 4), (-1, 3), (1, 0)]

</sample-output>

Esimerkissä for-silmukan sisällä tapahtuva operaatio muistuttaa matriiseille tehtyjä operaatioita. Listan i arvon paikalle muodostetaan uusi tuple hyödyntämällä vanhan tuplen arvoja muuten, mutta indeksin 0 paikalla olevaa arvoa kasvatetaan yhdellä. Funktion voisi kirjoittaa myös helppolukuisempana:

```python

def siirrä_oikealle(koordinaatit: list):
    for i in range(len(koordinaatit)):
        x = koordinaatit[i][0]
        y = koordinaatit[i][1]
        x = x + 1
        koordinaatit[i] = (x, y)

```


