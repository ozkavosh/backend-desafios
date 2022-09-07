import logger from "../utils/logger.js";
import crearDatos from "../utils/crearDatos.js";

export default class ProductController {
  constructor(service) {
    this.service = service;
  }

  getProductRow(req, res) {
    try {
      res.render("partials/productRow", {});
    } catch (err) {
      logger.error(err.message);
    }
  }

  getProductTest(req, res) {
    try {
        const productos = crearDatos();
        res.type("json").send(JSON.stringify(productos, null, 4));
      } catch (err) {
        logger.error(err.message);
      }
  }
}
