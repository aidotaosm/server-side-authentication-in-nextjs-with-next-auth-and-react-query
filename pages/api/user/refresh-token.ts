import { NextApiRequest, NextApiResponse } from "next";
import { TokenObject } from "../../../src/interfaces";
import { sampleUserData } from "../../../src/utils/sample-data";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (_req.body?.accessToken && _req.body?.refreshToken) {
      let returnVal: Partial<TokenObject> = {
        accessToken:
          "dummyRefreshedAccessToken" +
          Math.floor(100000000 + Math.random() * 900000000),
        accessTokenExpiry: new Date()
          .setMinutes(new Date().getMinutes() + 1)
          .toString(),
        refreshToken:
          "dummyRefreshedRefreshToken" +
          Math.floor(100000000 + Math.random() * 900000000),
      };
      console.log(returnVal, "returnVal");
      res.status(200).json(returnVal);
    } else {
      throw new Error("AccessToken and or refreshToken is not provided.");
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
