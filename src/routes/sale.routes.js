import { Router } from "express";
import saleControllers from "../controllers/sale.controllers.js";

const saleRouter = Router();

saleRouter.post('/:idClient/:idSeller', saleControllers.createSale)

export default saleRouter;