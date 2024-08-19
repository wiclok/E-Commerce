import User_ProductModel from '../models/user_product.model.js'

class CartService{
  constructor() { }

  async addProductToCart(idUser, idProduct, quantity) {

    return await User_ProductModel.create({ UserId: idUser, ProductModelId: idProduct, quantity: quantity });

  }

  async getCartById (userId) {
    return await User_ProductModel.findAll({ where: { UserId: userId }});
  }

  async deleteProductFromCart(idUser, idProduct) {
    return await User_ProductModel.destroy({ where: { UserId: idUser, ProductModelId: idProduct }});
  }

}

export default new CartService;