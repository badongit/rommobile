import { call, put, takeLatest } from 'redux-saga/effects';
import { tableService } from 'src/services/table.service';
import { ResponsePayload } from 'src/types/common';
import { getListFailed, getListSuccess, TABLE_GET_LIST } from '../actions';

function* doGetListTable(action: any) {
  try {
    const response: ResponsePayload<any> = yield call(() =>
      tableService.list(action?.payload),
    );
    if (response.statusCode === 200) {
      const { data } = response;

      yield put(getListSuccess(data));

      if (action.onSuccess) {
        yield action.onSuccess(data);
      }
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    yield put(getListFailed(action.floorId));

    if (action.onError) {
      yield action.onError(error);
    }
  }
}

export default function* watchGetListTable() {
  yield takeLatest(TABLE_GET_LIST, doGetListTable);
}
