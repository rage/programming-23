---
path: '/osa-6/1-tiedostojen-lukeminen'
title: 'Tiedostojen lukeminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion suoritettuasi

- Tiedät, miten tekstitiedoston sisällön voi lukea Pythonissa
- Tiedät, mitä tarkoitetaan CSV-tiedostolla
- Osaat purkaa ja käsitellä CSV-tiedoston sisällön omassa ohjelmassa

</text-box>

Nykyisten tietokoneiden ja ohjelmien avulla voidaan käsitellä hyvinkin suurta määrää tietoa. Tyypillisesti käsiteltävä aineisto on tiedostossa, josta voimme lukea sen ohjelmalla.

Oletamme tässä luvussa, että käsiteltävä tiedosto on _tekstitiedosto_ eli se muodostuu riveistä, joilla on tekstiä. Esimerkiksi kurssilla käytettävä Visual Studio Code soveltuu tekstitiedostojen käsittelyyn. Huomaa, että esim. Word-dokumentti ei ole tekstitiedosto, vaan sen osana on myös tekstin muotoilutietoja. Tällaisten tiedostojen käsittely omissa ohjelmissa on huomattavasti monimutkaisempaa ilman ulkoisia kirjastoja.

## Tiedoston avaaminen ja tiedon lukeminen

Aloitetaan tarkastelu tiedostolla `esimerkki.txt`, jonka sisältö on kuvattu alla:

<sample-data>

Moi kaikki!
Esimerkkitiedostomme on kolmerivinen.
Viimeinen rivi.

</sample-data>

Kun haluamme käsitellä tiedostoa ohjelmoinnissa, meidän tulee ensin _avata_ tiedosto, minkä jälkeen voimme lukea tai kirjoittaa tietoa. Pythonissa tiedosto avataan funktiolla `open`, joka saa parametrikseen tiedoston nimen. Oletuksena tiedosto avataan lukemista varten.

Voimme käyttää tiedoston käsittelyyn `with`-lausetta, jolloin kaikki tiedoston käsittelyyn liittyvä koodi on lohkon sisällä ja lohkon päättymisen jälkeen tiedosto suljetaan automaattisesti. Muussa tapauksessa tiedosto pitää sulkea itse `close`-metodilla.

TODO: Mitähän tässä pitäisi sanoa? Useinhan `close` ei ole oikeasti tarpeen ja muutenkin `with` voi tuntua oudolta ilman lisäselityksiä.

Seuraava esimerkkiohjelma avaa tiedoston ja tulostaa sen sisällön ruudulle. Ohjelma olettaa, että tekstitiedosto sijaitsee samassa hakemistossa kuin ohjelma suoritetaan:

```python
with open("esimerkki.txt") as tiedosto:
    sisalto = tiedosto.read()
    print(sisalto)
```

<sample-output>

Moi kaikki!
Esimerkkitiedostomme on kolmerivinen.
Viimeinen rivi.

</sample-output>

Tarkastellaanpa ohjelmaa rivi kerrallaan:

Aluksi avataan tiedosto käyttämällä `open`-funktiota `with`-lauseen yhteydessä. Huomaa, että avainsanan `as` jälkeen annetaan muuttujan nimi. Tähän muuttujaan tallennetaan _tiedostokahva_, jonka avulla tiedostoa voi käsitellä avaamisen jälkeen.

Tiedon lukeminen tapahtuu rivillä `sisalto = tiedosto.read()`. Metodi `read` palauttaa koko tiedoston sisällön yhtenä merkkijonona. Tässä tapauksessa palautettu merkkijono on seuraava:

```
"Moi kaikki!\nEsimerkkitiedostomme on kolmerivinen.\nViimeinen rivi."
```

<text-box variant="hint" name="Rivinvaihdot">

Merkintä `\n` tarkoittaa rivinvaihtoa (eli merkkiä, jonka merkkikoodi on 10). Useimmat tekstieditorit osaavat näyttää merkin rivinvaihtona editoitaessa, mutta esimerkiksi Windowsin Notepadin jotkut versiot käyttävät kahdesta merkistä koostuuvaa rivinvaihtoa `\r\n`. Python osaa tulostaa rivinvaihdot oikein - niinpä esimerkiksi lause `print("moi\nmoi")` tulostaisi ruudulle viestin

```txt
moi
moi
```

</text-box>

## Tiedoston sisällön läpikäynti

Metodi `read` on näppärä, jos halutaan esim. tulostaa sisältö kokonaisuudessaan ruudulle. Huomattavasti useammin halutaan kuitenkin käsitellä tiedostoa palasina -- yleensä yksi rivi kerrallaan.

Yksi kätevä tapa on käyttää tiedoston sisällö lukemiseen `for`-silmukkaa. Silmukassa poimitaan tiedoston rivit yksi kerrallaan ja sijoitetaan ne silmukkamuuttujaan -- siis täsmälleen samalla tavalla kuin esimerkiksi listan läpikäynnissä.

Seuraava esimerkki lukee saman tiedoston nyt käyttäen `for`-silmukkaa, poistaa joka rivin perästä rivinvaihdon ja laskee rivien yhteispituuden:

```python
with open("esimerkki.txt") as tiedosto:
    laskuri = 0
    yhteispituus = 0

    for rivi in tiedosto:
        # metodi replace poistaa rivinvaihdon korvaamalla sen tyhjällä
        rivi = rivi.replace("\n","")
        laskuri += 1
        print("Rivi",laskuri,rivi)
        pituus = len(rivi)
        yhteispituus += pituus

print("Rivien yhteispituus:",yhteispituus)
```

<sample-output>

Rivi 1 Moi kaikki!
Rivi 2 Esimerkkitiedostomme on kolmerivinen.
Rivi 3 Viimeinen rivi.
Rivien yhteispituus: 63

</sample-output>

## CSV-tiedoston lukeminen

CSV-tiedosto (_Comma Separated Values_) on tekstitiedosto, jonka jokaisella rivillä on tietyllä välimerkillä erotettua tietoa. Välimerkkinä on usein pilkku `,` tai puolipiste `;`, mutta mikä tahansa muukin merkki on periaatteessa mahdollinen.

CSV-tiedoston rivit on helppoa lukea `for`-silmukalla, mutta miten erottaa rivillä olevat tiedot toisistaan? Helppo tapa on käyttää merkkijonojen `split`-metodia: metodille annetaan haluttu välimerkki, ja se palauttaa tiedot eroteltuna välimerkin mukaan listana merkkijonoja.

KUVA

Esimerkki metodin käytöstä:

```python
teksti = "eka,toka,kolmas,neljäs,viides,kuudes"
sanat = teksti.split(",")
for sana in sanat:
    print(sana)
```

<sample-output>

eka
toka
kolmas
neljäs
viides
kuudes

</sample-output>

Tarkastellaan aluksi yksinkertaista CSV-muotoista tiedostoa `mittaukset.csv`, joka sisältää jokaisella rivillä vaihtuvan määrän desimaalilukuja pilkuilla erotettuna:

TODO: Eikö yleensä aina CSV-tiedostossa joka rivillä ole sama määrä alkioita? Tämä ei tunnu oikein edustavalta esimerkiltä.

<sample-data>

2.9,2.9,5.6,4.6,1.8,3.6,4.5,3.8
1.4,5.5,4.5,4.0,5.1,4.1,5.7,2.3,2.8,1.1,4.5,4.4
4.4,4.6,1.5,3.7,3.5,4.5,4.0,1.3,5.5,2.4,1.6
4.8,2.9,5.8,2.6,3.8,4.8,2.7,1.2,3.6,4.5,3.7,1.0,1.1
1.3,4.6,3.9,3.8,5.7,3.0,5.6,4.6,5.7,5.7,3.5

</sample-data>

Esimerkkiohjelmamme lukee arvot ja tallentaa ne listaksi liukulukuja. Lopuksi lasketaan ja tulostetaan kaikkien lukujen keskiarvo.

```python
mittaukset = []

with open("mittaukset.csv") as tiedosto:
    for rivi in tiedosto:
        osat = rivi.split(",")
        for mittaus in osat:
            mittaukset.append(float(mittaus))

keskiarvo = sum(mittaukset) / len(mittaukset)
print("Keskiarvo:", keskiarvo)
```

<sample-output>

Keskiarvo: 3.6727272727272715

</sample-output>

Kaikki tiedot eivät välttämättä aina ole rivillä samantyyppisiä.

Otetaan toiseksi esimerkiksi tiedosto `arvosanat.txt`, joka sisältää jokaisella rivillä aluksi opiskelijan nimen ja tämän eri kursseista saamat arvosanat. Tiedot on erotettu toisistaan puolipisteillä.

<sample-data>

Pekka;5;4;5;3;4;5;5;4;2;4
Paula;3;4;2;4;4;2;3;1;3;3
Pirjo;4;5;5;4;5;5;4;5;4;4

</sample-data>

Tiedoston purkamisessa käsiteltävään muotoon voidaan erottaa kolme vaihetta jokaiselle riville:

1. Luetaan rivi muistiin
2. Puretaan rivi palasiksi puolipisteiden kohdalta
3. Muutetaan merkkijonot kokonaisluvuiksi, jotta dataa voidaan hyödyntää laskuissa

Miten data kannattaisi tallentaa muistiin? Yksi käyttökelpoinen mahdollisuus olisi muodostaa sanakirja, jossa avaimena olisi opiskelijan nimi ja arvona lista, joka sisältää arvosanat kokonaislukuina listassa. Esimerkkiohjelmamme tekee tiedostosta tällaisen sanakirjan:

```python
suoritukset = {}
with open("arvosanat.txt") as tiedosto:
    for rivi in tiedosto:
        osat = rivi.split(";")
        arvosanat = []
        for arvosana in osat[1:]
            arvosanat.append(int(arvosana))
        suoritukset[osat[0]] = arvosanat

for nimi, arvosanat in testi.items():
    print(nimi, arvosanat)
```

TODO: Mikä tämän esimerkin pointti on, kun tiedostolle ei tehdä oikein mitään vaan vain tulostetaan sen sisältö vähän eri muodossa?

<sample-output>

Pekka [5, 4, 5, 3, 4, 5, 5, 4, 2, 4]
Paula [3, 4, 2, 4, 4, 2, 3, 1, 3, 3]
Pirjo [4, 5, 5, 4, 5, 5, 4, 5]

</sample-output>

Kannattaa tutustua huolella esimerkkikoodiin. Se voi ensisilmäyksellä vaikuttaa monimutkaiselta, mutta ratkaisu on helposti sovellettavissa hyvin monenlaisiin datatiedostoihin. Tuloksena olevasta hakemistosta on nyt helppo laskea esimerkiksi jokaisen opiskelijan arvosanojen keskiarvo.



