import { ILoginForm } from 'src/types/auth/login-form.type';
import { ILoginResponse } from 'src/types/auth/login-response.type';
import { IDetailEmployee } from 'src/types/employee/detail-employee.type';

export const TABLE_GET_LIST = 'table/get-list';
export const TABLE_GET_LIST_SUCCESS = 'table/get-list-success';

export function login(
  payload: ILoginForm,
  onSuccess?: Function,
  onError?: Function,
) {
  return {
    type: LOGIN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

export function loginSuccess(payload: ILoginResponse) {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
}

export function loginFailed() {
  return { type: LOGIN_FAILED };
}

export function logout(onSuccess?: Function, onError?: Function) {
  return {
    type: LOGOUT_START,
    onSuccess,
    onError,
  };
}

export function logoutSuccess() {
  return { type: LOGOUT_SUCCESS };
}

export function logoutFailed() {
  return { type: LOGOUT_FAILED };
}

export function getMe(onSuccess: Function, onError: Function) {
  return {
    type: GET_ME_START,
    onSuccess,
    onError,
  };
}

export function getMeSuccess(payload: IDetailEmployee) {
  return {
    type: GET_ME_SUCCESS,
    payload: payload,
  };
}

export function getMeFailed() {
  return { type: GET_ME_FAILED };
}

const authActions = {
  login,
  loginSuccess,
  loginFailed,
  logout,
  logoutSuccess,
  logoutFailed,
  getMe,
  getMeSuccess,
  getMeFailed,
};
export default authActions;
