import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Helper from "../utils";

export const serverSideAxiosInstance: AxiosInstance = axios.create();
const attachServerSideInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(
    (request: AxiosRequestConfig): AxiosRequestConfig => {
      if (request.headers) {
        // attach some static headers for each server request
      }
      return request;
    },
    (error: AxiosError): Promise<AxiosError> => {
      if (error.response) {
        Helper.errorHandler(error.response.status);
        return Promise.reject(error.response);
      } else {
        return Promise.reject(error);
      }
    }
  );
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
      if (error.response) {
        Helper.errorHandler(error.response.status);
        return Promise.reject(error.response);
      } else {
        return Promise.reject(error);
      }
    }
  );
};

attachServerSideInterceptors(serverSideAxiosInstance);
