import { Router } from "express";
import * as user from "./users.services.js";
import { authenticate } from "../../common/middleWare/authentication.js";

const userRouter = Router();

userRouter.post("/signup", user.signUp);
userRouter.get("/login", authenticate, user.logIn);
userRouter.get("/getProfile/:id", user.getProfile);
userRouter.get("/{*demo}", (req, res, next) => {
  res.status(200).send("hello my user");
});

export default userRouter;
