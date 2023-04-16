import { fork } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import floorSagas from './floor/sagas';
import categorySagas from './category/sagas';
import orderSagas from './order/sagas';

export default function* rootSagas() {
  yield fork(authSagas);
  yield fork(floorSagas);
  yield fork(categorySagas);
  yield fork(orderSagas);
}
