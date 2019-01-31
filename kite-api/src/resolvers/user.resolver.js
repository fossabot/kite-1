const { loginUser, createUser, getUsers } = require('../utils/user.util');

const UserResolvers = {
  createUser: async ({ ...userData }) => {
    try {
      const userDB = createUser(userData);
      return {
        ...userDB.toObject(),
        _id: userDB._id.toString(),
      }
    } catch(err) {
      return `${err}`;
    }
  },
  loginUser: async ({ ...userData }, req) => {
    try {
      const userDB = await loginUser(userData, req);
      return {
        ...userDB.toObject(),
        _id: userDB._id.toString()
      }
    } catch (err) {
      return `${err}`;
    }
  },
  getUsers: async () => {
    try {
      const users = await getUsers();
      return users;
    } catch (err) {
      return `${err}`;
    }
  }
}

module.exports = { UserResolvers };