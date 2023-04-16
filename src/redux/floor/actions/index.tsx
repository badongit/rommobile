import { ITable } from 'src/types/table/table.type';

export const FLOOR_GET_LIST = 'floors/get-list';
export const FLOOR_GET_LIST_SUCCESS = 'floors/get-list-success';
export const FLOOR_GET_LIST_FAILED = 'floors/get-list-failed';
export const FLOOR_RESET = 'floor/reset';
export const TABLE_GET_ONE = 'table/get-one';

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

export function reset() {
  return {
    type: FLOOR_RESET,
  };
}

export function getOneTable(payload: ITable) {
  return {
    type: TABLE_GET_ONE,
    payload,
  };
}

const floorActions = {
  getList,
  getListFailed,
  getListSuccess,
  reset,
  getOneTable,
};
export default floorActions;
