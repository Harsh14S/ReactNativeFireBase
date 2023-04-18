import english from '../languages/english.json';
import hindi from '../languages/hindi.json'
import gujarati from '../languages/gujarati.json';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: english,
      hi: hindi,
      gj: gujarati,
    }
  });

export default i18n;
