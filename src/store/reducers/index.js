import {combineReducers} from 'redux';
import common from './common';
import account from './account';
import audio from './audio';
import permission from './permission';
import menu from './menu';
import role from './role';
import authApi from './authApi';
import editor from './editor';
import tenancy from './tenancy';
import department from './department';
import translate from './translate';
import dictionary from './dictionary';
import post from './post';
import country from './country';
const rootReducer = () => combineReducers({
    common: common,
    account: account,
    audio: audio,
    tenancy: tenancy,
    department: department,
    translate: translate,
    dictionary: dictionary,
    post: post,
    role: role,
    authApi: authApi,
    editor: editor,
    menu: menu,
    permission: permission,
    country: country
});
export default rootReducer;