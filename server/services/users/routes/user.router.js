import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
export const router = Router();

router
    .get("/", UserController.findAll)
    .post("/", UserController.create)
    .post("/details", UserController.findOne)
    .get("/:userId", UserController.findByPk)
    .put("/:userId", UserController.update)
    .delete("/:userId", UserController.delete)

export default router