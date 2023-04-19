import { keyBy, orderBy } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import orderActions from 'src/redux/order/actions';
import { IOrder, IOrderDetail } from 'src/types/order/order.type';
import { IMap } from 'src/types/common';
import { OrderStatusEnum } from 'src/constants/order/enums';

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

    return orderBy(state, ['createdAt'], ['asc']);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const mapByTable: IMap<IOrder> = keyBy(Object.values(orderMap), 'tableId');
    setOrderMapByTable(mapByTable);

    const newOrderDetails: IOrderDetail[] = [];
    for (const order of Object.values(orderMap)) {
      if (order.status !== OrderStatusEnum.WAIT_CONFIRM)
        newOrderDetails.push(...order.details);
    }
    setOrderDetails(orderBy(newOrderDetails, ['createdAt'], ['asc']));
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
