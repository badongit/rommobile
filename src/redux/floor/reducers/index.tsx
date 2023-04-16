import { IFloorState } from 'src/types/floor/floor-state.type';
import {
  FLOOR_GET_LIST,
  FLOOR_GET_LIST_FAILED,
  FLOOR_GET_LIST_SUCCESS,
  FLOOR_RESET,
  TABLE_GET_ONE,
} from '../actions';

const initialState: IFloorState = {
  isLoading: false,
  items: [],
};

export default function floorReducer(state = initialState, action: any) {
  switch (action.type) {
    case FLOOR_GET_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case FLOOR_GET_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
      };
    case FLOOR_GET_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case TABLE_GET_ONE:
      const newItems = state.items.map(item => {
        if (item.id === action.payload.floorId) {
          item.tables = item.tables.map(table => {
            if (table.id === action.payload.id) return action.payload;
            return table;
          });
        }
        return item;
      });

      return {
        ...state,
        items: newItems,
      };
    case FLOOR_RESET:
      return initialState;
    default:
      return state;
  }
}
