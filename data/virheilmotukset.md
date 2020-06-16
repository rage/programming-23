---
path: "/virheilmoitukset"
title: "Yleiset virheilmoitukset"
hidden: false
information_page: true
banner: true
---

Tällä sivulla kerrotaan yleisistä virheilmoituksista joihin saatat törmätä kurssin aikana.

### Tehtävä ei mene läpi vaikka tuloste on identtinen esimerkkitulosteen kanssa

Tarkista että ohjelmasi ei tulosta ylimääräisiä välilyöntejä. Huomaa että print -funktion sisällä pilkku luo automaattisesti välilyönnin yhdistettävien merkkijonojen välille.

    print("Hello","World!")    # Tulostuu: Hello World!

### SyntaxError: bad input on line [rivinumero]

Tämä käsittää kaikki sellaiset kirjoitusvirheet koodissasi joita ei voida helposti luokitella. Esimerkiksi ehtolauseen päädystä saattaa puuttua kaksoipiste tai avainsana kuten 'while' on kirjoitettu väärin. Ainoa tapa ratkaista ongelma on tutkia virheilmoituksen antamaa riviä.

    luku1 = 1
    luku1 = 2
    if luku1 < luku2 # ':' puuttuu
        print('luku1 on suurempi')

Jos annettu rivi kuitenkin näyttää täysin oikealta on myös mahdollista että virhe on yhtä riviä alempana tai ylempänä. Tarkista siis myös nuo rivit.

### SyntaxError: unindent does not match any outer indentation level on line [rivinumero]

Koodisi on sisennetty hassusti virheilmoituksen antamalla rivillä. Sisennä rivi niin että se on linjassa muiden rivien kanssa.
Esimerkiksi seuraavanlainen koodi aiheuttaisi tämän virheen.

    if True:
        print('Oikein sisennetty')
       print('Väärin sisennetty')


### NameError: name [muuttuja] is not defined on line [rivinumero]

Koodisi yrittää viitata muuttujaan tai olioon jota ei ole olemassa tai sitä ei 'näy'. Voi olla että muuttujalle on unohdettu antaa arvo tai muuttujaa ei löydy kirjoitusvirheen takia (kts. esimerkki). Voi myös olla muuttuja on alustettu funktion sisällä ja siihen on yritetty viitata funktion ulkopuolella.

    henkilo = input('Kerro nimesi:')
    input('Kerro ikäsi':)

    print("Hei", henklo)             # virhe: henkilo kirjotettu henklo
    print("Olet", ika, "vuotias")    # virhe: muuttujaa ika ei ole määritelty

### TypeError: unsupported operand type(s) for Add: 'int' and 'str' on line [rivinumero]

Koodisi yrittää yhteenlaskea kokonaisluvun ja merkkijonon ilman että merkkijonoa on muunnettu kokonaisluvuksi. Muista siis muuntaa merkkijono `int()` metodilla. Voi myös olla että yritit yhdistää kokonaisluvun osaksi merkkijonoa. Tällöin sinun tulee muuntaa kokonaisluku merkkijonoksi `str()` metodilla.


    ika = input("Anna ikä:")
    nimi = input("Anna nimi:)

    printa(ika//2)   # virhe: muuttujaa ika ei ole muutettu kokonaisluvuksi

### TypeError: cannot concatenate 'str' and 'int' objects on line [rivinumero]

Katso ylempi kohta.
