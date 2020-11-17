---
path: '/osa-13/2-animaatio'
title: 'Animaatio'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- TODO

</text-box>

Monissa peleissä on tarvetta saada aikaan liikkuvia hahmoja, joten seuraava luonteva askel on opetella animaation tekeminen. Animaatio syntyy, kun kuva piirretään eri kohtiin näytöllä sopivasti ajastettuna.

## Animaation tekeminen

Seuraava koodi luo animaation, jossa robotti kulkee vasemmalta oikealle ikkunassa:

```python
import pygame

pygame.init()
naytto = pygame.display.set_mode((640, 480))

robo = pygame.image.load("robo.png")

x = 0
y = 0
kello = pygame.time.Clock()

while True:
    for tapahtuma in pygame.event.get():
        if tapahtuma.type == pygame.QUIT:
            exit()
    naytto.fill((0, 0, 0))
    naytto.blit(robo, (x, y))
    pygame.display.flip()
    x += 1
    kello.tick(60)
```

Ohjelman suoritus näyttää seuraavalta:

TODO: Kuva tähän (pitäisi saada animoitu kuva)

Katsotaan taas tarkemmin, mitä ohjelmassa tapahtuu. Jotta kuva pystyy liikkumaan, meillä täytyy olla tieto sen paikasta. Tämä onnistuu ottamalla käyttöön kaksi muuttujaa, jotka sisältävät kuvan vasemman yläkulman koordinaatit:

```python
x = 0
y = 0
```

Tämän lisäksi määritellään kello, jonka avulla pystyy huolehtimaan siitä, että animaation nopeus on sopiva:

```python
kello = pygame.time.Clock()
```

Pääsilmukan sisällä on koodi, joka piirtää kuvan sen nykyiseen paikkaan:

```python
    naytto.fill((0, 0, 0))
    naytto.blit(robo, (x, y))
    pygame.display.flip()
```

Ensin kutsutaan metodia `fill`, joka tyhjentää ikkunan mustalla värillä. Väri määritellään RGB-muodossa parametrilla `(0, 0, 0)`, mikä tarkoittaa, että värin punainen, vihreä ja sininen komponentti on 0 eli väri on musta. Jokainen komponentti voi olla välillä 0–255. Esimerkiksi `(255, 255, 255)` on valkoinen ja `(255, 0, 0)` on punainen.

Tämän jälkeen kuva piirretään tuttuun tapaan metodilla `blit` ja lopuksi ikkunan sisältö päivitetään funktiolala `pygame.display.flip`.

Silmukan päätteeksi muuttujan `x` arvo kasvaa kahdella, minkä ansiosta kuva liikkuu pikselin eteenpäin joka kierroksella:

```python
    x += 1
```

Lisäksi silmukan lopussa suoritetaan kellon metodi `tick`:

```python
    kello.tick(60)
```

Metodi `tick` huolehtii siitä, että animaation nopeus on sopiva: se tahdistaa silmukan niin, että silmukka pyritään suorittamaan 60 kertaa sekunnissa. Toisin sanoen kuva liikkuu sekunnissa 60 pikseliä oikealle. Tämä vastaa pelien yhteydessä käytettävää termiä _FPS_ (_frames per second_).

Metodi `tick` on hyödyllinen, koska sen avulla animaatio toimii periaatteessa yhtä nopeasti jokaisella koneella. Jos silmukassa ei olisi tällaista ajastusta, pelin nopeus riippuisi siitä, kuinka nopeasti pelaajan kone toimii.

## Seinään törmääminen

Äskeinen animaatio on muuten hieno, mutta kun robotti etenee ikkunan ulkopuolelle, animaatio jatkuu ja robotti katoaa näkyvistä. Tehdään seuraavaksi ohjelmaan parannus, jonka avulla robotin suunta muuttuu, jos se törmää seinään.

```python
pygame.init()
naytto = pygame.display.set_mode((640, 480))

robo = pygame.image.load("robo.png")

x = 0
y = 0
nopeus = 1
kello = pygame.time.Clock()

while True:
    for tapahtuma in pygame.event.get():
        if tapahtuma.type == pygame.QUIT:
            exit()
    naytto.fill((0, 0, 0))
    naytto.blit(robo, (x, y))
    pygame.display.flip()
    x += nopeus
    if nopeus > 0 and x+robo.get_width() >= 640:
        nopeus = -nopeus
    if nopeus < 0 and x == 0:
        nopeus = -nopeus
    kello.tick(60)
```

Ohjelman suoritus näyttää nyt tältä:

TODO: Kuva tähän (pitäisi saada animoitu kuva)

Nyt ohjelmassa on uusi muuttuja `nopeus`, joka määrittää robotin liikkumistavan. Positiivinen nopeus tarkoittaa liikkumista oikealle ja negatiivinen nopeus tarkoittaa liikkumista vasemmalle. Tässä tapauksessa kun nopeus on 1, robotti liikkuu oikealle, ja kun nopeus on –1, robotti liikkuu vasemmalle.

Seuraavat rivit huolehtivat, että robotti osaa törmätä seinään:

```python
    if nopeus > 0 and x+robo.get_width() >= 640:
        nopeus = -nopeus
    if nopeus < 0 and x == 0:
        nopeus = -nopeus
```

Jos nopeus on positiivinen eli robotti liikkuu oikealle ja sen oikea reuna alkaa olla ikkunan oikean reunan ulkopuolella, robotin suunta muuttuu käänteiseksi eli se alkaa liikkua vasemmalle. Vastaavasti jos nopeus on negatiivinen ja robotin vasen reuna alkaa olla ikkunan vasemman reunan ulkopuolella, suunta muuttuu taas käänteiseksi eli robotti alkaa liikkua oikealle.

Tämän koodin ansiosta robotti jatkaa loputtomasti rataa, jossa se liikkuu ensin koko ikkunan verran oikealle, sitten takaisin vasemmalle, sitten taas oikealle, jne.

## Pyörivä animaatio

Tehdään vielä animaatio, jossa robotti _pyörii_  ikkunan keskipisteen ympärillä:

```python
pygame.init()
naytto = pygame.display.set_mode((640, 480))

robo = pygame.image.load("robo.png")

kulma = 0
kello = pygame.time.Clock()

while True:
    for tapahtuma in pygame.event.get():
        if tapahtuma.type == pygame.QUIT:
            exit()
    naytto.fill((0, 0, 0))
    x = 320+math.cos(kulma)*100-robo.get_width()/2
    y = 240+math.sin(kulma)*100-robo.get_height()/2
    naytto.blit(robo, (x, y))
    pygame.display.flip()
    kulma += 0.1
    kello.tick(60)
```

Ohjelman suoritus näyttää tältä:

TODO: Kuva tähän (pitäisi saada animoitu kuva)

Pyörimisanimaatio saadaan toteutettua trigonometrian avulla: muuttujassa `kulma` on radiaaneina robotin sijainnin kulma suhteessa ikkunan keskipisteeseen. Tästä saadaan laskettua sini- ja kosinifunktioilla robotin sijainti:

```python
        x = 320+math.cos(kulma)*100-robo.get_width()/2
        y = 240+math.sin(kulma)*100-robo.get_height()/2
```

Tämä tarkoittaa, että robotin sijainti on ympyrällä, jonka säde on 100. Kosini antaa x-suuntaisen sijainnin ja sini puolestaan y-suuntaisen sijainnin. Jotta animaatio näyttää hyvältä, robotti lisäksi keskitetään niin, että sen keskipiste on ympyrällä.

Joka kierroksella muuttujan `kulma` arvo kasvaa 0.1:llä. Koska radiaaneissa täysi ympyrä on 2π eli noin 6.28, robotti pyörii suunnilleen kierroksen verran sekunnissa.
