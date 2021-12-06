---
path: '/part-13/1-pygame-kayttoon'
title: 'Pygame käyttöön'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Olet asentanut Pygame-kirjaston koneellesi
- Osaat luoda ikkunan ja sulkea ohjelman
- Osaat piirtää ikkunaan tiedostossa olevan kuvan

</text-box>

Kurssin kahdella viimeisellä viikolla tutustumme Pygame-kirjastoon, joka on peliohjelmointiin tarkoitettu Python-kirjasto. Pygamen avulla pystyy piirtämään grafiikkaa, käsittelemään näppäimistön ja hiiren tapahtumia ja tekemään muuta peleissä tarvittavaa.

## Pygamen asentaminen

### Linux

Avaa komentorivi ja kirjoita `pip3 install pygame`.

<img src="pygame_linux.png">

### Windows

Avaa Windowsin terminaali napauttamalla vasemman alakulman Windows-painiketta. Kirjoita aukeavaan ikkunaan `cmd` ja paina enter:

<img src="13_1_1.png">

Kirjoita auenneeeseen komentokehoteikkunaan seuraava komentosarja ja paina `enter`:

`pip3 install pygame`

Tämä asentaa Pygame-paketin koneellesi.

Asennus voi vaatia järjestelmänvalvojan oikeuksia. Jos ylläoleva ei toimi, voit yrittää ajaa terminaalin järjestelmänvalvojana (valitse Windows-valikko, paina hiiren kakkospainiketta CMD-valinnan päällä ja valitse "Run as administrator" tai "Aja järjestelmänvalvojana").

Huomaa, että asennus vaatii että olet asennusvaiheessa ohjeiden mukaisesti valinnut kohdan "Add Python 3.XX to path", katso [ohjeet](https://www.mooc.fi/fi/installation/vscode#python3)

### Mac

Avaa _Terminaali_, esim. painamalla oikean yläkulman suurennuslasi-symbolia:

<img src="13-1-2.png">

 Kirjoita aukeavaan teksikenttään `terminal` ja paina enter:

<img src="13-1-3.png">

Kirjoita auenneeeseen komentokehoteikkunaan seuraava komentosarja ja paina `enter`:

`pip3 install pygame`

<img src="13-1-4.png">


Tämä asentaa Pygame-paketin koneellesi.

## Ensimmäinen ohjelma

Tässä on yksinkertainen Pygamea käyttävä testiohjelma:

```python
import pygame

pygame.init()
naytto = pygame.display.set_mode((640, 480))

naytto.fill((0,0,0))
pygame.display.flip()

while True:
    for tapahtuma in pygame.event.get():
        if tapahtuma.type == pygame.QUIT:
            exit()
```

Kun ohjelma käynnistetään, se näyttää käyttäjälle seuraavanlaisen ikkunan:

<img src="pygame_eka.gif">

Ohjelmassa ei ole kuitenkaan vielä muuta sisältöä kuin ikkunan näyttäminen. Ohjelman suoritus jatkuu niin kauan, kunnes käyttäjä sulkee ikkunan.

Katsotaan seuraavaksi tarkemmin, miten ohjelma on rakentunut. Ohjelman alussa rivi `import pygame` ottaa mukaan Pygame-kirjaston. Kirjaston käyttäminen alkaa kutsumalla funktiota `pygame.init`, minkä jälkeen ohjelma luo ikkunan funktiolla `pygame.display.set_mode`.

```python
pygame.init()
naytto = pygame.display.set_mode((640, 480))
```

Muuttujan `naytto` kautta ikkunaan voidaan viitata myöhemmin esimerkiksi grafiikan piirtämistä varten. Parametri `(640, 480)` tarkoittaa, että tässä ohjelmassa ikkunan leveys on 640 pikseliä ja korkeus on 480 pikseliä.

Seuraavaksi ohjelmassa on kaksi komentoa:

```python
naytto.fill((0, 0, 0))
pygame.display.flip()
```

Metodi `fill` täyttää näytön annetulla värillä. Tässä tapauksessa värinä on `(0, 0, 0)`, mikä tarkoittaa mustaa. Sitten metodi `pygame.display.flip` päivittää näytön sisällön.

Tämän jälkeen alkaa ohjelman _pääsilmukka_:

```python
while True:
    for tapahtuma in pygame.event.get():
        if tapahtuma.type == pygame.QUIT:
            exit()
```

Pääsilmukka käsittelee tapahtumat, jotka käyttöjärjestelmä välittää ohjelmalle. Joka kierroksella funktio `pygame.event.get` antaa listan tapahtumista, jotka ovat syntyneet funktion edellisen kutsukerran jälkeen.

Tässä tapauksessa ohjelma käsittelee vain tyyppiä `pygame.QUIT` olevat tapahtumat. Tällainen tapahtuma syntyy, kun käyttäjä sulkee ohjelman esimerkiksi painamalla ikkunan ylänurkassa olevaa raksia. Tämän tapahtuman seurauksena ohjelma sulkee itsensä kutsumalla `exit`-funktiota.

Voit kokeilla, mitä tapahtuu, jos ohjelma ei käsittele tapahtumaa `pygame.QUIT`. Tällöin raksin painamisen ei pitäisi vaikuttaa ohjelman toimintaan, mikä on hämmentävää käyttäjälle. Ohjelman voi kuitenkin tässäkin tapauksessa sulkea väkisin komentoriviltä painamalla Control+C.

## Kuva ohjelmaan

Laajennetaan seuraavaksi ohjelmaa niin, että se näyttää ikkunassa kuvan. Tämä onnistuu seuraavasti:

```python
import pygame

pygame.init()
naytto = pygame.display.set_mode((640, 480))

robo = pygame.image.load("robo.png")

naytto.fill((0, 0, 0))
naytto.blit(robo, (100, 50))
pygame.display.flip()

while True:
    for tapahtuma in pygame.event.get():
        if tapahtuma.type == pygame.QUIT:
            exit()
```

Koodi käyttää kuvaa `robo.png`, jossa on robotin kuva:

<img src="robo.png">

Tiedoston `robo.png` tulee olla samassa hakemistossa ohjelman lähdekoodin kanssa, jotta ohjelma löytää kuvan. Tämän viikon tehtävissä robotin kuva on valmiina tehtäväpohjissa.

Nyt ikkuna näyttää tältä:

<img src="pygame_kuva.gif">

Tässä funktio `pygame.image.load` lataa muuttujaan tiedostossa `robo.png` olevan kuvan. Tämän jälkeen metodi `blit` piirtää kuvan ikkunaan kohtaan `(100, 50)` ja sitten funktio `pygame.display.flip` päivittää ikkunan sisällön. Kohta `(100, 50)` tarkoittaa, että kuvan _vasen yläkulma_  on kyseisessä kohdassa.

Huomaa, että Pygamessa ja yleensä muutenkin ohjelmoinnissa koordinaatisto on rakennettu niin, että piirtoalueen vasen yläkulma on kohdassa `(0, 0)` ja koordinaatit kasvavat x-suunnassa oikealle ja y-suunnassa alaspäin. Tässä tapauksessa ikkunan oikean alakulman koordinaatit ovat `(640, 480)`.

Kuvan voi piirtää moneenkin kohtaan ikkunassa. Esimerkiksi seuraava koodi piirtää kuvan kolmeen eri kohtaan:

```python
naytto.blit(robo, (0, 0))
naytto.blit(robo, (300, 0))
naytto.blit(robo, (100, 200))
```

Tällöin ikkuna näyttää seuraavalta:

<img src="pygame_kuva2.gif">

Seuraava koodi puolestaan piirtää kuvan ikkunan keskelle:

```python
leveys = robo.get_width()
korkeus = robo.get_height()
naytto.blit(robo, (320-leveys/2, 240-korkeus/2))
```

Nyt ikkuna näyttää tältä:

<img src="pygame_kuva3.gif">

Tässä metodi `get_width` antaa kuvan leveyden ja vastaavasti metodi `get_height` antaa kuvan korkeuden. Ikkunan keskikohta on `(320, 240)`, joten tämän avulla saadaan laskettua sopiva kohta kuvan vasemmalle yläkulmalle niin, että kuva sijoittuu ikkunan keskelle.

<text-box variant='hint' name='Pygame-tehtävät'>

Tämän osan tehtävissä ei ole automaattisia testejä, vaan testi antaa pisteet automaattisesti, kun lähetät ratkaisun palvelimelle. Lähetä ratkaisu vasta sitten, kun se on valmis ja vastaa tehtävänannon vaatimuksia. Vaikka tehtävissä ei ole testejä, kurssin henkilökunta näkee lähetetyt ratkaisut. Jos lähetät palvelimelle ratkaisun, joka selkeästi ei vastaa tehtävänantoa, voit menettää pisteet tämän osan tehtävistä.

</text-box>


<programming-exercise name='Neljä robottia' tmcname='osa13-01_nelja_robottia'>

Tee ohjelma, joka piirtää robotin jokaiseen ikkunan neljään nurkkaan. Ohjelman suorituksen tulee näyttää tältä:

<img src="pygame_nelja.gif">

</programming-exercise>

<programming-exercise name='Robotit rivissä' tmcname='osa13-02_robotit_rivissa'>

Tee ohjelma, joka piirtää kymmenen robottia riviin. Ohjelman suorituksen tulee näyttää tältä:

<img src="pygame_rivi.gif">

</programming-exercise>

<programming-exercise name='Sata robottia' tmcname='osa13-03_sata_robottia'>

Tee ohjelma, joka piirtää sata robottia: kymmenen riviä ja joka rivissä kymmenen robottia. Ohjelman suorituksen tulee näyttää tältä:

<img src="pygame_sata.gif">

</programming-exercise>

<programming-exercise name='Satunnaiset robotit' tmcname='osa13-04_satunnaiset_robotit'>

Tee ohjelma, joka piirtää _tuhat_ robottia satunnaisiin paikkoihin. Ohjelman suorituksen tulee näyttää tältä:

<img src="pygame_tuhat.gif">

</programming-exercise>
