import {combineReducers} from 'redux';
import home from './home';
import login from './login';
import { connectRouter } from 'connected-react-router';
const rootReducer = (history) => combineReducers({
    home: home,
    login: login,
    router: connectRouter(history)
});
export default rootReducer;