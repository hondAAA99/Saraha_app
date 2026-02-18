import mongoose from "mongoose";
import { DB_URI } from '../../config/env.services.js';

export const main = async () => {
  return await mongoose.connect(DB_URI,{serverSelectionTimeoutMS : 5000});
};

main()
  .then(() => {
    console.log(`connected to DB on ${DB_URI}`);
  })
  .catch((e) => {
    throw new Error({ message: e.Error, stack: e.stack });
  });
