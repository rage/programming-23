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

TODO: Tässä olisi varmaan hyvä kertoa myös termistä _näkyvyysalue_ (_scope_)

Ohjelmoinnissa käytetään käsitteitä _paikallinen muuttuja_ ja _globaali muuttuja_. Yleisesti paikallisella muuttujalla tarkoitetaan muuttujaa, joka on näkyvissä vain tietyn rajatun alueen sisällä ohjelmassa. Vastaavasti globaali muuttuja on käytettävissä missä tahansa ohjelman osassa.

## Paikalliset muuttujat

Pythonissa oletuksena kaikki funktion sisällä määritellyt muuttujat ovat funktion _paikallisia muuttujia_. Tämä koskee sekä parametreja että funktion lohkon sisällä määriteltyjä muuttujia. Paikallinen muuttuja tarkoittaa, että muuttuja _ei ole olemassa funktion ulkopuolella_.

Esimerkiksi seuraavassa ohjelmassa yritys viitata muuttujaan `x` pääohjelmassa antaa virheen:

```python
def testi():
    x = 5
    print(x)

testi()
print(x)
```

<sample-output>

5
NameError: name 'x' is not defined

</sample-output>

Ohjelmassa muuttuja `x` on siis olemassa vain funktion `testi` suorituksen ajan eikä siihen pääse käsiksi muista funktioista tai pääohjelmasta. 

## Globaalit muuttujat

Pääohjelmassa eli kaikkien funktioiden ulkopuolella määritellyt muuttujat ovat globaaleja muuttujia. Globaalin muuttujan arvo voidaan lukea funktiossa. Esimerkiksi seuraava toimii:

```python
def testi():
    print(x)

x = 3
print(x)
```

<sample-output>

3

</sample-output>

Kuitenkaan globaalia muuttujaa ei voi oletuksena muuttaa. Esimerkiksi seuraava funktio ei vaikuta globaaliin muuttujaan:

```python
def testi():
    x = 5
    print(x)

x = 3
testi()
print(x)
```

<sample-output>

5
3

</sample-output>

Tässä tapauksessa funktio `testi` luo paikallisen muuttujan `x`, joka saa arvon 5. Tämä on kuitenkin eri muuttuja kuin pääohjelmassa oleva muuttuja `x`.

Entä miten toimii seuraava koodi?

```python
def testi():
    print(x)
    x = 5

x = 3
testi()
print(x)
```

<sample-output>

UnboundLocalError: local variable 'x' referenced before assignment

</sample-output>

Funktiossa `testi` annetaan arvo muuttujalle `x`, jolloin Python päättelee, että `x` on funktion paikallinen muuttuja (eikä globaali muuttuja). Koska muuttujaan yritetään viitata ennen arvon asettamista, tapahtuu virhe.

Jos haluamme muuttaa funktiossa globaalia muuttujaa, tämä onnistuu avainsanan `global` avulla:

```python
def testi():
    global x
    x = 3
    print(x)

x = 5
testi()
print(x)
```

<sample-output>

3
3

</sample-output>

Nyt funktiossa tehty muutos `x = 3` vaikuttaa myös pääohjelmaan, eli kaikissa ohjelman kohdissa `x` viittaa samaan muuttujaan.

## Paikallinen vai globaali muuttuja?

TODO: Tähän pitäisi saada kaksi esimerkkiä: todellinen tilanne, jossa voi käyttää globaalia muuttujaa mutta ratkaisu on huono, sekä todellinen tilanne, jossa voi käyttää globaalia muuttujaa ja ratkaisu on hyvä. Esimerkkien pitää olla todellisia ja näyttää havainnollisesti, mitä aitoa haittaa tai hyötyä globaalista muuttujasta voi olla.

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
