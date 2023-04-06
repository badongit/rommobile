import { combineReducers } from 'redux';
import authReducer from './auth/reducers';
import floorReducer from './floor/reducers';

const rootReducers = combineReducers({
  ...authReducer,
  floor: floorReducer,
});
export default rootReducers;
