import { ITable } from 'src/types/table/table.type';
import {
  TABLE_GET_LIST,
  TABLE_GET_LIST_FAILED,
  TABLE_GET_LIST_SUCCESS,
} from '../actions';

interface ITableState {
  [key: string]: {
    isLoading: boolean;
    items: ITable[];
  };
}

const initialState: ITableState = {};

export default function tableReducer(state = initialState, action: any) {
  switch (action.type) {
    case TABLE_GET_LIST:
      return {
        ...state,
        [action.payload.floorId]: {
          ...state[action.payload.floorId],
          isLoading: true,
        },
      };
    case TABLE_GET_LIST_SUCCESS:
      if (action.payload.items.length) {
        return {
          ...state,
          [action.payload.items[0].floorId]: {
            isLoading: false,
            items: action.payload.items,
          },
        };
      }

      return {
        ...state,
        [action.payload.floorId]: {
          ...state[action.payload.floorId],
          isLoading: false,
        },
      };
    case TABLE_GET_LIST_FAILED:
      return {
        ...state,
        [action.payload.floorId]: {
          ...state[action.payload.floorId],
          isLoading: false,
        },
      };
    default:
      return state;
  }
}
