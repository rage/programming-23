---
path: '/osa-14/3-pelin-viimeistely'
title: 'Pelin viimeistely'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- TODO

</text-box>

Peli on jo hyvässä vaiheessa, joten nyt voimme alkaa viimeistellä pelin toteutusta. Lisäämme peliin laskurin, joka näyttää siirtojen määrän, mahdollisuuden aloittaa uusi peli ja sulkea peli näppäinkomennoilla sekä ilmoituksen, kun pelaaja onnistuu läpäisemään pelin.

## Siirtolaskuri

Siirtolaskuri näyttää pelin ikkunan alalaidassa, montako siirtoa pelaaja on tehnyt tähän mennessä. Tämän avulla voi yrittää etsiä ratkaisua, jossa on mahdollisimman vähän siirtoja.

Laskurin tekeminen vaatii joitakin muutoksia koodiin. Muutetaan ensin konstruktoria niin, että ikkunassa on tilaa laskurille ja käytettävissä on fontti tekstin piirtämistä varten:

```python
    def __init__(self):
        ...
        self.naytto = pygame.display.set_mode((nayton_leveys, nayton_korkeus + 50))

        self.fontti = pygame.font.SysFont("Arial", 24)
        ...
```

Siirtolaskuri nollataan pelin alussa ja jokainen siirto kasvattaa sitä yhdellä:

```python
    def uusi_peli(self):
        ...
        self.siirrot = 0
```

```python
    def liiku(self, dy, dx):
        ...
        self.siirrot += 1

```

Lisäksi näytön päivityksen yhteydessä näytetään siirtojen määrä laskurin avulla:

```python
    def piirra_naytto(self):
        ...
        teksti = self.fontti.render("Siirrot: " + str(self.siirrot), True, (255, 0, 0))
        self.naytto.blit(teksti, (25, self.korkeus * 50 + 10))
        ...
```

## Uusi peli ja pelin sulkeminen

Lisätään peliin seuraavaksi näppäinkomennot, joiden avulla pelaaja voi aloittaa uuden pelin painamalla F2 sekä sulkea pelin painamalla Esc. Molemmat toiminnot on helppo toteuttaa:

```python
    def tutki_tapahtumat(self):
        ...
                if tapahtuma.key == pygame.K_F2:
                    self.uusi_peli()
                if tapahtuma.key == pygame.K_ESCAPE:
                    exit()
        ...
```

Lisäksi piirretään ikkunan alalaitaan pelaajalle tiedoksi, että pelissä on tällaiset toiminnot:

```python
    def piirra_naytto(self):
        ...
        teksti = self.fontti.render("F2 = uusi peli", True, (255, 0, 0))
        self.naytto.blit(teksti, (200, self.korkeus * 50 + 10))

        teksti = self.fontti.render("Esc = sulje peli", True, (255, 0, 0))
        self.naytto.blit(teksti, (400, self.korkeus * 50 + 10))
        ...
```

## Pelin läpäiseminen

Pelaaja läpäisee pelin, kun jokainen laatikko on jossain kohderuudussa. Tämä voidaan tarkastaa seuraavalla metodilla:

```python
    def peli_lapi(self):
        for y in range(self.korkeus):
            for x in range(self.leveys):
                if self.kartta[y][x] in [2, 6]:
                    return False
        return True
```

Metodi käy läpi kaikki ruudut ja jos jossain ruudussa on luku 2 (tyhjä kohderuutu) tai 6 (robotti kohderuudussa), peli ei ole vielä läpäisty ja metodi palauttaa `False`. Jos mitään tällaista ruutua ei ole ruudukossa, peli kuitenkin on läpäisty ja metodi palauttaa `True`.

Jos pelaaja läpäisee pelin, metodi `piirra_naytto` näyttää asiaan kuuluvan viestin:

```python
    def piirra_naytto(self):
        ...
        if self.peli_lapi():
            teksti = self.fontti.render("Onnittelut, läpäisit pelin!", True, (255, 0, 0))
            teksti_x = 50 * self.leveys / 2 - teksti.get_width() / 2
            teksti_y = 50 * self.korkeus / 2 - teksti.get_height() / 2
            pygame.draw.rect(self.naytto, (0, 0, 0), (teksti_x, teksti_y, teksti.get_width(), teksti.get_height()))
            self.naytto.blit(teksti, (teksti_x, teksti_y))
        ...
```

Lisäksi metodin `liiku` alkua muutetaan niin, että liikkuminen ei ole enää mahdollista, kun pelaaja on läpäissyt pelin:

```python
    def liiku(self, dy, dx):
        if self.peli_lapi():
            return
        ...
```

Tässä tilanteessa kuitenkin pelaaja näkee edelleen ruudukon ja lopullisen pelitilanteen.

## Vinkki testauksen

Pelin kehityksen aikana tulee helposti tarve tarkastaa, mitä tapahtuu jossain vaiheessa myöhemmin pelissä. Esimerkiksi tässä pelissä tällainen tapahtuma on pelin läpäiseminen ja siitä tuleva ilmoitus.

Tällaisen tapahtuman testaaminen voi olla hankalaa, jos esimerkiksi pitää aina läpäistä koko peli ennen kuin tapahtuman näkee. Kuitenkin pelin ohjelmoija voi helposti tehdä koodiin väliaikaisia muutoksia, jotka helpottavat testausta. Esimerkiksi pelin läpäisyä voi testata muuttamalla koodia näin:

```python
    def peli_lapi(self):
        return True
```

Nyt metodi palauttaa aina `True` eli peli on läpäisty heti pelin alkaessa. Tämän avulla voi mukavasti varmistaa, että pelin lopussa tuleva ilmoitus näyttää oikealta eikä pelaaja pysty enää siirtymään ruudukossa. Sitten kun pelin päättyminen toimii oikein, metodin voi jälleen palauttaa ennalleen.

## Peli GitHubiin

Peli on nyt valmis ja voit hakea pelin lopullisen koodin ja kuvat GitHubista:

* [https://github.com/moocfi/sokoban](https://github.com/moocfi/sokoban)

GitHub on hyvä paikka omille ohjelmointiprojekteille: sen avulla projektin koodin ja muut tiedostot saa talteen Git-versionhallintaan ja projektin pystyy helposti jakamaan muille. GitHubia käytetään paljon myöhemmillä tietojenkäsittelytieteen kursseilla.

## Montako siirtoa tarvitaan?

Vaikka pelin ruudukko on melko pieni, peli ei ole helppo. Ensimmäinen haaste on onnistua läpäisemään peli, ja sen jälkeen haasteena on keksiä ratkaisu, jossa siirtojen määrä on mahdollisimman pieni. Kuinka lyhyen ratkaisun onnistut muodostamaan?

Lyhimmän mahdollisen ratkaisun etsiminen käsin on hyvin vaikeaa, mutta tässäkin voi käyttää apuna ohjelmointia. Kurssilla _Tietorakenteet ja algoritmit_  tutustutaan tekniikoihin, joiden avulla voidaan löytää automaattisesti lyhin mahdollinen ratkaisu peliin.
