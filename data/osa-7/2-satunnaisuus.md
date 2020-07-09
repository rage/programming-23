---
path: '/osa-7/2-satunnaisuus'
title: 'Satunnaisuus'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tunnet moduulin `random` funktioita
- Osaat hyödyntää satunnaisuutta omissa ohjelmissasi

</text-box>

Tässä luvussa tutustutaan standardikirjaston moduuliin [random](https://docs.python.org/3/library/random.html?highlight=random#module-random), joka tarjoaa välineistöä satunnaislukujen generointiin ja muuhun satunnaisen toiminnallisuuteen.

Tässä ja seuraavissa luvuissa esiteltävien funktioiden yhteyteen on lisäilty linkkejä standardikirjaston [dokumentaatioon](https://docs.python.org/3/library/). Linkkejä kannattaa klikkailla ja pikkuhiljaa totutella siihen, miltä dokumentaatio näyttää.

## Luvun arpominen

Funktio [randint(a, b)](https://docs.python.org/3/library/random.html?highlight=random#random.randint) antaa satunnaisen kokonaisluvun väliltä `a`...`b`. Esimerkiksi seuraava ohjelma simuloi nopan heittämistä:

```python
from random import randint

print("Noppa antaa:", randint(1, 6))
```

Ohjelman tulos voisi olla vaikkapa:

<sample-output>

Noppa antaa: 4

</sample-output>

Seuraava ohjelma puolestaan heittää noppaa kymmenen kertaa:

```python
from random import randint

for i in range(10):
    print("Noppa antaa:", randint(1, 6))
```

Ohjelman tulos voisi olla seuraava:

<sample-output>

Noppa antaa: 5
Noppa antaa: 4
Noppa antaa: 3
Noppa antaa: 2
Noppa antaa: 3
Noppa antaa: 4
Noppa antaa: 6
Noppa antaa: 4
Noppa antaa: 4
Noppa antaa: 3

</sample-output>

Huomaa, että funktio `randint` toimii eri logiikalla kuin aiemmin käyttämämme funktio `range`, joka luo lukuvälin. Kun kutsumme funktiota `randint(1, 6)`, lukuväli on 1...6, mutta kun kutsumme funktiota `range(1, 6)`, lukuväli on 1...5.

## Lisää funktioita

Funktio [shuffle](https://docs.python.org/3/library/random.html?highlight=random#random.shuffle) sekoittaa sille annetun tietorakenteen. Esimerkiksi seuraava ohjelma sekoittaa listalla olevat sanat:

```python
from random import shuffle

sanat = ["apina", "banaani", "cembalo"]
shuffle(sanat)
print(sanat)
```

<sample-output>

['banaani', 'apina', 'cembalo']

</sample-output>

Funktio `choice` puolestaan valitsee satunnaisen alkion tietorakenteesta:

```python
from random import choice

sanat = ["apina", "banaani", "cembalo"]
print(choice(sanat))
```

<sample-output>

'cembalo'

</sample-output>

## Lottorivin arvonta

Tarkastellaan esimerkkinä tilannetta, jossa haluamme arpoa lottorivin. Lotossa on yhteensä 40 numeroa, joista arvotaan 7 numeroa riviin.

Yksinkertainen tapa koettaa arpoa lottorivi on seuraava:

```python
from random import randint

for i in range(7):
    print(randint(1, 40))
```

Tämä ei ole kuitenkaan toimiva tapa, koska sama numero saattaa tulla useita kertoja riviin. Tarvitsemme jonkin menetelmän, joka varmistaa, että jokainen numero on eri numero.

Yksi mahdollisuus on tallentaa arvotut numerot listaan ja lisätä uusi numero listaan vain, jos sitä ei vielä ole siellä. Voimme jatkaa tätä, kunnes listassa on 7 numeroa:

```python
from random import randint

rivi = []
while len(rivi) < 7:
    uusi = randint(1, 40)
    if uusi not in rivi:
        rivi.append(uusi)

print(rivi)
```

Voimme kuitenkin toteuttaa arvonnan myös lyhyemmin funktion `shuffle` avulla:

```python
from random import shuffle

kaikki = list(range(1, 41))
shuffle(kaikki)
rivi = kaikki[0:7]
print(rivi)
```

Tässä ideana on, että luomme ensin listan, jossa on kaikki numerot väliltä 1–40. Tämän jälkeen sekoitamme listan ja valitsemme sitten 7 ensimmäistä numeroa riviin. Tämän ansiosta meidän ei tarvitse tehdä silmukkaa.

Itse asiassa voimme toteuttaa arvonnan vielä helpommin, koska Pythonin standardikirjastossa on myös funktio [sample](https://docs.python.org/3/library/random.html?highlight=random#random.sample), joka valitsee annetusta tietorakenteesta halutun määrän alkioita:

```python
from random import sample

kaikki_luvut = list(range(1, 41))
rivi = sample(kaikki_luvut, 7)
print(rivi)
```

<programming-exercise name='Lottonumerot' tmcname='osa07-04_lottonumerot'>

Tee funktio `lottonumerot(maara: int, alaraja: int, ylaraja: int)`, joka arpoo annetun määrän satunnaislukuja väliltä `alaraja`...`ylaraja`, tallentaa ne listaan ja palauttaa listan. Lukujen tulee olla palautetussa listassa suuruusjärjestyksessä.

Koska kyseessä ovat lottonumerot, sama numero ei saa esiintyä listassa kahta kertaa.

Esimerkki:

```python
for numero in lottonumerot(7, 1, 40):
    print(numero)
```

<sample-output>

4
7
11
16
22
29
38

</sample-output>

</programming-exercise>

## Mistä satunnaisluvut tulevat?

Moduulin [random](https://docs.python.org/3/library/random.html) toiminta perustuu algoritmiin, joka tuottaa satunnaislukuja tietyn lähtöarvon ja matemaattisten operaatioiden avulla. Lähtöarvoa kutsutaan myös nimellä _siemenarvo_ (engl. _seed value_).

Voimme halutessamme antaa siemenarvon itse funktiolla [seed](https://docs.python.org/3/library/random.html?highlight=random#random.seed):

```python
from random import randint, seed

seed(1337)
# tästä tulee aina sama satunnaisluku
print(randint(1, 100))
```

Kun annamme siemenarvon itse, satunnaisuutta käyttävät funktiot antavat samat tulokset ohjelman jokaisella suorituskerralla. Kuitenkin tulokset voivat riippua käytetystä Pythonin versiosta.

<text-box variant="info" name="Aito satunnaisuus">

Jos tarkkoja ollaan, moduulin `random` muodostamat luvut eivät ole aitoja satunnaislukuja, vaan _pseudosatunnaislukuja_. Tietokoneen avulla on vaikea arpoa täysin satunnaisia lukuja, koska sen toiminta on kaikilta osin ennustettavissa. Monissa käyttötarkoituksissa luvut ovat kuitenkin tarpeeksi satunnaisia. Aitoja satunnaislukuja muodostettaessa lähteenä käytetään yleensä jotain tietokoneen ulkopuolista satunnaista ilmiötä, esimerkiksi radioaktiivista taustasäteilyä tai äänentasoa.

Lisätietoa löydät esimerkiksi sivulta <a href="https://www.random.org/randomness/">random.org</a>.

</text-box>

<programming-exercise name='Salasanan arpoja, osa 1' tmcname='osa07-05_salasanan_arpoja_1'>

Tee funktio, jonka avulla on mahdollista luoda halutun pituisia satunnaisista pienistä kirjaimista (väliltä a-z) muodostettuja salasanoja.

Esimerkki:

```python
for i in range(10):
    print(luo_salasana(8))
```

<sample-output>

lttehepy
olsxttjl
cbjncrzo
dwxqjdgu
gpfdcecs
jabyvgar
xnbbonbl
ktmsjyww
ejhprmel
rjkoacib

</sample-output>

</programming-exercise>

<programming-exercise name='Salasanan arpoja, osa 2' tmcname='osa07-06_salasanan_arpoja_2'>

Tee paranneltu versio edellisen tehtävän funktiosta. Funktio saa nyt kolme parametria:

* jos toinen parametri on `True`, salasanassa on myös (yksi tai useampi) numero
* jos kolmas parametri on `True`, salasanassa on myös (yksi tai useampi) erikoismerkki joukosta `!?=+-()#`

Salasanassa täytyy olla parametreista riippumatta aina vähintään yksi kirjain.

Esimerkki:

```python
for i in range(10):
    print(luo_hyva_salasana(8, True, True))
```

<sample-output>

2?0n+u31
u=m4nl94
#n=i6r#(
da9?zvm?
7h)!)g?!
a=59x2n5
(jr6n3b5
9n(4i+2!
32+qba#=
n?b0a7ey

</sample-output>

</programming-exercise>

<programming-exercise name='Noppasimulaatio' tmcname='osa07-07_noppasimulaatio'>

Tehdään tässä tehtävässä muutamia funktioita, joita on mahdollista käyttää nopanheittoon liittyvissä peleissä.

Normaalin nopan sijaan tehtävässä käytetään ns. epätransitiivisia noppia, joista on lisää tietoa esim. [tässä artikkelissa](https://singingbanana.com/dice/article.htm) tai [tässä videossa](https://www.youtube.com/watch?v=LrIp6CKUlH8).

Käytössä on kolme noppaa:

- Nopassa A on numerot 3, 3, 3, 3, 3, 6
- Nopassa B on numerot 2, 2, 2, 5, 5, 5
- Nopassa C on numerot 1, 4, 4, 4, 4, 4

</pre>

Tee funktio `heita(noppa: str)`, joka heittää parametrinsa kertomaa noppaa. Esimerkki:

```python
for i in range(20):
    print(heita("A"), " ", end="")
print()
for i in range(20):
    print(heita("B"), " ", end="")
print()
for i in range(20):
    print(heita("C"), " ", end="")
```

<sample-output>

3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  6  3  6  3
2  2  5  2  2  5  5  2  2  5  2  5  5  5  2  5  2  2  2  2
4  4  4  4  4  1  1  4  4  4  1  4  4  4  4  4  4  4  4  4

</sample-output>

Tee vielä funktio `pelaa(noppa1: str, noppa2: str, kertaa: int)` joka heittää kokonaisluvun kertoman määrän parametreina olevia noppia. Funktio palauttaa tuplen, joka kertoo nopan 1 voittojen lukumäärän, nopan 2 voittojen lukumäärän ja tasapelien lukumäärän.

```python
tulos = pelaa("A", "C", 1000)
print(tulos)
tulos = pelaa("B", "B", 1000)
print(tulos)
```

<sample-output>

(292, 708, 0)
(249, 273, 478)

</sample-output>

</programming-exercise>

<quiz id="5ec18c05-5339-5484-9691-9c7332d1ee83"></quiz>
