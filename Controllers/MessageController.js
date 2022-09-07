import logger from "../utils/logger.js";

export default class MessageController {
  constructor(service) {
    this.service = service;
  }

  getMessageRow(req, res) {
    try {
      res.render("partials/messageRow", {});
    } catch (err) {
      logger.error(err.message);
    }
  }
}
