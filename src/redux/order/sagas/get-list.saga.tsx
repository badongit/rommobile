import { call, put, takeLatest } from 'redux-saga/effects';
import { ResponsePayload } from 'src/types/common';
import { ORDER_GET_LIST, getListFailed, getListSuccess } from '../actions';
import { orderService } from 'src/services/order.service';

function* doGetList(action: any) {
  try {
    const response: ResponsePayload<any> = yield call(orderService.listAll);

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
  yield takeLatest(ORDER_GET_LIST, doGetList);
}
