import { all } from 'redux-saga/effects';
import watchGetListTable from './get-list.saga';

export default function* tableSagas() {
  yield all([watchGetListTable()]);
}
