---
path: '/osa-11/2-lisaa-koosteesta'
title: 'Lisää koosteesta'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

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

sanalista = []
sanat = lause.split()
for sana in sanat:
    sana_ilman_alkua = sana[1:]
    sanalista.append(sana_ilman_alkua)

lause_ilman_alkuja = " ".join(sanalista)


print(lause_ilman_alkuja)

```

<programming-exercise name='Suodata kielletyt' tmcname='osa11-08_suodata_kielletyt'>

Tee funktio `suodata_kielletyt(merkkijono: str, kielletyt: str)` joka palauttaa sen parametrina olevasta merkkijonosta version, joka ei sisällä yhtään merkkiä sen toisena parametrina olevasta "kiellettyjen merkkien" merkkijonosta.

Funktion tulee käyttää listakoostetta. Funktio saa sisältää `def`-rivi mukaanlukien maksimissaan 3 riviä.

Esimerkki funktion käytöstä

```python
lause = "Suo! kuokka, ja python: hieno yhdistelmä!??!?!"
suodatettu = suodata_kielletyt(lause, "!?:,.")
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
    pituudet = [100, 200, 1500, 3000, 42195]
    matkat = [Juoksumatka(pituus) for pituus in pituudet]

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

<programming-exercise name='Kauppalistan tuotteet' tmcname='osa11-09_kauppalistan_tuotteet'>

Osan 10 tehtävässä teimme [Kauppalista-luokasta iteroitavan](/osa-10/3-olio-ohjelmoinnin-tekniikoita#programming-exercise-iteroitava-kauppalista). Iteroitavan luokan oliota voidaan käyttää listakoosteiden yhteydessä. Tehtäväpohjassa on mukana luokasta typistetty versio, jonka toiminnallisuus riittää tähän tehtävään.

Tee nyt funktio `kauppalistan_tuotteet(kauppalista, maara: int)` joka saa parametriksi kauppalista-olion. Funktio palauttaa kauppalistan ostoksista niiden tuotteiden nimet, joita on listalla vähintään parametrin `maara` verran.

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

<programming-exercise name='Halvempien hintaero' tmcname='osa11-10_halvempien_hintaero'>

Osan 9 tehtävässä teimme luokan [Asunto](/osa-9/1-oliot-ja-viittaukset#programming-exercise-asuntovertailu). Tässä tehtävässä on käytössä hieman laajennettu versio luokasta.

Tee funktio `halvemmat(asunnot: list, verrattava: Asunto)`, joka saa parametriksi listan asuntoja sekä yksittäisen vertailtavan asunnon. Funktio palauttaa listan, jolla on asunnoista ne, jotka ovat hinnaltaan halvempia kuin vertailtava asunto, sekä näiden hintaeron. Palautettavan listan alkiot ovat tupleja, joiden ensimmäinen jäsen on asunto ja toisena sen hintaero vertailtavaan.

Funktio tulee toteuttaa listakoosteen avulla. Funktion maksimipituus `def`-määrittelyrivi mukaanluettuna on 2 riviä.

Luokan `Asunto` koodia ei saa muuttaa!

Funktio toimii seuraavasti

```python
a1 = Asunto(1, 16, 5500, "Eira yksiö")
a2 = Asunto(2, 38, 4200, "Kallio kaksio")
a3 = Asunto(3, 78, 2500, "Jakomäki kolmio")
a4 = Asunto(6, 215, 500, "Suomussalmi omakotitalo")
a5 = Asunto(4, 105, 1700, "Kerava 4h ja keittiö")
a6 = Asunto(25, 1200, 2500, "Haikon kartano")

asunnot = [a1, a2, a3, a4, a5, a6]

print(f"asuntoa {a3.kuvaus} halvemmat vaihtoehdot:")
for alkio in halvemmat(asunnot, a3):
    print(f"{alkio[0].kuvaus:30} hintaero {alkio[1]} euroa")
```

<sample-output>

asuntoa Jakomäki kolmio halvemmat vaihtoehdot:
Eira yksiö                     hintaero 107000 euroa
Kallio kaksio                  hintaero 35400 euroa
Suomussalmi omakotitalo        hintaero 87500 euroa
Kerava 4h ja keittiö           hintaero 16500 euroa

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

<programming-exercise name='Merkkijonojen pituudet' tmcname='osa11-11_merkkijonojen_pituudet'>

Tee funktio `pituudet(merkkijonot: list)`, joka saa parametriksi listan merkkijonoja. Funktio palauttaa _sanakirjan_, jossa avaimina on listan merkkijonot ja arvoina merkkijonojen pituudet.

Funktio tulee toteuttaa sanakirjakoosteen avulla. Funktion maksimipituus def-määrittelyrivi mukaanlukien on kaksi riviä.

Funktio toimii seuraavasti

```python
sanalista = ["suo", "kuokka" , "python", "ja", "koodari"]

sanojen_pituudet = pituudet(sanalista)
print(sanojen_pituudet)
```

<sample-output>

{'suo': 3, 'kuokka': 6, 'python': 6, 'ja': 2, 'koodari': 7}

</sample-output>


</programming-exercise>

<programming-exercise name='Yleisimmät sanat' tmcname='osa11-12_yleisimmat_sanat'>

Tee funktio `yleisimmat_sanat(tiedoston_nimi: str, raja: int)`, joka saa parametrikseen tiedoston nimen. Funktio palauttaa sanakirjan, joka sisältää tiedostossa olevien sanojen esiintymislukumäärän niiden sanojen osalta, joilla on vähintään toisen parametrin `raja` verran esiintymiä.

Esim. jos funktiolla tarkasteltaisiin tiedostoa _comprehensions.txt_ jonka sisältö on seuraava

```txt
List comprehension is an elegant way to define and create lists based on existing lists.
List comprehension is generally more compact and faster than normal functions and loops for creating list.
However, we should avoid writing very long list comprehensions in one line to ensure that code is user-friendly.
Remember, every list comprehension can be rewritten in for loop, but every for loop can’t be rewritten in the form of list comprehension.
```

Kutsuttaessa `yleisimmat_sanat("comprehensions.txt", 3)` funktion palauttama sanakirja näyttäisi seuraavalta:

<sample-output>

{'comprehension': 4, 'is': 3, 'and': 3, 'for': 3, 'list': 4, 'in': 3}

</sample-output>

Huomaa, että kirjainkoko vaikuttaa ja vain kokonaiset sanat lasketaan - sanat 'List' ja 'lists' eivät siis saa kasvattaa sanan 'list' lukumäärää. Lisäksi kaikki sanoissa olevat välimerkit tulee poistaa.

Funktion toteutustapa on vapaa, helpoimmalla pääset hyödyntämällä lista- ja sanakirjakoosteita.

</programming-exercise>
