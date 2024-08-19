import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js"
import User_ProductModel from "../models/user_product.model.js";

class UserService {

  constructor() { }

  async createUser(user) {
    return await UserModel.create(user);
  }

  async getUserById(id, isClient=false) {
    return await UserModel.findByPk(id, {
      attributes: ['username', 'email', 'role'],
      include: isClient ? {
        model: ProductModel,
        as: 'ProductModels',
        attributes: ['name', 'price'],
        through: {
          model: User_ProductModel,
          attributes: ['quantity']
        }
      } : null
    });
  }

  async getUsers() {
    return await UserModel.findAll();
  }

}

export default new UserService();