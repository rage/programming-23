---
path: '/osa-14/1-peliprojekti'
title: 'Peliprojekti'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- TODO

</text-box>

Tässä osassa tehdään Pygamen avulla hieman laajempi peli, joka on muunnelma perinteisestä Sokoban-pelistä. Pelaaja ohjaa ruudukossa olevaa robottia, jonka tehtävänä on työntää laatikot oikeille paikoille käyttäen mahdollisimman vähän siirtoja.

## Pelin pohja

Aloitetaan tekemällä pelille pohja, joka piirtää näkyviin pelin aloitustilanteen. Toteutamme pelin luokkaan `Sokoban`, jonka sisällä on pelissä tarvittavat toiminnot. Ensimmäisessä vaiheessa luokan sisältö on seuraava:

```python
import pygame

class Sokoban:
    def __init__(self):
        pygame.init()
        
        self.lataa_kuvat()
        self.uusi_peli()
        
        self.korkeus = len(self.kartta)
        self.leveys = len(self.kartta[0])
        self.skaala = self.kuvat[0].get_width()

        nayton_korkeus = self.skaala * self.korkeus
        nayton_leveys = self.skaala * self.leveys
        self.naytto = pygame.display.set_mode((nayton_leveys, nayton_korkeus))

        pygame.display.set_caption("Sokoban")

        self.silmukka()

    def lataa_kuvat(self):
        self.kuvat = []
        for nimi in ["lattia", "seina", "kohde", "laatikko", "robo", "valmis", "kohderobo"]:
            self.kuvat.append(pygame.image.load(nimi + ".png"))

    def uusi_peli(self):
        self.kartta = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                       [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                       [1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 0, 0, 1],
                       [1, 0, 0, 1, 2, 3, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 1],
                       [1, 0, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

    def silmukka(self):
        while True:
            self.tutki_tapahtumat()
            self.piirra_naytto()

    def tutki_tapahtumat(self):
        for tapahtuma in pygame.event.get():
            if tapahtuma.type == pygame.QUIT:
                exit()

    def piirra_naytto(self):
        self.naytto.fill((0, 0, 0))

        for y in range(self.korkeus):
            for x in range(self.leveys):
                ruutu = self.kartta[y][x]
                self.naytto.blit(self.kuvat[ruutu], (x * self.skaala, y * self.skaala))

        pygame.display.flip()

if __name__ == "__main__":
    Sokoban()
```

Tämä saa aikaan ikkunan, jossa on pelin aloitustilanne:

<img src="peli.png">

Katsotaan seuraavaksi tarkemmin luokassa olevaa koodia.

## Konstruktori

Luokan konstruktori aloittaa Pygamen käyttämisen, alustaa pelissä tarvittavia muuttujia ja tietorakenteita sekä lopuksi kutsuu metodia, jossa on pelin pääsilmukka.

```python
    def __init__(self):
        pygame.init()
        
        self.lataa_kuvat()
        self.uusi_peli()
        
        self.korkeus = len(self.kartta)
        self.leveys = len(self.kartta[0])
        self.skaala = self.kuvat[0].get_width()

        nayton_korkeus = self.skaala * self.korkeus
        nayton_leveys = self.skaala * self.leveys
        self.naytto = pygame.display.set_mode((nayton_leveys, nayton_korkeus))

        pygame.display.set_caption("Sokoban")

        self.silmukka()
```

Metodi `lataa_kuvat` lataa listaan `kuvat` pelin käyttämät kuvat ja metodi `uusi_peli` luo kaksiulotteisen listan `kartta`, jossa on kuvattu ruudukon sisältö alussa.

Tämän jälkeen muuttujiin `korkeus` ja `leveys` laitetaan ruudukon korkeus ja leveys ja muuttujaan `skaala` laitetaan yhden ruudun koko. Koska jokainen kuva on neliön muotoinen ja yhtä suuri, ruudun koko saadaan hakemalla ensimmäisen kuvan leveys. Tämän avulla saadaan laskettua näytön korkeus ja leveys, minkä avulla voidaan luoda sopivan kokoinen ikkuna pelille.

## Kuvien lataaminen

Metodi `lataa_kuvat` lataa pelin tarvitsemat kuvat:

```python
    def lataa_kuvat(self):
        self.kuvat = []
        for nimi in ["lattia", "seina", "kohde", "laatikko", "robo", "valmis", "kohderobo"]:
            self.kuvat.append(pygame.image.load(nimi + ".png"))
```

Pelissä on käytössä seuraavat kuvat:

### Lattiaruutu

<img src="lattia.png">

* Tiedoston nimi `lattia.png`
* Sijainti listalla 0

### Seinäruutu

<img src="seina.png">

* Tiedoston nimi `seina.png`
* Sijainti listalla 1

### Kohderuutu

<img src="kohde.png">

* Tiedoston nimi `kohde.png`
* Sijainti listalla 2
* Robotin tulee siirtää jokin laatikko tähän ruutuun

### Laatikko

<img src="laatikko.png">

* Tiedoston nimi `laatikko.png`
* Sijainti listalla 3

### Robotti

<img src="robo.png">

* Tiedoston nimi `robo.png`
* Sijainti listalla 4

### Laatikko kohderuudussa

<img src="valmis.png">

* Tiedoston nimi `valmis.png`
* Sijainti listalla 5
* Laatikko on saatu siirrettyä kohderuutuun

### Kohderuutu ja robotti

<img src="kohderobo.png">

* Tiedoston nimi `kohderobo.png`
* Sijainti listalla 6
* Robotti voi myös olla kohderuudussa

## Ruudukon luonti

Metodi `uusi_peli` muodostaa ruudukon aloitustilanteen:

```python
    def uusi_peli(self):
        self.kartta = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                       [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                       [1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 0, 0, 1],
                       [1, 0, 0, 1, 2, 3, 0, 2, 3, 0, 0, 0, 1, 0, 0, 0, 1],
                       [1, 0, 4, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
```

Metodi luo kaksiulotteisen listan `kartta`, jossa käytetään kuvien tunnuksia samassa järjestyksessä kuin kuvat on ladattu listaan. Tämän avulla pelin muistissa on tieto siitä, mikä on ruudukon tilanne tällä hetkellä.

Huomaa, että jokainen ruudukon luku on alussa välillä 0–4. Missään ruudussa ei ole lukua 5 tai 6, koska mikään laatikko tai robotti ei ole alussa kohderuudussa.

## Pelisilmukka

Pelisilmukka kutsuu joka kierroksella kahta metodia: `tutki_tapahtumat` käy läpi viime kierroksen jälkeen syntyneet tapahtumat ja `piirra_naytto` päivittää näytön sisällön.

```python
    def silmukka(self):
        while True:
            self.tutki_tapahtumat()
            self.piirra_naytto()

    def tutki_tapahtumat(self):
        for tapahtuma in pygame.event.get():
            if tapahtuma.type == pygame.QUIT:
                exit()

    def piirra_naytto(self):
        self.naytto.fill((0, 0, 0))

        for y in range(self.korkeus):
            for x in range(self.leveys):
                ruutu = self.kartta[y][x]
                self.naytto.blit(self.kuvat[ruutu], (x * self.skaala, y * self.skaala))

        pygame.display.flip()
```

Tällä hetkellä ainoa pelin tunnistama tapahtuma on pelin sulkeminen (esimerkiksi pelaaja painaa ikkunassa olevaa raksia). Tässä tilanteessa peli sulkee itsensä kutsumalla `exit`-funktiota.

Näytön piirtäminen toteutetaan käymällä ruudukon sisältö ja piirtämällä jokaista ruutua vastaava kuva oikeaan paikkaan.

Huomaa, että koordinaatteja x ja y käytetään eri päin eri tilanteissa. Kaksiulotteisen listan indeksoinnissa on luontevaa antaa ensin y ja sitten x, koska ensimmäinen indeksi tarkoittaa riviä ja toinen indeksi tarkoittaa saraketta. Kuitenkin Pygamen metodeissa annetaan ensin x ja y, kuten grafiikassa on yleensä tapana.
