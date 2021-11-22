---
path: '/part-11/2-lisaa-koosteesta'
title: 'Lisää koosteesta'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, miten koosteita voidaan hyödyntää merkkijonojen kanssa
- Osaat käyttää omia olioita koosteissa
- Osaat muodostaa myös sanakirjakoosteita

</text-box>


Koska koosteen lähteenä voi olla mikä tahansa sarja, voidaan sitä soveltaa myös merkkijonojen käsittelyyn. Merkkijonon läpikäynnissä poimitaan merkit yksitellen jonosta, suoritetaan nille annettu lauseke ja tallennetaan lopputulos uuden listan alkioksi.

Esimerkiksi

```python

nimi = "Pekka Python"

isot_kirjaimet = [merkki.upper() for merkki in nimi]
print(isot_kirjaimet)

```

<sample-output>

['P', 'E', 'K', 'K', 'A', ' ', 'P', 'Y', 'T', 'H', 'O', 'N']

</sample-output>

Huomaa, että lopputuloksena on lista. Jos halutaan muodostaa merkkijonon perusteella uusi merkkijono, voidaan hyödyntää aikaisemmin esiteltyä `join`-metodia. Metodin avulla voidaan yhdistää listan alkiot merkkijonoksi. Metodi kohdistuu välimerkkiin, jolla alkiot yhdistetään.

Metodi toimii siis esimerkiksi näin:

```python

nimi = "Pekka"
lista = list(nimi)
print(lista)

print("".join(lista))
print(" ".join(lista))
print(",".join(lista))
print(" ja ".join(lista))

```

<sample-output>

['P', 'e', 'k', 'k', 'a']
Pekka
P e k k a
P,e,k,k,a
P ja e ja k ja k ja a

</sample-output>

Kun yhdistetään `join`-metodin koosteeseen, voidaan muodostaa merkkijonosta uusi merkkijono helposti. Tarkastellaan esimerkkiä `join`-metodin ja koosteen yhdistelmästä, joka muodostaa alkuperäisen merkkijonon pohjalta uuden merkkijonon, jossa on ainoastaan vokaalit:

```python

testijono = "Heippa vaan kaikki, tämä on testi"

vokaalit = [merkki for merkki in testijono if merkki in "aeiouyåäö"]
uusijono = "".join(vokaalit)

print(uusijono)

```

<sample-output>

eiaaaaiiääoei

</sample-output>

Esimerkissä on selkeyden vuoksi jaettu kooste ja `join`-metodin kutsu omille riveilleen, mutta toki ne voi kirjoittaa myös yhdeksi lausekkeeksi:

```python

testijono = "Heippa vaan kaikki, tämä on testi"

vokaalijono = "".join([merkki for merkki in testijono if merkki in "aeiouyåäö"])

print(vokaalijono)

```

Hyödyntämällä samassa yhteydessä vielä `split`-metodia, voidaan käsitellä esimerkiksi kokonaisia lauseita tehokkaasti yhdellä lausekkeella. Esimerkissä poistetaan lauseen jokaisesta sanasta ensimmäinen kirjain:

```python

lause = "Vesihiisi se kuulkaa vaan sihisi hississä"

lause_ilman_alkuja = " ".join([sana[1:] for sana in lause.split()])
print(lause_ilman_alkuja)

```

<sample-output>

esihiisi e uulkaa aan ihisi ississä

</sample-output>

Käydään läpi tarkemmin mitä koko lausekkeessa tapahtuu:

`sana[1:]` ottaa osajonon sanasta alkaen toisesta merkistä (eli indeksistä 1)
`lause.split()` purkaa merkkijonon listaksi annetun välimerkin kohdalta. Kun välimerkkiä ei ole määritelty, käytetään oletuksena tyhjiä välejä
`" ".join()` yhdistää listan palaset uudeksi jonoksi käyttäen välilyöntiä palojen välissä.

Sama esimerkki perinteisemmällä tavalla näyttäisi esimerkiksi tältä:

```python

lause = "Vesihiisi se kuulkaa vaan sihisi hississä"

word_list = []
sanat = lause.split()
for sana in sanat:
    sana_ilman_alkua = sana[1:]
    word_list.append(sana_ilman_alkua)

lause_ilman_alkuja = " ".join(word_list)


print(lause_ilman_alkuja)

```

<programming-exercise name='Filter forbidden' tmcname='part11-08_filter_forbidden'>

Tee funktio `filter_forbidden(string: str, forbidden: str)` joka palauttaa sen parametrina olevasta merkkijonosta version, joka ei sisällä yhtään merkkiä sen toisena parametrina olevasta "kiellettyjen merkkien" merkkijonosta.

Funktion tulee käyttää listakoostetta. Funktio saa sisältää `def`-rivi mukaanlukien maksimissaan 3 riviä.

Esimerkki funktion käytöstä

```python
lause = "Suo! kuokka, ja python: hieno yhdistelmä!??!?!"
suodatettu = filter_forbidden(lause, "!?:,.")
print(suodatettu)
```

<sample-output>

Suo kuokka ja python hieno yhdistelmä

</sample-output>

</programming-exercise>

## Omat oliot koosteissa

Joskus omia olioita on näppärä käsitellä tai muodostaa koosteiden avulla. Tarkastellaan seuraavaksi muutamaa esimerkkiä tähän liittyen.

Ensimmäisessä esimerkissä luokka Maa mallintaa yhtää maata asukaslukuineen. Koosteessa poimitaan listalta kaikkien sellaisten maiden nimet, joiden asukasluku on suurempi kuin 5 miljoonaa.

```python

class Maa:
    """ Luokka mallintaa yhtä maata asukaslukuineen """
    def __init__(self, nimi: str, asukasluku: int):
        self.nimi = nimi
        self.asukasluku = asukasluku

if __name__ == "__main__":
    suomi = Maa("Suomi", 6000000)
    malta = Maa("Malta", 500000)
    ruotsi = Maa("Ruotsi", 10000000)
    islanti = Maa("Islanti", 350000)

    maat = [suomi, malta, ruotsi, islanti]

    isommat_maat = [maa.nimi for maa in maat if maa.asukasluku > 5000000]
    for maa in isommat_maat:
        print(maa)


```

<sample-output>

Suomi
Ruotsi

</sample-output>

Toinen vaihtoehto olisi luoda lista maa-olioista ja tulostaa sen jälkeen nimet. Tämä vaihtoehto olisi järkevämpi, jos maita tarvittaisiin vielä myöhemminkin (tai mikäli haluttaisiin esimerkiksi tarkemmin tarkastella maiden asukaslukuja silmukassa):

```python

if __name__ == "__main__":
    suomi = Maa("Suomi", 6000000)
    malta = Maa("Malta", 500000)
    ruotsi = Maa("Ruotsi", 10000000)
    islanti = Maa("Islanti", 350000)

    maat = [suomi, malta, ruotsi, islanti]

    isommat_maat = [maa for maa in maat if maa.asukasluku > 5000000]
    for maa in isommat_maat:
        print(maa.nimi)
```

Toisessa esimerkissä luokka `Juoksumatka` mallintaa yhtä juoksumatkaa nimineen ja pituuksineen. Nyt koosteen avulla luodaan lista `Juoksumatka`-olioita annettujen pituuksien mukaaan.

Huomaa, että `Juoksumatka`-luokan konstruktorissa parametrilla `nimi` on oletusarvo, eikä sitä olioita luodessa esimerkissä erikseen annetakaan:

```python

class Juoksumatka:
    """ Luokka mallintaa yhtä n metrin pituista juoksumatkaa """
    def __init__(self, matka:int, nimi:str = "ei nimeä"):
        self.matka = matka
        self.nimi = nimi

    def __repr__(self):
        return f"{self.matka} m. ({self.nimi})"

if __name__ == "__main__":
    lengths = [100, 200, 1500, 3000, 42195]
    matkat = [Juoksumatka(pituus) for pituus in lengths]

    # tulostetaan kaikki
    print(matkat)

    # Poimitaan yksi listasta ja nimetään se
    maraton = matkat[-1] # viimeisenä listassa
    maraton.nimi = "Maraton"

    # Tulostetaan vielä uudella nimellä
    print(matkat)

```

<sample-output>

[100 m. (ei nimeä), 200 m. (ei nimeä), 1500 m. (ei nimeä), 3000 m. (ei nimeä), 42195 m. (ei nimeä)]
[100 m. (ei nimeä), 200 m. (ei nimeä), 1500 m. (ei nimeä), 3000 m. (ei nimeä), 42195 m. (Maraton)]

</sample-output>

Jos oma luokka on viime kerran esimerkin mukaisesti iteroitava, voidaan sitä käyttää lähteenä listakoosteessa:

```python

class Kirja:
    def __init__(self, nimi: str, kirjailija: str, sivuja: int):
        self.nimi = nimi
        self.kirjailija = kirjailija
        self.sivuja = sivuja

class Kirjahylly:
    def __init__(self):
        self._kirjat = []

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

# Testataan
if __name__ == "__main__":
    k1 = Kirja("Elämäni Pythoniassa", "Pekka Python", 123)
    k2 = Kirja("Vanhus ja Java", "Ernest Hemingjava", 204)
    k3 = Kirja("C-itsemän veljestä", "Keijo Koodari", 997)

    hylly = Kirjahylly()
    hylly.lisaa_kirja(k1)
    hylly.lisaa_kirja(k2)
    hylly.lisaa_kirja(k3)

    # Luodaan lista, jossa kaikkien kirjojen nimet
    kirjojen_nimet = [kirja.nimi for kirja in hylly]
    print(kirjojen_nimet)

```

<programming-exercise name='Products in shopping list' tmcname='part11-09_products_in_shopping_list'>

Osan 10 tehtävässä teimme [Kauppalista-luokasta iteroitavan](/osa-10/3-olio-ohjelmoinnin-tekniikoita#programming-exercise-iteroitava-kauppalista). Iteroitavan luokan oliota voidaan käyttää listakoosteiden yhteydessä. Tehtäväpohjassa on mukana luokasta typistetty versio, jonka toiminnallisuus riittää tähän tehtävään.

Tee nyt funktio `products(shopping_list, amount: int)` joka saa parametriksi kauppalista-olion. Funktio palauttaa kauppalistan ostoksista niiden tuotteiden nimet, joita on listalla vähintään parametrin `maara` verran.

Funktio tulee toteuttaa listakoosteen avulla, ja sen pituus saa olla `def`-määrittelyriveineen yhteensä korkeintaan kaksi riviä. Luokan Kauppalista koodia ei saa muuttaa!

Funktio toimii seuraavasti

```python
lista = Kauppalista()
lista.lisaa("banaanit", 10)
lista.lisaa("omenat", 5)
lista.lisaa("alkoholiton olut", 24)
lista.lisaa("ananas", 1)

print("kauppalistalla vähintään 8 seuraavia tuotteita:")
for tuote in kauppalistan_tuotteet(lista, 8):
    print(tuote)
```

<sample-output>

kauppalistalla vähintään 8 seuraavia tuotteita:
banaanit
alkoholiton olut

</sample-output>

</programming-exercise>

<programming-exercise name='Price difference of cheaper properties' tmcname='part11-10_cheaper_properties'>

This exercise is a slightly modified version of the exercise [Comparing properties](/part-9/1-objects-and-references#programming-exercise-comparing-properties) from part 9.

Please write a function named `cheaper_properties(properties: list, reference: RealProperty)` which takes a list of properties and a single RealProperty object as its arguments. The function should return a list containing only those properties in the original list which are cheaper, along with the price difference when compared to the reference property. The items in the returned list should be tuples, where the first item is the property itself and the second is the difference in price.

The function should be implemented using list comprehensions. The length of the function, measured in lines of code, should be 2, including the header line beginning with the `def` keyword.

The code for the `RealProperty` class is included in the exercise template and should not be changed.

An example of the function in action:

```python
a1 = RealProperty(1, 16, 5500, "Central studio")
a2 = RealProperty(2, 38, 4200, "Two bedrooms downtown")
a3 = RealProperty(3, 78, 2500, "Three bedrooms in the suburbs")
a4 = RealProperty(6, 215, 500, "Farm in the middle of nowhere")
a5 = RealProperty(4, 105, 1700, "Loft in a small town")
a6 = RealProperty(25, 1200, 2500, "Countryside mansion")

properties = [a1, a2, a3, a4, a5, a6]

print(f"cheaper options when compared to {a3.description}:")
for item in cheaper_properties(properties, a3):
    print(f"{item[0].description:30} price difference {item[1]} euros")
```

<sample-output>

cheaper options when compared to Three bedrooms in the suburbs:
Central studio                price difference 107000 euros
Two bedrooms downtown         price difference 35400 euros
Farm in the middle of nowhere price difference 87500 euros
Loft in a small town          price difference 16500 euros

</sample-output>

</programming-exercise>

## Koosteet sanakirjan kanssa

Koosteet toimivat samalla tavalla myös sanakirjan kanssa: jos vaihdetaan hakasulkeet aaltosulkeiksi, syntyy koosteen seurauksena listan sijasta sanakirja. Koska sanakirjan alkio muodostuu kahdesta komponentista - arvosta ja alkiosta, tule molemmat komponentit antaa myös koostetta luodessa.

Lähteenä voidaan edelleen käyttää mitä tahansa sarjaa, eli esimerkiksi listaa, merkkijonoa, tuplea, sanakirjaa tai omaa iteroinnin toteuttavaa luokkaa.

Esimerkki, joka luo merkkijonon pohjalta sanakirjan, joka sisältää kaikki merkkijonon kirjaimet ja niiden esiintymämäärät:

```python

lause = "Hei kaikki"

merkkimäärät = {kirjain : lause.count(kirjain) for kirjain in lause}
print(merkkimäärät)

```

<sample-output>

{'H': 1, 'e': 1, 'i': 3, ' ': 1, 'k': 3, 'a': 1}

</sample-output>

Periaate on siis täsmälleen sama, mutta yksittäisen arvon sijasta annetaan erikseen avain ja arvo. Yleisesti merkittynä siis:

`{<avainlauseke> : <arvolauseke> for <alkio> in <sarja>}`

Tarkastellaan vielä toisena esimerkkinä ohjelmaa, joka laskee kaikkien listalla olevien positiivisten lukujen kertomat, mutta tällä kertaa sanakirjaan. Luku toimii avaimena ja kertoma arvona:

```python

def kertoma(n: int):
    """ Funktio laskee positiivisen luvun n kertoman n! """
    k = 1
    while n >= 2:
        k *= n
        n -= 1
    return k

if __name__ == "__main__":
    lista = [-2, 3, 2, 1, 4, -10, 5, 1, 6]
    kertomat = {luku : kertoma(luku) for luku in lista if luku > 0}
    print(kertomat)

```

<sample-output>

{3: 6, 2: 2, 1: 1, 4: 24, 5: 120, 6: 720}

</sample-output>

<programming-exercise name='Lengths of strings' tmcname='part11-11_lengths_of_strings'>

Please write a function named `lengths(strings: list)` which takes a list of strings as its argument. The function should return a _dictionary_ with the strings in the list as the keys and their lengths as the values attached to each key.

The function should be implemented with dictionary comprehension techniques. The length of the function, including the header line beginning with the `def` keyword, should be 2.

The function should work as follows:

```python
word_list = ["once", "upon" , "a", "time", "in"]

word_lengths = lengths(word_list)
print(word_lengths)
```

<sample-output>

{'once': 4, 'upon': 4, 'a': 1, 'time': 4, 'in': 2}

</sample-output>


</programming-exercise>

<programming-exercise name='Most common words' tmcname='part11-12_most_common_words'>

Please write a function named `most_common_words(filename: str, lower_limit: int)` which takes a filename and an integer value for a lower limit as its arguments. The function should return a dictionary containing the occurrences of the words which appear at least the number of times specified in the `lower_limit` parameter.

For example, say the function was used to process the contents of the file named _comprehensions.txt_ with the following contents:

```txt
List comprehension is an elegant way to define and create lists based on existing lists.
List comprehension is generally more compact and faster than normal functions and loops for creating list.
However, we should avoid writing very long list comprehensions in one line to ensure that code is user-friendly.
Remember, every list comprehension can be rewritten in for loop, but every for loop can’t be rewritten in the form of list comprehension.
```

When the function is called with the arguments `most_common_words("comprehensions.txt", 3)` it should return

<sample-output>

{'comprehension': 4, 'is': 3, 'and': 3, 'for': 3, 'list': 4, 'in': 3}

</sample-output>

NB: the case of letters affects the results, and all inflected forms are unique words in this exercise. That is, the words `List`, `lists` and `list` are each separate words here, and only `list` has enough occurrences to make it to the returned list. All punctutation should be removed before counting up the occurrences.

It is up to you to decide how to implement this. The easiest way would likely be to make use of list and dictionary comprehensions.

</programming-exercise>
