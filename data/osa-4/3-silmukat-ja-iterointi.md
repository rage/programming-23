---
path: '/osa-4/3-silmukat-ja-iterointi'
title: 'Silmukat ja iterointi'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, mitä tarkoitetaan iteroinnilla
- Tiedät, miten `for`-silmukka toimii
- Osaat käyttää `for`-silmukkaa listojen ja merkkijonojen läpikäyntiin

</text-box>

Voimme käydä listan alkiot läpi `while`-silmukalla samaan tapaan kuin olemme aiemmin käyneet läpi merkkijonon merkkejä. Esimerkiksi seuraava ohjelma tulostaa kaikki listan alkiot omille riveilleen:

```python
lista = [3, 2, 4, 5, 2]

kohta = 0
while kohta < len(lista):
    print(lista[kohta])
    kohta += 1
```

<sample-output>

3
2
4
5
2

</sample-output>

Tämä on kuitenkin melko vaivalloinen tapa, sillä joudumme käyttämään indeksimuuttujaa `kohta`, joka "muistaa", missä kohtaa listaa ollaan menossa. Nyt on aika opetella parempi tapa listan, merkkijonon tai muun vastaavan rakenteen läpikäyntiin.

## for-silmukka

Pythonin `for`-silmukka käy läpi annetun rakenteen sisällön. Esimerkiksi voimme käydä läpi kaikki listalla olevat alkiot vasemmalta oikealle. Ohjelmoinnissa tällaista läpikäyntiä kutsutaan myös nimellä _iterointi_.

Ideana on, että `for`-silmukka poimii yksi kerrallaan kunkin alkion ja suorittaa kaikille saman operaation. Näin ohjelmoijan ei tarvitse itse huolehtia, mistä kohdasta alkio haetaan missäkin vaiheessa. Silmukan syntaksi on seuraava:

```python
for <muuttuja> in <rakenne>:
    <lohko>
```

Kun `for`-silmukka käy listan läpi, se poimii vuorollaan kunkin alkion, sijoittaa sen muuttujaan ja suorittaa lohkon. Kun silmukka on käynyt kaikki alkiot läpi, ohjelman suoritus jatkuu silmukan jälkeiseltä riviltä.

<img src="4_3_1.png" alt="Listan iterointi">

Seuraava ohjelma tulostaa listan kaikki alkiot `for`-silmukan avulla:

```python
lista = [3, 2, 4, 5, 2]

for alkio in lista:
    print(alkio)
```

<sample-output>

3
2
4
5
2

</sample-output>

Jos verrataan tätä edelliseen esimerkkiin, huomataan, että `for`-silmukka selkeyttää suoraviivaista listan alkioiden läpikäyntiä huomattavasti.

Voimme käydä samalla idealla läpi myös merkkijonon merkit:

```python
nimi = input("Anna nimesi: ")

for merkki in nimi:
    print(merkki)
```

<sample-output>

Anna nimesi: Pekka
P
e
k
k
a

</sample-output>

## Funktio `range`

Silmukkaa tarvitaan usein myös siihen, että haluamme toistaa jonkin asian tietyn määrän kertoja tai käydä läpi tietyn lukuvälin (esimerkiksi kaikki luvut väliltä 1–100). Myös tämä onnistuu kätevästi `for`-silmukalla funktion `range` avulla.

Voimme kutsua `range`-funktiota monella tavalla. Yksinkertaisin tapa on `range(n)`, jolloin silmukka käy läpi kokonaisluvut 0:sta lukuun `n`–1:

```python
for i in range(5):
    print(i)
```

<sample-output>

0
1
2
3
4

</sample-output>

Kun annamme kaksi parametria, `range(a, b)` aloittaa luvusta `a` ja lopettaa lukuun `b`–1:

```python
for i in range(3, 7):
    print(i)
```

<sample-output>

3
4
5
6

</sample-output>

Kun annamme kolme parametria, `range(a, b, c)` aloittaa luvusta `a`, lopettaa lukuun `b`–1 ja muuttaa lukua `c`:llä joka askeleella:

```python
for i in range(1, 9, 2):
    print(i)
```

<sample-output>

1
3
5
7

</sample-output>

Voimme myös antaa negatiivisen askeleen, jolloin luvut käydään läpi käänteisesti:

```python
for i in range(6, 2, -1):
    print(i)
```

<sample-output>

6
5
4
3

</sample-output>

## Lukuväli listaksi

Funktio `range` palauttaa lukuvälin, joka voidaan käydä läpi listan kaltaisesti mutta joka ei kuitenkaan ole lista. Tämän näkee siitä, että jos tulostamme funktion palauttaman arvon, näemme vain kuvauksen lukuvälistä:

```python
luvut = range(2, 7)
print(luvut)
```

<sample-output>

range(2, 7)

</sample-output>

Tutustumme asiaan tarkemmin Ohjelmoinnin jatkokurssilla, mutta on hyvä tietää, että voimme muuttaa lukuvälin listaksi funktiolla `list`. Tällöin listaan tulevat kaikki lukuväliin kuuluvat arvot:

```python
luvut = list(range(2, 7))
print(luvut)
```

<sample-output>

[2, 3, 4, 5, 6]

</sample-output>

## Tulostamisen monet tavat

TODO: Tämä on hyvää asiaa mutta onko tämä oikea paikka sille? Osion aiheena on silmukat ja iterointi.

Voimme yhdistää tietoa toisiinsa `print`-komennossa monilla tavoilla. Yksi tapa on käyttää merkkijonojen `+`-operaattoria.

```python
nimi = "Erkki"
ika = 39
print("Hei " + nimi + " ikäsi on " + str(ika) + " vuotta" )
```

Tämä tapa edellyttää, että kaikki yhdistettävät osat ovat merkkijonoja. Koska muuttuja `ika` on tyypiltään kokonaisluku, se on muutettu yhdistämistä varten merkkijonoksi funktiolla `str`.

Voimme myös käyttää yhdistämiseen pilkkua, jolloin yhdistettävät osat voivat olla eri tyyppisiä:

```python
print("Hei", nimi, "ikäsi on", ika, "vuotta" )
```

Tämän koodin lopputulos on sama kuin edellisessä koodissa. Näin käytettynä `print` tulostaa kaikki parametrinsa välilyönnillä eroteltuna.

Nämä ovat toimivia tapoja, mutta voimme toteuttaa tulostamisen lyhemmin myös näin:

```python
print(f"Hei {nimi} ikäsi on {ika} vuotta")
```

Tässä merkkijonon alussa on kirjain _f_, mikä tarkoittaa että merkkijono on _f-string_. Merkkijonon sisälle on sijoitettu aaltosuluissa muuttujia, joiden arvot tulevat merkkijonon osaksi. Tulostus on täsmälleen sama kuin aiemmissa esimerkeissä.

Voimme muotoilla monin tavoin f-stringien avulla tapahtuvaa tulostusta. Yksi tavallinen käyttötapa on antaa liukuluvun tulostuksessa näytettävien desimaalien määrä. Oletusarvoisesti tulostuu jokin määrä desimaaleja:

```python
luku = 1/3
print("Luku on", luku)
```

<sample-output>

Luku on 0.333333333333333

</sample-output>

Saamme määriteltyä tulostuvien desimaalien määrän f-stringin avulla. Tulostuksen muoto määritellään lisäämällä aaltosulkeiden sisään tulostettavan muuttujan jälkeen kaksoispiste ja _muotoiluohje_:

```python
luku = 1/3
print(f"Luku on {luku:.2}")
```

```python
Luku on 0.33
```

Muotoiluohje `.2` siis määrittelee, että desimaaliluku tulostetaan _kahden desimaalin_ tarkkuudella.

Tässä on vielä toisenlainen esimerkki, jossa tulostetaan nimiä 15 merkin levyiseen tekstialueeseen, ensin vasemmalle sisennettynä ja sen jälkeen oikealle sisennettynä:

```python
nimet =  [ "Antti", "Emilia", "Juha-Pekka", "Maya" ]
for nimi in nimet:
  print(f"{nimi:15} keskellä {nimi:>15}")
```

```python
Antti           keskellä           Antti
Emilia          keskellä          Emilia
Juha-Pekka      keskellä      Juha-Pekka
Maya            keskellä            Maya
```

TODO: linkki dokumentaatioon
