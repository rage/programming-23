---
path: '/osa-14/2-robo-ja-laatikot'
title: 'Robotti ja laatikot'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- TODO

</text-box>

Vaikein asia Sokoban-pelin toteutuksessa on saada robotti liikkumaan niin, että se pystyy työntämään laatikoita halutulla tavalla. Pelin pitää tunnistaa, milloin robotti pystyy siirtymään pelaajan haluamaan suuntiin, sekä käsitellä oikein tilanteet, joissa robotti työntää laatikkoa. Nyt on aika tarttua tähän haasteeseen.

## Näppäimistön käsittely

Pelaaja ohjaa robottia nuolinäppäimillä, joten tapahtumien käsittelyä täytyy laajentaa niin, että se tarkkailee myös näppäimistön tapahtumia:

```python
    def tutki_tapahtumat(self):
        for tapahtuma in pygame.event.get():
            if tapahtuma.type == pygame.KEYDOWN:
                if tapahtuma.key == pygame.K_LEFT:
                    self.liiku(0, -1)
                if tapahtuma.key == pygame.K_RIGHT:
                    self.liiku(0, 1)
                if tapahtuma.key == pygame.K_UP:
                    self.liiku(-1, 0)
                if tapahtuma.key == pygame.K_DOWN:
                    self.liiku(1, 0)

            if tapahtuma.type == pygame.QUIT:
                exit()
```

Nyt kun pelaaja painaa nuolinäppäintä, kutsutaan metodia `liiku` sopivilla parametreilla. Ensimmäinen parametri ilmaisee liikkeen määrän pystysuunnassa ja toinen parametri puolestaan ilmaisee liikkeen määrän vaakasuunnassa.

## Robotin etsiminen

Pelin täytyy tietää robotin sijainti, jotta sitä pystyy siirtämään oikealla tavalla. Seuraava metodi `etsi_robo` selvittää robotin sijainnin:

```python
    def etsi_robo(self):
        for y in range(self.korkeus):
            for x in range(self.leveys):
                if self.kartta[y][x] in [4, 6]:
                    return (y, x)
```

Metodi käy läpi kaikki ruudukon ruudut ja palauttaa ruudun koordinaatit, jos ruudussa on luku 4 (robotti yksinään) tai luku 6 (robotti kohderuudun päällä).

Ideana on, että aina kun käyttäjä painaa nuolinäppäintä, selvitetään ensin robotin sijainti käymällä läpi ruudukon ruudut. Tämä voi tuntua vähän hitaalta, koska vaihtoehtoisesti voisi myös pitää yllä tietoa robotin sijainnista omissa muuttujissa. Tämän toteutuksen etuna on kuitenkin, että robotin sijainti ei ole tallessa kahdessa paikassa (ruudukossa ja erillisissä muuttujissa) vaan vain yhdessä paikassa, eli muistissa oleva pelin tila on yksinkertaisempi.

## Muutokset ruudukossa

Metodi `liiku` saa parametreina suunnan, johon pelaaja haluaa robotin liikkuvan, ja metodi joko päivittää ruudukkoa sopivasti tai toteaa, että liikkuminen ei ole mahdollista eikä muuta ruudukon sisältöä.

```python
    def liiku(self, dy, dx):
        robo_y, robo_x = self.etsi_robo()
        uusi_y = robo_y + dy
        uusi_x = robo_x + dx

        if self.kartta[uusi_y][uusi_x] == 1:
            return

        if self.kartta[uusi_y][uusi_x] in [3, 5]:
            kolmas_y = uusi_y + dy
            kolmas_x = uusi_x + dx

            if self.kartta[kolmas_y][kolmas_x] in [1, 3, 5]:
                return

            self.kartta[uusi_y][uusi_x] -= 3
            self.kartta[kolmas_y][kolmas_x] += 3

        self.kartta[robo_y][robo_x] -= 4
        self.kartta[uusi_y][uusi_x] += 4
```

Metodi on melko monimutkainen, joten katsotaan tarkemmin metodin osia:

### Robotin vanha ja uusi sijainti

```python
        robo_y, robo_x = self.etsi_robo()
        uusi_y = robo_y + dy
        uusi_x = robo_x + dx
```

Metodi kutsuu ensin metodia `etsi_robo`, joka selvittää robotin nykyisen sijainnin. Tämä sijainti tallennetaan muuttujiin `robo_y` ja `robo_x`.

Tämän jälkeen muuttujiin `uusi_y` ja `uusi_x` lasketaan robotin haluttu uusi sijainti. Tämä saadaan laskettua kätevästi, kun tiedossa on vanha sijainti sekä haluttu sijainnin muutos pysty- ja vaakasuunnassa.

### Törmääkö robotti seinään?

```python
        if self.kartta[uusi_y][uusi_x] == 1:
            return
```

Seuraavaksi käsitellään tapaus, jossa pelaaja yrittää ohjata robottia seinään (luku 1 tarkoittaa seinää). Tämä ei ole sallittua, joten tässä tilanteessa ei tapahdu mitään ja metodin suoritus vain loppuu.

### Laatikon siirtyminen

```python
        if self.kartta[uusi_y][uusi_x] in [3, 5]:
            kolmas_y = uusi_y + dy
            kolmas_x = uusi_x + dx

            if self.kartta[kolmas_y][kolmas_x] in [1, 3, 5]:
                return

            self.kartta[uusi_y][uusi_x] -= 3
            self.kartta[kolmas_y][kolmas_x] += 3
```

Jos robotin uudessa sijainnissa on luku 3 (laatikko) tai 5 (laatikko kohderuudussa), robotti työntää laatikkoa liikkuessaan. Tätä varten lasketaan muuttujiin `kolmas_y` ja `kolmas_x` laatikon uusi sijainti työntämisen jälkeen.

Laatikko ei voi siirtyä, jos uudessa kohdassa on luku 1 (seinäruutu), luku 3 (toinen laatikko) tai luku 5 (toinen laatikko kohderuudussa). Näissä tapauksissa metodi sulkee itsensä eikä tee mitään.

Muissa tapauksissa kuitenkin laatikkoa pystyy siirtämään, jolloin laatikon nykyisen ruudun luvusta vähennetään 3 ja uuden ruudun lukuun lisätään 3. Tämä päivittää ruudukkoa oikealla tavalla sekä silloin, kun laatikko on tavallisessa lattiaruudussa tai kohderuudussa.

### Robotin siirtyminen

```
        self.kartta[robo_y][robo_x] -= 4
        self.kartta[uusi_y][uusi_x] += 4
```

Jos metodin suoritus etenee loppuun asti, myös robotin tulee vielä siirtyä. Tämä toteutetaan samalla tavalla kuin laatikon siirtyminen, paitsi että vähennettävä ja lisättävä arvo on 4. Tässäkin tapauksessa ruudukon sisältö muuttuu oikein tilanteissa, joissa robotti on tavallisessa lattiaruudussa tai kohderuudussa.

## Refaktorointia?

Tässä käytetty tapa tallentaa ruudukon tilanne on siinä mielessä kätevä, että yksi ruudukko kuvaa pelin koko tilanteen tiiviissä muodossa ja ruudukkoa on melko helppoa päivittää vähentämällä ja poistamalla sopivasti lukuja.

Toteutuksen huonona puolena on kuitenkin, että pelin koodin ymmärtäminen voi olla vaikeaa. Esimerkiksi jos ulkopuolinen koodari näkee seuraavan rivin, se näyttää luultavasti mystiseltä.

```python
            if self.kartta[kolmas_y][kolmas_x] in [1, 3, 5]:
```

Tässä on käytetty _taikalukuja_ (_magic numbers_) ruutujen esittämiseen, ja koodin lukijan täytyy tietää, että 1 tarkoittaa seinää, 3 tarkoittaa laatikkoa ja 5 tarkoittaa kohderuudussa olevaa laatikkoa.

Vielä mystisempiä ovat rivit tyyliin

```python
            self.kartta[uusi_y][uusi_x] -= 3
```

koska nyt laatikkoa tarkoittava luku 3 vähennetään ruudun luvusta. Tämä toimii, koska tämä muuttaa tavallisen laatikon lattiaksi ja kohderuudussa olevan laatikon kohderuuduksi, mutta asian ymmärtäminen vaatii huolellista perehtymistä ruutujen numerointiin.

Pelin koodin lukijan työtä voisi helpottaa _refaktoroimalla_ koodia eli muuttamalla koodin rakennetta paremmaksi ja selkeämmäksi. Tässä tapauksessa helppo muutos olisi käyttää lukujen 0–6 sijasta kuvaavampia ruutujen nimiä, mutta tämä ei selittäisi sitä, miksi lukuja voi vähentää ja lisätä ja ruudukko muuttuu oikealla tavalla.

Pelin koodin saaminen todella helposti luettavaksi vaatisikin luultavasti paljon suurempaa refaktorointia, esimerkiksi ruudukon pysyvän rakenteen tallentamista erillään ja robotin ja laatikoiden sijaintien tallentamista omissa tietorakenteissaan. Toisaalta tämän kääntöpuolena olisi, että koodia voisi tulla paljon lisää ja pelin sisäinen toiminta muuttuisi monimutkaisemmaksi.

Refaktorointiin ja koodin laatuun liittyviin asioihin tutustutaan lisää tulevilla kursseilla, kuten _Ohjelmistotekniikka_ ja _Ohjelmistotuotanto_.
