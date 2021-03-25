import * as mongoose from "mongoose";
import Product from "../interfaces/product.interface";

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
});

const productModel = mongoose.model<Product & mongoose.Document>(
  "Post",
  productSchema
);

export default productModel;
