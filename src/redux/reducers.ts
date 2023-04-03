import {combineReducers} from 'redux';
import authReducer from './auth/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
});
export default rootReducers;
