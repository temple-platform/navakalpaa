/*
  Site configuration. Edit the values below; no build step is needed.

  - name / shortName / tagline / domain / url are filled into every element that carries
    a matching data-site attribute (for example data-site="name").
  - contactEmail is intentionally empty. Add the real address here and every contact
    button and link on the site switches on. Until then the pages show a polite
    "coming soon" state and no mailto link is created.

  This file is loaded in the <head> of every page, so it also marks the page as
  JavaScript-enabled before first paint.
*/
(function () {
  document.documentElement.classList.add("js");

  window.NAVAKALPAA_SITE = {
    name: "NAVAKALPAA TECH LLP",
    shortName: "Navakalpaa",
    tagline: "Ideas for a brighter everyday.",
    domain: "navakalpaa.com",
    url: "https://navakalpaa.com",
    contactEmail: "",
    mailSubject: "A problem worth rethinking",
  };
})();
