import userService from "../service/user.service.js";
import productService from '../service/product.service.js';
import ProductModel from "../models/product.model.js";
import SaleModel from '../models/sale.model.js';

class SaleController {
  constructor() { }

  async createSale(req, res) {
    try {
      const { idClient, idSeller } = req.params;
      const { paymentMethod } = req.body;

      // Obtener cliente y validar
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

      const userSeller = await userService.getUserById(idSeller);
      if (!userSeller) {
        return res.status(404).json({
          status: 404,
          message: 'No se ha encontrado el usuario!'
        });
      }

      if (userSeller.role !== 'seller') {
        return res.status(403).json({
          status: 403,
          message: 'El id no pertenece a un vendedor'
        });
      }


      let totalPrice = 0;

      for (const product of userClient.ProductModels) {
        const findProduct = await productService.getProductByName(product.name);

        if (!findProduct) {
          return res.status(404).json({ 
            status: 404,
            message: `No se ha encontrado el producto ${product.name}`
          });
        }

        const productInDB = await ProductModel.findByPk(findProduct.id);

        if (!productInDB) {
          return res.status(404).json({ 
            status: 404,
            message: `No se ha encontrado el producto con ID ${findProduct.id}`
          });
        }

        if (productInDB.stock < product.User_Product.quantity) {
          return res.status(403).json({
            status: 403,
            message: `No hay suficiente stock para el producto ${findProduct.name}`
          });
        }

        await productInDB.decrement('stock', { by: product.User_Product.quantity });

        totalPrice += productInDB.price * product.User_Product.quantity;
      }

      const newSale = await SaleModel.create({
        total: totalPrice,
        paymentMethod: paymentMethod
      });


      await userClient.addSale(newSale);
      await userSeller.addSale(newSale);


      res.json({
        status: 200,
        message: `Venta realizada correctamente. Precio total: ${totalPrice}`,
        paymentMethod: paymentMethod
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 500,
        message: 'Error al procesar la venta'
      });
    }
  }
}

export default new SaleController();
