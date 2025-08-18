import {
  ApiServiceErr,
  MutOpt,
  TApiResponse,
  TDataPaginate,
} from "@/types/api.type";
import {
  QueryObserverOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteRespondent,
  getRespondent,
  getRespondents,
  submitRespondent,
} from "../respondent.service";
import { TRespondent } from "@/types/respondent.type";

export const useSubmitRespondent = (
  opt?: MutOpt<TApiResponse<TRespondent>>
) => {
  return useMutation<TApiResponse<TRespondent>, ApiServiceErr, unknown>({
    mutationKey: ["submit-respondent"],
    mutationFn: (payload) => submitRespondent(payload),
    ...opt,
  });
};

export const useGetRespondent = (
  id: string,
  opt?: Partial<QueryObserverOptions<TRespondent>>
) => {
  return useQuery<TRespondent, ApiServiceErr>({
    queryKey: ["get-respondent", id],
    queryFn: () => getRespondent(id),
    ...opt,
  });
};

export const useGetRespondents = (
  params?: unknown,
  opt?: Partial<QueryObserverOptions<TDataPaginate<TRespondent>>>
) => {
  return useQuery<TDataPaginate<TRespondent>, ApiServiceErr>({
    queryKey: ["get-respondent", params],
    queryFn: () => getRespondents(params),
    ...opt,
  });
};

export const useDeleteRespondent = (
  opt?: MutOpt<TApiResponse<TRespondent>>
) => {
  return useMutation<TApiResponse<TRespondent>, ApiServiceErr, string>({
    mutationKey: ["delete-respondent"],
    mutationFn: (id) => deleteRespondent(id),
    ...opt,
  });
};
