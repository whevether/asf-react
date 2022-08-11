import * as types from 'constants/types';
let initState = {
  list: [],
  listTotal: 0
};
export default function role(state = initState, action){
  switch(action.type){
    case types.GET_ROLE_LIST:
      if(action.payload){
        return {...state,list:action?.payload?.result,listTotal: action.payload.totalCount};
      }
      break;
    default:
      return state;
  }
}