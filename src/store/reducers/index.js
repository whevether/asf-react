import {combineReducers} from 'redux';
import common from './common';
import account from './account';
import audio from './audio';
import permission from './permission';
import menu from './menu';
import authApi from './authApi';
import editor from './editor';
const rootReducer = (history) => combineReducers({
    common: common,
    account: account,
    audio: audio,
    authApi: authApi,
    editor: editor,
    menu: menu,
    permission: permission,
    router: history
});
export default rootReducer;