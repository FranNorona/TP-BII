import { userDao } from "../dao/user-dao.js";

class UserRepository {
  async createUser(userData) {
    return await userDao.create(userData);
  }

  async getUserByEmail(email) {
    return await userDao.getBy({ email });
  }

  async getUserById(id) {
    return await userDao.getById(id);
  }

  async updateUser(id, updateData) {
    return await userDao.update(id, updateData);
  }

  async deleteUser(id) {
    return await userDao.delete(id);
  }
}

export const userRepository = new UserRepository();
