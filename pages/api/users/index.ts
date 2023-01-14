import { NextApiRequest, NextApiResponse } from "next";
import { getHeaderFromRequest } from "../../../src/helpers";
import { sampleUserData } from "../../../src/utils/sample-data";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  let session = getHeaderFromRequest(_req);
  console.log(session);
  if (session.accessToken && session.accessToken !== "undefined") {
    try {
      if (!Array.isArray(sampleUserData)) {
        throw new Error("Cannot find user data");
      }

      res.status(200).json(sampleUserData);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    // redirect to login
    return res.status(401).json({
      message: "You are not logged in.",
    });
  }
};

export default handler;
