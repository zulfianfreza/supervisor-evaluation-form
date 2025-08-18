import {
  ApiServiceErr,
  MutOpt,
  TApiResponse,
  TDataPaginate,
} from "@/types/api.type";
import { TQuestion } from "@/types/question.type";
import {
  QueryObserverOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getQuestions,
  updateQuestion,
} from "../question.service";

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

export const useGetQuestion = (
  id: string,
  opt?: Partial<QueryObserverOptions<TQuestion>>
) => {
  return useQuery<TQuestion, ApiServiceErr>({
    ...opt,
    queryKey: ["get-questions", id],
    queryFn: () => getQuestion(id),
  });
};

export const useCreateQuestion = (opt?: MutOpt<TApiResponse<TQuestion>>) => {
  return useMutation<TApiResponse<TQuestion>, ApiServiceErr, unknown>({
    mutationKey: ["create-question"],
    mutationFn: (payload) => createQuestion(payload),
    ...opt,
  });
};

export const useUpdateQuestion = (opt?: MutOpt<TApiResponse<TQuestion>>) => {
  return useMutation<
    TApiResponse<TQuestion>,
    ApiServiceErr,
    { id: string; payload: unknown }
  >({
    mutationKey: ["create-question"],
    mutationFn: ({ id, payload }) => updateQuestion(id, payload),
    ...opt,
  });
};

export const useDeleteQuestion = (opt?: MutOpt<TApiResponse<TQuestion>>) => {
  return useMutation<TApiResponse<TQuestion>, ApiServiceErr, string>({
    mutationKey: ["delete-question"],
    mutationFn: (id) => deleteQuestion(id),
    ...opt,
  });
};
