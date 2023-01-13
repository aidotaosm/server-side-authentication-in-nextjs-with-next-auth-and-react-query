import axiosInstanceFromComponent from "../components/AxiosInterceptorComponent";
import { USERSERVICE_API_URL } from "../constants";
import Helper from "../utils";
import { serverSideAxiosInstance } from "../axios/serverSideAxiosClientWithInterceptor";
import { CredentialsObject, TokenObject } from "../interfaces";

let axiosInstance = serverSideAxiosInstance;
if (!Helper.isServerSide()) {
  axiosInstance = axiosInstanceFromComponent;
}

export default class UserService {
  static signIn = async (
    credentials: CredentialsObject
  ): Promise<TokenObject> => {
    const response = await axiosInstance.post(`${USERSERVICE_API_URL}/login`, {
      password: credentials.password,
      email: credentials.email,
    });
    return response.data;
  };

  static refreshAccessToken = async (
    tokenObject: Partial<TokenObject>
  ): Promise<TokenObject> => {
    const response = await axiosInstance.post(
      `${USERSERVICE_API_URL}/refresh-token`,
      {
        token: tokenObject.accessToken,
        refreshToken: tokenObject.refreshToken,
      }
    );
    return response.data;
  };
}
