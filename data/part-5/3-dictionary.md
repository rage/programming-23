---
path: '/part-5/3-dictionary'
title: 'Dictionary'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, millainen tietorakenne on sanakirja
- Osaat käyttää sanakirjaa erityyppisten avainten ja arvojen kanssa
- Osaat käydä läpi sanakirjan sisällön
- Tunnet joitakin sanakirjan käyttötarkoituksia ohjelmoinnissa

</text-box>

Lista on kätevä tietorakenne, mutta sen rajoituksena on, että alkiot ovat indekseissä 0, 1, 2, jne. Tämä hankaloittaa alkioiden etsimistä listalta: jotta löydämme tietyn alkion, on pahimmassa tapauksessa käytävä läpi koko lista.

Tutustumme seuraavaksi _sanakirjaan_, (englanniksi _dictionary_) joka on listan lisäksi toinen Pythonin perustietorakenne. Sanakirjassa jokainen alkio koostuu _avaimesta_ ja _arvosta_, ja voimme etsiä ja muuttaa tietoa avaimen perusteella.

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

Merkintä `{}` luo tyhjän sanakirjan, minkä jälkeen voimme lisätä sanakirjaan sisältöä. Tässä tapauksessa lisäämme kolme avainta `"apina"`, `"banaani"` ja `"cembalo"`, joita vastaavat arvot `"monkey"`, `"banana"` ja `"harpsichord"`. Lopuksi tulostamme koko sanakirjan sisällön ja sitten avaimen `"apina"` arvon.

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

Vaikka tietorakenteen nimi on sanakirja, siinä ei ole usein sanakirjaa vaan jotain muuta tietoa. Esimerkiksi seuraavassa sanakirjassa avaimet ovat merkkijonoja ja arvot ovat kokonaislukuja:

```python
tulokset = {}
tulokset["Maija"] = 4
tulokset["Liisa"] = 5
tulokset["Kalle"] = 2
```

Seuraavassa sanakirjassa puolestaan avaimet ovat kokonaislukuja ja arvot ovat listoja:

```python
listat = {}
listat[5] = [1, 2, 3]
listat[42] = [5, 4, 5, 4, 5]
listat[100] = [5, 2, 3]
```

## Avaimista ja arvoista

Tietty avain voi esiintyä sanakirjassa enintään kerran. Jos asetamme samalle avaimelle uuden arvon, korvaa uusi arvo vanhan arvon:

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
sanakirja[[1, 2, 3]] = 5
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

<text-box variant="hint" name="Hajautustaulu">

Python tallentaa sanakirjan sisällön sisäisesti tietorakenteena nimeltä _hajautustaulu_ (_hash table_). Ideana on laskea avaimelle _hajautusarvo_ (_hash value_), jonka avulla määräytyy avaimen paikka muistissa. Yllä oleva virheilmoitus ilmaisee, että listalle ei voida laskea hajautusarvoa, joten se ei kelpaa sanakirjan avaimeksi.

Kurssilla _Tietorakenteet ja algoritmit_ tutustutaan tarkemmin hajautustauluihin, eli sanakirjojen pellin alla olevaan mekanismiin.

</text-box>

Huomaa, että sanakirjassa olevaa avainta vastaavan arvon ei tarvitse olla muuttumaton, vaan voimme tallentaa mitä tahansa tietoa arvoiksi. Sama arvo voi myös esiintyä samassa hakemistossa enemmän kuin yhden kerran.

<programming-exercise name='Times ten' tmcname='part05-14_times_ten'>

Tee funktio `kertaa_kymmenen(alku: int, loppu: int)`, joka muodostaa ja palauttaa uuden sanakirjan. Sanakirjassa on avaimina luvut väliltä `alku`..`loppu`.

Jokaisen avaimen arvona on avain kerrottuna kymmenellä.

Esimerkiksi:

```python
d = kertaa_kymmenen(3, 6)
print(d)
```

<sample-output>

{3: 30, 4: 40, 5: 50, 6: 60}

</sample-output>

</programming-exercise>

<programming-exercise name='Factorials' tmcname='part05-15_factorials'>

Tee funktio `kertomat(n: int)`, joka palauttaa lukujen 1..`n` kertomat sanakirjassa siten, että luku on avain ja luvun kertoma arvo, johon avain viittaa.

Muistutuksena: luvun `n` kertoma `n`! lasketaan kertomalla luku kaikilla itseään pienemmillä positiivisilla kokonaisluvuilla. Luvun 4 kertoma on siis 4 * 3 * 2 * 1 = 24.

Esimerkki käytöstä:

```python
k = kertomat(5)
print(k[1])
print(k[3])
print(k[5])
```

<sample-output>

1
6
120

</sample-output>

</programming-exercise>

## Sanakirjan läpikäynti

Sanakirjan läpikäyntiin voidaan käyttää tuttuun tapaan `for`-silmukkaa. Rakenne `for avain in sanakirja` käy läpi kaikki sanakirjan avaimet yksi kerrallaan. Esimerkiksi seuraava koodi tulostaa kaikki sanakirjan avaimet ja niiden arvot:

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

Tarkastellaan tilannetta, jossa listassa on joukko sanoja:

```python
sanalista = [
  "banaani", "maito", "olut", "juusto", "piimä", "mehu", "makkara",
  "tomaatti", "kurkku", "voi", "margariini", "juusto", "makkara",
  "olut", "piimä", "piimä", "voi", "olut", "suklaa"
]
```

Haluamme analysoida sanalistaa eri tavoin, kuten selvittää, montako kertaa kukin sana listalla esiintyy.

Sanakirja sopii tähän tilanteeseen hyvin. Ideana on käydä listan sanat läpi yksi kerrallaan ja ylläpitää sanakirjassa tietoa sanojen esiintymiskerroista:

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
        if alkukirjain not in ryhmat:
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

Funktio toimii pitkälti saman periaatteen mukaan kuin edellisen esimerkin funktio. Tällä kertaa kuitenkin sanakirjassa avaimiin (eli alkukirjaimiin) liittyvät arvot ovat listoja.

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

<programming-exercise name='Histogram' tmcname='part05-16_histogram'>

Tee funktio `histogrammi`, joka saa parametrina merkkijonon ja tulostaa merkkijonon eri kirjainten lukumäärää kuvaavan histogrammin, jossa kirjaimen jokaista esiintymää kohti tulostuu yksi tähti kirjaimen riville.

Esimerkiksi kutsuttaessa `histogrammi("abba")` tulostus on:

<sample-output>

<pre>
a **
b **
</pre>

</sample-output>

Vastaavasti kutsuttaessa `histogrammi("saippuakauppias")` tulostus on:

<sample-output>

<pre>
s **
a ****
i **
p ****
u **
k *
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Phone book, version 1' tmcname='part05-17_phone_book_v1'>

Tee puhelinluettelo, joka toimii seuraavasti:

<sample-output>

komento (1 hae, 2 lisää, 3 lopeta): **2**
nimi: **pekka**
numero: **040-5466745**
ok!
komento (1 hae, 2 lisää, 3 lopeta): **2**
nimi: **emilia**
numero: **045-1212344**
ok!
komento (1 hae, 2 lisää, 3 lopeta): **1**
nimi: **pekka**
040-5466745
komento (1 hae, 2 lisää, 3 lopeta): **1**
nimi: **maija**
ei numeroa
komento (1 hae, 2 lisää, 3 lopeta): **2**
nimi: **pekka**
numero: **09-22223333**
ok!
komento (1 hae, 2 lisää, 3 lopeta): **1**
nimi: **pekka**
09-22223333
komento (1 hae, 2 lisää, 3 lopeta): **3**
lopetetaan...

</sample-output>

Huomaa, että jokaiseen nimeen voi liittyä vain yksi puhelinnumero. Jos samalle henkilölle lisätään uusi numero, se korvaa aiemmin lisätyn numeron.

**Huom:** tässä tehtävässä (eikä missään muussakaan tehtävissä missä _ei_ erikseen pyydetä funktioiden toteuttamista) mitään koodia __ei tule sijoittaa__
`if __name__ == "__main__"`-lohkoon!

</programming-exercise>

<programming-exercise name='Phone book, version 2' tmcname='part05-18_phone_book_v2'>

Tee puhelinluettelosta paranneltu versio, missä jokaisella henkilöllä voi olla useampia puhelinnumeroita. Ohjelma toimii kuten edellisessä tehtävässä, mutta nyt se listaa jokaisen numeron:

<sample-output>

komento (1 hae, 2 lisää, 3 lopeta): **2**
nimi: **pekka**
numero: **040-5466745**
ok!
komento (1 hae, 2 lisää, 3 lopeta): **2**
nimi: **emilia**
numero: **045-1212344**
ok!
komento (1 hae, 2 lisää, 3 lopeta): **1**
nimi: **pekka**
040-5466745
komento (1 hae, 2 lisää, 3 lopeta): **1**
nimi: **maija**
ei numeroa
komento (1 hae, 2 lisää, 3 lopeta): **2**
nimi: **pekka**
numero: **09-22223333**
ok!
komento (1 hae, 2 lisää, 3 lopeta): **1**
nimi: **pekka**
040-5466745
09-22223333
komento (1 hae, 2 lisää, 3 lopeta): **3**
lopetetaan...

</programming-exercise>

## Avaimien poistaminen sanakirjasta

Sanakirjasta on mahdollista myös poistaa avain-arvo-pareja. Menetelmiä tähän on kaksi. Ensimmäinen näistä on komento `del`:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "Lehtori"}
del henkilokunta["Arto"]
print(henkilokunta)
```

<sample-output>

{'Antti': 'lehtori', 'Emilia': 'professori'}

</sample-output>

Jos komentoa `del` kutsutaan avaimille, joita sanakirjassa ei ole, seurauksena on virhe:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "lehtori"}
del henkilokunta["Jukka"]
```

<sample-output>

<pre>
>>> del henkilokunta["Jukka"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'Jukka'
</pre>

</sample-output>

Ennen poistoa on siis syytä tarkistaa, että poistettava avain löytyy sanakirjasta:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "lehtori"}
if "Jukka" in henkilokunta:
  del henkilokunta["Jukka"]
  print("Poistettiin")
else:
  print("Poistettavaa henkilöä ei löytynyt henkilökunnasta")
```

Toinen vaihtoehto alkion poistamiseen on metodi `pop`:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "lehtori"}
poistettu = henkilokunta.pop("Arto")
print(henkilokunta)
print("Poistettiin", poistettu)
```

<sample-output>

{'Antti': 'lehtori', 'Emilia': 'professori'}
Poistettiin lehtori

</sample-output>

Metodi `pop` siis myös palauttaa poistettua avainta vastaavan arvon.

Oletusarvoisesti myös `pop` aiheuttaa virheen, jos sanakirjasta yritetään poistaa avain, jota siellä ei ole. Metodille on kuitenkin mahdollista antaa toisena parametrina _oletusarvoinen paluuarvo_, joka palautetaan siinä tilanteessa, kun poistettavaa ei löydy. Esimerkiksi arvo `None`, joka tarkoittaa "ei mitään", sopii hyvin tälläisiin tilanteisiin:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "lehtori"}
poistettu = henkilokunta.pop("Jukka", None)
if poistettu == None:
  print("Poistettavaa henkilöä ei löytynyt henkilökunnasta")
else:
  print("Poistettiin", poistettu)
```

<sample-output>

Poistettavaa henkilöä ei löytynyt henkilökunnasta

</sample-output>

Kannattaa huomata, että jos on tarvetta poistaa koko sanakirjan sisältö:

```python
henkilokunta = {"Antti": "lehtori", "Emilia": "professori", "Arto": "lehtori"}
for avain in henkilokunta:
  del henkilokunta[avain]
```

seurauksena on virheilmoitus

<sample-output>

RuntimeError: dictionary changed size during iteration

</sample-output>

Syynä on se, että käytäessä läpi rakennetta `for`-lauseella, ei sen sisältöä saa muuttaa.

Koko sanakirjan tyhjennys onnistuu komennolla:

```python
henkilokunta.clear()
```

<programming-exercise name='Invert a dictionary' tmcname='part05-19_invert_dictionary'>

Kirjoita funktio `kaanna(sanakirja: dict)`, joka saa parametrikseen sanakirjan ja kääntää sen niin, että arvoista tulee avaimia ja päinvastoin.

Esimerkki funktion käytöstä:

```python
s = {1: "eka", 2: "toka", 3: "kolmas", 4: "neljas"}
kaanna(s)
print(s)
```

<sample-output>

{"eka": 1, "toka": 2, "kolmas": 3, "neljas": 4}

</sample-output>

**Huomaa**, että [tämä](/osa-5/2-viittaukset#parametrina-olevan-listan-muokkaaminen) pitää paikkansa myös parametrina oleville sanakirjoille!

Jos kohtaat tehtävässä ongelmia, katso [visualisaattorilla](http://www.pythontutor.com/visualize.html#mode=edit) mitä koodisi tekee.

</programming-exercise>

<programming-exercise name='Numbers spelled out' tmcname='part05-20_numbers_spelled_out'>

Kirjoita funktio `lukukirja()`, joka palauttaa uuden sanakirjan. Palautettu rakenne sisältää avaimina luvut nollasta 99:ään. Sanakirjan arvoina ovat luvut kirjaimin kirjoitettuna. Katso esimerkkiä alla:

```python
luvut = lukukirja()
print(luvut[2])
print(luvut[11])
print(luvut[45])
print(luvut[99])
print(luvut[0])
```

<sample-output>

kaksi
yksitoista
neljäkymmentäviisi
yhdensänkymmentäyhdeksän
nolla

</sample-output>

HUOM! Älä muodosta jokaista lukusanaa yksitellen, vaan mieti, miten voisit hyödyntää silmukoita ja sanakirjaa jotenkin ratkaisussasi!

</programming-exercise>

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
henkilo = ["Pirjo Python", 153, 61, 44]
```

Listan huono puoli on kuitenkin, että ohjelmoijan on muistettava, mihin kohtaan listaa mikäkin arvo tallennetaan. Pitää siis muistaa esimerkiksi, että `henkilo[2]` tarkoittaa painoa ja `henkilo[3]` ikää. Sanakirjassa tätä ongelmaa ei ole, sillä kaikki sanakirjassa olevat erilliset tiedot on tallennettu selkeästi nimetyn avaimen taakse.

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

<programming-exercise name='Movie database' tmcname='part05-21_movie_database'>

Kirjoita funktio `lisaa_elokuva(rekisteri: list, nimi: str, ohjaaja: str, vuosi: int, pituus: int)`, joka lisää yhden elokuvaolion elokuvarekisteriin.

Rekisteri on toteutettu listana, ja jokainen listan alkio on yksi sanakirja. Sanakirjassa on seuraavat avaimet:

* nimi
* ohjaaja
* vuosi
* pituus

Arvot tulevat metodin parametreina.

Esimerkki:

```python
rekisteri = []
lisaa_elokuva(rekisteri, "Pythonin viemää", "Pekka Python", 2017, 116)
lisaa_elokuva(rekisteri, "Python lentokoneessa", "Renny Pytholin", 2001, 94)
print(rekisteri)
```

<sample-output>

[{"nimi": "Pythonin viemää", "ohjaaja": "Pekka Python", "vuosi": 2017, "pituus": 116}, {"nimi": "Python lentokoneessa", "ohjaaja": "Renny Pytholin", "vuosi": 2001, "pituus": 94}]

</sample-output>

</programming-exercise>

<programming-exercise name='Find movies' tmcname='part05-22_find_movies'>

Kirjoita funktio `etsi_elokuvat(rekisteri: list, hakusana: str)`, joka käsittelee edellisessä tehtävässä luotua elokuvarekisteriä. Funktio muodostaa uuden listan, jolle kopioidaan rekisteristä ne elokuvat, joiden nimestä löytyy hakusana. Pienet ja isot kirjaimet eivät merkitse haussa, joten hakusanalla `paj` pitää löytyä sekä elokuva `Tappajahai` että elokuva `Pajatoiminnan historia`.

Esimerkki:

```python
rekisteri = [{"nimi": "Pythonin viemää", "ohjaaja": "Pekka Python", "vuosi": 2017, "pituus": 116},
{"nimi": "Python lentokoneessa", "ohjaaja": "Renny Pythonen", "vuosi": 2001, "pituus": 94},
{"nimi": "Koodaajien yö", "ohjaaja": "M. Night Python", "vuosi": 2011, "pituus": 101}]

lista = etsi_elokuvat(rekisteri, "python")
print(lista)
```

<sample-output>

[{"nimi": "Pythonin viemää", "ohjaaja": "Pekka Python", "vuosi": 2017, "pituus": 116}, {"nimi": "Python lentokoneessa", "ohjaaja": "Renny Pythonen", "vuosi": 2001, "pituus": 94}]

</sample-output>

</programming-exercise>

A quiz to review the contents of this section:

<quiz id="6361eeca-a2e2-5577-892c-749706d754f0"></quiz>
