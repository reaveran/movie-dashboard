/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig } from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = import.meta.env.VITE_API_TOKEN;

const axiosApi = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  timeout: 60000,
});

const handleApiError = (e: unknown) => {
  if (e instanceof AxiosError) {
    if (e.code === "ECONNABORTED") {
      throw { code: "Error.Unknown" };
    }

    throw e.response?.data;
  }
  throw e;
};

export const SirCoApi = {
  get client() {
    return axiosApi;
  },

  async get<T = any, D = any>(
    url: string,
    params?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    try {
      const response = await axiosApi.get<T>(url, { params, ...config });
      return response.data;
    } catch (e) {
      throw handleApiError(e);
    }
  },

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    try {
      const response = await axiosApi.post<T>(url, data, config);
      return response.data;
    } catch (e) {
      throw handleApiError(e);
    }
  },

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    try {
      const response = await axiosApi.patch<T>(url, data, config);
      return response.data;
    } catch (e) {
      throw handleApiError(e);
    }
  },

  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    try {
      const response = await axiosApi.put<T>(url, data, config);
      return response.data;
    } catch (e) {
      throw handleApiError(e);
    }
  },

  async delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    try {
      const response = await axiosApi.delete<T>(url, config);
      return response.data;
    } catch (e) {
      throw handleApiError(e);
    }
  },
};
