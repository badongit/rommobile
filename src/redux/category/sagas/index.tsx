import { all } from 'redux-saga/effects';
import watchGetList from './get-list.saga';

export default function* categorySagas() {
  yield all([watchGetList()]);
}
