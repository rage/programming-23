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

<programming-exercise name='Vanhin henkilöistä' tmcname='osa05-18_vanhin_henkiloista'>

Tee funktio `vanhin(henkilot: list)`, joka saa parametrikseen listan henkilöitä esittäviä tupleja. Funktio etsii ja palauttaa vanhimman henkilön nimen.

Henkilötuplessa on ensin henkilön nimi merkkijonona ja toisena alkiona henkilön _syntymävuosi_.

Esimerkiksi:

```python
h1 = ("Arto", 1977)
h2 = ("Einari", 1985)
h3 = ("Maija", 1953)
h4 = ("Essi", 1997)
hlista = [h1, h2, h3, h4]

print(vanhin(hlista))
```

<sample-output>

Maija

</sample-output>

</programming-exercise>

<programming-exercise name='Vanhemmat henkilöt' tmcname='osa05-19_vanhemmat_henkilot'>

Oletetaan, että meillä on edelleen käytössä edellisessä tehtävässä esitellyt henkilö-tuplet.

Kirjoita funktio `vanhemmat(henkilot: list, vuosi: int)`, joka palauttaa uuden listan, jolle on tallennettu kaikki _ennen_ annettua vuotta syntyneet henkilöiden nimet parametrina saadulta henkilöiden listalta.

Esimerkiksi:

```python
h1 = ("Arto", 1977)
h2 = ("Einari", 1985)
h3 = ("Maija", 1953)
h4 = ("Essi", 1997)
hlista = [h1, h2, h3, h4]

vanhemmat_henkilot = vanhemmat(hlista, 1979)
print(vanhemmat_henkilot)
```

<sample-output>

[ 'Arto', Maija' ]

</sample-output>

</programming-exercise>

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
print(piste[(3, 5)])
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

Tuplen määrittelyssä ei ole pakko antaa sulkuja. Esimerkiksi seuraavat koodit toimivat samalla tavalla:

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

Yllä oleva koodi vaihtaa keskenään muuttujien `luku1` ja `luku2` arvot, eli koodi toimii samoin kuin seuraava, apumuuttujaa käyttävä koodi:

```python
apu = luku1
luku1 = luku2
luku1 = apu
```

<programming-exercise name='Sanavertailu' tmcname='osa05-20_sanavertailu'>

Tee funktio `vertaa(sana1: str, sana2: str)` joka saa parametrikseen kaksi samanpituista merkkijonoa. Funktio palauttaa kaksi kokonaislukua (eli käytännössä tuplen). Paluuarvon ensimmäinen luku kertoo kuinka monta merkkijonojen kirjaimista oli samoja ja samalla paikalla sijaitsevia. Paluuarvon toinen luku kertoo, kuinka monta merkkijonojen kirjaimista oli samoja, mutta sijaitsivat merkkijonoissa eri paikoilla.

Esimerkkejä:

```python
a, b = vertaa("ABC", "ACB")
print(a, b)
```

<sample-output>

1 2

</sample-output>

Molemmissa merkkijonoissa on kirjain A kohdassa 0. Molemmissa onb myös kirjaimet B ja C, mutta ne ovat eri kohdissa. Tämän takia paluuarvo on 1, 2.

```python
a, b = vertaile("JAVA", "VAJA")
print(a, b)
a, b = vertaile("AABB", "ABCD")
print(a, b)
a, b = vertaile("LOL", "OLO")
print(a, b)

print(a, b)
```

<sample-output>

2 2
1 1
0 2

</sample-output>

</programming-exercise>

<programming-exercise name='Opiskelijarekisteri' tmcname='osa05-21_opiskelijarekisteri'>

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

<pre>
pekka:
 ei suorituksia
liisa:
 ei suorituksia
ei löytynyt ketään nimellä jukka
</pre>

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

<pre>
pekka:
 suorituksia 2 kurssilta:
  ohpe 3
  tira 2
 keskiarvo 2.5
</pre>

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

<pre>
pekka:
 suorituksia 2 kurssilta:
  ohpe 3
  tira 2
 keskiarvo 2.5
</pre>

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

<pre>
opiskelijoita 2
eniten suorituksia 3 pekka
paras keskiarvo 4.5 liisa
</pre>

</sample-output>

</programming-exercise>
