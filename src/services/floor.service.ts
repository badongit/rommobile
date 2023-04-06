import api from './api';

const URL_PREFIX = '/floors';
export const floorService = {
  list: () => {
    const url = URL_PREFIX;
    return api.get(url, { isGetAll: 1, isGetTables: 1, sort: 'name' });
  },
};
