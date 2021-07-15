---
path: '/part-4/1-vscode'
title: 'The Visual Studio Code editor, Python interpreter and debugging tool'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be equipped to use the Visual Studio Code editor to complete the exercises on this course
- You will be familiar with the interactive Python interpreter, and are able to use it to run code 

</text-box>

Thus far all exercises on this course have been completed on the course pages in embedded editor windows. Programming in the browser is very suitable for the first steps in programming, but now it is time to start using a separate editor especially made for programming.

There are dozens of different editors that are suited to programming. On this course we will use the [Visual Studio Code](https://code.visualstudio.com/) editor, which has been gaining traction in recent years.

Please install the Visual Studio Code editor on your own computer now. You will also need the TMC plugin, which will take care of running the tests that go with the exercises. [Here is a guide](https://www.mooc.fi/en/installation/vscode) for installing both.

<programming-exercise name='Hello Visual Studio Code' tmcname='part04-01_hello_visual_studio_code'>

Please write a program which asks the user which editor they are using. The program keeps asking until the user types in _Visual Studio Code_.

Have a look at the example of expected behaviour below:

<sample-output>

Editor: **Emacs**
not good
Editor: **Vim**
not good
Editor: **Word**
awful
Editor: **Atom**
not good
Editor: **Visual Studio Code**
an excellent choice!

</sample-output>

If the user types in Word or Notepad, the program counters with _awful_. Other unacceptable editor choices receive the reply _not good_.

The program should be case-insensitive in its reactions. That is, the same user input in lowercase, upeprcase or a mix thereof should trigger the same reaction:

<sample-output>

Editor: **NOTEPAD**
awful
Editor: **viSUal STudiO cODe**
an excellent choice!

</sample-output>

The simplest way to ensure case-insensitivity is converting all characters to the same case. The Python string method `lower` converts all characters in the string to lowercase. An example of its use:

```python
mystring = "Visual Studio CODE"
if "visual studio code" == mystring.lower():
    print("this was the string I was looking for!")
```

**NB:** this exercise doesn't ask you to write any functions, so you should __not__ place any code within a `if __name__ == "__main__"` block. The same applies to any other exercise that doesn't explicitly ask for functions.

</programming-exercise>

## Koodin suorittaminen

Visual Studio Codessa koodi suoritetaan painamalla vihreää kolmiota. Joskus koodisi suoritus voi jää kesken, esimerkiksi odottamaan käyttäjän syötettä tai ikuiseen silmukkaan, ja siirryt jo seuraavaan tehtävään. Kun yrität suorittaa seuraavan tehtävän koodia, tuleekin esille edellisen tehtävän kesken ollut suoritus. Joissain tilanteissa joudut sammuttamaan edellisen suorituksen painamalla yhtä aikaa näppäimiä _Control_+_C_, jotta saat suoritetuksi uuden tehtävän koodin.

## Interaktiivinen Python-tulkki

Emme ole toistaiseksi puhuneet kurssilla sanallakaan eräästä Python-ohjelmoinnin tärkeimmästä työkalusta, interaktiivisesta komentotulkista.

Komentotulkki käynnistyy antamalla komentoriviltä komento `python3` (joissain tapauksissa, esim. Windowsilla komento saattaa olla `python`). Esim. Macilla komentotulkin avaaminen näyttää seuraavalta:

<img src="4_1_1.png">

Komentotulkki on myös mahdollista avata Visual Studio Coden sisälle, ensin suorittamalla jokin ohjelma "vihreällä kolmiolla" ja sen jälkeen kirjoittamalla avautuvaan _Terminal_-näkymään `python3` (tai `python`)

<img src="4_1_2.png">

On olemassa myös selaimessa toimivia interaktiivisia tulkkeja, kuten <https://www.python.org/shell/>.

Komentotulkki tarjoaa interaktiivisen tavan suorittaa Python-koodia rivi riviltä sitä mukaa kuin käyttäjä kirjoittaa koodia. Ideana on, että kun käyttäjä kirjoittaa rivin koodia, Python suorittaa rivin välittömästi ja näyttää rivin operaation tuloksen:

<img src="4_1_3.png">

Komentotulkkiin on mahdollista kirjoittaa mitä tahansa Pythonia, muuttujien ja metodienkin määrittely on mahdollista:

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

Parhaimmillaan komentotulkki on pienten tarkistusten tekemiseen, esim. miten tietty metodi toimii tai onko metodia ylipäätään olemassa:

```python
>>> "TekstIä".toupper()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'str' object has no attribute 'toupper'
>>> "TekstIä".upper()
'TEKSTIÄ'
>>>
```

Jos muistaa melkein jonkin metodin nimen, googlaamisen sijaan voi olla nopeampi käyttää komentotulkkia ja kysyä funktiolla `dir`, mitä metodeja tietyllä oliolla on:

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

Kuten näemme, merkkijonoilla on suuri määrä metodeja. Kurssin tässä vaiheessa ei kannata välittää alaviivoja sisältävistä metodeista, mutta muut voivat olla käyttökelpoisia. Osa metodien toiminnasta voi selvitä kokeilemalla, osan toiminta selviää googlaamalla.

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

Tarjolla näyttää siis olevan mm. metodit `reverse` ja `clear`. Kokeillaan niitä:

```python
>>> luvut = [1,2,3,4,5]
>>> luvut.reverse()
>>> luvut
[5, 4, 3, 2, 1]
>>> luvut.clear()
>>> luvut
[]
```

Metodit siis tekevät aika lailla sen, mitä nimen perusteella voi olettaa.

Huomaa, että komentotulkki ei näytä mitään tulosta, kun kutsutaan esim. metodia `lista.reverse()`. Mistä tämä johtuu? Komentotulkki tekee komentojen suorituksen yhteydessä tulostuksen vain, jos suoritetulla koodirivillä on jokin arvo. Edellisessä esimerkissä saatiin tulostettua listan `luvut` arvo kirjoittamalla komentotulkkiin pelkkä muuttujan nimi. Komentotulkissa ei siis useinkaan ole tarvetta kirjottaa erikseen `print`-komentoja.

Tärkeä komento on `exit()`, joka sulkee komentotulkin. Erityisesti jos käytät komentotulkkia Visual Studio Codessa, se tulee muistaa sulkea, ennen kuin suoritat jonkin ohjelman uudelleen"vihreällä kolmiolla. Jos tämä unohtuu, on seurauksena hieman erikoinen virheilmoitus:

<img src="4_1_4.png">

## Debuggeri

Muutamassa edellisessä osassa on jo korostettu debuggaustaitojen tärkeyttä ja demonstroitu tulostamalla tapahtuvaa debuggausta. Visual Studio Code sisältää debuggausta varten _visuaalisen debuggerin_.

Debuggaus aloitetaan määrittelemällä koodiin _breakpoint_ eli kohta, johon debuggeri pysäyttää koodin suorituksen. Breakpoint asetetaan klikkaamalla hiirellä halutun koodirivin vasemmalta puolelta.

Seuraavassa esimerkissä breakpoint on asetettu [edellisen osan](/osa-3/1-ehdot-silmukoissa) tehtävän _Peräkkäisten summa_ hieman virheellisen ratkaisun riville 5:

<img src="4_1_5.png">

Breakpointin asetuksen jälkeen valitaan valikosta _Run_ kohta _Start debugging_. Tämä avaa valintanäkymän, josta valitaan _Python File_:

<img src="4_1_6.png">

Debuggeri käynnistyy ja alkaa suorittaa koodia normaaliin tapaan, kunnes se törmää breakpointiin ja pysähtyy:

<img src="4_1_7.png">

Vasempaan reunaan on avautunut näkymä _Variables_, joka kertoo senhetkisten muuttujien arvot. Koodia voidaan suorittaa rivi riviltä painelemalla alaspäin osoittavaa nuolta (_Step into_).

Seuraavassa tilanteessa silmukkaa on suoritettu muutamia kertoja:

<img src="4_1_8.png">

Debuggerin välilehti _Debug console_ mahdollistaa myös lausekkeiden arvojen näyttämisen debuggaushetken muuttujien arvoilla. Voidaan esimerkiksi kokeilla, mikä silmukan lopetusehdon arvo on:

<img src="4_1_9.png">

Ohjelmassa voi olla myös useita breakpointeja. Pysähtymisen jälkeen koodi voidaan taas käynnistää sinisellä kolmiolla (_Continue_) ja suoritus jatkuu, kunnes ohjelma törmää seuraavaan breakpointiin.

Visuaalinen debuggeri on vaihtoehto debug-tulostuksille, mutta on mieltymyksistä kiinni, mitä debuggaustekniikoita kukin ohjelmoija käyttää. On hyvä kokeilla erilaisia tapoja ja valita itselle sopiva tapa.
