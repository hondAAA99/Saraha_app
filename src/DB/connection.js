import mongoose from "mongoose";

export const main = async () => {
  return await mongoose.connect("mongodb://localhost:27017/SarahaProject",{serverSelectionTimeoutMS : 5000});
};

main()
  .then(() => {
    console.log("connected succeded to DB");
  })
  .catch((e) => {
    throw new Error({ message: e.Error, stack: e.stack });
  });
