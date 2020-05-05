---
path: '/osa-4/3-iterointi'
title: 'Silmukat ja iterointi'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Listoja käytettäessä on tyypillistä, että halutaan kohdistaa operaatioita kaikkiin listan alkioihin. Tutustutaan siis seuraavaksi tekniikoihin, joilla voidaan käydä listan kaikki alkiot läpi.

Tämän osion läpikäytyäsi

- Tiedät, mitä tarkoitetaan iteroinnilla
- Tiedät, miten Pythonin `for`-lause toimii
- Osaat käyttää for-lausetta listojen ja merkkijonojen läpikäyntiin

</text-box>

Kuten näimme merkkijonon tavoin myös listan pituuden voi palauttaa `len`-funktiolla. Funktio palauttaa parametrina annetun listan alkioiden määrän. Tämän tiedon ja `while`-silmukan avulla voidaan käydä läpi kaikki listan alkiot:

```python
lista = [3, 2, 4, 5, 2]

n = 0
while n < len(lista):
    print(lista[n])
    n += 1
```

<sample-output>

3
2
4
5
2

</sample-output>

Tämä on kuitenkin melko vaivalloinen tapa sillä joudumme käyttämään indeksiuuttujaa `n`, joka "muistaa" missä kohtaa listaa ollaan menossa.

## for-lause

Alkioiden läpikäymiseen on kuitenkin näppärämpikin tapa. Pythonin `for`-lauseella voidaan käydä läpi (eli _iteroida_) kaikki annetun rakenteen alkiot.

Ideana on, että lauseen avulla voidaan poimia yksi kerrallaan kukin alkio ja suorittaa kaikille sama operaatio. Näin ohjelmoijan ei tarvitse itse huolehtia indeksimuuttujan alustamisesta, ehdosta tai muuttujan kasvatuksesta.

Lauseen syntaksi on seuraavanlainen:

```python
for <muuttuja> in <rakenne>:
    <lohko>
```

Annetusta rakenteesta (esimerkiksi listasta tai merkkijonosta) poimitaan alkiot ensimmäisestä alkaen. Alkio sijoitetaan muuttujaan ja suoritetaan lohko. Kun on päästy lohkon loppuun, poimitaan seuraava alkio ja niin edelleen. Kun lohko on suoritettu rakenteen jokaiselle alkiolle, suoritus jatkuu lohkon jälkeisestä lauseesta.

<img src="4_3_1.png" alt="Listan iterointi">

Tarkastellaan aluksi yksinkertaista esimerkkiä, joka tulostaa listan kaikki alkiot:

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

Jos verrataan tätä edelliseen esimerkkiin, huomataan että `for`-lause selkeyttää suoraviivaista kaikkien alkioiden läpikäyntiä huomattavasti.

Lause toimii myös merkkijonojen kanssa:

```python
nimi = input("Anna nimesi: ")

for kirjain in nimi:
    print(kirjain)
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

Kuten aikaisemmin on ehkä huomattu, toistolausetta tarvitaan usein jonkin valmiiksi määritetyn sarjan läpikäyntiin - esimerkiksi tilanne, jossa halutaan tulostaa kertotaulut välillä 1-10, etsiä kaikki miljoonaa pienemmät alkuluvut tai toistaa jotain operaatiota 10 000 kertaa.

Myös tällaisten sarjojen läpikäynti onnistuu `for`-lauseella funktion `range` avulla. Funktio luo _generaattorin_, jonka avulla voi käydä läpi lukuvälin samaan tapaan kuin listan tai merkkijonon kaltaisesti.

Voimme kutsua `range`-funktiota monella tavalla. Yksinkertaisin tapa on `range(n)`,
joka käy läpi kokonaisluvut 0:sta lukuun `n`–1:

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

Kun annamme kaksi parametria, `range(a,b)` aloittaa luvusta `a` ja lopettaa lukuun `b`–1:

```python
for i in range(3,7):
    print(i)
```

<sample-output>

3
4
5
6

</sample-output>

Kun annamme kolme parametria, `range(a,b,c)` aloittaa luvusta `a`, lopettaa lukuun `b`–1 ja muuttaa lukua `c`:llä joka askeleella:

```python
for i in range(1,9,2):
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
for i in range(6,2,-1):
    print(i)
```

<sample-output>

6
5
4
3

</sample-output>

## Lukuväli listaksi

Lukuvälin läpikäymisen sijasta voimme myös haluta käyttää lukuväliä muulla tavalla. Seuraava koodi ei kuitenkaan toimi halutulla tavalla, koska `range` ei palauta listaa vaan generaattorin:

```python
luvut = range(2,7)
print(luvut)
```

<sample-output>

range(2, 7)

</sample-output>

Voimme kuitenkin muuttaa generaattorin listaksi funktiolla `list`, jolloin listaan tulevat kaikki generaattorin tuottamat arvot:

```python
luvut = list(range(2,7))
print(luvut)
```

<sample-output>

[2, 3, 4, 5, 6]

</sample-output>

## Tulostuslauseen eri muodot

Olemme tähän asti käyttäneet tuloslausetta `print` seuraavasti

```python
nimi = "Erkki"
ika = 39
print("Hei " + nimi + " ikäsi on " + str(ika) + " vuotta" )
```

Eli funktiolle `print` parametrina annettava tulostettava merkkijono on muodostettu katenoimalla tulostettavat palat yhteen. Koska muuttuja `ika` on tyypiltään kokonaisluku, on se muutettu katenointia varten merkkijonoksi funktiolla `str`.

Tulostamista varten tehtävä merkkijonojen yhdistely ja tyyppimuunnosten tekeminen on melko työlästä. Pääsemme helpommalla hyödyntämällä tietoa siitä, että komennolle `print` on myös mahdollista antaa useampi parametri pilkulla eriteltynä:

```python
print("Hei", nimi, "ikäsi on", ika, "vuotta" )
```

Lopputulos on sama. Näin käytettynä `print` tulostaa kaikki parametrinsa välilyönnillä eroteltuna.

TODO: pitääkö selittää mistä oikeasti kyse?

Toinen mahdollisuus monimutkaisen asian tulostamiseen on niin sanottujen f-stringien käyttö. Edellinen tulostus tapahtuisi f-stringin avulla seuraavasti

```python
print(f"Hei {nimi} ikäsi on {ika} vuotta")
```

Pienenä mutta tärkeänä detaljina tässä on kirjain _f_ tulostettavan lainausmerkeissä olevan merkkijonon alussa. Tulostettavaan merkkijonon sisälle on sijoitettu aaltosuluissa muuttujia, näiden arvo tulostuu muun merkkijonon sekaan. Tulostus on siis täsmälleen sama kuin aiemmissa esimerkeissä.

f-stringien avulla tapahtuvaa tulostusta on mahdollista muotoilla monin tavoin. Eräs tyypillisimmistä käyttötavoista on desimaaliluvun tulostuksessa näytettyvien desimaalien määrä. Oletusarvoisesti kaikki desimaalit tulostuvat

```python
luku = 1/3
print("luvun arvo on ", luku)
```

<sample-output>

luvun arvo on 0.333333333333333

</sample-output>

f-stringin avulla tulostuvien desimaalien määrä on helppo määritellä. Tulostuksen muoto määritellään lisäämällä aaltosulkeiden sisään tulostettavan muuttujan jälkeen kaksoispiste ja _muotoiluohje_

```python
luku = 1/3
print(f"luvun arvo on {luku:.2} ")
```

```python
luvun arvo on 0.33
```

Muotoiluohje `.2` siis määrittelee, että desimaaliluku tulostetaan _kaden desimaalin_ tarkkuudella.

F-stringit mahdollistavat melko monipuolisen tulostuksen muotoilun. Seuraavassa esimerkki, missä tulostetaan nimiä 15 merkin levyiseen tekstialueeseen, ensin vasemmalle sisennettynä ja sen jälkeen oikealle sisennettynä:

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



TODO linkki dokumentaatioon
