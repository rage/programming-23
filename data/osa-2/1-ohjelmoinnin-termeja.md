---
path: '/osa-2/1-ohjelmoinnin-termeja'
title: 'Ohjelmoinnin termejä'
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tunnet keskeistä ohjelmoinnin termistöä
- Tiedät lauseen ja lausekkeen eron
- Osaat selvittää lausekkeen arvon tyypin

</text-box>

Emme vielä kurssin ensimmäisessä osassa kiinnittäneet kovin tarkasti huomiota ohjelmoinnin terminologiaan. Nyt on hyvä hetki tutustua joihinkin käsitteisiin.

## Lause

_Lause_ (engl. _statement_) tarkoittaa ohjelman osaa, joka suorittaa jonkin toiminnon. Usein lause viittaa yksittäiseen komentoon.

Esimerkiksi `print("Moi!")` on lause, joka tulostaa rivin tekstiä,
ja `luku = 2` on lause, joka asettaa muuttujalle arvon.

Lause voi olla myös monimutkaisempi, ja sen sisällä voi olla muita lauseita.
Esimerkiksi seuraava ehtolause muodostuu kolmesta rivistä:

```python
if nimi == "Anna":
    print("Moi!")
    luku = 2
```

Tässä tapauksessa ehtolauseen sisällä on kaksi lausetta.

## Lohko

_Lohko_ (engl. _block_) on joukko peräkkäin sijoitettuja lauseita, jotka ovat samalla tasolla ohjelman rakenteessa. Esimerkiksi ehtolauseessa lohkossa ovat lauseet, jotka suoritetaan ehdon ollessa tosi.

```python
if ika > 17:
    # ehtolauseessa oleva lohko alkaa
    print("Olet täysi-ikäinen!")
    ika = ika + 1
    print("nyt vuoden vanhempi...")
    # lohko loppuu

print("tämä on eri lohkossa")
```

Pythonissa lohko ilmaistaan sisentämällä lohkon koodi eli lauseet samalle tasolle.

## Lauseke

_Lauseke_ (engl. _expression_) on koodin osa, jolla on jokin tyyppi. Ohjelman suorituksen aikana lauseke saa arvon, jota voidaan käyttää ohjelmassa.

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

Yksinkertaisesta lausekkeesta saa muodostettua monimutkaisempia lausekkeita esim. laskuoperaattorien avulla:

```python
# muuttuja y saa arvoksi lausekkeen '3 kertaa x plus x toiseen' arvon
y = 3 * x + x**2
```

## Funktio

_Funktio_ (engl. _function_) suorittaa jonkin toiminnon. Funktiolla voi olla yksi tai useampi _parametri_ (engl. _parameter_), jotka ilmaisevat, mitä funktion tulee tehdä tarkalleen.

Funktio suoritetaan, kun sitä _kutsutaan_ eli koodissa on funktion nimi ja funktiolle annettavat parametrit suluissa. Esimerkiksi seuraava koodi kutsuu `print`-funktiota parametrilla `"tämä on parametri"`:

```python
print("tämä on parametri")
```

Myös käyttäjältä syötteitä lukeva `input` on funktio. Parametrina funktio saa käyttäjälle näytettävän viestin:

```python
nimi = input("Kerro nimesi: ")
```

Tässä tapauksessa funktio _palauttaa_ arvon, mikä tarkoittaa, että funktion kutsukohtaan ilmestyy arvo funktion suorituksen jälkeen. Funktion `input` palauttama arvo on käyttäjän syöttämä teksti merkkijonona. Funktion palauttama arvo sijoitetaan usein muttuujan arvoksi, jotta arvoa voidaan hyödyntää ohjelmassa.

## Tyyppi

_Tyyppi_ (engl. _type_) tarkoittaa, millainen jokin koodissa esiintyvä arvo on. Esimerkiksi seuraavassa koodissa muuttujan `nimi` tyyppi on merkkijono ja muuttujan `tulos` tyyppi on kokonaisluku:

```python
nimi = "Anna"
tulos = 100
```

Funktio `type` kertoo annetun lausekkeen tyypin. Esimerkiksi:

```python
print(type("Anna"))
print(type(100))
```

<sample-output>

<class 'str'>
<class 'int'>

</sample-output>

## Syntaksi

_Syntaksi_ (engl. _syntax_) määrittää, miten ohjelman koodi tulee kirjoittaa. Jokaisella ohjelmointikielellä on omanlainen syntaksinsa.

Esimerkiksi Python-kielen syntaksiin kuuluu, että `if`-lauseen aloitusrivin lopussa on kaksoispiste ja ehtoon kuuluva koodi on sisennetty:

```python
if nimi == "Anna":
    print("Moi!")
```

Jos ohjelmointikielen syntaksia ei noudateta, seurauksena on virheilmoitus:

```python
if nimi == "Anna"
    print("Moi!")
```

<sample-output>

<pre>
  File "testi.py", line 1
    if nimi == "Anna"
                    ^
SyntaxError: invalid syntax
</pre>

</sample-output>
