import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserService from "../../../src/services/user.service";
import { CallbacksOptions, NextAuthOptions } from "next-auth/core/types";
import { NextApiRequest, NextApiResponse } from "next";
import { CredentialsObject, TokenObject } from "../../../src/interfaces";
import { Provider } from "next-auth/providers";

async function refreshAccessToken(tokenObject: TokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await UserService.refreshAccessToken(tokenObject);
    return {
      ...tokenObject,
      accessToken: tokenResponse.accessToken,
      accessTokenExpiry: tokenResponse.accessTokenExpiry,
      refreshToken: tokenResponse.refreshToken,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

const providers: Provider[] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {},
    authorize: async (credentials: CredentialsObject) => {
      try {
        // Authenticate user with credentials
        const loginResponse = await UserService.signIn(credentials);
        if (loginResponse.accessToken) {
          return loginResponse;
        }
        return null;
      } catch (e: any) {
        throw new Error(e);
      }
    },
  }),
];

const callbacks: Partial<CallbacksOptions> = {
  jwt: async ({ token, user }: any) => {
    if (user) {
      // This will only be executed at login. Each next invocation will skip this part.
      token.accessToken = user.token;
      token.accessTokenExpiry = user.tokenExpiryTime;
      token.refreshToken = user.refreshToken;
    }

    // If accessTokenExpiry is 1 hour, we have to refresh token before 1 hours pass. (thus 30 seconds before 1 hour passes)
    const shouldRefreshTime = Math.round(
      new Date(token.accessTokenExpiry).getTime() - 30 * 1000 - Date.now()
    );

    // If the token is still valid, just return it.
    if (shouldRefreshTime > 0) {
      return Promise.resolve(token);
    } else {
      token = await refreshAccessToken(token);
    }

    // If the call arrives after 23 hours have passed, we allow to refresh the token.

    return Promise.resolve(token);
  },
  session: async ({ session, token }: any) => {
    // Here we pass accessToken to the client to be used in authentication with your API
    session.accessToken = token.accessToken;
    session.accessTokenExpiry = token.accessTokenExpiry;
    session.error = token.error;

    return Promise.resolve(session);
  },
};

export const options: NextAuthOptions = {
  providers,
  callbacks,
  pages: { signIn: "/", signOut: "/", error: "/" },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  jwt: { maxAge: 60 * 60 * 24 * 30 }, //default
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
export default Auth;
