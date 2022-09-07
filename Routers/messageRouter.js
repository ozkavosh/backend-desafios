import { Router } from "express";
import { routeLogger } from "../middlewares/routeLogger.js";
import MessageController from "../Controllers/MessageController.js";
import MessageService from "../Services/MessageService.js";
import MessageRepository from "../Repositories/MessageRepository.js";

const messageRouter = Router();
const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService);

messageRouter.get("/", routeLogger, messageController.getMessageRow);

export default messageRouter;
