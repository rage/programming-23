---
path: '/osa-11/3-rekursio'
title: 'Rekursio'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät mitä tarkoitetaan rekursiolla
- Osaat kirjoittaa itse yksinkertaisen rekursiivisen funktion

</text-box>

Niin kuin aiemmin on huomattu, funktiot voivat kutsua toisia funktioita. Esimerkiksi

```python

def laske_positiiviset(luvut: list):
    return len([x for x in luvut if x >= 0])

def laske_negatiiviset(luvut: list):
    return len(luvut) - laske_positiiviset(luvut)

```

Kun funktiota voidaan kutsua myös toisesta funktiosta, on oletettavaa, että funktio voi kutsua myös itseään. Jos funktion syöte ei kuitenkaan muutu kutsukertojen välissä, kyseessä on "ikuinen" silmukka:

```python

def huuda(viesti: str):
    s = viesti + "!"
    # lisää huutomerkkejä?
    return huuda(viesti)

```

Funktion kutsuminen millä tahansa merkkijonolla antaa virheilmoituksen

<sample-output>

RecursionError: maximum recursion depth exceeded

</sample-output>

## Mitä rekursio tarkoittaa?

Virheilmoituksessakin mainitulla _rekursiolla_ tarkoitetaan sitä, että funktio kutsuu itseään. Rekursiossa funktion syötteen pitää kuitenkin muuttua niin, että jossain vaiheessa kutsuminen lopetetaan. Perusperiaate on sama kuin silmukoissa: jotta silmukka päättyisi, tulee ehtolausekkeeseen vaikuttavien muuttujien arvojen muuttua lohkon sisällä kohti tilannetta, jossa ehtolauseke on epätosi.

Tarkastellaan aluksi yksinkertaista funktiota, joka lisää listan loppuun nolla-alkioita niin kauan kun pituus on alle 10. Silmukan sijasta funktio kutsuukin itseään uudestaan, jos ehto ei täyty:

```python

def tayta_lista(luvut: list):
    """ Lisää listaan alkoita jos sen pituus on alle 10 """
    if len(luvut) < 10:
        luvut.append(0)
        # Kutsutaan uudestaaan
        tayta_lista(luvut)


if __name__ == "__main__":
    testi = [1,2,3,4]
    tayta_lista(testi)
    print(testi)

```

<sample-output>

[1, 2, 3, 4, 0, 0, 0, 0, 0, 0]

</sample-output>

Perinteisellä silmukalla ohjelma näyttäisi esimerkiksi tältä:

```python

def tayta_lista(luvut: list):
    """ Lisää listaan alkoita jos sen pituus on alle 10 """
    while len(luvut) < 10:
        luvut.append(0)

if __name__ == "__main__":
    testi = [1,2,3,4]
    tayta_lista(testi)
    print(testi)

```

Esimerkeistä huomataan, että perinteinen (eli _iteratiivinen_) lähestymistapa tuottaa lyhyemmän ja selkeämmän ohjelman.
Rekursiivinen ohjelma kuitenkin toimii ja tuottaa oikean lopputuloksen, koska funktio käsittelee jokaisella kutsukerralla samaa listaa viittauksen kautta.

<text-box variant="hint" name="Iteratiivinen vai rekursiivinen?">

Tietojenkäsittelytieteteessä erotetaan usein _iteratiiviset_ ja _rekursiiviset_ algoritmit. Iteratiivinen tarkoittaa kurssilla tähän asti yleensä käyttämäämme tapaa, jossa ratkaisu perustuu peräkkäisyyteen - yleensä siihen, että käsitellään rakenne silmukassa. Rekursiivinen tarkoittaa vaihtoehtoista tapaa, jossa funktio silmukan sijasta (tai lisäksi) kutsuu itseään muuttuvalla parametrin arvolla.

Mikä tahansa algoritmi on periaatteessa mahdollista toteuttaa sekä iteraiivisesti että rekursiivisesti, mutta monessa tapauksessa jompikumpi tapa on selvästi suoraviivaisempi tai tehokkaampi.

</text-box>

## Rekursio ja paluuarvot

Jos käsiteltävä olio on muuttumaton (eli mutatoitumaton), niin kuin vaikkapa merkkijono tai luku, pitäisi se myös palauttaa rekursiivisesta funktiosta. Tarkastellaan tätä tarkoitusta varten esimerkkiä, joka laskee kertoman rekursiivisesti:

```python

def kertoma(n: int):
    """ Funktio laskee positiivisen luvun n kertoman n!, eli n * (n-1) ... * 2 * 1 """
    if n < 2:
        # Lukujen 0 ja 1 kertoma on 1
        return 1

    # Kutsuu funktiota uudestaan
    return n * kertoma(n - 1)

if __name__ == "__main__":
    # Testataan
    for i in range(1, 7):
        print(f"Luvun {i} kertoma on {kertoma(i)}")

```

<sample-output>

Luvun 1 kertoma on 1
Luvun 2 kertoma on 2
Luvun 3 kertoma on 6
Luvun 4 kertoma on 24
Luvun 5 kertoma on 120
Luvun 6 kertoma on 720

</sample-output>

Jos funktion parametrin arvo on 0 tai 1, funktio palauttaa 1 (koska kertoman määritelmän mukaan lukujen 0 ja 1 kertoma on 1). Muuten funktio palauttaa erikoisen näköisen lausekkeen:

`n * kertoma(n - 1)`

Funktio siis kertoo parametrin n funktion itsensä kutsun palauttamalla arvolla. Tästä kertyvä _kutsupino_ on esitetty alla olevassa kuvassa:

KUVA

Olennaista funktion toimivuuden kannalta on, että funktiossa on määritelty ehto, jolla se ei kutsu itseään enää uudestaan. Tässä tapauksessa ehto on `n < 2`.

Tarkastellaan vielä toista funktiota, joka laskee Fibonaccin n:nen luvun rekursiivisesti. Fibonaccin lukusarjassa luku on aina kahden edellisen luvun summa. Niinpä sarjan alku näyttää tältä : 1, 1, 2, 3, 5, 8, 13, 21, 34 jne.

```python

def fibonacci(n: int):
    """ Funktio palauttaa n:nen luvun Fibonaccin sarjasta (1, 1, 2, 3, 5, 8 jne.); n > 0"""

    if n <= 2:
        # Kaksi ekaa lukua ovat ykkösiä
        return 1

    # Muuten luku saadaan laskemalla kaksi edellistä yhteen
    return fibonacci(n - 1) + fibonacci(n - 2)

# Testataan, että toimii
if __name__ == "__main__":
    for i in range(1, 11):
        print(f"Fibonaccin {i}. luku on {fibonacci(i)}")

```

<sample-output>

Fibonaccin 1. luku on 1
Fibonaccin 2. luku on 1
Fibonaccin 3. luku on 2
Fibonaccin 4. luku on 3
Fibonaccin 5. luku on 5
Fibonaccin 6. luku on 8
Fibonaccin 7. luku on 13
Fibonaccin 8. luku on 21
Fibonaccin 9. luku on 34
Fibonaccin 10. luku on 55

</sample-output>

Tällä kertaa lopetusehtona on, että luku on pienempi tai yhtäsuuri kuin 2, koska Fibonaccin kaksi ensimmäistä lukua ovat molemmat ykkösiä.

Miten algoritmi käytännössä oikein toimii?

Luvuille 1 ja 2 algoritmi palauttaa arvon 1 ehdon `n <= 2` mukaisesti.

Luvulle 3 algoritmi palauttaa arvon lausekkeesta `fibonacci(n - 1) + fibonacci(n - 2)`, eli käytännössä lausekkeen `fibonacci(2) + fibonacci(1)`. Koska edellisessä kohdassa huomattiin, että näiden molempien arvo on 1, palauttaa funktio siis arvon 2 (joka onkin kolmas Fibonaccin luku)

Luvulle 4 algoritmi palauttaa arvon lausekkeesta `fibonacci(3) + fibonacci(2)`, mikä edellisten kohtien perusteella on siis `2 + 1` eli 3.

Luvulle 5 algoritmi palauttaa arvon lausekkeesta `fibonacci(4) + fibonacci(3)`, mikä edellisten kohtien perusteella on siis `3 + 2` eli 5.

jne.

Rekursiivinen algoritmimme siis toimii, koska voimme todistaa jokaisen luvun kohdalla ohjelman toimivuuden aikaisempien lukujen perusteella.

## Häntärekursio

Edellisen kaltaisia rekursiivisia ratkaisuja nimitetään myös _häntärekursioksi (tail recursion)_. Tällä tarkoitetaan rekursiota, jossa vakiomuotoinen paluuarvo (esim kertoman tapauksessa arvo 1) aiheuttaa koko rekursiopinon "purkautumisen" ilman uusia rekursiivisia kutsuja. Häntärekursioesimerkit on usein helppo kirjoittaa myös iteratiivisesti. Alla on esitetty kertomafunktiosta sekä rekursiivinen että iteratiivinen versio:

```python
def kertoma_rekursiivinen(n):
    """ Funktio laskee luvun n kertoman n!, eli n * (n-1) ... * 2 * 1 """
    if n < 2:
        return 1

    if n == 2:
        return 2

    return n * kertoma_rekursiivinen(n - 1)

def kertoma_iteratiivinen(n):
    """ Funktio laskee luvun n kertoman n!, eli n * (n-1) ... * 2 * 1 """
    luku = 1
    while n >= 2:
        luku *= n
        n -= 1

    return luku
```

Kutsujan kannalta molempien funktioiden toiminnallisuus on samanlainen. Ohjelmoija voi itse päättää kumpi tapa tuntuu selkeämmältä.

Tietyissä tapauksissa rekursiivinen algoritmi on myös häntärekursion tapauksessa yleensä selkeämpi. Tarkastellaan tästä esimerkkinä puolitushakualgoritmia.

Puolitushaussa (eli _binäärihaussa_) yritetään löytää luonnollisessa järjestyksessä olevasta listasta annettu alkio. Luonnollinen järjestys tarkoittaa tässä yhteydessä esimerkiksi lukujen järjestystä pienimmästä suurimpaan tai nimiä aakkosjärjestyksessä.

Puolitushaun ideana on, että tarkastellaan aina listan keskimmäistä alkiota. Jos
- keskimmäinen alkio on etsitty alkio, palautetaan tieto siitä, että alkio löytyi
- keskimmäinen alkio on pienempi kuin etsittävä alkio, rajataan haku listan jälkimmäiselle puolikkaalle
- keskimmäinen alkio on suurempi kuin etsittävä alkio, rajataan haku listan ensimmäiiselle puolikkaalle

Jos lista on tyhjä, palautetaan tieto siitä, että alkiota ei löytynyt.

Seuraava kuva havainnollistaa puolitushaun etenemistä:

KUVA

Rekursiivinen algoritmi puolitushaulle:

```python

def puolitushaku(lista: list, alkio: int):
    """ Funktio palauttaa True tai False sen mukaan löytyykö alkio listasta """
    # Jos lista on tyhjä, ei löydy
    if not lista:
        return False

    # Keskimmäinen alkio
    keskialkio = lista[len(lista) // 2]

    # Jos on etsittävä
    if keskialkio == alkio:
        return True

    # Jos pienempi, etsi jälkipuoliskolta
    if keskialkio < alkio:
        return puolitushaku(lista[len(lista) // 2 + 1 : ], alkio)

    # Täytyy olla suurempi, etsitään alkupuoliskolta
    return puolitushaku(lista[ : len(lista) // 2], alkio)

if __name__ == "__main__":
    # Testataan
    lista = [1, 2, 4, 5, 7, 8, 11, 13, 14, 18]
    print(puolitushaku(lista, 2))
    print(puolitushaku(lista, 13))
    print(puolitushaku(lista, 6))
    print(puolitushaku(lista, 15))

```

<sample-output>

True
True
False
False

</sample-output>

Puolitushakualgoritmi on helppo toteuttaa Pythonissa, koska listojen pilkkominen [:] -operaattorin avulla on vaivatonta.

Jos verrataan puolitushakua _peräkkäishakuun_, algoritmien tehokkuus erottuu selvästi. Perättäishaussa alkiota lähdetään etsimään listan alusta, ja listaa käydään läpi yksi alkio kerrallaan kunnes alkio on löytynyt tai on päästy listan loppuun. Jos listan pituus on miljoona alkiota, tarvitaan perättäishaussa koko listan läpikäyntiin miljoona askelta - puolitushaussa askelia tarvitaan 20.

# Esimerkki: Binääripuu







