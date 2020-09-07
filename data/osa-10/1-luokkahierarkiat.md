---
path: '/osa-10/1-luokkahierarkiat'
title: 'Luokkahierarkiat'
hidden: false
---

<text-box variant='learningObjectives' name='Oppimistavoitteet'>

Tämän osion jälkeen

- Tiedät mitä tarkoitetaan perinnällä
- Osaat kirjoittaa luokkia jotka perivät jonkin toisen luokan
- Tiedät miten eri piirteet periytyvät

</text-box>

Joskus tulee vastaan tilanne, jossa luokan toimintaa olisi hyvä pyrkiä erikoistamaan, mutta vain osalle olioista. Tarkastellaan esimerkkinä tilannetta, jossa meillä on kaksi luokkaa - Opiskelija ja Opettaja. Yksinkertaistuksen vuoksi luokista on jätetty pois kaikki asetus- ja havainnointimetodit.

```python

class Opiskelija:

    def __init__(self, nimi: str, opnro: str, sposti: str, opintopisteet: str):
        self.nimi = nimi
        self.opnro = opnro
        self.sposti = sposti
        self.opintopisteet = opintopisteet

class Opettaja:

    def __init__(self, nimi: str, sposti: str, huone: str, opetusvuosia: int):
        self.nimi = nimi
        self.sposti = sposti
        self.huone = huone
        self.opetusvuosia = opetusvuosia

```

Yksinkertaistetustakin esimerkistä huomataan, että luokilla on yhteisiä piirteitä - tässä tapauksessa nimi ja puhelinnumero. Itse asiassa yhteisiä piirteitä olisi oikeasti paljon enemmänkin (esimerkiksi henkilötunnus, sähköpostiosoite ja osoite). Monessa tilanteessa olisi hyvä, jos yhteisiä piirteitä voitaisin käsitellä yhdellä operaatiolla: oletetaan tilanne, jossa koulun sähköpostitunnus muuttuu. Toki voitaisiin kirjoittaa kaksi käsittelfunktiota...

```python

def korjaa_email(o: Opiskelija):
    o.sposti = o.sposti.replace(".com", ".edu")

def korjaa_email2(o: Opettaja):
    o.sposti = o.sposti.replace(".com", ".edu")

```

...mutta saman koodin toistaminen kahteen kertaan olisi hassua. Olisi siis hyvä, jos molempien luokkien mukaisia olioita voitaisiin käsitellä yhdessä nipussa.

 Luokat kuitenkin sisältävät myös piirteitä, joita toisella luokalla ei ole. Sen takia luokkien yhdistäminen ei tunnu järkevältä.

 ## Perintä

 Ratkaisu löytyy olio-ohjelmoinnin tekniikasta nimeltä _perintä_. Perinnällä tarkoitetaan sitä, että luokka _perii_ piirteet joltain toiselta luokalta. Näiden perittyjen piirteiden rinnalle luokka voi sitten toteuttaa uusia piirteitä.

 Opettaja- ja Opiskelija-luokilla voisi olla yhteinen _yliluokka_ `Henkilo`:

 ```python

class Henkilo:

    def __init__(self, nimi: str, sposti: str):
        this.nimi = nimi
        this.sposti = sposti

 ```

 Luokassa on toteutettu siis henkilöön liittyvät piirteet. Nyt luoka Opiskelija ja Opettaja voivat _periä_ luokan ja lisätä perittyjen ominaisuuksien rinnalle uusia piirteitä:

 Perintä tapahtuu kirjoittamalla luokan nimen perään perittävän luokan nimi sulkuihin:

 ```python

class Henkilo:

    def __init__(self, nimi: str, sposti: str):
        this.nimi = nimi
        this.sposti = sposti

    def vaihda_spostitunniste(self, uusi_tunniste: str):
        vanha = self.sposti.split("@")[1]
        self.sposti = self.sposti.replace(vanha, uusi_tunniste)

class Opiskelija(Henkilo):

    def __init__(self, nimi: str, opnro: str, sposti: str, opintopisteet: str):
        self.nimi = nimi
        self.opnro = opnro
        self.sposti = sposti
        self.opintopisteet = opintopisteet

class Opettaja(Henkilo):

    def __init__(self, nimi: str, sposti: str, huone: str, opetusvuosia: int):
        self.nimi = nimi
        self.sposti = sposti
        self.huone = huone
        self.opetusvuosia = opetusvuosia

# Testi
if __name__ == "__main__":
    olli = Opiskelija("Olli Opiskelija", "1234", "olli@example.com", 0)
    olli.vaihda_spostitunniste("example.edu")
    print(olli.sposti)

    outi = Opettaja("Outi Ope", "outi@example.fi", "A123", 2)
    outi.vaihda_spostitunniste("example.ex")
    print(outi.sposti)

 ```

 Koska sekä Opiskelija että Opettaja perivät luokan Henkilo, molemmilla on käytössään Henkilo-luokassa määritellyt piirteet, mukaanlukien metodi `vaihda_spostitunniste`.

 Tarkastellaan vielä toista esimerkkiä, jossa luokka







