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
- Tiedät, miten toisto voidaan katkaista `break`-komennolla

</text-box>

Toisto on ehtolauseen lisäksi keskeinen ohjausrakenne ohjelmoinnissa. Aloitetaan toistoon tutustuminen tarkastelemalla Pythonin `while`-lausetta yksinkertaisten esimerkkien kautta. Ensi viikolla tutustutaan sitten monipuolisemmin sen mahdollisuuksiin.

Periaatteessa `while`-lause muistuttaa ehtolausetta. Ideana kuitenkin on, että sen avulla voidaan toistaa samaa koodia useamman kerran.

Tarkastellaan esimerkkiä, jossa ohjelma laskee käyttäjän syöttämien lukujen neliöitä niin kauan, että käyttäjä syöttää negatiivisen luvun:

```python
while True:
    luku = int(input("Anna luku, -1 lopettaa: "))

    if luku == -1:
        break

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

Kuten esimerkistä huomataan, ohjelman suoritus jatkuu `while`-lauseen ansiosta niin kauan, että suoritetaan lause `break`. Heti kun `break`-komento suoritetaan, hyppää suoritus ensimmäiselle lohkon jälkeiselle riville.

TODO: pitäisikö tässä selittää enemmänkin?
