---
path: '/osa-3/1-ehdot-silmukoissa'
title: 'Ehdot silmukoissa'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat tehdä while-silmukan, jonka alkurivillä on ehto
- Tiedät, mikä merkitys alustuksella, ehdolla ja muutoksella on silmukassa
- Osaat käyttää erilaisia ehtoja silmukoissa

</text-box>

<text-box variant='hint' name='Kurssin tehtävien tekemisestä'>

Ohjelmointitaidon kehittyminen edellyttää vahvaa rutiinia ja myös omaa soveltavaa oivaltamista. Tämän takia kurssilla on paljon tehtäviä. Osa tehtävistä on kohtuullisen suoraviivaisesti materiaalia hyödyntäviä ja osa taas aivan tarkoituksella haastavampia soveltavia tehtäviä.

Ei kannata huolestua vaikka osa kurssin tehtävistä tuntuisikin ensiyrittämällä liian vaikealta. Kaikkia tehtäviä ei ole missään nimessä pakko tehdä, kuten [arvosteluperusteet](/arvostelu-ja-kokeet) toteavat: _Kurssin läpipääsyyn vaaditaan vähintään 25% jokaisen osan ohjelmointitehtävien pisteistä._

**Kurssin osien tehtävät eivät etene vaikeusjärjestyksessä.** Jokaisessa aliosassa esitellään yleensä muutama uusi konsepti, joita harjoitellaan sekä helpommilla että soveltavimmilla tehtävillä. **Jos törmäät liian haastavan tuntuiseen tehtävään, hyppää seuraavaan**. Voit palata vaikeimpiin tehtäviin osan lopuksi jos aikaa vielä jää.

Lohdutuksen sanana todettakoon että tällä viikolla mahdottomalta vaikuttava tehtävä näyttää melko varmasti neljän viikon päästä melko helpolta.

Huomaa, että pääset deadlinen jälkeen tutkimaan myös niiden tehtävien mallivastauksia, joita et ehtinyt tekemään. Mallivastausten tutkiminen lienee opettavaista vaikka saisitkin itse tehtävän ratkaistua.

</text-box>

Edellisen osan lopussa opimme käyttämään `while True` -silmukkaa koodin toistamiseen. Tässä tapauksessa silmukan ehtona on `True`, joka on aina tosi. Esimerkiksi

```python

# Tulosta lukuja kunnes muuttujan a arvo on 5
a = 1
while True:
    print(a)
    a += 1
    if a == 5:
        break
```

<sample-output>

1
2
3
4

</sample-output>

Silmukan toimintaa voidaan monipuolistaa lisäämällä tarkasteltava ehto `while`-määrittelyyn. Yleisemmin voimme siis käyttää silmukkaa näin:

```python
while <ehtolauseke>:
    <lohko>
```

Ideana on, että silmukka vuorotellen tarkastaa ehdon ja suorittaa lohkossa olevan koodin, jos ehto on tosi. Sitten kun ehto on epätosi, ohjelman suoritus jatkuu silmukan jälkeiseltä riviltä.

<img src="3_1_1.png">

Esimerkiksi seuraavassa silmukassa ehtona on `luku < 10` eli silmukan koodi suoritetaan, jos luku on alle 10.

```python
luku = int(input("Anna luku: "))

while luku < 10:
    print(luku)
    luku += 1

print("Suoritus valmis.")
```

Ohjelman tulostus voi olla seuraava:

<sample-output>

Anna luku: **4**
4
5
6
7
8
9
Suoritus valmis.

</sample-output>

Koska ehto tarkastetaan aina ennen silmukan koodin suoritusta, on mahdollista, ettei koodia suoriteta kertaakaan. Esimerkiksi:

<sample-output>

Anna luku: **12**
Suoritus valmis.

</sample-output>

Koska 12 ei ole pienempi kuin 10, ohjelma ei tulosta yhtään lukua.

## Alustus, testaus ja muutos

Monessa silmukassa on kolme osaa: alustus, ehto ja muutos.

_Alustus_ tarkoittaa silmukassa käytettävän muuttujan tai muuttujien alkuarvojen antamista. Tämä vaihe tehdään ennen silmukkaa. _Ehto_ kirjoitetaan silmukan alkuun, ja se määrittelee, kuinka kauan silmukkaa suoritetaan. Joka kierroksella tapahtuva _muutos_ vie silmukan askeleen lähemmäs sen loppumista. Esimerkiksi:

<img src="3_1_2.png">

Jos jokin kolmesta osasta puuttuu, silmukka ei toimi oikein. Yksi tyypillinen virhe on muutoksen unohtaminen:

```python
luku = 1

while luku < 10:
    print(luku)

print("Suoritus valmis.")
```

Koska muuttujan `luku` arvo ei koskaan muutu, jää ohjelma suoritettaessa ikuiseen silmukkaan eli toistaa samaa koodia, kunnes käyttäjä katkaisee ohjelman suorituksen (esimerkiksi painamalla `CTRL` + `C`):

<sample-output>

1
1
1
1
1
(tämä jatkuu ikuisesti...)

</sample-output>

<in-browser-programming-exercise name="Tulosta luvut" tmcname="osa03-00_tulosta_luvut">

Kirjoita ohjelma, joka tulostaa silmukassa luvut kahdesta kolmeenkymmeneen kahden luvun välein. Jokainen luku tulostetaan omalle rivilleen.

Ohjelman tulosteen alku näytää siis tältä:

<sample-output>
2
4
6
8
jne...
</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Lähtölaskenta" tmcname="osa03-01_lahtolaskenta">

Korjaa tehtäväpohjassa oleva ohjelma

```python
print("Valmiina?")
luku = int(input("Anna luku: "))
while luku = 0:
print(luku)
print("Nyt!")
```

siten että se toimii seuraavasti:

<sample-output>

Valmiina?
Anna luku: **5**
5
4
3
2
1
Nyt!

</sample-output>

Älä tällä kertaa käytä `while True` -silmukkaa!


</in-browser-programming-exercise>

## Ehdoista tarkemmin

Silmukan ehtona voidaan käyttää mitä tahansa ehtolauseketta. Esimerkiksi seuraava ohjelma tulostaa lukuja kolmen välein niin kauan kuin luku on pienempi kuin 100 eikä se ole jaollinen 5:llä:

```python
luku = int(input("Anna luku: "))

while luku < 100 and luku % 5 != 0:
    print(luku)
    luku += 3
```

Kaksi esimerkkitulostusta eri syötteillä:

<sample-output>

Anna luku: **28**
28
31
34
37

</sample-output>

<sample-output>

Anna luku: **96**
96
99

</sample-output>

Luvun 28 kohdalla silmukka päättyy lukuun 37, koska seuraava luku 40 on jaollinen 5:llä. Luvun 96 kohdalla silmukka päättyy lukuun 99, koska seuraava luku 102 ei ole alle 100.

Silmukan ehtoa kirjoittaessa on tärkeä varmistua siitä, että silmukan suoritus päättyy. Esimerkiksi seuraava ohjelma on joko päättyvä tai ei-päättyvä riippuen alkuarvosta:

```python
luku = int(input("Anna luku: "))

while luku != 10:
    print(luku)
    luku += 2
```

Jos syötteenä on parillinen luku, joka on enintään 10, silmukan suoritus päättyy:

<sample-output>

Anna luku: **4**
4
6
8

</sample-output>

Muissa tapauksissa silmukka on kuitenkin ikuinen, koska muuttuja ei koskaan saavuta arvoa 10. Tällaisia syötteitä ovat esimerkiksi 3 ja 12.

<in-browser-programming-exercise name="Luvut" tmcname="osa03-02_luvut">

Tee ohjelma, joka tulostaa kaikki käyttäjän antamaa lukua pienemmät luvut alkaen luvusta yksi.

<sample-output>

Mihin asti: **5**
1
2
3
4

</sample-output>

Älä käytä tässä tehtävässä while-komennon ehtona arvoa `True`!

</in-browser-programming-exercise>

## Koodauksen workflow ja lisää välineitä debuggaukseen

Hieman haastavampaa ohjelmaa, esim. seuraavaksi vuorossa olevaa tehtävää _Kahden potenssit_, koodatessa voitaisiin lähteä liikkeelle seuraavasti:

```python
asti = int(input("Mihin asti"))
luku = 1
while luku == asti:
   # koodia
```

eli aloitettaisiin syötteen lukemisesta ja ruvettaisiin sen jälkeen miettimään silmukan lopetusehtoa sekä silmukan toimintaa.

Todennäköisesti ohjelma ei ensimmäisillä kokeilukerroilla toimi ollenkaan halutulla tavalla ja koodia on testailtava kymmeniä tai jopa satoja kertoja ennen kun se alkaa toimia.

Koska koodi lukee syötteitä käyttäjältä, on sen toiminnan kokeileminen hidasta ja vaivalloista, koska jokaisella testauskerralla on ohjelmalle annettava näppäimistöltä käsin sen haluamat syötteet.

Yksi tapa toimia on "kovakoodata" syöte aluksi:

```python
# kovakoodataan syötteen arvo aluksi
asti = 8 # int(input("Mihin asti"))
luku = 1
while luku == asti:
   # koodia
```

Kun ohjelma toimii yhdellä syötteellä, sitä on helppo kokeilla muilla kovakoodatuilla syötteillä ja lopulta lukemalla syöte käyttäjältä.

Vastaava kikka toimii myös kurssien tehtäviin liittyvien testien ongelmatilanteita selvitellessä. Jos testi kertoo, että ohjelmasi toimii väärin, kun syöte on vaikkapa 42, niin kovakoodataan se syötteeksi bugin etsinnän ajaksi:

```python
# testi ilmoitti että koodi toimii väärin kun syöte on 42
asti = 42 # int(input("Mihin asti"))
luku = 1
while luku == asti:
   # koodia
```

Kurssin [edellisessä osassa](/osa-2) oli jo pariinkin otteeseen puhetta tulostuskomennon avulla tapahtuvasta debuggaamisesta. Kurssin aikana vastaan tulevat ohjelmat muuttuvat koko ajan haastavammiksi ja debuggauksen tarve tulee kasvamaan entisestään. Esimerkiksi silmukoiden lopetusehtojen saaminen toimimaan kaikissa tapauksissa voi olla haastavaa.

Tulostuskomentoihin perustuva debuggaus kannattaa ottaa omaan työkalupakkiin viimeistään nyt. Kertaa tarvittaessa edellisen osan [ensimmäisessä ](/osa-2/1-ohjelmoinnin-termeja) ja [neljännessä](/osa-2/4-yksinkertainen-silmukka) luvussa olleet debuggausohjeet.

Tulostelun lisäksi on olemassa muitakin debuggaukseen sopivia työkaluja. Eräs tälläinen on sivuston [Python Tutorin](http://www.pythontutor.com/) tarjoama [visualisointityökalu](http://www.pythontutor.com/visualize.html#mode=edit), jonka avulla oman ohjelman koodia on mahdollista suorittaa komento komennolta havainnoiden samalla, mitä arvoja ohjelman muuttujat saavat.

Seuraavassa kuva, kun Python Tutorilla visualisoidaan [edellisen osan](/osa-2/4-yksinkertainen-silmukka) debuggausmateriaalissa olevan hieman rikkinäisen koodin toimintaa:

<img src="3_1_0.png">

Punainen nuoli kertoo, missä kohtaa ohjelman suoritus on menossa. Visualisaattori näyttää, mitä ohjelma on tulostanut ruudulle ja mitkä ohjelman muuttujien arvot kulloisellakin suorituksen hetkellä ovat. Koodin suoritus etenee komento komennolta painiketta _Next>_ painellessa.

Visualisaattorin käyttö on erittäin helppoa, koska riittää että tarkasteltava koodi kopioidaan [täällä](http://www.pythontutor.com/visualize.html#mode=edit) olevaan koodi-ikkunaan.

Huomaa, että visualisaattori ei saalli skandien (ä, ö) ja käyttöä muuttujien eikä funktioiden nimissä.

Kokeneemmat ohjelmoijat tuskin käyttävät visualisaattoria koskaan, mutta aloittelijalle se voi olla oiva apuväline. Ohjelmointi ei nimittäin voi perustua tuuriin tai sattumaan. Ohjelmoijan on koko ajan tiedettävä tarkalleen, mitä muuttujien arvot ohjelman suorituksen aikana ovat. Jos muuttujien arvot eivät vastaakaan sitä mitä ohjelmoija olettaa, on tuloksena mitä suurimmalla todennäköisyydellä bugi.

Visualisaattori ja debuggaustulostukset ovat erinomainen väline sille, että ohjelmoija voi helposti omin silmin varmistaa, että ohjelma todellakin toimii, niin kuin sen olettaa toimivan.

<in-browser-programming-exercise name="Kahden potenssit" tmcname="osa03-03_kahden_potenssit">

Tee ohjelma, joka tulostaa ensin luvun 1 ja sen jälkeen kerta toisensa jälkeen aina kaksi kertaa suuremman luvun. Ohjelma siis tulostaa luvun kaksi potensseja.

Ohjelman suoritus päättyy, kun on tulostettu luku, joka on korkeintaan käyttäjän syötteen suuruinen. Yhtään käyttäjän syötettä suurempaa lukua ei siis tulosteta!

<sample-output>

Mihin asti: **8**
1
2
4
8

</sample-output>

<sample-output>

Mihin asti: **20**
1
2
4
8
16

</sample-output>

<sample-output>

Mihin asti: **100**
1
2
4
8
16
32
64

</sample-output>

Älä käytä tässä tehtävässä while-komennon ehtona arvoa `True`!

**Miten kahden potenssit lasketaan?** Ensimmäinen kahden potenssi on luku 1. Seuraava saadaan kertomalla 1 luvulla 2, eli se on 2. Sitä seuraava saadaan taas kertomalla edellinen kahden potenssi kahdella, eli kyseessä on 2 \* 2 eli 4, ja seuraava saadaan kertomalla kahdella 4 \* 2 eli kyseesä 8, jne...

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Luvun n potenssit" tmcname="osa03-04_luvun_n_potenssit">

Muuta edellistä ohjelmaa siten, että käyttäjä saa määrätä kertoimen (edellisessä ohjelmassa kerroin oli aina 2), eli sen, minkä luvun potensseja ohjelma tulostaa.

<sample-output>

Mihin asti: **27**
Mikä kerroin: **3**
1
3
9
27

</sample-output>

<sample-output>

Mihin asti: **1234567**
Mikä kerroin: **10**
1
10
100
1000
10000
100000
1000000

</sample-output>

Älä käytä tässä tehtävässä while-komennon ehtona arvoa `True`!

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Peräkkäisten summa, versio 1" tmcname="osa03-04a_perakkaisten_summa_helpompi">

Tee ohjelma, joka laskee peräkkäisten lukujen summaa 1 + 2 + 3 + ... kunnes sen arvo on vähintään käyttäjän syöttämä luku. Ohjelma toimii seuraavasti:

<sample-output>

Mihin asti: **2**
3

</sample-output>

<sample-output>

Mihin asti: **10**
10

</sample-output>

<sample-output>

Mihin asti: **18**
21

</sample-output>

Voit olettaa, että käyttäjän antama luku on 2 tai suurempi.

</in-browser-programming-exercise>

## Merkkijonon rakentaminen paloista

Jo kurssin [ensimetreillä](/osa-1/2-tietoa-kayttajalta) opimme, että merkkijono on mahdollista "rakentaa" useammasta pienemmästä merkkijonosta +-operaattorin avulla. Esimerkiksi

```python
sanat = "suo"
sanat = sanat + ", kuokka"
sanat = sanat + " ja python"

print(sanat)
```

<sample-output>

suo, kuokka ja python

</sample-output>

Huomaa, että edellinen on mahdollista kirjoittaa hieman tiiviimmin operaattorin += avulla:

```python
sanat = "suo"
sanat += ", kuokka"
sanat += " ja python"

print(sanat)
```

Yhdistettävä merkkijonon pätkä voi olla myös f-merkkijono. Tämä saattaa olla kätevää, jos rakennettavaan merkkijonoon lisätään muuttujissa olevia arvoja. Voimme siis tehdä esim. seuraavasti:

```python
kurssi = "Ohjelmoinnin perusteet"
arvosana = 4

lausunto = "Olet saanut "
lausunto += f"kurssilta {kurssi} "
lausunto += f"arvosanan {arvosana}"

print(lausunto)
```

<sample-output>

Olet saanut kurssilta Ohjelmoinnin perusteet arvosanan 4

</sample-output>

Edellisessä tehtävässä laskettiin lukujen summaa kasvattamalla sen arvoa silmukan sisällä.

Täsmälleen samalla idealla on mahdollista rakentaa myös merkkijonoa siten, että siihen lisätään yksi osa kerrallaan silmukassa...

<in-browser-programming-exercise name="Peräkkäisten summa, versio 2" tmcname="osa03-05_perakkaisten_summa">

Tee edellisestä ohjelmasta hieman kehittyneempi versio, joka tulostaa lopputuloksen lisäksi myös sen miten kyseinen summa lasketaan:

<sample-output>

Mihin asti: **2**
Laskettiin 1 + 2 = 3

</sample-output>

<sample-output>

Mihin asti: **10**
Laskettiin 1 + 2 + 3 + 4 = 10

</sample-output>

<sample-output>

Mihin asti: **18**
Laskettiin 1 + 2 + 3 + 4 + 5 + 6 = 21

</sample-output>

Voit olettaa, että käyttäjän antama luku on 2 tai suurempi.

</in-browser-programming-exercise>


<quiz id="61e37fdf-b172-54ba-acf3-eeaef2f227d8"></quiz>
