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

  async getProducts(req, res) {
    try{
      const products = await this.service.getAll();
      res.json(products || { success: true });
    }catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async postProduct(req, res) {
    try{
      const product = req.body;
      const response = await this.service.save(product);
      res.json(response || { success: true });
    }catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async updateProduct(req, res) {
    try{
      const product_id = req.params.id;
      const product = req.body;
      const response = await this.service.update(product, product_id);
      res.json(response || { success: true });
    }catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async deleteProduct(req, res) {
    try{
      const product_id = req.params.id;
      const response = await this.service.deleteById(product_id);
      res.json(response || { success: true });
    }catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  }
}
