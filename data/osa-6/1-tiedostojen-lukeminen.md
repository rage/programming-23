---
path: '/osa-6/1-tiedostojen-lukeminen'
title: 'Tiedostojen lukeminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, miten tiedoston sisällön voi lukea Pythonissa
- Tiedät, mitä ovat tekstitiedosto ja CSV-tiedosto
- Osaat purkaa ja käsitellä CSV-tiedoston sisällön ohjelmassa

</text-box>

Yksi tavallinen ohjelmoinnin käyttötarkoitus on käsitellä tiedostoissa olevaa tietoa. Ohjelmakoodin avulla voimme lukea tietoa tiedostoista sekä tallentaa ohjelman tuloksia tiedostoihin. Tiedostojen avulla voimme käsitellä suuriakin aineistoja automaattisesti ohjelmien avulla.

Oletamme tällä kurssilla, että käsiteltävät tiedostot ovat _tekstitiedostoja_ eli ne muodostuvat riveistä, joilla on tekstiä. Esimerkiksi kurssilla käytetty Visual Studio Code -editori käsittelee tekstitiedostoja. Huomaa, että esimerkiksi Word-dokumentti ei ole tekstitiedosto, vaan siinä on tekstin lisäksi muotoilutietoja ja sen käsittely ohjelmallisesti olisi vaikeaa.

## Tiedostosta lukeminen

Käytetään esimerkkinä tiedostoa `esimerkki.txt`, jonka sisältönä on:

<sample-data>

Moi kaikki!
Esimerkkitiedostomme on kolmerivinen.
Viimeinen rivi.

</sample-data>

Hyvä tapa käsitellä tiedostoja Pythonissa on käyttää `with`-lausetta, jonka alkurivi avaa tiedoston. Tämän jälkeen tulee lohko, jonka sisällä tiedostoa voi käsitellä. Lohkon jälkeen tiedosto sulkeutuu automaattisesti, eikä sitä voi enää käsitellä.

Esimerkiksi seuraava koodi lukee ja tulostaa tiedoston sisällön:

```python
with open("esimerkki.txt") as tiedosto:
    sisalto = tiedosto.read()
    print(sisalto)
```

<sample-output>

Moi kaikki!
Esimerkkitiedostomme on kolmerivinen.
Viimeinen rivi.

</sample-output>

Koodissa muuttuja `tiedosto` on _tiedostokahva_, jonka kautta tiedostoa voi käsitellä avaamisen jälkeen. Tässä tapauksessa käytämme metodia `read`, joka palauttaa koko tiedoston sisällön yhtenä merkkijonona. Tässä tapauksessa palautettu merkkijono on seuraava:

```
"Moi kaikki!\nEsimerkkitiedostomme on kolmerivinen.\nViimeinen rivi."
```

TODO: Miten tämä toimii Windowsissa, näkyykö tässä tilanteessa merkkijonossa `\n` vai `\r\n`?

## Tiedoston sisällön läpikäynti

Metodi `read` on näppärä, jos halutaan esimerkiksi tulostaa sisältö kokonaisuudessaan ruudulle. Usein haluamme kuitenkin käsitellä tiedostoa rivi kerrallaan.

Voimme käyttää tiedoston sisällön lukemiseen `for`-silmukkaa, joka käy läpi tiedoston rivit yksi kerrallaan – siis samaan tapaan kuin esimerkiksi listan läpikäynnissä.

Seuraava esimerkki lukee saman tiedoston nyt käyttäen `for`-silmukkaa, poistaa joka rivin perästä rivinvaihdon ja laskee rivien yhteispituuden:

```python
with open("esimerkki.txt") as tiedosto:
    laskuri = 0
    yhteispituus = 0

    for rivi in tiedosto:
        rivi = rivi.replace("\n","")
        laskuri += 1
        print("Rivi",laskuri,rivi)
        pituus = len(rivi)
        yhteispituus += pituus

print("Rivien yhteispituus:",yhteispituus)
```

<sample-output>

Rivi 1 Moi kaikki!
Rivi 2 Esimerkkitiedostomme on kolmerivinen.
Rivi 3 Viimeinen rivi.
Rivien yhteispituus: 63

</sample-output>

Huomaa, että rivien läpikäynnissä jokaisen rivin perässä on rivinvaihto `\n`. Yllä oleva koodi kuitenkin poistaa rivinvaihdot `replace`-funktiolla, joka korvaa rivinvaihdot tyhjillä merkkijonoilla. Tämän ansiosta tulostukseen ei tule ylimääräisiä rivivaihtoja ja ohjelma laskee oikein tiedoston rivien yhteispituuden.

<programming-exercise name='Suurin luku' tmcname='osa06-01_suurin_luku'>

Tiedostoon luvut.txt on talletettu lukuja, yksi luku per rivi seuraavan esimerkin mukaisesti:

```sh
2
45
108
3
-10
1100
...jne...
```

Kirjoita funktio `suurin()`, joka lukee tiedoston ja palauttaa suurimman tiedostosta löytyvän luvun.

</programming-exercise>

## CSV-tiedoston lukeminen

CSV-tiedosto (_Comma Separated Values_) on tekstitiedosto, jonka jokaisella rivillä on tietyllä välimerkillä erotettua tietoa. Välimerkkinä on usein pilkku `,` tai puolipiste `;`, mutta mikä tahansa muukin merkki on periaatteessa mahdollinen.

CSV-tiedostoja käytetään usein erilaisten aineistojen esittämiseen. Myös Excelin ja muiden taulukkolaskentaohjelmien taulukot voidaan tallentaa CSV-muodossa, jolloin niitä on helppo käsitellä muilla ohjelmilla.

Voimme lukea CSV-tiedoston rivit `for`-silmukalla, mutta miten erottaa rivillä olevat tiedot toisistaan? Helppo tapa on käyttää merkkijonojen `split`-metodia: metodille annetaan haluttu välimerkki, ja se palauttaa tiedot eroteltuna välimerkin mukaan listana merkkijonoja.

TODO: Kuva tähän?

Esimerkki metodin käytöstä:

```python
teksti = "apina,banaani,cembalo"
sanat = teksti.split(",")
for sana in sanat:
    print(sana)
```

<sample-output>

apina
banaani
cembalo

</sample-output>

Tarkastellaan esimerkkinä tiedostoa `arvosanat.csv`, joka sisältää jokaisella rivillä aluksi opiskelijan nimen ja sen jälkeen tämän eri kursseista saamat arvosanat. Tiedot on erotettu toisistaan puolipisteillä.

<sample-data>

Pekka;5;4;5;3;4;5;5;4;2;4
Paula;3;4;2;4;4;2;3;1;3;3
Pirjo;4;5;5;4;5;5;4;5;4;4

</sample-data>

Esimerkiksi seuraava ohjelma käy läpi tiedoston rivit, jakaa jokaisen rivin osiin ja näyttää opiskelijan nimen sekä arvosanat.

```python
with open("arvosanat.csv") as tiedosto:
    for rivi in tiedosto:
        rivi = rivi.replace("\n", "")
        osat = rivi.split(";")
        nimi = osat[0]
        arvosanat = osat[1:]
        print("Nimi:", nimi)
        print("Arvosanat:", arvosanat)
```

<sample-output>

Nimi: Pekka
Arvosanat: ['5', '4', '5', '3', '4', '5', '5', '4', '2', '4']
Nimi: Paula
Arvosanat: ['3', '4', '2', '4', '4', '2', '3', '1', '3', '3']
Nimi: Pirjo
Arvosanat: ['4', '5', '5', '4', '5', '5', '4', '5', '4', '4']

</sample-output>

<programming-exercise name='Hedelmäkauppa' tmcname='osa06-02_hedelmakauppa'>

Tiedostosta hedelmat.csv löytyy hedelmiä hintoineen seuraavan esimerkin mukaisesti:

```sh
banaani;6.50
omena;4.95
appelsiini;8.0
...jne...
```

Kirjoita funktio `lue_hedelmat()`, joka lukee hedelmätiedoston ja muodostaa siitä sanakirjan, jossa hedelmän nimi on avain on ja hinta arvo.

Lopuksi funktio palauttaa tämän sanakirjan.

</programming-exercise>

<programming-exercise name='Matriisi' tmcname='osa06-03_matriisi'>

Tiedostosta matriisi.txt löytyy seuraavan esimerkin kaltainen matriisi:

```sh
1,0,2,8,2,1,3,2,5,2,2,2
9,2,4,5,2,4,2,4,1,10,4,2
...jne...
```

Kirjoita funktiot `summa` ja `maksimi`, jotka lukevat ja palauttavat nimensä mukaisesti matriisin kaikkien alkioiden summan ja suurimman alkion.

Kirjoita lisäksi funktio `rivisummat`, joka palauttaa listassa kaikkien matriisin rivien summat. Esimerkiksi matriisille

```sh
1,2,3
2,3,4
```

funktio palauttaisi listan `[6, 9]`.

VINKKI: Voit kirjoittaa ohjelmaan myös muita funktioita - kannattaa siis miettiä mitä kaikkia yhteisiä toimintoja kolmea funktiota varten vaaditaan.

</programming-exercise>

## Lisää csv-tiedoston käsittelyä

Jatketaan opiskelijoiden arvosanoja sisältävän tiedoston `arvosanat.csv` käsittelyä. Tiedoston näyttä siis seuraavalta:

<sample-data>

Pekka;5;4;5;3;4;5;5;4;2;4
Paula;3;4;2;4;4;2;3;1;3;3
Pirjo;4;5;5;4;5;5;4;5;4;4

</sample-data>

Seuraava ohjelma luo tiedoston perusteella sanakirjan `arvosanat`, jossa jokainen avain on opiskelijan nimi ja vastaava arvo on lista arvosanoista. Ohjelma muuttaa arvosanat kokonaisluvuiksi, jotta niitä on mukavampaa käsitellä myöhemmin.

```python
arvosanat = {}
with open("arvosanat.csv") as tiedosto:
    for rivi in tiedosto:
        rivi = rivi.replace("\n","")
        osat = rivi.split(";")
        nimi = osat[0]
        arvosanat[nimi] = []
        for arvosana in osat[1:]:
            arvosanat[nimi].append(int(arvosana))

print(arvosanat)
```

<sample-output>

{'Pekka': [5, 4, 5, 3, 4, 5, 5, 4, 2, 4], 'Paula': [3, 4, 2, 4, 4, 2, 3, 1, 3, 3], 'Pirjo': [4, 5, 5, 4, 5, 5, 4, 5, 4, 4]}

</sample-output>

Tämän jälkeen voimme vaikkapa tulostaa analyysin arvosanoista käymällä läpi sanakirjan `arvosanat` perusteella:

```python
for nimi, lista in arvosanat.items():
    paras = max(lista)
    keskiarvo = sum(lista) / len(lista)
    print(f"{nimi}: paras arvosana {paras}, keskiarvo {keskiarvo:.2f}")
```

<sample-output>

Pekka: paras arvosana 5, keskiarvo 4.10
Paula: paras arvosana 4, keskiarvo 2.90
Pirjo: paras arvosana 5, keskiarvo 4.50

</sample-output>

Kannattaa tutustua huolella esimerkkikoodiin. Se voi ensisilmäyksellä vaikuttaa monimutkaiselta, mutta ratkaisu on helposti sovellettavissa monenlaisiin datatiedostoihin.

## Eroon turhista riveistä, välilyönneistä ja rivinvaihdoista

Olemme tallentaneet excelistä nimiä taulukon csv-muodossa:

```sh
etunimi; sukunimi
Pekka; Python
Jaana; Java
Heikki; Haskell
```

Kuten tyypillistä, excel on lisännyt sarakkeiden väliin erottimena toimivan kaksoispisteen lisäksi myös välilyönnin.

Haluamme tulostaa listalla olevat sukunimet. Koska ensimmäinen rivi kertoo sarakkeiden otsikot, ohitamme sen:

```python
sukunimet = []
with open("henkilot.csv") as tiedosto:
for rivi in tiedosto:
    osat = rivi.split(';')
    # ohitetaan otsikkorivi
    if osat[0] == "etunimi":
        continue
    sukunimet.append(osat[1])

print(sukunimet)
```

Tulostus näyttää seuraavalta:

<sample-output>

[' Python\n', ' Java\n', ' Haskell']

</sample-output>

Kaikkiin paitsi viimeiseen rivin sukunimeen on jäänyt mukaan rivinvaihtomerkki, ja jokaisen sukunimen alkuun on jäänyt ikävä välilyönti.

Pääsisimme näistä eroon aiempien esimerkkien tapaan käyttämällä metodia `replace`, mutta parempi vaihtoehto tässä tilanteessa on käyttää metodia `strip`, joka poistaa merkkijonon alusta ja lopusta ns. whitespace-merkit, eli välilyönnit, rivinvaihdot ja muut normaalina merkkinä tulostumattomat merkit.

Kokeillaan metodin toimintaa konsolissa:

```python
>>> " koe ".strip()
'koe'
>>> "\n\ntesti\n".strip()
'testi'
>>>
```

Korjaus on helppo:

```python
sukunimet = []
with open("h.csv") as tiedosto:
for rivi in tiedosto:
    osat = rivi.split(';')
    if osat[0] == "etunimi":
        continue # tämä oli otsikkorivi, ei huomioida!
    sukunimet.append(osat[1].strip())
print(sukunimet)
```

tulostus on nyt halutun kaltainen

<sample-output>

['Python', 'Java', 'Haskell']

</sample-output>

Merkkijonoilla on myös metodit `lstrip` ja `rstrip`, jotka poistavat ainoastaan merkkijono vasemmalla tai oikealla puolella olevia merkkejä.

```python
>>> " testimerkkijono  ".rstrip()
' testimerkkijono'
>>> " testimerkkijono  ".lstrip()
'testimerkkijono  '
```

<programming-exercise name='Kurssin tulokset, osa 1' tmcname='osa06-04_kurssin_tulokset_osa1'>

Ohjelma käsittelee kahta csv-muotoista tiedostoa. Toisessa on tieto opiskelijoista:

```csv
opnro;etunimi;sukunimi
12345678;pekka;peloton
12345687;jaana;javanainen
12345699;liisa;virtanen
```

ja toisessa opiskelijoiden viikoittaisesta tehtävien lukumäärästä:

```csv
opnro;v1;v2;v3;v4;v5;v6;v7
12345678;4;1;1;4;5;2;4
12345687;3;5;3;1;5;4;6
12345699;10;2;2;7;10;2;2
```

Molempien csv-tiedotojen ensimmäinen rivi on otsikkorivi, joka kertoo kunkin kentän sisällön.

Tee ohjelma, joka kysyy tiedostojen nimet ja tämän jälkeen tulostaa kunkin opiskelijan tehtävien yhteenlasketun määrän. Ohjelma toimii seurasti jos tiedostojen sisältö on ylläoleva:

<sample-output>

opiskelijatiedot: **opiskelijat1.csv**
tehtävätiedot: **tehtavamaarat1.csv**
pekka peloton 21
jaana javanainen 27
liisa virtanen 35

</sample-output>

**PROOTIP** Ohjelman testaileminen siten että käyttäjän on kirjotiettava testisyöte käsin on toivottoman hidasta. Testausvaiheessa syötteet kannattaakin antaa "kovakoodaamalla" ne esim. seuraavasti:

```python
if False:
    # tänne ei tulla
    opiskelijatiedot = input("opiskelijatiedot: ")
    tehtavatiedot = input("tehtävätiedot: ")
else:
    # kovakoodatut syötteet
    opiskelijatiedot = "opiskelijat1.csv"
    tehtavatiedot = "tehtavat1.csv"
```

Ohjelman varsinainen toiminnallisuus on nyt "piilotettu" `if`:in `False`-haaraan, jota ei suoriteta koskaan.

Jos taas halutaan nopeasti tarkastaa toimiiko onhjelma myös käyttäjän kirjoittaessa syötteen, voidaan `False` muuttaa arvoksi `True`:

```python

if True:
    opiskelijatiedot = input("opiskelijatiedot: ")
    tehtavatiedot = input("tehtävätiedot: ")
else:
    # tänne ei tulla!
    opiskelijatiedot = "opiskelijat1.csv"
    tehtavatiedot = "tehtavat1.csv"
```

Kun koodi on kunnossa, voi `if`:in poistaa.

</programming-exercise>

<programming-exercise name='Kurssin tulokset, osa 2' tmcname='osa06-05_kurssin_tulokset_osa2'>

Edellinen tehtävä laajenee vielä siten, että myös opiskelijan koepisteet luetaan csv-tiedostosta. Tiedoston sisältä näyttää seuraavalta:

```csv
opnro;k1;k2;k3
12345678;4;1;4
12345687;3;5;3
12345699;10;2;2
```

Ohjelma kysyy tiedostojen nimet ja tulostaa jokaisen opiskelijan arvosanan:

<sample-output>

opiskelijatiedot: **opiskelijat1.csv**
tehtävätiedot: **tehtavamaarat1.csv**
koepisteet: **koepisteet1.csv**
pekka peloton 0
jaana javanainen 1
liisa virtanen 3

</sample-output>

Tehtyjen harjoitustehtävien määrästä saa kurssipisteitä, siten että min 10% tehtävämäärästä tuo 1 kurssipisteen, 20% tuo 2 kurssipistettä jne ja 100% eli 40 harjoitustehtävää tuo 10 kurssipistettä. Harjoitustehtävistä saatava kurssipistemäärä on kokonaisluku.

Kurssin arvosana määräytyy seuraavan taulukon mukaan:

koe+harjoituspisteet   | arvosana
:--:|:----:
0-14 | 0 (eli hylätty)
15-17 | 1
18-20 | 2
21-23 | 3
24-27 | 4
28-30 | 5

</programming-exercise>

<programming-exercise name='Kurssin tulokset, osa 3' tmcname='osa06-06_kurssin_tulokset_osa3'>

Tässä tehtävässä muotoillaan edellisen tehtävän tulostus parempaan muotoon:

<sample-output>

opiskelijatiedot: **opiskelijat.csv**
tehtävätiedot: **tehtavamaarat.csv**
koepisteet: **koepisteet.csv**
<pre>
nimi                          teht_lkm  teht_pist koe_pist  yht_pist  arvosana
pekka peloton                 33        8         16        24        4
jaana javanainen              24        6         15        21        3
liisa virtanen                27        6         19        25        4
</pre>

</sample-output>

Jokaisella rivillä siis tulostetaan opiskelijan tehtävien lukumäärä, tehtävistä saatavat kurssipisteet, koepisteet, yhteispisteet sekä arvosana "siististi" siten, että tulostus on jaoteltu sarakkeisiin. Nimisarakkeen levyes on 30 merkkiä ja muiden sarakkeiden levys tasan 10 merkkiä.

Tehtävässä kannattaa käyttää [osassa 4](/osa-4/5-tulostuksen-muotoilu) käsitellyt f-stringejä.

</programming-exercise>

<programming-exercise name='Spell checker' tmcname='osa06-07_spellchecker'>

Tee ohjelma, joka pyytää käyttäjää kirjoittamaan rivin englanninkielistä tekstiä. Ohjelma suorittaa tekstille oikeinkirjoitustarkistuksen ja tulostaa saman tekstin siten, että kaikki väärin kirjoitetut sanat on ympäröity tähdillä. Seuraavassa kaksi käyttöesimerkkiä:

<sample-output>

write text: **We use ptython to make a spell checker**
<pre>
We use *ptython* to make a spell checker
</pre>

</sample-output>

<sample-output>

write text: **this is acually a good and usefull program**
<pre>
this is *acually* good and *usefull* program
</pre>

</sample-output>

Kirjainten koolla ei ole merkitystä ohjelman toiminnan kannalta.

Ohjelma tunnistaa oikein kirjoitetut sanat käyttämällä tehtäväpohjassa olevaa tiedostoa _wordlist.txt_

</programming-exercise>

<programming-exercise name='Reseptihaku' tmcname='osa06-08_reseptihaku'>

Tässä tehtävässä tehdään ohjelma, joka tarjoaa käyttäjälle mahdollisuuden reseptien hakuun reseptin nimen, valmistusajan tai raaka-aineen nimen perusteella. Ohjelman lukee reseptit käyttäjän antamasta tiedostosta.

Jokainen resepti koostuu kolmesta tai useammasta rivistä reseptitiedostossa. Ensimmäisellä rivillä on reseptin nimi, toisella rivillä reseptin valmistusaika (kokonaisluku), ja kolmas ja sitä seuraavat rivit kertovat reseptin raaka-aineet. Reseptin raaka-aineiden kuvaus päättyy tyhjään riviin. Tiedostossa voi olla useampia reseptejä. Alla kuvattuna esimerkkitiedosto.

```sh
Lettutaikina
15
maito
kananmuna
jauho
sokeri
suola
voi

Lihapullat
45
jauheliha
kananmuna
korppujauho

Tofurullat
30
tofu
riisi
vesi
porkkana
kurkku
avokado
wasabi

Pullataikina
60
maito
hiiva
kananmuna
suola
sokeri
kaardemumma
voi
```

#### Reseptien haku nimen perusteella

Tee funktion `hae_nimi(tiedosto: str, sana: str)` joka hakee parametrina annetun nimisestä tiedostosta reseptit, joiden nimessä esiintyy toisena parametrina annettu merkkijono. Funktio palauttaa listan, missä kutakin löydettyä reseptiä vastaa merkkijono, joka kertoo reseptin nimen.

Esimerkki funktion käytöstä:

```python
loydetyt = hae_nimi('reseptit.txt', 'pulla')

for resepti in loydetyt:
    print(resepti)
```

<sample-output>

Lihapullat
Pullataikina

</sample-output>

Huomaa, että hakusanojen kirjainten koolla ei ole merkitystä, eli hakusana _pulla_ löytää myös reseptin _Pullataikina_, joka alkaa isolla kirjaimella.

#### Reseptien hakeminen valmistusaika perusteella

Tee funktion `hae_aika(tiedosto: str, aika: int)` joka hakee parametrina annetun nimisestä tiedostosta reseptit, joiden valmistusaika on korkeintaan parametrina kerrottu minuuttimäärä.

Kriteerin täyttäävät reseptit palautetaan edellisen tehtävän tapaan listana, nyt kerrotaan myös reseptin valmistumisaika. Esimerkki funktion käytöstä:

```python
loydetyt = hae_aika('reseptit.txt', 20)

for resepti in loydetyt:
    print(resepti)
```

<sample-output>

Lettutaikina, valmistusaika 15 min

</sample-output>

#### Reseptien hakeminen raaka-aineen perusteella

Tee funktion `hae_raakaaine(tiedosto: str, aine: str)` joka hakee parametrina annetun nimisestä tiedostosta reseptit, jotka sisältävät toisena parametrina annetun raaka-aineen.

Kriteerin täyttäävät reseptit palautetaan edellisen tehtävän tapaan listana. Esimerkki funktion käytöstä:

```python
loydetyt = hae_aika('reseptit.txt', 'maito')

for resepti in loydetyt:
    print(resepti)
```

<sample-output>

Lettutaikina, valmistusaika 15 min
Pullataikina, valmistusaika 60 min

</sample-output>

</programming-exercise>

<programming-exercise name='Kaupunkipyörät' tmcname='osa06-09_kaupunkipyorat'>

Tässä tehtävässä tehdään muutama funktio, joiden avulla voidaan tarkastella [kaupunkipyörien](https://kaupunkipyorat.hsl.fi/fi) asemien sijaintia sisältävää tiedostoa.

Tiedostot näyttävät seuraavilta:

```csv
Longitude;Latitude;FID;name;total_slot;operative;id
24.950292890004903;60.155444793742276;1;Kaivopuisto;30;Yes;001
24.956347471358754;60.160959093887129;2;Laivasillankatu;12;Yes;002
24.944927399779715;60.158189199971673;3;Kapteeninpuistikko;16;Yes;003
```

Kutakin asemaa kohti tiedostossa on yksi rivi, joka kertoo aseman kordinaatit, aseman nimen ja muuta tunnistetietoa.

#### asemien välinen etäisyys

Tee ensin funktio `hae_asematiedot(tiedosto:str)`, joka lukee asematiedot tiedostosta ja palauttaa ne sanakirjana, joka näyttää

<sample-output>

<pre>
{
  "Kaivopuisto: (24.950292890004903, 60.155444793742276),
  "Laivasillankatu: (24.956347471358754, 60.160959093887129),
  "Kapteeninpuistikko: (24.944927399779715;60.158189199971673)
}
</pre>

</sample-output>

Eli sanakirjan avaimena on aseman nimi ja arvona tuple, joka koostuu aseman kordinaateista, ensimäisenä _Longitude_ ja toisena _Latitude_.

Tee seuraavaksi funktio `etaisyys(asemat: dir, asema1: str, asema2: str)`, joka palauttaa parametrina kerrottujen asemien välisen etäisyyden.

Etäisyys lasketaan seuraavalla kaavalla (hyödyntäen Pythagoran kaavaa):

```python
# tämä rivi tarvitaan, jotta saadaan käyttöön metodi sqrt
import math

x_kilometreina = (longitude1 - longitude2) * 55.26
y_kilometreina = (latitude1 - latitude2) * 111.2
math.sqrt(x_kilometreina**2 + y_kilometreina**2)
```

Esimerkisuorituksia:

```python
asemat = hae_asematiedot('stations1.csv')
e = etaisyys(asemat, "Designmuseo", "Hietalahdentori")
print(e)
e = etaisyys(asemat, "Viiskulma", "Kaivopuisto")
print(e)
```

<sample-output>

0.9032737292463177
0.7753594392019532

</sample-output>

#### pisin välimatka

Tee funktio `suurin_etaisyys(asemat: dir)`, joka selvittää mitkä kaiksi asemaa ovat kauimpana toisistaan. Funktio palauttaa tuplen, jonka ensimmäiset kaksi arvoa kertovat asemien nimet ja kolmas arvo niiden välisen etäisyyden.

```python
asemat = hae_asematiedot('stations1.csv')
asema1, asema2, etaisyys = suurin_etaisyys(asemat)
```

<sample-output>

0.9032737292463177
0.7753594392019532

</sample-output>

</programming-exercise>
