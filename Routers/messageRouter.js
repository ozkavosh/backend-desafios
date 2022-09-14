import { Router } from "express";
import { routeLogger } from "../middlewares/routeLogger.js";
import MessageController from "../Controllers/MessageController.js";
import MessageService from "../Services/MessageService.js";
import MessageRepository from "../Repositories/MessageRepository.js";

const messageRouter = Router();
const messageService = new MessageService(MessageRepository.getInstance());
const messageController = new MessageController(messageService);

messageRouter.get("/", routeLogger, messageController.getMessageRow);

export default messageRouter;
