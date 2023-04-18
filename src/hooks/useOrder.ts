import { keyBy } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import orderActions from 'src/redux/order/actions';
import { IOrder, IOrderDetail } from 'src/types/order/order.type';
import { IMap } from 'src/types/common';

export default function useOrder() {
  const isLoading: boolean = useSelector((state: any) => state.order.isLoading);
  const orderMap: IMap<IOrder> = useSelector(
    (state: any) => state.order.itemMap,
  );
  const [orderMapByTable, setOrderMapByTable] = useState<IMap<IOrder>>(() => {
    return keyBy(Object.values(orderMap), 'tableId');
  });
  const [orderDetails, setOrderDetails] = useState(() => {
    const state: IOrderDetail[] = [];

    for (const order of Object.values(orderMap)) {
      state.push(...order.details);
    }

    return state;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const mapByTable: IMap<IOrder> = keyBy(Object.values(orderMap), 'tableId');
    setOrderMapByTable(mapByTable);

    const newOrderDetails: IOrderDetail[] = [];
    for (const order of Object.values(orderMap)) {
      newOrderDetails.push(...order.details);
    }
    setOrderDetails(newOrderDetails);
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
    orderDetails,
  };
}
