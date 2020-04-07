---
path: '/osa-6/4-paikalliset-muuttujat'
title: 'Paikalliset ja globaalit muuttujat'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Ohjelman rakenteen selkeyttämiseksi on hyvä, että osa tiedoista on vain tiettyjen funktioiden käsiteltävissä. Kuudennen luvun viimeisessä osassa tarkastellaan muuttujien näkyvyyttä.

Tämän osan suoritettuasi

- Tiedät mitä tarkoitetaan paikallisella muuttujalla
- Tiedät, miten muuttujan näkyvyysalue vaikuttaa sen käyttöön
- Tiedät, mitä Pythonissa tekee avainsana `global`
- Osaat käyttää paikallisia ja globaaleja muuttujia oikein

</text-box>

Ohjelmoinnissa käytetään käsitteitä _paikallinen muuttuja_ ja _globaali muuttuja_. Yleisesti paikallisella muuttujalla tarkoitetaan muuttujaa, joka on näkyvissä vain tietyn rajatun alueen sisällä ohjelmassa. Vastaavasti globaali muuttuja on käytettävissä missä tahansa ohjelman osassa.

## Funktioiden paikalliset muuttujat

Pythonissa oletuksena kaikki funktioiden sisällä määritellyt muuttujat ovat näiden funktioiden _paikallisia muuttujia. Tämä koskee sekä parametrimuuttujia että funktion lohkon sisällä määriteltyjä muuttujia. Paikallinen muuttuja tarkoittaa, että muuttuja _ei ole olemassa funktion ulkopuolella_.

Esimerkiksi seuraavassa ohjelmassa yritys viitata muuttujaan `nimi` pääohjelmassa antaa virheen:

```python

def huuda(nimi : str):
    nimi = nimi.upper()
    nimi = nimi + "!"
    print(nimi)


huuda("Pekka Pythonen")
print("Nyt nimi-muuttujan arvo on " + nimi)

```

<sample-output>

NameError: name 'nimi' is not defined

</sample-output>

Ohjelmassa muuttuja `nimi` on siis olemassa vain funktion `huuda` suorituksen ajan. Kun funktio on suoritettu, Python poistaa muuttujan arvoineen muistista (tai merkitsee sen käyttämättömäksi, jolloin erillinen _roskienkeruu_ osaa poistaa sen sopivassa välissä).

Huomaa, että pääohjelmalla ja funktiolla voi kyllä olla _samannimisiä muuttujia_. Tässäkään tapauksessa ne eivät kuitenkaan ole sama muuttuja:

```python

# Funktiolla huuda on parametrimuuttuja nimi
def huuda(nimi : str):
    nimi = nimi.upper()
    nimi = nimi + "!"
    print(nimi)


# Pääohjelmassa on samaniminen muuttuja. Vaikka muuttuja on
# samantyyppinen ja sillä on hetken aikaa sama arvo,
# kyseessä on kuitenkin eri muuttuja
nimi = "Pekka Pythonen"
huuda(nimi)
print("Pääohjelmassa nimi-muuttujan arvo on " + nimi)

```

<sample-output>

PEKKA PYTHONEN!
Pääohjelmassa nimi-muuttujan arvo on Pekka Pythonen

</sample-output>

## Globaalit muuttujat

_Pääohjelmassa_, eli kaikkien funktioiden ulkopuolella määritetyt muuttujat ovat "puoliksi" globaaleita muuttujia Pythonissa. Puoliksi tarkoittaa tässä yhteydessä sitä, että aliohjelmissa voidaan lukea pääohjelman muuttujien arvoja, mutta niiden arvoja ei voida muuttaa.

Esimerkiksi seuraava toimii:

```python

# Muuttujaa nimi ei ole määritelty funktiossa
def toista_nimi():
    print(nimi)


# Pääohjelmassa määritellyn muuttujan arvo
# näkyy myös ohjelmassa määritellyille funktioille
nimi = "Pirjo Pythonen"
toista_nimi()

```

<sample-output>

Pirjo Pythonen

</sample-output>


Arvoa ei kuitenkaan voi muuttaa, seuraava yritys antaa virheviestin:

```python

# Muuttujaa nimi ei ole määritelty funktiossa
def toista_nimi():
    # Muuttujan arvon muuttaminen ei onnistu, koska
    # muuttuja on määritelty pääohjelmassa
    nimi = nimi + ", ohjelmoijaguru"
    print(nimi)


nimi = "Pirjo Pythonen"
toista_nimi()

```

<sample-output>

UnboundLocalError: local variable 'nimi' referenced before assignment

</sample-output>

Itse asiassa kyse on siitä, että Pythonin mielestä muuttujaa ei ole määritelty ennen kuin sitä yritetään käyttää. Jos muuttujan arvoa halutaan muuttaa funktiossa, voidaan muuttuja määritellä globaaliksi avainsanalla `global` ennen sen käyttöä:

```python

# Muuttujaa nimi ei ole määritelty funktiossa
def toista_nimi():
    # Määritellään muuttuja globaaliksi, jolloin siihen viittaaminen
    # onnistuu
    global nimi
    nimi = nimi + ", ohjelmoijaguru"
    print(nimi)


nimi = "Pirjo Pythonen"
toista_nimi()
# Muuttunut arvo näkyy myös pääohjelmassa, koska
# kyseessä on sama muuttuja
print("Arvo pääohjelmassa: " + nimi)

```

<sample-output>

Pirjo Pythonen, ohjelmoijaguru
Arvo pääohjelmassa: Pirjo Pythonen, ohjelmoijaguru

</sample-output>

## Paikalliset vai globaalit muuttujat?

Yleisesti ottaen kannattaa _lähes aina_ välttää globaaleja muuttujia. Pääasiallinen syy tähän on, että virheiden etsiminen ohjelmista voi muuttua huomattavasti sekavammaksi, mikäli ohjelmassa ei ole selkeästi merkitty mitä muuttujia käsitellään missäkin osassa.

Sen sijaan, että käyttäisit globaalia muuttujaa, on siis parempi välittää muuttujan arvo parametrina funktiolle ja palauttaa mahdollisesti muuttunut arvo takaisin funktion paluuarvona.

Tarkastellaan tätä kahden esimerkin avulla. Ensimmäisessä esimerkissä käytetään globaalia muuttujaa:

```python

def lyhenna_etunimi():
    global nimi
    nimet = nimi.split(" ")
    nimet[0] = nimet[0][0].upper() + "."
    nimi = " ".join(nimet)

nimi = "Erkki Esimerkki"

# Funktiokutsusta ei selvästi käy ilmi
# mihin muuttujaan se kohdistuu
lyhenna_etunimi()

print(nimi)

```

Toinen tapa kirjoittaa ohjelma on välttää globaalien muuttujien käyttöä ja sen sijaan välittää nimi funktiolle parametrina:

```python

def lyhenna_etunimi(nimi: str):
    nimet = nimi.split(" ")
    nimet[0] = nimet[0][0].upper() + "."
    nimi = " ".join(nimet)
    return nimi

nimi = "Erkki Esimerkki"

# Nyt on selvää, mihin muuttujaan funktio
# kohdistuu
nimi = lyhenna_etunimi(nimi)

print(nimi)

```

Molempien ohjelmien tuloste näyttää samalta:

<sample-output>

E. Esimerkki

</sample-output>

Jälkimmäisessä tapauksessa on kuitenkin selkeämpää mihin muuttujaan funktio kohdistuu. Funktio on myös monikäyttöisempi, koska samalla funktiolla voidaan lyhentää minkä tahansa nimen etunimi - ei ainoastaan pääohjelmassa määritellyn tietyn nimen.

Joissain tapauksissa voisi olla kuitenkin perusteltua käyttää globaalia muuttujaa - esim. pankkitiliä käsittelevä ohjelma voisi tallentaa pankkitilin saldon yhteen yhteiseen globaaliin muuttujaan. Tähänkin löytyy kuitenkin järkevämpiä tapoja - palataan vastaavaan esimerkkiin kuitenkin tarkemmin osassa 8, kun aletaan käsitellä olio-ohjelmointia.
