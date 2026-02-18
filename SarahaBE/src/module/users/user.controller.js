import { Router } from "express";
import * as user from "./users.services.js";
import { authenticate } from "../../common/middleWare/authentication.js";
import { authorization } from "../../common/middleWare/authorization.js";

const userRouter = Router();

userRouter.post("/signup", user.signUp);
userRouter.get("/login", user.logIn);
userRouter.post("/signup/gmail", user.signUpWithGoogle);
userRouter.get("/getProfile", authenticate , authorization(['user']) , user.getProfile);

userRouter.get("/{*demo}", (req, res, next) => {
  res.status(200).send("hello my user");
});

export default userRouter;
