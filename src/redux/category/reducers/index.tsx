import { ICategory } from 'src/types/category/category.type';
import {
  CATEGORY_GET_LIST,
  CATEGORY_GET_LIST_FAILED,
  CATEGORY_GET_LIST_SUCCESS,
  CATEGORY_RESET,
} from '../actions';

export interface ICategoryState {
  isLoading: boolean;
  items: ICategory[];
}
const initialState = {
  isLoading: false,
  items: [],
};

export default function categoryReducer(state = initialState, action: any) {
  switch (action.type) {
    case CATEGORY_GET_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORY_GET_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
      };
    case CATEGORY_GET_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case CATEGORY_RESET:
      return initialState;
    default:
      return state;
  }
}
