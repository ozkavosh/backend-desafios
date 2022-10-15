import logger from "../utils/logger.js";

export default class MessageController {
  constructor(service) {
    this.service = service;
  }

  async getMessageRow(ctx) {
    try {
      await ctx.render("partials/messageRow", {});
    } catch (err) {
      logger.error(err.message);
    }
  }
}
