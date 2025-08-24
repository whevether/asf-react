import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
export const useI18n = (data) => {
  return i18n.use(initReactI18next)
    .init({
      lng: 'cn',
      debug: true,
      resources: data
    });
};