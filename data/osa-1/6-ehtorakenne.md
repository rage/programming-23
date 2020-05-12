---
path: "/osa-1/6-ehtorakenne"
title: "Ehtorakenne"
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Suorituksen ohjaaminen on tärkeä osa ohjelmia: eri syötteitä tai tilanteita tulee usein käsitellä eri tavoilla. Tutustutaan seuraavaksi siis ehdolliseen suoritukseen.

Tämän osion suoritettuasi

- Tiedät, mitä tarkoittaa ehtorakenne ja osaat käyttää sitä omissa ohjelmissa
- Osaat muodostaa lohkoja Pythonissa
- Tiedät, mitä tarkoitetaan totuusarvoilla
- Osaat käyttää vertailuoperaattoreita yhtäsuuruuden ja erisuuruuden toteamiseen

</text-box>

Tähän mennessä kaikissa ohjelmissamme on suoritettu samat rivit samassa järjestyksessä.
Usein on kuitenkin tarpeen määritellä ohjelmaan osia, jotka suoritetaan vain tietyissä tilanteissa.

Tarkastellaan ensin esimerkkiä, joka tarkastelee, onko henkilö täysi-ikäinen:

```python
ika = int(input("Kuinka vanha olet? "))

if ika > 17:
    print("Olet täysi-ikäinen.")
    print("Tässä siis sinulle ikiomaksi GTA6.")

print("Seuraava asiakas, kiitos!")
```

Ohjelman suoritus näyttää tältä, kun ikä on suurempi kuin 17:

<sample-output>

Kuinka vanha olet? **18**
Olet täysi-ikäinen!
Tässä siis sinulle ikiomaksi GTA6.
Seuraava asiakas, kiitos!

</sample-output>

Jos kuitenkin ikä ei ole suurempi kuin 17, käy näin:

<sample-output>

Kuinka vanha olet? **16**
Seuraava asiakas, kiitos!

</sample-output>

Esimerkkejä tarkastelemalla huomataan, että syötteenä annettu arvo vaikuttaa nyt siihen, mitkä osat ohjelmasta suoritetaan. Ohjelmassa on käytössä _ehtorakenne_, jonka sisällä oleva koodi suoritetaan vain, kun annettu ehto on tosi.

<img src="1_6.png">

Ehtorakenteessa avainsanaa `if` seuraa jokin _ehto_, kuten kahden arvon vertailu. Tämän jälkeen tuleva koodi suoritetaan vain, jos ehto pitää paikkansa.

Huomaa, että ehtorakenteen ensimmäisen rivin lopussa on kaksoispiste. Seuraavassa koodissa kaksoispiste on unohtunut:

```python
ika = 10

# puolipiste unohtui seuraavan rivin lopusta...
if ika > 17
    print("Olet täysi-ikäinen.")
```

Tämän seurauksena koodi antaa virheen:

<sample-output>
<pre>
File "ohjelma.py", line 3
  if ika > 17
            ^
SyntaxError: invalid syntax
</pre>
</sample-output>

## Vertailuoperaattorit

Tyypillinen ehto on kahden arvon vertailu. Pythonin vertailuoperaattorit ovat:

| Operaattori | Merkitys       | Esimerkki    |
|:-----------:|----------------|--------------|
| `==` | Yhtä suuri    | `a == b` |
| `!=` | Eri suuri | `a != b` |
| `>` | Suurempi | `a > b` |
| `>=` | Suurempi tai yhtä suuri | `a >= b` |
| `<` | Pienempi | `a < b` |
| `<=` | Pienempi tai yhtä suuri | `a <= b` |

Tarkastellaan esimerkkinä ohjelmaa, joka tulostaa tiedon siitä, onko käyttäjän syöttämä luku negatiivinen, positiivinen vai nolla:

```python
luku = int(input("Anna luku: "))

if luku < 0:
    print("Luku on negatiivinen.")

if luku > 0:
    print("Luku on positiivinen.")

if luku == 0:
    print("Luku on nolla.")
```

Ohjelma suoritettuna kolme kertaa eri syötteillä:

<sample-output>

Anna luku: **15**
Luku on positiivinen.

</sample-output>

<sample-output>

Anna luku: **-18**
Luku on negatiivinen.

</sample-output>

<sample-output>

Anna luku: **0**
Luku on nolla.

</sample-output>

## Lohkot

Ehtorakenteen aloitusrivin jälkeiseltä riviltä alkaa _lohko_, jossa oleva koodi suoritetaan vain silloin, kun ehto on tosi. Python tunnistaa lohkoon kuuluvan koodin siitä, että jokainen rivi on _sisennetty_ samalla tavalla. Tämä tarkoittaa, että ennen lohkoon kuuluvan rivin alkua on tyhjää tilaa enemmän kuin rivillä, jolla ehto annettiin.

Esimerkiksi:

````python
salasana = input("Anna salasana: ")

if salasana == "kissa":
    print("Tiesit salasanan!")
    print("Olet siis joko oikea käyttäjä...")
    print("...tai melkoinen hakkerivelho.")

print("Ohjelman suoritus päättyi. Kiitos ja hei!")
````

Tyhjä tila saadaan aikaan _tabulaattorilla_, jonka saat Tab-näppäimestä.

<img src="1_6_keyboard.png">

Suurin osa editoreista osaa automaattisesti sisentää rivin, kun edellinen rivi päättyy kaksoispisteeseen. Lohkon kirjoittamisen voit lopettaa editorissa painamalla rivin alussa `Backspace`-näppäintä.

TODO: kuva myös backspacesta

## Totuusarvot

Ehtorakenteessa käytettävä ehto saa totuusarvon `True` (tosi) tai `False` (epätosi). Esimerkiksi ehto `a < 5` on tosi jos `a` on alle 5 ja epätosi jos `a` on 5 tai suurempi.

Voimme asettaa ehdon tuloksen muuttujan arvoksi samaan tapaan kuin laskutoimituksen tuloksen:

```python
a = 3
ehto = a < 5
print(ehto)
if ehto:
    print("a on pienempi kuin 5")
```

<sample-output>

True
a on pienempi kuin 5

</sample-output>

Voimme käyttää koodissa myös sanoja `True` ja `False`. Esimerkiksi seuraava koodi suorittaa `print`-komennon aina, koska ehdon arvona on `True`:

```python
ehto = True
if ehto:
    print("Tänne tullaan aina")
```

<sample-output>

Tänne tullaan aina

</sample-output>

Tällainen ohjelma ei ole sinänsä kovin hyödyllinen, mutta myöhemmin kurssilla näemme, mitä hyötyä on totuusarvoista muuttujissa.