import {EmployeeStatusEnum} from '../../constants/auth/enums';
import {Role} from '../role/role.type';

export type DetailEmployee = {
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
  role: Role;
  salary: number;
};
