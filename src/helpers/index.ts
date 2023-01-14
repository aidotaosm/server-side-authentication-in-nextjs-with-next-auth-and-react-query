import { NextApiRequest } from "next";
import { NextAuthSessionModel } from "../interfaces";

export const getHeaderFromRequest = (req: NextApiRequest) => {
  return {
    accessToken: `${req.headers["authorization"]}`,
  };
};
export const getHeaderWithToken = (session?: NextAuthSessionModel | null) => {
  let serverSideHeaders = undefined;
  if (session) {
    serverSideHeaders = {
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    };
  }

  return serverSideHeaders;
};
