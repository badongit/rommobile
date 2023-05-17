import { ILoginForm } from 'src/types/auth/login-form.type';
import { ILoginResponse } from 'src/types/auth/login-response.type';
import { IDetailEmployee } from 'src/types/employee/detail-employee.type';
import { IUpdatePassword } from 'src/types/employee/update-password.type';
import { IUpdateEmployee } from 'src/types/employee/update-profile.type';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_ME_START = 'GET_ME_START';
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS';
export const GET_ME_FAILED = 'GET_ME_FAILED';

export const UPDATE_ME_START = 'UPDATE_ME_START';
export const UPDATE_ME_SUCCESS = 'UPDATE_ME_SUCCESS';
export const UPDATE_ME_FAILED = 'UPDATE_ME_FAILED';

export const UPDATE_PASSWORD_START = 'UPDATE_PASSWORD_START';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILED = 'UPDATE_PASSWORD_FAILED';

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

export function getMe(onSuccess?: Function | null, onError?: Function | null) {
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

export function updateMe(
  payload: IUpdateEmployee,
  onSuccess?: Function | null,
  onError?: Function | null,
) {
  return {
    type: UPDATE_ME_START,
    payload: payload,
    onSuccess,
    onError,
  };
}

export function updatePassword(
  payload: IUpdatePassword,
  onSuccess?: Function | null,
  onError?: Function | null,
) {
  return {
    type: UPDATE_PASSWORD_START,
    payload: payload,
    onSuccess,
    onError,
  };
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
  updateMe,
  updatePassword,
};
export default authActions;
