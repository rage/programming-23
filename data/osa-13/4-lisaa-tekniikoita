---
path: '/osa-13/4-lisaa-tekniikoita'
title: 'Lisää tekniikoita'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- TODO

</text-box>

## Lisää kuvista

TODO

## Kuvioiden piirtäminen

Seuraava ohjelma luo kuvan, jossa on suorakulmio, ympyrä ja viiva:

```python
import pygame

pygame.init()
naytto = pygame.display.set_mode((640, 480))

pygame.draw.rect(naytto, (0, 255, 0), (50, 100, 200, 250))
pygame.draw.circle(naytto, (255, 0, 0), (200, 150), 40)
pygame.draw.line(naytto, (0, 0, 255), (80, 120), (300, 160), 2)

pygame.display.update()

while True:
    for tapahtuma in pygame.event.get():
        if tapahtuma.type == pygame.QUIT:
            exit()
```

Ohjelman tulos näyttää tältä:

TODO: Kuva tähän

## Tekstin piirtäminen

Tekstin piirtäminen tapahtuu Pygame-kirjastossa niin, että ensin luodaan tekstiä vastaava kuva ja sen jälkeen piirretään kuva näytölle. Seuraava ohjelma esittelee asiaa:

```python
import pygame

pygame.init()
naytto = pygame.display.set_mode((640, 480))

fontti = pygame.font.SysFont("Arial", 24)
teksti = fontti.render("Moikka!", True, (255, 0, 0))
naytto.blit(teksti, (100, 50))
pygame.display.update()

while True:
    for tapahtuma in pygame.event.get():
        if tapahtuma.type == pygame.QUIT:
            exit()
```

Ohjelman suoritus näyttää seuraavalta:

TODO: Kuva tähän

Tässä metodi `pygame.font.SysFont` luo fonttiolion, joka käyttää järjestelmän fonttia Arial kokona 24. Tämän jälkeen olion metodi `render` luo kuvan, jossa lukee teksti "Moikka!" punaisella värillä, ja tämä kuva piirretään ikkunaan.

Huomaa, että eri järjestelmissä on saatavilla eri fontit. Jos järjestelmässä ei ole fonttia Arial (mikä tosin on yleinen fontti), yllä oleva koodi käyttää sen sijasta järjestelmän oletusfonttia. Toinen mahdollisuus on käyttää metodia `pygame.font.Font`, jolle annetaan hakemistossa olevan fonttitiedoston nimi.

## Musiikin soittaminen

Seuraava ohjelma soittaa taustalla musiikkia tiedostosta `bach.mp3`. Kuitenkin musiikki päättyy, kun käyttäjä painaa jotain näppäintä.

```python
import pygame

pygame.init()
naytto = pygame.display.set_mode((640, 480))

pygame.mixer.music.load("bach.mp3")
pygame.mixer.music.play()

while True:
    for tapahtuma in pygame.event.get():
        if tapahtuma.type == pygame.QUIT:
            exit()
        if tapahtuma.type == pygame.KEYDOWN:
            pygame.mixer.music.stop()
```
