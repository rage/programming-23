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
# Generaattori palauttaa 2 potensseja
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






