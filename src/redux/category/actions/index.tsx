export const CATEGORY_GET_LIST = 'category/get-list';
export const CATEGORY_GET_LIST_SUCCESS = 'category/get-list-success';
export const CATEGORY_GET_LIST_FAILED = 'category/get-list-failed';
export const CATEGORY_RESET = 'category/reset';

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

export function reset() {
  return {
    type: CATEGORY_RESET,
  };
}

const categoryActions = {
  getList,
  getListSuccess,
  getListFailed,
  reset,
};

export default categoryActions;
