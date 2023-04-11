import { call, put, takeLatest } from 'redux-saga/effects';
import { categoryService } from 'src/services/category.service';
import { ResponsePayload } from 'src/types/common';
import {
  CATEGORY_GET_LIST,
  getDishMap,
  getListFailed,
  getListSuccess,
} from '../actions';
import { IDish } from 'src/types/dish/dish.type';

function* doGetList(action: any) {
  try {
    const response: ResponsePayload<any> = yield call(categoryService.list);

    if (response.statusCode === 200) {
      yield put(getListSuccess(response.data));

      const dishMap: { [key: string | number]: IDish } = {};

      for (const category of response.data.items) {
        for (const dish of category.dishes) {
          dishMap[dish.id] = dish;
        }
      }

      if (Object.keys(dishMap).length > 0) {
        yield put(getDishMap(dishMap));
      }

      if (action.onSuccess) yield action.onSuccess(response.data);
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    yield put(getListFailed());

    if (action.onError) yield action.onError(error);
  }
}

export default function* watchGetList() {
  yield takeLatest(CATEGORY_GET_LIST, doGetList);
}
