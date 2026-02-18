import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../../../../config/env.services.js";

export const signToken = (id) => {
  const token = jwt.sign(
    {
      userId: id,
    },
    SECRET_ACCESS_TOKEN,
    {
      expiresIn: "1h",
    },
  );

  return token;
};

export const decodeToken = (token) => {
  const verify = jwt.verify(token, SECRET_ACCESS_TOKEN);
  return verify;
};
