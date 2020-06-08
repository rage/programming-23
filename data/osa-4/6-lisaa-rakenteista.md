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
