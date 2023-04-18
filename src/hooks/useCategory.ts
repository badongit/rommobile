import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import categoryActions from 'src/redux/category/actions';
import { ICategory } from 'src/types/category/category.type';
import { IDishMap } from 'src/types/dish/dish.type';

export default function useCategory() {
  const isLoading: boolean = useSelector(
    (state: any) => state.category.isLoading,
  );
  const items: ICategory[] = useSelector((state: any) => state.category.items);
  const dispatch = useDispatch();
  const [dishMap, setDishMap] = useState(() => {
    const state: IDishMap = {};

    for (const category of items) {
      for (const dish of category.dishes) {
        state[dish.id] = dish;
      }
    }

    return state;
  });

  const actions = useMemo(
    () => bindActionCreators(categoryActions, dispatch),
    [dispatch],
  );

  useEffect(() => {
    const newState: IDishMap = {};

    for (const category of items) {
      for (const dish of category.dishes) {
        newState[dish.id] = dish;
      }
    }

    setDishMap(newState);
  }, [items]);

  return {
    actions,
    isLoading,
    dishMap,
    items,
  };
}
