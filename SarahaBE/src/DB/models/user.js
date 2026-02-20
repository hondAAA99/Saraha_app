import mongoose, { Schema, model } from "mongoose";
import { provider, gender , role } from  "../../common/enum/enum.js";

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
    phone: {
      type: String,
      require: function (){
        return provider.google ? false : true;
      },
    },
    password: {
      type: String,
      require: function (){
        return provider.google ? false : true;
      },
    },
    gender: { type: String, enum: gender, default: gender.male },
    provider: {
      type: String,
      require: true,
      enum: provider,
      default: provider.system,
    },
    confirmed: {
      type: String,
    },
    role : {
      type : String,
      enum : role ,
      default : role.user 
    }
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
  .get(function () {
    return this.fistName + " " + this.lastName;
  })
  .set(function (v) {
    let [fName, lName] = v.split(" ");
    this.fistName = fName;
    this.lastName = lName;
  });

const userModel = mongoose.models.user || mongoose.model("users", userSchema);

export default userModel;
