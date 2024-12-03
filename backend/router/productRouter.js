import express from "express";

const router = express.Router();
import {
  uploadProduct,
  deleteProduct,
  updateProduct,
  getProducts,
} from "../controller/productControllers.js";

router.post("/", uploadProduct);

router.delete("/:productID", deleteProduct);

router.put("/:productID", updateProduct);
router.get("/", getProducts);

export default router;
