---
path: '/osa-3/6-yhteenveto
title: 'Osan 3 Yhteenveto ja lisää tehtäviä'
hidden: false
---

Tässä osiossa käsiteltiin seuraavat asiat:

### Silmukat

* Python toistolause on muotoa

```python

while <ehtolauseke>:
    <lohko>

```

Aina ennen lohkon suorittamista tarkistetaan ehtolauseke. Mikäli lauseke saa arvon True, suoritetaan lohko, ja tarkistetaan ehto uudestaan. Kun ehto saa arvon False, suoritus jatkuu lohkon jälkeisestä lauseesta.


### Merkkijonojen käsittely

* Merkkijono on nollasta tai useammassa _merkistä_ koostuva rakenne
* `+`-operaattorilla voidaan yhdistää eli _katenoida_ kaksi merkkijonoa yhdeksi uudeksi merkkijonoksi:
* `*`-operaattorilla voidaan _monistaa_ merkkijonoa. Syntaksi `mjono * n` monistaa merkkijonoa `mjono` positiivisen kokonaisluvun n  osoittaman määrän peräkkäin
* Merkkijonon _pituus_ voidaan palauttaa `len`-funktiolla. Kutsu `len(mjono)` palauttaa merkkijonon mjono merkkien määrän
* Merkkijonosta voidaan poimia _yksittäinen merkki_ hakasulkeiden avulla. Lauseke `mjono[indeksi]` palauttaa yhden merkin indeksin `indeksi` kohdalta
* Merkkijonojen _indeksointi_ alkaa nollasta - ensimmäinen merkki on indeksin 0 kohdalla, toinen indeksin 1 jne.
* Merkkijonon viimeinen merkki on siis indeksin pituus - 1 kohdalla. Pythonissa viimeiseen merkkiin voi viitata myös negativiisen indeksin avullla: `mjono(-1)` palauttaa merkkijonon viimeisen merkin.
* Alijono voidaaan palauttaa samoin hakasulkeiden avulla. Lauseke `mjono[alku:loppu]` palauttaa alijonon indeksien `alku` ja `loppu` välillä. Indeksin `alku` kohdalla oleva merkki on mukana alijonossa, mutta indeksin `loppu` kohdalla oleva ei ole.
* Alijonon ensimmäinen esiintymä voidaan palauttaa metodin `find` avulla. Lauseke `mjono.find(alijono)` palauttaa sen indeksin, jonka kohdalta `alijono` löytyy merkkijonosta `mjono` tai -1, jos alijonoa ei löydy


### break- ja continue-lauseet

* `break`-lauseella voidaan _katkaista nykyisen silmukan suoritus välittömästi_.
* `continue`-lauseella voidaan katkaista silmukan _nykyisen kierroksen suoritus välittömästi_ ja palata takaisin tarkastelemaan silmukan ehtolauseketta.

### Omat funktiot

* Omat funktot määritellään muodossa

```python

def <funktion_nimi>():
    <lohko>

```

* Funktiota kutsutaan sen nimellä. Jos on esim. määritelty oma funktio `tulosta_moi`, sitä kutsutaan muodossa `tulosta_moi()`:

```python

def tulosta_moi():
    print("Moi")

tulosta_moi()

```



## Lisää tehtäviä
