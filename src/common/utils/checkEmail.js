import { model } from "mongoose";
import { find } from "../../DB/DB.services.js";
import userModel from "../../DB/models/user.js";
export const checkEmail = (email)=>{
    find(userModel,{email}).then((v)=>{
        return false;
    })
} 