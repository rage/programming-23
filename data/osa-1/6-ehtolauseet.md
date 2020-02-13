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

print("Seuraava asiakas, kiitos!")
``` 
Ohjelman suoritus näyttää tältä, kun syötetään luku joka on suurempi kuin 17...

<example-output>

Kuinka vanha olet? **18**
Olet täysi-ikäinen!
Seuraava asiakas, kiitos!

</example-output>

...ja tältä, kun syötetään luku joka *ei* ole suurempi kuin 17:

<example-output>
    
Kuinka vanha olet? **16**
Seuraava asiakas, kiitos!    

</example-output>

Esimerkkejä tarkastelemalla huomataan, että syötteenä annettu arvo vaikuttaa nyt siihen mitkä osat ohjelmasta suoritetaan. Lausetta, jonka avulla määritetään jokin ohjelman osa ehdollisesti suoritettavaksi kutsutaankin **ehtolauseeksi**. Ehtolauseen avulla voidaan siis määritellä ohjelmaan lohko, joka suoritetaan vain kun _annettu ehto on tosi_.

KUVA

