import Product from "../models/product.js";
import mongoose from "mongoose";

export const uploadProduct = async (req, res) => {
  const productInfo = req.body;
  const { name, price, image } = productInfo;
  try {
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "Please Fill up the forms" });
    }
    // ERROR 통과하고나면 새로운 item 만들어주기
    // create = save + create
    const product = await Product.create({ name, price, image });

    return res.status(200).json({ success: true, item: product });
  } catch (error) {
    console.log("ERROR IN creating product: ", error.message);
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { productID } = req.params;

  try {
    const deletedItem = await Product.findByIdAndDelete(productID);
    if (!deletedItem) {
      console.log("ERROR IN DELETING to findproduct: ");
      return res
        .status(400)
        .json({ success: false, message: "CANNOT FIND THE ITEM" });
    }
    return res.status(200).json({ success: true, message: deletedItem });
  } catch (error) {
    console.log("ERROR IN DELETING product: ", error.message);
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productID } = req.params;
    const product = req.body;
    // 아이템 자체를 못찾은경우
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return res.status(404).json({ success: false, message: "InValid Item" });
    }
    const updatedItem = await Product.findByIdAndUpdate(productID, product, {
      new: true,
    });

    console.info("UpdatedItem: ", updatedItem);
    return res.status(200).json({ success: true, message: updatedItem });
  } catch (error) {
    console.error("ERROR IN UPDATING ITEM", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.info(products);
    return res.status(200).json({ success: true, message: products });
  } catch (error) {
    console.log("ERROR IN GETTING PRODUCTS: ", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
