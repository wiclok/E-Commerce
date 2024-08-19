import { Router } from "express";
import productControllers from "../controllers/product.controllers.js";

const ProductRouter = Router();

ProductRouter.post('/:UserId',  productControllers.createProduct)
ProductRouter.get('/', productControllers.getAllProducts)
ProductRouter.get('/:productId', productControllers.getProductById)

export default ProductRouter;