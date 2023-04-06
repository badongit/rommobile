import { ITable } from '../table/table.type';

export interface IFloor {
  id: number;
  name: string;
  tables: ITable[];
}
