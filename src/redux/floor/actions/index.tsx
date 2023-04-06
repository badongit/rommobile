export const FLOOR_GET_LIST = 'floors/get-list';
export const FLOOR_GET_LIST_SUCCESS = 'floors/get-list-success';
export const FLOOR_GET_LIST_FAILED = 'floors/get-list-failed';

export function getList(onSuccess?: any, onError?: any) {
  return {
    type: FLOOR_GET_LIST,
    onSuccess,
    onError,
  };
}

export function getListSuccess(payload: any) {
  return {
    type: FLOOR_GET_LIST_SUCCESS,
    payload,
  };
}

export function getListFailed() {
  return {
    type: FLOOR_GET_LIST_FAILED,
  };
}

const floorActions = {
  getList,
  getListFailed,
  getListSuccess,
};
export default floorActions;
