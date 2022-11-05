import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useSessionModel } from "../interfaces";
import { intervalAtom } from "../components/RefreshTokenHandler";
import NextJsService from "../services/nextjs.service";
import { react_query_stale_time } from "../constants";
import { NextAuthSessionModel } from "../interfaces";

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
}: useSessionModel = {}) {
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
        if (queryConfig && queryConfig.onSettled) {
          queryConfig.onSettled(data, error);
        }
        if (data || !required) return;
        router.push(redirectTo);
      },
    }
  );
  return { session: query.data, loading: query.status === "loading" };
}
