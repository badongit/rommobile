import api from './api';

const URL_PREFIX = '/categories';
export const categoryService = {
  list: () => {
    const url = URL_PREFIX;
    return api.get(url, { isGetAll: 1, isGetDishes: 1, sort: 'createdAt' });
  },
};
