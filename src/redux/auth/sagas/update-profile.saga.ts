import { call, takeLatest } from 'redux-saga/effects';
import { employeeService } from 'src/services/employee.service';
import { ResponsePayload } from 'src/types/common';
import { UPDATE_ME_START } from '../actions';

function* doUpdateMe(action: any) {
  try {
    const response: ResponsePayload<any> = yield call(() =>
      employeeService.update(action?.payload),
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

export default function* watchUpdateMe() {
  yield takeLatest(UPDATE_ME_START, doUpdateMe);
}
