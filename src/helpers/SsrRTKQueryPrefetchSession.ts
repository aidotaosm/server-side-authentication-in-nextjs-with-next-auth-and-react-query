import { QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { NextAuthOptions, unstable_getServerSession } from "next-auth";
import { NextAuthSessionModel } from "../interfaces";

export const getReactQueryClientSSRSession = async (
  context: GetServerSidePropsContext,
  options: NextAuthOptions
) => {
  let session: NextAuthSessionModel | null = null;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<any>(["session"], () =>
    unstable_getServerSession(context.req, context.res, options).then((x) => {
      session = JSON.parse(JSON.stringify(x));
      return session; //`undefined` cannot be serialized as JSON. => to solve this, this had to be done
    })
  );
  return { queryClient, session };
};
