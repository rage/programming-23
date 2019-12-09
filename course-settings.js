const courseSettings = {
  language: "fi",
  name: "Ohjelmoinnin MOOC 2020",
  siteUrl: "https://ohjelmointi-20.mooc.fi",
  subtitle: "Ohjelmoinnin alkeet kaikille, ilmaiseksi",
  slug: "ohjelmoinnin-mooc-2020",
  tmcCourse: "2020-ohjelmointi",
  quizzesId: "38240a7b-7e64-4202-91e2-91f6d46f6198-xx",
  tmcOrganization: "mooc",
  bannerPath: "banner.svg",
  sidebarEntries: [
    {
      title: "Tietoa kurssista",
      path: "/",
    },
    {
      title: "Arvostelu ja kokeet",
      path: "/arvostelu-ja-kokeet",
    },
    {
      title: "Mahdollisuus opinto-oikeuteen",
      path: "/opinto-oikeus",
    },
    { title: "Tukiväylät", path: "/tukivaylat" },
    {
      title: "Opettajille ja opinto-ohjaajille",
      path: "/opettajille",
    },
    {
      title: "Usein kysytyt kysymykset",
      path: "/usein-kysytyt-kysymykset",
    },
    { separator: true, title: "Ohjelmoinnin perusteet" },
  ],
  sidebarFuturePages: [
    { title: "Osa 1", tba: "14.12.2019" },
    { title: "Osa 2", tba: "28.12.2019" },
    { title: "Osa 3", tba: "11.1.2020" },
    { title: "Osa 4", tba: "25.1.2020" },
    { title: "Osa 5", tba: "1.2.2020" },
    { title: "Osa 6", tba: "8.2.2020" },
    { title: "Osa 7", tba: "15.2.2020" },
    { separator: true, title: "Ohjelmoinnin jatkokurssi" },
    { title: "Osa 8", tba: "1.3.2020" },
    { title: "Osa 9", tba: "8.3.2020" },
    { title: "Osa 10", tba: "15.3.2020" },
    { title: "Osa 11", tba: "22.3.2020" },
    { title: "Osa 12", tba: "29.3.2020" },
    { title: "Osa 13", tba: "12.4.2020" },
    { title: "Osa 14", tba: "19.4.2020" },
    { title: "Osa 15", tba: "19.4.2020" },
  ], // { title: "Osa 14", tba: "19.4.2019" },
  splitCourses: false,
}

module.exports = {
  default: courseSettings,
}
