import { Router, Request, Response, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";
import Product from "../models/product.model";
import upload from "../loader/multer";
const cloud = require("../loader/cloudinary");

class productController implements Controller {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllProducts);
    this.router.post(
      `${this.path}`,
      upload.single("image"),
      this.addNewProduct
    );
  }

  private getAllProducts = async (req: Request, res: Response) => {
    try {
      let products = await Product.find();
      res.status(201).json({
        status: true,
        data: products,
      });
    } catch (err) {
      res.status(201).json({
        status: false,
        error: "Something went wrong",
      });
    }
  };

  private addNewProduct = async (req: Request, res: Response) => {
    try {
      let rawImage = await cloud.uploads(req.file.path);

      let data = {
        name: req.body.name,
        price: req.body.price,
        image: rawImage.url,
      };
      let product = await Product.create(data);
      res.status(201).json({
        status: true,
        message: "Product Uploaded",
        data: product,
      });
    } catch (err) {
      res.status(201).json({
        status: false,
        error: "Something went wrong",
      });
    }
  };
}

export default productController;
