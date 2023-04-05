import { ILoginForm } from '../types/auth/login-form.type';
import { IRefreshTokenForm } from '../types/auth/refresh-token-form.type';
import api from './api';

const URL_PREFIX = '/tables';
export const authService = {
  list: (params: ILoginForm) => {
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
};
