import React from "react"
import Helmet from "react-helmet"
import Layout from "../templates/Layout"
import Container from "../components/Container"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import { withLoginStateContext } from "../contexes/LoginStateContext"

const Credits = () => (
  <Layout>
    <Container>
      <Helmet title="Kiitokset ja materiaalista" />
      <h1>Kiitokset ja materiaalista</h1>
      <p>
        Kurssin on tehnyt Helsingin yliopiston{" "}
        <OutboundLink
          href="https://www.helsinki.fi/en/researchgroups/data-driven-education"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agile Education Research -tutkimusryhmä
        </OutboundLink>
        .
      </p>
      <h2>Kurssimateriaali</h2>

      <p>
        Kurssimateriaalin ja tehtävien tekijät ovat Erkki Kaila, Antti Laaksonen
        ja Matti Luukkainen. Muutama kurssin tehtävistä on Arto Hellaksen (né
        Vihavainen) käsialaa.
      </p>
      <p>
        Kurssin materiaali on lisensoitu{" "}
        <OutboundLink
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creative Commons BY-NC-SA 4.0
        </OutboundLink>{" "}
        -lisenssillä, joten voit käyttää ja levittää sitä vapaasti, kunhan
        alkuperäisten tekijöiden nimiä ei poisteta. Jos teet muutoksia
        materiaaliin ja haluat levittää muunneltua versiota, se täytyy
        lisensoida samalla lisenssillä. Materiaalien käyttö kaupalliseen
        tarkoitukseen on ilman erillistä lupaa kielletty.
      </p>

      <h2>Kurssilla käytössä oleva teknologia</h2>

      <p>
        Kurssisivuston ovat tehneet{" "}
        <OutboundLink
          href="https://github.com/nygrenh"
          target="_blank"
          rel="noopener noreferrer"
        >
          Henrik Nygren
        </OutboundLink>{" "}
        ja{" "}
        <OutboundLink
          href="https://github.com/redande"
          target="_blank"
          rel="noopener noreferrer"
        >
          Antti Leinonen
        </OutboundLink>
        . Helsingin yliopiston{" "}
        <OutboundLink
          href="https://www.helsinki.fi/en/researchgroups/data-driven-education"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agile Education Research -tutkimusryhmä
        </OutboundLink>{" "}
        on luonut kurssilla käytetyn ohjelmointitehtävien palautusympäristön (
        <OutboundLink
          href="https://tmc.mooc.fi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Test My Code
        </OutboundLink>
        ) ja sen liitännäiset ohjelmointiympäristöihin, kurssimateriaalissa
        olevan kyselyjärjestelmän ja muut toiminnot.
      </p>
    </Container>
  </Layout>
)

export default withLoginStateContext(Credits)
