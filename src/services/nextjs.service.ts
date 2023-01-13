import { serverSideAxiosInstance } from "../axios/serverSideAxiosClientWithInterceptor";

export default class NextJsService {
  static getSessionFromNextServer = async () => {
    const response = await serverSideAxiosInstance.get("/api/auth/session");
    return response;
  };
}
