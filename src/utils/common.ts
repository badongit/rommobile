import { HOST } from 'src/constants/common';

const SUCCESS_CODE = [200, 201];

export const validateStatus = (code: number): boolean => {
  return SUCCESS_CODE.includes(code);
};

export function getImage(name?: string): string {
  return HOST + name;
}

export function formatToCurrency(value: number | string): string {
  return value.toLocaleString('vi', {
    style: 'currency',
    currency: 'VND',
  });
}
