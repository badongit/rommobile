import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';
import { TOKEN_KEY } from 'src/constants/common';
import { validateStatus } from 'src/utils/common';

const BASE_URL = process.env.REACT_APP_HOST + '/api';
const HEADERS_MULTIPLE_PART = {
  'Content-Type': 'multipart/form-data; boundary=something',
};
const REFRESH_TOKEN_URL = '/auth/token';
const ATTEMPT_RETRY = 4;

export const createInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      contentType: 'application/json',
      accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  instance.interceptors.request.use(
    async function (config) {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (config.url !== REFRESH_TOKEN_URL && token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    function (error) {
      // các trường hợp lỗi 5xx, network xử lí ở đây
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      if (validateStatus(response.status)) {
        return response.data;
      } else {
        // log loi o day
      }
    },
    async function (error) {
      const response = error.response;
      const { config } = response;
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (
        response.status === 403 &&
        config &&
        (config.retry || 0) <= ATTEMPT_RETRY &&
        config.url !== REFRESH_TOKEN_URL &&
        refreshToken
      ) {
        config.retry = config.retry ? config.retry + 1 : 1;

        const response = await refreshAccessToken();
        if (response.status === 200) {
          axios.defaults.headers.common['Authorization'] =
            response.data.accessToken;
          await AsyncStorage.setItem(TOKEN_KEY, response.data.accessToken);
        }
        return instance(config);
      } else if (response.status === 401) {
        await startLogout();
      } else {
        return Promise.reject(error);
      }
    },
  );

  return instance;
};

const createApi = (instance: AxiosInstance) => ({
  instance,

  // custom post method
  post: (endpoints: string, params: any) => {
    return instance
      .post(endpoints, params, {
        validateStatus: status => validateStatus(status),
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response || error;
      });
  },

  // custom post multiple part
  postMultiplePart: (endpoints: string, params: any) => {
    return instance
      .post(endpoints, params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: status => validateStatus(status),
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response || error;
      });
  },

  // custom get method
  get: (endpoints: string, params: any = {}) => {
    return instance
      .get(endpoints, {
        params: params,
        validateStatus: status => validateStatus(status),
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response || error;
      });
  },

  // custom put method
  put: (endpoints: string, params: any) => {
    return instance
      .put(endpoints, params, {
        validateStatus: status => validateStatus(status),
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response || error;
      });
  },

  // custom patch method
  patch: (endpoints: string, params: any) => {
    return instance
      .patch(endpoints, params, {
        validateStatus: status => validateStatus(status),
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response || error;
      });
  },

  // custom delete method
  delete: (endpoints: string, params: any) => {
    return instance
      .delete(endpoints, {
        params: params,
        validateStatus: status => validateStatus(status),
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response || error;
      });
  },
});

const instance = createInstance(BASE_URL);

const startLogout = async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
};

export const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  return instance.post(REFRESH_TOKEN_URL, {
    refreshToken,
  });
};

const api = createApi(instance);

export default api;
