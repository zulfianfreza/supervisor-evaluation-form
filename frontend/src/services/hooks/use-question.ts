import { ApiServiceErr, TDataPaginate } from "@/types/api.type";
import { TQuestion } from "@/types/question.type";
import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import { getQuestions } from "../question.service";

export const useGetQuestions = (
  params?: unknown,
  opt?: Partial<QueryObserverOptions<TDataPaginate<TQuestion>>>
) => {
  return useQuery<TDataPaginate<TQuestion>, ApiServiceErr>({
    ...opt,
    queryKey: ["get-questions", params],
    queryFn: () => getQuestions(params),
  });
};
