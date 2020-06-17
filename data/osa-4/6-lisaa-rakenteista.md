---
path: '/osa-4/6-lisaa-rakenteista'
title: 'Lisää merkkijonoista ja listoista'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osan jälkeen

- Tunnet lisää tapoja erottaa osia merkkijonosta tai listasta
- Ymmärrät, mitä tarkoittaa merkkijonon muuttumattomuus
- Osaat käyttää metodeita `count` ja `replace`

</text-box>

Olemme käyttäneet aiemmin `[]`-syntaksia merkkijonon osajonon erottamiseen:

```python
mjono = "esimerkki"
print(mjono[3:7])
```

<sample-output>

merk

</sample-output>

Sama syntaksi toimii myös listoissa, ja voimme erottaa sen avulla listan osan:

```python
lista = [3,4,2,4,6,1,2,4,2]
print(lista[3:7])
```

<sample-output>

[4, 6, 1, 2]

</sample-output>

## Lisää erottamisesta

Itse asiassa `[]`-syntaksi toimii hyvin samalla periaatteella kuin `range`-funktio, eli voimme antaa sille myös askeleen:

```python
mjono = "esimerkki"
print(mjono[0:7:2])
lista = [1,2,3,4,5,6,7,8]
print(lista[6:2:-1]
```

<sample-output>

eiek
[7, 6, 5, 4]

</sample-output>

Jos emme anna jotain arvoa, oletuksena koko sisältö valitaan mukaan. Tämän avulla voimme tehdä seuraavan lyhyen ohjelman, joka kääntää merkkijonon:

```python
mjono = input("Kirjoita merkkijono: ")
print(mjono[::-1])
```

<sample-output>

Kirjoita merkkijono: **esimerkki**
ikkremise

</sample-output>

<programming-exercise name='Kaikki väärinpäin' tmcname='osa04-22_kaikki_vaarinpain'>

Kirjoita funktio `kaikki_vaarinpain`, joka saa paramerikseen listan merkkijonoja. Funktio luo ja palauttaa uuden listan, jossa kaikki alkuperäisellä listalla olevat merkkijonot on käännetty. Myös listan alkioiden järjestys muutetaan käänteiseksi.

Esimerkki funktion käytöstä:

```python
lista = ["Moi", "kaikki", "esimerkki", "vielä yksi"]
lista2 = kaikki_vaarinpain(lista)
print(lista2)
```

<sample-output>

['isky äleiv', 'ikkremise', 'ikkiak', 'ioM']

</sample-output>

</programming-exercise>

## Merkkijonoa ei voi muuttaa

Merkkijonoilla ja listoilla on paljon yhteistä, ja useimmat operaatiot toimivat samalla tavalla sekä merkkijonoille että listoille. Kuitenkin erona on, että merkkijonoa _ei voi muuttaa_. Esimerkiksi seuraava koodi ei toimi tarkoitetulla tavalla:

```python
mjono = "esimerkki"
mjono[0] = "a"
```

Koska merkkijonoa ei voi muuttaa, ohjelman suoritus aiheuttaa virheen:

<sample-output>

TypeError: 'str' object does not support item assignment

</sample-output>

Samankaltainen virhe seuraa, jos yritetään esimerkiksi järjestää merkkijonoa järjestykseen `sort`-metodilla.

Vaikka merkkijonoa ei voi muuttaa, voimme silti sijoittaa merkkijonon paikalle toisen merkkijonon.

Onkin tärkeää huomata ero seuraavien esimerkkien välillä:

```python
lista = [1,2,3]
lista[0] = 10
```

<img src="4_4_1.png">

```python
mjono = "Moi"
mjono = mjono + "!"
```

<img src="4_4_2.png">

Ensimmäisessä esimerkissä listan sisältö muuttuu. Toisessa esimerkissä alkuperäinen merkkijono korvataan toisella merkkijonolla. Alkuperäinen merkkijono jää muistiin, mutta siihen ei enää ole viittausta, joten sitä ei voi enää käyttää ohjelmassa.

Tähän palataan tarkemmin ensi viikolla, kun puhutaan listojen käytöstä funktioiden parametreina ja paluuarvoina.

## Lisää metodeita

Metodin `count` avulla voidaan laskea osajonon esiintymien määrä. Metodi toimii samaan tapaan sekä merkkijonon että listan kanssa. Esimerkiksi näin:

```python
mjono = "Vesihiisi sihisi hississä"
print(mjono.count("si"))

lista = [1,2,3,1,4,5,1,6]
print(lista.count(1))
```

<sample-output>

5
3

</sample-output>

Huomaa, että metodi `count` ei laske päällekkäisiä esiintymiä. Esimerkiksi metodin mukaan merkkijonossa `aaaa` esiintyy kaksi kertaa osajono `aa`, vaikka oikeastaan esiintymiä olisi kolme, jos päällekkäiset esiintymät sallitaan.

Metodin `replace` avulla voidaan muodostaa uusi merkkijono, jossa tietty merkkijono on korvattu toisella merkkijonolla. Esimerkiksi:

```python
mjono = "Moi kaikki"
uusi = mjono.replace("Moi", "Hei")
print(uusi)
```

<sample-output>

Hei kaikki

</sample-output>

Metodi korvaa kaikki merkkijonon esiintymät:

```python
lause = "hei heilan löysin minä heinikosta hei"
print(lause.replace("hei", "HEI"))
```

<sample-output>

HEI HEIlan löysin minä HEInikosta HEI

</sample-output>

Tyypillinen virhe `replace`-metodia käytettäessä on unohtaa, että merkkijonot ovat muuttumattomia:

```python
mjono = "Python on kivaa"

# Korvataan alijono, muttei tallenneta tulosta mihinkään...
mjono.replace("Python", "Java")
print(mjono)
```

<sample-output>

Python on kivaa

</sample-output>

Jos vanhaa jonoa ei tarvita, voidaan uusi jono sijoittaa samaan muuttujaan:

```python
mjono = "Python on kivaa"

# Korvataan alijono, tallennetaan tulos samaan muuttujaan
mjono = mjono.replace("Python", "Java")
print(mjono)
```

<sample-output>

Java on kivaa

</sample-output>





<programming-exercise name='Eniten kirjaimia' tmcname='osa04-23_eniten_kirjaimia'>



Kirjoita funktio `eniten_kirjainta(mjono: str)`, joka saa parametrikseen merkkijonon. Funktio palauttaa sen kirjaimen, jota esiintyy eniten merkkijonossa.

Voit olettaa, että merkkijono koostuu pelkästään pienistä suomen kielen kirjaimista a...ö.

Esimerkki funktion käytöstä:

```python
mjono = "abcbdbe"
print(eniten_kirjainta(mjono))

toinen_jono = "esimerkkimerkkijonokki"
print(eniten_kirjainta(toinen_jono))
```

<sample-output>

b
k

</sample-output>

</programming-exercise>


<programming-exercise name='Vokaalit pois' tmcname='osa04-24_vokaalit_pois'>

Kirjoita funktio `ilman_vokaaleja(lause: str)`, joka saa parametrikseen merkkijonon. Funktio palauttaa uuden merkkijonon, jossa alkuperäisen merkkijonon vokaalit on poistettu.

Voit olettaa, että merkkijono koostuu pelkästään pienistä suomen kielen kirjaimista a...ö.

Esimerkki funktion käytöstä:

```python
mjono = "tämä on esimerkki"
print(ilman_vokaaleja(mjono))
```

<sample-output>

tm n smrkk

</sample-output>

</programming-exercise>


<programming-exercise name='Poista isot' tmcname='osa04-25_poista_isot'>

Pythonin merkkijonometodi `isupper()` palauttaa arvon `True`, jos merkkijono koostuu _pelkästään isoista kirjaimista_.

Esimerkiksi:

```python
print("XYZ".isupper())

onko_iso = "Abc".isupper()
print(onko_iso)
```

<sample-output>

True
False

</sample-output>

Kirjoita metodia hyödyntäen funktio `poista_isot`, joka saa parametrikseen listan merkkijonoja. Funktio poistaa listalta ne merkkijonot, jotka koostuvat kokonaan isoista kirjaimista.

Huomaa, että funktio _ei palauta mitään_, vaan poistaa alkiot parametrinaan saamastaan listasta.

Esimerkki funktion käytöstä:

```python

lista = ["ABC", "def", "ISO", "TOINENISO", "pieni", "toinen pieni"]
poista_isot(lista)
print(lista)

```

<sample-output>

['def', 'pieni', 'toinen pieni']

</sample-output>


</programming-exercise>


<programming-exercise name='Käännä lista osittain' tmcname='osa04-26_kaanna_lista_osittain'>

Tee funktio `kaanna(lista: list, alku: int, loppu: int)`, joka kääntää listan alkiot annetulta väliltä päinvastaiseen järjestykseen.

Huomaa, että funktio ei palauta uutta listaa, vaan kääntää alkiot annetusta listasta.

Esimerkkejä funktion käytöstä:

```python
lista = [0, 1, 2, 3, 4, 5, 6, 7, 8]
kaanna(lista, 2, 5)
print(lista)
```

<sample-output>

[0, 1, 5, 4, 3, 2, 6, 7, 8]

</sample-output>

```python
lista = [10, 20, 30, 40, 50, 60, 70, 80]
kaanna(lista, 3, 5)
print(lista)
```

<sample-output>

[10, 20, 30, 60, 50, 40, 70, 80]

</sample-output>

</programming-exercise>

<programming-exercise name='Naapureita listassa' tmcname='osa04-27_naapureita_listassa'>

Määritellään, että listan alkiot ovat naapureita, jos niiden erotus on 1. Naapureita olisivat siis esim alkiot 1 ja 2 tai alkiot 56 ja 55.

Kirjoita funktio `pisin_naapurijono(lista)` joka etsii listasta pisimmän peräkkäisen naapureita sisältävän osalistan ja palauttaa sen pituuden.

Esimerkiksi listassa `[1, 2, 5, 4, 3, 4]` pisin tällainen osalista olisi `[5, 4, 3, 4]`, ja sen pituus 4.

Esimerkki funktion kutsumisesta:

```python
lista = [1, 2, 5, 7, 6, 5, 6, 3, 4, 1, 0]
print(pisin_naapurijono(lista))
```

<sample-output>

4

</sample-output>

</programming-exercise>

<programming-exercise name='Isot alkukirjaimet' tmcname='osa04-28_isot_alkukirjaimet'>

Kirjoita funkto `isot_alkukirjaimet(merkkijono)`, joka saa parametrikseen kokonaan pienillä kirjaimilla kirjoitetun tekstin. Funktio muuttaa kaikkien virkkeiden ensimmäisen kirjaimen isoksi.

Vinkki: Tarvitset tässä funktiota `upper()`, joka muuntaa merkkijonon kokonaan isoiksi kirjaimiksi.

Esimerkki funktion kutsumisesta:

```python

teksti = "moi kaikki! halusin vaan kysyä, että miten tämä toimii? nyt tässä on pelkkiä pieniä kirjaimia, ja haluaisin että olisi myös isoja. olisiko liikaa vaadittu?"
print(isot_alkukirjaimet(teksti))

```

<sample-output>

Moi kaikki! Halusin vaan kysyä, että miten tämä toimii? Nyt tässä on pelkkiä pieniä kirjaimia, ja haluaisin että olisi myös isoja. Olisiko liikaa vaadittu?

</sample-output>

</programming-exercise>

<quiz id="23d0a43c-f5fe-50a9-80f5-374dd56ef017"></quiz>

Vastaa lopuksi osion loppukyselyyn:

<quiz id="e4e9ae85-2cc8-5d8a-a945-cbb8c3c1f649"></quiz>
