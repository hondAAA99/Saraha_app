export const create = async (model, data = {}, options = {}) => {
  return await model.create(data)
};
export const find = async (model, filter = {}, option = {}) => {
  await model.find(filter, option)
  .then((value)=>{
    if (value) return value
    else return false
  })
};