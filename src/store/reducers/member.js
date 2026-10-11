import * as types from 'constants/types';
let initState = {
  list: [],
  listTotal: 0,
  albumList: [],
  albumTotal: 0,
  trendsList: [],
  trendsTotal: 0,
  socializeList: [],
  socizlizeTotal: 0,
  tagsList: [],
  tagsTotal: 0
};
export default function member(state = initState, action) {
  switch (action.type) {
    case types.GEI_MEMBER_LIST:
      if (action.payload) {
        return { ...state, list: action?.payload?.data, listTotal: action.payload.totalCount };
      }
      break;
    case types.GEI_MEMBER_ALBUM_LIST:
      if (action.payload) {
        return { ...state, albumList: action?.payload?.data, albumTotal: action.payload.totalCount };
      }
      break;
    case types.GEI_MEMBER_TRENDS_LIST:
      if (action.payload) {
        return { ...state, trendsList: action?.payload?.data, trendsTotal: action.payload.totalCount };
      }
      break;
    case types.GEI_MEMBER_SOCIALIZE_LIST:
      if (action.payload) {
        return { ...state, socializeList: action?.payload?.data, socizlizeTotal: action.payload.totalCount };
      }
      break;
    case types.GEI_MEMBER_TAGS_LIST:
        if (action.payload) {
          return { ...state, tagsList: action?.payload?.data, tagsTotal: action.payload.totalCount };
        }
        break;
    default:
      return state;
  }
}