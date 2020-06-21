---
path: '/osa-4/5-tulostuksen-muotoilu'
title: Tulostuksen muotoilu
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät, miten `print`-komennon tulostusta saa muokattua parametrien avulla
- Osaat käyttää f-merkkijonoja tulosteen muotoilussa

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

Tämän koodin lopputulos on sama kuin edellisen esimerkin. Näin käytettynä `print` tulostaa kaikki parametrinsa välilyönnillä eroteltuna. Etuna tässä tavassa on, että tulostettavat osat voivat olla eri tyyppisiä eli tyyppimuunnosta merkkijonoksi ei tarvita.

Automaattisesta välilyönnistä pilkulla eriteltyjen osien välillä on mahdollista päästä eroon antamalla funktiolle parametri `sep`:

```python
print("Hei", nimi, "ikäsi on", ika, "vuotta", sep="")
```

Tulostus on nyt seuraava:

<sample-output>

HeiErkkiikäsi on39vuotta

</sample-output>


Parametri `sep=""` on _nimetty parametri_, joka määrittelee, että pilkulla eroteltujen osien väliin laitetaan ainoastaan tyhjä merkkijono. Voisimme myös saada jokaisen osan tulostumaan omalle rivilleen määrittelemällä erottimeksi `"\n"` eli rivinvaihtoa kuvaavan merkin:

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

Oletusarvoisesti print-komento päättyy rivinvaihtoon, mutta tätä voidaan muokata parametrin `end` avulla. Esim. jos `end` saa arvoksi tyhjän merkkijonon, `print`-komento ei aiheuta automaattista rivinvaihtoa:

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

Tässä merkkijonon alussa on kirjain _f_, mikä tarkoittaa että merkkijono on f-merkkijono. Merkkijonon sisälle on sijoitettu aaltosuluissa muuttujia, joiden arvot tulevat merkkijonon osaksi. Tulostus on täsmälleen sama kuin aiemmissa esimerkeissä.

Voimme muotoilla monin tavoin f-merkkijonojen avulla tapahtuvaa tulostusta. Yksi tavallinen käyttötapa on antaa liukuluvun tulostuksessa näytettävien desimaalien määrä. Oletusarvoisesti tulostuu jokin määrä desimaaleja:

```python
luku = 1/3
print("Luku on", luku)
```

<sample-output>

Luku on 0.333333333333333

</sample-output>

Saamme määriteltyä tulostuvien desimaalien määrän f-merkkijonon avulla. Tulostuksen muoto määritellään lisäämällä aaltosulkeiden sisään tulostettavan muuttujan jälkeen kaksoispiste ja _muotoiluohje_:

```python
luku = 1/3
print(f"Luku on {luku:.2f}")
```

```python
Luku on 0.33
```

Muotoiluohje `.2f` siis määrittelee, että desimaaliluku tulostetaan _kahden desimaalin_ tarkkuudella. Huom: kirjain _f_ kakkosen jälkeen tarkoittaa että muotoiluohje koskee desimaalilukua eli `float`-tyyppistä arvoa!

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

<programming-exercise name=' Lukulistasta merkkijonolistaksi' tmcname='osa04-20_lukulistasta_merkkijonolistaksi'>

Kirjoita funktio `muotoile`, joka saa parametrikseen liukulukuja sisältävän listan. Funktio muodostaa listan perusteella uuden merkkijonoja sisältävän listan, jossa jokainen liukulukulistan alkio esitetään pyöristettynä kahden desimaalin tarkkuuteen. Listan alkioiden järjestyksen tulee säilyä.

_Vinkki: Käytä liukulukujen muotoiluun merkkijonoiksi f-merkkijonoa._

Esimerkki funktion käytöstä:

```python
lista = [1.234, 0.3333, 0.11111]
lista2 = muotoile(lista)
print(lista2)
```

<sample-output>

['1.20', '0.33', '0.11']

</sample-output>

</programming-exercise>

<programming-exercise name='Arvosanatilasto' tmcname='osa04-21_arvosanatilasto'>

Tässä tehtävässä toteutetaan ohjelma kurssin arvosanatilastojen tulostamiseen.

Ohjelmalle syötetään rivejä, jotka sisältävät yhden opiskelijan koepistemäärän sekä tehtyjen harjoitustehtävien määrän. Ohjelma tulostaa niiden perusteella arvosanoihin liittyviä tilastoja.

Koepisteet ovat kokonaisulukuja väliltä 0–20. Tehtyjen harjoitustehtävien lukumäärät taas kokonaislukuja väliltä 0–100.

Ohjelma kyselee käyttäjältä rivejä niin kauan, kunnes käyttäjä syöttää tyhjän rivin. Voit olettaa, että kaikki rivit on syötetty "oikein", eli rivillä on joko kaksi kokonaislukua tai rivi on tyhjä.

Koepisteiden ja harjoitustehtävien syöttäminen etenee seuraavasti:

<sample-output>

Koepisteet ja harjoitusten määrä: **15 87**
Koepisteet ja harjoitusten määrä: **10 55**
Koepisteet ja harjoitusten määrä: **11 40**
Koepisteet ja harjoitusten määrä: **4 17**
Koepisteet ja harjoitusten määrä:
Tilasto:

</sample-output>

Kun käyttäjä on syöttänyt tyhjän rivin, tulostaa ohjelma tilastot.

Tilastot muodostuvat seuraavasti:

Tehtyjen harjoitustehtävien määrästä saa kurssipisteitä siten, että vähintään 10 % tehtävämäärästä tuo 1 kurssipisteen, 20 % tuo 2 kurssipistettä, jne., ja 100 % eli 100 harjoitustehtävää tuo 10 kurssipistettä. Harjoitustehtävistä saatava kurssipistemäärä on kokonaisluku.

Kurssin arvosana määräytyy seuraavan taulukon mukaan:

koe+harjoituspisteet   | arvosana
:--:|:----:
0–14 | 0 (eli hylätty)
15–17 | 1
18–20 | 2
21–23 | 3
24–27 | 4
28–30 | 5

Edelliseen on kuitenkin poikkeus: jos kokeen pistemäärä on alle 10, on arvosana kokonaispistemäärästä riippumatta 0 eli hylätty.

Yllä olevalla esimerkkisyötteellä ohjelma tulostaa seuraavat tilastot:

<sample-output>

<pre>
Tilasto:
Pisteiden keskiarvo: 14.5
Hyväksymisprosentti: 75.0
Arvosanajakauma:
  5:
  4:
  3: *
  2:
  1: **
  0: *
</pre>

</sample-output>

Desimaaliluvut tulostetaan yhden desimaalin tarkkuudella.

Vihjeitä:

Koko tehtävän koodi kannattaa rakentaa useista pienen asian tekevistä apufunktioista.

Isompaa ohjelmaa rakentaessa voi olla järkevintä testailla ohjelman funktioita aluksi erillään ns. "pääohjelmasta". Yksi tapa, joka tekee tämän helpoksi, on tehdä myös pääohjelmasta oma funktio, esimerkiksi nimeltään `main`, jonka ohjelman funktioiden ulkopuoleinen osa käynnistää:

```python
def main():
    pisteet = []
    # ohjelman koodi tänne

main()
```

Näin ohjelman apumetodeja on mahdollista testata ilman pääohjelman suorittamista:

```python
# apumetodi, joka laskee arvosanan pisteiden perusteella
def arvosana(pisteet)
    # koodia

def main():
    pisteet = []
    # ohjelman koodi tänne

# kommentoidaan pääohjelma pois
#main()

# testataan apumetodia
pistemaara = 35
tulos = arvosana(pistemaara)
print(tulos)
```

</programming-exercise>

<quiz id="dc0340d8-b01a-51c3-b9c1-a42a12fb8639"></quiz>
