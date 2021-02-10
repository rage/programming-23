---
path: '/osa-6/2-tiedostojen-kirjoittaminen'
title: 'Tiedostojen kirjoittaminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat luoda itse tiedoston Pythonilla
- Osaat kirjoittaa tekstimuotoista tietoa tiedostoon
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

**Huom:** tässä tehtävässä (eikä missään muussakaan tehtävissä missä _ei_ erikseen pyydetä funktioiden toteuttamista) mitään koodia __ei tule sijoittaa__
`if __name__ == "__main__"`-lohkoon!


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

Tiedon lisääminen tiedostoon on kuitenkin suhteellisen harvoin tarvittava operaatio.

Tiedostoon lisäämisen sijaan on usein yksinkertaisinta kirjoittaa tiedosto kokonaan uudelleen. Näin joudutaan useimmiten tekemään jos esimerkiksi tiedoston sisältö muuttuu keskeltä tiedostoa.

<programming-exercise name='Päiväkirja' tmcname='osa06-11_paivakirja'>

Tee ohjelma, joka mallintaa yksinkertaista päiväkirjaa. Ohjelman tulee tallentaa päiväkirjamerkinnät tiedostoon `paivakirja.txt`. Kun ohjelma käynnistetään, se lukee merkinnät tiedostosta.

Huom! Paikalliset testit voivat muuttaa tiedoston sisältöä - kopioi siis tiedosto talteen ennen testien ajamista, jos haluat säilyttää sen sisällön.

Ohjelman tulee toimia seuraavan esimerkin mukaisesti:

<sample-output>

1 - lisää merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **1**
Anna merkintä: **Tänään söin puuroa**
Päiväkirja tallennettu

1 - lisää merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **2**
Merkinnät:
Tänään söin puuroa
1 - lisää merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **1**
Anna merkintä: **Illalla kävin saunassa**
Päiväkirja tallennettu

1 - lisää merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **2**
Merkinnät:
Tänään söin puuroa
Illalla kävin saunassa
1 - lisää merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **0**
Heippa!

</sample-output>

Uusi käynnistys:

<sample-output>

1 - lisää merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **2**
Merkinnät:
Tänään söin puuroa
Illalla kävin saunassa
1 - lisää merkintä, 2 - lue merkinnät, 0 - lopeta
Valinta: **0**
Heippa!

</sample-output>

**Huom:** tässä tehtävässä (eikä missään muussakaan tehtävissä missä _ei_ erikseen pyydetä funktioiden toteuttamista) mitään koodia __ei tule sijoittaa__
`if __name__ == "__main__"`-lohkoon!


</programming-exercise>

## CSV-tiedoston kirjoittaminen

CSV-tiedoston voi kirjoittaa rivi riviltä `write`-metodilla. Esimerkiksi seuraava esimerkki luo tiedoston `koodarit.csv`, jonka jokaisella rivillä on koodarin nimi, työympäristö, lempikieli ja kokemus vuosissa. Tiedot on erotettu puolipisteillä.

```python
with open("koodarit.csv", "w") as tiedosto:
    tiedosto.write("Erkki;Windows;Pascal;10\n")
    tiedosto.write("Matti;Linux;PHP;2\n")
    tiedosto.write("Antti;Linux;Java;17\n")
    tiedosto.write("Emilia;Mac;Cobol;9\n")
```

Tämän tuloksena on seuraava tiedosto:

<sample-output>

Erkki;Windows;Pascal;10
Matti;Linux;PHP;2
Antti;Linux;Java;17
Emilia;Mac;Cobol;9

</sample-output>

Tarkastellaan sitten tilannetta, jossa tiedostoon kirjoitettavat tiedot ovatkin muistissa listoina:

```python
koodarit = []
koodarit.append(["Erkki", "Windows", "Pascal", 10])
koodarit.append(["Matti", "Linux", "PHP", 2])
koodarit.append(["Antti", "Linux", "Java", 17])
koodarit.append(["Emilia", "Mac", "Cobol", 9])
```

Nyt voimme kirjoittaa koodarien tiedot CSV-tiedostoon näin:

```python
with open("koodarit.csv", "w") as tiedosto:
    for koodari in koodarit:
        rivi = f"{koodari[0]};{koodari[1]};{koodari[2]};{koodari[3]}"
        tiedosto.write(rivi+"\n")
```

Jos koodaria kuvaavissa listoissa olisi suuri määrä alkioita, olisi csv-tiedostoon kirjoitetavien rivien muodostaminen yllä olevalla tekniikalla työläähköä, ja rivit kannattaisikin koota silmukan avulla:

```python
with open("koodarit.csv", "w") as tiedosto:
    for koodari in koodarit:
        rivi = ""
        for arvo in koodari:
            rivi += f"{arvo};"
        rivi = rivi[:-1]
        tiedosto.write(rivi+"\n")
```

## Tiedoston tyhjentäminen ja poisto

Joissain tilanteissa ohjelmassa on tarvetta tyhjentää olemassaolevan tiedoston sisältö. Tämä onnistuu avaamalla tiedosto kirjoitustilassa "w" ja sulkemalla tiedosto välittömästi:

```python
with open("tyhjennettava_tiedosto.txt", "w") as tiedosto:
    pass
```

Nyt `with`-lohkossa on ainoastaan komento `pass`, joka ei tee mitään. Komento tarvitaan, sillä Python ei salli sellaisia lohkoja missä ei ole mitään komentoja.

Tiedoston tyhjennys on mahdollista tehdä myös ilman `with`-lohkokon käyttöä:

```python
open('tyhjennettava_tiedosto.txt', 'w').close()
```

<text-box variant='hint' name='Tiedoston poistaminen'>

Tiedosto voidaan myös poistaa kokonaan. Poisto tapahtuu seuraavasti:

```python
# poisto-komento tuodaan koodin käyttöön import-lauseella
import os

os.remove("tarpeeton_tiedosto.csv")
```

Tämä ei kuitenkaan teknisten rajoitteiden takia toimi palvelimella suoritettavissa testeissä, joten käytä ylläolevia tapoja jos joudut tehtävissä tyhjentämään tiedoston.

</text-box>


<programming-exercise name='Aineiston suodatus' tmcname='osa06-12_aineiston_suodatus'>

Tiedostossa laskut.csv on tehtävien ratkaisuja seuraavan esimerkin mukaisesti:

```csv
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

*Huomaa* että funktion tulee toimia oikein siinäkin tapauksessa että funktiota kutsutaan monta kertaa perkkäin. Eli riippumatta siitä suoritatko funktion vain kerran

```python
suodata_laskut()
```

tai useita kertoja peräkkän

```python
suodata_laskut()
suodata_laskut()
suodata_laskut()
suodata_laskut()
```

tiedostojen sisältöjen tulee lopulta olla samat.

</programming-exercise>

<programming-exercise name='Henkilöt talteen' tmcname='osa06-13_henkilot_talteen'>

Kirjoita funktio `tallenna_henkilo(henkilo: tuple)` joka saa parametrikseen henkilöä kuvaavan tuplen. Tuplessa on seuraavat tiedot tässä järjestyksessä:

* Nimi (merkkijono)
* Ikä (kokonaisluku)
* Pituus (liukuluku)

Tallenna henkilön tiedot tiedostoon `henkilot.csv` olemassa olevien tietojen perään. Tiedot tulee tallentaa muodosssa

nimi;ikä;pituus

eli yhden henkilön tiedot tulevat yhdelle riville. Jos funktiota esim. kutsuttaisiin parametrien arvoilla `("Kimmo Kimmonen", 37, 175.5)`, ohjelma kirjoittaisi tiedoston loppuun rivin

`Kimmo Kimmonen;37;175.5`

</programming-exercise>

## Tiedon käsittely CSV:nä

Tehdään vielä lopuksi ohjelma, joka lukee CSV-tiedostosta opiskelijoiden viikoittaiset kurssipistemäärät ja laskee näiden avulla kurssin arvosanan. Lopuksi ohjelma luo CSV-tiedoston, josta selviää opiskelijan yhteispistemäärä sekä arvosana

Ohjelman lukema CSV-tiedosto näyttää seuraavalta:

<sample-data>

Pekka;4;2;3;5;4;0;0
Paula;7;2;8;3;5;4;5
Pirjo;3;4;3;5;3;4;4
Emilia;6;6;5;5;0;4;8

</sample-data>

Ohjelman logiikka on jaettu kolmeen funktioon. Tiedoston lukeminen tapahtuu samaan tapaan kuin edellisessä aliluvussa: tiedot talletetaan sanakirjaan, jossa avaimena on opiskelijan nimi ja arvona lista viikkopisteistä:

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
def hae_arvosana(haettava, viikkopisteet):
    for nimi, lista in viikkopisteet.items():
        if nimi == haettava:
            return arvosana(sum(lista))


viikkopisteet = lue_viikkopisteet("viikkopisteet.csv")
print(hae_arvosana("Paula", viikkopisteet))

```

<sample-data>

3

</sample-data>

Jos ohjelmasta halutaan muuttaa tai korjata "yhtä asiaa", esimerkiksi arvosanojen pisterajoja, kohdistuu muokkaus hyvin rakennetussa ohjelmassa ainoastaan yhteen tai muutamaan funktioon. Jos sama logiikka, esimerkiksi arvosanan laskeminen, olisi kopioitu useaan paikkaan, kasvaisi riski, että muutoksia ei muistettaisi tehdä kaikkiin oikeisiin paikkoihin.

<programming-exercise name='Kurssin tulokset, osa 4' tmcname='osa06-14_kurssin_tulokset_osa4'>

Laajennetaan vielä hieman aiemmin kurssien tulokset generoivaa sovellusta.

Tällä hetkellä tiedostosta luetaan opiskelijoiden nimet, tehtäväpisteet sekä koepisteet. Laajennetaan ohjelmaa siten, että myös kurssin nimi ja laajuus luetaan tiedostosta, jonka muoto on seuraava (tiedosto on kirjoitettu ilman ääkkösiä, jotta se ei aiheuttaisi ongelmia Windowsissa):

<sample-data>

<pre>

nimi: Ohjelmoinnin perusteet
laajuus opintopisteina: 5
</pre>

</sample-data>

Ohjelma luo kaksi tiedostoa. Tiedoston `tulos.txt` muoto on seuraava:

<sample-data>

<pre>
Ohjelmoinnin perusteet, 5 opintopistettä
========================================
nimi                          teht_lkm  teht_pist koe_pist  yht_pist  arvosana
pekka peloton                 21        5         9         14        0
jaana javanainen              27        6         11        17        1
liisa virtanen                35        8         14        22        3
</pre>

</sample-data>

Tulokset kertova osa on siis samanlainen kuin tehtävän edellisen osan tulostus.

Tämän lisäksi luodaan tiedosto `tulos.csv`, jonka muoto on seuraava:

<sample-data>

<pre>
12345678;pekka peloton;0
12345687;jaana javanainen;1
12345699;liisa virtanen;3
</pre>

</sample-data>

Ohjelman suoritus näyttää seuraavalta:

<sample-output>

opiskelijatiedot: **opiskelijat1.csv**
tehtävätiedot: **tehtavat1.csv**
koepisteet: **koepisteet1.csv**
kurssin tiedot: **kurssi1.txt**
Tulokset talletettu tiedostoihin tulos.txt ja tulos.csv

</sample-output>

Ohjelma siis ainoastaan kyselee tiedostojen nimet ja varsinaiset tulokset tallennetaan vain tiedostoihin.

**Huom:** tässä tehtävässä (eikä missään muussakaan tehtävissä missä _ei_ erikseen pyydetä funktioiden toteuttamista) mitään koodia __ei tule sijoittaa__
`if __name__ == "__main__"`-lohkoon!

</programming-exercise>



<programming-exercise name='Sanahaku' tmcname='osa06-15_sanahaku'>

Tehtäväpohjasta löytyy tiedosto `sanat.txt`, joka sisältää englanninkielisiä sanoja.

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
Anna sana englanniksi: **garbage**
Sanapari lisätty
1 - Lisää sana, 2 - Hae sanaa, 3 - Poistu
Valinta: **1**
Anna sana suomeksi: **laukku**
Anna sana englanniksi: **bag**
Sanapari lisätty
1 - Lisää sana, 2 - Hae sanaa, 3 - Poistu
Valinta: **2**
Anna sana: **bag**
roska - garbage
laukku - bag
1 - Lisää sana, 2 - Hae sanaa, 3 - Poistu
Valinta: **2**
Anna sana: **car**
auto - car
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

**Huom:** tässä tehtävässä (eikä missään muussakaan tehtävissä missä _ei_ erikseen pyydetä funktioiden toteuttamista) mitään koodia __ei tule sijoittaa__
`if __name__ == "__main__"`-lohkoon!


</programming-exercise>

<quiz id="55188fb7-3c0d-58a8-8419-20c2fabb7a70"></quiz>
