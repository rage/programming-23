---
path: '/part-6/3-errors'
title: 'Handling errors'
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Tiedät, miten virheellisiä syötteitä voidaan käsitellä
- Tiedät, mitä tarkoitetaan poikkeuksella ohjelmoinnissa
- Tunnistat tyypillisiä poikkeuksia Pythonissa
- Osaat käsitellä poikkeuksia omissa ohjelmissa

</text-box>

Ohjelmointiin liittyvät virheet voidaan jakaa kahteen ryhmään:

1. Syntaksivirheet, jotka estävät ohjelman suorittamisen kokonaan
2. Suorituksen aikaiset virheet, jotka keskeyttävät ohjelman suorituksen

Ryhmän 1 virheet on yleensä helppoa korjata, koska Python-tulkki huomauttaa niistä, kun ohjelmaa yritetään suorittaa. Tällaisia virheitä ovat esimerkiksi puuttuva kaksoispiste silmukan alussa tai puuttuva lainausmerkki merkkijonon lopussa.

Ryhmän 2 virheet voivat olla hankalampia havaita, koska virhe voi tapahtua jossain vaiheessa ohjelman suorituksen aikana ja vain tietyissä tilanteissa. Ohjelma saattaa toimia yleensä hyvin mutta keskeytyä virheen takia jossain reunatapauksessa. Keskitymme seuraavaksi tällaisten virheiden käsittelyyn.

## Syötteiden tarkastaminen

Usein virhetilanteet ohjelmien suorituksen aikana liittyvät jotenkin virheelliseen syötteeseen. Esimerkkejä virheellisistä syötteistä ovat

* puuttuvat tai tyhjät arvot: esimerkiksi pituus nolla tai tyhjä merkkijono nimenä
* negatiiviset arvot: esimerkiksi –15 reseptin aineosan painona
* puuttuva tai väärän niminen tiedosto
* liian pienet tai liian suuret arvot
* väärä indeksi (esim. viittaaminen indeksiin 3 merkkijonossa "moi")
* väärän tyyppiset arvot, esimerkiksi merkkijono luvun sijasta

Useimpiin virheistä voidaan onneksi varautua ohjelmallisesti. Tarkastellaan esimerkkinä ohjelmaa, joka lukee käyttäjältä syötteenä tämän iän ja testaa, että se on sallituissa rajoissa (vähintään 0 ja korkeintaan 150):

```python
ika = int(input("Anna ikäsi: "))
if ika >= 0 and ika <= 150:
    print("Ikä kelpaa")
else:
    print("Virheellinen ikä")
```

<sample-output>

Anna ikäsi: **25**
Ikä kelpaa

</sample-output>

<sample-output>

Anna ikäsi: **-3**
Virheellinen ikä

</sample-output>

Syötteen tarkastamisessa (eli _validoinnissa_) ilmenee kuitenkin puutteita, jos syötteeksi annetaan esimerkiksi merkkijono:

<sample-output>

Anna ikäsi: **kakskytkolme**
ValueError: invalid literal for int() with base 10: 'kakskytkolme'

</sample-output>

Virhe johtuu siitä, että funktio `int` ei pysty muuttamaan merkkijonoa `kakskytkolme` kokonaisluvuksi. Tämän seurauksena ohjelman suoritus keskeytyy yllä olevaan virheilmoitukseen.

## Poikkeukset

Ohjelman suorituksen aikaisia virheitä kutsutaan _poikkeuksiksi_ (exception). Ohjelman koodissa on mahdollista varautua poikkeuksiin ja käsitellä ne ilman, että ohjelman suoritus keskeytyy.

Pythonissa poikkeukset käsitellään `try`- ja `except`-lauseilla. Ideana on, että mikäli `try`-lohkossa tapahtuu jokin poikkeus, Python tarkistaa, onko tälle poikkeukselle määritelty `except`-lohkoa. Mikäli on, suoritetaan tämä lohko ja suoritus jatkuu sen jälkeen normaalisti.

Muutetaan edellä esitettyä esimerkkiä siten, että ohjelma varautuu poikkeukseen `ValueError`:

```python
try:
    ika = int(input("Anna ikäsi: "))
except ValueError:
    ika = -1

if ika >= 0 and ika <= 150:
    print("Ikä kelpaa")
else:
    print("Virheellinen ikä")
```

<sample-output>

Anna ikäsi: **kakskytkolme**
Virheellinen ikä

</sample-output>

Ohjelmassa voidaan siis `try`-lauseella ilmoittaa, että seuraavan lohkon sisällä tapahtuva toiminta voi aiheuttaa virheen. Välittömästi `try`-lohkoa seuraavassa `except`-lauseessa ilmoitetaan, mihin virheeseen varaudutaan. Edellisessä esimerkissä varauduttiin ainoastaan virheeseen `ValueError` - jokin muu virhe olisi edelleen katkaissut ohjelman suorituksen.

Tässä tapauksessa virhetilanteessa muuttuja `ika` saa arvon -1, jolloin ohjelma tunnistaa oikein virheellisen iän, koska ehtona on, että ikä on vähintään 0.

Seuraava funktio `read_input_kokonaisluku` lukee käyttäjältä kokonaisluvun varautuen siihen, että käyttäjä antaa virheellisen syötteen. Funktio kysyy lukua uudestaan niin kauan, kunnes käyttäjä lopulta antaa kelvollisen luvun.

```python
def read_input_kokonaisluku():
    while True:
        try:
            syote = input("Syötä kokonaisluku: ")
            return int(syote)
        except ValueError:
            print("Virheellinen syöte")

luku = read_input_kokonaisluku()
print("Kiitos!")
print(luku, "potenssiin kolme on", luku**3)
```

<sample-output>

Syötä kokonaisluku: **kolme**
Virheellinen syöte
Syötä kokonaisluku: **aybabtu**
Virheellinen syöte
Syötä kokonaisluku: **5**
Kiitos!
5 potenssiin kolme on 125

</sample-output>

Joissain tilanteissa saattaa olla tarvetta varautua poikkeukseen, mutta poikkeuksen tapahtuessa riittää "ignoorata" se, eli jättää koko asia huomiomatta `except`-lohkossa.

Jos muuttaisimme edellistä esimerkkiä siten, että funktio hyväksyisi ainoastaan lukua 100 pienemmät kokonaisluvut, voisimme muuttaa toteutusta seuraavasti:

```python
def read_input_pieni_kokonaisluku():
    while True:
        try:
            syote = input("Syötä kokonaisluku: ")
            luku = int(syote)
            if luku < 100:
                return luku
        except ValueError:
            pass # tämä komento ei tee mitään

        print("Virheellinen syöte")

luku = read_input_pieni_kokonaisluku()
print(luku, "potenssiin kolme on", luku**3)
```

<sample-output>

Syötä kokonaisluku: **kolme**
Virheellinen syöte
Syötä kokonaisluku: **1000**
Virheellinen syöte
Syötä kokonaisluku: **5**
Kiitos!
5 potenssiin kolme on 125

</sample-output>

Nyt siis poikkeuksen käsittelevässä lohkossa on ainoastaan komento `pass`, joka ei tee mitään. Komento tarvitaan, sillä Python ei salli tyhjiä lohkoja.

<programming-exercise name='Reading input' tmcname='part06-17_read_input'>

Please write a function named `read_input`, which asks the user for input until the user types in an integer which falls within the bounds given as arguments to the function. The function should return the final valid integer value typed in by the user.

An example of the function in action:

```python
number = read_input("Please type in a number: ", 5, 10)
print("You typed in:", number)
```

<sample-output>

Please type in a number: **seven**
You must type in an integer between 5 and 10
Please type in a number: **-3**
You must type in an integer between 5 and 10
Please type in a number: **8**
You typed in: 8

</sample-output>

</programming-exercise>

## Tyypillisiä virheitä

Seuraavassa on listattu joitakin yleisiä virheitä ja syitä niiden ilmenemiselle:

**ValueError**

Tämä poikkeus voi johtua siitä, että funktion parametri on vääränlainen. Esimerkiksi kutsu `float("1,23")` tuottaa tämän poikkeuksen, koska Pythonissa desimaalierottimen tulee olla piste eikä pilkku.

**TypeError**

Tämä poikkeus tapahtuu, kun arvo on väärän tyyppinen. Esimerkiksi kutsu `len(10)` saa aikaan tämän poikkeuksen, koska funktio `len` haluaa parametrin, jolle voidaan laskea pituus (kuten merkkijonon tai listan).

**IndexError**

Tämä poikkeus tapahtuu, jos yritetään viitata indeksiin, jota ei ole olemassa. Esimerkiksi `"abc"[5]` aiheuttaa tämän poikkeuksen, koska merkkijonossa ei ole indeksiä 5.

**ZeroDivisionError**

Tämä poikkeus tapahtuu, jos yritetään jakaa nollalla. Yksi esimerkki on tilanne, jossa yritetään laskea listan arvojen keskiarvo kaavalla `sum(lista) / len(lista)`, mutta listan pituus on nolla.

**Tiedostojen poikkeukset**

Tiedostojen käsittelyssä voi tulla vastaan esimerkiksi poikkeukset **FileNotFoundError** (koetetaan lukea tiedostoa, jota ei ole olemassa), **io.UnsupportedOperation** (tiedosto on avattu tilassa, joka ei salli operaatiota) tai **PermissionError** (ohjelmalla ei ole oikeutta käsitellä tiedostoa).

## Useamman poikkeuksen käsittely

Yhtä `try`-lohkoa kohti voi olla useampia `except`-lauseita. Esimerkiksi seuraavassa ohjelmassa varaudutaan sekä poikkeukseen `FileNotFoundException` että `PermissionError`:

```python
try:
    with open("esimerkki.txt") as tiedosto:
        for rivi in tiedosto:
            print(rivi)
except FileNotFoundError:
    print("Tiedostoa esimerkki.txt ei löytynyt")
except PermissionError:
    print("Ei oikeutta avata tiedostoa esimerkki.txt")
```

Aina ei ole tarpeen eritellä tapahtuneita virheitä. Esimerkiksi juuri tiedostoa avatessa saattaa riittää, että tiedetään virheen tapahtuneen, muttei ole niin tärkeää tietää, miksi virhe tapahtui. Kaikki mahdolliset virheet voi käsitellä käyttämällä `except`-lausetta määrittelemättä poikkeuksen tyyppiä:

```python

try:
    with open("esimerkki.txt") as tiedosto:
        for rivi in tiedosto:
            print(rivi)
except:
    print("Tapahtui virhe tiedoston lukemisessa")

```

Huomaa, että tällaisessa tapauksessa `except`-lause käsittelee kaikki mahdolliset virheet, myös ohjelmoijan tekemät virheet lukuun ottamatta syntaksivirheitä, jotka estävät ohjelman suorittamisen.

Esimerkiksi seuraava ohjelma heittää aina poikkeuksen, koska muuttujan `tiedosto` nimi on kirjoitettu toisessa kohdassa väärin `tiedotso`.

```python
try:
    with open("esimerkki.txt") as tiedosto:
        for rivi in tiedotso:
            print(rivi)
except:
    print("Tapahtui virhe tiedoston lukemisessa.")
```

Tästä näkee, että `except` voi peittää varsinaisen virheen: tässä tapauksessa virheen syynä ei ole tiedoston käsittely vaan väärin kirjoitettu muuttuja.

## Poikkeusten välittyminen

Jos funktion sisällä tapahtuu poikkeus, jota ei käsitellä, poikkeus välitetään funktion kutsujalle. Tätä jatketaan, kunnes ollaan pääohjelman tasolla. Jos poikkeusta ei tässäkään käsitellä sopivalla `except`-lauseella, ohjelman suoritus katkeaa ja poikkeus yleensä tulostetaan ruudulle.

Esimerkiksi seuraavassa ohjelmassa funktiossa `testi` tapahtuva poikkeus käsitellään vasta pääohjelmassa:

```python
def testi(x):
    print(int(x) + 1)

try:
    luku = input("Anna luku: ")
    testi(luku)
except:
    print("Jotain meni pieleen")
```

<sample-output>

Anna luku: **kolme**
Jotain meni pieleen

</sample-output>

## Poikkeusten tuottaminen

Voimme myös tarvittaessa tuottaa poikkeuksen itse komennolla `raise`. Vaikka virheiden tuottaminen varta vasten voi aluksi tuntua oudolta ajatukselta, mekanismi on itse asiassa hyvinkin hyödyllinen.

Esimerkiksi jos teemme funktion, jolle annetaan virheellinen parametri, voimme ilmaista tämän poikkeuksen avulla. Tämä voi olla parempi tapa kuin esimerkiksi palauttaa jokin virhearvo tai tulostaa viesti ruudulle, koska funktion käyttäjä ei välttämättä huomaisi asiaa.

Seuraavassa esimerkissä funktio `kertoma` laskee parametrina annetun luvun kertoman (esimerkiksi luvun 5 kertoma on 1 * 2 * 3 * 4 * 5). Kuitenkin jos annettu luku on negatiivinen, funktio tuottaa poikkeuksen.

```python
def kertoma(n):
    if n < 0:
        raise ValueError("Negatiivinen syöte: " + str(n))
    k = 1
    for i in range(2, n + 1):
        k *= i
    return k

print(kertoma(3))
print(kertoma(6))
print(kertoma(-1))
```

<sample-output>

6
720
Traceback (most recent call last):
  File "testi.py", line 11, in <module>
    print(kertoma(-1))
  File "testi.py", line 3, in kertoma
    raise ValueError("Negatiivinen syöte: " + str(n))
ValueError: Negatiivinen syöte: -1

</sample-output>


<programming-exercise name='Parameter validation' tmcname='part06-18_parameter_validation'>

Please write a function named `new_person(name: str, age: int)`, which creates and returns a tuple containing the data in the arguments. The first element should be the name and the second the age.

If the values stored in the parameter variables are not valid, the function should throw a `ValueError` exception.

Invalid parameters in this case include:

* name is an empty string
* name contains less than two words
* name is longer than 40 characters
* age is a negative number
* age is greater than 150

</programming-exercise>

<programming-exercise name='Incorrect lottery numbers' tmcname='part06-19_incorrect_lottery_numbers'>

The file `lottery_numbers.csv` containts winning lottery numbers in the following format:

<sample-data>

week 1;5,7,11,13,23,24,30
week 2;9,13,14,24,34,35,37
...etc...

</sample-data>

Each line should contain a header `week x`, followed by seven integer numbers which are all between 1 and 39 inclusive.

The file has been corrupted. Lines in the file may contain the following kinds of errors (these exact lines may not be present in the file, but errors in a similar format will be):

The week number is incorrect:

<sample-data>

week zzc;1,5,13,22,24,25,26

</sample-data>

One or more numbers are not correct:

<sample-data>

week 22;1,**,5,6,13,2b,34

</sample-data>

Too few numbers:

<sample-data>

week 13;4,6,17,19,24,33

</sample-data>

The numbers are too small or large:

<sample-data>

week 39;5,9,15,35,39,41,105

</sample-data>

The same number appears twice:

<sample-data>

week 41;5,12,3,35,12,14,36

</sample-data>

Please write a function named `filter_incorrect()`, which creates a file called `correct_numbers.csv`. The file should contain only those lines from the original file which are in the correct format.

</programming-exercise>

<!---
A quiz to review the contents of this section:

<quiz id="69694e01-4c47-5b9d-8a00-b0d96a477dc7"></quiz>
-->
