import * as types from 'constants/types';
let initState = {
  list: [],
  listTotal: 0
};
export default function editor(state = initState, action){
  switch(action.type){
    case types.GET_EDITOR_LISTTITLE:
      if(action?.payload){
        return {...state,list:action?.payload};
      }
      break;
    case types.GET_EDITOR_LIST:
      if(action?.payload){
        return {...state,list:action?.payload?.result,listTotal: action?.payload?.totalCount};
      }
      break;
    default:
      return state;
  }
}