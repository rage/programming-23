---
path: '/osa-7/4-lisaa-moduuleja'
title: 'Lisää moduuleja'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion suoritettuasi:

- Tunnet lisää Pythonin mukana tulevia moduuleja
- Osaat etsiä tietoa moduuleista Pythonin dokumentaatiosta

</text-box>

TODO: Mitä moduuleja halutaan esitellä?

## Nettisivun sisällön lukeminen

Seuraava ohjelma näyttää nettisivun sisällön moduulin `urllib.request` avulla:

```python
from urllib.request import urlopen

with urlopen("https://www.mooc.fi/") as url:
    data = url.read()
    print(data)
```

Funktio `urlopen` avaa nettisivun luettavaksi samaan tapaan kuin tiedosto avataan. Tämän jälkeen metodi `read` lukee sivun sisällön (HTML-koodin) muuttujaan.

## Moduulien etsiminen

Pythonin dokumentaatiosta löytyy tietoa kaikista standardikirjaston moduuleista:

* https://docs.python.org/3/library/

Standardikirjaston lisäksi verkosta löytyy lukuisia vapaasti käytettäviä kirjastoja eri tarpeisiin. Joitakin yleisesti käytettyjä moduuleja on täällä:

* https://wiki.python.org/moin/UsefulModules

