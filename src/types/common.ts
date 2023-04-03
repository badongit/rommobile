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
