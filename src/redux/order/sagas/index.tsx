import { all } from 'redux-saga/effects';
import watchGetList from './get-list.saga';

export default function* orderSagas() {
  yield all([watchGetList()]);
}
