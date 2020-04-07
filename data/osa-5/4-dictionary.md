---
path: '/osa-5/4-dictionary'
title: 'Dictionary eli hajautustaulu'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Vaikka listat ovat käteviä, joissain tapauksissa kannattaa asettaa tiedon nopea haku tieorakenteesta etusijalle. Tätä tarkoitusta varten Pythonista löytyy sisäänrakennettu hajautustaulutyyppinen tietorakenne dictionary.

Tämän osion suoritettuasi

- Tiedät, mitä tarkoitetaan hajautustaululla ja mikä sen toimintaperiaate on
- Osaat käyttää Pythonin dictionary-tietorakennetta eri tyyppisten avainten ja arvojen kanssa
- Osaat pyytää kaikki taulun avaimet tai arvot kerralla
- Tunnet menetelmiä dictionary-rakenteen iterointiin

</text-box>

Lista on kätevä tietorakenne samantyyppisten alkioiden tallentamiseen. Lista ei kuitenkaan ole paras mahdollinen tietorakenne tiedon hakemisen kannalta: kun halutaan löytää listalta tietty alkio, täytyy aina käydä kaikki alkiot läpi listan alusta alkaen.

_Hajautustaulut_ (näitä kutsutaan usei myös esimerkiksi _assosiatiotauluiksi_) ovat myös tietorakenteita, mutta niiden perusperiaate on erilainen. Tietoa ei tallenneta hajautustauluissa peräkkäisiin indekseihin, vaan sen sijaan jokainen tietoalkio koostuu _avaimesta_ ja _arvosta_. Kun tiedetään avain, voidaan sen avulla pyytää taulusta arvo.

Tyypillinen esimerkki voisi olla vaikkapa yliopiston opiskelijarekisteri, jossa avain on opiskelijanumero ja arvona on tallennettu opiskelijan tiedot esimerkiksi tuple-rakenteeseen. Kun tiedetään halutun opiskelijan opiskelijanumero, löydetään opiskelijan tiedot nopeasti.

Hajautustauluille tyypillistä on, että alkioita ei ole järjestetty. Ei voida siis puhua ensimmäisestä tai viimeisestä alkiosta. Näiden sijasta on vain _joukko_ avaimia, joista jokainen viittaa yhteen alkioon taulussa:

<img src="5_4_1.png">

## Pythonin dictionary eli hakemisto

Pythonissa hajautustaulua vastaa tietorakenne _dictionary_ joka suomennetaan käytössämme _hakemistoksi_. Uusi tyhjä hakemisto voidaan luoda käyttämällä _aaltosulkeita_:

```python

testihakemisto = {}

```

Sulkeet määrittelevät siis kolme perustietorakennetta Pythonissa: kaarisulkeilla merkitään tuplet, hakasulkeilla listat ja aaltosulkeilla dictionaryt eli hakemistot.

Alkiot määritellään avain-arvopareina, syntaksilla `avain: arvo`. Esimerkiksi hakemisto, jossa avaimet ovat nimiä ja arvot kokonaislukuja:

```python

iät = {"Pekka": 25, "Paula": 19, "Pia": 41}

```

Arvoihin voidaan viitata tuttuun tapaan hakasulkunotaatiolla. Erotuksena on kuitenkin se, että hakemistossa ei ole nollasta alkavia indeksinumeroita niinkuin listoilla, merkkijonoilla tai tupleilla. Luvun sijasta indeksinä käytetäänkin avainta:


```python

iät = {"Pekka": 25, "Paula": 19, "Pia": 41}

print(iät["Pekka"])
print(iät["Paula"])

# Arvon voi myös vaihtaa, hakemisto on mutatoituva:
iät["Pia"] = 42

print(iät)

```

<sample-output>

25
19
{'Pekka': 25, 'Paula': 19, 'Pia': 42}

</sample-output>


## Avaimista ja arvoista

Python asettaa muutamia vaatimuksia hakemistossa käytettäville avaimille. Avaimen pitää olla

* uniikki - yksi avain ei voi esiintyä samassa hakemistossa kahta kertaa
* mutatoitumaton - esimerkiksi listaa ei voi käyttää avaimena, mutta tuplea voi (edellyttäen, että kaikki tuplen alkiot ovat myös mutatoitumattomia)

Arvoilla tällaisia vaatimuksia ei ole - hakemiston arvoksi voidaan tallentaa mitä tahansa. Sama arvo saa myös esiintyä samassa hakemistossa enemmän kuin yhden kerran.

Avaimen uniikkiusvaatimuksesta nähtiin esimerkki jo aiemmin: jos hakemistoon sijoitetaan alkio käyttäen avainta, joka jo löytyy hakemistosta, hakemistoon ei lisätä uutta alkiota vaan korvataan olemassaolevan alkion arvo. Jos avainta ei löydy, lisätään uusi alkio:

```python

lempinimet = {}

# Jos avainta ei ole, lisätään uusi arvo
lempinimet["Pekka"] = "Peksu"
lempinimet["Pauli"] = "Pauke"
lempinimet["Piia"] = "Piisku"

# Jos avain löytyy, arvo muuttuu
lempinimet["Pauli"] = "Paukku"

print(lempinimet)

```

<sample-output>

{'Pekka': 'Peksu', 'Pauli': 'Paukku', 'Piia': 'Piisku'}

</sample-output>

Huomaa, että samoin kuin missä tahansa muussakin tietorakenteessa, et voi tietoa hakiessa viitata indeksiin (eli tässä tapauksessa avaimeen), jota ei ole olemassa.

Avaimen esiintymisen hakemistossa voi tuttuun tapaan testata `in`-operaattorilla. Lauseke `avain in hakemisto` saa arvon `True`, jos avain löytyy hakemistosta.

```python

neliöt = {2: 4, 5: 25, 9: 81, 3: 9}

print(2 in neliöt)
print(4 in neliöt)

if(9 in neliöt):
    print("9 löytyy.")

```

<sample-output>

True
False
9 löytyy.

</sample-output>

## Hakemiston iterointi

Hakemiston läpikäyntiin voidaan käyttää totuttuun tapaan `for`-lausetta. Rakenne `for avain in hakemisto` sijoittaa yksi kerrallaan kaikki avaimet hakemistosta `hakemisto` muuttujaan `avain`.

<text-box variant="hint">

Aikaisemmissa Pythonin versioissa avaimet saattoivat tulla iteroinnin yhteydessä missä tahansa järjestyksessä. Tavallaan tämä on loogista, koska alkioilla ei ajatella olevan järjestystä hakemistossa. Nykyisin Pythonin toteutusta on kuitenkin muutettu siten, että avaimet (yleensä) käydään läpi siinä järjestyksessä kun ne on hakemistoon lisätty. Joka tapauksessa hyvä periaate on, että jos tarvitset _järjestettyä_ alkiota, on parempi käyttää listaa kuin hakemistoa.

</text-box>

Esimerkiksi funktio tulosta_hakemisto tulostaa kaikki hakemiston avaimet ja avainten avulla arvot:

```python

def tulosta_alkiot(hakemisto: dict):
    for avain in hakemisto:
        print(avain)
        # Arvo saadaan avaimen avulla
        print(hakemisto[avain])
        print()

# Testataaan
testihakemisto = {1: 10, 2: 20, 4: 45}
tulosta_alkiot(testihakemisto)

```

<sample-output>

1
10

2
20

4
45

</sample-output>

Python tarjoaa myös mahdollisuuden iteroida samaan aikaan sekä avaimet että vastaavat arvot. Tämä onnistuu käyttämällä `items`-metodia, joka palauttaa kaikkien alkioiden avaimet ja arvot alkio kerrallaan tuplena:

```python

def tulosta_alkiot(hakemisto: dict):
    for avain, arvo in hakemisto.items():
        print(avain)
        print(arvo)
        print()

# Testataaan
testihakemisto = {1: 10, 2: 20, 4: 45}
tulosta_alkiot(testihakemisto)

```

<sample-output>

1
10

2
20

4
45

</sample-output>

## Muutamia hyödyllisiä hakemisto-operaatioita

Kaikki hakemiston avaimet voidaan palauttaa `keys`-metodilla. Metodi palauttaa avaimet listassa. Tämä on hyödyllistä esimerkiksi silloin, kun halutaan käydä kaikki hakemiston alkiot läpi tietyssä järjestyksessä.

Esimerkkiohjelma tulostaa kaikki hakemiston alkiot avainten mukaisessa järjestyksessä:

```python

def tulosta_järjestyksessä(henkilöt: dict):
    avaimet = henkilöt.keys()

    # Tulostetaan aakkosjärjestyksessä avainten mukaan
    for avain in sorted(avaimet):
        print(henkilöt[avain])


# Testi
henkilöt = {"Saku": 11, "Teemu": 8, "Jere": 20, "Timo": 4}
tulosta_järjestyksessä(henkilöt)

```

<sample-output>

20
11
8
4

</sample-output>

Myös hakemiston pituus voidaan palauttaa `len`-funktiolla. Funktio palauttaa alkioiden (eli avain-arvoparien) määrän:

```python

testi = {1: 10, 2: 20, 3: 30, 5: 50}
testi[4] = 40

print(len(testi))

```

<sample-output>

5

</sample-output>


## Hakemiston käyttäminen nimettynä tietorakenteena

Eräs tapa käyttää hakemistoa on käyttää sitä tuplen korvikkeena toisiinsa liittyvien tietojen tallentamiseen. Hakemiston etuna on, että avaimilla on nimet indeksien sijasta.

Jos siis tuplea käytettäessä henkilön tiedot olisi tallennettu näin:

```python

henkilö = ("Pirjo Python", 154, 61, 44)

```

...voitaisiin henkilö tallentaa hakemistoa käyttäen näin:

```python

henkilö = {"nimi": "Pirjo Python", "pituus": 154, "paino": 61, "ikä:" 44}

```

Henkilöoliot voidaan edelleen tallentaa listaan, mutta yksittäisen ominaisuuden palautus on nyt havainnollisempaa:

```python

henkilö1 = {"nimi": "Pirjo Python", "pituus": 154, "paino": 61, "ikä": 44}
henkilö2 = {"nimi": "Pekka Pythonen", "pituus": 174, "paino": 103, "ikä": 31}
henkilö3 = {"nimi": "Pedro Python", "pituus": 191, "paino": 71, "ikä": 14}

henkilöt = [henkilö1, henkilö2, henkilö3]

# Tulosta kaikkien henkilöiden nimet
for henkilö in henkilöt:
    print(henkilö["nimi"])

# Laske keskipituus
yhteispituus = 0
for henkilö in henkilöt:
    yhteispituus = yhteispituus + henkilö["pituus"]

print("Keskipituus on " + str(yhteispituus / len(henkilöt)))

```
