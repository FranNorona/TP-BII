import bcrypt from "bcrypt";

export const createPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const comparePassword =  (enteredPassword, storedPassword) => {
  return bcrypt.compareSync(enteredPassword, storedPassword);
};