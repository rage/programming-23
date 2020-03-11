---
path: '/osa-6/1-tiedostojen-lukeminen'
title: 'Tiedostojen lukeminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Suurempia datamääriä ei juuri koskaan syötetä arvo kerrallaan ohjelmalle, vaan syöte luetaan tyypillisesti esimerkiksi tiedostosta tai verkosta. Tässä osiossa käsitellään tekstimuotoisessa tiedostossa olevan datan käyttöä omassa ohjelmassa

Tämän osion läpikäytyäsi

- Tiedät, miten tekstitiedoston sisällön voi lukea Pythonissa
- Tiedät, mitä tarkoitetaan CSV-tiedostolla
- Osaat purkaa ja käsitellä CSV-tiedoston sisällön omassa ohjelmassa

</text-box>

Nykyisten tietokoneiden ja ohjelmien avulla voidaan käsitellä hyvinkin suuria määriä tietoja. Syötteen lukeminen käyttäjältä `input`-lauseella on kätevä tapa yksittäisten tietoalkioiden kysymyiseen, mutta ei tietenkään sovellu suurempien datamassojen lukemiseen.

Yleensä ohjelmien data-aineisto on tallennettuna valmiiksi johonkin tiedostoon. Kätevintä onkin, mikäli tietoa käsittelevä ohjelma voi suoraan lukea tiedot tiedostosta (ja tarvittaessa kirjoittaa tuloksen toiseen tiedostoon).

Pythonissa tiedosto avataan funktiolla `open`, joka saa parametrikseen tiedoston nimen (ja _tiedostopolun_, jos tiedosto sijaitsee jossain toisessa kansiossa). Funktiolla voidaan antaa parametriksi myös _tila_, jossa tiedosto avataan - oletuksena avataan tekstitiedosto lukutilassa. Palataan siis tila-asiaan myöhemmin.

Tiedoston avaamisessa kannattaa käyttää `with`-lausetta, koska tällöin tiedosto suljetaan automaattisesti käsittelyn jälkeen. Muussa tapauksessa tiedosto pitää sulkea itse `close`-metodilla.

Tekstitiedostolla tarkoitetaan pelkkää tekstiä sisältävää tiedostoa. Tällaisen tiedoston voit luoda, avata tai muokata jollain tekstieditorila. Esimerkiksi kurssilla käytettävä Visual Studio Code soveltuu mainiosti tekstitiedostojen avaamiseen ja muokkaamiseen. Huomaa, että tekstinkäsittelyohjelmalla (esim. Word) tuotettu tiedosto ei yleensä ole puhdas tekstitiedosto, vaan sisältää myös muuta dataa, esimerkiksi kuvia ja tekstin muotoilutietoja. Tällaisten tiedostojen käsittely omissa ohjelmissa on huomattavasti monimutkaisempaa ilman ulkoisia kirjastoja.


## Tiedoston avaaminen ja tiedon lukeminen

Aloitetaan tarkastelu yksinkertaisella tekstitiedostolla. Tiedoston `esimerkki.txt` sisältö on kuvattu alla:

<sample-data>

Moi kaikki!
Esimerkkitiedostomme on kolmerivinen.
Viimeinen rivi.

</sample-data>

Esimerkkiohjelma, joka avaa tekstitiedoston ja tulostaa sen sisällön kokonaisuudessaan ruudulle. Huomaa, että ohjelmassa oletetaan, että tekstitiedosto sijaitsee samassa kansiossa (eli hakemistossa) kuin ohjelmatiedostokin:

```python

# Avataan tiedosto
with open("esimerkki.txt") as tiedosto:
    # Luetaan tiedoston sisältö muuttujaan
    sisältö = tiedosto.read()

    # Tulostetaan sisältö ruudulle
    print(sisältö)

    # Tiedosto suljetaan automaattisesti kun käytetään
    # with-lausetta. Muuten pitäisi lopuksi kutsua metodia
    # tiedosto.close()

```

<sample-output>

Moi kaikki!
Esimerkkitiedostomme on kolmerivinen.
Viimeinen rivi.

</sample-output>

Tarkastellaanpa ohjelmaa rivi kerrallaan:

Aluksi avataan tiedosto käyttämllä `open` funktiota `with`-lauseen yhteydessä. Huomaa, että avainsanan `as` jälkeen annetaan muuttujan nimi. Tähän muuttujaan tallennetaan _tiedostokahva_, jonka avulla tiedostoa voi käsitellä avaamisen jälkeen.

Tiedon lukeminen tapahtuu rivillä `sisältö = tiedosto.read()`. Metodi `read` palauttaa koko tiedoston yhtenä merkkijonona. Itse asiassa palautettu merkkijono on sisällöltään seuraavanlainen:

```
"Moi kaikki!\nEsimerkkitiedostomme on kolmerivinen.\nViimeinen rivi."
```

<text-box variant="hint">

Merkinnällä `\n` esitetään rivinvaihtoa (eli merkkiä, jonka Unicode-merkkikoodi on 10). Useimmat tekstieditorit osaavat näyttää merkin rivinvaihtona editoitaessa, mutta esimerkiksi Windowsin Notepadin jotkut versiot käyttävät kahdesta merkistä koostuuvaa rivinvaihtoa (eli "\r\n"). Python osaa tulostaa rivinvaihdot oikein - niinpä esimerkiksi lause `print("moi\nmoi")` tulostaisi ruudulle viestin

```txt
moi
moi
```

</text-box>

## Tiedoston sisällön iterointi

Metodi `read` on näppärä, jos halutaan esim. tulostaa sisältö kokonaisuudessaan ruudulle ja kun sisältöä ei ole liian paljon. Huomattavasti useammin halutaan kuitenkin käsitellä tiedosto palasina - yleensä yksi rivi kerrallaan.

Kenties kätevin tapa on käyttää tiedoston sisällö lukemiseen `for`-silmukkaa. Silmukassa poimitaan tiedoston rivit yksi kerrallaan ja sijoitetaan ne silmukkamuuttujaan - siis täsmälleen samalla tavalla kuin esimerkiksi listaa iteroitaessa.

Esimerkki lukee saman tiedoston nyt käyttäen for-lausetta, poistaa joka rivin perästä rivinvaihdon ja laskee rivien yhteispituuden:

```python

# Avataan tiedosto
with open("esimerkki.txt") as tiedosto:
    # Muuttuja yhteispituutta varten
    yhteispituus = 0

    # Käytetään for-lausetta tiedoston läpikäyntiin
    for rivi in tiedosto:

        # Rivinvaihto on näppärää poistaa korvaamalla se
        # tyhjällä merkkijonolla
        rivi = rivi.replace("\n", "")

        # Rivin pituus
        pituus = len(rivi)

        # ...ja lisätään yhteispituuteen
        yhteispituus = yhteispituus + pituus

print("Tiedoston rivien yhteispituus ilman rivinvaihtoja on " + str(yhteispituus))

```

<sample-output>

Tiedoston rivien yhteispituus ilman rivinvaihtoja on 63

</sample-output>

## Tietojen purkaminen

Yleensä datatiedostot sisältävät muutakin tieto kuin pelkkää tekstiä. On melko tyypillistä, että tiedostoista löytyy yhdeltä riviltä useita _datapisteitä_, jotka on erotettu toisistaan jollain välimerkillä, esimerkiksi pilkulla.


Tiedoston rivit on helppo lukea muistiin `for`-lauseella, mutta miten erottaa datapisteet toisistaan? Helppo tapa on käyttää merkkijonojen `split`-metodia: metodille annetaan haluttu välimerkki, ja se palauttaa alkiot eroteltuna välimerkin mukaan listana merkkijonoja.

KUVA

Esimerkki metodin käytöstä:

```python

teksti = "eka,toka,kolmas,neljäs,viides,kuudes"

# puretaan pilkun kohdalta listaksi
sanat = teksti.split(",")

# tulostetaan alkiot yksitelllen
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

## Esimerkkejä CSV-tiedostojen käsittelystä

Tarkastellaan aluksi yksinkertaista CSV-muotoista tiedostoa `mittaukset.csv`, joka sisältää jokaisella rivillä vaihtuvan määrän desimaalilukuja puolipisteillä erotettuna:

<sample-data>

2.9,2.9,5.6,4.6,1.8,3.6,4.5,3.8
1.4,5.5,4.5,4.0,5.1,4.1,5.7,2.3,2.8,1.1,4.5,4.4
4.4,4.6,1.5,3.7,3.5,4.5,4.0,1.3,5.5,2.4,1.6
4.8,2.9,5.8,2.6,3.8,4.8,2.7,1.2,3.6,4.5,3.7,1.0,1.1
1.3,4.6,3.9,3.8,5.7,3.0,5.6,4.6,5.7,5.7,3.5

</sample-data>

Esimerkkiohjelmamme lukee arvot ja tallentaa ne listaksi liukulukuja. Lopuksi lasketaan ja tulostetaan kaikkien lukujen keskiarvo.

```python

# Lista, johon arvot tallennetaan
mittaukset = []

# Avataan tiedosto
with open("mittaukset.csv") as tiedosto:
    # Luetaan sisältö rivi kerrallaan
    for rivi in tiedosto:

        # pura rivi palasiksi
        data = rivi.split(",")

        # käydään läpi arvot yksi kerrallaan ja
        # muunnetaan ne liukuluvuiksi
        for alkio in data:
            mittaukset.append(float(alkio))


# Lasketaan lopuksi keskiarvo:
keskiarvo = sum(mittaukset) / len(mittaukset)

print("Keskiarvo: " + str(keskiarvo))

```

<sample-output>

Keskiarvo: 3.6727272727272715

</sample-output>

Kaikki tiedot eivät välttämättä aina ole rivillä samantyyppisiä.

Otetaan toiseksi esimerkiksi tiedosto `arvosanat.txt`, joka sisältää jokaisella rivillä aluksi opiskelijan nimen ja tämän eri kursseista saamat arvosanat. Datapisteet on erotettu toisistaan puolipisteillä.

<sample-data>

Pekka;5;4;5;3;4;5;5;4;2;4
Paula;3;4;2;4;4;2;3;1;3;3
Pirjo;4;5;5;4;5;5;4;5;4;4

</sample-data>

Tiedoston purkamisessa käsiteltävään muotoon voidaan erottaa kolme vaihetta jokaiselle riville:

1. Luetaan rivi muistiin
2. Puretaan rivi palasiksi puolipisteiden kohdalta
3. Muutetaan merkkijonot kokonaisluvuiksi, jotta dataa voidaan hyödyntää laskuissa

Miten data kannattaisi tallentaa muistiin? Yksi käyttökelpoinen mahdollisuus olisi muodostaa hakemisto (eli dictinonary), jossa avaimena olisi opiskelijan nimi ja arvona lista, joka sisältää arvosanat kokonaislukuina listassa. Esimerkkiohjelmamme tekee tiedostosta tällaisen hakemiston:

```python

def lue_tiedosto(tiedoston_nimi: str) -> dict:
    # Hakemisto, johon tiedot tallennetaan
    suoritukset = {}

    # Avataan tiedosto
    with open(tiedoston_nimi) as tiedosto:
        # lue rivit yksitellen
        for rivi in tiedosto:

            # puretaan palasiksi puolipisteiden kohdalta
            sisältö = rivi.split(";")

            # lista arvosanoja varten
            arvosanat = []

            # iteroidaan arvot indeksistä 1 alkaen, nolla on opiskelijan nimi
            for i in range(1, len(sisältö)):
                # muutetaan kokonaisluvuksi
                arvosanat.append(int(sisältö[i]))

            # lisätään hakemistoon
            suoritukset[sisältö[0]] = arvosanat

    return suoritukset

# Testataan esimerkkitiedostolla
testi = lue_tiedosto("arvosanat.txt")

for nimi, arvosanat in testi.items():
    print(nimi + ": " + str(arvosanat))



```

<sample-output>

Pekka: [5, 4, 5, 3, 4, 5, 5, 4, 2, 4]
Paula: [3, 4, 2, 4, 4, 2, 3, 1, 3, 3]
Pirjo: [4, 5, 5, 4, 5, 5, 4, 5]

</sample-output>

Kannattaa tutustua huolella esimerkkikoodiin. Se voi ensisilmäyksellä vaikuttaa monimutkaiselta, mutta ratkaisu on helposti sovellettavissa hyvin monenlaisiin datatiedostoihin. Tuloksena olevasta hakemistosta on nyt helppo laskea esimerkiksi jokaisen opiskelijan arvosanojen keskiarvo.



