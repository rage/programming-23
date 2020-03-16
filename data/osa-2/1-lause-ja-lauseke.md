---
path: '/osa-2/1-lause-ja-lauseke'
title: 'Lause ja lauseke'
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Ymmärrät lauseen ja lausekkeen eron
- Tiedät, mitä tarkoittaa dynaaminen tyypitys
- Osaat selvittää lausekkeen tyypin ja tehdä tyyppimuunnoksia

</text-box>

Edellisessä osassa puhuttiin _lauseesta_ ja _lausekkeesta_ eri yhteyksissä. Ohjelmoinnissa näiden käsitteiden ymmärtäminen ja erottaminen on olennaista.

_Lauseella_ ilmaistaan jokin ohjelmointikielen toiminto. Esimerkiksi funktiokutsu `print("Moi!")` on lause, samoin kuin muuttujan arvon asetus `luku = 2`. Lause voi koostua myös useammasta lauseesta, esim. seuraavassa esimerkissä on kahden lauseen muodostama - _ehtolause_:

```python
# Lause koostuu tässä siis ehdosta ja
# sen jälkeisestä lohkosta.
if (True):
    print("Tosi on.")

```

Lause on siis jokin itsenäisen toiminnon suorittava ohjelman osa (tai kokonainen ohjelma). Myös lohkoa (joka usein koostuu useammasta lauseesta) voidaan nimittää lauseeksi - tällaisessa tapauksessa puhutaan joskus _kootusta lauseesta_.

## Lauseke ja dynaaminen tyypitys

_Lauseke_ on ohjelmointikielessä käytettävä "ilmaus", joka voidaan _evaluoida_ ja joka tämän myötä saa jonkin _arvon_. Pythonissa arvoilla on aina myös jokin _tyyppi_. Lausekkeen arvon (ja myös tyypin) ratkaisevat lausekkeessa käytetyt _operandit_ (eli "laskettavat") ja _operaattorit_.

Tarkastellaan muutamaa esimerkkiä lausekkeista:

| Lauseke | Arvo | Arvon tyyppi | Tyyppi Pythonissa |
|---------|------|--------------|-------------------|
|`2 + 4 + 3` | 9 | Kokonaisluku | `int` |
|`"abc" + "de"` | "abcde" | Merkkijono | `str`|
|`11 / 2` | 5.5 | Liukuluku | `float` |
|`2 * 5 > 9` | True | Totuusarvo | `bool`|

Python on _dynaamisesti tyypitetty_ ohjelmointikieli. Tämä tarkoittaa, ettei ohjelmoijan tarvitse määritellä esimerkiksi muuttujien tyyppiä, vaan Python päättelee tyypin automaattisesti muuttujaan sijoitettavan arvon perusteella

Vaikka syntaktisesti (eli ohjelmoinnin kieliopin mukaisesti) muuttujan tyypin vaihtaminen ei ole virhe Pythonissa, kannattaa sitä välttää. Ei siis ole suositeltavaa tallentaa yhteen muuttujaan usean tyyppisiä arvoja samassa ohjelmassa, koska tämä voi johtaa erilaisiin virhetilanteisiin.

Esimerkiksi

```python

# Alustetaan muuttuja a
a = 50

# Lasketaan osamäärä
om = a / 2

# Korvataan a:n arvo
a = "aaa"

# Merkkijonoille ei ole määritelty jakolaskua
# Seurava antaa siis virheen
om = a / 2

```

## Tyypin selvittäminen

Jos muuttujan arvo ei ole selvillä, sen voi selvittää funktiolla `type`. Funktio palauttaa annetun lausekkeen tyypin.

Esimerkiksi

```python
# Alustetaan pari muuttujaa
luku = -155
totuus = False
nimi = "Kimmo Kobra"

# Tulostetaan muuttujien tyypit
print(type(luku))
print(type(totuus))
print(type(nimi))

# Lausekkeen tyyppi ei ole int...
#...koska jakolaskun tuloksen tyyppi
# riippuu laskettavista
print(type(luku / 2))

# Tyyppiä voi käyttää ehtolausessa
if (type(nimi) == str):
    print("nimi on merkkijono.")

if(type(totuus) == int):
    print("totuus on kokonaisluku.")

if (type(totuus) == bool):
    print("totuus onkin totuusarvo.")

```

<sample-output>

<class 'int'>
<class 'bool'>
<class 'str'>
<class 'float'>
nimi on merkkijono.
totuus onkin totuusarvo.

</sample-output>

Tarkastellaan esimerkkitulostuksen riviä lauseelle `print(type(luku))`. Lause tulostaa rivin `<class 'int'>`, mikä tarkoittaa, että muuttujan luku tyyppi on `int` eli kokonaisluku. Kun tämä yhdistetään ehtolauseeseen, voidaan käsitellä eri tyyppiset arvot eri tavoilla.

# Tyyppimuunnokset

Tyyppimuunnoksella voidaan (yrittää) muuntaa arvo toisen tyyppiseksi. Muunnoksessa käytettävän funktion nimi on sama kuin tyypin nimi - niinpä esimerkiksi jokin toinen arvo voidaan muuntaa kokonaisluvuksi käyttämällä funktiota `int`.

Tarkastellaan esimerkkiä:

```python
# Luetaan käyttäjältä merkkijono
syöte = input("Anna desimaaliluku muodossa x.yy: ")

# Muunnetaan merkkijono liukuluvuksi
liukuluku = float(syöte)

# Kerrotaan luku kahdella ja tulostetaan se
print(liukuluku * 2)

# Muunnetaan luku kokonaislukuvksi
kokonais = int(liukuluku)

# Tulostetaan kokonaisluku
print(kokonais)
```

Esimerkkisuoritus (käyttäjän syötteet on merkitty punaisella):

<sample-output>

Anna desimaaliluku muodossa x.yy: **1.25**
2.5
1

</sample-output>

<text-box variant="hint">

On tärkeää huomata, että `int`-funktio muuntaa liukuluvun kokonaisluvuksi leikkaamalla desimaaliosan pois. Funktio ei siis välttämättä pyöristä lukua matemaattisesti oikein. Matemaattinen vastine on tällaisessa tapauksessa _lattiafunktio_. Operaation tuloksena siis sekä luvusta 1.001 että luvusta 1.99999 tulee tulokseksi 1.

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
