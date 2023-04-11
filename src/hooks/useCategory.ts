import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import categoryActions from 'src/redux/category/actions';
import { ICategory } from 'src/types/category/category.type';
import { IDish } from 'src/types/dish/dish.type';

export default function useCategory() {
  const isLoading: boolean = useSelector(
    (state: any) => state.category.isLoading,
  );
  const dishMap: {
    [key: string | number]: IDish;
  } = useSelector((state: any) => state.category.dishMap);
  const items: ICategory[] = useSelector((state: any) => state.category.items);
  const dispatch = useDispatch();

  const actions = useMemo(
    () => bindActionCreators(categoryActions, dispatch),
    [dispatch],
  );

  return {
    actions,
    isLoading,
    dishMap,
    items,
  };
}
