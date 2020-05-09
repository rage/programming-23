---
path: '/osa-6/2-tiedostojen-kirjoittaminen'
title: 'Tiedostojen kirjoittaminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion läpikäytyäsi

- Osaat luoda itse tiedoston Pythonilla
- Osaat kirjoittaa tekstimuotoista tietoa rivinvaihtoineen tiedostoon
- Tiedät, miten Pythonin `join`-metodin avulla voidaan yhdistää alkiot yhdeksi merkkijonoksi
- Osaat kirjoittaa CSV-muotoisen tiedoston omasta datastasi

</text-box>

Tiedoston lukemisen lisäksi voimme kirjoittaa myös tiedostoon tietoa ohjelmassa. Tyypillinen esimerkki on ohjelman tulosten tallentaminen tiedostoon, jotta niitä voidaan käyttää myös myöhemmin tai muokata edelleen jollain toisella ohjelmalla.

Tiedoston kirjoittamisessa voimme joko luoda uuden tiedoston tai lisätä tietoa olemassa olevan tiedoston vanhan tiedon perään. Molemmissa tapauksisa Pythonissa käytetään edellisestä osasta tuttua `open`-funktiota, mutta kirjoittamista varten funktiolle annetaan toinen parametri.

## Uuden tiedoston luominen

Uusi tiedosto luodaan antamalla `open`-funktiolle tiedoston nimen lisäksi avaustilaksi `w` (tulee sanasta write). Esimerkiksi

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    # tiedostoon kirjoittaminen
```

Huomaa, että **mikäli tiedosto on jo olemassa, kaikki sen sisältö ylikirjoitetaan** - ole siis erittäin huolellinen uusia tiedostoja luodessasi.

Kun tiedosto on avattu, sinne voidaan kirjoittaa tietoa. Kirjoittaminen tapahtuu metodilla `write`, joka saa parametrikseen kirjoitettavan merkkijonon.

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!")
```

Ohjelman suorittamisen jälkeen samaan hakemistoon ilmestyy tiedosto `uusi_tiedosto.txt`, jonka sisältö näyttää tältä:

<sample-data>

Moi kaikki!

</sample-data>

Huomaa, että jos tiedostoon halutaan rivinvaihtoja, ne täytyy lisätä tekstiin itse. Esimerkiksi ohjelma

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!")
    tiedosto.write("Toinen rivi")
    tiedosto.write("Viimeinen rivi")
```

tuottaa seuraavanlaisen tiedoston:

<sample-data>

Moi kaikki!Toinen riviViimeinen rivi

</sample-data>

Tulostukset saadaan omille riveilleen lisäämällä rivien loppuun rivivaihtomerkki `\n`:

```python
with open("uusi_tiedosto.txt", "w") as tiedosto:
    tiedosto.write("Moi kaikki!\n")
    tiedosto.write("Toinen rivi\n"")
    tiedosto.write("Viimeinen rivi\n"")
```

Nyt tiedosto `uusi_tiedosto.txt` näyttää tältä:

<sample-data>

Moi kaikki!
Toinen rivi
Viimeinen rivi

</sample-data>

## Tiedon lisääminen olemassaolevaan tiedostoon

Jos haluamme lisätä tietoa olemassa olevaan tiedostoon, 
voimme avata tiedoston tilassa `a` (lyhenne sanasta append). Tällöin tiedoston nykyistä sisältöä ei pyyhitä, vaan uusi tieto kirjoitetaan tiedoston loppuun.

Jos tiedostoa ei ole olemassa, tila `a` toimii samalla tavalla kuin tila `w`.

Huomaa kuitenkin, että tiedon lisääminen ei onnistu, jos tiedostoa ei ole olemassa. Tila `a` siis vaatii toimiakseen, että tiedosto on olemassa. Uuden tiedoston voi luoda vain tilassa `w`.

Esimerkkiohjelma avaa edellisen esimerkin tuottaman tiedoston `uusi_tiedosto.txt` ja lisää sen perään pari riviä tekstiä:

```python
with open("uusi_tiedosto.txt", "a") as tiedosto:
    tiedosto.write("Rivi numero 4\n")
    tiedosto.write("Ja taas yksi.\n")
```

Ohjelman suorituksen jälkeen tiedosto näyttää tältä:

<sample-output>

Moi kaikki!
Toinen rivi
Viimeinen rivi
Rivi numero 4
Ja taas yksi.

</sample-output>

## Tietojen yhdistäminen merkkijonoksi

Tekstitiedostoon voidaan kirjoittaa vain merkkijonomuotoista tietoa. Kaikki muu tieto on muutettava merkkijonoksi ennen kirjoittamista.

TODO: Mitähän tässä kannattaisi tehdä? Mikä olisi luonteva tilanne, jossa haluamme kirjoittaa CSV-tiedoston? Tarvitaanko joinia, entä list comperehensionit?

Helppo tapa muuttaa listalla olevat merkkijonot yhdeksi merkkijonoksi on metodi `join`. Se kohdistetaan haluttuun välimerkkiin, ja se saa parametrikseen muuutettavan merkkijonoja sisältävän listan - syntaksi on siis

```python
<välimerkki>.join(<merkkijonolista>)
```

Metodi palauttaa uuden merkkijonon, jossa alkiot on yhdistetty. Tietyllä tapaa metodi on siis `split`-metodin vastakohta.

Esimerkki, jossa listassa olevista luvuista muodostetaan yksi merkkijono:

```python
lista = list(range(1,11))

# Muutetaan ensin merkkijonoiksi
mlista = []
for alkio in lista:
    mlista.append(str(alkio))

# tulostetaan ensin lista
print(mlista)

# muunnetaan merkkijonoiksi eri välimerkeillä
mjono1 = ",".join(mlista)
mjono2 = ";".join(mlista)
mjono3 = " ja ".join(mlista)

print(mjono1)
print(mjono2)
print(mjono3)

```

<sample-output>

['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
1,2,3,4,5,6,7,8,9,10
1;2;3;4;5;6;7;8;9;10
1 ja 2 ja 3 ja 4 ja 5 ja 6 ja 7 ja 8 ja 9 ja 10

</sample-output>


## CSV-tiedoston kirjoittaminen

Kaikki tarvittava CSV-tiedostojen kirjoittamiseksi on siis koossa - tiedämme, miten listasta saa kätevästi merkkijonon ja osaamme kirjoittaa merkkijonoja tiedostoon rivi kerrallaan (rivinvaihdon muistaen).

Tarkastellaan aluksi esimerkkinä funktiota, joka saa parametrikseen matriisin (eli listan listoja), ja kirjoittaa tiedot tiedostoon `matriisi.txt`:

```python

def kirjoita_matriisi(matriisi: list):
    # Avataan tiedosto
    with open("matriisi.txt", "w") as tiedosto:
        # Iteroidaan rivit läpi
        for rivi in matriisi:

            # Tehdään rivistä merkkijonoversio
            mrivi = []
            for alkio in rivi:
                mrivi.append(str(alkio))

            # Yhdistetään alkiot ja tulostetaan
            tiedosto.write(",".join(mrivi))

            #...ja rivinvaihto perään
            tiedosto.write("\n")


# Testimatriisi
m = [[1,2,3,4], [5,4,3,2], [3,4,5,6], [7,6,5,4]]

kirjoita_matriisi(m)

```

Ohjelman suorituksen jälkeen tiedosto `matriisi.txt` näyttää tältä:

<sample-data>

1,2,3,4
5,4,3,2
3,4,5,6
7,6,5,4

</sample-data>
