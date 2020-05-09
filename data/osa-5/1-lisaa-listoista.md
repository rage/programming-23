---
path: '/osa-5/1-lisaa-listoja'
title: 'Lisää listoista'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Listoihin voi tallentaa myös muunlaista tietoa kuin kokonaislukuja - esimerkiksi merkkijonoja, kokonaislukuja tai vaikka toisia listoja. Opetellaan siis käyttämään listoja entistä monipuolisemmin.

Tämän osan suoritettuasi

- Osaat luoda listoja, joissa on sisältönä mitä tahansa Pythonin objekteja
- Tiedät, että matriisi voidaan mallintaa kaksiulotteisena listana

</text-box>

Viime kerralla käsiteltiin lähes yksinomaan listoja, joissa alkiot olivat kokonaislukuja. Listoihin voi luonnollisesti tallentaa minkä tahansa tyyppisiä arvoja. Esimerkiksi voimme tallentaa listaan merkkijonoja:

```python
nimet = ["Maija", "Liisa", "Pekka"]
print(nimet)
nimet.append("Kalle")
print(nimet)

print("Listalla nimiä:", len(nimet))
print('aakkosjärjestyksessä:')
nimet.sort()
for nimi in nimet:
  print(nimi)
```

<sample-output>

['Maija', 'Liisa', 'Pekka']
['Maija', 'Liisa', 'Pekka', 'Kalle']
Listalla nimiä: 4
aakkosjärjestyksessä:
Kalle
Liisa
Maija
Pekka

</sample-output>

Samalla tavalla listalle voidaan tallentaa liukulukuja:

```python
mittaukset = [-2.5, 1.1, 7.5, 14.6, 21.0, 19.2]

for mittaus in mittaukset:
    print(mittaus)

keskiarvo = sum(mittaukset) / len(mittaukset)

print("Keskiarvo:", keskiarvo)
```

<sample-output>

-2.5
1.1
7.5
14.6
21.0
19.2
Keskiarvo: 10.15

</sample-output>


## Sisäkkäiset listat

Listan alkiot voivat olla myös listoja:

```python
lista = [[5,2,3],[4,1],[2,2,5,1]]
print(lista)
print(lista[1])
print(lista[1][0])
```
<sample-output>

[[5, 2, 3], [4, 1], [2, 2, 5, 1]]
[4, 1]
4

</sample-output>

Mihin voimme käyttää listoja jonka sisällä on listoja?

Voisimme esimerkiksi esittää yhden henkilön tiedot listana, missä ensimmäisenä alkiona on henkilön nimi, toisena ikä ja kolmantena kengän numero:

```python
["Anu", 10, 26 ]
```

ja joukko henkilöitä on lista, joka sisältää yksittäisiä henkilöä kuvaavia listoja:

```python
henkilot = [ ["Anu", 10, 26], ["Petteri", 7, 22],  ["Emilia", 32, 37], ["Antti", 39, 44] ]

henkilot.sort()

for henkilo in henkilot:
  nimi = henkilo[0]
  ika = henkilo[1]
  kenka = henkilo[2]
  print(f"{nimi:10} ikä {ika:2} vuotta, kengännumero {kenka}")
```

<sample-output>

Antti      ikä 39 vuotta, kengännumero 44
Anu        ikä 10 vuotta, kengännumero 26
Emilia     ikä 32 vuotta, kengännumero 37
Petteri    ikä  7 vuotta, kengännumero 22

</sample-output>

Huomaa, miten `for`-lause käy läpi henkilöt yksi kerralaan, eli toiston lohko-osassa muuttuja  `henkilo` saa yksi kerrallaan arvokseen kutakin henkilöä esittävän listan.

Lista ei ole välttämättä paras Pythonin tietorakenne yksittäisen henkilön tietojen esittämiseen. Tutustumme pian _sanakirjaan_ joka on usein luontevampi tapa hoitaa tämänkaltainen tilanne,.

Sisäkkäisten listojen avulla voidaan myös esittää _matriisia_ eli kaksiulotteista taulukkoa.

Esimerkiksi matriisi

KUVA

voitaisiin mallintaa kaksiulotteisena listana näin:

```python
matriisi = [[1,2,3], [3,2,1], [4,5,6]]
```

Koska lista sisältää toisia listoja, täytyy matriisin alkioihin viitata käyttämällä kaksia peräkkäisiä hakasulkeita. Ensimmäinen indeksi viittaa riviin ja toinen sarakkeeseen. Niinpä esimerkiksi lauseke `m[1][3]` poimisi neljännen alkion toiselta riviltä (kun muistetaan, että indeksointi alkaa taas kerran nollasta).

```python

matriisi = [[1,2,3], [3,2,1], [4,5,6]]

print(matriisi[0][1]) # 1. rivi, 2. alkio
matriisi[1][0] = 10 # 2. rivi, 1. alkio
print(matriisi)

```

<sample-output>

2
[[1, 2, 3], [10, 2, 1], [4, 5, 6]]

</sample-output>

Matriisia iteroitaessa `for`-silmukalla poimitaan yksittäiset rivit. Esimerkiksi seuraava funktio tulostaa matriisin rivit allekkain:

```python

def tulosta_rivit(matriisi: list):
    for rivi in matriisi:
        print(rivi)


# Testataan
m = [[1,2,3,4], [5,6,7,8], [9,10,11,12]]
tulosta_rivit(m)

```

<sample-output>

[1, 2, 3, 4]
[5, 6, 7, 8]
[9, 10, 11, 12]

</sample-output>

Jos halutaan käydä läpi kaikki matriisin alkiot, voidaan käyttää kahta sisäkkäistä for-silmukkaa.

```python

# Funktio laskee matriisissa olevien
# parillisten alkioiden määärän
def parilliset_alkiot(matriisi: list) -> int:
    n = 0
    for rivi in matriisi:
        for alkio in rivi:
            if alkio % 2 == 0:
                n = n + 1

    return n

# Testataan
m = [[1,2,3,4], [2,3,4,5], [3,4,5,6]]
print(parilliset_alkiot(m))

```

<sample-output>

6

</sample-output>

Mikäli halutaan muuttaa matriisin sisältöä silmukan sisällä, voidaan hyödyntää `range`-funktiota iteroinnissa:

```python

m = [[1,2,3], [4,5,6]]

# Lisätään matriisin kaikkiin arvoihin  yksi
for i in range(len(m)):
    for j in range(len(m[i])):
        m[i][j] = m[i][j] + 1

print(m)

```

<sample-output>

[[2, 3, 4], [5, 6, 7]]

</sample-output>

Ulompi silmukka käy `range`-funktion avulla läpi arvot nollasta matriisin pituuteen (eli matriisin rivien määrään) ja sisempi silmukka jokaisen rivin alkiot nollasta rivin pituuteen.

KUVA

Matriisi sopii hyvin monien pelien tietorakenteeksi. Esim. sudokun ruudukko

<img src="5_1_1.png">

voitaisiin esittää seuraavana matriisina

```python
sudoku = [
  [ 9, 0, 0, 0, 8, 0, 3, 0, 0 ],
  [ 0, 0, 0, 2, 5, 0, 7, 0, 0 ],
  [ 0, 2, 0, 3, 0, 0, 0, 0, 4 ],
  [ 0, 9, 4, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 7, 3, 0, 5, 6, 0 ],
  [ 7, 0, 5, 0, 6, 0, 4, 0, 0 ],
  [ 0, 0, 7, 8, 0, 3, 9, 0, 0 ],
  [ 0, 0, 1, 0, 0, 0, 0, 0, 3 ],
  [ 3, 0, 0, 0, 0, 0, 0, 0, 2 ],
]
```

Arvolla nolla siis kuvataan tilanne, missä ruutu on vielä tyhjä.

Seuraavassa vielä yksinkertainen versio sudokun tulostavasta metodista:

```python
def tulosta(sudoku):
  for rivi in sudoku:
    for ruutu in rivi:
      if ruutu>0:
        print(f" {ruutu}", end='')
      else:
        print("  ", end='')
    print()

tulosta(sudoku)
```

Tulostuksen ulkoasu on hieman karu:

```python

 9       8   3
       2 5   7
   2   3         4
   9 4
       7 3   5 6
 7   5   6   4
     7 8   3 9
     1           3
 3               2

```

Vastaavalla tavalla on mahdollista kuvata moni tuttu peli esim. shakki, miinaharava, laivan upotus, mastermind, ...matriisina, täytyy ainoastaan valita sopiva tapa millä yhden ruudun tilanne "koodataan" matriisiin.

