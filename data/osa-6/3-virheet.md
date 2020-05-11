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

Ensimmäiseen luokkaan kuuluvat virheet on yleensä kaikkein helpoin korjata, koska Python-tulkki huomauttaa niistä, kun ohjelmaa yritetään suorittaa. Tyypillisiä esimerkkejä tällaisista virheistä ovat esimerkiksi puuttuvat sulut tai väärinkirjoitetut muuttujien ja funktioiden nimet. Hyvän editorin käyttö ohjelman kirjoittamisessa auttaa välttämään tällaisia virheitä jo ohjelman kirjoitusvaiheessa.

Toiseen luokkaan kuuluvat virheet voivat olla huomattavasti hankalampia. On esimerkiksi tyypillistä, että ohjelma toimii oikein tietyissä tapauksissa, mutta voi keskeytyä virheeseen kesken suorituksen tai tuottaa virheellisen lopputuloksen jossain tapauksessa.

## Syötteiden tarkastaminen

Usein virhetilanteet ohjelmien suorituksen aikana liittyvät jotenkin virheelliseen syötteeseen. Esimerkkejä virheellisistä syötteistä ovat vaikkapa

* puuttuvat tai tyhjät arvot - esimerkiksi pituus nolla tai tyhjä merkkijono nimenä
* negatiiviset arvot - esimerkiksi -15 henkilön painona
* puuttuva tai väärän niminen tiedosto
* liian pienet tai liian suuret arvot
* väärä indeksi (esim. viittaaminen indeksiin 3 merkkijonossa "moi")
* väärän tyyppiset arvot, esimerkiksi merkkijono luvun sijasta

Useimpiin virheistä voidaan onneksi varautua ohjelmallisesti. Tarkastellaan esimerkkinä ohjelmaa, joka lukee käyttäjältä syötteenä tämän iän ja testaa, että se on sallituissa rajoissa (vähintään 0 ja korkeintaan 150):

```python
ika = int(input("Anna ikäsi: "))
if ika >= 0 and ika <= 150:
    print("Ikä kelpaa")
else:
    print("Virheellinen ikä")
```

<sample-output>

Anna ikäsi: **25**
Ikä kelpaa

</sample-output>

<sample-output>

Anna ikäsi: **-3**
Virheellinen ikä

</sample-output>

Syötteen tarkastamisessa (eli _validoinnissa_) ilmenee kuitenkin puutteita, jos syötteeksi annetaan esimerkiksi merkkijono:

<sample-output>

Anna ikäsi: **kakskytkolme**
ValueError: invalid literal for int() with base 10: 'kakskytkolme'

</sample-output>

Virhe johtuu siitä, että käyttäjän antamaa merkkijonoa ei voida muuttaa kokonaisluvuksi. Yksi ratkaisu olisi tarkastaa ennen muuttamista, että jokainen merkki on numero tai alussa oleva `-`. Ongelmaan löytyy kuitenkin yleisempikin ratkaisu.

## Poikkeukset

Suorituksenaikaisia virheitä kutsutaan _poikkeuksiksi_ (exception). Ohjelmakoodissa on mahdollista varautua poikkeuksiin ja käsitellä ne ilman, että ohjelman suoritus keskeytyy.

Pythonissa poikkeukset käsitellän `try`- ja `except`-lauseilla. Ideana on, että mikäli `try`-lohkossa tapahtuu jokin poikkeus, Python tarkistaa, onko tälle poikkeukselle määritelty `except`-lohkoa. Mikäli on, suoritetaan tämä lohko ja suoritus jatkuu sen jälkeen normaalisti.

Muutetaan edellä esitettyä esimerkkiä siten, että ohjelma varautuu poikkeukseen `ValueError`:

```python
try:
    ika = int(input("Anna ikäsi: "))
except ValueError:
    ika = -1

if ika >= 0 and ika <= 150:
    print("Ikä kelpaa")
else:
    print("Virheellinen ikä")
```

<sample-output>

Anna ikäsi: **kakskytkolme**
Virheellinen ikä

</sample-output>

Ohjelmassa voidaan siis `try`-lauseella ilmoittaa, että seuraavan lohkon sisällä tapahtuva toiminta voi aiheuttaa virheen. Välittömästi `try`-lohkoa seuraavassa `except`-lauseessa ilmoitetaan, mihin virheeseen varaudutaan. Edellisessä esimerkissä varauduttiin ainoastaan virheeseen `ValueError` - jokin muu virhe olisi edelleen katkaissut ohjelman suorituksen.

Tässä tapauksessa virhetilanteessa muuttuja `ika` saa arvon -1, jolloin ohjelma tunnistaa oikein, että ikä on virheellinen.

`try`- ja `while`-lauseita hyväksikäyttäen on helppo tehdä funktio, joka varmistaa, että ohjelma ei etene ennen kun käyttäjä on antanut sille oikeassa muodossa olevan syötteen.

```python
def lue_syote():
  while True:
    try:
      syote = input("syötä kokonaisluku: ")
      return int(syote)
    except ValueError:
      print("annoit epäkelvon luvun...")

# kokeillaan funktiota
luku = lue_syote()
print(f"luku {luku} potenssiin kolme on {luku*luku*luku}")
```

<sample-output>

syötä kokonaisluku: kolme
annoit epäkelvon luvun...
syötä kokonaisluku: viisi
annoit epäkelvon luvun...
syötä kokonaisluku: 5
luku 5 potenssiin kolme on 125


</sample-output>

## Tyypillisiä virheitä

Seuraavassa on listattu eräitä yleisimpiä virheitä ja tyypillisiä syitä niiden ilmenemiselle:

**ValueError**

`ValueError` johtuu yleensä siitä, että funktion parametrin sisältö on funktion kannalta vääränlainen. Esimerkiksi kutsu `float("1,23")` johtaa tällaisen poikkeuksen heittämiseen, koska Python ei osaa muuttaa merkkijonoa "1,23" liukuluvuksi, koska desimaalierotin on pilkku eikä piste.

**TypeError**

`TypeError` tapahtuu, kun arvo on väärän tyyppinen. Esimerkiksi funktiokutsu `len(10)` saa aikaan tämän poikkeuksen, koska funktio `len` haluaa parametrin, jolle voidaan laskea pituus (kuten merkkijonon tai listan).

**IndexError**

Tämä poikkeus tapahtuu, jos yritetään viitata indeksiin, jota ei ole olemassa. Esimerkiksi `"abc"[5]` aiheuttaa tämän poikkeuksen, koska merkkijonossa ei ole indeksiä 5.

**ZeroDivisionError**

Tämä poikkeus tapahtuu, jos yritetään jakaa nollalla. Tyypillinen esimerkki on vaikkapa tilanne, jossa yritetään laskea listan arvojen keskiarvo kaavalla `sum(lista) / len(lista)`, mutta listan pituus on nolla.

**Muita poikkeuksia**

Lisäksi tiedostojen käsittelyssä voi tyypillisesti tulla vastaan esimerkiksi poikkeukset **FileNotFoundException** (koetetaan lukea tiedostoa, jota ei ole olemassa), **io.UnsupportedException** (tiedosto on avattu kirjoitustilassa, ja yritetään lukea sen sisältöä) tai **PermissionError** (ohjelmalla ei ole lupaa käsitellä tiedostoa).

## Useamman poikkeuksen käsittely

Yhtä `try`-lohkoa kohti voi olla useampia `except`-lauseita. Esimerkiksi seuraavassa ohjelmassa varaudutaan sekä poikkeukseen `FileNotFoundException` että `PermissionError`:

```python
try:
    with open("esimerkki.txt") as tiedosto:
        for rivi in tiedosto:
            print(rivi)
except FileNotFoundError:
    print("Tiedostoa esimerkki.txt ei löytynyt")
except PermissionError:
    print("Ei oikeutta avata tiedostoa esimerkki.txt")
```

Aina ei ole tarpeen eritellä tapahtuneita virheitä. Esimerkiksi juuri tiedostoa avatessa saattaa riittää, että tiedetään virheen tapahtuneen, muttei ole niin tärkeää tietää, miksi virhe tapahtui. Kaikki mahdolliset virheet voi käsitellä käyttämällä `except`-lausetta määrittelemättä poikkeuksen tyyppiä:

```python

try:
    with open("esimerkki.txt") as tiedosto:
        for rivi in tiedosto:
            print(rivi)
except:
    print("Tapahtui virhe tiedoston lukemisessa")

```

Huomaa, että tällaisessa tapauksessa `except`-lause käsittelee kaikki mahdolliset virheet - myös ohjelmoijan tekemät virheet (lukuun ottamatta syntaksivirheitä, jotka estävät ohjelman suorittamisen).

Esimerkiksi seuraava ohjelma heittää aina poikkeuksen, koska muuttujan `tiedosto` nimi on kirjoitettu toisessa kohdassa väärin `tiedotso`.

```python
try:
    with open("esimerkki.txt") as tiedosto:
        for rivi in tiedotso:
            print(rivi)
except:
    print("Tapahtui virhe tiedoston lukemisessa.")
```

Tästä näkee, että `except` voi peittää varsinaisen virheen - tässä tapauksessa virheen syynä ei ole tiedoston käsittely vaan väärin kirjoitettu muuttuja.

## Poikkeuksen välittäminen

Jos funktion tapahtuu poikkeus, jota ei käsitellä, poikkeus välitetään funktion kutsujalle. Tätä jatketaan, kunnes ollaan pääohjelman tasolla. Jos poikkeusta ei tässäkään käsitellä sopivalla `except`-lauseella, ohjelman suoritus katkeaa ja poikkeus (yleensä) tulostetaan ruudulle.

Esimerkiksi seuraavassa ohjelmassa funktiossa `testi` tapahtuva poikkeus käsitellään vasta pääohjelmassa:

```python
def testi(x):
    print(int(x)+1)

try:
    luku = input("Anna luku: ")
    testi(luku)
except:
    print("Jotain meni pieleen.")
```

<sample-output>

Anna luku: **kolme**
Jotain meni pieleen.

</sample-output>


## Poikkeusten tuottaminen

Voimme myös tarvittaessa tuottaa poikkeuksen itse komennolla `raise`. Vaikka virheiden tuottaminen varta vasten voi aluksi tuntua oudolta ajatukselta, mekanismi on itse asiassa hyvinkin hyödyllinen.

Esimerkiksi jos teemme funktion, jolle annetaan virheellinen parametri, voimme ilmaista tämän poikkeuksen avulla. Tämä voi olla parempi tapa kuin esimerkiksi palauttaa jokin virhearvo tai tulostaa viesti ruudulle, koska funktion käyttäjä ei välttämättä huomaisi asiaa.

Seuraavassa esimerkissä funktio `kertoma` laskee parametrina annetun luvun kertoman (esimerkiksi luvun 5 kertoma on 1*2*3*4*5). Kuitenkin jos annettu luku on negatiivinen, funktio tuottaa poikkeuksen.

```python
def kertoma(n):
    if n < 0:
        raise ValueError("Negatiivinen syöte: " + str(n))
    k = 1
    for i in range(2,n+1):
        k *= i
    return k

print(kertoma(3))
print(kertoma(6))
print(kertoma(-1))
```

<sample-output>

6
720
Traceback (most recent call last):
  File "tiedosto.py", line 11, in <module>
    print(kertoma(-1))
  File "tiedosto.py", line 3, in kertoma
    raise ValueError("Negatiivinen syöte: " + str(n))
ValueError: Negatiivinen syöte: -1


</sample-output>
