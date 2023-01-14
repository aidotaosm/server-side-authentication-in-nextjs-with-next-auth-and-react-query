import axiosInstanceFromComponent from "../components/AxiosInterceptorComponent";
import { USERSERVICE_API_URL } from "../constants";
import Helper from "../utils";
import { serverSideAxiosInstance } from "../axios/serverSideAxiosClientWithInterceptor";
import {
  CredentialsObject,
  NextAuthSessionModel,
  TokenObject,
  User,
} from "../interfaces";
import { getHeaderWithToken } from "../helpers";

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
        accessToken: tokenObject.accessToken,
        refreshToken: tokenObject.refreshToken,
      }
    );
    return response.data;
  };
  static getUsers = async (session?: NextAuthSessionModel): Promise<User[]> => {
    const response = await axiosInstance.get(
      `${USERSERVICE_API_URL}/users`,
      getHeaderWithToken(session)
    );
    return response.data;
  };
}
