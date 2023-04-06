import { IListTableRequest } from 'src/types/table/list-table.request.type';
import { ILoginForm } from '../types/auth/login-form.type';
import { IRefreshTokenForm } from '../types/auth/refresh-token-form.type';
import api from './api';

const URL_PREFIX = '/tables';
export const tableService = {
  list: (params: IListTableRequest) => {
    const url = URL_PREFIX + '/';
    return api.get(url, {
      params,
    });
  },
};
