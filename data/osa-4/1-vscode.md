---
path: '/osa-4/1-vscode'
title: 'Visual Studio Code -editori ja python-tulkki'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Osaat käyttää Visual studio Code -editoria kurssin tehtävien tekemiseen
- Osaat suorittaa koodia interaktiivisen python-tulkin avulla 

</text-box>

Olemme tähän mennessä tehneet kaikki tehtävät kurssisivuille upotettuihin editori-ikkunoihin. Selaineditorissa tapahtuva ohjelmointi sopii hyvin kurssin alkuun, mutta siirrymme nyt ohjelmoimaan koodaukseen tarkoitettua editoria käyttäen.

Erilaisia ohjelmointiin sopivia editoreja on kymmeniä. Käytämme kurssilla viime vuosina suureen suosioon noussutta [Visual Studio Code](https://code.visualstudio.com/) -editoria.

Asenna nyt Visual Studio Code ja kurssin tehtävien testien suorittamiseen käytettävä TMC-plugin [tämän ohjeen](https://www.mooc.fi/fi/installation/vscode) avulla.

<programming-exercise name='Hello Visual Studio Code' tmcname='osa04-01_hello_visualstudio_code'>

Tee ohjelma, joka kysyy käyttäjältä, mikä editori on käytössä. Ohjelma jatkaa, kunnes vastaus on _Visual Studio Code_.

Seuraava käyttöesimerkki havainnollistaa ohjelman haluttua tulostusta:

<sample-output>

Editori: **Emacs**
ei ole hyvä
Editori: **Vim**
ei ole hyvä
Editori: **Word**
surkea
Editori: **Atom**
ei ole hyvä
Editori: **Visual Studio Code**
loistava valinta!

</sample-output>

Jos käyttäjä kirjoittaa Word tai Notepad, ohjelma vastaa _surkea_. Muissa epäkelvoissa tapauksissa vastaus on _ei ole hyvä_.

Ohjelman tulee toimia siten, että "oikean vastauksen" kirjoitusasu ei riipu siitä, kirjoitetaanko vastaus isoja vai pieniä kirjaimia käyttämällä:

<sample-output>

Editori: **NOTEPAD**
surkea
Editori: **viSUal STudiO cODe**
loistava valinta!

</sample-output>

Kirjainten koon voi jättää huomiotta esim. muuttamalla kirjaimet pienksi merkkijonojen metodilla `lower`, jota voi käyttää seuraavasti:

```python
mjono = "Visual Studio CODE"
if "visual studio code" == mjono.lower():
    print("merkkijono oli etsitty!")
```

</programming-exercise>

## Interaktiivinen python-tulkki

Emme ole toistaiseksi puhuneet kurssilla sanallakaan eräästä python-ohjelmoinnin tärkeimmästä työkalusta, interaktiivisesta komentotulkista.

Komentotulkki käynnistyy antamalla komentoriviltä komento `python3` (joissain tapauksissa, esim. Windowsilla komento saattaa olla `python`). Esim. Macilla komentotulkin avaaminen näyttää seuraavalta:

<img src="4_1_1.png">

Komentotulkki on myös mahdollista avata Visual studio Code -editorin sisälle, ensin suorittamalla jokin ohjelma "vihreällä kolmiolla" ja sen jälkeen kirjoittamalla avautuvaan _Terminal_-näkymään `python3` (tai `python`)

<img src="4_1_2.png">

On olemassa myös selaimessa toimivia interaktiivisia tulkkeja, esim. <https://www.python.org/shell/>

Komentotulkki tarjoaa interaktiivisen tavan suorittaa python-koodia rivi riviltä sitä mukaa kun käyttäjä kirjoittaa koodia. Ideana on siis, se että käyttäjä kirjoittaa yhden koodirivin ja pyhton suorittaa rivin välittömästi, ja näyttää rivin operaation tuloksen:

<img src="4_1_3.png">

Konsoliin on mahdollista kirjoittaa mitä tahansa pythonia, muuttujien ja metodienkin määrittely on mahdollista:

```python
>>> t = [1,2,3,4,5]
>>> for luku in t:
...   print(luku)
... 
1
2
3
4
5
>>> def itseisarvo(luku):
...   if luku<0:
...      luku = -luku
...   return luku
... 
>>> x = 10
>>> y = -7
>>> itseisarvo(luku)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'luku' is not defined
>>> itseisarvo(x)
10
>>> itseisarvo(y)
7
>>> 
```

Parhaimmillaan konsoli onkin pienten tarkistusten tekemiseen, esim. miten tietty metodi toimii, ja onko metodia ylipäätään olemassa:

```python
>>> "TekstIä".toupper()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'str' object has no attribute 'toupper'
>>> "TekstIä".upper()
'TEKSTIÄ'
>>> 
```

Jos muistaa melkein jonkin metodin nimen, googlaamisen sijaan voi olla nopeampi käyttää konsolia ja "kysyä" funktion `dir` avulla mitä metodeja tietyllä oliolla on:

```python
>>> dir("teksti")
['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__', '__eq__', 
'__format__', '__ge__', '__getattribute__', '__getitem__', '__getnewargs__', '__gt__', 
'__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', 
'__mod__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', 
'__rmod__', '__rmul__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 
'capitalize', 'casefold', 'center', 'count', 'encode', 'endswith', 'expandtabs', 'find', 
'format', 'format_map', 'index', 'isalnum', 'isalpha', 'isascii', 'isdecimal', 'isdigit', 
'isidentifier', 'islower', 'isnumeric', 'isprintable', 'isspace', 'istitle', 'isupper', 'join',
'ljust', 'lower', 'lstrip', 'maketrans', 'partition', 'replace', 'rfind', 'rindex', 'rjust','rpartition', 'rsplit', 'rstrip', 'split', 'splitlines', 'startswith', 'strip', 'swapcase',
'title', 'translate', 'upper', 'zfill']
```

Kuten näemme, on merkkijonoilla suuri määrä metodeja. Kurssin tässä vaiheessa kannattaa ehkä unohtaa alaviivoja sisältävät metodit, mutta muut voivat olla käyttökelpoisia. Osa metodien toimonnasta voi selvitä jo kokeilemalla, osan toiminta selviää helposti googlaamalla.

Listojen metodeista käy ilmi seuraavaa:

```python
>>> dir([])
['__add__', '__class__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__',
'__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', 
'__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', 
'__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', 
'__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', 
'__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 
'remove', 'reverse', 'sort']
>>>
```

Tarjolla näyttää siis olevan mm. metodit `reverse` ja `clear. Kokeillaan niitä:

```python
>>> lista = [1,2,3,4,5]
>>> lista.reverse()
>>> lista
[5, 4, 3, 2, 1]
>>> lista.clear()
>>> lista
[]
```

Metodit siis tekevät aikalailla sen mitä nimen perustella voi olettaa. 

Tärkein konsolin kommenteista on `exit()`, joka sulkee konsolin. Erityisesti jos käytät konsolia Visual studio Codessa, se tulee muistaa sulkea ennen suoritat jonkun ohjelman uudelleen "vihreällä kolmiolla". Jos tämä unohtuu, on seurauksena hieman erikoinen virheilmoitus:

<img src="4_1_4.png">