import authenticatedReducer from './isAuthenticate';
import userReducer from './setUser';
import {combineReducers} from 'redux';

const appReducers = combineReducers({
    isAuthenticate: authenticatedReducer,
    setUser: userReducer,
});

export default appReducers;