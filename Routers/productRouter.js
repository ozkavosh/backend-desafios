import { Router } from "express";
import { routeLogger } from "../middlewares/routeLogger.js";
import ProductController from "../Controllers/ProductController.js";
import ProductService from "../Services/ProductService.js";
import ProductRepository from "../Repositories/ProductRepository.js";

const productService = new ProductService(ProductRepository.getInstance());
const productController = new ProductController(productService);
const productRouter = Router();

productRouter.get("/", routeLogger, productController.getProductRow);
productRouter.get("/api", routeLogger, productController.getProducts.bind(productController));
productRouter.post("/api", routeLogger, productController.postProduct.bind(productController));
productRouter.put("/api/:id", routeLogger, productController.updateProduct.bind(productController));
productRouter.delete("/api/:id", routeLogger, productController.deleteProduct.bind(productController));
productRouter.get("/test", routeLogger, productController.getProductTest);

export default productRouter;
