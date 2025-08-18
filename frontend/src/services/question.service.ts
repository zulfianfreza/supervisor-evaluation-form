import axiosInstance from "@/lib/axios-instance";
import { TApiResponse, TDataPaginate } from "@/types/api.type";
import { TQuestion } from "@/types/question.type";

export const getQuestions = async (params?: unknown) => {
  const { data } = await axiosInstance.get<
    TApiResponse<TDataPaginate<TQuestion>>
  >("/v1/questions", {
    params,
  });

  return data.data;
};

export const getQuestion = async (id: string) => {
  const { data } = await axiosInstance.get<TApiResponse<TQuestion>>(
    `/v1/questions/${id}`
  );

  return data.data;
};

export const createQuestion = async (payload: unknown) => {
  const { data } = await axiosInstance.post<TApiResponse<TQuestion>>(
    `/v1/questions`,
    payload
  );

  return data;
};

export const updateQuestion = async (id: string, payload: unknown) => {
  const { data } = await axiosInstance.put<TApiResponse<TQuestion>>(
    `/v1/questions/${id}`,
    payload
  );

  return data;
};

export const deleteQuestion = async (id: string) => {
  const { data } = await axiosInstance.delete<TApiResponse<TQuestion>>(
    `/v1/questions/${id}`
  );

  return data;
};
