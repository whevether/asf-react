import {use} from 'i18next';
import { initReactI18next } from 'react-i18next';
export const useI18n = (data) => {
  return use(initReactI18next)
    .init({
      lng: 'zh',
      debug: true,
      resources: data
    });
};