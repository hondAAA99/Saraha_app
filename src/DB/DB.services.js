import { model } from "mongoose";

export const create = async (model, data = {}, options = {}) => {
  return await model.create(data);
};
export const find = async (model, filter = {}, option = {}) => {
  return await model.find(filter,null, option);
};

export const findUserById = async (model, id, options = {}) => {
  return await model.findById(filter,null,options)
};
