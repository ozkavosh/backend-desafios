import GenericRepository from "./GenericRepository.js";
import { messageDAOFactory } from "../Factories/messageDAOFactory.js";
import MessageDTO from "../DTOs/MessageDTO.js";

let instance = null;

export default class MessageRepository extends GenericRepository {
  constructor() {
    super(messageDAOFactory(process.env.STORAGE));
  }

  async getAll() {
    const messages = await this.dao.getAll();

    const messagesDTO = messages.map((message) => new MessageDTO(message));

    return messagesDTO;
  }

  static getInstance() {
    if (instance) {
      return instance;
    }

    instance = new MessageRepository();
    return instance;
  }
}
