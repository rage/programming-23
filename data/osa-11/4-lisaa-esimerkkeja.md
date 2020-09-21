---
path: '/osa-11/4-lisaa-esimerkkeja'
title: 'Lisää esimerkkejä'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tässä osiossa

- Käydään läpi muutamia binääripuuhun liittyviä rekursiivisia esimerkkialgoritmeja

</text-box>


Rekursiivinen todellinen tehokkuus tulee esiin tilanteissa, joissa iteratiivinen ratkaisu on hankala kirjoitaa. Tarkastellaan esimerkkinä _binääripuuta_. Binääripuulla tarkoitetaan puurakennetta, jossa jokaisella alkiolla on korkeintaan kaksi "lasta". Binääripuu voisi siis näyttää esim. tältä (huomaa, että vaikka tietojenkäsittelijöitä pidetään joissain yhteyksissä luonnontieteilijöinä, käsityksemme puiden kasvusuunnasta on nurinkurinen):

KUVA BINÄÄRIPUUSTA

Binääripuiden (ja puiden yleensäkin) käsittely rekursiivisesti on ainakin teoriassa helppoa: jos halutaan tehdä jokin operaatio binääripuun kaikille alkioille - esim. etsiä jokin tietty alkio puusta, voidaan kirjoitaa rekursiivinen algoritmi, joka

1. Käsittelee nykyisen alkion
2. Kutsuu itseään vasemmasta lapsesta alkavalle "alipuulle"
3. Kutsuu itseään oikeasta lapsesta alkavalle "alipuulle"

KUVA ALIPUISTA

Kun koko rekursiivinen algoritmi on käsitelty, on vierailtu kerran puun jokaisessa solussa. Iteratiivinen versio algoritmista on yleensä hankalampi kirjoittaa, koska kirjanpito vieralluista alkioista menee äkkiä monimutkaiseksi.

Binääripuuta voidaan mallintaa helposti kirjoittamalla luokka, joka mallintaa yhtä alkiota puussa. Alkiolla on arvon lisäksi tieto vasemmasta ja oikeasta lapsestaan:

```python

class Alkio:
    """ Luokka mallintaa yhtä alkiota binääripuussa """
    def __init__(self, arvo, vasen_lapsi:'Alkio' = None, oikea_lapsi:'Alkio' = None):
        self.arvo = arvo
        self.vasen_lapsi = vasen_lapsi
        self.oikea_lapsi = oikea_lapsi
```

Nyt jos halutaan mallintaa esimerkiksi oheisen kaltainen puu:

KUVA, JOSSA
      2
    3   4
   5 8    11

...se voidaan muodostaa seuraavalla ohjelmalla:

```python
if __name__ == "__main__":
    puu = Alkio(2)

    puu.vasen_lapsi = Alkio(3)
    puu.vasen_lapsi.vasen_lapsi = Alkio(5)
    puu.vasen_lapsi.oikea_lapsi = Alkio(8)

    puu.oikea_lapsi = Alkio(4)
    puu.oikea_lapsi.oikea_lapsi = Alkio(11)

```

## Rekursiiviset binääripuualgoritmit

Tarkastellaan ensin algoritmia, joka tulostaa kaikki binääripuun alkiot allekkain. Käytetään esimerkkinä tässä ja tulevissa tehtävissä yllä muodostettua puuta.

Funktio saa parametrikseen juurialkion (eli kaikkein ylimmäisenä olevan alkion, jonka _jälkeläisiä_ kaikki muut alkiot ovat):

```python

def tulosta_alkiot(juuri: Alkio):
    print(juuri.arvo)

    if juuri.vasen_lapsi != None:
        tulosta_alkiot(juuri.vasen_lapsi)

    if juuri.oikea_lapsi != None:
        tulosta_alkiot(juuri.oikea_lapsi)

```

Funktio tulostaa annetun alkion arvon, ja sen jälkeen kutsuu itseään uudestaan vasemmalle ja oikealla alipuulle (edellyttäen, että vasen ja/tai oikea alkio on määritelty). Algoritmi on melko yksinkertainen, mutta käy tehokkaasti läpi kaikki puun alkiot riippumatta puun koosta. Algoritmi ei myöskään vieraile missään puun alkiossa kahta kertaa.

Kun funktiolle annetaan parametriksi aikaisemmin luodun binääripuun juurialkio `puu`, se tulostaa

<sample-output>

2
3
5
8
4
11

</sample-output>

Vastaavalla tavalla voidaan kirjoittaa algoritmi, joka laskee kaikkien puun alkioiden summan:

```python

def alkioiden_summa(juuri: Alkio):
    summa = juuri.arvo

    if juuri.vasen_lapsi != None:
        summa += alkioiden_summa(juuri.vasen_lapsi)

    if juuri.oikea_lapsi != None:
        summa += alkioiden_summa(juuri.oikea_lapsi)

    return summa

```

Muuttuja `summa` alustetaan nykyisen alkion arvolla. Tämän jälkeen siihen lisätään rekursiivisesti vasemman ja oikean alipuun summat (tarkastaen taas ensin, että ne ovat olemassa). Lopuksi summa palautetaan.

## Järjestetty binääripuu

Binääripuusta on erityisesti hyötyä silloin, kun alkiot on järjestetty tietyn kaavan mukaisesti. Alkion löytäminen järjestetystä puusta on nopeaa.

Tarkastellaan esimerkkinä puuta, jossa alkiot on järjestetty seuraavan kaavan mukaisesti: jokaisen alkion vasen lapsi on pienempi kuin alkio itse; vastaavasti oikea alkio on suurempi kuin alkio itse.

Alla olevassa kuvassa on esitetty esimerkki järjestetystä puusta:

KUVA

Nyt alkion etsimiseen voidaan kirjoitaa rekursiivinen algoritmi, joka toimii hyvin samankaltaisesti kuin aiemmin tarkastelemamme puolitushaku: jos juurialkio on tarkasteltava alkio, palautetaan arvo True. Muuten jatketaan rekursiivisesti hakua joko vasemmasta tai oikeasta alipuusta.

```python

def etsi_alkio(juuri: Alkio, arvo):
    if arvo == juuri.arvo:
        return True

    if arvo > juuri.arvo:
        return etsi_alkio(juuri.oikea_lapsi, arvo)

    return etsi_alkio(juuri.vasen_lapsi, arvo)

```




