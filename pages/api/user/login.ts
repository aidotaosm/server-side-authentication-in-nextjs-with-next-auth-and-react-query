import { NextApiRequest, NextApiResponse } from "next";
import { TokenObject } from "../../../src/interfaces";
import { sampleUserData } from "../../../src/utils/sample-data";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (_req.body?.email && _req.body?.password) {
      let useFound = sampleUserData.find(
        (x) => x.email === _req.body.email && x.password === _req.body.password
      );
      let returnVal: TokenObject = {
        id: useFound.id,
        accessToken:
          "dummyAccessToken" +
          Math.floor(100000000 + Math.random() * 900000000),
        accessTokenExpiry: new Date()
          .setHours(new Date().getHours() + 1)
          .toLocaleString(),
        refreshToken:
          "dummyRefresh" + Math.floor(100000000 + Math.random() * 900000000),
      };
      console.log(returnVal, "returnVal");
      res.status(200).json(returnVal);
      if (!useFound) {
        throw new Error("Email and password does not match.");
      }
    } else {
      throw new Error("Email and or password is not provided.");
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
