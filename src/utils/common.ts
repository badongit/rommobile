const SUCCESS_CODE = [200, 201];

export const validateStatus = (code: number): boolean => {
  return SUCCESS_CODE.includes(code);
};
