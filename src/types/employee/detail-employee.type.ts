import { EmployeeStatusEnum } from 'src/constants/auth/enums';
import { IRole } from '../role/role.type';

export interface IDetailEmployee {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  code: string;
  phoneNumber: string;
  status: EmployeeStatusEnum;
  dateJoin: Date;
  dateOut: Date;
  roleId: number;
  role: IRole;
  salary: number;
}
