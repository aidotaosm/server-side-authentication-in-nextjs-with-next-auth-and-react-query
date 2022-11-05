import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { FunctionComponent, useEffect } from "react";
import Helper from "../../src/utils";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { fetchSession, useSession } from "../customHooks/useReactQuerySession";

let axiosInstance: AxiosInstance = axios.create({});
interface AxiosInterceptorProps {}
export const AxiosInterceptorComponent: FunctionComponent<
  AxiosInterceptorProps
> = () => {
  const queryClient: QueryClient = useQueryClient();

  const { session } = useSession();
  useEffect(() => {
    const initInterceptor = (axiosInstance: AxiosInstance) => {
      let requestInterceptor = axiosInstance.interceptors.request.use(
        (request: AxiosRequestConfig): AxiosRequestConfig => {
          if (request.headers) {
            let common = request.headers.common as any;
            if (session?.accessToken) {
              if (!common.Authorization) {
                request.headers.Authorization =
                  "Bearer " + session?.accessToken;
              } else {
                request.headers.Authorization = common.Authorization;
              }
            }
            // attach some headers here
          }
          return request;
        },
        async (error: AxiosError): Promise<AxiosError | AxiosRequestConfig> => {
          if (error.response) {
            if (error.response.status == 401) {
              let fetchResponse = await fetchSession();
              if (fetchResponse?.accessToken) {
                queryClient.setQueriesData(["session"], () => {
                  return fetchResponse;
                });
                //  queryClient.invalidateQueries(["session"]);
                axiosInstance.defaults.headers.common["Authorization"] =
                  "Bearer " + fetchResponse?.accessToken;
                return axiosInstance(error.config);
              }
            } else {
              Helper.errorHandler(error.response.status);
            }
            return Promise.reject(error.response);
          } else {
            return Promise.reject(error);
          }
        }
      );

      let responseInterceptor = axiosInstance.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => {
          return response;
        },
        async (error: AxiosError): Promise<AxiosError | AxiosRequestConfig> => {
          if (error.response) {
            if (error.response.status == 401) {
              let fetchResponse = await fetchSession();
              if (fetchResponse?.accessToken) {
                queryClient.setQueriesData(["session"], () => {
                  return fetchResponse;
                });
                //  queryClient.invalidateQueries(["session"]);
                axiosInstance.defaults.headers.common["Authorization"] =
                  "Bearer " + fetchResponse?.accessToken;
                return axiosInstance(error.config);
              }
            } else {
              Helper.errorHandler(error.response.status);
            }
            return Promise.reject(error.response);
          } else {
            return Promise.reject(error);
          }
        }
      );
      return { requestInterceptor, responseInterceptor };
    };
    let { requestInterceptor, responseInterceptor } =
      initInterceptor(axiosInstance);
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [session?.accessToken]);

  return null;
};

export default axiosInstance;
