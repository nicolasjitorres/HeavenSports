import express from "express";
const router = express.Router();
import productController from "./product-controller.js";

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id/soft-delete", productController.softDeleteProduct);

export default router;
