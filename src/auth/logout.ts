import { Response, Request } from "express";
import { findUserToken } from "../token/find-user-token";
import { verifyToken } from "../token/generate-token";

export const logOut = async (req: Request, res: Response): Promise<void> => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).json({ message: "No authorization token" });
    return;
  }
  const accessToken = authorization.split(" ")[1];
  if (!accessToken) {
    res.status(400).json({ message: "No authorization token provided" });
    return;
  }

  const userToken = await findUserToken(accessToken);
  const valid = await verifyToken(accessToken);
  if (!valid) {
   res.status(400).send({ error: "Token Invalid or Expired" });
   return
  }

  if (userToken) {
    res.status(200).json({ message: "Log Out Successful" });
  } else {
    res.status(400).json({ message: "User not Found" });
  }
};