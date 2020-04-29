---
path: '/osa-4/4-lisaa-rakenteista'
title: 'Lisää alijonoista ja hyödyllisiä metodeita'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Valmiiden listaoperaatioiden tuntemus auttaa kirjoittamaan lyhyempiä ja tehokkaampia ohjelmia. Tarkastellaan muutamia yleisiä operaatioita listojen käsittelyyn.

Tämän osion suoritettuasi

- Tiedät, miten voit erottaa osan merkkijonosta tai listasta
- Tiedät, mitä tarkoitetaan käsitteellä _mutatoitumattomuus_
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

Jos emme anna jotain arvoa, oletuksena erotus alkaa alusta ja päättyy loppuun. Tämän avulla voimme tehdä seuraavan lyhyen ohjelman, joka kääntää merkkijonon:

```python
mjono = input("Kirjoita merkkijono: ")
print(mjono[::-1])
```

<sample-output>

Kirjoita merkkijono: **esimerkki**
ikkremise

</sample-output>

## Merkkijonoa ei voi muuttaa

Merkkijonoilla ja listoilla on paljon yhteistä, ja useimmat operaatiot toimivat samalla tavalla sekä merkkijonoille että listoille. Kuitenkin erona on, että merkkijonoa ei voi muuttaa eli merkkijono on _mutatoitumaton_.

TODO: Ei ole kyllä kaunista suomen kieltä _mutatoitumaton_

Esimerkiksi seuraava koodi ei toimi tarkoitetulla tavalla:

```python
mjono = "esimerkki"
mjono[0] = "a"
```

Koska merkkijonoa ei voi muuttaa, ohjelman suoritus aiheuttaa virheen:

<sample-output>

TypeError: 'str' object does not support item assignment

</sample-output>

Samankaltainen virhe seuraa, jos yritetään esimerkiksi järjestää merkkijonoa järjestykseen `sort`-metodilla.

Mutatoitumattomuus tarkoittaa siis sitä, ettei merkkijono voi muuttua. Se **ei** kuitenkaan tarkoita, etteikö muuttujaan voisi sijoittaa merkkijonon paikalle toisen merkkijonon. Onkin tärkeää huomata ero seuraavien esimerkkien välillä:

TODO: Tätä pitäisi selittää vielä laajemmin

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

## Lisää hyödyllisiä operaatioita

TODO: Tämä ei tunnu oikealta paikalta esitellä näitä

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
