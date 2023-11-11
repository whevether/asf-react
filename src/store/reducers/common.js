import * as types from 'constants/types';
// 初始数据
let initData = {
  data: null,
  tenancyList: null,
  languageList: [],
  countryList: [],
  collapsed: false,
  loading: false
};
export default function common(state = initData, action) {
  switch (action.type) {
    case types.FETCH_USER_DATA:
      return { ...state, data: action.payload };
    case types.TOGGLE_MENU:
      return { ...state, collapsed: action.payload };
    case types.LOAD:
      return { ...state, loading: action.payload };
    case types.FETCH_TENANCY_LIST_DATA:
      return { ...state, tenancyList: action?.payload };
    case types.GET_TRANSLATE:
      return { ...state, languageList: action?.payload };
    case types.FETCH_COUNTRY_LIST_DATA:
      return { ...state, countryList: action?.payload };
    default:
      return state;
  }
}