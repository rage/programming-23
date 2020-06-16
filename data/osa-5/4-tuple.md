---
path: '/osa-5/4-tuple'
title: 'Tuple'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, millainen tietorakenne on tuple
- Osaat muodostaa tuplen erityyppisistä arvoista
- Tiedät, mitä eroa on tuplella ja listalla
- Tiedät esimerkkejä tyypillisistä tavoista käyttää tuplea

</text-box>

Tuple eli monikko on listan tapainen tietorakenne. Sen olennaiset erot listaan ovat:

* Tuple merkitään kaarisuluilla `(` ja `)`, lista merkitään hakasuluilla `[` ja `]`
* Tuple on _muuttumaton_, kun listan sisältö taas voi muuttua

Esimerkiksi seuraava koodi luo tuplen, jossa on pisteen koordinaatit:

```python
piste = (10, 20)
```

Tuplen sisällä oleviin alkioihin viitataan samalla tavalla kuin listassa:

```python
piste = (10, 20)
print("x-koordinaatti:", piste[0])
print("y-koordinaatti:", piste[1])
```

<sample-output>

x-koordinaatti: 10
y-koordinaatti: 20

</sample-output>

Kuitenkaan tuplen määrittelyn jälkeen sen arvoa ei voi muuttaa, eli seuraava koodi _ei_ toimi:

```python
piste = (10, 20)
piste[0] = 15
```

<sample-output>

TypeError: 'tuple' object does not support item assignment

</sample-output>

## Miksi tuple on olemassa?

Tuplen ideana on tallentaa jokin kiinteä kokoelma arvoja, jotka liittyvät toisiinsa. Esimerkiksi kun tallennamme pisteen, jossa on x- ja y-koordinaatti, tuple on luonteva valinta, koska pisteeseen kuuluu aina kaksi arvoa:

```python
piste = (10, 20)
```

Voisimme sinänsä tallentaa pisteen myös listana:

```python
piste = [10, 20]
```

Tämä ei kuitenkaan tuntuisi yhtä hyvältä ratkaisulta, koska lista sisältää peräkkäisiä alkioita jossakin järjestyksessä ja sen koko voi muuttua. Kun tallennamme pisteen, haluamme tallentaa nimenomaan x- ja y-koordinaatin eikä listaa koordinaateista.

Koska tuple on muuttumaton, sitä voidaan käyttää sanakirjan avaimena (toisin kuin listaa).
Esimerkiksi seuraava ohjelma luo sanakirjan, jonka avaimet ovat pisteitä:

```python
pisteet = {}
piste[(3, 5)] = "apina"
piste[(5, 0)] = "banaani"
piste[(1, 2)] = "cembalo"
print(piste[(3,5 )])
```

<sample-output>
apina
</sample-output>

Vastaava koodi _ei_ toimisi, jos käyttäisimme listoja:

```python
pisteet = {}
piste[[3, 5]]] = "apina"
piste[[5, 0]] = "banaani"
piste[[1, 2]] = "cembalo"
print(piste[[3, 5]])
```

<sample-output>

TypeError: unhashable type: 'list'

</sample-output>

## Tuple ilman sulkuja

Tuplen määrittelyssä ei ole pakko antaa suluja. Esimerkiksi seuraavat koodit toimivat samalla tavalla:

```python
luvut = (1, 2, 3)
```

```python
luvut = 1, 2, 3
```

Tämän ansiosta voimme tehdä luontevasti funktion, joka palauttaa useita arvoja tuplena. Tarkastellaan seuraavaa esimerkkiä:

```python
def minmax(lista):
  return min(lista), max(lista)

lista = [33, 5, 21, 7, 88, 312, 5]

pienin, suurin = minmax(lista)
print(f"Pienin luku on {pienin} ja suurin on {suurin}")
```

<sample-output>

Pienin luku on 5 ja suurin on 312

</sample-output>

Tämä funktio palauttaa kaksi arvoa tuplena, ja funktion paluuarvo vastaanotetaan "yhtä aikaa" kahteen muuttujaan:

```python
pienin, suurin = minmax(lista)
```

Tässä tapauksessa sijoitusoperaation vasemmalla puolella on tuple, jonka sisällä oleviin muuttujiin asetetaan funktion palauttaman tuplen sisältämät arvot:

```python
(pienin, suurin) = minmax(lista)
```

Sanakirjojen yhteydessä demonstroitiin `items`-metodiin perustuvaa tapaa käydä läpi sanakirjan kaikki avaimet ja arvot:

```python
sanakirja = {}

sanakirja["apina"] = "monkey"
sanakirja["banaani"] = "banana"
sanakirja["cembalo"] = "harpsichord"

for avain, arvo in sanakirja.items():
    print("avain:", avain)
    print("arvo:", arvo)
```

Tässäkin Python käyttää taustalla tupleja: `sanakirja.items()` palauttaa yksi kerrallaan avain-arvo-parit tuplena, jonka ensimmäinen alkio on avain ja toinen arvo.

Vielä yksi tuplen käyttötarkoitus on kahden muuttujan arvon vaihtaminen keskenään:

```python
a, b = b, a
```

Yllä oleva koodi vaihtaa keskenään muuttujien `a` ja `b` arvot, eli koodi toimii samoin kuin seuraava koodi:

```python
t = a
a = b
b = t
```

<programming-exercise name='Opiskelijarekisteri' tmcname='osa05-22_opiskelijarekisteri'>

Tässä tehtäväsarjassa toteutetaan yksinkertainen opiskelijarekisteri. Ennen ohjelmoinnin aloittamista kannattanee hetki miettiä minkälaisen tietorkenteen tarvitset ohjelman tallettamien tietojen organisointiin.

#### opiskelijoiden lisäys

Toteuta ensin funktio `lisaa_opiskelija` uuden opiskeljan lisäämiseen sekä ensimmäinen versio funktiosta `tulosta`, joka tulostaa yhden opiskelijan tiedot.

Funktioita käytetään seuraavasti

```python
opiskelijat = {}
lisaa_opiskelija(opiskelijat, "pekka")
lisaa_opiskelija(opiskelijat, "liisa")
tulosta(opiskelijat, "pekka")
tulosta(opiskelijat, "liisa")
tulosta(opiskelijat, "jukka")
```

Ohjelman tulostaa tässä vaiheessa

<sample-output>

pekka:
 ei suorituksia
liisa:
 ei suorituksia
ei löytynyt ketään nimellä jukka

</sample-output>

#### suoritusten lisäys

Tee funktio `lisaa_suoritus`, jonka avulla opiskelijalle voidaan lisätä kurssin suoritus. Suoritus on tuple, joka koostuu kurssin nimestä ja arvosanasta:

```python
opiskelijat = {}
lisaa_opiskelija(opiskelijat, "pekka")
lisaa_suoritus(opiskelijat, "pekka", ("ohpe", 3))
lisaa_suoritus(opiskelijat, "pekka", ("tira", 2))
tulosta(opiskelijat, "pekka")
```

Opiskelijan tietojen tulostus muuttuu kun suorituksia on lisätty:

<sample-output>

pekka:
 suorituksia 2 kurssilta:
  ohpe 3
  tira 2
 keskiarvo 2.5

</sample-output>

#### arvosanojen korotus

Suorituksen lisäämisen pitää toimia siten, että se jättää arvosanan 0 suoritukset huomiotta, eikä se alenna kurssilla ennestään olevaa arvosanaa. Eli jos edellä olevaa testikoodia jatketaan seuraavasti

```python
opiskelijat = {}
lisaa_opiskelija(opiskelijat, "pekka")
lisaa_suoritus(opiskelijat, "pekka", ("lama", 0))
lisaa_suoritus(opiskelijat, "pekka", ("ohpe", 2))
tulosta(opiskelijat, "pekka")
```

tulostus pysyy ennallaan:

<sample-output>

pekka:
 suorituksia 2 kurssilta:
  ohpe 3
  tira 2
 keskiarvo 2.5

</sample-output>

#### kooste opiskelijoista

Tee funktio `kooste`, joka tulostaa koosteen opiskelijoiden suorituksista. Esimerkkikoodilla

```python
opiskelijat = {}
lisaa_opiskelija(opiskelijat, "pekka")
lisaa_opiskelija(opiskelijat, "liisa")
lisaa_suoritus(opiskelijat, "pekka", ("lama", 1))
lisaa_suoritus(opiskelijat, "liisa", ("ohpe", 5))
lisaa_suoritus(opiskelijat, "liisa", ("jtkt", 4))
kooste(opiskelijat)
```

tulostus näyttää seuraavalta

<sample-output>

opiskelijoita 2
eniten suorituksia 3 pekka
paras keskiarvo 4.5 liisa

</sample-output>

</programming-exercise>
