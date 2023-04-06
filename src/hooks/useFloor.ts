import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import floorActions from 'src/redux/floor/actions';
import { IFloor } from 'src/types/floor/floor.type';

export default function useFloor() {
  const isLoading: boolean = useSelector((state: any) => state.floor.isLoading);
  const items: IFloor[] = useSelector((state: any) => state.floor.items);
  const dispatch = useDispatch();

  const actions = useMemo(
    () => bindActionCreators(floorActions, dispatch),
    [dispatch],
  );

  return {
    actions,
    isLoading,
    items,
  };
}
