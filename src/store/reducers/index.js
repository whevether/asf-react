import {combineReducers} from 'redux';
import common from './common';
import login from './login';
import account from './account';
import permission from './permission';
import editor from './editor';
import { connectRouter } from 'connected-react-router';
const rootReducer = (history) => combineReducers({
    common: common,
    login: login,
    account: account,
    editor: editor,
    permission: permission,
    router: connectRouter(history)
});
export default rootReducer;