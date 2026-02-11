import { Router } from "express";
import * as user from './users.services.js'

const userRouter = Router() ;

userRouter.post("/signup", user.signUp);
userRouter.get("/login", user.logIn);
userRouter.get("/getProfile/:id", user.getProfile);
userRouter.get("/{*demo}", (req,res,next)=>{
    res.send('hello my user')
});


export default userRouter;
