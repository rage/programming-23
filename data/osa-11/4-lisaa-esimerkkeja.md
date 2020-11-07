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

    if juuri.vasen_lapsi is not None:
        tulosta_alkiot(juuri.vasen_lapsi)

    if juuri.oikea_lapsi is not None:
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

    if juuri.vasen_lapsi is not None:
        summa += alkioiden_summa(juuri.vasen_lapsi)

    if juuri.oikea_lapsi is not None:
        summa += alkioiden_summa(juuri.oikea_lapsi)

    return summa

```

Muuttuja `summa` alustetaan nykyisen alkion arvolla. Tämän jälkeen siihen lisätään rekursiivisesti vasemman ja oikean alipuun summat (tarkastaen taas ensin, että ne ovat olemassa). Lopuksi summa palautetaan.

<programming-exercise name='Suurin alkio' tmcname='osa11-16_suurin_alkio'>

Kirjoita funktio `suurin_alkio(juuri: Alkio)`, joka saa parametrikseen binääripuun juurialkion.

Funktion palauttaa puun suurimman alkion. Puun arvot tulee käydä läpi rekursiivisesti.

Vinkki: voit hyödyntää ratkaisussasi ylempänä esitettyä `alkoiden_summa` -funktiota.

Esimerkki funktion kutsumisesta:

```python

if __name__ == "__main__":
    puu = Alkio(2)

    puu.vasen_lapsi = Alkio(3)
    puu.vasen_lapsi.vasen_lapsi = Alkio(5)
    puu.vasen_lapsi.oikea_lapsi = Alkio(8)

    puu.oikea_lapsi = Alkio(4)
    puu.oikea_lapsi.oikea_lapsi = Alkio(11)

    print(suurin_alkio(puu))

```

<sample-output>

11

</sample-output>

</programming-exercise>

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

## Paluu aikaan ennen rekursiota

Harjoitellaan vielä osan lopussa hieman laajemman ohjelman tekemistä olioita hyödyntäen. Tässä tehtäväsarjassa ei rekursiota tarvitse eikä edes kannata käyttää. Listakoosteita sensijaan pääsee hyödyntämään!

<programming-exercise name='Tilauskirja' tmcname='osa11-18_tilauskirja'>

Teemme tässä tehtävässä kaksi luokkaa, joitka toimivat rakennuspalikoina seuraavassa tehtävässä aiheena olevassa sovelluksessa.

## Tehtava

Toteuta luokka `Tehtava` joka mallintaa ohjelmistoyritykselle annettavia työtehtäviä. Tehtävillä on
- kuvaus
- sekä arvio sen viemästä työmäärästä
- tieto koodarista joka toteuttaa tehtävän
- tieto siitä onko tehtävä valmis vai ei
- yksikäsitteinen tunniste eli id

Luokka toimii seuraavasti:

```python
t1 = Tehtava("koodaa hello world", "Erkki", 3)
print(t1.id, t1.kuvaus, t1.koodari, t1.tyomaara)
print(t1)
print(t1.on_valmis())
t1.merkkaa_valmiiksi()
print(t1)
print(t1.on_valmis())
t2 = Tehtava("koodaa webbikauppa", "Antti", 10)
t3 = Tehtava("tee mobiilisovellus työaikakirjanpitoon", "Erkki", 25)
print(t2)
print(t3)
```

<sample-output>

1 koodaa hello world Erkki 3
1: koodaa hello world (3 tuntia), koodari Erkki EI VALMIS
False
1: koodaa hello world (3 tuntia), koodari Erkki VALMIS
True
2: koodaa webbikauppa (10 tuntia), koodari Antti EI VALMIS
3: tee mobiilisovellus työaikakirjanpitoon (25 tuntia), koodari Erkki EI VALMIS

</sample-output>

Täsmennyksiä:
- tehtävän tilan (valmis vai ei vielä valmis) voi tarkistaa funktiolla `on_valmis(self)` joka palauttaa totuusarvon
- tehtävä ei ole siinä vaiheessa valmis kun se luodaan
- tehtävä merkataan valmiiksi kutsumalla metodia `merkkaa_valmiiksi(self)`
- tehtävien id on juokseva numero, joka alkaa arvosta 1
    - ensimmäisenä luotava tehtävä saa id:n 1, seuraava id:n 2 jne

**Vihje** id kannatta toteuttaa [luokkamuuttujana](/osa-9/5-staattiset-piirteet#luokkamuuttujat).

## Tilauskirja

Tehdään nyt luokka `Tilauskirja`, joka kokoaa kaikki ohjelmistoyritykseltä tilatut työtehtävät, joita siis mallinnetaan luokan `Tehtava` olioilla.


Tilauskirjan perusversiota käytetän seuraavasti:

```python
tilaukset = Tilauskirja()
tilaukset.lisaa_tilaus("koodaa webbikauppa", "Antti", 10)
tilaukset.lisaa_tilaus("tee mobiilisovellus työaikakirjanpitoon", "Erkki", 25)
tilaukset.lisaa_tilaus("tee ohjelma matematiikan harjoitteluun", "Antti", 100)

for tilaus in tilaukset.kaikki_tilauset():
    print(tilaus)

print()

for koodari in tilaukset.koodarit():
    print(koodari)
```

<sample-output>

1: koodaa webbikauppa (10 tuntia), koodari Antti EI VALMIS
2: tee mobiilisovellus työaikakirjanpitoon (25 tuntia), koodari Erkki EI VALMIS
3: tee ohjelma matematiikan harjoitteluun (100 tuntia), koodari Antti EI VALMIS

Antti
Erkki

</sample-output>

Tässä vaiheessa `Tilauskirja` tarjoaa kolme metodia:
- `lisaa_tilaus(self, kuvaus, koodari, tyomaara)` lisää uuden tilauksem tilauskirjaan. Tilauskirja tallettaa tilaukset sisäisesti `Tehtava`-olioina. Huomaa, että metodilla täytyy olla juuri nämä parametrit, muuten testit eivät hyväksy metodia!
- `kaikki_tilauset(self)` palauttaa listana kaikki tilauskirjalla olevat tehtävät
- `koodari(self)` palauttaa listana kaikki koodarit, joille on tehtävä tilauskirjassa, metodi palauttama lista ei saa sisältää yhtä koodia useampaan kertaan

**Vihje** Listalta on helppo poistaa duplikaatit siten että muutetaan ensin lista [set](https://docs.python.org/3.8/library/stdtypes.html#set)-tyyppiseksi. Set siis tarkoittaa joukkoa, ja joukossa kutakin alkiota voi olla vain yksi kappale. Tämän jälkeen `set` voidaan muuttaa takaisin listaksi, ja duplikaatit ovat kadonneet:

```python
lista = [1,1,3,6,4,1,3]
lista2 = list(set(lista))
print(lista)
print(lista2)
```

<sample-output>

[1, 1, 3, 6, 4, 1, 3]
[1, 3, 4, 6]

</sample-output>

## Tilauskirjan viimeistely

Tehdään luokalle `Tilauskirja` vielä kolme uutta metodia.

Metodi `merkkaa_valmiiksi(self, id: int)` saa parametriksi tehtävän id:n ja merkkaa kyseisen tehtävän valmiiksi:

```python
tilaukset = Tilauskirja()
tilaukset.lisaa_tilaus("koodaa webbikauppa", "Antti", 10)
tilaukset.lisaa_tilaus("tee mobiilisovellus työaikakirjanpitoon", "Erkki", 25)
tilaukset.lisaa_tilaus("tee ohjelma matematiikan harjoitteluun", "Antti", 100)

tilaukset.merkkaa_valmiiksi(1)
tilaukset.merkkaa_valmiiksi(2)

for tilaus in tilaukset.kaikki_tilauset():
    print(tilaus)
```

<sample-output>

1: koodaa webbikauppa (10 tuntia), koodari Antti VALMIS
2: tee mobiilisovellus työaikakirjanpitoon (25 tuntia), koodari Erkki VALMIS
3: tee ohjelma matematiikan harjoitteluun (100 tuntia), koodari Antti EI VALMIS

</sample-output>

Jos parametria vastaavaa tilausta ei löydy, tuottaa metodi poikkeuksen `ValueError`. Kertaa tarvittaessa [täältä](/osa-6/3-virheet#poikkeusten-tuottaminen) miten poikkeus tuotetaan.

Metodit `valmiit_tilaukset(self)` ja `ei_valmiit_tilaukset(self)` toimivat kuten olettaa saattaa, ne palauttavat nimensä mukaisen osajoukon tilauskirjan tehtävistä listana.

## Tilauskirjan loppusilaus

Tehdään luokalle `Tilauskirja` vielä metodi `koodarin_status(self, koodari: str)`, joka palauttaa _tuplen_, joka kertoo koodarin valmistuneiden ja vielä valmistumattomien töiden määrän sekä näihin kuluneiden työtuntien summan.

```python
tilaukset = Tilauskirja()
tilaukset.lisaa_tilaus("koodaa webbikauppa", "Antti", 10)
tilaukset.lisaa_tilaus("tee mobiilisovellus työaikakirjanpitoon", "Antti", 25)
tilaukset.lisaa_tilaus("tee ohjelma matematiikan harjoitteluun", "Antti", 100)
tilaukset.lisaa_tilaus("tee uusi facebook", "Erkki", 1000)

tilaukset.merkkaa_valmiiksi(1)
tilaukset.merkkaa_valmiiksi(2)

status = tilaukset.koodarin_status("Antti")
print(status)
```

<sample-output>

(2, 1, 35, 100)

</sample-output>

Tuplen ensimmäinen alkio siis kertoo valmiiden töiden määrän ja toinen valmistumattomien töiden määrän. Kolmas alkio on valmiiden töiden työaika-arvioiden summa ja neljäs alkio vielä valmistumattomien töiden työmäärä-arvioiden summan.

Jos parametria vastaavaa koodaria ei löydy, tuottaa metodi poikkeuksen `ValueError`.


</programming-exercise>

<programming-exercise name='Tilauskirjasovellus' tmcname='osa11-19_tilauskirjasovellus'>

Tässä tehtävässä tehdään interaktiivinen sovellus softafirmalta tilattujen tehtävien hallintaan. Tyyli on täysin vapaa, mutta voit hyödyntää sovelluksessa edellisen tehtävän aikana koodattuja rakennuspalikoita. Myös [edellisen osan viimeisen luvun](/osa-10/4-lisaa-esimerkkeja) materiaalin kertaaminen saattaa olla hyödyksi.

## Ei virheiden käsittelyä

Sovelluksen tulee toimia _täsmälleen_ seuraavasti:

<sample-output>

komennot:
0 lopetus
1 lisää tilaus
2 listaa valmiit
3 listaa ei valmiit
4 merkitse tehtävä valmiiksi
5 koodarit
6 koodarin status

komento: **1**
kuvaus: **koodaa uusi facebook**
koodari ja työmääräarvio: **joona 1000**
lisätty!

komento: **1**
kuvaus: **tee sovellus ajanhallintaan**
koodari ja työmääräarvio: **erkki 25**
lisätty!

komento: **1**
kuvaus: **ohjelma musiikin teorian harjoitteluun**
koodari ja työmääräarvio: **niina 12**
lisätty!

komento: **1**
kuvaus: **koodaa uusi twitter**
koodari ja työmääräarvio: **joona 55**
lisätty!

komento: **2**
ei valmiita

komento: **3**
1: koodaa uusi facebook (1000 tuntia), koodari joona EI VALMIS
2: tee sovellus ajanhallintaan (25 tuntia), koodari erkki EI VALMIS
3: ohjelma musiikin teorian  harjoitteluun (12 tuntia), koodari niina EI VALMIS
4: koodaa uusi twitter (55 tuntia), koodari joona EI VALMIS

komento: **4**
tunniste: **2**
merkitty valmiiksi

komento: **4**
tunniste: **4**
merkitty valmiiksi

komento: **2**
2: tee sovellus ajanhallintaan (25 tuntia), koodari erkki VALMIS
4: koodaa uusi twitter (55 tuntia), koodari joona VALMIS

komento: **3**
1: koodaa uusi facebook (1000 tuntia), koodari joona EI VALMIS
3: ohjelma musiikin teorian harjoitteluun (12 tuntia), koodari niina EI VALMIS

komento: **5**
joona
erkki
niina

komento: **6**
koodari: **joona**
työt: valmiina 2 ei valmiina 1, tunteja: tehty 55 tekemättä 1000

</sample-output>

Ensimmäiseen tehtäväpisteeseen riittää, että sovellus toimii jos kaikki syötteet ovat virheettömiä.

## Ei virheiden käsittelyä

Toiseen tehtäväpisteeseen edellytetään, että sovellus toipuu käyttäjän syötteessä olevista virheistä. Virheiden käsittelyn tulee toimia siten, että missä tahansa syötteessa annettu virheellinen syöte aiheuttaa virheilmoituksen _virheellinen syöte_, ja johtaa siihen, että komentoa pyydetään uudelleen:

<sample-output>

komento: **1**
kuvaus: **tee sovellus ajanhallintaan**
koodari ja työmääräarvio: **erkki xxx**
virheellinen syöte

komento: **1**
kuvaus: **tee sovellus ajanhallintaan**
koodari ja työmääräarvio: **erkki**
virheellinen syöte

komento: **4**
tunniste: **1000000**
virheellinen syöte

komento: **4**
tunniste: **XXXX**
virheellinen syöte

komento: **6**
koodari: **tuntematonkoodari**
virheellinen syöte

</sample-output>

</programming-exercise>
