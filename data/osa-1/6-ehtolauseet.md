---
path: "/osa-1/6-ehtolauseet"
title: "Ehtolauseet ja vaihtoehtoinen toiminta"
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Suorituksen ohjaaminen on tärkeä osa ohjelmia: eri syötteitä tai tilanteita tulee usein käsitellä eri tavoilla. Tutustutaan seuraavaksi siis ehdolliseen suoritukseen.

Tämän osion suoritettuasi

- Tiedät, mitä tarkoittaa ehtolause ja osaat käyttää sitä omissa ohjelmissa
- Osaat muodostaa ohjelmalohkoja Pythonissa
- Tiedät, mitä tarkoitetaan totuusarvoilla
- Osaat käyttää vertailuoperaattoreita yhtäsuuruuden ja erisuuruuden toteamiseen

</text-box>


Tähän mennessä kaikki ohjelmat ovat noudattaneet samaa lineaarista suoritusjärjestystä: kaikissa ohjelmissa on suoritettu samat ohjelmarivit samassa järjestyksessä. Usein on kuitenkin tarpeen määritellä ohjelmaan osia, jotka suoritetaan vain tietyissä tilanteissa.

Tarkastellaan ensin esimerkkiä, joka tarkastelee onko henkilö täysi-ikäinen:

```python

# Kysytään ikää ja muutetaan syöte kokonaisluvuksi
age = int(input("Kuinka vanha olet? "))

# Testataan: jos ikä on suurempi kuin 17 (eli vähintään 18...)
if age > 17:
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

Esimerkkejä tarkastelemalla huomataan, että syötteenä annettu arvo vaikuttaa nyt siihen mitkä osat ohjelmasta suoritetaan. Lausetta, jonka avulla määritetään jokin ohjelman osa ehdollisesti suoritettavaksi kutsutaankin **ehtolauseeksi**. Ehtolauseen avulla voidaan siis määritellä ohjelmaan lohko, joka suoritetaan vain kun _annettu ehto on tosi_.

<img src="1_6.png">

Ehtolauseessa avainsanaa `if` seuraa jokin _ehto_. Kun Python _evaluoi_ eli suorittaa ehdon, sen arvoksi tulee joko `True` tai `False` eli tosi tai epätosi. Ehtoa seuraava _lohko_ suoritetaan vain, jos ehto sai arvon tosi.

## Vertailuoperaattorit

Tyypillisesti ehto on kahden tai useamman operandin vertailu. Seuraavassa taulukossa on esitelty muutamia Pythonin vertailuoperaattoreita ja esimerkkejä

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

Tarkastellaan esimerkkinä ohjelmaa, joka tulostaa tiedon siitä onko käyttäjän syöttämä luku negatiivinen, positiivinen vai nolla:

```python

# Luetaan syöte ja muunnetaan merkkijono kokonaisluvuksi
number = int(input("Anna luku: "))

# Onko pienempi kuin nolla
if number < 0:
    print("Luku on negatiivinen.")

# Onko suurempi kuin nolla
if number > 0:
    print("Luku on positiivinen.")

# Onko tasan nolla
if number == 0:
    print("Luku on nolla.")

```

(Ohjelmaa tarkastellessa tulee ehkä mieleen, että viimeinen ehto tuntuu vähän turhalta - tässä vaiheessa luulisi olevan jo selvää, että luvun pitää olla nolla. Tähän palataan ensi viikolla tarkemmin.)

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

Ehtolauseen perässä on kaksoispiste, ja sen jälkeiseltä riviltä alkaa suoritettava _lohko_. Niinkuin aiemmin huomattiin, ehtoa seuraava lohko suoritetaan vain jos ehto on tosi. Mistä Python tunnistaa lohkoon kuuluvat ohjelmarivit (eli lauseet)?

Jokainen lohkoon kuuluva rivi on _sisennetty_ samalla tavalla. Ennen rivin alkua on siis tyhjää tilaa enemmän kuin rivillä, jolla ehtolause annettiin.

Esimerkiksi:

````python

# Luetaan käyttäjältä salasana
password = input("Anna salasana: ")

# Testataan onko salasana
if password == "salainen sana":
    # Lohko alkaa tästä: kaikki lohkoon kuuluvat rivit on sisennetty

    print("Tiesit salasanan!")
    print("Olet siis joko oikea käyttäjä...")
    print("...tai melkoinen hakkerivelho.")

    # Lohko loppuu tähän: seuraava rivi suoritetaan
    # aina riippumatta siitä oliko ehto tosi vai ei

print("Ohjelman suoritus päättyi. Kiitos ja hei!")

````

Tyhjä tila voidaan esittää joko välilyönneillä (yleensä käytetään neljää välilyöntiä) tai _tabulaattorilla_, jonka saat Tab-näppäimestä.

<img src="1_6_keyboard.png">

Suurin osa editoreista osaa automaattisesti sisentää rivin, kun edellinen rivi päättyy kaksoispisteeseen. Lohkon kirjoittamisen voit lopettaa editorissa painamalla rivin alussa `Backspace`-näppäintä.

Useissa muissa ohjelmointikielessä käytetään erillisiä symboleita kuvaamaan lohkon alkua ja loppua. Pythonissa lohkon määrittää siis rivien sisentäminen. Tästä on se etu, että ohjelmakoodi on pakko kirjoittaa helpommin luettavaksi.

Huomaa, että Pythonissa ei voi kirjoittaa tyhjää lohkoa - lohkon sisällä on aina oltava vähintään yksi lause (eikä kommentteja lasketa lauseeksi). Jos haluat kirjoittaa lohkon ilman toteuttavia rivejä (esimerkiksi kirjoittaaksesi toteutuksen myöhemmin), voit käyttää avainsanaa `pass`.

```python

if True:
    # Tässä ei tapahdu mitään
    pass

```

Lause `pass` on siis kaikin puolin kelvollinen Python-kielen lause, se ei vaan tee mitään.

## Totuusarvot

Niinkuin aikaisemmin huomattiin, ehtolauseessa käytettävä ehto (eli ehtolauseke) saa arvokseen `True` tai `False`.

Totuusarvo voidaan myös asettaa suoraan muuttujan arvoksi:

```python

# Muuttujan arvoksi True
totuus = True

# Koska arvo on tosi, lohko suoritetaan
if (totuus):
    print("Arvo oli tosi")

# Vaihdetaan arvoksi False
totuus = False

# Nyt arvo on epätosi, joten lohkoa ei suoriteta
if (totuus):
    print("Arvo on vieläkin tosi")

```

Ohjelma tulostaa suoritettaessa arvon vain ensimmäistä ehtolausetta seuraavasta lohkosta:

<sample-output>

Arvo oli tosi

</sample-output>

Koska ehtolauseessa käytettävä ehto on myös _lauseke_, se voidaan asettaa muuttujan arvoksi:

```python

# Alustetaan pari muuttujaa
ikä1 = 24
ikä2 = 32
ikä3 = 19

# Muuttujan eka_vanhempi arvoksi tulee ehtolausekkeen arvo
eka_vanhempi = (ikä1 > ikä2)

# Tulostetaan muuttujan arvo...
print(eka_vanhempi)

#...ja käytetään sitä ehtolauseessa
if (eka_vanhempi):
    print("Eka on vanhempi kuin toka!")

# Vaihdetaan arvoksi uuden ehtolausekkeen arvo
eka_vanhempi = (ikä1 > ikä3)

# Testataan...

if (eka_vanhempi):
    print("Eka on vanhempi kuin kolmas!")

```

Ohjelman suoritus tulostaa:

<sample-output>

False
Eka on vanhempi kuin kolmas!

</sample-output>



