---
path: "/osa-1/6-ehtolauseet"
title: "Ehtolauseet ja vaihtoehtoinen toiminta"
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät, mitä tarkoittaa ehtolause ja osaat käyttää sitä omissa ohjelmissa
- Osaat muodostaa ohjelmalohkoja Pythonissa
- Tiedät, mitä tarkoitetaan totuusarvoilla
- Osaat käyttää vertailuoperaattoreita yhtäsuuruuden ja erisuuruuden toteamiseen

</text-box>


Tähän mennessä kaikki ohjelmat ovat noudattaneet samaa lineaarista suoritusjärjestystä (eli kaikissa ohjelmissa on suoritettu samat ohjelmarivit samassa järjestyksessä). Usein on kuitenkin tarpeen määritellä ohjelmaan osia, jotka suoritetaan vain tietyissä tilanteissa. 

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

<example-output>

Kuinka vanha olet? **18**
Olet täysi-ikäinen!
Tässä siis sinulle ikiomaksi GTA6.
Seuraava asiakas, kiitos!

</example-output>

...ja tältä, kun syötetään luku joka *ei* ole suurempi kuin 17:

<example-output>
    
Kuinka vanha olet? **16**
Seuraava asiakas, kiitos!    

</example-output>

Esimerkkejä tarkastelemalla huomataan, että syötteenä annettu arvo vaikuttaa nyt siihen mitkä osat ohjelmasta suoritetaan. Lausetta, jonka avulla määritetään jokin ohjelman osa ehdollisesti suoritettavaksi kutsutaankin **ehtolauseeksi**. Ehtolauseen avulla voidaan siis määritellä ohjelmaan lohko, joka suoritetaan vain kun _annettu ehto on tosi_.

KUVA

Ehtolauseessa avainsanaa `if` seuraa jokin _ehto_. Kun Python _evaluoi_ eli suorittaa ehdon, sen arvoksi tulee joko `True`tai `False` eli tosi tai epätosi. Ehtoa seuraava _lohko_ suoritetaan vain, jos ehto sai arvon tosi.

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


