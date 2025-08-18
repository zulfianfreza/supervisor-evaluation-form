import axiosInstance from "@/lib/axios-instance";
import { TApiResponse, TDataPaginate } from "@/types/api.type";
import { TRespondent } from "@/types/respondent.type";

export const submitRespondent = async (payload?: unknown) => {
  const { data } = await axiosInstance.post<TApiResponse<TRespondent>>(
    "/v1/respondents/submit",
    payload
  );

  return data;
};

export const getRespondent = async (id: string) => {
  const { data } = await axiosInstance.get<TApiResponse<TRespondent>>(
    `/v1/respondents/${id}`
  );

  return data.data;
};

export const getRespondents = async (params?: unknown) => {
  const { data } = await axiosInstance.get<
    TApiResponse<TDataPaginate<TRespondent>>
  >(`/v1/respondents`, { params });

  return data.data;
};

export const deleteRespondent = async (id: string) => {
  const { data } = await axiosInstance.delete<TApiResponse<TRespondent>>(
    `/v1/respondents/${id}`
  );

  return data;
};
