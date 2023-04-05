import { TableStatusEnum } from 'src/constants/table/enums';
import { IPaginationRequest } from '../common';

export interface IListTableRequest extends IPaginationRequest {
  floorId: number;
  status?: TableStatusEnum;
}
