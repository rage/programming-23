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

Tässä tapauksessa funktio _palauttaa_ arvon, mikä tarkoittaa, että funktion kutsukohtaan ilmestyy arvo funktion suorituksen jälkeen. Funktion `input` palauttama arvo on käyttäjän syöttämä teksti merkkijonona. Funktion palauttama arvo sijoitetaan usein muttuujan arvoksi, jotta arvoa voidaan hyödyntää ohjelmassa.

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

Huomaa, että funktio ei pyöristä arvoa matemaatikasta tutulla tavalla, vaan pyöristää luvun alaspäin (kyse on siis ns. _lattiafunktiosta_):

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

<quiz id="aa9cc4e3-87dd-4194-9e95-e1887c09cea8"></quiz>
