// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en.json";
import esTranslation from "./es.json";

// Configure i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    es: {
      translation: esTranslation,
    },
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
