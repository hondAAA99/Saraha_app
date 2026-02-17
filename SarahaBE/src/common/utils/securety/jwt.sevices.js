import jwt from "jsonwebtoken";

export const signToken = (id) => {
  const token = jwt.sign(
    {
      userId: id,
    },
    process.env.SECRET_ACCESS_TOKEN,
    {
      expiresIn: "1h",
    },
  );

  return token;
};

export const decodeToken = (token) => {
  const verify = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
  return verify;
};
