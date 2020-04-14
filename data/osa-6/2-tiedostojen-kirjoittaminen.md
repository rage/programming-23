---
path: '/osa-6/2-tiedostojen-kirjoittaminen'
title: 'Tiedostojen kirjoittaminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Myös tiedostojen tuottamisesta ohjelmallisesti on usein hyötyä - näin saadaan tulokset talteen tai voidaan luoda uusi datatiedosto seuraavan sovelluksen jatkokäsiteltäväksi. Tässä luvussa tutustutaan tiedostojen kirjoittamiseen Pythonilla.

Tämän osion läpikäytyäsi

- Osaat luoda itse tiedoston Pythonilla
- Osaat kirjoittaa tekstimuotoista tietoa rivinvaihtoineen tiedostoon
- Tiedät, miten Pythonin `join`-metodin avulla voidaan yhdistää alkiot yhdeksi merkkijonoksi
- Osaat kirjoittaa CSV-muotoisen tiedoston omasta datastasi

</text-box>

Vaikkei tiedostojen kirjoittaminen omissa ohjelmissa ehkä ihan niin yleistä olekaan, kuin mitä tiedostojen lukeminen on, on sillekin usein tarvetta. Tyypillinen esimerkki on ohjelman tulosten tallentaminen tiedostoon, jotta niitä voidaan käyttää myös myöhemmin tai muokata edelleen jollain toisella ohjelmalla.

Tiedoston kirjoittamisessa on kaksi toisistaan poikkeavaa lähestymistapaa:

1. Uuden tiedoston luominen (tai vanhan ylikirjoittaminen) ja
2. Tiedon lisääminen olemassaolevaan tiedostoon vanhan tiedon perään

Molemmissa tapauksisa Pythonissa käytetään edellisestä osasta tuttua `open`-funktiota, mutta määriteltävä tila on eri. Tutustutaan molempiin tapauksiin erikseen.

## Uuden tiedoston luominen

Uusi tiedosto luodaan antamalla `open`-funktiolle tiedoston nimen lisäksi avaustilaksi `w` (tulee sanasta write). Esimerkiksi

```python

with open("uusi_tiedosto.txt", "w") as uusi_tiedosto:
    pass

```

Huomaa, että **mikäli tiedosto on jo olemassa, kaikki sen sisältö ylikirjoitetaan** - ole siis erittäin huolellinen uusia tiedostoja luodessasi.

Kun tiedosto on avattu, sinne voidaan kirjoittaa tietoa. Kirjoittaminen tapahtuu metodilla `write`, joka saa parametrikseen kirjoitettavan merkkijonon.

```python

# Avataan tiedosto kirjoitusta varten
with open("uusi_tiedosto.txt", "w") as tiedosto:

    # Tulostetaan tiedostoon tervehdys
    tiedosto.write("Moi kaikki!")

```

Ohjelman suorittamisen jälkeen samaan kansioon ilmestyy tiedosto `uusi_tiedosto.txt`, jonka sisältö näyttää tältä:

<sample-data>

Moi kaikki!

</sample-data>

Huomaa, että jos tiedostoon halutaan rivinvaihtoja, ne täytyy lisätä tekstiin itse. Alla oleva ohjelma...

```python

# Avataan tiedosto kirjoitusta varten
with open("uusi_tiedosto.txt", "w") as tiedosto:

    # Tulostetaan tiedostoon tervehdys
    tiedosto.write("Moi kaikki!")
    tiedosto.write("Toinen rivi")
    tiedosto.write("Viimeinen rivi")

```

...tuottaa seuraavanlaisen tiedoston:

<sample-data>

Moi kaikki!Toinen riviViimeinen rivi

</sample-data>

Tulostukset saadaan omille riveilleen lisäämällä rivien loppuun rivivaihtomerkki `\n`:

```python

# Avataan tiedosto kirjoitusta varten
with open("uusi_tiedosto.txt", "w") as tiedosto:

    # Tulostetaan tiedostoon tervehdys
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

Joskus on kätevää tiedon ylikirjoittamisen sijasta lisätä uutta tietoa olemassaolevaan tiedostoon. Pythonissa tämä onnistuu avaamalla tiedosto muodossa `a` (lyhenne sanasta append). Tällöin tiedoston nykyistä sisältöä ei pyyhitä, vaan uusi tieto kirjoitetaan tiedoston loppuun.

Huomaa kuitenkin, että tiedon lisääminen ei onnistu, jos tiedostoa ei ole olemassa. Tiedostomuoto `a` siis vaatii toimiakseen, että tiedosto on olemassa. Uuden tiedoston voi luoda vain kirjoitusmuodolla `w`.

Esimerkkiohjelma avaa edellisen esimerkin tuottaman tiedoston `uusi_tiedosto.txt` ja lisää sen perään pari riviä tekstiä:

```python

# Avataan tiedosto lisäysmoodissa "a"
with open("uusi_tiedosto.txt", "a") as tiedosto:

    #  Lisätään pari riviä
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

Tekstitiedostoon voidaan kirjoittaa vain merkkijonomuotoista tietoa. Kaikki muu tieto on muutettava merkkijonoiksi ennen kirjoittamista.

Yksittäiset datapisteet voidaan tietysti muuttaa funktiolla `str`, mutta mikäli esimerkiksi listassa on useita arvoja, tulee silmukasta helposti monimutkainen.

Helppo tapa muuttaa listalla olevat arvot yhdeksi merkkijonoksi on metodi `join`. Se kohdistetaan haluttuun välimerkkiin, ja se saa parametrikseen muuutettavan merkkijonoja sisältävän listan - syntaksi on siis

```python

<välimerkki>.join(<merkkijonolista>)

```

Metodi palauttaa uuden merkkijonon, jossa alkiot on yhdistetty. Tietyllä tapaa metodi on siis `split`-metodin vastakohta.

Esimerkki, jossa listassa olevista luvuista muodostetaan yksi merkkijono:

```python

# lista
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
