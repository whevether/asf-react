import * as types from 'constants/types';
let initState = {
  list: [],
  listTotal: 0
};
export default function audio(state = initState,action){
  switch(action.type){
    case types.GET_AUDIO_LIST:
      if(action.payload){
        return {...state,list:action?.payload?.result,listTotal: action.payload.totalCount};
      }
      break;
    default:
      return state;
  }
}