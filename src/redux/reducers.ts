import { combineReducers } from 'redux';
import authReducer from './auth/reducers';
import floorReducer from './floor/reducers';
import categoryReducer from './category/reducers';
import orderReducer from './order/reducers';

const rootReducers = combineReducers({
  ...authReducer,
  floor: floorReducer,
  category: categoryReducer,
  order: orderReducer,
});
export default rootReducers;
