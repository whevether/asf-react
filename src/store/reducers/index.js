import {combineReducers} from 'redux';
import home from './home';
import login from './login';
const rootReducer = combineReducers({
    home: home,
    login: login
});
export default rootReducer;