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

Erilaisia ohjelmointiin sopivia editoreja on kymmeniä. Käytämme kurssilla viime vuosina suureen suosioon noussutta [Visual studio code](https://code.visualstudio.com/) -editoria. 

Asenna nyt Visual studio code ja kurssin tehtävien testien suorittamiseen käytettävä TMC-plugin [tämän ohjeen](https://www.mooc.fi/fi/installation/vscode) avulla.

<programming-exercise name='Hello Visual studio Code' tmcname='osa04-01_hello_visualstudio_code'>

Tee ohjelma, joka kysyy mitä editori on käytössä. Ohjelma jatkaa kunnes vastaus on _visual studio code_. 

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

Jos käyttäjä vastaa word tai notepad ohjelma vastaa _surkea_, muissa epäkevoissa tapauksissa vastaus on _ei ole hyvä_.

Ohjelman tulee toimia siten, että "oikean vastauksen" kirjoitusasu ei riipu siitä kirjoitetaanko vastaus isoja vai pieniä kirjaimia käyttämällä: 

<sample-output>

editori: **notepad**
surkea
editori: **viSUal STudiO cODe**
se on paras!

</sample-output>

Kirjainten koon voi jättää huomiotta, esim. muuttamalla kirjaimet pienksi merkkijonojen metodilla `lower`, jota voi käyttää seuraavasti:

```python
merkkijono = "Visual Studio CODE"
if "visual studio code" == sana.lower():
  print("merkkijono oli etsitty!")
```

</programming-exercise> 