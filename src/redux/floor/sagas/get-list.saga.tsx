import { call, put, takeLatest } from 'redux-saga/effects';
import { floorService } from 'src/services/floor.service';
import { ResponsePayload } from 'src/types/common';
import { FLOOR_GET_LIST, getListFailed, getListSuccess } from '../actions';

function* doGetList(action: any) {
  try {
    const response: ResponsePayload<any> = yield call(floorService.list);

    if (response.statusCode === 200) {
      yield put(getListSuccess(response.data));

      if (action.onSuccess) yield action.onSuccess(response.data);
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    yield put(getListFailed());

    if (action.onError) yield action.onError(error);
  }
}

export default function* watchGetList() {
  yield takeLatest(FLOOR_GET_LIST, doGetList);
}
