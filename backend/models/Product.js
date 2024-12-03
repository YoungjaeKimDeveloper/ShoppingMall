import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // timestamps: true, createAt,updateAt
  }
);
// 몽구스에 문서로 Product라는 collection이  생김
const Product = mongoose.model("Product", productSchema);

export default Product;
