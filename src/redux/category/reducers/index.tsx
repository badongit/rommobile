import { ICategory } from 'src/types/category/category.type';
import {
  CATEGORY_GET_DISH_MAP,
  CATEGORY_GET_LIST,
  CATEGORY_GET_LIST_FAILED,
  CATEGORY_GET_LIST_SUCCESS,
} from '../actions';
import { IDish } from 'src/types/dish/dish.type';

export interface ICategoryState {
  isLoading: boolean;
  items: ICategory[];
  dishMap: {
    [key: number | string]: IDish;
  };
}
const initialState = {
  isLoading: false,
  items: [],
  dishMap: {},
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
    case CATEGORY_GET_DISH_MAP:
      return {
        ...state,
        dishMap: action.payload,
      };
    default:
      return state;
  }
}
