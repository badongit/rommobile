const SUCCESS_CODE = [200, 201];

export const validateStatus = (code: number): boolean => {
  return SUCCESS_CODE.includes(code);
};

export function getImage(name?: string): string {
  return 'http://193.168.17.189:3001/' + name;
}
