---
path: '/part-13/1-pygame'
title: 'Pygame'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will have installed the Pygame library on your computer
- You will know how to create a Pygame window and how to exit a program
- You will be able to use a picture stored in a file in a Pygame window

</text-box>

In these last two parts of this course material we will get to grips with the Pygame library. It is a Python library for programming games. It helps you create graphical elements, handle events from the keyboard and the mouse, and implement other features necessary in games.

## Installing Pygame

### Linux

Open a command line, type in `pip3 install pygame` an press `enter`.

<img src="pygame_linux.png">

This should install the Pygame library on your computer.

### Windows

Open the Windows terminal by opening the menu, typing in `cmd` and pressing `enter`:

<img src="13_1_1.png">

The command line interpreter window should open. Type in `pip3 install pygame` and press `enter`.

This should install the Pygame library on your computer.

Installation may require system administrator privileges. If the above doesn't work, you can try running the terminal application as an administrator: open the Windows menu, find the CMD application, right-click it and choose "Run as administrator".

Installing and accessing Pygame requires that your Python installation is added to path, as instructed [here](https://www.mooc.fi/en/installation/vscode/#python3).

### Mac

Open the _Terminal_, for example through the magnifying glass symbol in the top right hand corner:

<img src="13-1-2.png">

The search tool should open. Type in `terminal` and press `enter`:

<img src="13-1-3.png">

Type in the following and press `enter`:

`pip3 install pygame`

<img src="13-1-4.png">

This should install the Pygame library on your computer.

## Your first program

Here is a simple program for checking your Pygame installation works correctly:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

window.fill((0,0,0))
pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

When this program is run, it should display a window:

<img src="pygame_first.gif">

Ohjelmassa ei ole kuitenkaan vielä muuta sisältöä kuin ikkunan näyttäminen. Ohjelman suoritus jatkuu niin kauan, kunnes käyttäjä sulkee ikkunan.

Katsotaan seuraavaksi tarkemmin, miten ohjelma on rakentunut. Ohjelman alussa rivi `import pygame` ottaa mukaan Pygame-kirjaston. Kirjaston käyttäminen alkaa kutsumalla funktiota `pygame.init`, minkä jälkeen ohjelma luo ikkunan funktiolla `pygame.display.set_mode`.

```python
pygame.init()
window = pygame.display.set_mode((640, 480))
```

Muuttujan `window` kautta ikkunaan voidaan viitata myöhemmin esimerkiksi grafiikan piirtämistä varten. Parametri `(640, 480)` tarkoittaa, että tässä ohjelmassa ikkunan leveys on 640 pikseliä ja korkeus on 480 pikseliä.

Seuraavaksi ohjelmassa on kaksi komentoa:

```python
window.fill((0, 0, 0))
pygame.display.flip()
```

Metodi `fill` täyttää näytön annetulla värillä. Tässä tapauksessa värinä on `(0, 0, 0)`, mikä tarkoittaa mustaa. Sitten metodi `pygame.display.flip` päivittää näytön sisällön.

Tämän jälkeen alkaa ohjelman _pääsilmukka_:

```python
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

Pääsilmukka käsittelee eventt, jotka käyttöjärjestelmä välittää ohjelmalle. Joka kierroksella funktio `pygame.event.get` antaa listan tapahtumista, jotka ovat syntyneet funktion edellisen kutsukerran jälkeen.

Tässä tapauksessa ohjelma käsittelee vain tyyppiä `pygame.QUIT` olevat eventt. Tällainen event syntyy, kun käyttäjä sulkee ohjelman esimerkiksi painamalla ikkunan ylänurkassa olevaa raksia. Tämän eventn seurauksena ohjelma sulkee itsensä kutsumalla `exit`-funktiota.

Voit kokeilla, mitä tapahtuu, jos ohjelma ei käsittele eventa `pygame.QUIT`. Tällöin raksin painamisen ei pitäisi vaikuttaa ohjelman toimintaan, mikä on hämmentävää käyttäjälle. Ohjelman voi kuitenkin tässäkin tapauksessa sulkea väkisin komentoriviltä painamalla Control+C.

## Kuva ohjelmaan

Laajennetaan seuraavaksi ohjelmaa niin, että se näyttää ikkunassa kuvan. Tämä onnistuu seuraavasti:

```python
import pygame

pygame.init()
window = pygame.display.set_mode((640, 480))

robo = pygame.image.load("robo.png")

window.fill((0, 0, 0))
window.blit(robo, (100, 50))
pygame.display.flip()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
```

Koodi käyttää kuvaa `robo.png`, jossa on robotin kuva:

<img src="robo.png">

Tiedoston `robo.png` tulee olla samassa hakemistossa ohjelman lähdekoodin kanssa, jotta ohjelma löytää kuvan. Tämän viikon tehtävissä robotin kuva on valmiina tehtäväpohjissa.

Nyt ikkuna näyttää tältä:

<img src="pygame_pic.gif">

Tässä funktio `pygame.image.load` lataa muuttujaan tiedostossa `robo.png` olevan kuvan. Tämän jälkeen metodi `blit` piirtää kuvan ikkunaan kohtaan `(100, 50)` ja sitten funktio `pygame.display.flip` päivittää ikkunan sisällön. Kohta `(100, 50)` tarkoittaa, että kuvan _vasen yläkulma_  on kyseisessä kohdassa.

Huomaa, että Pygamessa ja yleensä muutenkin ohjelmoinnissa koordinaatisto on rakennettu niin, että piirtoalueen vasen yläkulma on kohdassa `(0, 0)` ja koordinaatit kasvavat x-suunnassa oikealle ja y-suunnassa alaspäin. Tässä tapauksessa ikkunan oikean alakulman koordinaatit ovat `(640, 480)`.

Kuvan voi piirtää moneenkin kohtaan ikkunassa. Esimerkiksi seuraava koodi piirtää kuvan kolmeen eri kohtaan:

```python
window.blit(robo, (0, 0))
window.blit(robo, (300, 0))
window.blit(robo, (100, 200))
```

Tällöin ikkuna näyttää seuraavalta:

<img src="pygame_pic2.gif">

Seuraava koodi puolestaan piirtää kuvan ikkunan keskelle:

```python
leveys = robo.get_width()
korkeus = robo.get_height()
window.blit(robo, (320-leveys/2, 240-korkeus/2))
```

Nyt ikkuna näyttää tältä:

<img src="pic3.gif">

Tässä metodi `get_width` antaa kuvan leveyden ja vastaavasti metodi `get_height` antaa kuvan korkeuden. Ikkunan keskikohta on `(320, 240)`, joten tämän avulla saadaan laskettua sopiva kohta kuvan vasemmalle yläkulmalle niin, että kuva sijoittuu ikkunan keskelle.

<text-box variant='hint' name='Pygame-tehtävät'>

Tämän osan tehtävissä ei ole automaattisia testejä, vaan testi antaa pisteet automaattisesti, kun lähetät ratkaisun palvelimelle. Lähetä ratkaisu vasta sitten, kun se on valmis ja vastaa tehtävänannon vaatimuksia. Vaikka tehtävissä ei ole testejä, kurssin henkilökunta näkee lähetetyt ratkaisut. Jos lähetät palvelimelle ratkaisun, joka selkeästi ei vastaa tehtävänantoa, voit menettää pisteet tämän osan tehtävistä.

</text-box>


<programming-exercise name='Neljä robottia' tmcname='osa13-01_nelja_robottia'>

Tee ohjelma, joka piirtää robotin jokaiseen ikkunan neljään nurkkaan. Ohjelman suorituksen tulee näyttää tältä:

<img src="pygame_four.gif">

</programming-exercise>

<programming-exercise name='Robotit rivissä' tmcname='osa13-02_robotit_rivissa'>

Tee ohjelma, joka piirtää kymmenen robottia riviin. Ohjelman suorituksen tulee näyttää tältä:

<img src="pygame_row.gif">

</programming-exercise>

<programming-exercise name='Sata robottia' tmcname='osa13-03_sata_robottia'>

Tee ohjelma, joka piirtää sata robottia: kymmenen riviä ja joka rivissä kymmenen robottia. Ohjelman suorituksen tulee näyttää tältä:

<img src="pygame_hu
ndred.gif">

</programming-exercise>

<programming-exercise name='Satunnaiset robotit' tmcname='osa13-04_satunnaiset_robotit'>

Tee ohjelma, joka piirtää _tuhat_ robottia satunnaisiin paikkoihin. Ohjelman suorituksen tulee näyttää tältä:

<img src="pygame_thousand.gif">

</programming-exercise>
