import { combineReducers } from 'redux';
import authReducer from './auth/reducers';
import tableReducer from './table/reducers';

const rootReducers = combineReducers({
  ...authReducer,
  table: tableReducer,
});
export default rootReducers;
