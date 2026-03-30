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
        return { ...state, list: action?.payload?.result, listTotal: action.payload.totalCount };
      }
      break;
    case types.GEI_MEMBER_ALBUM_LIST:
      if (action.payload) {
        return { ...state, albumList: action?.payload?.result, albumTotal: action.payload.totalCount };
      }
      break;
    case types.GEI_MEMBER_TRENDS_LIST:
      if (action.payload) {
        return { ...state, trendsList: action?.payload?.result, trendsTotal: action.payload.totalCount };
      }
      break;
    case types.GEI_MEMBER_SOCIALIZE_LIST:
      if (action.payload) {
        return { ...state, socializeList: action?.payload?.result, socizlizeTotal: action.payload.totalCount };
      }
      break;
    case types.GEI_MEMBER_TAGS_LIST:
        if (action.payload) {
          return { ...state, tagsList: action?.payload?.result, tagsTotal: action.payload.totalCount };
        }
        break;
    default:
      return state;
  }
}