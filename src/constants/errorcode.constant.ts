export enum ErrorCode {
  GENERAL_ERROR = '99',
  BAD_REQUEST = '400',
  SUCCESS = '00',
  UNSUCCESS = '01',
  PAGE_INDEX_NOT_INTEGER = '02',
  PAGE_INDEX_MIN_ONE = '03',
  PAGE_SIZE_NOT_INTEGER = '04',
  PAGE_SIZE_MIN_ONE = '05',
  USER_EXISTED = '06',
  USERNAME_EXISTED = '07',
  SIGNUP_FAILED = '08',
  USER_NOT_EXIST = '09',
  INCORRECT_PASSWORD = '10',
  NOT_FOUND_PACKAGE = '11',
  PASSWORD_NOT_MATCH = '12',
  INVALID_OTP = '13',
  INVALID_PASSWORD_FORMAT = '14',
}
