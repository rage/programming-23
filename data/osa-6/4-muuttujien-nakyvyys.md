---
path: '/osa-6/4-paikalliset-muuttujat'
title: 'Paikalliset ja globaalit muuttujat'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät mitä tarkoitetaan paikallisella muuttujalla
- Tiedät, miten muuttujan näkyvyysalue vaikuttaa sen käyttöön
- Tiedät, mitä Pythonissa tekee avainsana `global`
- Osaat käyttää paikallisia ja globaaleja muuttujia oikein

</text-box>

Muuttujan _näkyvyysalue_ (_scope_) tarkoittaa, missä ohjelman osissa muuttujaa voi käyttää. _Paikallinen_ muuttuja on muuttuja, joka on näkyvissä vain tietyn rajatun alueen sisällä ohjelmassa. _Globaali_ muuttuja on puolestaan käytettävissä missä tahansa ohjelman osassa.

## Paikalliset muuttujat

Pythonissa funktion sisällä määritellyt muuttujat ovat funktion paikallisia muuttujia. Tämä koskee sekä parametreja että funktion lohkon sisällä esiteltyjä muuttujia. Paikallisuus tarkoittaa, että muuttuja _ei ole olemassa funktion ulkopuolella_.

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
testi()
```

<sample-output>

3

</sample-output>

Kuitenkaan globaalia muuttujaa ei voi muuttaa suoraan. Esimerkiksi seuraava funktio _ei vaikuta_ globaaliin muuttujaan:

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

Jos kuitenkin haluamme muuttaa funktiossa globaalia muuttujaa, tämä onnistuu avainsanan `global` avulla:

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

## Milloin käyttää globaalia muuttujaa?

Globaalien muuttujien tarkoituksena ei ole korvata funktion parametreja tai paluuarvoa. Esimerkiksi on sinänsä mahdollista tehdä seuraava funktio, joka tallentaa laskun tuloksen globaaliin muuttujaan:

```python
def laske_summa(a, b):
    global tulos
    tulos = a + b

laske_summa(2, 3)
print(tulos)
```

Parempi tapa on kuitenkin toteuttaa funktio kuten ennenkin:

```python
def laske_summa(a, b):
    return a + b

tulos = laske_summa(2, 3)
print(tulos)
```

Jälkimmäisen tavan etuna on, että funktio on _itsenäinen_ kokonaisuus, jolle annetaan tietyt parametrit ja joka palauttaa tietyn tuloksen. Funktiolla ei ole sivuvaikutuksia, minkä ansiosta sitä voi testata muusta koodista riippumattomasti.

Kuitenkin globaali muuttuja voi olla hyödyllinen, jos halutaan pitää yllä jotain funktioille yhteistä "ylemmän tason" tietoa. Tässä on yksi esimerkki asiasta:

```python
def laske_summa(a, b):
    global laskuri
    laskuri += 1
    return a + b

def laske_erotus(a, b):
    global laskuri
    laskuri += 1
    return a - b


laskuri = 0
print(laske_summa(2, 3))
print(laske_summa(5, 5))
print(laske_erotus(5, 2))
print(laske_summa(1, 0))
print("Funktioita kutsuttiin", laskuri, "kertaa")
```

<sample-output>
5
10
3
1
Funktioita kutsuttiin 4 kertaa

</sample-output>

Tässä haluamme pitää ohjelman suorituksen aikana kirjaa siitä, montako kertaa funktioita on kutsuttu ohjelman eri kohdista. Nyt globaali muuttuja `laskuri` on kätevä, koska voimme kasvattaa sen arvoa jokaisella funktion kutsukerralla ja katsoa globaalista muuttujasta, montako kertaa funktiota on kutsuttu.

<quiz id="b7fa20c1-f89a-5656-ba7a-db870cab2a98"></quiz>

Vastaa lopuksi osion loppukyselyyn:

<quiz id="58258ec7-4324-5364-ac31-0388fd452ba0"></quiz>
