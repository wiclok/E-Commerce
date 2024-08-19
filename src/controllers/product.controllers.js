import productService from "../service/product.service.js";
import userService from "../service/user.service.js";

class ProductController {
  constructor() { }

  async createProduct(req, res,) {
    try {
      const product = req.body;
      const { UserId } = req.params

      const user = await userService.getUserById(UserId)

      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      if (user.role === 'client') {
        res.status(403).json({ error: "Acceso Denegado: Cliente no puede agregar un producto" });
        return;
      }

      const newProduct = await productService.createProduct(product);

      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating product" });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();

      if (!products) {
        res.status(404).json({ error: "Productos no encontrados" });
        return;
      }

      res.status(200).json(products);

    } catch (err) {
      console.error(err);
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.productId);
      if (!product) {
        res.status(404).json({ error: "Producto no encontrado" });
        return;
      }

      res.status(200).json(product);
    } catch (err) {
      console.error(err);
    }
  }

}

export default new ProductController();