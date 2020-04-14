---
path: '/osa-6/3-virheet'
title: 'Virhetilanteisiin varautuminen'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Virhetilanteet ohjelmissa niin kirjoitus- kuin suoritusvaiheessa ovat yleisiä. Joihinkin virhetilanteisiin voi kuitenkin varautua etukäteen. Tutustutaan seuraavaksi tyypillisiin virhetilanteisiin sekä poikkeuksiin ja niiden kiinniottamiseen.

Tämän osion suoritettuasi

- Tiedät tapoja ohjelman toiminnan testaamiseen
- Tiedät, miten virheellisiä syötteitä voidaan käsitellä
- Tiedät, mitä tarkoitetaan _poikkeuksella_ ohjelmoinnissa
- Tunnistat tyypillisiä poikkeuksia Pythonissa
- Osaat ottaa erityyppiset poikkeukset kiinni omissa ohjelmissa
- Osaat heittää poikkeuksen omasta funktiosta

</text-box>

Ohjelmointiin liittyvät virheet voidaan jakaa karkeasti kolmeen osaan:

1. Syntaksivirheet - virheet, jotka estävät ohjelman suorittamisen kokonaan
2. Suorituksenaikaiset virhet - virheet, jotka joko katkaisevat ohjelman suorituksen kesken suorituksen tai tuottavat virheellisen lopputuloksen
3. Ohjelmoijasta riippumattomat virheet - esimerkiksi vääränlainen syöte, puuttuva verkkoyhteys tai kadonnut tiedosto

Ensimmäiseen luokkaan kuuluvat virheet on yleensä kaikkein helpoin korjata, koska Python-tulkki huomauttaa niistä kun ohjelmaa yritetään suorittaa. Tyypillisiä esimerkkejä tällaisista virheistä ovat esimerkiksi puuttuvat sulut tai väärinkirjoitetut muuttujien ja funktioiden nimet. Hyvän editorin käyttö ohjelman kirjoittamisessa auttaa välttämään tällaisia virheitä jo ohjelman kirjoitusvaiheessa.

Toiseen luokkaan kuuluvat virheet voivat olla huomattavasti hankalampia. On esimerkiksi tyypillistä, että ohjelma toimii oikein tietyilä syötteillä, mutta voi kaatua kesken suorituksen tai tuottaa virheellisen lopputuloksen joillain toisilla syötteillä.

Tämän takia ohjelma tulisi aina testata mahdollisimman kattavasti. Testaaminen voidaan tehdä kirjoittamalla testit ohjelmaan (ns. _yksikkötestaus_), menetelmää ei kuitenkaan käsitellä tällä kurssilla. Usein omille ohjelmille riittää testaaminen mahdollisimman monella erilaisella syötteellä ja erityisesti poikkeaviin syötteisiin varautuminen.

## Syötteiden tarkastaminen

Usein virhetilanteet ohjelmien suorituksen aikana liittyvät jotenkin virheelliseen syötteeseen. Esimerkkejä virheellisistä syötteistä ovat vaikkapa

* puuttuvat tai tyhjät arvot - esimerkiksi pituus nolla tai tyhjä merkkijono nimenä
* negatiiviset arvot - esimerkiksi -15 henkilön painona
* puuttuva tai vääränniminen tiedosto
* liian pienet tai liian suuret arvot
* indeksien ylivuodot (esim. viittaaminen indeksiin 3 merkkijonossa "moi")
* väärän tyyppiset arvot, esimerkiksi merkkijono luvun sijasta

Useimpiin virheistä voidaan onneksi varautua ohjelmallisesti. Tarkastellaan esimerkkinä ohjelmaa, joka lukee käyttäjältä syötteenä tämän iän ja testaa, että se on sallituissa rajoissa:

```python

# Alkuarvoksi -1, jotta silmukka suoritetaan vähintään kerran
ikä = -1

# Kysellään, kunnes ok
while ikä < 0 or ikä > 150:
    # luetaan syöte
    ikä = int(input("Anna ikäsi: "))


print("Ohjelman suoritus jatkuu...")

```

<sample-output>

Anna ikäsi: **-9**
Anna ikäsi: **160**
Anna ikäsi: **23**
Ohjelman suoritus jatkuu...

</sample-output>

Syötteen tarkastamisessa (eli _validoinnissa_) ilmenee kuitenkin puutteita, jos syötteeksi annetaan esimerkiksi merkkijono:

<sample-output>

Anna ikäsi: **kakskytkolme**
ValueError: invalid literal for int() with base 10: 'kakskytkolme'

</sample-output>

Olisi toki mahdollista käydä syöte merkki kerrallaan läpi ja tarkistaa, että siinä esiintyy ainoastaan sallittuja merkkejä. Ongelmaan löytyy kuitenkin yleisempikin ratkaisu.

## Poikkeukset

Suorituksenaikaisia virheitä kutsutaan _poikkeuksiksi_ (exception). Ohjelmakoodissa on mahdollista varautua poikkeuksiin ja käsitellä ne ilman, että ohjelman suoritus keskeytyy.

Pythonissa poikkeukset käsitellän `try`- ja `except`-lauseilla. Ideana on, että mikäli `try`-lohkossa _heitetään jokin poikkeus_, Python tarkistaa onko tälle poikkeukselle määritelty `except`-lohkoa. Mikäli on, suoritetaan tämä lohko ja suoritus jatkuu sen jälkeen normaalisti.

Muutetaan edellä esitettyä esimerkkiä siten, että ohjelma varatutuu poikkeukseen `ValueError`:

```python

# Alkuarvoksi -1, jotta silmukka suoritetaan vähintään kerran
ikä = -1

# Kysellään, kunnes ok
while ikä < 0 or ikä > 150:
    # luetaan syöte, varaudutaan virheeseen
    try:
        ikä = int(input("Anna ikäsi: "))
    except ValueError as virhe:
        print("Virheellinen syöte - anna luku!")


print("Ohjelman suoritus jatkuu...")

```

<sample-output>

Anna ikäsi: **kakskytkolme**
Virheellinen syöte - anna luku!
Anna ikäsi: **23**
Ohjelman suoritus jatkuu...

</sample-output>

Ohjelmassa voidaan siis `try`-lauseella ilmoittaa, että seuraavan lohkon sisällä tapahtuva toiminta voi aiheuttaa virheen. Välittömästi `try`-lohkoa seuraavassa `except`-lauseessa ilmoitetaaan _mihin virheeseen varaudutaan_. Edellisessä esimerkissä varauduttiin ainoastaan virheeseen `ValueError` - joku muu virhe olisi edelleen katkaissut ohjelman suorituksen.

## Tyypillisiä virheitä

Seuraavassa on listattu eräitä yleisimpiä virheitä ja tyypillisiä syitä niiden ilmenemiselle:

**ValueError**

`ValueError` johtuu yleensä siitä, että funktion parametrin sisältö on funktion kannalta vääränlainen. Esimerkiksi kutsu `float("1,23")` johtaa tällaisen poikkeuksen heittämiseen, koska Python ei osaa parsia merkkijooa "1.23" liukuluvuksi johtuen väärästä desimaalierottimesta.

**TypeError**

`TypeError` heitetään, kun arvo on väärän tyyppinen. Esimerkiksi funktiokutsu `len(10)` johtaa tämän poikkeuksen heittämiseen, koska funktio `len` haluaa parametrikseen joko sekvenssin (eli merkkijonon tai listan) tai jonkin muun tietorakenteen.

**IndexError**

Heitetään jos yritetään viitata indeksiin, jota ei ole olemassa. Huomaa, että alijono- ja alilistaoperaatiot hyväksyvät myös indeksit, joita ei ole olemassa rakenteessa. Esimerkiksi `"abc"[0:5] == "abc"`.

**ZeroDivisionError**

Heitetään, jos yritetään jakaa nollalla. Tyypillinen esimerkki on vaikkapa tilanne, jossa yritetään laskea listan l keskiarvo `sum(l) / len(l)`, mutta listan pituus on nolla.

Lisäksi tiedostojen käsittelyssä voi tyypillisesti tulla vastaan esimerkiksi poikkeukset **FileNotFoundException** (mikäli tiedostoa ei löydy), **io.UnsupportedException** (mikäli tiedosto on avattu kirjoitusmoodissa, ja yritetään lukea sen sisältöä) tai **PermissionError** mikäli ohjelmalla ei ole lupaa käsitellä tiedostoa.

## Useammantyyppisen poikkeuksen kiinniottaminen

Yhtä `try`-lohkoa kohti voi olla useampia `except`-lauseita. Esimerkiksi seuraavassa ohjelmassa varaudutaan sekä virheeseen `FileNotFoundException` että `PermissionError`:

```python

# Yritetään avata tiedosto ja lukea sieltä rivit
try:
    with open("esimerkki.txt") as tiedosto:
        for rivi in tiedosto:
            print(rivi)
except FileNotFoundError as virhe1:
    print("Tiedostoa esimerkki.txt ei löytynyt.")
except PermissionError as virhe2:
    print("Ei oikeutta avata tiedostoa esimerkki.txt")

```

Poikkeuksen perään kirjoitettava `as <muuttuja>` sijoittaa heitetyn _poikkeusolion_ annettuun muuttujaan. Tämän muuttujan avulla voidaan hakea lisätietoa tapahtuneesta virheestä.

Aina ei ole tarpeen eritellä tapahtuneita virheitä. Esimerkiksi juuri tiedostoa avatessa saattaa riittää, että tiedetään virheen tapahtuneen, muttei ole niin tärkeää tietää _miksi virhe tapahtui_. Kaikki mahdolliset virheet voi ottaa kiinni käyttämällä `except`-lausetta ilman että määritellään jokin tietty poikkeus:

```python

# Yritetään avata tiedosto ja lukea sieltä rivit
try:
    with open("esimerkki.txt") as tiedosto:
        for rivi in tiedosto:
            print(rivi)
# Otetaan kiinni kaikki mahdolliset poikkeukset
except:
    print("Tapahtui virhe tiedoston lukemisessa.")

```

Huomaa, että tällaisessa tapauksessa `except`-lause ottaa kiini kaikki mahdolliset virheet - myös ohjelmoijan tekemät virheet (lukuunottamatta syntaksivirheitä, jotka estävät ohjelman suorittamisen).

Esimerkiksi seuraava ohjelma heittää aina poikkeuksen, koska tiedostomuotoa "s" ei ole olemassa:

```python

# Yritetään avata tiedosto ja lukea sieltä rivit
try:
    with open("esimerkki.txt", "s") as tiedosto:
        for rivi in tiedosto:
            print(rivi)
# Otetaan kiinni kaikki mahdolliset poikkeukset
except:
    print("Tapahtui virhe tiedoston lukemisessa.")

```

## Virheiden välittäminen ylöspäin

Jos funktion koodissa tapahtuu poikkeus, jota ei oteta kiinni, poikkeus välitetään funktion kutsujalle. Tätä jatketaan, kunnes ollaan pääohjelman tasolla. Jos poikkeusta ei tässäkään oteta kiinni sopivalla `except`-lauseella, ohjelman suoritus katkeaa ja poikkeus (yleensä) tulostetaan ruudulle.

Esimerkiksi seuraavassa ohjelmassa funktiossa tulosta_neliö tapahtuva poikkeus otetaan kiinni vasta pääohjelmassa:

```python

def tulosta_neliö(luku: str):
    # Parsitaan luku ja tulostetaan neliö
    print(int(luku) ** 2)


try:
    syöte = input("Anna luku: ")
    tulosta_neliö(syöte)
except:
    print("Jotain meni pieleen.")

```

<sample-output>

Anna luku: kolme
Jotain meni pieleen.

</sample-output>


## Poikkeusten heittäminen

Poikkeuksia voidaan myös tuottaa itse ohjelmallisesti. Vaikka virheiden tuottaminen varta vasten voi aluksi tuntua oudolta ajatukselta, mekanismi on itse asiassa hyvinkin hyödyllinen. Poikkeuksen heittämiseen käytetään avainsanaa `raise` syntaksilla

```python

raise <poikkeus>

```

Tarkastellaan esimerkkinä funktiota, joka laskee kertoman. Koska negatiivisten lukujen kertomaa ei ole määritelty, funktion pitää jotenkin reagoida tällaiseen tapaukseen. Yksi mahdollisuus olisi palautta jokin "tyhjä" arvo (esimerkiksi -1), mutta tässä on vaarana, ettei kutsuja huomaa lopputuloksen virheellisyyttä. Tämä saattaa aiheuttaa ongelmia myöhemmin ohjelmassa.

Myöskään virheviestin tulostaminen ruudulle ei ole riittävän varma keino virheestä huomauttamiseen - tulostuskonsolia ei aina ole näkyvissä (eikä suoritusympäristöstä riippuen välttämättä edes olemassa).

Paras tapa kertoa funktion virheellisestä syötteestä onkin usein virheilmoitus: näin ohjelmoijan on helppo korjata kutsuva koodi toimimaan oikein.

```python

# Funktio palauttaa luvun n kertoman n!
def kertoma(n: int) -> int:
    # Jos n on negatiivinen
    if n < 0:
        # heitä poikkeus
        raise ValueError("Negatiivinen syöte: " + str(n))

    # Laske kertoma
    k = 1

    for i in range(2, n + 1):
        k = k * i

    return k


# Testataan eri syötteillä
print(kertoma(3))
print(kertoma(6))
print(kertoma(-1))

```

<sample-output>

6
720
Traceback (most recent call last):
  File "kertoma.py", line 20, in <module>
    print(kertoma(-1))
  File "kertoma.py", line 6, in kertoma
    raise ValueError("Negatiivinen syöte: " + str(n))
ValueError: Negatiivinen syöte: -1

</sample-output>
