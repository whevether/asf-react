import * as types from 'constants/types';
let initState = {
  list: null,
  listTotal: 0
};
export default function center(state=initState,action){
  switch(action.type){
    case types.GET_CENTER_ACCOUNT_LIST:
      return {...state,list:action?.payload?.result,listTotal: action.payload.totalCount};
    default:
      return state;
  }
}