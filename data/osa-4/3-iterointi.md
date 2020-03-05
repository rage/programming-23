---
path: '/osa-4/3-iterointi'
title: 'Silmukat ja iterointi'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät, mitä tarkoitetaan iteroinnilla
- Tiedät, miten pythonin `for`-lause toimii
- Osaat käyttää for-lausetta listojen ja merkkijonojen läpikäyntiin

</text-box>

Samoin kuin merkkijonon, myös listan pituuden voi palauttaa `len`-funktiolla. Funktio palauttaa parametrina annetun listan alkioiden määrän. Tämän tiedon ja `while`-silmukan avulla voidaan käydä läpi kaikki listan alkiot:

```python

lista = [2, 4, 6, 8, 10, 8, 6]

n = 0
while n < len(lista):
    print(lista[n])
    n = n + 1

```

<sample-output>

2
4
6
8
10
8
6

</sample-output>

## for-lause

Alkioiden läpikäymiseen on kuitenkin näppärämpikin tapa. Pythonin `for`-lauseella voidaan läpikäydä (eli _iteroida_) kaikki annetun rakenteen alkiot.

Ideana on, että lauseen avulla voidaan poimia yksi kerrallaan kaikki alkiot ja suorittaa kaikille sama operaatio. Näin käyttäjän ei tarvitse itse huolehtia indeksimuuttujan alustamisesta, ehdosta tai muuttujan kasvatuksesta.

Lauseen syntaksi on seuraavanlainen:

```python

for <muuttuja> in <rakenne>:
    <lohko>

```

Annetusta rakenteesta (esimerkiksi listasta tai merkkijonosta) poimitaan alkiot ensimmäisestä alkaen. Alkio sijoitetaan muuttujaan ja suoritetaan lohko. Kun on päästy lohkon loppuun, poimitaan seuraava alkio ja niin edelleen. Kun lohko on suoritettu rakenteen jokaiselle alkiolle, suoritus jatkuu lohkon jälkeisestä lauseesta.

KUVA

Tarkastellaan aluksi yksinkertaista esimerkkiä, joka tulostaa listan kaikki alkiot:

```python

lista = [2, 4, 6, 8, 10, 8, 6]

for alkio in lista:
    print(alkio)

```

<sample-output>

2
4
6
8
10
8
6

</sample-output>

Jos verrataan tätä edelliseen esimerkkiin, huomataan että `for`-lause selkeyttää suoraviivaista kaikkien alkioiden läpikäyntiä huomattavasti.

Lause toimii myös merkkijonojen kanssa:

```python

nimi = input("Anna nimesi: ")

# Käydään läpi merkki kerrallaan
for kirjain in nimi:
    print(kirjain)

```

<sample-output>

Anna nimesi:Pekka Python
P
e
k
k
a

P
y
t
h
o
n

</sample-output>

Lause on siis näppärä aina, kun halutaan _käydä läpi kaikki jonkin rakenteen alkiot_. Kolmas esimerkki esittelee lauseen käyttöä funktiossa, joka palauttaa merkkijonon isot kirjaimet uudessa merkkijonossa:

```python

# Parametri ja palautusarvo molemmat tyyppiä merkkijono
def isot_kirjaimet(mjono : str) -> str:
    uusi_jono = ""

    # Käydään läpi kirjain kerrallaan
    for kirjain in mjono:

        # Funktio isupper palauttaa True, jos on iso kirjain
        if kirjain.isupper():
            # oli iso, lisätään toiseen jonoon
            uusi_jono = uusi_jono + kirjain

    # Lopuksi palautetaan uusi jono
    return uusi_jono


# Testataan
print(isot_kirjaimet("AbC"))

ik = isot_kirjaimet("Tämä On Testi - IsOjA KiRjAiMiA")
print(ik)

```

<sample-output>

AC
TOTIOAKRAMA

</sample-output>


## Funktio `range`

Niinkuin aikaisemmin on ehkä huomattu, toistolausetta tarvitaan usein jonkin valmiiksi määritetyn sarjan läpikäyntiin - esimerkiksi tilanne, jossa halutaan tulostaa kertotaulut välillä 1-10, etsiä kaikki miljoonaa pienemmät alkuluvut tai toistaa jotain operaatiota 10 000 kertaa.

Myös tallaisten sarjojen läpikäynti onnistuu `for`-lauseella. Olisi kuitenkin turhaa muistin tuhlausta muodostaa miljoonan alkion taulukko jos vain halutaan käydä läpi luvut 1 - 1 000 000. Funktio `range` tarjoaa tähän ratkaisun.

Funktio muodostaa iteroitavan rakenteen, joka voidaan käydä läpi arvo kerrallaan samoin kuin lista tai merkkijono. Rakenteessa ei kuitenkaan ole varsinaisesti alkioita, vaan se _generoi_ niitä pyydetylle välille yksi kerrallaan. Näin esimerkiksi miljoonien arvojen läpikäyntiin yksi kerrallaan ei välttämätä tarvita paljoakaan muistia.

`range`-funktion syntaksi on

`range (alku, loppu, askel)`

Alijonoista tuttuun tapaan `loppu` ei ole mukana iteroitavissa arvoissa, mutta `alku` on. `askel` ei ole pakollinen, samoin `alku` voidaan jättää pois (jolloin askellus lähtee nollasta).

Esimerkiksi:

```python

# Käydään läpi arvot nollasta viiteen:
for i in range(6):
    print(i)

print()

# Käydään läpi arvo kuudesta kymmeneen
for i in range(6,11):
    print(i)

print()

# Käydään läpi arvot viidestä 25:en viiden välein
for i in range(5, 30, 5):
    print(i)

```

<sample-output>

0
1
2
3
4
5

6
7
8
9
10

5
10
15
20
25

</sample-output>


## range-funktion listan generoinnissa

Usein olisi tarpeen alustaa lista tietyillä alkuarvoilla, esimerkiksi aloittaa käsittely listalla, jossa on alkiot yhdestä sataan. Tämä onnistuu muuntamalla `range`-funktion tuottama generaattori listaksi funktiolla `list`. Mekanismi on täsmälleen sama kuin merkkijonon muuntamisessa kokonaisluvuksi tai päinvastoin.

Esimerkiksi

```python

# Luodaan generaattori
r = range(1,11)

# ...ja siitä lista
lista = list(r)


# Tai kaikki yhdellä lauseella
lista2 = list(range(20))

print(lista)
print(lista2)

```

<sample-output>

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

</sample-output>
