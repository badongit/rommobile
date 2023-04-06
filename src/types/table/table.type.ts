import { TableStatusEnum } from 'src/constants/table/enums';

export interface ITable {
  id: number;
  code: string;
  status: TableStatusEnum;
  maxPeople: number;
  floorId: number;
}
