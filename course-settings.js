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
  sidebarFuturePages: [], // { title: "Osa 14", tba: "19.4.2019" },
  splitCourses: false,
}

module.exports = {
  default: courseSettings,
}
