import {authService} from '../../../services/auth.service';
import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REFRESH_TOKEN_KEY, TOKEN_KEY} from '../../../constants/common';
import {ResponsePayload} from '../../../types/common';
import {loginFailed, loginSuccess, LOGIN_START} from '../actions';

function* doLogin(action: any) {
  try {
    const response: ResponsePayload<any> = yield call(() =>
      authService.login(action?.payload),
    );
    if (response.statusCode === 200) {
      const {data} = response;
      yield call(async () => {
        await AsyncStorage.setItem(TOKEN_KEY, data.accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      });

      yield put(loginSuccess(data));

      if (action.onSuccess) {
        yield action.onSuccess(data);
      }
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    yield put(loginFailed());

    if (action.onError) {
      yield action.onError(error);
    }
  }
}

export default function* watchLogin() {
  yield takeLatest(LOGIN_START, doLogin);
}
