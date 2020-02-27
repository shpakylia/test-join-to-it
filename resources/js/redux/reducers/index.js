import { combineReducers } from 'redux';
import userReducer from './userReduser';
import langsReducer from './langsReduser';

export default combineReducers({
    userReducer,
    langsReducer,
})
