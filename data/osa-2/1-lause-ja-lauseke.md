---
path: '/osa-2/1-lause-ja-lauseke'
title: 'Lause ja lauseke'
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Ohjelmat koostuvat komennoista ja tiedon käsittelystä. Tutustutaan tarkemmin ohjelmien rakenteeseen opettelemalla lauseen ja lausekkeen välinen ero.

Tämän osion suoritettuasi

- Ymmärrät lauseen ja lausekkeen eron
- Tiedät, mitä tarkoittaa dynaaminen tyypitys
- Osaat selvittää lausekkeen tyypin ja tehdä tyyppimuunnoksia

</text-box>

Emme vielä kurssin ensimmäisessä osassa kiinnittäneet kovin tarkasti huomiota käyttämäämme terminologiaan. Ohjelmoinnissa puhutaan usein _lauseista_ ja _lausekkeista_. Mistä on kyse?

## Lause

_Lause_ (englanniksi statement) tarkoittaa ohjelman osaa, joka suorittaa jonkin toiminnon. Usein lause viittaa yksittäiseen komentoon.

Esimerkiksi `print("Moi!")` on lause, joka tulostaa rivin tekstiä,
ja `luku = 2` on lause, joka asettaa muuttujan arvon.

Lause voi olla myös monimutkaisempi, ja sen sisällä voi olla muita lauseita.

Esimerkiksi ehtolauseen aloittaa `if`-rivi, jonka jälkeen sen sisällä on yksi tai useampia lauseita.

```python
if nimi == "Anna":
    print("Moikka!")
```

## Lauseke

_Lauseke_ (englanniksi expression) on lauseen osa, jolla on jokin tyyppi. Ohjelman suorituksen aikana lauseke saa arvon, jota voidaan käyttää ohjelmassa.

Tarkastellaan muutamaa esimerkkiä lausekkeista:

| Lauseke | Arvo | Tyyppi | Tyyppi Pythonissa |
|---------|------|--------------|-------------------|
|`2 + 4 + 3` | `9` | kokonaisluku | `int` |
|`"abc" + "de"` | `"abcde"` | merkkijono | `str`|
|`11 / 2` | `5.5` | liukuluku | `float` |
|`2 * 5 > 9` | `True` | totuusarvo | `bool`|

Koska lausekkeella on arvo, voi sen sijoittaa muuttujaan:

```python
# muuttuja x saa arvoksi lausekkeen 1 + 2 arvon
x = 1 + 2
```

Yksinkertaisesta lausekkeesta saa muodostettua monimutkaisempia lausekkeita esim. aritmeettisten operaattorien avulla:

```python
# muuttuja y saa arvoksi lausekkeen '3 kertaa x plus x toiseen' arvon
y = 3 * x + x**2
```

## Funktio ja parametri

Olemme myös nähneet kurssilla muutamia funktioita, esimerkiksi tulostamiseen käytettävän `print`-funktion, joka saa syötteeksi eli virallisempaa terminologiaa käyttäen _parametriksi_ tulostettavan merkkijonon

```python
print("tämä on parametri")
```

Myös käyttäjältä syötteitä lukeva `input` on funktio. Parametrina funktio saa käyttäjälle näytettävän kehotteen:

```python
nimi = input("Kerro nimesi: ")
```

Funktio `input` palauttaa arvon, joten funktiokutsu on yllä määriteltyä terminologiaa käyttäen _lauseke_...

## Muuttujan tyyppi

Python on _dynaamisesti tyypitetty_ ohjelmointikieli, ja tämän takia ohjelmoijan tarvitse määritellä esimerkiksi muuttujien tyyppiä, vaan Python päättelee tyypin automaattisesti muuttujaan sijoitettavan arvon perusteella.

Esimerkiksi seuraavassa koodissa Python päättelee,
että muuttuja `nimi` tyyppi on merkkijono ja muuttujan `tulos` tyyppi on kokonaisluku.

```python
nimi = "Anna"
tulos = 100
```

Muuttujan tyyppi voi myös vaihtua ohjelman suorituksen aikana.
Esimerkiksi seuraavassa koodissa muuttujan `x` tyyppi on ensin merkkijono
ja sitten kokonaisluku.

```python
x = "Anna"
x = 100
```

Tämä ei ole kuitenkaan usein hyvä tapa, koska tämän seurauksena voi olla epäselvää,
minkä tyyppinen muuttuja on milloinkin.

## Tyypin selvittäminen

Funktio `type` kertoo annetun lausekkeen tyypin. Esimerkiksi:

```python
print(type(12))
print(type("Anna"))
print(type(7/2))

nimi = "Anna"
if type(nimi) == str:
    print("nimi on merkkijono")
if type(nimi) == int:
    print("nimi on kokonaisluku")
if type(nimi) == bool:
    print("nimi on totuusarvo")
```

<sample-output>

<class 'int'>
<class 'str'>
<class 'float'>
nimi on merkkijono

</sample-output>

Esimerkiksi rivillä `print(type(12))` ohjelma tulostaa
`<class 'int'>`, koska lausekkeen tyyppi on kokonaisluku.
Voimme myös tutkia lausekkeen tyyppiä ehtolauseen avulla.

## Tyyppimuunnokset

Tyyppimuunnoksella voidaan muuntaa arvo toisen tyyppiseksi.
Muunnoksessa käytettävän funktion nimi on sama kuin tyypin nimi.
Esimerkiksi funktio `int` muuttaa tyypin kokonaisluvuksi.

Tarkastellaan esimerkkiä:

```python
syote = input("Anna desimaaliluku: ")

a = float(syote)
print(a)
print(2*a)

b = int(a)
print(b)
```

Esimerkkisuoritus:

<sample-output>

Anna desimaaliluku: **1.7**
3.4
6.8
1

</sample-output>

Tässä merkkijonona annettu syöte muutetaan liuluvuksi
ja tallennetaan muuttujaan `a`.
Tämän jälkeen liukuluku muutetaan kokonaisluvuksi
ja tallennetaan muuttujaan `b`.

<text-box variant="hint" name="Pyöristäminen">

Funktio `int` muuttaa liukuluvun kokonaisluvuksi leikkamalla desimaaliosan pois.
Funktio ei siis välttämättä pyöristä lukua lähimpään kokonaislukuun.
Jos halutaan tällainen pyöristys, voidaan käyttää funktiota `round`.
Esimerkiksi `int(1.7)` on `1`, mutta `round(1.7)` on `2`.

</text-box>

Tyyppimuunnoksia on aikaisemmin käytetty `print`-funktion yhteydessä kun halutaan tulostaa merkkijonojen lisäksi muun tyyppisiä arvoja:

```python

luku = int(input("Anna luku: "))

print("Luvun neliö on " + str(luku ** 2))

```

<sample-output>

Anna luku: **9**
Luvun neliö on 81

</sample-output>

Tyyppimuunnos onnistuu vain, jos tyyppi voidaan muuntaa kohdearvoksi. Esimerkiksi seuraava ohjelma antaa virheen...

```python

mjono = "satakaksikymmentäkolme"
luku = int(mjono)

```

Ohjelma antaa virheen

<sample-output>

ValueError: invalid literal for int() with base 10: 'satakaksikymmentäkolme'

</sample-output>

...koska Python ei osaa muuntaa merkkijonoa kokonaisluvuksi. Tällasiin virheisiin varautumisesta puhutaan kurssilla myöhemmin.
