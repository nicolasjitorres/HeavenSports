import express from "express";
const router = express.Router();
import productRoutes from "../product/product-routes.js";
import userRoutes from "../user/user-routes.js";
import authRoutes from "../auth/auth-routes.js";

router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/products", productRoutes);

export default router;