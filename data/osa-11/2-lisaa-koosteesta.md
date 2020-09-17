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

Huomaa, että lopputuloksena on siis lista. Jos halutaan muodostaa merkkijonon perusteella uusi merkkijono, voidaan hyödyntää aikaisemmin esiteltyä `join`-metodia. Metodin avulla voidaan yhdistää listan alkiot merkkijonoksi. Metodi kohdistuu välimerkkiin, jolla alkiot yhdistetään.

Metodi toimii siis esimerkiksi näin

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

Toisessa esimerkissä luokka Juoksumatka mallintaa yhtä juoksumatkaa nimineen ja pituuksineen. Nyt koosteen avulla luodaan lista Juoksumatka-olioita annettujen pituuksien mukaaan.

Huomaa, että Juoksumatka-luokan konstruktorissa parametrilla `nimi` on oletusarvo, eikä sitä olioita luodessa esimerkissä erikseen annetakaan:

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
        # laskuri iteraattoria varten
        self.__laskuri = 0

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

    # Luodaan lista, jossa kaikkien kirjailijoiden nimet
    kirjojen_nimet = [kirja.nimi for kirja in hylly]
    print(kirjojen_nimet)

```

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
