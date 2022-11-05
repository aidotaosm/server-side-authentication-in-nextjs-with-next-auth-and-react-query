import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextAuthSessionModel } from "../interfaces";
import { useSession } from "./useReactQuerySession";

interface CustomAuthHook {
  isAuthenticated: boolean;
  session?: NextAuthSessionModel | null;
  loading: boolean;
}
export default function useAuth(shouldRedirect: boolean) {
  const { session, loading } = useSession();
  const router = useRouter();

  const [authObject, setAuthObject] = useState<CustomAuthHook>({
    isAuthenticated: session ? true : false,
    session,
    loading,
  });

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/", redirect: shouldRedirect });
    }

    if (session === null) {
      if (router.route !== "/") {
        router.replace("/");
      }
      setAuthObject({ isAuthenticated: false, session, loading: loading });
    } else if (session !== undefined) {
      if (router.route === "/") {
        router.replace("/dashboard");
      }
      setAuthObject({ isAuthenticated: true, session, loading: loading });
    }
  }, [session]);

  return authObject;
}
