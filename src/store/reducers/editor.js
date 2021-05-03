import * as types from 'constants/types';
let initState = {
  list: null
};
export default function editor(state = initState, action){
  switch(action.type){
    case types.GET_EDITOR_LIST:
      if(action?.payload){
        return {...state,list:action?.payload};
      }
      break;
    default:
      return state;
  }
}