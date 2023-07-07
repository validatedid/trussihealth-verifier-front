import { I18n } from "i18n-js";
import en from "./locales/en";
import es from "./locales/es";

const browserLang = navigator.language;
let initalLocale = "en";

if (browserLang.includes("es")) initalLocale = "es";
if (browserLang.includes("en")) initalLocale = "en";

const i18n = new I18n(
  { en, es },
  {
    defaultLocale: localStorage.getItem("locale") || initalLocale,
    locale: localStorage.getItem("locale") || initalLocale,
  }
);

const changeLanguage = (lang: string) => {
  localStorage.setItem("locale", lang);
  window.location = window.location;
};

export { i18n as I18n, changeLanguage };
