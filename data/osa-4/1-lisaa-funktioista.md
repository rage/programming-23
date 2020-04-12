---
path: '/osa-4/1-lisaa-funktioista'
title: 'Funktioiden parametrit ja paluuarvot'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Syötteiden välittäminen funktioille auttaa tekemään niistä yleiskäyttöisempiä. Tutustutaan myös funktioiden paluuarvoihin ja niiden käyttöön ohjelmissa.

Tämän osion suoritettuasi

- Tiedät, mitä tarkoitetaan funktoiden parametreilla ja mihin niitä tarvitaan
- Tiedät, miten parametrit määritetään
- Osaat palauttaa arvon funktiosta
- Osaat hyödyntää paluuarvoa funktiokutsussa
- Osaat merkitä tyyppivihjeet parametreille ja paluuarvolle

</text-box>

Edellisen osan lopuksi tutustuttiin omien funktioiden kirjoittamiseen. Esimerkeissä tarkastelluilla funktioilla on kuitenkin selkeä rajoite: ne toimivat aina samalla tavalla. Sen sijaan että kirjoitettaisiin funktiot eri kertotauluille...

```python

def kahden_kertotaulu():
    luku = 1
    while luku <= 10:
        print(str(luku) + " x 2 = " + str(luku * 2))
        luku = luku + 1

def kolmen_kertotaulu():
    luku = 1
    while luku <= 10:
        print(str(luku) + " x 3 = " + str(luku * 3))
        luku = luku + 1

def neljän_kertotaulu():
    luku = 1
    while luku <= 10:
        print(str(luku) + " x 4 = " + str(luku * 4))
        luku = luku + 1

# jne....

```

Olisi huomattavasti helpompaa, jos voitaisiin kirjoittaa yksi _yleisempi_ kertotaulufunktio, ja kertoa sille mikä kertotaulu milloinkin halutaan tulostaa.

Tätä tarkoitusta varten funktioille voidaan _välittää parametreja_. Parametrien tarkoitus on erikoistaa funktion toimintaa (ja vastaavasti yleistää funktioiden merkitystä). Parametreja on itse asiassa välitetty valmiille funktioille jo aiemmin: esimerkiksi `len`-funktio saa parameterikseen merkkijonon, jonka pituus halutaan tulostaa ja `input`-funktio viestin joka halutaan näyttää käyttäjälle syötettä kysyttäessä.

## Parametrien merkitseminen

Parametrit ovat muuttujia, ja ne määritellään funktion _määrittelyrivillä_ (eli rivillä, joka alkaa avainsanalla `def`). Perinteisistä muuttujista parametrit eroavat siinä, että ne saavat yleensä arvon vasta funktiota kutsuttaessa. Muuten niitä käytetään kuin mitä tahansa muuttujia: arvoa voidaan käyttää osana lauseketta ja arvo voi tarvittaessa myös muuttua.

Vaikka se ei Pythonissa pakollista olekaan, tällä kurssilla merkitään parametreille aina nimen lisäksi myös tyyppi. Tyyppien merkitsemisestä käytetään nimitystä _tyyppivihjeet_ eli _type hints_. Ohjelman suorituksen kannalta tyyppivihjeet eivät ole pakollisia, mutta ne helpottavat ohjelmoijan työtä kertomalla funktion kutsujalle minkä tyyppisiä parametreja funktiolle pitää välittää.

```python

# Funktiolla kertotaulu on yksi int-tyyppinen parametri n,
# joka määrittää mikä kertotaulu tulostetaan
def kertotaulu(n : int):
    print(str(n) + ":n kertotaulu:")
    luku = 1
    while luku <= 10:
        print(str(luku) + " x " + str(n) + " = " + str(luku * n))
        luku = luku + 1

    print() # Tyhjä rivi


# Kutsutaan kertotaulua parilla eri parametrin arvolla:
kertotaulu(4)
kertotaulu(9)

```

<sample-output>

4:n kertotaulu:
1 x 4 = 4
2 x 4 = 8
3 x 4 = 12
4 x 4 = 16
5 x 4 = 20
6 x 4 = 24
7 x 4 = 28
8 x 4 = 32
9 x 4 = 36
10 x 4 = 40

9:n kertotaulu:
1 x 9 = 9
2 x 9 = 18
3 x 9 = 27
4 x 9 = 36
5 x 9 = 45
6 x 9 = 54
7 x 9 = 63
8 x 9 = 72
9 x 9 = 81
10 x 9 = 90

</sample-output>

Niinkuin esimerkistä huomataan, on funktio `kertotaulu` nyt huomattavasti monikäyttöisempi.

## Todellinen ja muodollinen parametri

Mutta mitä oikeastaan tapahtuu, kun suoritetaan funktiokutsu `kertotaulu(4)`?

Funktiomäärittelyssä `kertotaulu(n: int)` oleva `n` on funktion _muodollinen parametri_. Muodollinen parametri on siis muuttuja, joka on määritelty funktion osoiterivillä.

Funktiokutsussa, esim. `kertotaulu(4)` funktiolle välitettyä arvoa (eli tässä tapauksessa 4) kutsutaan _todelliseksi parametriksi_.

**Funktiota kutsuttaessa _todellinen parametri_ siis sijoitetaan _muodollisen parametrin arvoksi_.**

Esimerkiksi:

```python

# Funktiolla huuda on yksi merkkijonotyyppinen parametri
# Funktion muodollinen parametri on siis 'lause'
def huuda(lause: str):
    # Muutetaan merkkijono isoiksi kirjaimiksi
    # käyttämällä metodia upper():
    lause = lause.upper()

    # lisätään huutomerkit
    lause = lause + "!!!"

    # ...ja tulostetaan
    print(lause)


# Kutsutaan funktiota todellisella parametrin arvolla "moi kaikki"
huuda("moi kaikki")

# Kutsutaan funktiota uudestaan todellisella parametrin arvolla
# "tässä sitä vaan kutsutaan funktiota"
huuda("tässä sitä vaan kutsutaan funktiota")

```

<sample-output>

MOI KAIKKI!!!
TÄSSÄ SITÄ VAAN KUTSUTAAN FUNKTIOTA!!!

</sample-output>

Esimerkissä muodollinen parametri on siis merkkijonotyyppinen `lause`, ja sitä kutsutaan kahdella eri todellisen parametrin arvolla.

## Lisää tyypeistä ja parametreista

Kerrataan vielä tähän mennessä läpikäydyt tyypit:

Tyyppi | Pythonissa | Esimerkki
:------|:----------:|-----------
Kokonaisluku | int | 23
Liukuluku | float | -0.45
Merkkijono | str | "Pekka Python"
Totuusaro | bool | True

Tyyppivihjeiden tarkoituksena on nimensä mukaisesti vihjata ohjelmoijalle parametrin tyyppi. Pythonin kannalta tämä ohjelma...

```python

def neliö(n):
    print(n ** 2)

```

...toimii ihan samalla tavalla kuin tämäkin:

```python

def neliö(n: int):
    print(n ** 2)

```

Ohjelmoijan kannalta erona on, että jälkimmäistä aliohjelmaa kutsuttaessa ohjelmoijalle on selkeämpää, minkä tyylinen parametrin pitää olla.

Funktiolla voi olla nollan tai yhden parametrin sijasta useampiakin parametreja. Tällaisessa tapauksessa parametrit (niin todelliset kuin muodollisetkin) erotellaan toisistaan pilkulla.

Esimerkiksi

```python

# Funktio tulostaa suurimman kolmesta annetusta
# liukuluvusta
def tulosta_suurin(n1: float, n2: float, n3: float):
    if n1 > n2 and n1 > n3:
        print(n1)
    elif n2 > n3:
        print(n2)
    else:
        print(n3)


# Testataan todellisilla parametrin arvoilla
# 1.0, 2.5 ja -1.3
tulosta_suurin(1.0, 2.5, -1.3)

# Testataan varmuudeksi vielä uudestaan
tulosta_suurin(-10.0, -5.0, -1.1123)

```

<sample-output>

2.5
-1.1123

</sample-output>

Parametrit voivat tietysti olla myös eri tyyppisiä:

```python

# Ohjelma tulostaa annettua merkkijonoa
# monistettuna x- ja y-suunnissa
def tulosta_monta(mjono : str, määrä: int):
    mjono = mjono * määrä

    n = 0
    while n < määrä:
        print(mjono)
        n = n + 1


# Testataan
tulosta_monta("x", 5)


```

<sample-output>

xxxxx
xxxxx
xxxxx
xxxxx
xxxxx

</sample-output>

## Funktioiden paluuarvot

Tarkastellaan vielä yksinkertaista funktiota, joka tulostaa parametriensa summan:

```python

def summma(luku1 : int, luku2 : int):
    print(luku1 + luku2)

```

Funktiota kutsuttaessa se tulostaa pyydetyn arvon ruudulle. Osana lauseketta ei arvoa voi kuitenkaan käyttää.

Usein olisi kuitenkin tarpeen käyttää funktion tuottamaa "tulosta" jotenkin osana ohjelmaa muutenkin kuin tulostamalla se ruudulle. Tätä tarkoitusta varten funktiosta voi _palauttaa arvon_. Itse asiassa matematiikan termein voidaan puhua siitä, että funktio _saa jonkin arvon_. Usein tämä arvo riippuu todellisista parametri(e)n arvo(i)sta, ja voi vaihdella eri kutsukerroilla.

Arvo voidaan palauttaa funktiosta käyttämällä `return`-lausetta. Edellinen summaesimerkki kirjoitettuna uudestaa niin, että se palauttaa arvon tulostamisen sijasta:

```python

# Nuoli ja int kertoo, että paluuarvon tyyppi on kokonaisluku
def summma(luku1 : int, luku2 : int) -> int:
    return luku1 + luku2

```

Miten paluuarvo sitten eroaa tulostuksesta? Paluuarvo halutaan yleensä käsitellä jotenkin. Tyypillinen tapa on esimerkiksi tallentaa se muuttujaan tai käyttää sitä osana lauseketta.

```python

# Nuoli ja int kertoo, että paluuarvon tyyppi on kokonaisluku
def summma(luku1 : int, luku2 : int) -> int:
    return luku1 + luku2


# Tallennetaan summa muuttujaan...
tulos = summa(5,10) # Muuttujan arvoksi 15

# ...tai käytetään sitä osana lauseketta
toinen_tulos = summa(2,2) + 3 # eli 2 + 2 + 3 == 7

print(tulos)
print(toinen_tulos)

```

<sample-output>

15
7

</sample-output>

Paluuarvon voidaan ajatella "korvaavan" funktiokutsun lausekkeessa.

KUVA


Tarkastellaan vielä esimerkkinä kahta funktiota. Funktioista ensimmäinen _tulostaa ruudulle_ merkkijonon monistettuna, mutta ei palauta mitään (funktiosta, jolla ei ole paluuarvoa käytetään myös nimeä _proseduuri_). Toinen funktion sen sijaan palauttaa merkkijonon monistettuna. Huomaa miten tämä vaikuttaa funktion kutsumiseen.

```python

# Funktiolla ei ole paluuarvoa
def tulosta_monta(mjono: str, n: int):
    # Tulostetaan, mutta ei palauteta
    print(mjono * n)

# Funktion paluuarvon tyyppi on str eli merkkijono
def monista(mjono: str, n: int) -> str:
    # Palautetaan, muttei tulosteta
    return mjono * n

# Ensimmäistä funktiota kutsutaan pelkästään sen nimellä:
tulosta_monta("x", 5)

# Toista funktiota kutsuessa meidän pitää käsitellä paluuarvo
# jotenkin, esim. tallentamalla se muuttujaan
monistettu = monista("y", 3)

# Nyt paluuarvo voidaan haluattessa vaikka tulostaa
print(monistettu)

# Tämäkin käy, koska paluuarvoa voidaan käyttää lausekkeessa
monistettu2 = "pi" + monista("z", 5) + monista("a", 3)
print(monistettu2)

```

<sample-output>

xxxxx
yyy
pizzzzzaaa

</sample-output>

Paluuarvon _voi_ siis tulostaa ruudulle erillisellä `print`-lauseella, mutta automaattisesti `return`-lause ei tulosta ruudulle mitään.

Toisin kuin `print`-lause, `return`-lause myös päättää funktion suorituksen välittömästi (eli toimii tältä osin vähän samankaltaisesti kuin `break`-lause silmukassa):

```python

def palautusarvo() -> int:
    return 45
    print("Tätä riviä ei suoriteta koskaan")

def tulostus():
    print(33)
    print("Tämä rivi suoritetaan ihan normaalisti")


print(palautusarvo())
tulostus()


```

<sample-output>

45
33
Tämä rivi suoritetaan ihan normaalisti

</sample-output>

Pähkinänkuoressa siis:

<text-box variant="hint">

Kun funktiosta _palautetaan arvo_...

* funktion suoritus päättyy `return`-lauseeseen
* funktiolla on jokin _tyyppi_, joka merkitään parametrien perään
* palautettua arvoa voidaan käyttää _osana lauseketta_

</text-box>


