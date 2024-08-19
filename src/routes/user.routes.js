import { Router } from "express"
import UserController from "../controllers/user.controllers.js";

const userRouter = Router()

userRouter.post('/', UserController.createUser)
userRouter.get('/:id', UserController.getUserById)
userRouter.get('/', UserController.getUsers)


export default userRouter;