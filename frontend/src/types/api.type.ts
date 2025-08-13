import { UseMutationOptions } from "@tanstack/react-query";

export type TDataPaginate<T> = {
  items: T[];
  meta: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  } | null;
};

export type TApiResponse<T> = {
  message: string;
  success: boolean;
  data: T;
};

export type MutOpt<Response, TVariables = unknown> = UseMutationOptions<
  Response,
  ApiServiceErr,
  TVariables,
  unknown
>;

export type ApiServiceErr = any;
