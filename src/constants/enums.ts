export enum SocketEventEnum {
  // order
  CREATE_ORDER = 'order/create',
  UPDATE_ORDER = 'order/update',
  CONFIRM_ORDER = 'order/confirm',
  CANCEL_ORDER = 'order/cancel',
  SEND_ORDER = 'order/send',
  COMPLETE_ORDER = 'order/complete',

  // order detail
  CHANGE_STATUS_ORDER_DETAIL = 'order-details/change-status',
  SEND_ORDER_DETAIL = 'order-detail/send',

  // table
  SEND_TABLE = 'table/send',

  // common
  ERROR = 'error',
  NOTIFICATION = 'notification',
}

export enum RoleEnum {
  WAITER = 'WAITER',
  COOK = 'COOK',
  CASHIER = 'CASHIER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}
