import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { FunctionComponent, useEffect } from "react";
import { useSession } from "../customHooks/useReactQuerySession";
export interface RefreshTokenHandlerProps {}
export const intervalAtom = atom(0);
const RefreshTokenHandler: FunctionComponent<RefreshTokenHandlerProps> = () => {
  const queryClient: QueryClient = useQueryClient();
  const { session } = useSession();
  const [interval, setInterval] = useAtom(intervalAtom);
  useEffect(() => {
    if (!!session) {
      // Here we set interval of 15 second before token expiry date.
      const timeRemaining = Math.round(
        new Date(session.accessTokenExpiry).getTime() - 15 * 1000 - Date.now()
      );
      setInterval(timeRemaining > 0 ? timeRemaining : 0); // time should be greater than 0
      if (interval != timeRemaining && !session.error) {
        console.log(
          interval / 1000,
          timeRemaining / 1000,
          "invalidating token with new time in seconds"
        );
        queryClient.invalidateQueries(["session"]);
      }
    }
  }, [session?.accessToken]);

  return null;
};

export default RefreshTokenHandler;
