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

Viime kerralla käsiteltiin pelkästään listoja, joissa alkiot olivat kokonaislukuja. Listoihin voi kuitenkin tallentaa minkä tahansa tyyppisiä arvoja. Esimerkiksi voimme tallentaa listaan merkkijonoja:

```python
nimet = ["Maija", "Liisa", "Pekka"]
print(nimet)
nimet.append("Kalle")
print(nimet)

print("Listalla nimiä:", len(lista))
print(nimet[1])
print(nimet[3])
```

<sample-output>

['Maija', 'Liisa', 'Pekka']
['Maija', 'Liisa', 'Pekka', 'Kalle']
Listalla nimiä: 4
Liisa
Kalle

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

TODO: Tässä ei ole nyt mitään motivointia, miksi haluaisimme luoda matriisin.
Termiä taulukko ei ole myöskään esiintynyt aiemmin. Miten tässä kannattaisi edetä?

Sisäkkäisten listojen avulla voimme luoda myös _matriisin_ eli kaksiulotteisen taulukon.
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



