import { BigNumber } from 'bignumber.js';

export function formatDecimal(number: BigNumber.Value): any {
  return new BigNumber(number).decimalPlaces(2).toString();
}