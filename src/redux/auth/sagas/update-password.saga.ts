import { call, takeLatest } from 'redux-saga/effects';
import { authService } from 'src/services/auth.service';
import { ResponsePayload } from 'src/types/common';
import { UPDATE_ME_START } from '../actions';

function* doUpdatePassword(action: any) {
  try {
    const response: ResponsePayload<any> = yield call(() =>
      authService.changePassword(action?.payload),
    );

    if (response.statusCode === 200) {
      if (action.onSuccess) {
        yield action.onSuccess(response.data);
      }
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    if (action.onError) {
      yield action.onError(error);
    }
  }
}

export default function* watchUpdatePassword() {
  yield takeLatest(UPDATE_ME_START, doUpdatePassword);
}
