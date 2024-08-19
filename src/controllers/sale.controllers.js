import userService from "../service/user.service.js";
import productService from '../service/product.service.js';

class SaleController {
  constructor() { }

  async createSale(req, res) {
    try {
      const { idClient, idSeller } = req.params;
      const { paymentMethod } = req.body;

      const userClient = await userService.getUserById(idClient, true);
      if (!userClient) {
        return res.status(404).json({
            status: 404,
            message: 'No se ha encontrado el usuario!'
        });
    }

    if (userClient.role !== "client") {
      return res.status(403).json({
          status: 403,
          message: 'El id proporcionado no es de un cliente'
      });
    }

    const userSeller = await userService.getUserById(idSeller)

    if (!userSeller) {
      return res.status(404).json({
          status: 404,
          message: 'No se ha encontrado el usuario!'
      });
    }

    if (userSeller.role !== 'seller'){
      return res.status(403).json({ message: 'El id no pertenece a un vendedor' })
    }

    let priceFinal = 0

    for ( const product of userClient.ProductModels ) {
      priceFinal += parseFloat(product.price) + product.User_Product.quantity

      const findeProduct = await productService.getProductByName(product.name)

      if (!findeProduct) {
        return res.status(404).json({ message: 'No se ha encontrado el producto' })
      }


    }

    res.json({ message: userClient })

    } catch (err) {
      console.error(err)
    }
  }

}

export default new SaleController();