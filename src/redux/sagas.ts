import { fork } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import floorSagas from './floor/sagas';

export default function* rootSagas() {
  yield fork(authSagas);
  yield fork(floorSagas);
}
