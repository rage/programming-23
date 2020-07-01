---
path: '/osa-6/2-tiedostojen-kirjoittaminen'
title: 'Tiedostojen kirjoittaminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat luoda itse tiedoston Pythonilla
- Osaat kirjoittaa tekstimuotoista tietoa tiedostoon
- Tiedät, miten Pythonin `join`-metodin avulla voidaan yhdistää alkiot yhdeksi merkkijonoksi
- Osaat kirjoittaa CSV-muotoisen tiedoston omasta datastasi

</text-box>

Tiedoston lukemisen lisäksi voimme luonnollisesti myös kirjoittaa tiedostoon tietoa. Tyypillinen esimerkki on ohjelman tulosten tallentaminen tiedostoon, jotta niitä voidaan käyttää myös myöhemmin tai muokata edelleen jollain toisella ohjelmalla.

Tiedoston kirjoittamisessa voimme joko luoda uuden tiedoston tai lisätä tietoa olemassa olevan tiedoston vanhan tiedon perään. Molemmissa tapauksissa käytetään edellisestä osasta tuttua `open`-funktiota, mutta kirjoittamista varten funktiolle annetaan toinen parametri.

## Uuden tiedoston luominen

Uusi tiedosto luodaan antamalla `open`-funktiolle tiedoston nimen lisäksi avaustilaksi `w` (tulee sanasta "write"). Esimerkiksi

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    # tiedostoon kirjoittaminen
```

Huomaa, että **mikäli tiedosto on jo olemassa, kaikki sen sisältö ylikirjoitetaan**. Ole siis erittäin huolellinen uusia tiedostoja luodessasi.

Kun tiedosto on avattu, sinne voidaan kirjoittaa tietoa. Kirjoittaminen tapahtuu metodilla `write`, joka saa parametrikseen kirjoitettavan merkkijonon.

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!")
```

Ohjelman suorittamisen jälkeen samaan hakemistoon ilmestyy tiedosto `uusi_tiedosto.txt`, jonka sisältö näyttää tältä:

<sample-data>

Moi kaikki!

</sample-data>

Huomaa, että jos tiedostoon halutaan rivinvaihtoja, ne täytyy lisätä tekstiin itse. Esimerkiksi ohjelma

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!")
    tiedosto.write("Toinen rivi")
    tiedosto.write("Viimeinen rivi")
```

tuottaa seuraavanlaisen tiedoston:

<sample-data>

Moi kaikki!Toinen riviViimeinen rivi

</sample-data>

Tulostukset saadaan omille riveilleen lisäämällä rivien loppuun rivivaihtomerkki `\n`:

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!\n")
    tiedosto.write("Toinen rivi\n")
    tiedosto.write("Viimeinen rivi\n")
```

Nyt tiedosto `uusi_tiedosto.txt` näyttää tältä:

<sample-data>

Moi kaikki!
Toinen rivi
Viimeinen rivi

</sample-data>

<programming-exercise name='Omistuskirjoitus' tmcname='osa06-10_omistuskirjoitus'>

Tee ohjelma, joka kysyy nimeä ja luo "omistuskirjoituksen" käyttäjän haluamaan tiedostoon. Seuraavassa ohjelman esimerkkisuoritus:

<sample-output>

Kenelle teos omistetaan: **Arto**
Mihin kirjoitetaan: **omistettu.txt**

</sample-output>

Tiedoston `omistettu.txt` sisällöksi tulee

<sample-data>

Hei Arto, toivomme viihtyisiä hetkiä python-kurssimateriaalin parissa! Terveisin mooc.fi-tiimi

</sample-data>

</programming-exercise>

## Tiedon lisääminen olemassaolevaan tiedostoon

Jos haluamme lisätä tietoa olemassa olevaan tiedostoon, voimme avata tiedoston tilassa `a` (lyhenne sanasta "append"). Tällöin tiedoston nykyistä sisältöä ei pyyhitä, vaan uusi tieto kirjoitetaan tiedoston loppuun.

Jos tiedostoa ei ole olemassa, tila `a` toimii samalla tavalla kuin tila `w`.

Seuraava ohjelma avaa edellisen esimerkin tuottaman tiedoston `uusi_tiedosto.txt` ja lisää sen perään pari riviä tekstiä:

```python
with open("uusi_tiedosto.txt", "a") as tiedosto:
    tiedosto.write("Rivi numero 4\n")
    tiedosto.write("Ja taas yksi.\n")
```

Ohjelman suorituksen jälkeen tiedosto näyttää tältä:

<sample-output>

Moi kaikki!
Toinen rivi
Viimeinen rivi
Rivi numero 4
Ja taas yksi.

</sample-output>

Tiedostoon lisäämisen sijaan on usein yksinkertaisinta kirjoittaa tiedosto kokonaan uudelleen. Näin joudutaan useimmiten tekemään jos esimerkiksi tiedoston sisältö muuttuu keskeltä tiedostoa.

<programming-exercise name='Päiväkirja' tmcname='osa06-11_paivakirja'>

Tee ohjelma, joka mallintaa yksinkertaista päiväkirjaa. Ohjelman tulee tallentaa päiväkirjamerkinnät tiedostoon `paivakirja.txt`. Kun ohjelma käynnistetään, se lukee merkinnät tiedostosta.

Huom! Paikalliset testit voivat muuttaa tiedoston sisältöä - kopioi siis tiedosto talteen ennen testien ajamista, jos haluat säilyttää sen sisällön.

Ohjelman tulee toimia seuraavan esimerkin mukaisesti:

<sample-output>

1 - lisaa merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **1**
Anna merkintä: **Tänään söin puuroa**
Päiväkirja tallennettu

1 - lisaa merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **2**
Merkinnät:
Tänään söin puuroa

1 - lisaa merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **1**
Anna merkintä: **Illalla kävin saunassa**
Päiväkirja tallennettu

1 - lisaa merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **2**
Merkinnät:
Tänään söin puuroa
Illalla kävin saunassa

1 - lisaa merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **0**
Heippa!

</sample-output>

Uusi käynnistys:

<sample-output>

1 - lisaa merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **2**
Merkinnät:
Tänään söin puuroa
Illalla kävin saunassa

1 - lisaa merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **0**
Heippa!

</sample-output>

</programming-exercise>

## CSV-tiedoston kirjoittaminen

CSV-tiedoston voi kirjoittaa rivi riviltä `write`-metodilla. Esimerkiksi seuraava esimerkki luo tiedoston `koodarit.csv`, jonka jokaisella rivillä on koodarin nimi, työympäristö ja lempikieli. Tiedot on erotettu puolipisteillä.

```python
with open("koodarit.csv", "w") as tiedosto:
    tiedosto.write("Erkki;Windows;Pascal\n")
    tiedosto.write("Matti;Linux;PHP\n")
    tiedosto.write("Antti;Linux;Java\n")
    tiedosto.write("Emilia;Mac;Cobol\n")
```

Tämän tuloksena on seuraava tiedosto:

<sample-output>

Erkki;Windows;Pascal
Matti;Linux;PHP
Antti;Linux;Java
Emilia;Mac;Cobol

</sample-output>

Tarkastellaan sitten tilannetta, jossa tiedostoon kirjoitettavat tiedot ovatkin muistissa listoina:

```python
koodarit = []
koodarit.append(["Erkki", "Windows", "Pascal"])
koodarit.append(["Matti", "Linux", "PHP"])
koodarit.append(["Antti", "Linux", "Java"])
koodarit.append(["Emilia", "Mac", "Cobol"])
```

Kätevä tapa muuttaa lista CSV-tiedoston riviksi on käyttää metodia `join`, joka on tavallaan käänteinen metodille `split`. Metodi `join` yhdistää halutulla erotinmerkillä annetun listan merkkijonoja, esimerkiksi näin:

```python
lista = ["apina", "banaani", "cembalo"]
print(",".join(lista))
```

<sample-output>

apina,banaani,cembalo

</sample-output>

Nyt voimme kirjoittaa koodarien tiedot CSV-tiedostoon näin:

```python
with open("koodarit.csv", "w") as tiedosto:
    for koodari in koodarit:
        rivi = ";".join(koodari)
        tiedosto.write(rivi+"\n")
```

Kannattaa kuitenkin huomata, että `join`-metodi edellyttää että sen parametrina olevassa taulukossa kaikki alkiot ovat merkkijonoja. Jos yritämme seuraavaa

```python
rivi = ["Antti", "Helsinki", 31]
";".join(rivi)
```

tuloksena on virheilmoitus

<sample-output>

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: sequence item 2: expected str instance, int found

</sample-output>

<text-box variant='hint' name='Joinille kelpaava taulukko'>

Lukuja sisältävä taulukko saadaan muutettua metodille `join` kelpaamaan muotoon käyttämällä seuraavaa kikkaa:

```python
rivi = ["Antti", "Helsinki", 31]
 ";".join(str(alkio) for alkio in rivi)
```

Lopputulos on toimiva

<sample-output>

'Antti;Helsinki;31'

</sample-output>

Tutustumme ohjelmoinnin jatkokurssilla tarkemmin siihen mistä tässä joinin sisällä olevassa forissa oikeastaan onkaan kyse.

</text-box>

<programming-exercise name='Aineiston suodatus' tmcname='osa06-12_aineiston_suodatus'>

Tiedostossa laskut.csv on tehtävien ratkaisuja seuraavan esimerkin mukaisesti:

```sh
Arto;2+5;7
Pekka;3-2;1
Erkki;9+3;11
Arto;8-3;4
Pekka;5+5;10
...jne...
```

Jokaisella rivin muoto on siis `oppilaan_nimi;lasku;lopputulos`. Laskut ovat kaikki esimerkin mukaisesti joko yhteen- tai vähennyslaskuja, ja kaikissa on kaksi operandia.

Kirjoita funktio `suodata_laskut()`, joka

* Lukee tiedoston `laskut.csv` sisällön ja
* kirjoittaa tiedostoon `oikeat.csv` ne rivit, joilla laskutoimituksen lopputulos on oikein sekä
* kirjoittaa tiedostoon `vaarat.csv` ne rivit, joilla laskutoimituksen lopputulos on väärin.

Edellisestä esimerkistä tiedostoon `oikeat.csv` olisi siis kirjoitettu rivit

```sh
Arto;2+5;7
Pekka;3-2;1
Pekka;5+5;10
```

Kaksi muuta riviä olisi kirjoitettu tiedostoon `vaarat.csv`.

Kirjoita rivit samassa järjestyksessä kuin ne esiintyvät alkuperäisessä tiedostossa. Älä muuta alkuperäistä tiedostoa.

</programming-exercise>

## Tiedon käsittely CSV:nä

Tehdään vielä lopuksi ohjelma, joka lukee CSV-tiedostosta opiskelijoiden viikoittaiset kurssipistemäärät ja laskee näiden avulla kurssin arvosanan. Lopuksi ohjelma luo CSV-tiedoston, mistä selviää opiskelijan yhteispistemäärä sekä arvosana

Ohjelman lukema CSV näytää seuraavalta:

<sample-data>

Pekka;4;2;3;5;4;0;0
Paula;7;2;8;3;5;4;5
Pirjo;3;4;3;5;3;4;4
Emilia;6;6;5;5;0;4;8

</sample-data>

Ohjelman logiikka on jaettu kolmeen funktioon, tiedoston lukeminen tapahtuu samaan tapaan kuin edellisessä aliluvussa, tiedot talletetaan sanakirjaan, missä avaimena on opiskelijan nimi ja arvona taulukko viikkopisteistä:

```python
def lue_viikkopisteet(tiedostonimi):
    viikkopisteet = {}
    with open(tiedostonimi) as tiedosto:
        for rivi in tiedosto:
            osat = rivi.split(";")
            lista = []
            for pisteet in osat[1:]:
                lista.append(int(pisteet))
            viikkopisteet[osat[0]] = lista

    return viikkopisteet
```

Arvosanojen laskemista varten on tehty oma funktionsa, jota tiedostoon kirjoittava funktio hyödyntää:

```python
def arvosana(pisteet):
    if pisteet < 20:
        return 0
    elif pisteet < 25:
        return 1
    elif pisteet < 30:
        return 2
    elif pisteet < 35:
        return 3
    elif pisteet < 40:
        return 4
    else:
        return 5

def tallenna_tulokset(tiedostonimi, viikkopisteet):
    with open(tiedostonimi, "w") as tiedosto:
        for nimi, lista in viikkopisteet.items():
            summa = sum(lista)
            tiedosto.write(f"{nimi};{summa};{arvosana(summa)}\n")
```

Itse "pääohjelma" on nyt hyvin yksinkertainen. Huomaa, että luettavan ja kirjoitettavan tiedoston nimet annetaan funktioille parametrina:

```python
viikkopisteet = lue_viikkopisteet("viikkopisteet.csv")
tallenna_tulokset("tulokset.csv", viikkopisteet)
```

Suorituksen tuloksena oleva CSV-tiedosto näyttää seuraavalta:

<sample-data>

Pekka;18;0
Paula;34;3
Pirjo;26;2
Emilia;41;5

</sample-data>

Huomaa, miten ohjelma on koostettu suhteellisen yksinkertaisista, vain yhteen asiaan keskittyvistä funktioista. Tämä on yleisesti ottaen suositeltava tapa ohjelmoinnissa, se helpottaa ohjelman toiminnallisuuden varmistamista sekä myöhemmin ohjelmaan tehtävien muutosten sekä laajennusten tekemistä.

Jos esimerkiksi haluaisimme ohjelmaan toiminnallisuuden, joka tulostaa yhden opiskelijan arvosanan, olisi toiminnallisuus helppo koostaa käyttäen apuna jo valmiina olevaa arvosanan laskevaa funktiota:

```python
def hae_arvosana(haettava: str, viikkopisteet):
  for nimi, lista in viikkopisteet.items():
    if nimi == haettava:
      return arvosana(sum(lista))


viikkopisteet = lue_viikkopisteet("viikkopisteet.csv")
print(hae_arvosana("Paula", viikkopisteet))

```

<sample-data>

3

</sample-data>

Jos ohjelmasta halutaan muuttaa tai korjata "yhtä asiaa", esimerkiksi arvosanojen pisterajoja, kohdistuu muokkaus hyvin rakennetussa ohjelmassa ainoastaan yhteen tai muutamaan funktioon. Jos sama logiikka, esimerkiksi arvosanan laskeminen olisi kopioitu useaan paikkaan, kasvaisi riski että muutoksia ei muistettaisi tehdä kaikkiin oikeisiin paikkoihin.

<programming-exercise name='Kurssin tulokset, osa 4' tmcname='osa06-13_kurssin_tulokset_osa4'>

Laajennetaan vielä hieman aiemmin kurssien tulokset generoivaa sovellusta.

Tällä hetkellä tiedostosta luetaan opiskelijoiden nimet, tehtäväpisteet sekä koepisteet. Laajennetaan ohjelmaa siten, että myös kurssin nimi ja laajuus luetaan tiedostosta, jonka muoto on seuraava (tiedostosto on kirjoitettu ilman ääkkösiä, jotta se ei aiheuttaisi ongelmia Windowsissa):

<sample-data>

<pre>

nimi: Ohjelmoinnin perusteet
laajuus opintopisteina: 5
</pre>

</sample-data>

Ohjelma luo kaksi tiedostoa. Tiedoston `tulos.txt` on muoto seuraava:

<sample-data>

<pre>
Ohjelmoinnin perusteet, 5 opintopistettä
========================================
nimi                          teht_lkm  teht_pist koe_pist  yht_pist  arvosana
pekka peloton                 33        8         16        24        4
jaana javanainen              24        6         15        21        3
liisa virtanen                27        6         19        25        4
</pre>

</sample-data>

Tulokset kertova osa on siis samanlainen kuin tehtävän edellisen osan tulostus.

Tämän lisäksi luodaan tiedosto `tulos.csv`, jonka muoto on seuraava:

<sample-data>

<pre>
012345678;pekka peloton;4
012345678;jaana javanainen;3
012345678;liisa virtanen;4
</pre>

</sample-data>

Ohjelman suoritus näyttää seuraavalta:

<sample-output>

opiskelijatiedot: **opiskelijat.csv**
tehtävätiedot: **tehtavamaarat.csv**
koepisteet: **koepisteet.csv**
kurssin tiedot: **kurssi.txt**
Tulokset talletettu tiedostoihin tulos.txt ja tulos.csv

</sample-output>

Ohjelma siis ainoastaan kyselee tiedostojen nimet, mutta varsinaiset tulokset talleteaan ainoastaan tiedostoihin.

</programming-exercise>

<programming-exercise name='Henkilöt talteen' tmcname='osa06-14_henkilot_talteen'>

Kirjoita funktio `tallenna_henkilo(henkilo: tuple)` joka saa parametrikseen henkilöä kuvaavan tuplen. Tuplessa on seuraavat tiedot tässä järjestyksessä:

* Nimi (merkkijono)
* Ikä (kokonaisluku)
* Pituus (liukuluku)

Tallenna henkilön tiedot tiedostoon `henkilot.csv` olemassaolevien tietojen perään. Tiedot tulee tallentaa muodosssa

nimi;ikä;pituus

...eli yhden henkilön tiedot tulevat yhdelle riville. Jos funktiota esim. kutsuttaisiin parametrien arvoilla `('Kimmo Kimmonen', 37, 175.5)`, ohjelma kirjoittaisi tiedoston loppuun rivin

`Kimmo Kimmonen;37;175.5`


</programming-exercise>

<programming-exercise name='Sanahaku' tmcname='osa06-15_sanahaku'>

Tehtäväpohjasta löytyy tiedosto sanat.txt, joka sisältää englanninkielisiä sanoja.

Tehtäväsi on kirjoittaa funktio `hae_sanat(hakusana: str)`, joka palauttaa listana annetun hakusanan mukaiset sanat tiedostosta.

Hakusanassa voi käyttää pienten kirjainten lisäksi seuraavia erikoismerkkejä:

* Piste `.` tarkoittaa, että mikä tahansa merkki käy (esim `ca.` vastaa vaikkapa sanoja cat ja car, `p.ng` sanoja ping ja pong ja `.a.e` sanoja sane, care tai late.
* Asteriski `*` tarkoittaa, että sanan alku- tai loppuosaksi käy mikä tahansa jono, esim. `ca*` vastaa vaikkapa sanoja california, cat, caring tai catapult. Vastaavasti hakusana `*ane` vastaa vaikkapa sanoja crane, insane tai aeroplane. Voit olettaa, että asteriski on aina joko hakusanan alussa tai lopussa, ja että hakusanassa esiintyy korkeintaan yksi asteriski.
* Jos hakusanassa ei ole erikoismerkkejä, haetaan vain täsmälleen hakusanaa vastaava sana.

Sovitaan, että samassa hakusanassa ei voi käyttää molempia erikoismerkkejä.

Sanat ovat tiedostossa kokonaan pienillä kirjaimilla kirjoitettuna. Voit myös olettaa, että funktion parametri on annettu kokonaan pienillä kirjaimilla.

Jos yhtään tulosta ei löydy, funktio palauttaa tyhjän listan.

Vinkki: Pythonin merkkijonometodeista startswith() ja endswith() saattaa olla hyötyä tehtävässä, googlaa niiden toiminta tarvittaessa tarkemmin!

Esimerkki funktion kutsumisesta:

```python

print(hae_sanat("*vokes"))

```

<sample-output>

['convokes', 'equivokes', 'evokes', 'invokes', 'provokes', 'reinvokes', 'revokes']

</sample-output>

</programming-exercise>

<programming-exercise name='Muistava sanakirja' tmcname='osa06-16_muistava_sanakirja'>

Tee sanakirjaa mallintava ohjelma, johon voi syöttää uusia sanoja tai josta voi hakea syötettyjä sanoja.

Ohjelman tulee toimia näin:

<sample-output>

1 - Lisää sana, 2 - Hae sanaa, 3 - Poistu
Valinta: **1**
Anna sana suomeksi: **auto**
Anna sana englanniksi: **car**
Sanapari lisätty

1 - Lisää sana, 2 - Hae sanaa, 3 - Poistu
Valinta: **1**
Anna sana suomeksi: **roska**
Anna sana englanniksi: **carbage**
Sanapari lisätty

1 - Lisää sana, 2 - Hae sanaa, 3 - Poistu
Valinta: **1**
Anna sana suomeksi: **laukku**
Anna sana englanniksi: **bag**
Sanapari lisätty

1 - Lisää sana, 2 - Hae sanaa, 3 - Poistu
Valinta: **2**
Anna sana: **bag**
roska - carbage
laukku - bag

1 - Lisää sana, 2 - Hae sanaa, 3 - Poistu
Valinta: **2**
Anna sana: **car**
auto - car
roska - carbage

1 - Lisää sana, 2 - Hae sanaa, 3 - Poistu
Valinta: **2**
Anna sana: **laukku**
laukku - bag

1 - Lisää sana, 2 - Hae sanaa, 3 - Poistu
Valinta: **3**
Moi!

</sample-output>

Sanat tallennetaan tiedostoon `sanakirja.txt`. Ohjelma lukee tiedoston sisällön kun se käynnistetään. Uudet sanaparit lisätään tiedostoon aina tallennuksen yhteydessä.

Voit itse päättää tiedostoon tallennettavan tiedon muodon.

Huomaa, että paikallisten TMC-testien ajaminen voi tyhjentää sanakirja-tiedoston.

</programming-exercise>

<quiz id="1f1da85c-371a-52b2-b487-e574ec7092b0"></quiz>
