---
path: '/osa-7/6-lisaa-pythonista'
title: 'Lisää Pythonista'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät lisää Pythonin ominaisuuksia

</text-box>

Tähän lukuun on koottu vielä joukko erinäisiä hyödyllisiä Pythoniin liittyviä ominaisuuksia.

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

Sama rakenne on joskus hyödyllinen kun tehdään ehdollinen sijoituslause. Esimerkiksi jos haluaisimme joko kasvataa muuttujaa `y` tai nollata sen riippuen muuttujan `x` arvon parillisuudesta, sensijaan että kirjoittaisimme

```python
if x%2 == 0:
    y += 1
else:
    y = 0
```

sama voitaisiin tehdä yhden rivin ehdolla seuraavasti

```python
y = y + 1 if x%2 == 0 else 0
```

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

<programming-exercise name='Oma ohjelmointikieli' tmcname='osa07-18_oma_ohjelmointikieli'>

Tässä tehtävässä toteutetaan oman ohjelmointikielen suorittaja. Voit käyttää tehtävässä kaikkia kurssilla oppimiasi taitoja.

Ohjelma muodostuu riveistä, joista jokainen on yksi seuraavista:

* `PRINT [arvo]`: tulostaa annetun arvon
* `MOV [muuttuja] [arvo]`: asettaa muuttujaan annetun arvon
* `ADD [muuttuja] [arvo]`: lisää muuttujaan annetun arvon
* `SUB [muuttuja] [arvo}`: vähentää muuttujasta annetun arvon
* `MUL [muuttuja] [arvo]`: kertoo muuttujan annetulla arvolla
* `[kohta]:`: määrittelee kohdan, johon voidaan hypätä muualta
* `JUMP [kohta]`: hyppää annettuun kohtaan
* `IF [ehto] JUMP [kohta]`: jos ehto pätee, hyppää annettuun kohtaan
* `END`: lopettaa ohjelman

Ohjelmaa suoritetaan rivi kerrallaan ensimmäisestä rivistä aloittaen. Ohjelma päättyy, kun vastaan tulee komento `END` tai suoritus menee ohjelman viimeisen rivin yli.

Jokaisessa ohjelmassa on 26 muuttujaa, joiden nimet ovat `A`...`Z`. Jokaisen muuttujan arvo on 0 ohjelman alussa. Merkintä `[muuttuja]` viittaa tällaiseen muuttujaan.

Kaikki ohjelman käsittelemät arvot ovat kokonaislukuja. Merkintä `[arvo]` viittaa joko muuttujaan tai kokonaislukuna annettuun arvoon.

Merkintä `[kohta]` on mikä tahansa kohdan nimi, joka muodostuu pienistä kirjaimista `a`...`z` sekä numeroista `0`...`9`. Kahdella kohdalla ei saa olla samaa nimeä.

Merkintä `[ehto]` tarkoittaa ehtoa muotoa `[arvo] [vertailu] [arvo]`. Tässä `vertailu` on aina yksi seuraavista: `==`, `!=`, `<`, `<=`, `>` tai `>=`.

Tee funktio `suorita(ohjelma)`, jolle annetaan ohjelma listana. Jokainen listan alkio on yksi ohjelman rivi. Funktion tulee palauttaa listana kaikki `PRINT`-komentojen tulokset ohjelman suorituksen aikana.

Voit olettaa, että funktiolle annettu ohjelma on oikeanmuotoinen, eli funktion ei tarvitse toteuttaa virheenkäsittelyä.

Esimerkki 1:

```python
ohjelma = []
ohjelma.append("MOV A 1")
ohjelma.append("MOV B 2")
ohjelma.append("PRINT A")
ohjelma.append("PRINT B")
ohjelma.append("ADD A B")
ohjelma.append("PRINT A")
ohjelma.append("END")
tulos = suorita(ohjelma)
print(tulos)
```

<sample-output>

[1, 2, 3]

</sample-output>

Esimerkki 2:

```python
ohjelma = []
ohjelma.append("MOV A 1")
ohjelma.append("MOV B 10")
ohjelma.append("alku:")
ohjelma.append("IF A >= B JUMP loppu")
ohjelma.append("PRINT A")
ohjelma.append("PRINT B")
ohjelma.append("ADD A 1")
ohjelma.append("SUB B 1")
ohjelma.append("JUMP alku")
ohjelma.append("loppu:")
ohjelma.append("END")
tulos = suorita(ohjelma)
print(tulos)
```

<sample-output>

[1, 10, 2, 9, 3, 8, 4, 7, 5, 6]

</sample-output>

Esimerkki 3 (kertoma):

```python
ohjelma = []
ohjelma.append("MOV A 1")
ohjelma.append("MOV B 1")
ohjelma.append("alku:")
ohjelma.append("PRINT A")
ohjelma.append("ADD B 1")
ohjelma.append("MUL A B")
ohjelma.append("IF B <= 10 JUMP alku")
ohjelma.append("END")
tulos = suorita(ohjelma)
print(tulos)
```

<sample-output>

[1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]

</sample-output>

Esimerkki 4 (alkuluvut):

```python
ohjelma = []
ohjelma.append("MOV N 50")
ohjelma.append("PRINT 2")
ohjelma.append("MOV A 3")
ohjelma.append("alku:")
ohjelma.append("MOV B 2")
ohjelma.append("MOV Z 0")
ohjelma.append("testi:")
ohjelma.append("MOV C B")
ohjelma.append("uusi:")
ohjelma.append("IF C == A THEN virhe")
ohjelma.append("IF C > A THEN ohi")
ohjelma.append("ADD C B")
ohjelma.append("JUMP uusi")
ohjelma.append("virhe:")
ohjelma.append("MOV Z 1")
ohjelma.append("JUMP ohi2")
ohjelma.append("ohi:")
ohjelma.append("ADD B 1")
ohjelma.append("IF B < A JUMP testi")
ohjelma.append("ohi2:")
ohjelma.append("IF Z == 1 JUMP ohi3")
ohjelma.append("PRINT A")
ohjelma.append("ohi3:")
ohjelma.append("ADD A 1")
ohjelma.append("IF A <= N JUMP alku")
tulos = suorita(ohjelma)
print(tulos)
```

<sample-output>

[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

</sample-output>

</programming-exercise>

Vastaa kurssin lopuksi loppukyselyyn. Kyselyn tuloksia käytetään kurssimateriaalin kehittämiseen.

<quiz id="99bc74e9-0e29-57b6-a995-3eafa3526325"></quiz>

