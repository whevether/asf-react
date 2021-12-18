import * as types from 'constants/types';
let initState = {
  list: [],
  listTotal: 0
};
export default function permission(state = initState,action){
  switch(action.type){
    case types.GET_PEERMISSION_LIST:
      if(action.payload){
        return {...state,list:action?.payload?.result,listTotal: action.payload.totalCount};
      }
      break;
    default:
      return state;
  }
}