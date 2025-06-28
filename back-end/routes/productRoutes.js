import express from "express";
import {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Define routes for products
router.get("/", getProducts); // Get all products
router.post("/", createProduct); // Create a new product
router.get("/:id", getProduct); // Get a single product by ID
router.put("/:id", updateProduct); // Update a product by ID
router.delete("/:id", deleteProduct); // Delete a product by ID

export default router;
