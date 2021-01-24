---
path: '/osa-4/2-lisaa-funktioista'
title: 'Lisää funktioista'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät lisää funktion parametrien käyttämisestä
- Osaat palauttaa arvon funktiosta ja käyttää sitä kutsukohdassa
- Osaat merkitä tyyppivihjeet parametreille ja paluuarvolle

</text-box>

Tutustuimme edellisen osan lopussa omien funktioiden toteuttamiseen. Jatketaan funktioiden parissa. Funktioiden määrittely tapahtuu avainsanan `def` avulla:

```python
def viesti():
    print("Tämä tulee funktiosta")
```

Näin määriteltyä funktiota nimeltä `viesti` kutsutaan seuraavasti:


```python
viesti()
```

Ohjelman tulostus on seuraava:

<sample-output>

Tämä tulee funktiosta

</sample-output>

## Funktion parametrit

Kuten muistamme, funktiolla voi olla yksi tai useampi parametri. Parametrit määritellään suluissa funktion nimen jälkeen.

Esimerkiksi seuraavassa koodissa funktiolla `tervehdi` on yksi parametri ja funktiolla `summa` on kaksi parametria.

```python
def tervehdi(nimi):
    print("Moikka,", nimi)

def summa(a, b):
    print("Parametrien summa on", a + b)
```

```python
tervehdi("Emilia")
summa(2, 3)
```

<sample-output>

Moikka, Emilia
Parametrien summa on 5

</sample-output>

<text-box variant='hint' name='Muodollinen ja todellinen parametri'>

Mitä oikeastaan tapahtuu, kun suoritetaan funktiokutsu `tervehdi("Emilia")`?

Funktion määrittelyssä `tervehdi(nimi)` oleva `nimi` on funktion
_muodollinen parametri_. Parametrin nimi on annettu funktion alussa,
ja sitä voidaan käyttää funktiossa muuttujan tavoin.

Funktion kutsussa `tervehdi("Emilia")` oleva `"Emilia"` on funktion
_todellinen parametri_. Kun funktiota kutsutaan, todellinen parametri
sijoitetaan muodollisen parametrin arvoksi.

Joskus termillä _parametri_ viitataan muodolliseen parametriin ja
termillä _argumentti_ viitataan todelliseen parametriin,
mutta monet myös käyttävät termejä sekaisin.

</text-box>

## Huomio testien virheilmoituksista

Jos ohjelmasi ei toimi oikein, antavat testit enemmän tai vähemmän hyvän virheilmoituksen. Virheilmoitus kannattaa ehdottomasti lukea huolellisesti.

Joissain tilanteissa virheilmoitus ei kerro tarkemmin, mistä on kyse. Esimerkiksi seuraavassa tehtävässä saatat törmätä seuraavaan virheeseen:

<img src="4_2_0a.png">

Virhe kertoo, että tehtävän funktiota `viiva` pitäisi pystyä kutsumaan seuraavasti:

```python
viiva(5, "")
```

Varsinainen ongelma paljastuu, kun kokeillaan, mitä funktiokutsu tekee, eli kopioidaan virheilmoituksen kertoma funktiokutsu koodiin ja painetaan vihreää kolmiota:

<img src="4_2_0b.png">

Koodin suorituksen viimeiset rivit kertovat, mikä on vikana: koodirivi numero 4 aiheuttaa virheen _IndexError: string index out of range_. Kuten [edellisessä osassa](/osa-3/2-merkkijonojen-kasittely) mainittiin, syy tälle on se, että koodissa yritetään indeksoida merkkijonon ulkopuolelle. Tällä kertaa syynä on se, että yritetään hakea nollan pituisen merkkijonon ensimmäistä merkkiä.

<programming-exercise name='Viiva' tmcname='osa04-02_viiva'>

Tee funktio `viiva`, joka saa kaksi parametria (leveys, merkkijono). Funktio tulostaa ensimmäisen parametrin määrittämän pituisen viivan käyttäen toisena parametrina olevan merkkijonon ensimmäistä merkkiä. Jos parametrina oleva merkkijono on tyhjä, tulostuu viiva tähtinä.

Käyttöesimerkki:

```python
viiva(7, "%")
viiva(10, "LOL")
viiva(3, "")
```

<sample-output>

<pre>
%%%%%%%
LLLLLLLLLL
***
</pre>

</sample-output>

</programming-exercise>

## Sisäkkäiset kutsut

Voimme kutsua funktiota myös toisen funktion sisältä. Esimerkiksi seuraavassa ohjelmassa funktio
`tervehdi_monesti` kutsuu funktiota `tervehdi` halutun määrän kertoja:

```python
def tervehdi(nimi):
    print("Moikka", nimi)

def tervehdi_monesti(nimi, kerrat):
    while kerrat > 0:
        tervehdi(nimi)
        kerrat -= 1

tervehdi_monesti("Emilia", 3)
```

<sample-output>

Moikka, Emilia
Moikka, Emilia
Moikka, Emilia

</sample-output>


<programming-exercise name='Risulaatikko' tmcname='osa04-02a_risulaatikko'>

Tee funktio `risulaatikko`, joka piirtää risuaitamerkkiä käyttäen parametrinsa korkuisen, kymmenen merkkiä leveän risulaatikon.

Funktion tulee kutsua edellisen tehtävän funktiota `viiva` kaiken tulostuksen tekemiseen! Kopioi edellisen tehtävän funktion koodi tämän tehtävän funktion koodin yläpuolelle. Älä muuta funktiota mitenkaan!

Pari käyttöesimerkkiä

```python
risulaatikko(5)
print()
risulaatikko(2)
```

<sample-output>

<pre>
##########
##########
##########
##########
##########

##########
##########
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Risuneliö' tmcname='osa04-02b_risunelio'>

Tee funktio `risunelio`, joka piirtää risuaitamerkkiä käyttäen parametrinsa kokoisen risuneliön.

Funktion tulee kutsua edellisen tehtävän funktiota `viiva` kaiken tulostuksen tekemiseen! Kopioi edellisen tehtävän funktion koodi tämän tehtävän funktion koodin yläpuolelle. Älä muuta funktiota mitenkaan!

Pari käyttöesimerkkiä

```python
risunelio(5)
print()
risunelio(3)
```

<sample-output>

<pre>
#####
#####
#####
#####
#####

###
###
###
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Neliö' tmcname='osa04-02c_nelio'>

Tee funktio `nelio`, joka saa kaksi parametria. Funktio tulostaa neliön jonka korkeuden ja leveyden kertoo ensimmäinen parametri.  Toinen parametri määrittelee mitä merkkiä käyttäen neliö piirretään.

Funktion tulee kutsua edellisen tehtävän funktiota `viiva` kaiken tulostuksen tekemiseen! Kopioi edellisen tehtävän funktion koodi tämän tehtävän funktion koodin yläpuolelle. Älä muuta funktiota mitenkaan!

Pari käyttöesimerkkiä

```python
nelio(5, "*")
print()
nelio(3, "o")
```

<sample-output>

<pre>
*****
*****
*****
*****
*****

ooo
ooo
ooo
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Kolmio' tmcname='osa04-02d_kolmio'>

Tee funktio `kolmio`, joka piirtää risuaitamerkkiä käyttäen parametrinsa korkuisen ja levyisen, risuaitakolmion.

Funktion tulee kutsua edellisen tehtävän funktiota `viiva` kaiken tulostuksen tekemiseen! Kopioi edellisen tehtävän funktion koodi tämän tehtävän funktion koodin yläpuolelle. Älä muuta funktiota mitenkaan!

Pari käyttöesimerkkiä

```python
kolmio(6)
print()
kolmio(3)
```

<sample-output>

<pre>
#
##
###
####
#####
######

#
##
###
</pre>

</sample-output>

</programming-exercise>

<programming-exercise name='Kuvio' tmcname='osa04-03_kuvio'>

Tee funktio `kuvio`, joka saa neljä parametria. Funktio tulostaa kuvion, jonka yläosana on kahden ensimmäisen parametrin määrittelemä kolmio ja alaosana ensimmäisen ja kahden jälkimmäisen parametrin määrittelemä suorakulmio.

Funktion tulee kutsua edellisen tehtävän funktiota `viiva` kaiken tulostuksen tekemiseen! Kopioi edellisen tehtävän funktion koodi tämän tehtävän funktion koodin yläpuolelle.

Pari käyttöesimerkkiä

```python
kuvio(5, "X", 3, "*")
print()
kuvio(2, "o", 4, "+")
print()
kuvio(3, ".", 0, ",")
```

<sample-output>

<pre>
X
XX
XXX
XXXX
XXXXX
*****
*****
*****

o
oo
++
++
++
++

.
..
...
</pre>

</sample-output>

**Vihje**

Älä yritä ratkaista tehtävässä "kaikkia asioita" yhtä aikaa. Keskity ensin esim. siihen että saat kuvion yläosan kolmion piirtymään oikein, ja vasta sen jälkeen jatka kuvion täydentämistä alaosan suorakulmiolla.

Tämä on ylipäätänsäkin ohjelmoinnissa erittäin tärkeää: **keskity pieniin osiin kerrallaan**, varmista että ne toimivat ennen kuin laajennat ratkaisuasi.

</programming-exercise>

<programming-exercise name='Joulukuusi' tmcname='osa04-04_joulukuusi'>

Tee funktio `joulukuusi`, joka saa yhden parametrin. Funktio tulostaa tekstin joulukuusi! ja parametrinsa kokoisen joulukuusen.

Esim. kutsuttaessa `joulukuusi(3)` tulostuu

<sample-output>

<pre>
joulukuusi!
  *
 ***
*****
  *
</pre>

</sample-output>

Esim. kutsuttaessa `joulukuusi(5)` tulostuu

<sample-output>

<pre>
joulukuusi!
    *
   ***
  *****
 *******
*********
    *
</pre>

</sample-output>

**Huomaa, että joulukuusen vasemmalla puolella pitää olla täsmälleen oikea määrä välilyöntejä**. Eli vaikka kuusen muoto olisi täysin oikea, mutta sen alin "neulastaso" ei lähde ruudun vasemmasta reunasta, ei vastaus kelpaa testeille.

</programming-exercise>

## Funktion paluuarvo

Funktiot voivat myös palauttaa arvoja. Meille jo tuttu Pythonin valmis funktio `input` _palauttaa_ käyttäjän antaman syötteen. Funktion palauttama arvo voidaan esimerkiksi sijoittaa muuttujaan:

```python
sana = input("syötä merkkijono: ")
```

Myös kokonaislukujen lukemisessa yhdessä funktion `input` kanssa käytettävä funktio `int` palauttaa arvon:

```python
luku = int(input("syötä kokonaisluku: "))
```

Funktio `int` saa parametrinaan funktion `input` palauttaman merkkijonon ja palauttaa sen kokonaislukutyyppisenä.

## Funktion arvon palauttaminen return-komennolla

Myös itse määrittelemämme funktiot voivat palauttaa arvoja käyttämällä komentoa `return`. Esimerkiksi seuraava funktio `summa` palauttaa annettujen lukujen summan:

```python
def summa(a, b):
    return a + b

vastaus = summa(2, 3)

print("Summa:", vastaus)
```

<sample-output>

Summa: 5

</sample-output>

Seuraavassa on vielä toinen esimerkki, jossa funktio kysyy käyttäjän nimen ja palauttaa sen:

```python
def kysy_nimi():
    nimi = input("Mikä on nimesi? ")
    return nimi

nimi = kysy_nimi()
print("Moikka,", nimi)
```

<sample-output>

Mikä on nimesi? **Anna**
Moikka, Anna

</sample-output>

Kannattaa huomata, että komento `return` lopettaa funktion suorituksen saman tien. Niinpä voimme tehdä seuraavan funktion:

```python
def pienin(a,b):
    if a < b:
        return a
    return b

print(pienin(3,7))
print(pienin(5,2))
```

Tässä ideana on, että jos `a` on pienempi kuin `b`, niin funktio palauttaa arvon `a` ja päättyy. Muuten funktion suoritus jatkuu eteenpäin, jolloin se palauttaa arvon `b`.

<sample-output>

3
2

</sample-output>

Voimme myös käyttää `return`-komentoa siihen, että poistumme funktiosta palauttamatta mitään:

```python
def tervehdi(nimi):
    if nimi == "":
        print("???")
        return
    print("Moikka, "+nimi)

tervehdi("Emilia")
tervehdi("")
tervehdi("Matti")
```

Jos `nimi` on tyhjä merkkijono, niin funktio tulostaa `???` ja päättyy.

<sample-output>

Moikka, Emilia
???
Moikka, Matti

</sample-output>

## Funktion paluuarvojen käyttö

Kuten olemme jo nähneet, funktioiden paluuarvoja on mahdollista sijoittaa muuttujiin:

```python
def summa(a, b):
    return a + b

tulos = summa(4, 6)
print("Summa on", tulos)
```

<sample-output>

Summa on 10

</sample-output>

Koska funktion paluuarvo käyttäytyy kuten mikä tahansa arvo, ei apumuuttuja ole tarpeen ja paluuarvoa on mahdollista käyttää suoraan komennon `print` parametrina:

```python
print("Summa on", summa(4, 6))
```

Voimme myös antaa funktion palauttaman arvon toiselle funktiolle:

```python
def summa(a, b):
    return a+b

def erotus(a, b):
    return a-b

tulos = erotus(summa(5, 2), summa(2, 3))
print("Vastaus on", tulos)
```

<sample-output>

Vastaus on 2

</sample-output>

Tässä tapauksessa suoritetaan ensin sisemmät funktiokutsut `summa(5, 2)` ja `summa(2, 3)`, joiden  palauttamat arvot 7 ja 5 käytetään ulomman funktiokutsun parametreina.

Ulompi funktiokutsu `erotus(7, 5)` palauttaa arvon 2, joka sijoitetaan muuttujan `tulos` arvoksi ja tulostetaan ruudulle.

Funktioiden palauttamat arvot toimivat täysin samalla tavalla kuin mitkä tahansa arvot Pythonissa. Niitä voidaan tulostaa, sijoittaa muuttujaan, käyttää osana lausekkeita tai käyttää parametreina muissa funktiokutsuissa.

## Arvon palauttaminen, return ja print

Joskus aloittelija hämmentyy funktioiden paluuarvon ja funktiossa tapahtuvan tulostuksen välistä eroa. Tarkastellaan kahta versiota funktiosta, joka selvittää kahden parametrinsa maksimiarvon:

```python
def maksimi1(a, b):
    if a > b:
        return a
    else:
        return b

def maksimi2(a, b):
    if a > b:
        print(a)
    else:
        print(b)

vastaus = maksimi1(3, 5)
print(vastaus)

maksimi2(7, 2)
```

<sample-output>

5
7

</sample-output>

Molemmat funktiot näyttävät toimivan hyvin, kumpikin selvittää maksimiarvon. Funktioissa on kuitenkin eräs ratkaiseva ero. Funktioista ensimmäinen `maksimi1` _palauttaa_ selvittämänsä arvon. Se ei itse tulosta mitään, eli jos suoritetaan koodi

```python
maksimi1(3, 5)
```

ei näytä tapahtuvan mitään. Funktion paluuarvo on siis otettava talteen muuttujaan, jos se halutaan tulostaa:

```python
vastaus = maksimi1(3, 5)
print(vastaus)
```

Funktioista toinen `maksimi2` taas tulostaa itse `print`-komentoa käyttäen lukujen maksimin, eli riittää kutsua

```python
maksimi2(7, 5)
```

ja maksimi tulostuu ruudulle. Tämän funktion huono puoli on kuitenkin se, että funktion selvittämää arvoa ei ole mahdollista saada funktion ulkopuolelle muun ohjelman käsiteltäväksi. Tämän takia arvon palauttava funktio on useimmiten parempi vaihtoehto.

<programming-exercise name='Luvuista suurin' tmcname='osa04-05_luvuista_suurin'>

Tee funktio  `luvuista_suurin`, joka saa parametriksi kolme kokonaislukua. Funktio palauttaa return-lausetta käyttäen luvuista suurimman.

Käyttöesimerkki

```python
print(luvuista_suurin(3, 4, 1)) # 4
print(luvuista_suurin(99, -4, 7)) # 99
print(luvuista_suurin(0, 0, 0)) # 0
```

</programming-exercise>

<programming-exercise name='Merkit samat' tmcname='osa04-06_merkit_samat'>

Tee funktio `samat`, joka saa parametriksi merkkijonon ja kaksi merkkijonon indeksejä kuvaavaa kokonaislukua. Funktio palauttaa `return`-lausetta käyttäen tiedon (`True` tai `False`) siitä, ovatko merkkijonon parametreina olevien indeksien osoittamissa paikoissa olevat merkit samat. Jos jompikumpi indekseistä ei osu merkkijonon sisälle, palauttaa metodi `False`.

Muutama esimerkki:

```python
# samat merkit o ja o
print(samat("koodari", 1, 2)) # True

# eri merkit k ja a
print(samat("koodari", 0, 4)) # False

# toinen indeksi ei ole merkkijonon sisällä
print(samat("koodari", 0, 10)) # False
```

</programming-exercise>

<programming-exercise name='Eka, toka ja vika sana' tmcname='osa04-07_eka_toka_vika_sana'>

Tee kolme funktiota: `eka_sana`, `toka_sana` ja `vika_sana`. Jokainen funktioista saa parametrikseen lauseen (eli merkkijonon).

Funktiot palauttavat nimensä mukaisesti lauseen ensimmäisen, toisen tai viimeisen sanan.

Voit olettaa jokaisessa tapauksessa, että merkkijono koostuu vähintään kahdesta sanasta, ja että sanojen välillä on aina täsmälleen yksi välilyönti, ja että merkkijonon alussa ja lopussa ei ole välilyöntejä.

```python
lause = "olipa kerran kauan sitten ohjelmoija"

print(eka_sana(lause)) # olipa
print(toka_sana(lause)) # kerran
print(vika_sana(lause)) # ohjelmoija
```

<sample-output>

olipa
kerran
ohjelmoija

</sample-output>

```python
lause = "olipa kerran"

print(toka_sana(lause)) # kerran
print(vika_sana(lause)) # kerran
```

</programming-exercise>

## Parametrin tyyppi

Kerrataan vielä tähän mennessä läpikäydyt tyypit:

Tyyppi | Pythonissa | Esimerkki
:------|:----------:|-----------
Kokonaisluku | `int` | `23`
Liukuluku | `float` | `-0.45`
Merkkijono | `str` | `"Pekka Python"`
Totuusaro | `bool` | `True`

Kun kutsumme funktiota, funktio toimii oikein vain,
jos annamme sille sopivan tyyppiset parametrit.
Tarkastellaan esimerkkinä seuraavaa funktiota:

```python
def tulosta_monesti(viesti, kerrat):
    while kerrat > 0:
        print(viesti)
        kerrat -= 1
```

Funktio toimii mainiosti, jos kutsumme sitä näin:

```python
tulosta_monesti("Moikka", 5)
```

<sample-output>

Moikka
Moikka
Moikka
Moikka
Moikka

</sample-output>

Kuitenkaan funktio ei toimi, jos annamme sille väärän tyyppisen parametrin:

```python
tulosta_monesti("Moikka", "Emilia")
```

<sample-output>

TypeError: '>' not supported between instances of 'str' and 'int'

</sample-output>

Tässä ongelmaksi tulee, että funktion jälkimmäistä parametria `kerrat` vertaillaan kokonaislukuun 0. Kun parametri on `"Emilia"` eikä kokonaisluku, tämä aiheuttaa virheen.

Voimme antaa funktion määrittelyssä _tyyppivihjeen_, joka ilmaisee, millaista tietoa parametreihin on tarkoitus sijoittaa:

```python
def tulosta_monesti(viesti : str, kerrat : int):
    while kerrat > 0:
        print(viesti)
        kerrat -= 1
```

Tämä kertoo funktion käyttäjälle, että parametrin `viesti` on tarkoitus olla merkkijono, kun taas parametrin `kerrat` on tarkoitus olla kokonaisluku.

Vastaavasti funktion paaluarvon tyypin voi vihjata funktion määrittelyssä:

```python
def kysy_nimi() -> str:
    nimi = input("Mikä on nimesi? ")
    return nimi
 ```

Tämä kertoo funktion käyttäjälle, että funktion on tarkoitus palauttaa merkkijono.

Huomaa kuitenkin, että tyyppivihje ainoastaan neuvoo, mikä tyypin tulisi olla, mutta ei valvo sitä. Jos funktiolle annetaan väärän tyyppinen parametri tai se palauttaa väärän tyyppisen arvon, funktio suoritetaan kuitenkin, mutta se toimii mahdollisesti väärin.

<quiz id="fb289a3b-288a-5a9f-b3d2-07ceae5866ea"></quiz>
