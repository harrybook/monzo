import { format } from 'currency-formatter';

/* eslint-disable import/prefer-default-export */
export function currency(value, code) {
  return format(value, { code });
}
