import {combineReducers} from 'redux';
import common from './common.js';
import account from './account.js';
import audio from './audio.js';
import permission from './permission.js';
import menu from './menu.js';
import role from './role.js';
import authApi from './authApi.js';
import editor from './editor.js';
import tenancy from './tenancy.js';
import department from './department.js';
import translate from './translate.js';
import dictionary from './dictionary.js';
import post from './post.js';
import country from './country.js';
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