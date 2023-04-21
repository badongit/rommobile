import { divide, multiply, subtract } from 'lodash';
import { EXCHANGE_RATE, HOST } from 'src/constants/common';

const SUCCESS_CODE = [200, 201];

export const validateStatus = (code: number): boolean => {
  return SUCCESS_CODE.includes(code);
};

export function getImage(name?: string): string {
  return HOST + '/' + name;
}

export function formatToCurrency(value: number | string): string {
  return value.toLocaleString('vi', {
    style: 'currency',
    currency: 'VND',
  });
}

export function formatToDate(value: Date): string {
  return new Date(value).toLocaleString();
}

export function discountAmount(amount: number, point: number): number {
  const remain = subtract(amount, multiply(point, EXCHANGE_RATE));

  return remain < 0 ? 0 : remain;
}

export function asPoint(amount: number): number {
  if (amount === 0) return 0;
  return Math.round(divide(amount, EXCHANGE_RATE));
}
