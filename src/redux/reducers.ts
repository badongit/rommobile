import { combineReducers } from 'redux';
import authReducer from './auth/reducers';

const rootReducers = combineReducers({
  ...authReducer,
});
export default rootReducers;
