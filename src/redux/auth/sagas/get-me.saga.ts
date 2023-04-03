import {authService} from '../../../services/auth.service';
import {ResponsePayload} from '../../../types/common';
import {call, put, takeLatest} from 'redux-saga/effects';
import {getMeFailed, getMeSuccess, GET_ME_START} from '../actions';

function* doGetMe(action: any) {
  try {
    const response: ResponsePayload<any> = yield call(authService.getMe);

    if (response.statusCode === 200) {
      yield put(getMeSuccess(response.data));

      if (action.onSuccess) {
        yield action.onSuccess(response.data);
      }
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    yield put(getMeFailed());

    if (action.onError) {
      yield action.onError(error);
    }
  }
}

export default function* watchGetMe() {
  yield takeLatest(GET_ME_START, doGetMe);
}
