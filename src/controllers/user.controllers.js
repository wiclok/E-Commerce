import UserService from "../service/user.service.js";

class UserController {
  constructor() { }

  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      if (!user) {
        return res.status(400).json({ message: "Invalid user data" });
      }
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {

    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

}

export default new UserController();