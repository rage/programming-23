---
path: '/osa-10/4-lisaa-esimerkkeja'
title: 'Laajemman sovelluksen kehittäminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tässä osiossa

- Käydään tässä luvussa läpi hieman laajemman sovelluksen tekemiseen liittyviä seikkoja
- Erityinen fokus on sovelluksen eri osa-alueiden (käyttöliittymä, sovelluslogiikka ja tiedostojen käsittely) eriyttämisessä
- Harjoitellaan tätä itse

</text-box>

Ohjelmoinnin perusteiden ja jatkokurssin aikana on esitelty suuri määrä Pythonin tarjoamia ominaisuuksia.

Ohjelmoinnin perusteissa tutustuttiin kielen kontrollirakenteisiin (while ja for), funktioihin sekä perustietorakenteisiin eli listaan ja sanakirjaan. Näytti jo hetken siltä että muuta ei tarvitakaan ja periaatteessa näin on, ohjelmoinnin perusteiden kalustolla pystyy ilmaisemaan kaiken mikä Pythonilla on ylipäätään ilmaistavissa.

Jatkokurssin alussa, eli kurssin osassa 8 pakkaa ruvettiin kuitenkin hämmentämään tuomalla mukaan luokat ja oliot. Milloin ja ylipäätään _miksi_ oliota tulisi käyttää jos kurssin osien 1-7 kalusto on jo ilmaisuvoimaltaan riittävä?

## Monimutkaisuuden hallintaa

Monissa tilanteissa voi ja varmasti kannattaakin olla käyttämättä oliota. Esimerkiksi kun koodailen itse pieniä "kertakäyttöisiä" apuohjelmia, en tuskin koskaan käytä oliota. Tilanne alkaa muuttua kun siirrytään hieman suuremman kokoluokan ohjelmiin.

Kun ohjelmat kasvavat, alkaa niissä olevien detaljien määrä nousta hallitsemattomaksi, ellei ohjelmaa strukturoida jollain järkevällä tavalla. Itseasiassa jo ohjelmoinnin perusteissakin monien opiskelijoiden koodissa oli havaittavissa jo aivan liian monimutkaisia ratkaisuja, joiden ymmärtämisessä jopa alan ammattilaisilla on vaikeuksia.

Käsite [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) on ollut jo vuosikymmeniä eräs ohjelmoinnin ja koko tietojenkäsittelyn keskeisiä teemoja. Wikipedian mukaan käsittellä tarkoitetaan seuraavaa

_Separation of concerns is a design principle for separating a computer program into distinct sections such that each section addresses a separate concern. A concern is a set of information that affects the code of a computer program_

Vapaasti käännettynä kyse on periaatteesta, joka ohjaa jakamaan ohjelmakoodin pienempiin osiin, joista kukin huolehtii omasta "tontistaan". Periaatteen ideana on siis hallita ohjelmien väistämätöntä monimutkaisuutta sillä, että ohjelma jaetaan omiin osiinsa, joista kukin keskittyy omaan osa-alueeseensa.

Funktiot ovat yksi mekanismi tämän tavoitteen saavuttamiseen, eli sen sijaan että ohjelma kirjoitetaan yhtenä isona kokonaisuutena, koostetaan se pienistä funktioista, joista kukin ratkaisee pienen osan ongelmasta.

Olio-ohjelmointi tarjoaa funktioita jossain määrin ilmaisuvoimaisemman ja joidenkin mielestä funktioitakin "paremman" tavan saavuttaa tämä sama tavoite. Kuten olemme nähneet, olioiden avulla on mahdollista koota samaan asiaan liittyvä data ja sitä käsittelevä koodi, eli metodit samaan paikkaan. Oliot tarjoavat myös mekanismin käsittelemänsä datan kapselointiin, joka taas tavallaan on keino piilottaa "turhia" yksityiskohtia olion ulkopuoliselta osalta ohjelmaa.

## Esimerkki: puhelinluettelo

Miten ohjelma sitten tulisi jakaa luokkiin ja olioihin? Kysymys ei ole helppo, ja asiaa on helpompi pohdiskella konkreettisen esimerkin kautta. Siispä toteutetaan tässä esimerkkinä olio-ohjelmointia hyödyntäen hieman samantyylinen puhelinluettelo, joka oli aiheena ohjelmoinnin perusteiden viidennen osan [tehtävässä](osa-5/3-dictionary#programming-exercise-puhelinluettelo-versio-2).

Separation of concerns -periaatetta noudatellen koodi siis tuli jakaa osiin, joista kukin käsittelee omaa asiaansa. Olio-ohjelmoinnin piirissä tätä periaatetta ilmentää niin sanottu [yhden vastuun (single responsipility)](https://en.wikipedia.org/wiki/Single-responsibility_principle) -periaate. Ei mennä sen tarkemmin periaatteen detaljeihin, mutta maalaisjärjellä ajatellen periaatteen nimi jo kertoo mistä on kyse, _yksittäisen luokan olioiden tulisi olla vastuussa yhdestä asiasta_.

Olioita käytettäessä ohjelmointiongelman "reaalimaailman asioita" vastaa yleensä oma luokkansa. Puhelinluettelon tapauksessa tälläisiä reaalimaailman asioita olisivat esimerkiksi:
- henkilö
- himi
- puhelinnumero

Näistä nimi ja puhelinnumero ovat kenties "liian vähäpätöisiä" ollakseen omia luokkiaan, mutta _henkilö_ voisi hyvinkin olla oma luokkansa, jonka vastuulla on sitoa yhteen tietty nimi ja siihen liittyvät puhelinnumerot.

Myös _puhelinluettelo_ itsessään on potentiaalinen luokka, sen vastuulla on hallinnoida eri henkilöiden tietoja.

Nämä kaksi luokkaa eli _puhelinluettelo_ ja _henkilö_ muodostavat sovelluksen ytimen, eli niin sanotun _sovelluslogiikan_. Näiden lisäksi ohjelma tarvitsee muutaman muunkin luokan.

Käyttäjän kanssa tapahtuvasta interaktiosta huolehtivaa luokkaa ei kannata sotkea sovelluslogiikan kanssa samaan luokkaan - sehän on kokonaan oma vastuunsa. Eli sovelluslogiikan luokkien lisäksi ohjelmalle tulee myös luokka, joka huolehtii ohjelman käyttöliittymästä.

Talletamme puhelinluettelon tiedot tiedostoon. Myös tiedoston käsittely on selkeästi oma vastuunsa, joten tulemme sisällyttämään siihen käytettävän koodin omaan luokkaansa.

Kun ohjelman luokkarakenne alkaa pikkuhiljaa hahmottua, nousee kysymykseksi se, mistä ohjelmointi kannattaa aloittaa. Itse olen todennunt useimmiten parhaaksi tavaksi aloittaa pienellä palalla sovelluslogiikka.

## vaihe 1: sovelluslogiikan runko

Aloitetaan luokasta _Puhelinluettelo_. Runko voisi näyttää seuraavalta:

```python
class Puhelinluettelo:
    def __init__(self):
        self.__henkilot = []

    def lisaa_numero(self, nimi: str, numero: str):
        pass

    def hae_numerot(self, nimi: str):
        pass

```

Luokka pitää siis sisällän listan henkilöitä ja tarjoaa metodit tietojen lisäämiseen ja hakemiseen.

Koska jokaiseen henkilöön voi liittyä useita numeroita, päätetään silti toteuttaa luettelon sisäinen tila sanakirjan avulla, se tekee nimen perusteella tapahtuvan hakemisen helpoksi. Koska sanakirjaan on helppo tallettaan nimeen liittyvät numerot, päätetäänkin että ei kuitenkaan ainakaan tässä vaiheessa määritellä ollenkaan luokkaa yksittäisen henkilön tietojen tallettamiseen.

Luokka laajenee seuraavasti, mukana on myös pieni toiminnan varmistava koodinpätkä:

```python
class Puhelinluettelo:
    def __init__(self):
        self.__henkilot = {}

    def lisaa_numero(self, nimi: str, numero: str):
        if not nimi in self.__henkilot:
            # henkilöön liittyy lista puhelinnumeroja
            self.__henkilot[nimi] = []

        self.__henkilot[nimi].append(numero)

    def hae_numerot(self, nimi: str):
        if not nimi in self.__henkilot:
            return None

        return self.__henkilot[nimi]

# testikoodi
luettelo = Puhelinluettelo()
luettelo.lisaa_numero("Erkki", "02-123456")
print(luettelo.hae_numerot("Erkki"))
print(luettelo.hae_numerot("Emilia"))
```

Testikoodin tulostus on seuraava:

<sample-output>

['02-123456']
None

</sample-output>

Metodi `hae_numerot` siis palauttaa arvon `None`, jos henkilö ei löydy luettelosta, jos henkilö löytyy, palautetaan lista joka sisältää henkilön puhelinnumerot.

Kun itse ohjelmoin mitä tahansa ohjelmaa, kokeilen _aina_ että kirjoittamani koodi toimii kuten oletan sen toimivan, ennen kun etenen muuhun koodiin.
Usein tämä "testikoodi" on poisheitettävää koodia, ja sikäli voisi ajatella testaamisesta olevan ylimääräistä vaivaa. Lähes 100% tapauksissa ei näin kuitenkaan ole.

Koodiin tullut bugi kannattaa saada kiinni ja korjata niin pian kuin mahdollista. Jos koodin toimivuuden varmistaa lähes jokaisen uuden koodirivin jälkeen, on debuggaus ja korjaaminen yleensä vaivatonta ja nopeaa, koska tällöin voi olla melko varma siitä, että ongelma johtuu hetki sitten lisätyistä koodiriveistä. Jos taas koodia testataan vasta sen jälkeen kun siihen on lisätty kymmeniä koodirivejä, on virhelähteitä moninkertaisesti.

## vaihe 2: käyttöliittymän runko

Kun sovelluslogiikan ydintoiminnallisuus on kunnossa, voidaan edetä sovelluksen tekstikäyttöliittymään. Tehdään sitä varten oma luokka `PuhelinluetteloSovellus`, jonka runko on seuraava:

```python
class PuhelinluetteloSovellus:
    def __init__(self):
        self.__luettelo = Puhelinluettelo()

    def ohje(self):
        print("komennot: ")
        print("0 lopetus")

    def suorita(self):
        self.ohje()
        while True:
            print("")
            komento = input("komento: ")
            if komento == "0":
                break

sovellus = PuhelinluetteloSovellus()
sovellus.suorita()
```

Luokka saattaa vaikuttaa jopa hämmentävältä, konstruktori luo puhelinluettelon, jonka olio pitää sisällään. Metodi `suorita(self)` "käynnistää" sovelluksen tekstikäyttöliittymän, jonka ytimen muodostaa `while`-silmukka, joka kyselee käyttäjältä mikä komento halutaan suorittaa. Ennen toistolauseeseen menemistä ohjelma tulostaa käyttöohjeet, kutsumalla metodia `ohje(self)`.

Laajennetaan käyttöliittymää siten, että luetteloon voidaan lisätä uusia tietoja:

```python
class PuhelinluetteloSovellus:
    def __init__(self):
        self.__luettelo = Puhelinluettelo()

    def ohje(self):
        print("komennot: ")
        print("0 lopetus")
        print("1 lisäys")

    def suorita(self):
        self.ohje()
        while True:
            print("")
            komento = input("komento: ")
            if komento == "0":
                break
            elif komento == "1":
                nimi = input("nimi: ")
                numero = input("numero: ")
                self.__luettelo.lisaa_numero(nimi, numero)

sovellus = PuhelinluetteloSovellus()
sovellus.suorita()
```

Jos valittu komento on tietojen lisäys (eli komento on _1_), kysyy käyttöliittymä nimen ja numeron käyttäjältä, ja lisää tiedot puhelinluetteloon kutsumalla sopivaa luettelon metodia.

Käyttöliittymä on siis ainoastaan vastuussa siitä että se kommunikoi käyttäjän kanssa, puhelinnumeron säilöminen nimen yhteyteen on jätetty täysin _Puhelinluettelo_-olion vastuulle.

Käyttöliittymän rakennetta on mahdollista vielä parannella siten, että tietojen lisäys eriytetään omaan metodiinsa _lisays(self)_:

```python
class PuhelinluetteloSovellus:
    def __init__(self):
        self.__luettelo = Puhelinluettelo()

    def ohje(self):
        print("komennot: ")
        print("0 lopetus")
        print("1 lisäys")

    # eriytetään uusien tietojen lisääminen omaksi metodiksi
    def lisays(self):
        nimi = input("nimi: ")
        numero = input("numero: ")
        self.__luettelo.lisaa_numero(nimi, numero)

    def suorita(self):
        self.ohje()
        while True:
            print("")
            komento = input("komento: ")
            if komento == "0":
                break
            elif komento == "1":
                self.lisays()

sovellus = PuhelinluetteloSovellus()
sovellus.suorita()
```

Erillisen metodin käyttämisen taustallakin on sama _separation of corners_ -periaate. Sen sijaan että koko käyttöliittymän toiminnallisuus sijoitettaisiin ison `while`-silmukan sisälle, tehdään jokaisesta yksittäisestä toimminnosta oma metodinsa. Tämä helpottaa kokonaisuuden hallintaa. Jos halutaan muokata tietojen lisäämisen toiminnallisuutta, tiedetään heti missä päin relevantti koodi sijaitsee.

Lisätään käyttöliittymään toiminnallisuus numeroiden hakemista varten. Sijoitetaan sen hoitava koodi heti omaan metodiinsa:

```python

class PuhelinluetteloSovellus:
    def __init__(self):
        self.__luettelo = Puhelinluettelo()

    def ohje(self):
        print("komennot: ")
        print("0 lopetus")
        print("1 lisäys")
        print("2 haku")

    def lisays(self):
        nimi = input("nimi: ")
        numero = input("numero: ")
        self.__luettelo.lisaa_numero(nimi, numero)

    def haku(self):
        nimi = input("nimi: ")
        numerot = self.__luettelo.hae_numerot(nimi)
        if numerot == None:
            print("numero ei tiedossa")
            return
        for numero in numerot:
            print(numero)

    def suorita(self):
        self.ohje()
        while True:
            print("")
            komento = input("komento: ")
            if komento == "0":
                break
            elif komento == "1":
                self.lisays()
            elif komento == "2":
                self.haku()
            else:
                self.ohje()

sovellus = PuhelinluetteloSovellus()
sovellus.suorita()
```

Sovelluksen perusversio toimii nyt. Seuraavassa esimerkki soveluksen käytöstä:

<sample-output>

komennot:
0 lopetus
1 lisäys
2 haku

komento: **1**
nimi: **Erkki**
numero: **02-123456**

komento: **1**
nimi: **Erkki**
numero: **045-4356713**

komento: **2**
nimi: **Erkki**
02-123456
045-4356713

komento: **2**
nimi: Emilia
numero ei tiedossa

komento: **0**

</sample-output>

Koodia on aika paljon, todennäköisesti enemmän kuin jos kaikki olisi "ohjelmoitu yhteen pötköön". Koodin rakenne on kuitenkin siistihkö, ja koodin laajentamisenkaan ei pitäisi olla kovin hankalaa.

## vaihe 3: tietojen haku tiedostosta

Laajennetaan ohjelmaa siten, että se lataa käynnistäessään puhelinluettelon tiedostosta, joka on seuraavaa muotoa:

```csv
Erkki;02-1234567;045-4356713
Emilia;040-324344
```

Tiedoston käsittely on selkeästi omaa vastuualueensa, eli toteutetaan sitä varten oma luokka:

```python
class Tiedostonkasittelija():
    def __init__(self, tiedosto):
        self.__tiedosto = tiedosto

    def lataa(self):
        nimet = {}
        with open(self.__tiedosto) as f:
            for rivi in f:
                osat = rivi.strip().split(';')
                nimi, *numerot = osat
                nimet[nimi] = numerot

        return nimet
```

Konstruktorin parametrina annetaan tiedoston nimi. Metodi `lataa(self)` lukee tiedoston, ja pilkkoo sen rivit sanakirjaksi, missä avain on nimi ja arvona ovat nimeen liittyvät numerot.

Metodi käyttää erästä Pythonin kätevää ominaisuutta: taulukosta on mahdollista ottaa erilleen yksittäisiä lukuja, sekä "loput" seuraavan kaltaisella sijoituslauseella:

```python
taulukko = [1, 2, 3, 4, 5]
eka, toka, *loput = taulukko
print(eka)
print(toka)
print(loput)
```

<sample-output>

1
2
[3, 4, 5]

</sample-output>

Sijoituslauseen viimeisenn muuttujan nimen edessä on *, ja se tarkoittaa, että viimeiseen muuttujaan kerätään taulukosta loput, eli kolmas ja sitä seuraavat alkiot.

Tiedostonkäsittelijääkin kannattaa ehdottomasti testata, ennen kuin se pultataan muuhun koodiin:

```python
t = Tiedostonkasittelija("luettelo.txt")
print(t.lataa())
```

<sample-output>

{'Erkki': ['02-1234567', '045-4356713'], 'Emilia': ['040-324344']}

</sample-output>

Kun tiedostosta lukemisen todetaan toimivan, liitetään koodi muuhun ohjelmaan. Looginen paikka tiedoston lukemiseen on se hetki kun sovellus käynnistyy, eli luokan _PuhelinluetteloSovellus_ konstruktori:

```python
class PuhelinluetteloSovellus:
    def __init__(self):
        self.__luettelo = Puhelinluettelo()
        self.__tiedosto = Tiedostonkasittelija("luettelo.txt")

        # listään tiedostossa olevat nimet luetteloon
        for nimi, numerot in self.__tiedosto.lataa().items():
            for numero in numerot:
                self.__luettelo.lisaa_numero(nimi, numero)

    # muu koodi
```

Kun tiedoston luku on todettu toimivaksi, voidaan edetä viimeiseen vaiheeseen.

## vaihe 4: tietojen talletus tiedostoon

Viimeistellään ohjelman alustava versio vielä siten, että se tallentaa lopetettaessa puhelinluettelon takaisin tiedostoon.

Tätä varten luokkaa _Puhelinluettelo_ tulee laajentaa siten, että sieltä saadaan tallennusta varten kaikki tiedot ulos:

```python
class Puhelinluettelo:
    def __init__(self):
        self.__henkilot = {}

    # ...

    # palautetaan tiedostoon tallentamista varten kaikki tiedot
    def kaikki_tiedot(self):
        return self.__henkilot
```

Tallennus on luonnollisesti luokan _Tiedostonkasittelija_ vastuulla, eli laajennetaan sitä metodilla _talleta_, joka saa parametriksi puhelinluetteloa edustavan sanakirjan:

```python
class Tiedostonkasittelija():
    def __init__(self, tiedosto):
        self.__tiedosto = tiedosto

    def lataa(self):
        # ...

    def talleta(self, luettelo: dict):
        with open(self.__tiedosto, "w") as f:
            for nimi, numerot in luettelo.items():
                rivi = [nimi] + numerot
                f.write(";".join(rivi) + "\n")
```

Tallennus tapahtuu samalla kun sovelluksen käyttö lopetetaan. Tehdään tätäkin tarkoitusta varten oma metodinsa:

```python

class PuhelinluetteloSovellus:
    # muu koodi

    # metodi, joka suoritetaan lopetettaessa sovelluksen käyttö
    def lopetus(self):
        self.__tiedosto.talleta(self.__luettelo.kaikki_tiedot())

    def suorita(self):
        self.ohje()
        while True:
            print("")
            komento = input("komento: ")
            if komento == "0":

                self.lopetus()
                break
            elif komento == "1":
                self.lisays()
            elif komento == "2":
                self.haku()
            else:
                self.ohje()
```

<programming-exercise name='Puhelinluettelon laajennus, osa 1' tmcname='osa10-10_puhelinluettelo_osa1'>

Tässä tehtävässä tehdään pieni laajennus puhelinluettelosovellukseen. Yllä kehitetty koodi löytyy tehtäväpohjasta. Laajenna ratkaisuasi komennolla, joka mahdollistaa nimen etsimisen numeron perusteella. Laajennuksen jälkeen sovelluksen pitäisi toimia seuraavasti:

<sample-output>

komennot:
0 lopetus
1 lisäys
2 haku
3 haku numeron perusteella

komento: **1**
nimi: **Erkki**
numero: **02-123456**

komento: **1**
nimi: **Erkki**
numero: **045-4356713**

komento: **3**
numero: **02-123456**
Erkki

komento: **3**
numero: **0100100**
tuntematon numero

komento: **0**

</sample-output>

Tee laajennus sitten, että kunnioitat ohjelman rakennetta. Eli lisää luokkaan `PuhelinluetteloSovellus` uutta ominaisuutta varten sopiva apumetodi sekä oma haara while-silmukkaan. Lisää myös sovelluslogiikkaan eli luokkaan `Puhelinluettelo` metodi, joka mahdollistaa nimen hakemisen numeron perusteella.

</programming-exercise>

<programming-exercise name='Puhelinluettelon laajennus, osa 2' tmcname='osa10-11_puhelinluettelo_osa2'>

Tässä tehtävässä laajennetaan puhelinluettelosovellusta siten, että henkilöihin voi liittyä myös osoite. Yksinkertaisuuden vuoksi koodista on kuitenkin poistettu tiedostoon tallentaminen, myös muutama metodi on uudelleennimetty vastaamaan  paremmin laajennuksen jälkeistä tilannetta.

## Luokka henkilön tietojen esittämiseen

Siirretään henkilön tietojen, eli puhelinnumerojen sekä osoitteen esittäminen oman luokkansa `Henkilo` vastuulle. Toteuta siis luokka siten, että se toimii seuraavasti:

```python
henkilo = Henkilo("Erkki")
print(henkilo.nimi())
print(henkilo.numerot())
print(henkilo.osoite())
henkilo.lisaa_numero("040-123456")
henkilo.lisaa_osoite("Mannerheimintie 10 Helsinki")
print(henkilo.numerot())
print(henkilo.osoite())
```

<sample-output>

Erkki
[]
None
['040-123456']
Mannerheimintie 10 Helsinki

</sample-output>

## Puhelinluettelo käyttämään luokkaa Henkilo

Muuta koodiasi siten, että se toimii käyttäjän näkökulmasta täysin samoin kuin aiemmin, mutta luokka `Puhelinluettelo` tallettaakin henkilöt sisäisesti käyttäen luokan `Henkilo` olioita, käytännössä siis oliomuuttujna `__henkilot` tulee olla sanakirja, jolle listojen sijaan talletetaan henkilö-olioita.

**VAROITUS:** kun teet koodiin tämän tehtävän kaltaista rakenteellisa muutosta, etene pienin askelin. Älä missään tapauksessa yritä tehdä kaikkea kerrallaan, se on **varma keino ajautua pahoihin ongelmiin**.

Sopiva pieni askel nyt voi olla se että tarkastat ensin erikseen että luokka  `Puhelinluettelo` alkaa toimia, eli esim seuraava koodi toimii kuten olettaa saattaa:

```python
luettelo = Puhelinluettelo()
luettelo.lisaa_numero("Erkki", "02-123456")
print(luettelo.tiedot("Erkki"))
print(luettelo.tiedot("Emilia"))
```

Kun olet 100% varma, että kaikki toimii luokan `Puhelinluettelo` osalta, voit edetä varmistamaan että kaikki toimii edelleen entiseen tapaan käyttöliittymää käytettäessä.

## Osoitteen lisääminen

Laajenna nyt sovellusta siten, että puhelinluetteloon on mahollista tallettaa myös henkiliden osoitteet. Ohjelman tulisi toimia seuraavasti:

<sample-output>

komennot:
0 lopetus
1 nimen lisäys
2 haku
3 osoitteen lisäys

komento: **1**
nimi: **Erkki**
numero: **02-123456**

komento: **3**
nimi: **Emilia**
osoite: **Viherlaaksontie 7, Espoo**

komento: **2**
nimi: **Erkki**
02-123456
osoite ei tiedossa

komento: **2**
nimi: **Emilia**
numero ei tiedossa
Viherlaaksontie 7, Espoo

komento: **3**
nimi: **Erkki**
osoite: **Linnankatu 75, Turku**

komento: 2
nimi: **Erkki**
02-123456
Linnankatu 75, Turku

komento: **0**

</sample-output>

**VAROITUS ja vihje:** kuten tehtävän edellisessä osassa sanottiin, älä missään tapauksessa yritä tehdä kaikkea kerrallaan, se on **varma keino ajautua pahoihin ongelmiin**.

Varmista ensin että voit lisätä osoitteita luokkaan `Puhelinluettelo` ja kun olet 100% varma, että se toimii, voit laajentaa sovelluksen käyttöliittymän uuden toiminnallisuuden osalta.

</programming-exercise>

## Erinäisiä huomioita

Puhelinluetteloesimerkki noudattaa rakenteeltaan melko klassisia hyvän olio-ohjelmoinnin periaatteita. Kantavana ideana on siis ohjelman vastuualueiden erottelu eri luokkien ja metodien vastuulle. Eräs suurimmista motiiveista tällaiselle jaoittelulle on kompleksisuuden hallinta. Toinen tärkeä syy on se, että oikein tehty koodin jaoittelu tai _modularisointi_ kuten ammattijargon asian ilmaisee tekee koodista potentiaalisesti helpomman ylläpitää ja laajentaa.

Oikeissa ohjelmistoissa ylivoimaisesti suurimman kustannuserän aiheuttaa juuri ylläpito (eli bugien korjailu) sekä ohjelman laajentaminen, joten tällä seikalla on taloudellisesti erittäin suuri merkitys.

Nostetaan esimerkistä esiin vielä pari tärkeää seikkaa. Koodi ilmentää hyvin sitä, miten sovelluslogiikan varsinainen ydin on eriytetty sekä käyttöliittymästä, että datan tallettamisesta. Tämä on tärkeää muutamastakin syystä. Ensinnäkin se mahdollistaa koodin testailun pienemmissä yksiköissä ja toisaalta koska sovelluslogiikka ei nyt riipu käyttöliittymästä tai tiedon talletustavasta, on esim .käyttöliittymää mahdollista muuttaa (ainakin johonkin pisteeseen asti) rikkomatta muuta sovellusta.

Tiedostojen käsittelyn suhteen kannattaa myös huomata se, että ohjelma lukee tiedostoa ainoastan kerran, käynnistysvaiheessa, ja tämän jälkeen kaikki tieto pidetään ohjelman muuttujissa. Ohjelma tallettaa tiedot kokonaisuudessaan, ja käytännössä uudelleenkirjoittaa tiedoston joka kerta kokonaan uudestaan. Tiedostojen käsittely kannattaa lähes kaikissa tapauksissa tehdä näin.

Lisää hyvän koodin kirjoittamiseta löytyy esimerkiksi Robert Martinin mainiossa kirjassa [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882). Kirjan koodiesimerkit ovat valitettavasti Javaa. Paneudumme ylläpidettävyydeltään ja laajennettavuudeltaan laadukkaan koodin kysymykseen tarkemmin kursseilla [Ohjelmistotekniikka](https://studies.helsinki.fi/opintotarjonta/cu/hy-CU-118024742-2020-08-01) ja [Ohjelmistotuotanto](https://studies.helsinki.fi/opintotarjonta/cu/hy-CU-118024909-2020-08-01).

Hyvän olio-ohjelmoinnin periaatteiden mukaisen koodin kirjoittamisella on myös hintansa. Koodia tulee todennäköisesti enemmän kuin jos sama ongelma ratkaistaisiin yhteen pötköön kirjoitetulla spagettikoodilla. Ohjelmoijan onkin aina ratkaistava se, minkälainen lähestymistapa on paras kuhunkin tilanteeseen. Joskus voi olla vain parasta häkkeröidä kasaan nopeasti jotain joka toimii nyt. Jos taas on odotettavissa että samaa koodia tullaan jatkossa laajentamaan joko koodarin itsensä tai jonkun muun toimesta, on todennäköisesti kannattavaa investoida koodin luettavuuteen ja strukturointiin jossain määrin jo alkuvaiheissa.

<programming-exercise name='Opintorekisteri' tmcname='osa10_'>

Tee interaktiivinen ohjelma, jonka avulla voit pitää kirjaa opintomenestyksestäsi. Tyyli on vapaa, mutta nyt on hyvä tilaisuus harjoitella osan esimerkin kaltaisen oliorakenteen muodostamista.

Ohjelma toimii seuraavasti:

<sample-output>

1 lisää suoritus
2 hae suoritus
3 tilastot
0 lopetus

komento: **1**
kurssi: **Ohpe**
arvosana: **3**
opintopisteet: **5**

komento: **2**
kurssi: **Ohpe**
Ohpe (5 op) arvosana 3

komento: **1**
kurssi: **Ohpe**
arvosana: **5**
opintopisteet: **5**

komento: **2**
kurssi: **Ohpe**
Ohpe (5 op) arvosana 5

komento: **1**
kurssi: **Ohpe**
arvosana: **1**
opintopisteet: **5**

komento: **2**
kurssi: **Ohpe**
Ohpe (5 op) arvosana 5

komento: **1**
kurssi: **Tira**
arvosana: **1**
opintopisteet: **10**

komento: **1**
kurssi: **Tilpe**
arvosana: **2**
opintopisteet: **5**

komento: **1**
kurssi: **Lapio**
arvosana: **4**
opintopisteet: **1**

komento: **1**
kurssi: **Lama**
arvosana: **5**
opintopisteet: **8**

komento: **3**
suorituksia 5 kurssilta, yhteensä 29 opintopistettä
keskiarvo 3.4
arvosanajakauma
5: xx
4: x
3:
2: x
1: x

komento: **3**

</sample-output>

Muutama huomio: kultakin kursilta tallentuu ainoastaan yksi arvosana. Arvosanaa voi korottaa, mutta se ei voi laskea.

Tehtävästä on tarjolla kaksi tehtäväpistettä. Ensimmäisen pisteen saa jos toiminnot 1 ja 2 sekä lopetus toimivat. Toisen pisteen saa jos myös toiminto 3 on toteutettu.

</programming-exercise>
