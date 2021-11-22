---
path: '/part-11/3-recursion'
title: 'Recursion'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät mitä tarkoitetaan rekursiolla
- Osaat kirjoittaa itse yksinkertaisen rekursiivisen funktion

</text-box>

Kuten aiemmin on huomattu, funktiot voivat kutsua toisia funktioita. Esimerkiksi näin:

```python
def tervehdi(nimi : str):
    print("Moikka,", nimi)

def tervehdi_monesti(nimi : str, kerrat : int):
    for i in range(kerrat):
        tervehdi(nimi)
```

Samaan tapaan funktio voi kutsua myös itseään. Jos kuitenkaan funktion parametrit eivät muutu kutsukertojen välissä, tästä syntyy "ikuinen silmukka":

```python
def tervehdi(nimi : str):
    print("Moikka,", nimi)
    tervehdi(nimi)
```

Tällöin funktion kutsuminen millä tahansa my_stringlla antaa virheilmoituksen:

<sample-output>

RecursionError: maximum recursion depth exceeded

</sample-output>

## Mitä rekursio tarkoittaa?

Virheilmoituksessakin mainitulla _rekursiolla_ tarkoitetaan sitä, että funktio kutsuu itseään. Rekursiossa funktion parametrien pitää kuitenkin muuttua niin, että jossain vaiheessa kutsuminen lopetetaan. Perusperiaate on sama kuin silmukoissa: jotta silmukka ei jatkuisi ikuisesti, siinä tulee olla päättymisehto, joka toteutuu jossain vaiheessa.

Tarkastellaan aluksi yksinkertaista funktiota, joka lisää listan loppuun 0-alkioita niin kauan kuin listan pituus on alle 10. Silmukan sijasta funktio kutsuukin itseään uudestaan, jos ehto ei täyty:

```python
def tayta_lista(numbers: list):
    """ Lisää listaan alkoita jos sen pituus on alle 10 """
    if len(numbers) < 10:
        numbers.append(0)
        # Kutsutaan uudestaaan
        tayta_lista(numbers)


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

def tayta_lista(numbers: list):
    """ Lisää listaan alkoita jos sen pituus on alle 10 """
    while len(numbers) < 10:
        numbers.append(0)

if __name__ == "__main__":
    testi = [1,2,3,4]
    tayta_lista(testi)
    print(testi)

```

Esimerkeistä huomataan, että perinteinen (eli _iteratiivinen_) lähestymistapa tuottaa lyhyemmän ja selkeämmän ohjelman. Rekursiivinen ohjelma kuitenkin toimii ja tuottaa oikean lopputuloksen, koska funktio käsittelee jokaisella kutsukerralla samaa listaa viittauksen kautta.

<text-box variant="hint" name="Iteratiivinen vai rekursiivinen?">

Tietojenkäsittelytieteteessä erotetaan usein _iteratiiviset_ ja _rekursiiviset_ algoritmit. Iteratiivinen tarkoittaa kurssilla tähän asti yleensä käyttämäämme tapaa, jossa ratkaisu perustuu peräkkäisyyteen – yleensä siihen, että käsitellään rakenne silmukassa. Rekursiivinen tarkoittaa vaihtoehtoista tapaa, jossa funktio silmukan sijasta (tai lisäksi) kutsuu itseään muuttuvilla parametrien arvoilla.

Mikä tahansa algoritmi on periaatteessa mahdollista toteuttaa sekä iteratiivisesti että rekursiivisesti, mutta monessa tapauksessa jompikumpi tapa soveltuu selkeästi paremmin ongelman ratkaisemiseen.

</text-box>

<programming-exercise name='Add numbers to a list' tmcname='part11-13_add_numbers_to_list'>

Please write a _recursive function_ named `add_numbers_to_list(numbers: list)`. The function takes a list of numbers as its argument, and adds new numbers to the list until the length of the list is divisible by five. Each number added to the list should be one greater than the last number in the list.

The function must call itself recursively. Please see the example below.

```python
numbers = [1,3,4,5,10,11]
add_numbers_to_list(numbers)
print(numbers)
```

<sample-output>

[1, 3, 4, 5, 10, 11, 12, 13, 14, 15]

</sample-output>

</programming-exercise>

## Rekursio ja paluuarvot

Rekursiivisella funktiolla voi olla myös palautusarvo. Tarkastellaan tätä tarkoitusta varten esimerkkiä, joka laskee kertoman rekursiivisesti:

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

Jos funktion parametrin arvo on 0 tai 1, funktio palauttaa 1 (koska kertoman määritelmän mukaan lukujen 0 ja 1 kertoma on 1). Muuten funktio palauttaa lausekkeen `n * kertoma(n - 1)`. Tämä tarkoittaa, että parametri `n` kerrotaan funktion itsensä kutsun palauttamalla arvolla.

Olennaista funktion toimivuuden kannalta on, että funktiossa on määritelty ehto, jolla se ei kutsu itseään enää uudestaan. Tässä tapauksessa ehto on `n < 2`.

[Visualisaattori](http://www.pythontutor.com/visualize.html#mode=edit) on oivallinen väline rekursiota käyttävien ohjelmien tutkimiseksi.

Laajennetaan kertoman laskevaa funktiota niin, että se käyttää apumuuttujia:

```python
def kertoma(n: int):
    if n < 2:
        return 1

    edellisen_luvun_kertoma = kertoma(n - 1)
    luvun_n_kertoma = n * edellisen_luvun_kertoma
    return luvun_n_kertoma
    
kertoma(5)
```

Kokeile, miten [visualisaattori](http://www.pythontutor.com/visualize.html#code=def%20kertoma%28n%3A%20int%29%3A%0A%20%20%20%20if%20n%20%3C%202%3A%0A%20%20%20%20%20%20%20%20return%201%0A%0A%20%20%20%20edellisen_luvun_kertoma%20%3D%20kertoma%28n%20-%201%29%0A%20%20%20%20luvun_n_kertoma%20%3D%20n%20*%20edellisen_luvun_kertoma%0A%20%20%20%20return%20luvun_n_kertoma%0A%20%20%20%20%0Akertoma%285%29&cumulative=false&curInstr=5&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false) demonstroi rekursion etenemisen.

Hieman normaalista poiketen visualisaattorissa kutsupino "kasvaa" alaspäin. Suorituksessa oleva funktiokutsu on kutsupinon alimpana oleva sinisellä merkitty "lohko", jolla on omat muuttujansa. Hetken kuluttua palautettava result on laskettu muuttujaan `luvun_n_kertoma`.

<img src="11_1_1.png">

Tarkastellaan vielä toista funktiota, joka laskee halutun Fibonaccin luvun rekursiivisesti. Fibonaccin lukujonossa luku on aina kahden edellisen luvun summa. Niinpä jonon alku näyttää tältä: 1, 1, 2, 3, 5, 8, 13, 21, 34.

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

Tällä kertaa lopetusehtona on, että luku on pienempi tai yhtä suuri kuin 2, koska Fibonaccin kaksi ensimmäistä lukua ovat molemmat ykkösiä.

Miten algoritmi käytännössä oikein toimii?

Luvuille 1 ja 2 algoritmi palauttaa arvon 1 ehdon `n <= 2` mukaisesti.

Luvulle 3 algoritmi palauttaa arvon lausekkeesta `fibonacci(n - 1) + fibonacci(n - 2)`, eli käytännössä lausekkeen `fibonacci(2) + fibonacci(1)`. Koska edellisessä kohdassa huomattiin, että näiden molempien arvo on 1, palauttaa funktio siis arvon 2 (joka onkin kolmas Fibonaccin luku)

Luvulle 4 algoritmi palauttaa arvon lausekkeesta `fibonacci(3) + fibonacci(2)`, mikä edellisten kohtien perusteella on siis `2 + 1` eli 3.

Luvulle 5 algoritmi palauttaa arvon lausekkeesta `fibonacci(4) + fibonacci(3)`, mikä edellisten kohtien perusteella on siis `3 + 2` eli 5.

jne.

Rekursiivinen algoritmimme siis toimii, koska voimme todistaa jokaisen luvun kohdalla ohjelman toimivuuden aikaisempien lukujen perusteella.

<programming-exercise name='Rekursiivinen summa' tmcname='part11-14_recursive_sum'>

Please write a recursive function named `recursive_sum(number: int)` which calculates the sum `1 + 2 + ... + number`. The exercise template contains the following outline:

```python
def recursive_sum(number: int):
    # if the number is 1, there is nothing else to add
    if number <= 1:
        return number

    # fill in the rest of the function
```

Some examples:

```python
result = recursive_sum(3)
print(result)

print(recursive_sum(5))
print(recursive_sum(10))
```

<sample-output>

6
15
55

</sample-output>

</programming-exercise>

<programming-exercise name='Balance all the brackets' tmcname='part11-15_balanced_brackets'>

The exercise template contains the function `balanced_brackets` which takes a string as its argument. It checks if the _round_ brackets, or parentheses, within the string are balanced. That is, for each opening bracket `(` there should be a closing bracket `)`, and all pairs of brackets should be matched in order, i.e. the bracket pairs must not be crossed.

```python
def balanced_brackets(my_string: str):
    if len(my_string) == 0:
        return True
    if not (my_string[0] == '(' and my_string[-1] == ')'):
        return False

    # remove first and last character
    return balanced_brackets(my_string[1:-1])

ok = balanced_brackets("(((())))")
print(ok)

# there is one closing bracket too many, so this produces False
ok = balanced_brackets("()())")
print(ok)

# this one starts with a closing bracket, False again
ok = balanced_brackets(")()")
print(ok)

# this produces False because the function only handles entirely nested brackets
ok = balanced_brackets("()(())")
print(ok)
```

<sample-output>

True
False
False
False

</sample-output>

Please expand the function so that it also works with square brackets `[]`. The function should also ignore all characters which are not brackets `()` or `[]`. The different types of brackets must be matched correctly in order.

Please have a look at the examples below::

```python
ok = balanced_brackets("([([])])")
print(ok)

ok = balanced_brackets("(python version [3.7]) please use this one!")
print(ok)

# this is no good, the closing bracket doesn't match
ok = balanced_brackets("(()]")
print(ok)


# different types of brackets are mismatched
ok = balanced_brackets("([bad egg)]")
print(ok)
```

NB: the function only has to handle entirely nested brackets. The string `(x + 1)(y + 1)` produes `False` as the brackets are not nested.

<sample-output>

True
True
False
False


</sample-output>

</programming-exercise>

## Binäärihaku

Binäärihaussa yritetään löytää järjestyksessä olevasta listasta annettu alkio. Järjestys tarkoittaa tässä yhteydessä esimerkiksi lukujen järjestystä pienimmästä suurimpaan tai my_stringja aakkosjärjestyksessä.

Binäärihaun ideana on, että tarkastellaan aina listan keskimmäistä alkiota. Jos
- keskimmäinen alkio on etsitty alkio, palautetaan tieto siitä, että alkio löytyi
- keskimmäinen alkio on pienempi kuin etsittävä alkio, rajataan haku listan jälkimmäiselle puolikkaalle
- keskimmäinen alkio on suurempi kuin etsittävä alkio, rajataan haku listan ensimmäiselle puolikkaalle

Jos lista on tyhjä, palautetaan tieto siitä, että alkiota ei löytynyt.

Seuraava kuva havainnollistaa binäärihaun etenemistä, kun etsitään listasta lukua 24:

<img src="11_3_1.png">

Rekursiivinen algoritmi binäärihaulle:

```python
def binaarihaku(lista: list, alkio: int, vasen : int, oikea : int):
    """ Funktio palauttaa True tai False sen mukaan, onko listalla alkiota """
    # Jos hakualue on tyhjä, ei löydy
    if vasen > oikea:
        return False

    # Lasketaan hakualueen keskikohta
    keski = (vasen+oikea)//2

    # Jos keskellä on etsittävä alkio
    if lista[keski] == alkio:
        return True

    # Jos pienempi, etsi jälkipuoliskolta
    if lista[keski] < alkio:
        return binaarihaku(lista, alkio, keski+1, oikea)
    # Muuten täytyy olla suurempi, etsitään alkupuoliskolta
    else:
        return binaarihaku(lista, alkio, vasen, keski-1)


if __name__ == "__main__":
    # Testataan
    lista = [1, 2, 4, 5, 7, 8, 11, 13, 14, 18]
    print(binaarihaku(lista, 2, 0, len(lista)-1))
    print(binaarihaku(lista, 13, 0, len(lista)-1))
    print(binaarihaku(lista, 6, 0, len(lista)-1))
    print(binaarihaku(lista, 15, 0, len(lista)-1))
```

<sample-output>

True
True
False
False

</sample-output>

Tässä funktiolle `binaarihaku` annetaan neljä parametria: viite listaan, etsittävä alkio sekä hakualueen vasen ja oikea kohta. Alussa hakualue on koko lista, jolloin vasen kohta on 0 ja oikea kohta on `len(lista)-1`. Funktio tarkastaa hakualueen keskellä olevan alkion ja joko ilmoittaa, että haluttu alkio löytyi, tai jatkaa hakua vasemmasta tai oikeasta puoliskosta.

Jos verrataan binäärihakua _peräkkäishakuun_, algoritmien tehokkuus erottuu selvästi. Peräkkäishaussa alkiota lähdetään etsimään listan alusta ja listaa käydään läpi yksi alkio kerrallaan, kunnes alkio on löytynyt tai on päästy listan loppuun. Jos listan pituus on miljoona alkiota, tarvitaan perättäishaussa koko listan läpikäyntiin miljoona askelta, mutta binäärihaussa askelia tarvitaan vain 20.
