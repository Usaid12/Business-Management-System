import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';

export const getLocals = <T extends object, K extends keyof T>(locals: T, key: K): NonNullable<T[K]> => {
  if (!locals[key]) {
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, `The local ${key.toString()} hasn't been set`);
  }
  return locals[key] as NonNullable<T[K]>;
};
