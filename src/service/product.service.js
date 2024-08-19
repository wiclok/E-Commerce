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

}

export default new ProductService()