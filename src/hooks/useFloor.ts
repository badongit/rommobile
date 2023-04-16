import { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import floorActions from 'src/redux/floor/actions';
import { IFloor } from 'src/types/floor/floor.type';
import { ITable, ITableMap } from 'src/types/table/table.type';

export default function useFloor() {
  const isLoading: boolean = useSelector((state: any) => state.floor.isLoading);
  const items: IFloor[] = useSelector((state: any) => state.floor.items);
  const dispatch = useDispatch();
  const [tableMap, setTableMap] = useState<ITableMap>(() => {
    const map: ITableMap = {};

    for (const floor of items) {
      floor.tables.forEach(table => {
        map[table.id] = table;
      });
    }

    return map;
  });

  useEffect(() => {
    const map: ITableMap = {};

    for (const floor of items) {
      floor.tables.forEach(table => {
        map[table.id] = table;
      });
    }

    setTableMap(map);
  }, [items]);

  const actions = useMemo(
    () => bindActionCreators(floorActions, dispatch),
    [dispatch],
  );

  return {
    actions,
    isLoading,
    items,
    tableMap,
  };
}
