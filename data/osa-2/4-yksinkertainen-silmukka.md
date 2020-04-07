---
path: '/osa-2/4-yksinkertainen-silmukka'
title: 'Yksinkertainen silmukka'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Toimintojen toistaminen on eräs tehokkaimmista työkaluista ohjelmoinnissa: aloitetaan siis tutustuminen toistolauseeseen.

Tämän osion suoritettuasi

- Tiedät, mitä tarkoitetaan toistolauseella
- Osaat käyttää yksinkertaista `while(True)`-silmukkaa osana ohjelmaasi
- Tiedät, miten toisto voidaan katkaista `break`-lauseella

</text-box>

Tietokoneiden tehokkuus perustuu niiden nopeuteen. Vaikka nykyistenkin prosessorien suorittamat operaatiot ovat melko yksinkertaisia (esimerkiksi kahden luvun yhteenlasku tai arvon siirtäminen muistista prosessorin laskettavaksi), voidaan tällaisia operaatioita suorittaa jopa miljardeja joka sekunti.

Toisto onkin ehtolauseen lisäksi kenties tärkein ohjausrakenne useissa ohjelmointikielissä. Aloitetaan toistoon tutustuminen tarkastelemalla Pythonin `while`-lausetta yksinkertaisten esimerkkien kautta. Ensi viikolla tutustutaan sitten monipuolisemmin sen mahdollisuuksiin.

Periaatteessa `while`-lause muistuttaa ehtolausetta. Ideana kuitenkin on, että sen avulla voidaan toistaa jotain lohko useamman kerran.

Tarkastellaan esimerkkiä, jossa ohjelma laskee käyttäjän syöttämien lukujen neliöitä niin kauan, että käyttäjä syöttää negatiivisen luvun:

```python

# Silmukka, jota suoritetaan "ikuisesti"
while True:
    # Kysy luku
    luku = int(input("Anna luku, -1 lopettaa: "))

    # Jos luku on -1, poistutaan silmukasta
    if luku == -1:
        break

    # Tulosta neliö, lohkon lopussa
    # silmukka alkaa alusta
    print(luku ** 2)

print("Kiitos ja moi!")

```

Ohjelman esimerkkisuoritus:

<sample-output>

Anna luku, -1 lopettaa: **2**
4
Anna luku, -1 lopettaa: **4**
16
Anna luku, -1 lopettaa: **10**
100
Anna luku, -1 lopettaa: **-1**
Kiitos ja moi!

</sample-output>

Niinkuin esimerkistä huomataan, ohjelman suoritus jatkuu `while`-lauseen ansiosta niin kauan, että suoritetaan lause `break`. Heti kun `break`-lause suoritetaan, hyppää suoritus ensimmäiselle lohkon jälkeiselle riville.
