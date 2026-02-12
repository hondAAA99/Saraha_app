import * as DB from "../../DB/DB.services.js";
import { encrypt } from "../../common/utils/securety/crypto.securety.js";
import { hash, compare } from "../../common/utils/securety/hash.securety.js";
import userModel from "../../DB/models/user.js";
import { create } from "../../DB/DB.services.js";
import response from "../../common/utils/response.js";
import {
  signToken,
  decodeToken,
} from "../../common/utils/securety/jwt.sevices.js";

// sign up -->
// 1- get the information { name (required), email (required), age (required), gender (optional) , phone (required), pass (required), cpass (required), provider (optional)} from body
// 2- check pass = cpass
// 	| if not throw error message
// 3- check the exists of email
// 	| if yes throw error message
// 4- encrypt the phone number
// 5-hash the password
// 6- check all feilds is filled ( wait for database to tell you )
// 	| if true throw back the missing feilds
// 7- create the user creation succeded return a responce message contain user information added and exclude the unwanted feilds
// 	| catch on the promise of the creation of the user and check there is no error has happen

export const signUp = async (req, res, next) => {
  const { userName, email, age, gender, phone, provider, password, cpassword } =
    req.body;
  if (password != cpassword)
    throw new Error("the password is not the same", { cause: 401 });
  if (!phone)
    throw new Error("please make sure to add your phone number", {
      cause: 401,
    });

  let emailExsits = await DB.find(userModel, { email });

  if (emailExsits) throw new Error("this email is not unique");

  let user = await create(userModel, {
    userName,
    email,
    age,
    gender,
    provider,
    phone: encrypt(phone),
    password: hash(password),
  });

  user.then((data) => {
    response(res, 201, {
      name: user.userName,
      email: user.email,
      age: user.age,
      gender: user.gender,
    });
  });
};

// sign in -->
// 1- get the email and password from req body
// 2- check the account is signed up
// 	| if not return an error
// 3- compare the hash with the entered password then print hello ${userName}

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new Error("please make sure you filled the required fields");

  let user = await DB.find(userModel, { email });

  if (!user) throw new Error("cannot find the user");
  const match = await compare(password, user.password);
  if (!match) throw new Error("please insert the correct passwords");

  let accessToken = signToken(user.id);

  response(res, 201, { token: accessToken });
};

// getProfile -->

// 1- get the profile id from the req params
// 	| if it not correct response with that the id is not correct
// 2- retrieve the account data and show it off

export const getProfile = async (req, res, next) => {
  response(res, 201, req.user);
};
