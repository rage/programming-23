---
path: '/osa-7/6-lisaa-pythonista'
title: 'Lisää Pythonista'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät lisää Pythonin ominaisuuksia

</text-box>

## Yhden rivin ehto

Seuraavat koodit toimivat samalla tavalla:

```python
if x%2 == 0:
    print("parillinen")
else:
    print("pariton")
```

```python
print("parillinen" if x%2 == 0 else "pariton")
```

Jälkimmäisessä koodissa on yhden rivin ehto muotoa `a if [ehto] else b`. Tällaisen lausekkeen arvo on `a`, jos ehto pätee, ja muuten `b`.

## Tyhjä komento

Komento `pass` ei tee mitään. Voimme tehdä sen avulla esimerkiksi funktion `testi`, joka ei tee mitään:

```python
def testi():
    pass
```

Huomaa, että lohko ei voi olla tyhjä eli seuraava koodi ei toimisi:

```python
def testi():
```

## Silmukan else-osa

Kiinnostava Pythonin ominaisuus on, että ehtolauseen lisäksi myös silmukassa voi olla else-osa. Tämä osa suoritetaan, jos silmukka pääsee loppuun.

Esimerkiksi seuraava koodi etsii listalta parillista lukua. Jos sellainen löytyy, koodi tulostaa luvun ja silmukka päättyy. Kuitenkin jos lukua ei löytynyt, tästä tulee ilmoitus lopuksi.

```python
lista = [3,5,2,8,1]
for x in lista:
    if x%2 == 0:
        print("löytyi parillinen", x)
        break
else:
    print("ei löytynyt parillista")
```

Perinteinen tapa tehdä tällainen silmukka olisi käyttää apumuuttujaa, joka muistaa, löytyikö haluttua asiaa silmukan aikana:

```python
lista = [3,5,2,8,1]
loytyi = False
for x in lista:
    if x%2 == 0:
        print("löytyi parillinen", x)
        loytyi = True
        break
if not loytyi:
    print("ei löytynyt parillista")
```

Kuitenkin silmukan else-osan avulla vältymme muuttujan tekemiseltä.

## Funktion oletusparametri

Funktion parametrilla voi olla oletusarvo, joka tulee käyttöön silloin, jos parametria ei anneta. Näin on esimerkiksi seuraavassa funktiossa:

```python
def tervehdi(nimi="Emilia"):
    print("Moikka,", nimi)
    
tervehdi()
tervehdi("Erkki")
tervehdi("Matti")
```

<sample-output>

Moikka, Emilia
Moikka, Erkki
Moikka, Matti

</sample-output>

## Muuttuva määrä parametreja

Funktiolla voi olla myös muuttuva määrä parametreja, mikä merkitään laittamalla tähti parametrin eteen. Tällöin kaikki loput parametrit kasautuvat listaksi tähän parametriin.

Esimerkiksi seuraava funktio kertoo parametrien määrän ja summan:

```python
def testi(*lista):
    print("Annoit", len(lista), "parametria")
    print("Niiden summa on", sum(lista))
    
testi(1, 2, 3, 4, 5)
```

<sample-output>

Annoit 5 parametria
Niiden summa on 15

</sample-output>
