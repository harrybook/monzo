import { format } from 'currency-formatter';

export function currency(value, code) {
  return format(value, { code });
}
