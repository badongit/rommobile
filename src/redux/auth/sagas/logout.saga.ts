import {REFRESH_TOKEN_KEY, TOKEN_KEY} from '../../../constants/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, takeLatest} from 'redux-saga/effects';
import {logoutFailed, logoutSuccess, LOGOUT_START} from '../actions';

function* doLogout(action: any) {
  try {
    yield call(async () => {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    });

    yield put(logoutSuccess());

    // TODO: redirect login screen

    if (action.onSuccess) {
      yield action.onSuccess();
    }
  } catch (error) {
    yield put(logoutFailed());

    if (action.onError) {
      yield action.onError(error);
    }
  }
}

export default function* watchLogout() {
  yield takeLatest(LOGOUT_START, doLogout);
}
