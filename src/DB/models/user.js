import mongoose, { Schema, model, mongo } from "mongoose";
import { gender } from "../../common/enum";
import { provider } from "../../common/enum";

const userSchema = Schema(
  {
    fistName: {
      type: String,
      require: true,
      minLength: 4,
      maxLength: 15,
    },
    lastName: { type: String, require: true, minLength: 4, maxLength: 15 },
    age: { type: Number, require: true, min: 13, max: 60 },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: { type: String, require: true },
    password: { type: String, require: true },
    gender: { type: String, enum: gender, default: gender.male },
    provider: {
      type: String,
      require: true,
      enum: provider,
      default: provider.system,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

userSchema
  .virtual("userName")
  .get(function (){
    return new String().concat(this.firstName, this.lastName);
  })
  .set(function (v){
    let [fName, lName] = v.split(" ");
    this.fistName = fName;
    this.lastName = lName;
  });

const userModel = mongoose.models.user || mongoose.model("users", userSchema);

export default userModel;
