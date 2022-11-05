import { serverSideAxiosInstance } from "../axios/serverSideAxiosClientWithInterceptor";

export default class NextJsService {
  static getSessionFromNextServer = async () => {
    const response = await serverSideAxiosInstance.get("/api/auth/session");
    return response;
  };
  static get401 = async (): Promise<any> => {
    const response = await serverSideAxiosInstance.get(`/api/auth/test`);
    return response;
  };
}
