// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { UseQueryOptions } from "@tanstack/react-query";
import { Session } from "next-auth";

export type User = {
  id: number;
  name: string;
};
export interface TokenObject {
  id: string;
  accessToken: string;
  accessTokenExpiry: string;
  refreshToken: string;
}
export interface CredentialsObject {
  email: string;
  password: string;
}
export interface NextAuthSessionModel {
  user: any;
  expires: string;
  accessTokenExpiry: number;
  accessToken: string;
  error: any;
}
export interface useSessionModel {
  required?: boolean;
  redirectTo?: string;
  queryConfig?: UseQueryOptions<Session | null> | any;
}
