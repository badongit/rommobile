import { ILoginForm } from 'src/types/auth/login-form.type';
import { ILoginResponse } from 'src/types/auth/login-response.type';
import { IDetailEmployee } from 'src/types/employee/detail-employee.type';
import { IListTableRequest } from 'src/types/table/list-table.request.type';

export const TABLE_GET_LIST = 'table/get-list';
export const TABLE_GET_LIST_SUCCESS = 'table/get-list-success';
export const TABLE_GET_LIST_FAILED = 'table/get-list-failed';

export function getList(
  payload: IListTableRequest,
  onSuccess?: Function,
  onError?: Function,
) {
  return {
    type: TABLE_GET_LIST,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  };
}

export function getListSuccess(payload: ILoginResponse) {
  return {
    type: TABLE_GET_LIST_SUCCESS,
    payload: payload,
  };
}

export function getListFailed(floorId: number) {
  return {
    type: TABLE_GET_LIST_FAILED,
    payload: { floorId },
  };
}

const tableActions = {
  getList,
  getListSuccess,
  getListFailed,
};
export default tableActions;
