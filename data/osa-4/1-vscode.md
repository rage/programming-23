---
path: '/osa-4/1-vscode'
title: 'Visual Studio Code -editori'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat käyttää Visual studio Code -editoria kurssin tehtävien tekemiseen

</text-box>

Olemme tähän mennessä tehneet kaikki tehtävät kurssisivuille upotettuihin editori-ikkunoihin. Selaineditorissa tapahtuva ohjelmointi sopii hyvin kurssin alkuun, mutta siirrymme nyt ohjelmoimaan koodaukseen tarkoitettua editoria käyttäen.

Erilaisia ohjelmointiin sopivia editoreja on kymmeniä. Käytämme kurssilla viime vuosina suureen suosioon noussutta [Visual Studio Code](https://code.visualstudio.com/) -editoria. 

Asenna nyt Visual Studio Code ja kurssin tehtävien testien suorittamiseen käytettävä TMC-plugin [tämän ohjeen](https://www.mooc.fi/fi/installation/vscode) avulla.

<programming-exercise name='Hello Visual Studio Code' tmcname='osa04-01_hello_visualstudio_code'>

Tee ohjelma, joka kysyy käyttäjältä, mikä editori on käytössä. Ohjelma jatkaa, kunnes vastaus on _Visual Studio Code_. 

Seuraava käyttöesimerkki havainnollistaa ohjelman haluttua tulostusta:

<sample-output>

editori: **emacs**
ei ole hyvä
editori: **vim**
ei ole hyvä
editori: **word**
surkea
editori: **atom**
ei ole hyvä
editori: **visual studio code**
loistava valinta!

</sample-output>

Jos käyttäjä vastaa Word tai Notepad ohjelma vastaa _surkea_. Muissa epäkelvoissa tapauksissa vastaus on _ei ole hyvä_.

Ohjelman tulee toimia siten, että "oikean vastauksen" kirjoitusasu ei riipu siitä, kirjoitetaanko vastaus isoja vai pieniä kirjaimia käyttämällä: 

<sample-output>

editori: **NOTEPAD**
surkea
editori: **viSUal STudiO cODe**
loistava valinta!

</sample-output>

Kirjainten koon voi jättää huomiotta esim. muuttamalla kirjaimet pienksi merkkijonojen metodilla `lower`, jota voi käyttää seuraavasti:

```python
mjono = "Visual Studio CODE"
if "visual studio code" == mjono.lower():
    print("merkkijono oli etsitty!")
```

</programming-exercise>
