---
path: '/osa-1/3-syotteen-lukeminen'
title: 'Syötteen lukeminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>


- Opit kirjoittamaan ohjelman, joka lukee käyttäjän syötteen
- Tiedät, mitä tarkoitetaan muuttujalla
- Osaat käyttää muuttujaa syötteen lukemisessa ja tulostamisessa

</text-box>

Palautetaan mieleen ensimmäisessä osassa esitetty yksinkertaistettu kaavio ohjelmien suorittamisesta:

KUVA

Ohjelman suorituksen erikoistamiseksi tarvitsemme keinon lukea käyttäjältä syötteitä. Pythonissa tähän tarkoitukseen käytetään funktiota `input`. Samoin kuin print-funktio, myös se saa parametrikseen merkkijononon. Tämä merkkijono tulostetaan käyttäjlle kehotteeksi (eli viestiksi, jonka tarkoitus on ohjata käyttäjää antamaan oikeanlainen syöte).

Esimerkki ohjelmasta, jossa luetaan käyttäjän nimi käyttäen `input`-funktiota ja tulostetaan ruudulle tervehdys käyttäen `print`-funktiota:

```python
# Luetaan käyttäjän nimi ja tallennetaan se muuttujaan name
name = input("Anna nimesi: ")

# Tulostetaan käyttäjälle viesti hyödyntäen muuttujaa name
print("Moi vaan, " + name)
```

Ohjelman suoritus voisi näyttää esimerkiksi seuraavalta (käyttäjän kirjoittama syöte on merkitty **lihavoituna**:

<sample-output>
Anna nimesi: **Pekka Python**
Moi vaan, Pekka Python
</sample-output>

Ohjelman tuloste riippuu siis osittain käyttäjän syötteestä. Niinpä ohjelman suoritus voisi näyttää myös tältä:

<sample-output>
Anna nimesi: **Outi Ohjelmoija**
Moi vaan, Outi Ohjelmoija
</sample-output>

Ensimmäisellä rivillä oleva sana name on **muuttuja**. Muuttujalla tarkoitetaan ohjelmoinnissa "lokeroa", johon voidaan tallentaa jokin _arvo_. Tämä arvo voidaan myöhemmin lukea tai sitä voidaan _muuttaa_.

<text-box>
Muuttujat voi periaatteesssa ohjelmissa nimetä vapaasti (tiettyjä Python-kielen asettamia rajoituksia noudattaen). Tällä kurssilla muuttujat ja muut vastaavat ohjelmien osat nimetään englanniksi. Ohjelmoinnissa käytetään yleisesti englantia kielenä muutenkin - jos etsit Googlen avulla ohjelmointiesimerkkejä, ne todennäköisesti ovat englanniksi.
</text-box>

Samaan muuttujaan voidaan viitata ohjelmassa useasti:

```python
# Luetaan käyttäjän syöte muuttujaan name
name = input("Anna nimesi: ")

# Tulostetaan kaksi viestiä
print("Moi, " + name + "!")
print(name + " on aika kiva nimi.")
```

Esimerkkitulostus (kun käyttäjä syöttää merkkijonon `Pauli Python`:

<sample-output>
Anna nimesi: **Pauli Python**
Moi, Pauli Python!
Pauli Python on aika kiva nimi.
</sample-output>

Tarkastellaanpa tulostuskomentoja vähän tarkemmin: `print`-funktiota kutsuttaessa parametriksi annetaan merkkijono, johon on yhdistetty sekä valmista (eli _vakiomuotoista_) tekstiä ja käyttäjän syöte. Nämä on yhdistetty toisiinsa `+`-operaattorilla, joka yhdistää kaksi merkkijonoa yhdeksi uudeksi merkkijonoksi. Operaatiota kutsutaan merkkijonojen _katenoinniksi_.

Vakiomuotoisia merkkijonoja voidaan yhdistellä muuttujien arvoihin vapaasti:

```python
# Luetaan käyttäjän syöte muuttujaan name
name = input("Anna nimesi: ")

# Tulostetaan viesti
print("Moi " + name + "! Varmistan vielä: nimesi on siis " + name + "?")
```

Esimerkkitulostus voisi näyttää tältä, kun käyttäjä syöttää merkkijonon `Erkki Esimerkki`:

<sample-output>
Anna nimesi: Erkki Esimerkki
Moi Erkki Esimerkki! Varmistan vielä: nimesi on siis Erkki Esimerkki?
</sample-output>


    

