import logger from "../utils/logger.js";
import crearDatos from "../utils/crearDatos.js";

export default class ProductController {
  constructor(service) {
    this.service = service;
  }

  async getProductRow(ctx) {
    try {
      await ctx.render("partials/productRow", {});
    } catch (err) {
      logger.error(err.message);
      ctx.response.status = 505;
      ctx.body = { error: err.message };
    }
  }

  getProductTest(ctx) {
    try {
        const productos = crearDatos();
        ctx.body = productos;
      } catch (err) {
        logger.error(err.message);
        ctx.response.status = 505;
        ctx.body = { error: err.message };
      }
  }

  async getProducts(ctx) {
    try{
      const products = await this.service.getAll();
      ctx.body = products;
    }catch (err) {
      console.log(err.message);
      ctx.response.status = 505;
      ctx.body = { error: err.message };
    }
  }

  async postProduct(ctx) {
    try{
      const product = ctx.request.body;
      const response = await this.service.save(product);
      ctx.body = response || { success: true };
    }catch (err) {
      console.log(err.message);
      ctx.response.status = 505;
      ctx.body = { error: err.message };
    }
  }

  async updateProduct(ctx) {
    try{
      const product_id = ctx.request.params.id;
      const product = ctx.request.body;
      const response = await this.service.update(product, product_id);
      ctx.body = response || { success: true };
    }catch (err) {
      console.log(err.message);
      ctx.response.status = 505;
      ctx.body = { error: err.message };
    }
  }

  async deleteProduct(ctx) {
    try{
      const product_id = ctx.request.params.id;
      const response = await this.service.deleteById(product_id);
      ctx.body = response || { success: true };
    }catch (err) {
      console.log(err.message);
      ctx.response.status = 505;
      ctx.body = { error: err.message };
    }
  }
}
