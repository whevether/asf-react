import * as types from 'constants/types';
let initState = {
  list: null,
  listTotal: 0
};
export default function account(state = initState, action){
  switch(action.type){
    case types.GET_ACCOUNT_LIST:
      if(action.payload){
        let data = action.payload.result.map(item => {
          return{
            key: item.accounts.id,
            id: item.accounts.id,
            avatar: item.accounts.avatar,
            name: item.accounts.name,
            username: item.accounts.username,
            telephone: item.accounts.telephone,
            email: item.accounts.email,
            sex: item.accounts.sex,
            status: item.accounts.status,
            loginLocation: item.accounts.loginLocation,
            loginIp: item.accounts.loginIp,
            createTime: item.accounts.createTime,
            departmentName: item.department.name
          };
        });
        return {...state,list:data,listTotal: action.payload.totalCount};
      }
      break;
    default:
      return state;
  }
}