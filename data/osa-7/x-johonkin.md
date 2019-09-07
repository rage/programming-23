---
path: '/osa-7/x-jotain'
title: 'TODO: jotain'
hidden: false
---

Kun olio -- eli viittaustyyppisten muuttujien -- lisätään listalle, listalle kopioidaan viite. Tämä tarkoittaa sitä, että *olion sisäisestä tilasta ei luoda kopiota*, vaan listalle lisätään viite olemassa olevaan olioon.

Alla olevassa esimerkissä luodaan ensin olio `juhana`, joka lisätään listalle. Tämän jälkeen listalle lisätään kaksi muuta oliota. Seuraavaksi `juhana`-olion metodia `vanhene` kutsutaan. Lopulta jokaista listalla olevaa oliota vanhennetaan.

```java
ArrayList<Henkilo> henkilot = new ArrayList<>();

Henkilo juhana = new Henkilo("Juhana");
henkilot.add(juhana);

henkilot.add(new Henkilo("Matti"));
henkilot.add(new Henkilo("Martin"));

// juhana vanhenee 2 vuotta
juhana.vanhene();
juhana.vanhene();

for (Henkilo henkilo: henkilot) {
    henkilo.vanhene();
}

for (Henkilo henkilo: henkilot) {
    System.out.println(henkilo);
}
```

<sample-output>

Juhana, ikä 3 vuotta
Matti, ikä 1 vuotta
Martin, ikä 1 vuotta

</sample-output>

Listalle on kopioituna viitteet olioihin. Yllä olevassa esimerkissä muuttujan `juhana` arvona on sama viite kuin listalla, joten "Juhanan" ikä muuttuu myös jos hän vanhenee listan ulkopuolella.


<img src="../img/drawings/henkilot-ja-juhana.png"/>

Tämä viittaustyyppisiin muuttujiin liittyvä ilmiö -- eli se, että kun olio annetaan metodille parametrina, sen viite kopioituu metodin käyttöön -- toistuu kaikkialla. Alla olevassa esimerkissä on toteutettu luokkametodi (luokkametodeilla on *static*-määre), joka kasvattaa sille parametrina annetun henkilön ikää.

```java
public static void vanhenna(Henkilo henkilo) {
    henkilo.vanhene();
}
```

```java
Henkilo juhana = new Henkilo("Juhana");
System.out.println(juhana);
vanhenna(juhana);
System.out.println(juhana);
```

<sample-output>

Juhana, ikä 0 vuotta
Juhana, ikä 1 vuotta

</sample-output>


<programming-exercise name='Lisää ja poista' tmcname='osa06-Osa06_01.LisaaJaPoista'>

TODO: tee tehtävä

</programming-exercise>


## Lista oliomuuttujana
