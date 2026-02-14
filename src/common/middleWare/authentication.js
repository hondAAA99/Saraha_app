import { decodeToken } from "../utils/securety/jwt.sevices.js";
import userModel from "../../DB/models/user.js";
import * as DB from '../../DB/DB.services.js'

export const authenticate = async (req, res, next) => {
  let { authorization } = req.headers; ;
  if (!authorization) throw new Error("invalide token", { cause: 404 });

  let decoded = decodeToken(authorization);

  if (!decoded || !decoded?.userId)
    throw new Error("invalide Token", { cuase: 400 });

  let user = await DB.findUserById(userModel,decoded.userId);
  if (!user) throw new Error("cannot find the user", { cause: 403 }); 
  
  req.user = user 
  next();
};
