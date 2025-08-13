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
