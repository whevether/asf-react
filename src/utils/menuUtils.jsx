import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: ['https://at.alicdn.com/t/c/font_2384333_l1re7fqml8.js'],
});

/**
 * 将后端返回的权限菜单转换为 ProLayout MenuDataItem 格式
 * 后端字段: title, translate, menuUrl, icon, children, type, menuHidden, enable, externalLink
 */
export function convertBackendMenuToPro(menus, t) {
  if (!menus || !Array.isArray(menus)) return [];
  const renderName = (item) => {
    if (item?.translate && typeof t === 'function') return t(item.translate);
    return item.title || '';
  };
  return menus
    .filter((item) => item?.title && item?.type !== 3 && item?.menuHidden !== 1)
    .map((item) => {
      const path = item?.externalLink || item?.menuUrl || '';
      const isExternal = /^https?:\/\//.test(path);
      const proItem = {
        key: item.menuUrl || item.id,
        path: isExternal ? undefined : path,
        name: renderName(item),
        locale: item.translate || false,
        icon: item.icon ? <IconFont type={item.icon} /> : undefined,
        disabled: !item.enable,
        hideInMenu: item?.menuHidden === 1,
        target: isExternal ? '_blank' : undefined,
      };
      if (item?.children?.length) {
        const childMenus = convertBackendMenuToPro(item.children, t);
        if (childMenus.some((c) => c.name || c.path)) {
          proItem.children = childMenus;
          proItem.routes = childMenus; // ProLayout/route-utils 可能用 routes
        }
      }
      return proItem;
    })
    .filter((item) => item.name || item.children?.length);
}

/** 打平菜单为 { path, name } 列表，用于多标签页根据 path 取标题 */
export function flattenMenuItems(menus) {
  if (!menus || !Array.isArray(menus)) return [];
  const result = [];
  function walk(list) {
    for (const item of list) {
      const path = item.path || item.key;
      if (path && item.name) result.push({ path, name: item.name, key: item.key });
      if (item.children?.length) walk(item.children);
    }
  }
  walk(menus);
  return result;
}
