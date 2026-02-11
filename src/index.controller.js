import express from "express";
import { main } from "./DB/connection.js";
import userRouter from "./module/users/user.controller.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
const host = "192.168.1.5";
const bootstrap = () => {
  main();
  app.use(express.json());

  app.use("/users", userRouter);

  app.get("/{*demo}", (req, res) => {
    res.send("Hello World!");
  });  

  app.use((err, req, res, next) => {
    res.status(400).json({message : err.message , stack : err.stack });
  });

  app.listen(port, host, () => {
    console.log(`app listening on http://${host}:${port}`);
  });
};
export { bootstrap };
