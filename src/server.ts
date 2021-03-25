import App from "./app";
import ProductController from "./Modules/controller/productController";
const app = new App([new ProductController()]);

app.listen();
