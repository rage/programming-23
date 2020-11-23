---
path: '/osa-12/2-generaattorit'
title: 'Generaattorit'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, mitä tarkoitetaan generaattorilla Pythonissa
- Tiedät, mitä avainsana yield tekee
- Osaat kirjoittaa itse generaattorifunktioita

</text-box>

Eräissä tilanteissa olisi kätevää saada ohjelmassa seuraava alkio (tai useampi alkio) tietystä sarjasta ilman että muodostetaan koko sarjaa kerralla. Pythonissa tämä onnistuu näppärästi _generaattoreiden_ avulla. Generaattorifunktio muistuttaa normaalia arvon palauttavaa funktiota, mutta kun normaalifunktio palauttaa (tai ainakin sen pitäisi palauttaa) samalla syötteellä saman arvon, generaattorifunktio palauttaa seuraavan luvun sarjasta.

Generaattorien toiminta voidaan toteuttaa ohjelmissa myös muilla keinoilla (itse asiassa sama pätee useimpiin ohjelmointitekniikoihin), mutta niiden käyttö selkeyttää ja mahdollisesti säästää muistia tai muita resursseja tietyntyylisissä ohjelmissa.

## Avainsana yield

Generaattorifunktion toiminta perustuu avainsanaan `yield`. Tarkastellaan esimerkkinä funktiota, joka palauttaa yksi kerrallaan kokonaislukuja nollasta alkaen kunnes maksimiarvo on saavutettu:

```python

def laskuri(maksimi: int):
    luku = 0
    while luku <= maksimi:
        yield luku
        luku += 1

```

Nyt laskurilta voi pyytää seuraavan arvon funktiolla `next()`:

```python
if __name__ == "__main__":
    luvut = laskuri(10)
    print("Eka arvo:")
    print(next(luvut))
    print("Toka arvo:")
    print(next(luvut))
```

<sample-output>

Eka arvo:
0
Toka arvo:
1

</sample-output>

Niinkuin esimerkistä huomataan, `yield` muistuttaa `return`-komentoa siinä, että se palauttaa arvon funktiosta. Eroavaisuus on kuitenkin siinä, että yield palauttaa yksittäisen arvon, ja funktio "muistaa" mihin tilaan se jäi.

Arvoja voi pyytää vain niin kauan kun niitä on generaattorissa jäljellä - tämän jälkeen generaattorifunktio antaa poikkeuksen `StopIteration`:

```python
if __name__ == "__main__":
    luvut = laskuri(1)
    print(next(luvut))
    print(next(luvut))
    print(next(luvut))
```

<sample-output>

0
1
Traceback (most recent call last):
  File "generaattoriesimerkki.py", line 11, in <module>
    print(next(luvut))
StopIteration

</sample-output>

Poikkeuksen voi ottaa kiinni `try`-`except` lohkolla:

```python
if __name__ == "__main__":
    luvut = laskuri(1)
    try:
        print(next(luvut))
        print(next(luvut))
        print(next(luvut))
    except StopIteration:
        print("Luvut loppuivat kesken")
```

<sample-output>

0
1
Luvut loppuivat kesken

</sample-output>

Jos halutaan palauttaa kaikki generaattorin tuottamat alkiot, helpointa on iteroida ne läpi `for`-lauseella:

```python
if __name__ == "__main__":
    luvut = laskuri(5)
    for luku in luvut:
        print(luku)
```

<sample-output>

0
1
2
3
4
5

</sample-output>

<programming-exercise name='Parilliset luvut' tmcname='osa12-08_parilliset'>

Kirjoita generaattorifunktio `parilliset(alku: int, maksimi: int)`, joka saa parametrikseen alkuarvon ja maksimin. Funktio tuottaa alkuarvosta lähtien parillisia lukuja. Kun saavutetaan maksimi, generaattori pysähtyy.

Kaksi esimerkkiä funktion käytöstä:

```python
luvut = parilliset(2, 10)
for luku in luvut:
    print(luku)
```

<sample-output>

2
4
6
8
10

</sample-output>

```python
luvut = parilliset(11, 21)
for luku in luvut:
    print(luku)
```

<sample-output>

12
14
16
18
20

</sample-output>

</programming-exercise>

<programming-exercise name='Alkuluvut' tmcname='osa12-09_alkuluvut'>

Alkuluvuksi sanotaan kokonaislukua, joka on vähintään 2 ja jaollinen ainoastaan 1:llä ja itsellään. Ensimmäiset alkuluvut ovat 2, 3, 5, 7, 11 ja 13.

Kirjota generaattorifunktio `alkuluvut()`, joka luo uuden generaattorin. Generaattori palauttaa yksi kerrallaan alkulukuja järjestyksessä 2:sta alkaen. Huomaa, että generaattori ei pysähdy koskaan, vaan palauttaa lisää lukuja niin kauan kuin niitä pyydetään.

Esimerkiksi:

```python
luvut = alkuluvut()
for i in range(8):
    print(next(luvut))
```

<sample-output>

2
3
5
7
11
13
17
19

</sample-output>


</programming-exercise>


## Generaattorikoosteet

Generaattorin voi luoda myös listakoostetta (list comprehension) muistuttavalla syntaksilla. Erotuksena listakoosteeseen on, että lauseke ympäröidään kaarisulkeilla hakasulkeiden sijasta.

Esimerkiksi

```python
# Generaattori palauttaa 2:n potensseja
neliot = (x ** 2 for x in range(1, 64))

print(neliot)

for i in range(5):
    print(next(neliot))
```

<sample-output>

<generator object &lt;genexpr&gt; at 0x000002B4224EBFC0>
1
4
9
16
25

</sample-output>

Toinen esimerkki, jossa generaattori tuottaa kolmimerkkisiä alijonoja englanninkielisistä aakkosista. Esimerkissä tulostetaan generaattorin 10 ensimmäistä alkiota:

```python
alijonot = ("abcdefghijklmnopqrstuvwxyz"[i : i + 3] for i in range(24))

# tulostetaan ensimmäiset 10 alijonoa
for i in range(10):
    print(next(alijonot))
```

<sample-output>

abc
bcd
cde
def
efg
fgh
ghi
hij
ijk
jkl

</sample-output>

<programming-exercise name='Satunnaiset sanat' tmcname='osa12-10_satunnaiset_sanat'>

Tee funktio `sanageneraattori(kirjaimet: str, pituus: int, maara: int)`, joka muodostaa ja palauttaa annettujen parametrien avulla satunnaisia sanoja tuottavan generaattorin.

Satunnainen sana muodostetaan valitsemalla `pituus` kappaletta kirjaimia valikoimasta `kirjaimet`. Sama kirjain saa esiintyä sanassa monta kertaa.

Generaattori palauttaa `maara` kappaletta sanoja ennen kuin se pysähtyy.

Esimerkki funktion kutsumisesta:

```python
sanagen = sanageneraattori("abcdefg", 3, 5)
for sana in sanagen:
    print(sana)
```

<sample-output>

dbf
baf
ead
fga
ccc

</sample-output>

Huom! Voit ratkaista tehtävän itse valitsemallasi tavalla (eli käyttäen joko generaattorikoostetta tai "perinteistä" generaattoria).

</programming-exercise>


