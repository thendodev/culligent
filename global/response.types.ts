import { StatusCode } from 'hono/utils/http-status';

export type ApiResponse<T> = {
  message: string;
  data: T | null | undefined;
  success: boolean;
  code: StatusCode;
};

export type ClientErrorResponse = {
  message: string;
};
