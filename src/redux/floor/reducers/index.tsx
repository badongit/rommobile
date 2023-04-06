import { IFloorState } from 'src/types/floor/floor-state.type';
import {
  FLOOR_GET_LIST,
  FLOOR_GET_LIST_FAILED,
  FLOOR_GET_LIST_SUCCESS,
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
    default:
      return state;
  }
}
