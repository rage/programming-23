---
path: '/osa-4/5-tulostuksen-muotoilu'
title: Tulostuksen muotoilu
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, miten `print`-komennon tulostusta saa muokattua parametrien avulla
- Osaat käyttää f-merkkijonoja tulosteen muotoilussa

</text-box>

Olemme tähän mennessä yhdistelleet tulostettavaa tietoa `print`-komennossa kolmella eri tavalla.

Ensimmäinen tapa on käyttää merkkijonojen `+`-operaattoria ja muodostaa näin yksittäinen merkkijono, jonka print saa parametrikseen:

```python
nimi = "Erkki"
ika = 39
print("Hei " + nimi + " ikäsi on " + str(ika) + " vuotta" )
```

Tämä tapa edellyttää, että kaikki yhdistettävät osat ovat merkkijonoja. Koska muuttuja `ika` on tyypiltään kokonaisluku, se on muutettu yhdistämistä varten merkkijonoksi funktiolla `str`.

Toinen käyttämämme tapa on eritellä tulostuksen osat pilkulla:

```python
print("Hei", nimi, "ikäsi on", ika, "vuotta" )
```

Tämän koodin lopputulos on sama kuin edellisen esimerkin. Näin käytettynä `print` tulostaa kaikki parametrinsa välilyönnillä eroteltuna. Etuna tässä tavassa on, että tulostettavat osat voivat olla eri tyyppisiä eli tyyppimuunnosta merkkijonoksi ei tarvita.

Automaattisesta välilyönnistä pilkulla eriteltyjen osien välillä on mahdollista päästä eroon antamalla funktiolle parametri `sep`:

```python
print("Hei", nimi, "ikäsi on", ika, "vuotta", sep="")
```

Tulostus on nyt seuraava:

<sample-output>

HeiErkkiikäsi on39vuotta

</sample-output>


Parametri `sep=""` on _nimetty parametri_, joka määrittelee, että pilkulla eroteltujen osien väliin laitetaan ainoastaan tyhjä merkkijono. Voisimme myös saada jokaisen osan tulostumaan omalle rivilleen määrittelemällä erottimeksi `"\n"` eli rivinvaihtoa kuvaavan merkin:

```python
print("Hei", nimi, "ikäsi on", ika, "vuotta", sep="\n")
```

<sample-output>

Hei
Erkki
ikäsi on
39
vuotta

</sample-output>

Oletusarvoisesti print-komento päättyy rivinvaihtoon, mutta tätä voidaan muokata parametrin `end` avulla. Esim. jos `end` saa arvoksi tyhjän merkkijonon, `print`-komento ei aiheuta automaattista rivinvaihtoa:

```python
print("Moi ", end="")
print("kaikki!")
```

<sample-output>

Moi kaikki!

</sample-output>

## f-merkkijonot

Kolmas käyttämämme tapa on f-merkkijonot. Aiempi nimen ja iän tulostava esimerkki tehtäisiin f-merkkijonojen avulla seuraavasti:

```python
nimi = "Erkki"
ika = 39
print(f"Hei {nimi} ikäsi on {ika} vuotta")
```

Olemme toistaiseksi käyttäneet f-merkkijonoja vain niiden yksinkertaisimmassa muodossa. F-merkkijonot tarjoavat kuitenkin monia muitakin mahdollisuuksia tulostuksen muotoiluun. Yksi tavallinen käyttötapa on antaa liukuluvun tulostuksessa näytettävien desimaalien määrä. Oletusarvoisesti tulostuu jokin määrä desimaaleja:

```python
luku = 1/3
print("Luku on", luku)
```

<sample-output>

Luku on 0.333333333333333

</sample-output>

Saamme määriteltyä tulostuvien desimaalien määrän f-merkkijonon avulla. Tulostuksen muoto määritellään lisäämällä aaltosulkeiden sisään tulostettavan muuttujan jälkeen kaksoispiste ja _muotoiluohje_:

```python
luku = 1/3
print(f"Luku on {luku:.2f}")
```

```python
Luku on 0.33
```

Muotoiluohje `.2f` siis määrittelee, että desimaaliluku tulostetaan _kahden desimaalin_ tarkkuudella. Kirjain _f_ luvun 2 jälkeen tarkoittaa, että muotoiluohje koskee desimaalilukua eli `float`-tyyppistä arvoa!

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

F-merkkijonoja voi käyttää muuallakin kuin tulostuskomennossa. Niitä voi esimerkiksi sijoittaa muuttujiin ja sekä yhdistellä normaaleihin merkkijonoihin:

```python
nimi = "Pekka"
ika = 59
kaupunki = "Lappeenranta"
tervehdys = f"Hei {nimi}, olet {ika}-vuotias"
print(tervehdys + f", asuinpaikkasi on {kaupunki}")
```

<sample-output>

Hei Pekka, olet 59-vuotias, asuinpaikkasi on Lappeenranta

</sample-output>

F-merkkijonon voi ajatella olevan eräänlainen funktio, joka tuottaa normaalin merkkijonon aaltosuluissa olevien "parametrien" perusteella.

<programming-exercise name=' Lukulistasta merkkijonolistaksi' tmcname='osa04-20_lukulistasta_merkkijonolistaksi'>

Kirjoita funktio `muotoile`, joka saa parametrikseen liukulukuja sisältävän listan. Funktio muodostaa listan perusteella uuden merkkijonoja sisältävän listan, jossa jokainen liukulukulistan alkio esitetään pyöristettynä kahden desimaalin tarkkuuteen. Listan alkioiden järjestyksen tulee säilyä.

_Vinkki: Käytä liukulukujen muotoiluun merkkijonoiksi f-merkkijonoa._

Esimerkki funktion käytöstä:

```python
lista = [1.234, 0.3333, 0.11111, 3.446]
lista2 = muotoile(lista)
print(lista2)
```

<sample-output>

['1.23', '0.33', '0.11', '3.45']

</sample-output>

</programming-exercise>

<quiz id="90d650f3-fde1-5132-ade9-73f3b4bf6189"></quiz>
