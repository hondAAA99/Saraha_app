import { decodeToken } from "../utils/securety/jwt.sevices";

export const authenticate = async (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization) throw new Error("invalide token", { cause: 404 });

  let decoded = decodeToken(authorization);

  if (!decoded || !decoded?.id)
    throw new Error("invalide Token", { cuase: 400 });

  let user = await DB.findUserById(decoded.id);

  if (!user) throw new Error("cannot find the user", { cause: 403 });

  req.user = user;
  next();
};
