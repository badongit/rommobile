import { IDetailEmployee } from '../employee/detail-employee.type';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IDetailEmployee;
}
