export const CATEGORY_GET_LIST = 'category/get-list';
export const CATEGORY_GET_LIST_SUCCESS = 'category/get-list-success';
export const CATEGORY_GET_LIST_FAILED = 'category/get-list-failed';
export const CATEGORY_GET_DISH_MAP = 'category/get-dish-map';

export function getList(onSuccess?: any, onError?: any) {
  return {
    type: CATEGORY_GET_LIST,
    onSuccess,
    onError,
  };
}

export function getListSuccess(payload: any) {
  return {
    type: CATEGORY_GET_LIST_SUCCESS,
    payload: payload,
  };
}

export function getListFailed() {
  return {
    type: CATEGORY_GET_LIST_FAILED,
  };
}

export function getDishMap(payload: any) {
  return {
    type: CATEGORY_GET_DISH_MAP,
    payload: payload,
  };
}

const categoryActions = {
  getList,
  getListSuccess,
  getListFailed,
};

export default categoryActions;
