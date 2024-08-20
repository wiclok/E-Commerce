import ProductModel from "../models/product.model.js";

class ProductService{
  constructor() { }

  async createProduct(product) {
    return await ProductModel.create(product);
  }

  async getAllProducts() {
    return await ProductModel.findAll();
  }

  async getProductById(id) {
    return await ProductModel.findByPk(id);
  }

  async getProductByName(name) {
    return await ProductModel.findOne({ where: { name } });
  }

  async updateStock(productId, quantity) {
    const product = await ProductModel.findByPk(productId);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    product.stock = product.stock - quantity;
    await product.save();

    return 'Stock actualizado con éxito'
  }

}

export default new ProductService()