import bcrypt from "bcrypt";

export const createPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
