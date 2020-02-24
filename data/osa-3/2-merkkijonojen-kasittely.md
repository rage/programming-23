---
path: '/osa-3/2-merkkijonojen-kasittely'
title: 'Merkkijonojen käsittely'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat käyttää operaattoreita `+` ja `*` merkkijonojen kanssa
- Tiedät mitä tarkoittaa indeksointi
- Osaat selvittää merkkijonon pituuden
- Osaat poimia yksittäisiä merkkejä ja alijonoja merkkijonosta
- Osaat etsiä alijonon merkkijonosta
- Osaat korvata alijonon toisella alijonolla merkkijonossa

</text-box>

Aikaisemmissa osissa on opittu, että `+`-operaattori toimii eri tavalla merkkijonoja ja lukutyyppisiä arvoja käytettäessä. Kaksi merkkijonoa voidaan yhdistää toisiinsa (eli _katenoida_) käyttäen `+`-operaattoria:

```python

kerto = int(input("Minkä kertotaulun haluat? "))

# silmukkamuuttuja
luku = 1
while luku <= 10:
    # Kootaan merkkijono "pala" kerrallaan
    # Lukutyypit muunnetaan merkkijonoiksi str-funktiolla
    rivi = str(luku)
    rivi = rivi + " * "
    rivi = rivi + str(kerto)
    rivi = rivi + " = "
    rivi = rivi + str(luku * kerto)

    print(rivi)

    # Lopuksi muistetaan kasvattaa silmukkamuuttujaa
    luku = luku + 1

```

<sample-output>

Minkä kertotaulun haluat? **7**
1 * 7 = 7
2 * 7 = 14
3 * 7 = 21
4 * 7 = 28
5 * 7 = 35
6 * 7 = 42
7 * 7 = 49
8 * 7 = 56
9 * 7 = 63
10 * 7 = 70

</sample-output>

Myös `*`-operaattoria voidaan käyttää merkkijonojen yhteydessä. Jos toinen operandi kertolaskussa on merkkijono ja toinen kokonaisluku, saadan lopputulokseksi samaa merkkijonoa monistettuna annettu määrä. Esimerkiksi `5 * "abc" == "abcabcabcabcabc"`.

Esimerkkinä ohjelma, joka piirtää pyramidin:

```python

# Muuttuja n kertoo tyhjien välien määrän
n = 10

while n > 0:
    rivi = ""
    # Alkuun tyhjiä
    rivi = n * " "

    # ...ja sen jälkeen tähtiä
    rivi = rivi + (10 - n) * "**"

    print(rivi)

    # Vähennetään yhdellä
    n = n - 1

```

<sample-output>


         **
        ****
       ******
      ********
     **********
    ************
   **************
  ****************
 ******************

</sample-output>

## Merkkijonon pituus ja indeksointi

Merkkijonon pituuden voi palauttaa `len`-funktion avulla. Funktio palauttaa parametrina annetun merkkijonon merkkien määrän kokonaislukuna. Esimerkiksi `len("moi")` palauttaisi 3, koska merkkijonossa "moi" on kolme merkkiä. Seuraava esimerkki tulostaa käyttäjän syöttämän merkkijonon "alleviivattuna" muodostamalla alleviivauksen monistamalla merkkiä "-" syötteen pituuden mukaisen määrän:

```python
# Luetaan syöte
mjono = input("Anna merkkijono: ")

# Muodostetaan "alleviivaus":
alleviivaus = "-" * len(mjono)

# Tulostetaan
print(mjono)
print(alleviivaus)

```

<sample-output>

Anna merkkijono: Moi kaikki!
Moi kaikki!
-----------

</sample-output>

Pituuteen lasketaan mukaan kaikki merkkijonossa olevat merkit, ja myös välilyönti lasketaan merkiksi. Niinpä merkkijonon `Moi moi` pituus on seitsemän merkkiä.

Yksittäinen merkki merkkijonosta voidaan palauttaa operaattorin `[]` avulla. Operaattori kirjoitetaan merkkijonon (yleensä merkkijonomuuttujan) perään, ja hakasulkeiden väliin kirjoitetaan halutun merkin _indeksi_ eli järjestysluku.

Huomaa, että merkkien indeksointi alkaa nollasta: ensimmäinen merkki on siis indeksin nolla kohdalla, toinen indeksin 1 kohdalla jne.

KUVA


