import { call, put, takeLatest } from 'redux-saga/effects';
import { categoryService } from 'src/services/category.service';
import { ResponsePayload } from 'src/types/common';
import { CATEGORY_GET_LIST, getListFailed, getListSuccess } from '../actions';

function* doGetList(action: any) {
  try {
    const response: ResponsePayload<any> = yield call(categoryService.list);

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
  yield takeLatest(CATEGORY_GET_LIST, doGetList);
}
