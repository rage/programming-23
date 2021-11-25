---
path: '/part-12/1-functions-as-arguments'
title: 'Functions as arguments'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be able to sort lists according to different criteria
- You will know what a lambda expression is
- You will be able to use lambda expression with other Python functions
- You will know how a function is passed as an argument to another function

</text-box>

We are already familiar with the method `sort` and the function `sorted`, which are used to sort lists into their natural order. For numbers and strings this usually works just fine. For anything more complicated than that, however, what Python deems to be the natural order of items is not always what was intended by us as programmers.

For example, a list of tuples is, by default, sorted based on the first item of each tuple:

```python
products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

products.sort()

for product in products:
    print(product)
```

<sample-output>

('orange', 4.5)
('banana', 5.95)
('apple', 3.95)
('watermelon', 4.95)

</sample-output>

But what if we wanted to sort the list based on the price?

## Functions as arguments

A sorting method or function usually accepts an optional second argument which allows you to bypass the default sorting criteria. This second argument is a function which defines how the value of each item on the list is determined. As the list is sorted, Python calls this function when it compares the items to each other.

Let's take a look at an example:

```python
def order_by_price(item: tuple):
    # Return the price, which is the second item within the tuple
    return item[1]

if __name__ == "__main__":
    products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

    # Use the function order_by_price for sorting
    products.sort(key=order_by_price)

    for product in products:
        print(product)
```

<sample-output>

('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

Now the list is sorted based on the prices of the items, but what actually happens in the program?

The function `order_by_price` is actually pretty simple. It takes one item as its argument and returns a value for that item. More specifically, it returns the second item in the tuple, which represents the price. But then we have this line of code, where the `sort` method is called:

`products.sort(key=order_by_price)`

Here the `sort` method is called with a function as its argument. This is not a reference to the return value of the function, but a reference to _the function itself_. The `sort` method calls this function multiple times, using each item on the list as the argument in turn.

If we include an extra print statement in the function definition of `order_by_price`, we can verify that the function does indeed get called once per each item on the list:

```python
def order_by_price(item: tuple):
    # Print the item
    print(f"Function call: order_by_price({item})")

    # Return the price, which is the second item within the tuple
    return item[1]


products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

# Use the function order_by_price for sorting
products.sort(key=order_by_price)

for product in products:
    print(product)
```

<sample-output>

Function call: order_by_price(('banana', 5.95))
Function call: order_by_price(('apple', 3.95))
Function call: order_by_price(('orange', 4.5))
Function call: order_by_price(('watermelon', 4.95))
('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

The order can be _reversed_ with another keyword argument; `reverse`, which is available with both the `sort` method and the `sorted` function:

```python
products.sort(key=order_by_price, reverse=True)

t2 = sorted(products, key=order_by_price, reverse=True)
```

## A function definition within a function definition

We could also include a named function for this new price-based sort functionality we created. Let's add a function named `sort_by_price`:

```python
def order_by_price(item: tuple):
    return item[1]

def sort_by_price(items: list):
    # use the order_by_price function here
    return sorted(items, key=order_by_price)

products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

for product in sort_by_price(products):
    print(product)
```

If we know that the helper function `order_by_price` is not used anywhere outside the `sort_by_price` function, we can place the former function definition within the latter function definition:

```python
def sort_by_price(items: list):
    # helper function defined within the function
    def order_by_price(item: tuple):
        return item[1]

    return sorted(items, key=order_by_price)
```

<programming-exercise name='Sort by remaining stock' tmcname='part12-01_remaining_stock'>

Please write a function named `sort_by_remaining_stock(items: list)`. The function takes a list of tuples as its argument. The tuples consist of the name, price and remaining stock of a product. The function should return a new list where the items are sorted according to the stock remaining, lowest value first. The original list should not be changed.

The function should work as follows:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22)]

for product in sort_by_remaining_stock(products):
    print(f"{product[0]} {product[2]} pcs")
```

<sample-output>
orange 2 pcs
apple 3 pcs
banana 12 pcs
watermelon 22 pcs

</sample-output>

</programming-exercise>

<programming-exercise name='Sort by number of seasons' tmcname='part12-02_seasons'>

Please write a function named `sort_by_seasons(items: list)` which takes a list of dictionaries as its argument. Each dictionary contains the information of a single TV show. The function should sort this list by the number of seasons each show has, in ascending order. The function should not change the original list, but return a new list instead.

The function should work as follows:

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

for show in sort_by_seasons(shows):
    print(f"{show['name']} {show['seasons']} seasons")
```

<sample-output>
Dexter 9 seasons
Friends 10 seasons
Simpsons 32 seasons

</sample-output>

</programming-exercise>

<programming-exercise name='Sort by ratings' tmcname='part12-03_ratings'>

Please write a function named `sort_by_ratings(items: list)` which takes a list of dictionaries as its argument. The structure of the dictionaries is identical to the previous exercise. This function should sort the dictionaries in _descending order based on the shows' ratings_. The function should not change the original list, but return a new list instead.

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

print("Rating according to IMDB")
for show in sort_by_ratings(shows):
    print(f"{show['name']}  {show['rating']}")
```

<sample-output>
Rating according to IMDB
Friends 8.9
Simpsons 8.7
Dexter 8.6

</sample-output>

</programming-exercise>

## Omien olioiden itemiden järjestäminen

Kirjoitetaan samaa periaatetta hyödyntäen ohjelma, joka järjestää listan omasta `Opiskelija`-luokasta luotuja olioita kahden eri kriteerin avulla:

```python
class Opiskelija:
    """ Luokka mallintaa yhtä opiskelijaa """
    def __init__(self, name: str, tunnus: str, rating: int):
        self.name = name
        self.tunnus = tunnus
        self.rating = rating

    def __str__(self):
        return f"{self.name} ({self.tunnus}), {self.rating} op."


def tunnuksen_mukaan(item: Opiskelija):
    return item.tunnus

def pisteiden_mukaan(item: Opiskelija):
    return item.rating


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

Järjestäminen toimii niinkuin pitää. Jos olioille arvon antavia funktioita `tunnuksen_mukaan` ja `pisteiden_mukaan` ei tarvita muuten, voimme kuitenkin vielä yksinkertaistaa ohjelmaa.

<programming-exercise name='Kiipeilyreitti' tmcname='part12-04_kiipeilyreitti'>

Tehtäväpohjan mukana tulee valmis luokka `Kiipeilyreitti`, jota käytetään seuraavasti:

```python
reitti1 = Kiipeilyreitti("Kantti", 38, "6A+")
reitti2 = Kiipeilyreitti("Smooth operator", 9, "7A")
reitti3 = Kiipeilyreitti("Syncro", 14, "8C+")


print(reitti1)
print(reitti2)
print(reitti3.name, reitti3.pituus, reitti3.grade)
```

<sample-output>

Kantti, pituus 38 metriä, grade 6A+
Smooth operator, pituus 9 metriä, grade 7A
Syncro 14 8B+

</sample-output>

## Pituuden mukainen järjestys

Please write a function named `pituuden_mukaan(reitit: list)` joka palauttaa kiipeilyreitit pituuden mukaan käänteisessä järjestyksessä.

The function should work as follows:

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

Please write a function named `vaikeuden_mukaan(reitit: list)` joka palauttaa kiipeilyreitit vaikeuden (eli graden) mukaan laskevassa järjestyksessä. Jos reittien vaikeus on sama, ratkaisee pituus vaikeuden. Pidempi on vaikeampi. Kiipeilyreittien vaikeusasteikko on _4, 4+, 5, 5+, 6A, 6A+, ..._ eli käytännössä se seuraa aakkosjärjestystä.

The function should work as follows:

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

*Vihje* jos järjestysperusteena on lista tai tuple, järjestetään ensisijaiseti ensimmäisen itemn mukaan, toissijaisesti toisen:

```python
lista = [("a", 4),("a", 2),("b", 30), ("b", 0) ]
print(sorted(lista))
```

<sample-output>

[('a', 2), ('a', 4), ('b', 0), ('b', 30)]

</sample-output>

</programming-exercise>

<programming-exercise name='Kiipeilykalliot' tmcname='part12-05_kiipeilykalliot/'>

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
print(k3.name, k3.reitteja())
print(k3.vaikein_reitti())
```

<sample-output>

Olhava, 3 reittiä, vaikein 6B
Nalkkilan slabi 4
Smooth operator, pituus 9 metriä, grade 7A

</sample-output>

## Reittien määrän mukaan

Please write a function named `reittien_maaran_mukaan`, joka järjestää kiipeilykalliot reittien määrän mukaiseen kasvavaan suuruusjärjestykseen.

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

Please write a function named `vaikeimman_reitin_mukaan`, joka järjestää kiipeilykalliot kalliolta löytyvän vaikeimman reitin mukaiseen _laskevaan_ suuruusjärjestykseen.

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

Lambda-lausekkeen avulla voidaan luoda anonyymi funktio eli funktio, joka muodostetaan sillä hetkellä, kun sitä tarvitaan. Lausekkeen yleinen syntaksi on seuraava:

`lambda <parametrit> : <lauseke>`

Esimerkiksi tuplelistan järjestys onnistuisi näin käyttämällä lambda-lauseketta:

```python
products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

# Funktio luodaan "lennosta" lambda-lausekkeella:
products.sort(key=lambda item: item[1])

for product in products:
    print(product)
```

<sample-output>

('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)

</sample-output>

Lauseke

`lambda item: item[1]`

vastaa funktiomäärittelyä

```python

def hinta(item):
    return item[1]
```

paitsi että lambda-lauseketta käytettäessä funktiolle ei anneta nimeä. Tämän takia muodostettavaa funktiota kutsutaan anonyymiksi funktioksi.

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

Mennään vielä pidemmälle: yhdistämällä listakooste ja `join`-metodi lambda-lausekkeeseen voidaan esimerkiksi järjestää merkkijonot niistä löytyvien vokaalien mukaiseen järjestykseen välittämättä muista merkeistä:

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

Anonyymejä funktioita voi hyödyntää Pythonissa monien muidenkin valmiiden funktioiden yhteydessä. Esimerkiksi funktioille `min` ja `max` voidaan määritellä samalla tavalla parametri `key`, jonka perusteella miname- tai maksimiarvo valitaan.

Esimerkissä poimitaan levyistä aluksi vanhin ja sitten pisin:

```python

class Levy:
    """Luokka mallintaa yhtä äänilevyä"""
    def __init__(self, name: str, esittaja: str, vuosi: int, kesto: int):
        self.name = name
        self.esittaja = esittaja
        self.vuosi = vuosi
        self.kesto = kesto


    def __str__(self):
        return f"{self.name} ({self.esittaja}), {self.vuosi}. {self.kesto} min."

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

<programming-exercise name='Palloilijat' tmcname='part12-06_palloilijat'>

Tehtäväpohjasta löytyy luokka `Palloilija`, jolla on seuraavat julkiset piirteet:

* name
* pelinumero
* tehtyjen maalien määrä `maalit`
* annettujen syöttöjen määrä `syotot`
* peliminuuttien määärä `minuutit`

Kirjoita seuraavien tehtävänantojen mukaiset funktiot. Huomaa, että jokaisessa funktiossa palautetaan erityyppiset tiedot.

## Eniten maaleja

Kirjoita funktio `eniten_maaleja`, joka saa parametrikseen listan palloilijoita.

Funktio palauttaa merkkijonona sen pelaajan nimen, joka on tehnyt eniten maaleja.

## Eniten pisteitä

Kirjoita funktio `eniten_pisteita`, joka saa parametrikseen listan palloilijoita.

Funktio palauttaa tuplena sen pelaajan nimen ja pelinumeron, joka on tehnyt yhteensä eniten pisteitä. Pisteisiin lasketaan siis sekä maalit että syötöt.

## Vähiten peliminuuttjea

Kirjoita funktio `vahiten_minuutteja`, joka saa parametrikseen listan palloilijoita.

Funktio palauttaa sen `Palloilija`-olion, jolla on vähiten peliminuutteja kaikista pelaajista.

## Testiohjelma

Voit testata koodisi toimintaa seuraavalla ohjelmalla:

```python
if __name__ == "__main__":
    pelaaja1 = Palloilija("Kelju Kojootti", 13, 5, 12, 46)
    pelaaja2 = Palloilija("Maantiekiitäjä", 7, 2, 26, 55)
    pelaaja3 = Palloilija("Uka Naakka", 9, 1, 32, 26)
    pelaaja4 = Palloilija("Pelle Peloton", 12, 1, 11, 41)
    pelaaja5 = Palloilija("Hessu Hopo", 4, 3, 9, 12)
    
    joukkue = [pelaaja1, pelaaja2, pelaaja3, pelaaja4, pelaaja5]
    print(eniten_maaleja(joukkue))
    print(eniten_pisteita(joukkue))
    print(vahiten_minuutteja(joukkue))
```

Tulostuksen tulisi olla:

<sample-output>

Kelju Kojootti
('Uka Naakka', 9)
Palloilija(name=Hessu Hopo, pelinumero=4, maalit=3, syotot=9, minuutit=12)

</sample-output>

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

Funktion `suorita_operaatio` lopputulos siis riippuu siitä, mikä funktio sille on välitetty parametrina. Funktioksi kelpaa mikä tahansa funktio (niin `def`-lauseella määritelty kuin anonyymikin) jolla on kaksi parametria.

Vaikkei funktioiden välittäminen parametrina olekaan kaikkein yleisimmin tarvittava operaatio, on se joka tapauksessa hyödyllinen mekanismi. Esimerkiksi seuraava ohjelma kirjoittaa tiedostosta 1 halutut rivit tiedostoon 2. Rivien valintakriteeri annetaan funktiona, joka palauttaa `True`, jos rivi tulee kirjoittaa toiseen tiedostoon:

```python
def kopioi_rivit(lahde_name: str, kohde_name: str, kriteeri= lambda x: True):
    with open(lahde_name) as lahde, open(kohde_name, "w") as kohde:
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

<programming-exercise name='Tuotteiden haku' tmcname='part12-07_tuotteiden_haku'>

Tässä tehtävässä käsitellään tupleina esitettäviä tuotteita, jotka on esimerkeissä alustettu muuttujaan `products` seuraavasti:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22), ("Kaali", 0.99, 1)]
```

Jokaisessa tuplessa ensimmäinen item siis edustaa nimeä, seuraava hintaa ja kolmas määrää.

Toteuta funktio `hae(products: list, kriteeri: callable)`, missä toisena parametrina on funktio, joka saa parametriksi yhden producttta edustavan tuplen ja palauttaa totuusarvon. Funktio palauttaa listassa parametrina annetuista tuotteista ne, jotka toteuttavat kriteerin.

Sopiva kriteeri voisi olla esimerkiksi seuraavanlainen

```python
def hinta_alle_4_euroa(product):
    return product[1] < 4
```

Funktio siis palauttaa _True_ jos tuotteen hinta on alle 4 euroa.

Funktio `haku` toimii seuraavasti:

```python
for product in hae(products, hinta_alle_4_euroa):
    print(product)
```

<sample-output>

('apple', 3.95, 3)
('kaali', 0.99, 1)

</sample-output>

Kriteerifunktion voi myös määritellä lambda-funktiona. Seuraava käyttää funktiota `haku` etsimään products, joita on vähintään 11 kappaletta:

```python
for product in hae(products, lambda t: t[2]>10):
    print(product)
```

<sample-output>

('banana', 5.95, 12)
('watermelon', 4.95, 22)

</sample-output>

</programming-exercise>

