export const authenticate = async (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization) throw new Error("invalide token", { cause: 404 });

  let decoded = decodeToken(authorization, process.env.SECRET_ACCESS_TOKEN);

  if (!decoded || !decoded?.id)
    throw new Error("invalide Token", { cuase: 400 });

  let user = await DB.findUserById(decoded.id);

  if (!user) throw new Error("cannot find the user", { cause: 403 });

  req.user = user;
  next();
};
