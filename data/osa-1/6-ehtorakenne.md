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
Ohjelman suoritus näyttää tältä, kun syötetään luku joka on suurempi kuin 17...

<sample-output>

Kuinka vanha olet? **18**
Olet täysi-ikäinen!
Tässä siis sinulle ikiomaksi GTA6.
Seuraava asiakas, kiitos!

</sample-output>

...ja tältä, kun syötetään luku joka *ei* ole suurempi kuin 17:

<sample-output>

Kuinka vanha olet? **16**
Seuraava asiakas, kiitos!

</sample-output>

Esimerkkejä tarkastelemalla huomataan, että syötteenä annettu arvo vaikuttaa nyt siihen, mitkä osat ohjelmasta suoritetaan.
Ohjelmassa on käytössä **ehtorakenne**,
jonka sisällä oleva koodi suoritetaan vain, kun _annettu ehto on tosi_.

<img src="1_6.png">

Ehtorakenteessa avainsanaa `if` seuraa jokin _ehto_. Kun Python laskee ehdon arvon, tuloksena on joko `True` tai `False` eli tosi tai epätosi.
Tämän jälkeen tuleva koodi suoritetaan vain, jos ehto sai arvon tosi.

## Vertailuoperaattorit

Tyypillinen ehto on kahden arvon vertailu. Seuraavassa taulukossa on esitelty muutamia Pythonin vertailuoperaattoreita ja esimerkkejä:

TODO: tässä olisi varmasti hyvä olla myös >= ja <=?

| Operaattori | Merkitys       | Esimerkki    | ...saa arvon |
|:-----------:|----------------|--------------|:------------:|
| `==`        | Yhtäsuuruus    | `(2 + 2) == 4` | `True`|
| | | `5 *  10 == 40` | `False`|
| `!=` | Erisuuruus | `(2 + 2) != 5` | `True`|
| | | `"Peter" != "Pet" + "er"` | `False`|
| `>` | Suurempi kuin | `9 > 3 + 4` | `True`|
| | | `"abc" > "bcd"` | `False` |
| `<`| Pienempi kuin | `"abc" < "bcd"` | `True`|
| | | `5 * 2 < 9.99` | `False`|

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

Anna luku: **-18**
Luku on negatiivinen.

Anna luku: **0**
Luku on nolla.

</sample-output>


## Lohkot

TODO: olisiko hyvä myös esitellä käsite "lohko" vähän myöhemmin yleisemmin?

Ehtorakenteen aloitusrivin jälkeiseltä riviltä alkaa _lohko_,
jossa oleva koodi suoritetaan vain silloin, kun ehto on tosi.

Python tunnistaa lohkoon kuuluvan koodin siitä,
että jokainen rivi on _sisennetty_ samalla tavalla.
Ennen rivin alkua on siis tyhjää tilaa enemmän kuin rivillä, jolla ehto annettiin.

Esimerkiksi:

````python

salasana = input("Anna salasana: ")

if salasana == "kissa":
    print("Tiesit salasanan!")
    print("Olet siis joko oikea käyttäjä...")
    print("...tai melkoinen hakkerivelho.")

print("Ohjelman suoritus päättyi. Kiitos ja hei!")

````

Tyhjä tila voidaan esittää joko välilyönneillä (yleensä käytetään neljää välilyöntiä) tai _tabulaattorilla_, jonka saat Tab-näppäimestä.

<img src="1_6_keyboard.png">

Suurin osa editoreista osaa automaattisesti sisentää rivin, kun edellinen rivi päättyy kaksoispisteeseen. Lohkon kirjoittamisen voit lopettaa editorissa painamalla rivin alussa `Backspace`-näppäintä.

Useissa muissa ohjelmointikielessä käytetään erillisiä symboleita kuvaamaan lohkon alkua ja loppua. Pythonissa lohkon määrittää siis rivien sisentäminen. Tästä on se etu, että ohjelmakoodi on pakko kirjoittaa helpommin luettavaksi.

TODO: `pass` on hyvä esitellä jossain muualla kuin tässä

## Totuusarvot

Kuten aikaisemmin huomattiin, ehtorakenteessa käytettävä ehto saa totuusarvon `True` tai `False`.

Totuusarvo voidaan myös asettaa suoraan muuttujan arvoksi:

```python

totuus = True

if totuus:
    print("Arvo on tosi")

totuus = False

if totuus:
    print("Arvo on vieläkin tosi")

```

Ohjelma tulostaa suoritettaessa arvon vain ensimmäistä ehtoa seuraavasta lohkosta:

<sample-output>

Arvo on tosi

</sample-output>

Samalla tavalla ehdon tulos voidaan asettaa muuttujan arvoksi:

```python

ika1 = 24
ika2 = 32
ika3 = 19

eka_vanhempi = (ika1 > ika2)
print(eka_vanhempi)

if eka_vanhempi:
    print("Eka on vanhempi kuin toka!")

eka_vanhempi = ika1 > ika3
print(eka_vanhempi)

if eka_vanhempi:
    print("Eka on vanhempi kuin kolmas!")

```

Ohjelman suoritus tulostaa:

<sample-output>

False
True
Eka on vanhempi kuin kolmas!

</sample-output>



