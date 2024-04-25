import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import transEN from './assets/i18n/task/en/en.json';
import transESCO from './assets/i18n/post/es-CO/es.json';
import transESEC from './assets/i18n/post/es-EC/es.json';

const resources = {
  en: {
    translation: transEN
  },
  'es-CO': {
    translation: transESCO
  },
  'es-EC': {
    translation: transESEC
  }
};

i18n
  .use(initReactI18next) // Pasar react-i18next a la instancia
  .init({
    resources,
    fallbackLng: 'es-CO',
    debug: false,
    interpolation: {
      escapeValue: false, // No escapar valores
      format: function(value, format, lng) {
        if (format === 'number') {
          return new Intl.NumberFormat(lng, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
        }
        return value;
      }
    }
  });

export default i18n;
