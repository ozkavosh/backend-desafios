import { Router } from "express";
import { routeLogger } from "../middlewares/routeLogger.js";
import ProductController from "../Controllers/ProductController.js";
import ProductService from "../Services/ProductService.js";
import ProductRepository from "../Repositories/ProductRepository.js";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);
const productRouter = Router();

productRouter.get("/", routeLogger, productController.getProductRow);
productRouter.get("/test", routeLogger, productController.getProductTest);

export default productRouter;
