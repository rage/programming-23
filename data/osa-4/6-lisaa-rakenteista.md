---
path: '/osa-4/6-lisaa-rakenteista'
title: 'Lisää merkkijonoista ja listoista'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tunnet lisää tapoja erottaa osia merkkijonosta tai listasta
- Ymmärrät, mitä tarkoittaa merkkijonon muuttumattomuus
- Osaat käyttää metodeita `count` ja `replace`

</text-box>

Olemme käyttäneet aiemmin `[]`-syntaksia merkkijonon osajonon erottamiseen:

```python
mjono = "esimerkki"
print(mjono[3:7])
```

<sample-output>

merk

</sample-output>

Sama syntaksi toimii myös listoissa, ja voimme erottaa sen avulla listan osan:

```python
lista = [3,4,2,4,6,1,2,4,2]
print(lista[3:7])
```

<sample-output>

[4, 6, 1, 2]

</sample-output>

## Lisää erottamisesta

Itse asiassa `[]`-syntaksi toimii hyvin samalla periaatteella kuin `range`-funktio, eli voimme antaa sille myös askeleen:

```python
mjono = "esimerkki"
print(mjono[0:7:2])
lista = [1,2,3,4,5,6,7,8]
print(lista[6:2:-1])
```

<sample-output>

eiek
[7, 6, 5, 4]

</sample-output>

Jos emme anna jotain arvoa, oletuksena koko sisältö valitaan mukaan. Tämän avulla voimme tehdä seuraavan lyhyen ohjelman, joka kääntää merkkijonon:

```python
mjono = input("Kirjoita merkkijono: ")
print(mjono[::-1])
```

<sample-output>

Kirjoita merkkijono: **esimerkki**
ikkremise

</sample-output>

## Varoitus: globaalin muuttujan käyttö funktion sisällä

Funktioiden sisällä on mahdollista määritellä muuttujia, mutta tämän lisäksi funktio näkee sen ulkopuolella pääohjelmassa määritellyt muuttujat. Tälläisia muuttujia sanotaan _globaaleiksi_ muuttujiksi.

Globalien muuttujien käyttämistä funktioista käsin ei useimmiten pidetä hyvänä asiana muun muassa siksi, että ne saattavat johtaa ikäviin bugeihin.

Seuraavassa on esimerkki funktiosta, joka käyttää "vahingossa" globaalia muuttujaa:

```python
def tulosta_vaarinpain(nimet: list):
    # käytetään vahingossa parametrin sijaan globaalia muuttujaa nimilista
    i = len(nimilista) - 1
    while i >= 0:
        print(nimilista[i])
        i -= 1

# globaali muuttuja
nimilista = ["Antti", "Emilia", "Erkki", "Margaret"]
tulosta_vaarinpain(nimilista)
print()
tulosta_vaarinpain(["Tupu", "Hupu", "Lupu"])
```

<sample-output>

Margaret
Erkki
Emilia
Antti

Margaret
Erkki
Emilia
Antti

</sample-output>

Vaikka funktiota kutsutaan oikein, se tulostaa aina globaalissa muuttujassa _nimilista_ olevat nimet.

Kaikki funktioita testaava koodi on kirjoitettava erillisen lohkon sisälle, jotta TMC-testit hyäksyisivät koodin. Edellinen esimerkki siis tulisi toteuttaa seuraavasti:

```python
def tulosta_vaarinpain(nimet: list):
    # käytetään vahingossa parametrin sijaan globaalia muuttujaa nimilista
    i = len(nimilista) - 1
    while i>=0:
        print(nimilista[i])
        i -= 1

# kaikki funktiota testaava koodi tämän lohkon sisälle
if __name__ == "__main__":
    # globaali muuttuja
    nimilista = ["Antti", "Emilia", "Erkki", "Margaret"]
    tulosta_vaarinpain(nimilista)
    print()
    tulosta_vaarinpain(["Tupu", "Hupu", "Lupu"])
```

Nyt myös globaalin muuttujan määrittely on siirtynyt `if`-lohkoon.

TMC-testit suoritetaan aina siten, että mitään `if`-lohkon sisällä olevaa koodia ei suoriteta. Tämän takia funktio ei voi edes teoriassa toimia, sillä se viittaa muuttujaan `nimilista`, jota ei testejä suoritettaessa ole lainkaan olemassa.

<programming-exercise name='Kaikki väärinpäin' tmcname='osa04-21_kaikki_vaarinpain'>

Kirjoita funktio `kaikki_vaarinpain`, joka saa parametrikseen listan merkkijonoja. Funktio luo ja palauttaa uuden listan, jossa kaikki alkuperäisellä listalla olevat merkkijonot on käännetty. Myös listan alkioiden järjestys muutetaan käänteiseksi.

Esimerkki funktion käytöstä:

```python
lista = ["Moi", "kaikki", "esimerkki", "vielä yksi"]
lista2 = kaikki_vaarinpain(lista)
print(lista2)
```

<sample-output>

['isky äleiv', 'ikkremise', 'ikkiak', 'ioM']

</sample-output>

</programming-exercise>

## Merkkijonoa ei voi muuttaa

Merkkijonoilla ja listoilla on paljon yhteistä, ja useimmat operaatiot toimivat samalla tavalla sekä merkkijonoille että listoille. Kuitenkin erona on, että merkkijonoa _ei voi muuttaa_. Esimerkiksi seuraava koodi ei toimi tarkoitetulla tavalla:

```python
mjono = "esimerkki"
mjono[0] = "a"
```

Koska merkkijonoa ei voi muuttaa, ohjelman suoritus aiheuttaa virheen:

<sample-output>

TypeError: 'str' object does not support item assignment

</sample-output>

Samankaltainen virhe seuraa, jos yritetään esimerkiksi järjestää merkkijonoa järjestykseen `sort`-metodilla.

Vaikka merkkijonoa ei voi muuttaa, voimme silti sijoittaa merkkijonon paikalle toisen merkkijonon.

Onkin tärkeää huomata ero seuraavien esimerkkien välillä:

```python
lista = [1,2,3]
lista[0] = 10
```

<img src="4_4_1.png">

```python
mjono = "Moi"
mjono = mjono + "!"
```

<img src="4_4_2.png">

Ensimmäisessä esimerkissä listan sisältö muuttuu. Toisessa esimerkissä alkuperäinen merkkijono korvataan toisella merkkijonolla. Alkuperäinen merkkijono jää muistiin, mutta siihen ei enää ole viittausta, joten sitä ei voi enää käyttää ohjelmassa.

Tähän palataan tarkemmin ensi viikolla, kun puhutaan listojen käytöstä funktioiden parametreina ja paluuarvoina.

## Lisää metodeita

Metodin `count` avulla voidaan laskea osajonon esiintymien määrä. Metodi toimii samaan tapaan sekä merkkijonon että listan kanssa. Esimerkiksi näin:

```python
mjono = "Vesihiisi sihisi hississä"
print(mjono.count("si"))

lista = [1,2,3,1,4,5,1,6]
print(lista.count(1))
```

<sample-output>

5
3

</sample-output>

Huomaa, että metodi `count` ei laske päällekkäisiä esiintymiä. Esimerkiksi metodin mukaan merkkijonossa `aaaa` esiintyy kaksi kertaa osajono `aa`, vaikka oikeastaan esiintymiä olisi kolme, jos päällekkäiset esiintymät sallitaan.

Metodin `replace` avulla voidaan muodostaa uusi merkkijono, jossa tietty merkkijono on korvattu toisella merkkijonolla. Esimerkiksi:

```python
mjono = "Moi kaikki"
uusi = mjono.replace("Moi", "Hei")
print(uusi)
```

<sample-output>

Hei kaikki

</sample-output>

Metodi korvaa kaikki merkkijonon esiintymät:

```python
lause = "hei heilan löysin minä heinikosta hei"
print(lause.replace("hei", "HEI"))
```

<sample-output>

HEI HEIlan löysin minä HEInikosta HEI

</sample-output>

Tyypillinen virhe `replace`-metodia käytettäessä on unohtaa, että merkkijonot ovat muuttumattomia:

```python
mjono = "Python on kivaa"

# Korvataan alijono, muttei tallenneta tulosta mihinkään...
mjono.replace("Python", "Java")
print(mjono)
```

<sample-output>

Python on kivaa

</sample-output>

Jos vanhaa jonoa ei tarvita, voidaan uusi jono sijoittaa samaan muuttujaan:

```python
mjono = "Python on kivaa"

# Korvataan alijono, tallennetaan tulos samaan muuttujaan
mjono = mjono.replace("Python", "Java")
print(mjono)
```

<sample-output>

Java on kivaa

</sample-output>

<programming-exercise name='Eniten kirjaimia' tmcname='osa04-22_eniten_kirjaimia'>

Kirjoita funktio `eniten_kirjainta`, joka saa parametrikseen merkkijonon. Funktio palauttaa kirjaimen, jota esiintyy eniten merkkijonossa. Jos yhtä yleisiä kirjaimia on monta, funktion tulee palauttaa niistä ensimmäisenä merkkijonossa esiintyvä.

Esimerkki funktion käytöstä:

```python
mjono = "abcbdbe"
print(eniten_kirjainta(mjono))

toinen_jono = "esimerkkimerkkijonokki"
print(eniten_kirjainta(toinen_jono))
```

<sample-output>

b
k

</sample-output>

</programming-exercise>


<programming-exercise name='Vokaalit pois' tmcname='osa04-23_vokaalit_pois'>

Kirjoita funktio `ilman_vokaaleja`, joka saa parametrikseen merkkijonon. Funktio palauttaa uuden merkkijonon, jossa alkuperäisen merkkijonon vokaalit on poistettu.

Voit olettaa, että merkkijono koostuu pelkästään pienistä suomen kielen kirjaimista a...ö.

Esimerkki funktion käytöstä:

```python
mjono = "tämä on esimerkki"
print(ilman_vokaaleja(mjono))
```

<sample-output>

tm n smrkk

</sample-output>

</programming-exercise>


<programming-exercise name='Poista isot' tmcname='osa04-24_poista_isot'>

Pythonin merkkijonometodi `isupper()` palauttaa arvon `True`, jos merkkijono koostuu _pelkästään isoista kirjaimista_.

Esimerkiksi:

```python
print("XYZ".isupper())

onko_iso = "Abc".isupper()
print(onko_iso)
```

<sample-output>

True
False

</sample-output>

Kirjoita metodia hyödyntäen funktio `poista_isot`, joka saa parametrikseen listan merkkijonoja. Funktio palauttaa uuden listan, jolla on sen parametrina olevasta listasta ne merkkijonot, jotka eivät koostu kokonaan isoista kirjaimista.


Esimerkki funktion käytöstä:

```python
lista = ["ABC", "def", "ISO", "TOINENISO", "pieni", "toinen pieni", "Osittain Iso"]
karsittu_lista = poista_isot(lista)
print(karsittu_lista)
```

<sample-output>

['def', 'pieni', 'toinen pieni', 'Osittain Iso']

</sample-output>

</programming-exercise>

<programming-exercise name='Naapureita listassa' tmcname='osa04-25_naapureita_listassa'>

Määritellään, että listan alkiot ovat naapureita, jos niiden erotus on 1. Naapureita olisivat siis esim alkiot 1 ja 2 tai alkiot 56 ja 55.

Kirjoita funktio `pisin_naapurijono`, joka etsii listasta pisimmän peräkkäisiä naapureita sisältävän osalistan ja palauttaa sen pituuden.

Esimerkiksi listassa `[1, 2, 5, 4, 3, 4]` pisin tällainen osalista olisi `[5, 4, 3, 4]`, ja sen pituus 4.

Esimerkki funktion kutsumisesta:

```python
lista = [1, 2, 5, 7, 6, 5, 6, 3, 4, 1, 0]
print(pisin_naapurijono(lista))
```

<sample-output>

4

</sample-output>

</programming-exercise>

## Laajemman ohjelman tekeminen

Tämän osan huipentaa ensimmäinen hieman laajempi ohjelma, jota tehdessäsi pääset soveltamaan kaikkea tähän asti opeteltua.

Sääntö numero yksi isompaa tai oikeastaan mitä tahansa ohjelmaa tehdessä on se, että ei kannata yrittää ratkaista kaikkia ongelmia yhtä aikaa. Ohjelma kannattaa rakentaa pienistä paloista kuten sopivista apufunktioista, ja kunkin palan toimivuus kannattaa varmistaa ennen kun alkaa rakentaa seuraavaa palaa. Jos näin ei tee, on aika varmaa että edessä on suuri kaaos.

Isompaa ohjelmaa rakentaessa on järkevää testailla ohjelman funktioita aluksi erillään pääohjelmasta. Yksi helppo tapa on tehdä myös pääohjelmasta oma funktio, esimerkiksi nimeltään `main`, jonka ohjelman funktioiden ulkopuoleinen osa käynnistää. Esimerkiksi seuraavaa tehtävää voitaisiin ruveta lähestymään näin:

```python
def main():
    pisteet = []
    # ohjelman koodi tänne

main()
```

Näin ohjelman apumetodeja on mahdollista testata ilman pääohjelman suorittamista:

```python
# apumetodi, joka laskee arvosanan pisteiden perusteella
def arvosana(pisteet):
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

## Tiedon välittäminen funktiosta toiseen

Jos ohjelma koostuu useista funktioista, nousee esiin kysymys, miten tietoa siirretään funktiosta toiseen.

Seuraavassa on esimerkki ohjelmasta, joka lukee käyttäjältä joukon kokonaislukuarvoja. Sen jälkeen ohjelma tulostaa arvot ja tekee niille vielä "analyysin". Ohjelma on jaettu kolmeen erilliseen funktioon:

```python
def lue_kayttajalta(maara: int):
    print(f"Syötä {maara} lukua:")
    luvut = []

    for i in range(maara):
        luku = int(input("Anna luku: "))
        luvut.append(luku)

    return luvut

def tulosta(luvut: list):
    print("Luvut ovat: ")
    for luku in luvut:
        print(luku)

def analysoi(luvut: list):
    keskiarvo = sum(luvut) / len(luvut)
    return f"Lukuja yhteensä {len(luvut)}, keskiarvo {keskiarvo}, pienin {min(luvut)} ja suurin {max(luvut)}"

# funktioita käyttävä "pääohjelma"
syotteet = lue_kayttajalta(5)
tulosta(syotteet)
analyysin_tulos = analysoi(syotteet)
print(analyysin_tulos)
```

Esimerkkisuoritus:

<sample-output>

Syötä 5 lukua:
Anna luku: **10**
Anna luku: **34**
Anna luku: **-32**
Anna luku: **99**
Anna luku: **-53**
Luvut ovat:
10
34
-32
99
-53
Lukuja yhteensä 5, keskiarvo 11.6, pienin -53 ja suurin 99

</sample-output>

Perusperiaatteena ohjelmassa on se, että pääohjelma "tallentaa" ohjelman käsittelemän tiedon eli tässä tapauksessa käyttäjän syöttämät luvut muuttujassa `syotteet`.

Jos lukuja on tarve käsitellä jossain funktiossa, ne välitetään sinne parametrina. Näin tapahtuu funktioissa `tulosta` ja `analysoi`. Jos taas funktio tuottaa tietoa, jota muut ohjelman osat tarvitsevat, palauttaa funktio datan `return`-komennolla. Näin tekevät käyttäjän syötteen lukeva funktio `lue_kayttajalta` sekä analyysin tekevä funktio `analysoi`.

Olisi periaatteessa mahdollista, että funktiot käyttäisivät suoraan "pääohjelman" globaalia muuttujaa `syotteet`. Se [ei kuitenkaan ole järkevää](https://softwareengineering.stackexchange.com/questions/148108/why-is-global-state-so-evil), sillä jos funktiot muuttamaan globaalia muuttujaa, voi ohjelmassa alkaa tapahtua jotain hallitsematonta, varsinkin kun funktioiden määrä kasvaa.

Tiedon välitys funktioihin ja niistä ulos on siis järkevintä hoitaa parametrien ja paluuarvojen avulla.

Jos haluaisimme tehdä edellisen esimerkin ohjelman siten, että sen pääohjelma eriytettäisiin omaan funktioon `main`, siirrettäisiin ohjelman käsittelemä data pääohjelmaa edustavan funktion sisäiseksi muuttujaksi:

```python
# pääohjelmaa edustava funktio
def main():
    syotteet = lue_kayttajalta(5)
    tulosta(syotteet)
    analyysin_tulos = analysoi(syotteet)

    print(analyysin_tulos)

# ohjelman käynnistys
main()
```

<programming-exercise name='Arvosanatilasto' tmcname='osa04-26_arvosanatilasto'>

Tässä tehtävässä toteutetaan ohjelma kurssin arvosanatilastojen tulostamiseen.

Ohjelmalle syötetään rivejä, jotka sisältävät yhden opiskelijan koepistemäärän sekä tehtyjen harjoitustehtävien määrän. Ohjelma tulostaa niiden perusteella arvosanoihin liittyviä tilastoja.

Koepisteet ovat kokonaislukuja väliltä 0–20. Tehtyjen harjoitustehtävien lukumäärät taas kokonaislukuja väliltä 0–100.

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

Tehtyjen harjoitustehtävien lukumäärästä saa _harjoituspisteitä_ siten, että vähintään 10 % tehtävämäärästä tuo yhden harjoituspisteen, 20 % tuo 2 harjoituspistettä, jne., ja 100 % eli 100 harjoitustehtävää tuo 10 harjoituspistettä. Harjoitustehtävistä saatava pistemäärä on kokonaisluku.

Kurssin arvosana määräytyy kokeen pistemäärän ja harjoitustehtävistä saatavien pisteiden summasta seuraavan taulukon mukaan:

koepisteet+harjoituspisteet   | arvosana
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

**Huom:** tässä tehtävässä (eikä missään muussakaan tehtävissä missä _ei_ erikseen pyydetä funktioiden toteuttamista) mitään koodia __ei tule sijoittaa__
`if __name__ == "__main__"`-lohkoon! Eli jos ohjelmasi toiminnallisuus on esim. funktiossa `main`, tulee sitä kutsuva koodi kirjoittaa normaaliin tapaan, eikä ym. if-lohkoon kuten on tehtävä niissä tehtävissä, joissa edellytetään funktioiden toteuttamista.

**Vihje:**

Ohjelman syöte koostuu riveistä joilla on peräkkäin kaksi numeroa:

<sample-output>

Koepisteet ja harjoitusten määrä: **15 87**

</sample-output>

Syöterivi pitää pilkkoa ensin kahtia ja muuttaa palaset kokonaisluvuksi `int`-funktiolla. Rivin pilkkominen onnistuu samaalla tavalla kun tehtävässä [Eka, toka ja vika sana](/osa-4/2-lisaa-funktioista). Siihen on olemassa myös hieman helpompi keino, merkkijonojen metodi `split`. Googlaa jos haluat, käytä esim. hakusanoja *python string split*.

<!-- **Huomaa** että tällä hetkellä Windowsissa on ongelmia joidenkin tehtävien testien suorittamisessa. Jos törmäät seuraavaan virheilmoitukseen

<img src="4_3_2.png" alt="Listan iterointi">

voit suorittaa testit lähettämällä ne palvelimelle valitsemalla testien suoritusnapin oikealla puolella olevasta symbolista avautuvasta TMC-valikosta _Submit solutions_.

Ongelman saa korjattua menemällä laajennuksen asennusvalikkoon ja muuttamalla "TMC Data" -kohdassa tehtävien sijainnin johonkin toiseen sijaintiin, jonka tiedostopolku on lyhempi, allaolevassa kuvassa nappi _change path_. Siirrossa saattaa kestää hetken, joten odotathan operaation päättymistä.

<img src="4_3_3.png" alt="Listan iterointi">

Ongelmaan pyritään saamaan parempi ratkaisu lähipäivinä. -->


</programming-exercise>


<quiz id="925f1715-d762-5e44-a812-be13bff1aa44"></quiz>

Vastaa lopuksi osion loppukyselyyn:

<quiz id="af22017f-32f0-551f-9756-297208f5de1a"></quiz>
