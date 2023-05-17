import { IUpdateEmployee } from 'src/types/employee/update-profile.type';
import api from './api';

const URL_PREFIX = '/employees';
export const employeeService = {
  update: (body: IUpdateEmployee) => {
    const url = URL_PREFIX + '/' + body.id;
    return api.patch(url, body);
  },
};
