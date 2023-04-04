import { ILoginForm } from '../types/auth/login-form.type';
import { IRefreshTokenForm } from '../types/auth/refresh-token-form.type';
import api from './api';

const AUTH_URL_PREFIX = '/auth';
export const authService = {
  login: (params: ILoginForm) => {
    const url = AUTH_URL_PREFIX + '/login';
    return api.post(url, params);
  },
  refreshToken: (params: IRefreshTokenForm) => {
    const url = AUTH_URL_PREFIX + '/token';
    return api.post(url, params);
  },
  getMe: () => {
    const url = AUTH_URL_PREFIX + '/me';
    return api.get(url);
  },
};
