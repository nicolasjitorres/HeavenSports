import express from "express";
const router = express.Router();
import userController from "./user-controller.js";

router.put("/:id", userController.updateUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.patch("/:id/soft-delete", userController.softDelete);

export default router;
