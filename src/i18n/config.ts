import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import arTranslations from './locales/ar.json';
import esTranslations from './locales/es.json';
import deTranslations from './locales/de.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
      ar: { translation: arTranslations },
      es: { translation: esTranslations },
      de: { translation: deTranslations },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Handle RTL for Arabic
i18n.on('languageChanged', (lng) => {
  if (lng === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', lng);
  }
});

// Set initial direction
if (i18n.language === 'ar') {
  document.documentElement.setAttribute('dir', 'rtl');
  document.documentElement.setAttribute('lang', 'ar');
} else {
  document.documentElement.setAttribute('dir', 'ltr');
  document.documentElement.setAttribute('lang', i18n.language);
}

export default i18n;

