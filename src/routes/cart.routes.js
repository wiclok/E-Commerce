import { Router } from "express";
import cartControllers from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.post('/:idUser/:idProduct', cartControllers.addProductToCart)
cartRouter.get('/:idUser', cartControllers.getCartById)
cartRouter.delete('/:idUser/:idProduct', cartControllers.deleteProductFromCart)

export default cartRouter;