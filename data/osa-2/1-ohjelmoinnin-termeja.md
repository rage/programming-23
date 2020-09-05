---
path: '/osa-2/1-ohjelmoinnin-termeja'
title: 'Ohjelmoinnin termejä'
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tunnet keskeistä ohjelmoinnin termistöä
- Tiedät lauseen ja lausekkeen eron
- Osaat selvittää lausekkeen arvon tyypin

</text-box>

Emme vielä kurssin ensimmäisessä osassa kiinnittäneet kovin tarkasti huomiota ohjelmoinnin terminologiaan. Nyt on hyvä hetki tutustua joihinkin käsitteisiin.

## Lause

_Lause_ (engl. _statement_) tarkoittaa ohjelman osaa, joka suorittaa jonkin toiminnon. Usein lause viittaa yksittäiseen komentoon.

Esimerkiksi `print("Moi!")` on lause, joka tulostaa rivin tekstiä,
ja `luku = 2` on lause, joka asettaa muuttujalle arvon.

Lause voi olla myös monimutkaisempi, ja sen sisällä voi olla muita lauseita.
Esimerkiksi seuraava ehtolause muodostuu kolmesta rivistä:

```python
if nimi == "Anna":
    print("Moi!")
    luku = 2
```

Tässä tapauksessa ehtolauseen sisällä on kaksi lausetta.

## Lohko

_Lohko_ (engl. _block_) on joukko peräkkäin sijoitettuja lauseita, jotka ovat samalla tasolla ohjelman rakenteessa. Esimerkiksi ehtolauseessa lohkossa ovat lauseet, jotka suoritetaan ehdon ollessa tosi.

```python
if ika > 17:
    # ehtolauseessa oleva lohko alkaa
    print("Olet täysi-ikäinen!")
    ika = ika + 1
    print("nyt vuoden vanhempi...")
    # lohko loppuu

print("tämä on eri lohkossa")
```

Pythonissa lohko ilmaistaan sisentämällä lohkon koodi eli lauseet samalle tasolle.

Kannattaa huomata, että Python-ohjelman "päälohkon" on oltava sisennetty tiedoston vasempaan reunaan:

```python
# tämä ohjelma ei toimi sillä koodia ei ole sisennetty vasempaan reunaan
  print("hei maailma")
  print("huono ohjelma...")
```

## Lauseke

_Lauseke_ (engl. _expression_) on koodin osa, jolla on jokin tyyppi. Ohjelman suorituksen aikana lauseke saa arvon, jota voidaan käyttää ohjelmassa.

Tarkastellaan muutamaa esimerkkiä lausekkeista:

| Lauseke | Arvo | Tyyppi | Tyyppi Pythonissa |
|---------|------|--------------|-------------------|
|`2 + 4 + 3` | `9` | kokonaisluku | `int` |
|`"abc" + "de"` | `"abcde"` | merkkijono | `str`|
|`11 / 2` | `5.5` | liukuluku | `float` |
|`2 * 5 > 9` | `True` | totuusarvo | `bool`|

Koska lausekkeella on arvo, voi sen sijoittaa muuttujaan:

```python
# muuttuja x saa arvoksi lausekkeen 1 + 2 arvon
x = 1 + 2
```

Yksinkertaisesta lausekkeesta saa muodostettua monimutkaisempia lausekkeita esim. laskuoperaattorien avulla:

```python
# muuttuja y saa arvoksi lausekkeen '3 kertaa x plus x toiseen' arvon
y = 3 * x + x**2
```

## Funktio

_Funktio_ (engl. _function_) suorittaa jonkin toiminnon. Funktiolla voi olla yksi tai useampi _parametri_ (engl. _parameter_), jotka ilmaisevat, mitä funktion tulee tehdä tarkalleen.

Funktio suoritetaan, kun sitä _kutsutaan_ eli koodissa on funktion nimi ja funktiolle annettavat parametrit suluissa. Esimerkiksi seuraava koodi kutsuu `print`-funktiota parametrilla `"tämä on parametri"`:

```python
print("tämä on parametri")
```

Myös käyttäjältä syötteitä lukeva `input` on funktio. Parametrina funktio saa käyttäjälle näytettävän viestin:

```python
nimi = input("Kerro nimesi: ")
```

Tässä tapauksessa funktio _palauttaa_ arvon, mikä tarkoittaa, että funktion kutsukohtaan ilmestyy arvo funktion suorituksen jälkeen. Funktion `input` palauttama arvo on käyttäjän syöttämä teksti merkkijonona. Funktion palauttama arvo sijoitetaan usein muuttujan arvoksi, jotta arvoa voidaan hyödyntää ohjelmassa.

## Tyyppi

_Tyyppi_ (engl. _type_) tarkoittaa, millainen jokin koodissa esiintyvä arvo on. Esimerkiksi seuraavassa koodissa muuttujan `nimi` tyyppi on merkkijono ja muuttujan `tulos` tyyppi on kokonaisluku:

```python
nimi = "Anna"
tulos = 100
```

Funktio `type` kertoo annetun lausekkeen tyypin. Esimerkiksi:

```python
print(type("Anna"))
print(type(100))
```

<sample-output>

<class 'str'>
<class 'int'>

</sample-output>

## Syntaksi

_Syntaksi_ (engl. _syntax_) määrittää, miten ohjelman koodi tulee kirjoittaa. Jokaisella ohjelmointikielellä on omanlainen syntaksinsa.

Esimerkiksi Python-kielen syntaksiin kuuluu, että `if`-lauseen aloitusrivin lopussa on kaksoispiste ja ehtoon kuuluva koodi on sisennetty:

```python
if nimi == "Anna":
    print("Moi!")
```

Jos ohjelmointikielen syntaksia ei noudateta, seurauksena on virheilmoitus:

```python
if nimi == "Anna"
    print("Moi!")
```

<sample-output>

<pre>
  File "testi.py", line 1
    if nimi == "Anna"
                    ^
SyntaxError: invalid syntax
</pre>


</sample-output>

Kurssin ensimmäisessä kolmessa osassa käytössä oleva selainympäristö ei valitettavasti käytä täysin samoja virheilmoituksia kun "oikea" python-ympäristö, jonka otamme käyttöön osassa 4.

Edellinen esimerkki tuottaa selainympäristön pythonissa seuraavanlaisen hieman vähemmän kuvaavan virheilmoituksen:

<sample-output>

<pre>
SyntaxError: bad input on line 1
</pre>

</sample-output>

## Debuggaaminen

Kun ohjelman syntaksi on kunnossa, eli ohjelma on kirjoitettu Pythonin "kieliopin" mukaisesti, mutta ohjelma ei toimi halutulla tavalla, on ohjelmassa _bugi_.

Bugit ilmenevät eri tavoin.

Jotkut bugit aiheuttavat suoritusaikaisen virheen. Esim. seuraava ohjelma

```python
x = 10
y = 0
tulos = x / y

print(f"{x} jaettuna {y} on {tulos}")
```

aiheuttaa virheen:

<sample-output>

<pre>
ZeroDivisionError: integer division or modulo by zero on line 3
</pre>

</sample-output>

Ongelma on siis siinä, että nollalla jakaminen ei ole sallittua ja se "kaataa" ohjelman.

Suoritusaikaiseen virheeseen johtavat bugit ovat usein helpohkoja korjata sillä bugin aiheuttama rivi selviää virheilmoituksesta. Toki bugin varsinainen syy on usein muualla kuin virheilmoutuksen aiheuttaneessa rivissä.

Joskus bugi taas ilmenee siten, että koodit tuottama tulos on virheelinen. Tälläisten bugien havaitseminen ja niiden syyn paikallistaminen voi olla haastavaa. Kurssin tehtävissä testit paljastavat usein juuri tämän kategorian bugeja. Ennen kun ongelma päästän korjaamaan, on bugi paikallistettava.

Koodarijargonissa bugien syiden selvittämistä kutsutaan _debuggaamiseksi_. Debuggaaminen on äärimmäisen keskeinen taito, itseasiassa ammatikseen ohjelmoivat käyttävät usein huomattavasti enemmän aikaa debuggaamiseen kuin varsinaiseen ohjelmointiin.

Eräs yksinkertainen mutta varsin tehokas debuggauskeino on lisäillä ohjelmaan "debug-tulostuksia", eli print-komentoja, joiden avulla varmistetaan että koodissa tapahtuu niitä asioita mitä ohjelmoija olettaa koodissa tapahtuvan.

Seuraavassa on ratkaisuyritys erääseen [edellisen osan](/osa-1/5-ehtorakenne) tehtävään:

```python
tuntipalkka = float(input('Tuntipalkka: '))
tunnit = int(input('Työtunnit: '))
paiva = input('Viikonpäivä: ')

palkka = tuntipalkka * tunnit
if paiva=="sunnnuntai":
    palkka * 2

print(f"Palkka {palkka} euroa")
```

Ohjelma ei näytä toimivan oikein, testien suoritus kertoo seuraavaa:

<sample-output>

<pre>
FAIL: PalkkaTest: test_sunnuntai_1

Syötteellä 23.0, 12, sunnuntai oikeaa palkkaa 552.0 ei löydy tulosteestasi Palkka 276.0 euroa
</pre>

</sample-output>

Ensimmäinen askel debuggaamisessa on useimmiten kokeilla ohjelmaa ongelmallisella syötteellä. Kokeilu varmistaa, että tulos ei ole haluttu:

<sample-output>

Palkka 276.0 euroa

</sample-output>

Debugattaessa ohjelman toimintaa kokeillaan usein. Voikin olla hyödyllisä "kovakoodata" ongelman aiheuttavat syötteet suoraan koodiin sen sijaan että ne kystyttäisiin joka kerta käyttäjältä. Tämä onnistuu esimerkiksi muuttamalla koodia tilapäisesti seuraavalla tavalla:


```python
if False:
    tuntipalkka = float(input('Tuntipalkka:  '))
    tunnit = int(input('Työtunnit: '))
    paiva = input('Viikonpäivä: ')
else: # suoritus tulee nyt aina tänne
    tuntipalkka = 23.0
    tunnit = 12
    paiva = "sunnuntai"

palkka = tuntipalkka * tunnit
if paiva=="sunnnuntai":
    palkka * 2

print(f"Palkka {palkka} euroa")
```

Syötteet voidaan lukea tarvittaessa käyttäjältä vaihtamalla if:in ehdoksi True.

Seuraava askel on lisäillä koodiin _debug-tulostuksia_. Koska nimenomaan sunnuntain palkka lasketaan väärin, laitetaan sen hoitavaan osaan tulostukset korotusta ennen ja sen jälkeen:

```python
# ...

palkka = tuntipalkka * tunnit
if paiva=="sunnnuntai":
    print("palkka alussa:", palkka)
    palkka * 2
    print("palkka kasvatuksen jälkeen:", palkka)

print(f"Palkka {palkka} euroa")
```

Kun ohjelma nyt suoritetaan, ei debug-tulostuksia jostain syystä näy ollenkaan. Vaikuttaa siltä, että ohjelman suoritus ei edes mene if-haaraan. Komennon ehdossa täytyy siis olla, joku ongelma. Ehdon arvokin voidaan tulostaa koodista:

```python
# ...

palkka = tuntipalkka * tunnit
print("ehto:", paiva=="sunnnuntai")
if paiva=="sunnnuntai":
    print("palkka alussa:", palkka)
    palkka * 2
    print("palkka kasvatuksen jälkeen:", palkka)

print(f"Palkka {palkka} euroa")
```

Ja tosiaan kun koodi suoritetaan ehdon arvo on False eli koodi hyppää if-lohkon ohi:

<sample-output>

ehto:  False
Palkka 276.0 euroa

</sample-output>

Vian täytyy siis olla if-komennon ehdossa, ja kun sitä katsotaan tarkemmin, huomataan että _sunnuntai_ on vahingossa kirjoitettu väärin. Korjataan typo:

```python
# ...

palkka = tuntipalkka * tunnit
print("ehto:", paiva=="sunnuntai")
if paiva=="sunnuntai":
    print("palkka alussa:", palkka)
    palkka * 2
    print("palkka kasvatuksen jälkeen:", palkka)

print(f"Palkka {palkka} euroa")
```

Koodin suoritus aiheuttaa nyt seuraavan tulostuksen:

<sample-output>

ehto: True
palkka alussa: 276.0
palkka kasvatuksen jälkeen: 276.0
Palkka 276.0 euroa

</sample-output>

Koska _tuntipalkka = 23.0_ ja _tunnit = 12_, vaikuttaa muuttujassa _palkka_ olevan oikea arvo aluksi, mutta kasvatuskomento ei kuitenkaan kasvata muuttujan arvoa. Komento on siis mitä ilmeisemmin virheellinen. Ja toden totta, komento

```python
palkka * 2
```

ainoastaan laskee tuplapalkan, mutta ei tee tulokselle mitään. Korjataan komento muotoon, joka tallettaa korotetun palkan takaisin muttujaan _palkka_:

```python
palkka = palkka * 2
```

Kun ohjelma suoritetaan nyt, huomataan että lopputuloskin on oikea:

<sample-output>

ehto:  True
palkka alussa: 276.0
palkka kasvatuksen jälkeen: 552.0
Palkka 552.0 euroa

</sample-output>

Kun ohjelma on kunnossa, tulee debuggaustulosteet ja muu debuggauksen takia kirjoitettu ekstrakoodi poistaa.

Esimerkki oli yksinkertainen ja näin lyhyessä ohjelmassa oleva bugi selviäisi varmasti myös koodia lukemalla. Monesti kuitenkin debug-printeillä pääsee huomattavasti nopeammin jyvälle siitä missä vika piilee. Printtailemalla voidaan usein varmistua siitä mitkä osat ohjelmasta toimivat "varmuudella" oikein ja bugien jäljitys voidaan nopeasti saada fokusoitua niihin koodiriveihin missä ongelma todennäköisesti piileskelee.

Debuggaukseen on olemassa muitakin keinoja kuin debugtulostusten tekeminen. Palaamme asiaan myöhemmin kurssilla. Suosittelen kuitenkin nyt lämpimästi, että _jokainen_ ottaa debug-tulostukset repertuaariinsa. Koodauksen ammattilaiset eivät selviä työstään ilman debugtulostelua, joten on vaikea kuvitella että aloittelijoidenkin ei kannattaisi laajentaa työkalupakkiaan tältä osin.

<in-browser-programming-exercise name="Korjaa virheet" tmcname="osa02-01_korjaa_virheet" height="400px">

Seuraavassa ohjelmassa on useita _syntaksivirheitä_, korjaa ohjelma siten että syntaksi on kunnossa, ja että se toimii alla olevien esimerkkien mukaisesti.

```python
  luku = input("Anna luku: ")
  if luku>100
    print("Luku oli suurempi kuin sata")
    luku - 100
    print("Nyt luvun arvo on pienentynyt sadalla)
     print("Arvo on nyt"+ luku)
 print(luku + " taitaa olla onnenlukuni!")
 print("Hyvää päivänjatkoa!)
```

<sample-output>

Anna luku: **13**
13 taitaa olla onnenlukuni!
Hyvää päivänjatkoa!

</sample-output>

<sample-output>

Anna luku: **101**
Luku oli suurempi kuin sata
Nyt luvun arvo on pienentynyt sadalla
Arvo on nyt 1
1 taitaa olla onnenlukuni!
Hyvää päivänjatkoa!

</sample-output>

</in-browser-programming-exercise>


<in-browser-programming-exercise name="Merkkien määrä" tmcname="osa02-02_merkkien_maara">

Funktiolla `len` voidaan laskea (muun muassa) merkkijonon pituus. Funktio palauttaa merkkijonossa olevien merkkien määrän.

Esimerkkejä funktion toiminnasta:

```python
sana = "abcd"
print(len(sana))

print(len("moikka"))

sana2 = "heipparallaa"
pituus = len(sana2)
print(pituus)
```

<sample-output>

4
6
12

</sample-output>

Tee ohjelma, joka lukee käyttäjältä sanan ja tulostaa sanan merkkien määrän, mikäli niitä on enemmän kuin yksi.

Esimerkkisuorituksia:

<sample-output>

Anna sana: hei
Sanassa hei on 3 kirjainta
Kiitos!

</sample-output>

<sample-output>

Anna sana: banaani
Sanassa banaani on 7 kirjainta
Kiitos!

</sample-output>

<sample-output>

Anna sana: b
Kiitos!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Tyyppimuunnos" tmcname="osa02-03_tyyppimuunnos">

Pythonissa voidaan usein muuntaa jokin arvo tyypistä toiseen. Esimerkiksi liukuluku voidaan muuntaa kokonaisluvuksi funktion `int` avulla:

```python

lampo = float(input("Anna lämpötila: "))

print("Lämpötila on", lampo)

print("...eli pyöreästi", int(lampo))

```

<sample-output>

Anna lämpötila: **5.15**
Lämpötila on 5.15
...eli pyöreästi 5

</sample-output>

Huomaa, että funktio ei pyöristä arvoa matematiikasta tutulla tavalla, vaan pyöristää luvun alaspäin (kyse on siis ns. _lattiafunktiosta_):

<sample-output>

Anna lämpötila: **8.99**
Lämpötila on 8.99
...eli pyöreästi 8

</sample-output>

Tee int-funktiota hyödyntäen ohjelma, joka kysyy käyttäjältä desimaaliluvun ja tulostaa erikseen luvun kokonaisosan ja desimaaliosan.

Huom! Voit olettaa, että annettu desimaaliluku on suurempi kuin nolla.

Esimerkiksi

<sample-output>

Anna luku: **1.34**
Kokonaisosa: 1
Desimaaliosa: 0.34

</sample-output>

</in-browser-programming-exercise>

<quiz id="9f27eeac-c049-54e8-9113-0f2b27378c1f"></quiz>
