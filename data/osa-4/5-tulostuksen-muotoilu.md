---
path: '/osa-4/5-tulostuksen-muotoilu'
title: Tulostuksen muotoilu
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osan jälkeen

- Tiedät miten promnt-komennon tulostusta saa muokattua nimettyjen parametrien `sep` ja `end` avulla
- Opit muotoilemaan tulostettavia merkkijonoja f-stringien avulla

</text-box>

Olemme tähän mennessä yhdistelleet tulostettavaa tietoa `print`-komennossa kahdella tavalla. 

Ensimmäinen tapa on käyttää merkkijonojen `+`-operaattoria ja muodostaa näin yksittäinen merkkijono, jonka print saa parametrikseen:

```python
nimi = "Erkki"
ika = 39
print("Hei " + nimi + " ikäsi on " + str(ika) + " vuotta" )
```

Tämä tapa edellyttää, että kaikki yhdistettävät osat ovat merkkijonoja. Koska muuttuja `ika` on tyypiltään kokonaisluku, se on muutettu yhdistämistä varten merkkijonoksi funktiolla `str`.

Toinen käyttämämme tapa on eritellä tulostuksen osat pilkulla:

```python
print("Hei", nimi, "ikäsi on", ika, "vuotta" )
```

Tämän koodin lopputulos on sama kuin edellisen esimerkin. Näin käytettynä `print` tulostaa kaikki parametrinsa _välilyönnillä_ eroteltuna. Etuna tässä tavassa on se, että tulostettavat osat voivat olla eri tyyppisiä, tyyppimuunnosta merkkijonoksi ei tarvita.

Automaattisesta välilyönnistä pilkulla eriteltyjen osien välillä on mahdollista päästä eroon antamalla funktiolle _nimetty parametri_ `sep`:

```python
print("Hei", nimi, "ikäsi on", ika, "vuotta", sep="")
```

Tulostus on nyt seuraava

<sample-output>

HeiErkkiikäsi on39vuotta

</sample-output>


Parametri `sep=""` siis määrittelee, että pilkulla eroteltujen väliin laitetaan ainoastaan tyhjä merkkijono. Voisimme myös saada jokaisen osan tulostumaan omalle rivilleen määrittelemällä erottimeksi `"\n"` eli rivinvaihtoa kuvaavan merkin:

```python
print("Hei", nimi, "ikäsi on", ika, "vuotta", sep="\n")
```

<sample-output>

Hei
Erkki
ikäsi on
39
vuotta

</sample-output>

Huomaa, että [osan 1](/osa-1/3-lisaa-muuttujista) tehtävässä _Tulostukset samalle riville_ käyttämämme nimetty parametri `end` on sukua erotinparametrille `sep`. 

Oletusarvoisesti print-komento päättyy rivinvaihtoon, mutta tätä voidaan muokata parametrin `end` avulla. Esim. jos `end` saa arvoksi tyhjän merkkijonon, print-komento ei aiheuta automaattista rivinvaihtoa:

```python
print("Moi ", end="")
print("kaikki!")
```

<sample-output>

Moi kaikki!

</sample-output>

## f-merkkijonot

Niin sanotut _f-merkkijonot_ tarjoavat kolmannen ja edellisiä joustavamman ja jopa helppokäyttöisemmän tavat tulostuksen muotoiluun.

Aiempi nimen ja iän tulostava esimerkki tehtäisiin f-merkkijonojen avulla seuraavasti:

```python
nimi = "Erkki"
ika = 39
print(f"Hei {nimi} ikäsi on {ika} vuotta")
```

Tässä merkkijonon alussa on kirjain _f_, mikä tarkoittaa että merkkijono on _f-string_. Merkkijonon sisälle on sijoitettu aaltosuluissa muuttujia, joiden arvot tulevat merkkijonon osaksi. Tulostus on täsmälleen sama kuin aiemmissa esimerkeissä.

Voimme muotoilla monin tavoin f-stringien avulla tapahtuvaa tulostusta. Yksi tavallinen käyttötapa on antaa liukuluvun tulostuksessa näytettävien desimaalien määrä. Oletusarvoisesti tulostuu jokin määrä desimaaleja:

```python
luku = 1/3
print("Luku on", luku)
```

<sample-output>

Luku on 0.333333333333333

</sample-output>

Saamme määriteltyä tulostuvien desimaalien määrän f-stringin avulla. Tulostuksen muoto määritellään lisäämällä aaltosulkeiden sisään tulostettavan muuttujan jälkeen kaksoispiste ja _muotoiluohje_:

```python
luku = 1/3
print(f"Luku on {luku:.2}")
```

```python
Luku on 0.33
```

Muotoiluohje `.2` siis määrittelee, että desimaaliluku tulostetaan _kahden desimaalin_ tarkkuudella.

Tässä on vielä toisenlainen esimerkki, jossa tulostetaan nimiä 15 merkin levyiseen tekstialueeseen, ensin vasemmalle sisennettynä ja sen jälkeen oikealle sisennettynä:

```python
nimet =  [ "Antti", "Emilia", "Juha-Pekka", "Maya" ]
for nimi in nimet:
  print(f"{nimi:15} keskellä {nimi:>15}")
```

```python
Antti           keskellä           Antti
Emilia          keskellä          Emilia
Juha-Pekka      keskellä      Juha-Pekka
Maya            keskellä            Maya
```
