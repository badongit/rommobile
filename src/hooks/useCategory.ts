import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import categoryActions from 'src/redux/category/actions';
import { ICategory } from 'src/types/category/category.type';

export default function useCategory() {
  const isLoading: boolean = useSelector(
    (state: any) => state.category.isLoading,
  );
  const items: ICategory[] = useSelector((state: any) => state.category.items);
  const dispatch = useDispatch();

  const actions = useMemo(
    () => bindActionCreators(categoryActions, dispatch),
    [dispatch],
  );

  return {
    actions,
    isLoading,
    items,
  };
}
