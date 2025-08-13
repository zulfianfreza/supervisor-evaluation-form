import { ApiServiceErr, MutOpt, TApiResponse } from "@/types/api.type";
import {
  QueryObserverOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { getRespondent, submitRespondent } from "../respondent.service";
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
