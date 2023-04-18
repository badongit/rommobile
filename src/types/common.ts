export interface ResponsePayload<T> {
  statusCode: number;
  message?: string;
  data?: T;
  errors?: ErrorResponse;
}

export interface PaginationData<T> {
  items: T[];
  meta: Meta;
}

export interface Meta {
  page: number;
  total: number;
}

export interface ErrorResponse {
  [property: string]: string;
}

export interface IPaginationRequest {
  isGetAll?: number;
  page?: number;
  limit?: number;
  keyword?: string;
  sort?: string;
}

export interface IdParamsDto {
  id: number;
}

export interface IMap<T> {
  [key: string | number]: T;
}
