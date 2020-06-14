---
path: '/osa-5/3-dictionary'
title: 'Sanakirja'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, millainen tietorakenne on sanakirja
- Osaat käyttää sanakirjaa eri tyyppisten avainten ja arvojen kanssa
- Osaat käydä läpi sanakirjan sisällön
- Tunnet joitakin sanakirjan käyttötarkoituksia ohjelmoinnissa

</text-box>

Lista on kätevä tietorakenne, mutta sen rajoituksena on, että alkiot ovat indekseissä 0, 1, 2, jne. Tutustumme seuraavaksi _sanakirjaan_, joka on toinen Pythonin perustietorakenne. Sanakirjassa jokainen alkio koostuu _avaimesta_ ja _arvosta_, ja voimme etsiä ja muuttaa tietoa avaimen perusteella.

## Sanakirjan käyttäminen

Seuraava ohjelma näyttää esimerkin sanakirjan käyttämisestä:

```python
sanakirja = {}

sanakirja["apina"] = "monkey"
sanakirja["banaani"] = "banana"
sanakirja["cembalo"] = "harpsichord"

print(len(sanakirja))
print(sanakirja)
print(sanakirja["apina"])
```

<sample-output>

3
{'apina': 'monkey', 'banaani': 'banana', 'cembalo': 'harpsichord'}
monkey

</sample-output>

Merkintä `{}` luo tyhjän sanakirjan, minkä jälkeen voimme lisätä sanakirjaan sisältöä. Tässä tapauksessa lisäämme kolme avainta `"apina"`, `"banaani"` ja `"cembalo"`,
joita vastaavat arvot `"monkey"`, `"banana"` ja `"harpsichord"`. Lopuksi tulostamme koko sanakirjan sisällön ja sitten avaimen `"apina"` arvon.

Voisimme käyttää tätä sanakirjaa vaikka seuraavasti:

```python
sana = input("Anna sana: ")
if sana in sanakirja:
    print("Käännös:", sanakirja[sana])
else:
    print("Sanaa ei löytynyt")
```

Tässä käytössä on `in`-operaattori, joka sanakirjan tapauksessa tarkastaa, onko siinä tiettyä avainta. Mahdollisia ohjelman tulostuksia:

<sample-output>

Anna sana: **apina**
Käännös: monkey

</sample-output>

<sample-output>

Anna sana: **pöllö**
Sanaa ei löytynyt

</sample-output>

## Mitä sanakirjassa voi olla?

Vaikka tietorakenteen nimi on sanakirja, siinä ei ole usein sanakirjaa vain jotain muuta tietoa. Esimerkiksi seuraavassa sanakirjassa avaimet ovat merkkijonoja ja arvot ovat kokonaislukuja:

```python
tulokset = {}
tulokset["Maija"] = 4
tulokset["Liisa"] = 5
tulokset["Kalle"] = 2
```

Seuraavassa sanakirjassa puolestaan avaimet ovat kokonaislukuja ja arvot ovat listoja:

```python
listat = {}
listat[5] = [1,2,3]
listat[42] = [5,4,5,4,5]
listat[100] = [5,2,3]
```

## Avaimista ja arvoista

Tietty avain voi esiintyä sanakirjassa enintään kerran. Jos laitamme avaimen uudestaan, uusi arvo korvaa avaimen vanhan arvon:

```python
sanakirja["suuri"] = "big"
sanakirja["suuri"] = "large"
print(sanakirja["suuri"])
```

<sample-output>

large

</sample-output>

Sanakirjan avaimen vaatimuksena on, että sen tulee olla muuttumaton. Tämän vuoksi emme voi käyttää listaa avaimena, koska lista voi muuttua. Esimerkiksi seuraava koodi ei toimi:

```python
sanakirja[[1,2,3]] = 5
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

<text-box variant="hint" name="Hajautustaulu">

Python tallentaa sanakirjan sisällön sisäisesti tietorakenteena nimeltä _hajautustaulu_ (_hash table_). Ideana on laskea avaimelle _hajautusarvo_ (_hash value_), jonka avulla määräytyy avaimen paikka muistissa. Yllä oleva virheilmoitus ilmaisee, että listalle ei voida laskea hajautusarvoa, joten se ei kelpaa sanakirjan avaimeksi.

Kurssilla _Tietorakenteet ja algoritmit_ tutustutaan tarkemmin hajautustauluihin, eli sanakirjojen pellin alla olevaan mekanismiin.

</text-box>

Huomaa, että sanakirjan arvon ei tarvitse olla muuttumaton, vaan voimme tallentaa mitä tahansa tietoa arvoiksi. Sama arvo voi myös esiintyä samassa hakemistossa enemmän kuin yhden kerran.

## Sanakirjan läpikäynti

Sanakirjan läpikäyntiin voidaan käyttää totuttuun tapaan `for`-lausetta. Rakenne `for avain in sanakirja` käy läpi kaikki sanakirjan avaimet yksi kerrallaan.
Esimerkiksi seuraava koodi tulostaa kaikki sanakirjan avaimet ja niiden arvot:

```python
sanakirja = {}

sanakirja["apina"] = "monkey"
sanakirja["banaani"] = "banana"
sanakirja["cembalo"] = "harpsichord"

for avain in sanakirja:
    print("avain:", avain)
    print("arvo:", sanakirja[avain])
```

<sample-output>

avain: apina
arvo: monkey
avain: banaani
arvo: banana
avain: cembalo
arvo: harpsichord

</sample-output>

Python tarjoaa myös mahdollisuuden käydä läpi samaan aikaan sekä avaimet että vastaavat arvot. Tämä onnistuu käyttämällä `items`-metodia, joka palauttaa kaikki avaimet ja arvot yksi kerrallaan:

```python

for avain, arvo in sanakirja.items():
    print("avain:", avain)
    print("arvo:", arvo)
```

Huomaa, että läpikäynnissä avaimet tulevat samassa järjestyksessä kuin ne on lisätty sanakirjaan. Sanakirjan avainten järjestyksellä ei kuitenkaan yleensä ole merkitystä sovelluksissa.

## Sanakirjan edistyneempi käyttö

Tarkastellaan tilannetta, jossa meillä on taulukossa joukko sanoja:

```python
sanalista = [
  "banaani", "maito", "olut", "juusto", "piimä", "mehu", "makkara",
  "tomaatti", "kurkku", "voi", "margariini", "juusto", "makkara",
  "olut", "piimä", "piimä", "voi", "olut", "suklaa"
]
```

Haluamme analysoida sanalistaa eri tavoin, mm. selvittää, kuinka monta kertaa kukin sana listalla esiintyy.

Sanakirja sopii tähän tilanteeseen hyvin. Ideana on käydä listan sanat läpi yksi kerrallaan ja ylläpitää sanakirjassa tietoa, montako kertaa kukin sana listalla esiintyy:

```python
def lukumaarat(lista):
    sanat = {}
    for sana in lista:
        # jos sana ei ole vielä tullut vastaan, alusta avaimen arvo
        if sana not in sanat:
            sanat[sana] = 0
        # kasvata sanan esiintymislukumäärää
        sanat[sana] += 1

    return sanat

# kutsutaan funktiota
print(lukumaarat(sanalista))
```

Ohjelman tulostus on seuraavassa:

<sample-output>

{'banaani': 1, 'maito': 1, 'olut': 3, 'juusto': 2, 'piimä': 3, 'mehu': 1, 'makkara': 2, 'tomaatti': 1, 'kurkku': 1, 'voi': 2, 'margariini': 1, 'suklaa': 1}

</sample-output>

Tehdään vielä toinen sanalistaa käsittelevä metodi, joka jaottelee listalla olevat sanat niiden alkukirjaimen mukaan:

```python
def alkukirjaimen_mukaan(lista):
    ryhmat = {}
    for sana in lista:
        alkukirjain = sana[0]
        # alusta alkukirjaimeen liittyvä lista kun kirjain tulee vastaan 1. kerran
        if alkukirjain not in sanat:
            ryhmat[alkukirjain] = []
        # lisää sana alkukirjainta vastaavalle listalle
        ryhmat[alkukirjain].append(sana)
        
    return ryhmat

ryhmat = alkukirjaimen_mukaan(sanalista)

for avain, arvo in ryhmat.items():
    print(f"kirjaimella {avain} alkavat sanat: ")
    for sana in arvo:
        print(sana)
```

Funktio toimii pitkälti saman periaatteen mukaan kuin edellisen esimerkin funktio. Tällä kertaa kuitenkin sanakirjassa avaimiin (eli alkukirjaimiin) liittyät arvot ovat listoja.

Ohjelman tulostus on seuraavassa:

<sample-output>

kirjaimella b alkavat sanat:
  banaani
kirjaimella m alkavat sanat:
  maito
  mehu
  makkara
  margariini
  makkara
kirjaimella o alkavat sanat:
  olut
  olut
  olut
kirjaimella j alkavat sanat:
  juusto
  juusto
kirjaimella p alkavat sanat:
  piimä
  piimä
  piimä
kirjaimella t alkavat sanat:
  tomaatti
kirjaimella k alkavat sanat:
  kurkku
kirjaimella v alkavat sanat:
  voi
  voi
kirjaimella s alkavat sanat:
  suklaa

</sample-output>

## Sanakirja tiedon ryhmittelyssä

Voimme käyttää sanakirjaa myös tiedon ryhmittelyssä. Esimerkiksi seuraava koodi luo sanakirjan, jossa on tietoa henkilöstä:

```python
henkilo = {"nimi": "Pirjo Python", "pituus": 154, "paino": 61, "ikä:" 44}
```

Tämä tarkoittaa, että henkilön nimi on Pirjo Python, pituus on 154, paino on 61 ja ikä on 44.
Huomaa, että olisimme voineet tallentaa tiedot myös näin muuttujiin:

```python
nimi = "Pirjo Python"
pituus = 154
paino = 61
ika = 44
```

Sanakirjan etuna on kuitenkin, että se kokoaa kaikki samaan asiaan liittyvät tiedot yhteisen nimen alle, jonka kautta voimme viitata tietoihin. Periaatteessa lista tarjoaa saman edun:

```python
henkilo = [ "Pirjo Python", 153, 61, 44 ]
```

Listan huono puoli on kuitenkin, että ohjelmoijan on muistettava, mihin kohtaan listaa mikäkin arvo tallennetaan. Pitää siis muistaa, että `henkilo[2]` tarkoittaa painoa ja `henkilo[3]` ikää, eikä päinvastoin. Sanakirjassa tätä ongelmaa ei ole, sillä kaikki sanakirjassa olevat erilliset tiedot on tallennettu selkeästi nimetyn avaimen taakse.

Esimerkiksi voimme käsitellä henkilöitä näin:

```python
henkilo1 = {"nimi": "Pirjo Python", "pituus": 154, "paino": 61, "ikä": 44}
henkilo2 = {"nimi": "Pekka Pythonen", "pituus": 174, "paino": 103, "ikä": 31}
henkilo3 = {"nimi": "Pedro Python", "pituus": 191, "paino": 71, "ikä": 14}

henkilot = [henkilo1, henkilo2, henkilo3]

for henkilo in henkilot:
    print(henkilo["nimi"])

yhteispituus = 0
for henkilo in henkilot:
    yhteispituus += henkilo["pituus"]

print("Keskipituus on", yhteispituus / len(henkilot))
```

<sample-output>

Pirjo Python
Pekka Pythonen
Pedro Python
Keskipituus on 173.0

</sample-output>
