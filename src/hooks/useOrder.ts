import { keyBy } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import orderActions from 'src/redux/order/actions';
import { IOrder } from 'src/types/order/order.type';

interface IOrderMap {
  [key: string | number]: IOrder;
}

export default function useOrder() {
  const isLoading: boolean = useSelector((state: any) => state.order.isLoading);
  const orderMap: IOrderMap = useSelector((state: any) => state.order.itemMap);
  const [orderMapByTable, setOrderMapByTable] = useState<IOrderMap>(() => {
    return keyBy(Object.values(orderMap), 'tableId');
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const mapByTable: IOrderMap = keyBy(Object.values(orderMap), 'tableId');
    setOrderMapByTable(mapByTable);
  }, [orderMap]);

  const actions = useMemo(
    () => bindActionCreators(orderActions, dispatch),
    [dispatch],
  );

  return {
    actions,
    isLoading,
    orderMap,
    orderMapByTable,
  };
}
