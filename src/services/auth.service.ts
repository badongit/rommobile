import { IUpdatePassword } from 'src/types/employee/update-password.type';
import { ILoginForm } from '../types/auth/login-form.type';
import { IRefreshTokenForm } from '../types/auth/refresh-token-form.type';
import api from './api';

const URL_PREFIX = '/auth';
export const authService = {
  login: (params: ILoginForm) => {
    const url = URL_PREFIX + '/login';
    return api.post(url, params);
  },
  refreshToken: (params: IRefreshTokenForm) => {
    const url = URL_PREFIX + '/token';
    return api.post(url, params);
  },
  getMe: () => {
    const url = URL_PREFIX + '/me';
    return api.get(url);
  },
  changePassword: (body: IUpdatePassword) => {
    const url = URL_PREFIX + '/password';
    return api.put(url, body);
  },
};
