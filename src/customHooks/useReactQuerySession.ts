import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useSessionModel } from "../interfaces";
import { intervalAtom } from "../components/RefreshTokenHandler";
import NextJsService from "../services/nextjs.service";
import { react_query_stale_time } from "../constants";
import { NextAuthSessionModel } from "../interfaces";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
interface CustomAuthHook {
  isAuthenticated: boolean;
  session?: NextAuthSessionModel | null;
  loading: boolean;
}
export async function fetchSession(): Promise<NextAuthSessionModel | null> {
  const session = (await NextJsService.getSessionFromNextServer()).data;
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

export function useSession({
  required = false,
  redirectTo = "/?error=redirected-by-react-query",
  queryConfig = {},
}: useSessionModel = {}): CustomAuthHook {
  const [interval] = useAtom(intervalAtom);
  if (!queryConfig.staleTime) {
    queryConfig.staleTime = react_query_stale_time; // 50 min, during this, this data will be fresh
  }
  if (!queryConfig.refetchInterval) {
    queryConfig.refetchInterval = interval;
  }
  queryConfig.refetchIntervalInBackground = true;
  const router = useRouter();
  const query = useQuery<NextAuthSessionModel | null>(
    ["session"],
    fetchSession,
    {
      ...queryConfig,
      onSettled(data, error) {
        if (data || !required) return;
        router.push(redirectTo);
      },
    }
  );
  useEffect(() => {
    if (query.data?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/", redirect: required });
    }

    if (query.data === null) {
      if (router.route !== "/") {
        router.replace("/");
      }
    } else if (query.data !== undefined) {
      if (router.route === "/") {
        router.replace("/dashboard");
      }
    }
    console.log(query.data);
  }, [query.data]);

  let authObject = {
    isAuthenticated: query.data ? true : false,
    session: query.data,
    loading: query.status === "loading",
  };
  return authObject;
}
