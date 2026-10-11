import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 先 init，避免组件渲染时 useSuspense 默认 true 触发挂起
i18n.use(initReactI18next).init({
  lng: 'cn',
  fallbackLng: 'cn',
  resources: {},
  keySeparator: false,
  react: { useSuspense: false },
  interpolation: { escapeValue: false },
});

/** 后端 getLists 返回的 resources 注入已初始化实例，只保留中文和英文 */
const SUPPORTED_LANGS = new Set(['cn', 'en']);

export const initI18n = (resources) => {
  if (!resources) return;
  Object.entries(resources).forEach(([lng, ns]) => {
    if (!SUPPORTED_LANGS.has(String(lng).toLowerCase())) return;
    Object.entries(ns || {}).forEach(([namespace, bundle]) => {
      i18n.addResourceBundle(lng, namespace, bundle, true, true);
    });
  });
};

export default i18n;
