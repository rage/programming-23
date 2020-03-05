---
path: '/osa-4/4-lisaa-rakenteista'
title: 'Lisää alijonoista ja hyödyllisiä metodeita'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät, miten alijono-operaation eri parametrit toimivat listoille ja merkkijonoille
- Tiedät, mitä tarkoitetaan käsitteellä _mutatoitumattomuus_
- Osaat käyttää metodeita `count` ja `replace`

</text-box>

Kuten `range`-funktiolla, myös alijono-operaatiolla on valinnainen kolmas parametri. Tämä parametri määrää alijonon suunnan ja askeleen. Alijono-operaatiot toimivat myös listoille:

```python

lista = list(range(1,11))

print(lista)

# Alilista eli "osalista"?
osalista = lista[2:5]

print(osalista)

# Kolmas parametri on askel¨
osalista2 = lista[2:7:2]
print(osalista2)

```

<sample-output>

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[3, 4, 5]
[3, 5, 7]

</sample-output>

## Negatiivinen askel

Myös negativiinen askel toimii. Tämä on itse asiassa hyvin näppärä tapa kääntää lista tai merkkijono päinvastaiseen järjestykseen:

```python

mjono = input("Kirjoita merkkijono: ")

# Käännetään koko jono: jos jättää sekä alku- että
# loppuindeksin pois, palautetaan "alijonona" koko jono
käännetty = mjono[::-1]

print(käännetty)

```

<sample-output>

Kirjoita merkkijono: **Vesihiisi hississä**
ässissih isiihiseV

</sample-output>

## Merkkijono on mutatoitumaton

Parissa edellisessä osuudessa on huomattu, että merkkijonoilla ja listoilla on paljon yhteistä. Suurin osa merkkijonojen kanssa käytettävistä operaatioista toimii myös listoille.

Sellaiset listoihin kohdistuvat operaatiot, jotka muuttavat listan sisältöä jotenkin eivät kuitenkaan toimi merkkijonojen kanssa. Tämä johtuu siitä, että merkkijonot ovat _mutatoitumattomia_. Tämä tarkoittaa käytännössä sitä, että merkkijonon muodostamisen jälkeen sen sisältö ei voi enää muuttua.

Jos esimerkiksi yritetään sijoittaa merkkijonon johonkin indeksiin jotain:

```python

mjono = "Moi kaikki"

# Yritetään muuttaa merkkiä merkkijonossa
mjono[0] = "H"

```

Ohjelman suoritus aiheuttaa virheen:

<sample-output>

TypeError: 'str' object does not support item assignment

</sample-output>

Samankaltainen virhe seuraa, jos yritetään esimerkiksi järjestää merkkijonoa järjestykseen `sort`-metodilla.

Mutatoitumattomuus tarkoittaa siis sitä, ettei merkkijono voi muuttua. Se **ei** kuitenkaan tarkoita, etteikö muuttujaan voisi sijoittaa merkkijonon paikalle toisen merkkijonon. Onkin tärkeää huomata ero seuraavien esimerkkien välillä:

```python

lista = [1,2,3]
lista[0] = 10

```

KUVA

```python

mjono = "Moi"
mjono = "Moi" + "!"

```

KUVA

Ensimmäisessä esimerkissä listan sisältö muuttuu. Toisessa esimerkissä alkuperäinen merkkijono korvataan toisella merkkijonolla. Tähän palataan tarkemmin ensi viikolla, kun puhutaan listojen käytöstä funktioiden parametreina ja paluuarvoina.

## Lisää hyödyllisiä operaatioita

Tarkastellaan lopuksi muutamaa hyödyllistä metodia.

Metodin `count` avulla voidaan laskea alijonon esiintymien määrä jonossa. Metodi toimii sekä merkkijonojen että listojen kanssa. Esimerkiksi

```python

mjono = "Vesihiisi sihisi hississä"
si_määrä = mjono.count("si")
print("si esiintyy merkkijonossaa " + str(si_määrä) + " kertaa")

lista = [1,2,3,1,4,5,1,6]
ykkösiä = lista.count(1)
print("Listassa on " + str(ykkösiä) + " ykköstä")

```

<sample-output>

si esiintyy merkkijonossa 5 kertaa
Listassa on 3 ykköstä

</sample-output>

Huomaa, että `count` laskee vain kokonaisia esiintymä - esim. merkkijonossa `aaaa` esiintyy alijono `aa` kaksi kertaa, vaikka toisen tulkinnan mukaan esiintymiä voisi olla myös kolme.

Metodin `replace` avulla voidaan muodostaa uusi merkkijono, jossa alijono on korvattu toisella alijonolla. Esimerkiksi

```python

mjono = "Moi kaikki"

# Korvataan sana Moi sanalla Hei
uusi_jono = mjono.replace("Moi", "Hei")
print(uusi_jono)

```

<sample-output>

Hei kaikki

</sample-output>

Metodi korvaa kaikki alijonon esiintymät toisella alijonolla:

```python

lause = "hei heilan löysin minä heinikosta hei"

print(lause.replace("hei", "HEI"))

```

<sample-output>

HEI HEIlan löysin minä HEInikosta HEI

</sample-output>

Tyypillinen virhe `replace`-metodia käytettäessä on unohtaa, että merkkijonot ovat mutatoitumattomia:

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
