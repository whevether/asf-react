import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/** 多语言配置由后端传入，在 RootLayout 中 getTranslatetList() 后调用 initI18n(res) 初始化 */
export const initI18n = (data) => {
  return i18n.use(initReactI18next).init({
    lng: 'cn',
    debug: false,
    resources: data,
    react: { useSuspense: false },
    interpolation: { escapeValue: false },
  });
};

export default i18n;
