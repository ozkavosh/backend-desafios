import Router from "koa-router";
import { routeLogger } from "../middlewares/routeLogger.js";
import MessageController from "../Controllers/MessageController.js";
import MessageService from "../Services/MessageService.js";
import MessageRepository from "../Repositories/MessageRepository.js";

const messageRouter = new Router({
    prefix: '/mensajes'
});
const messageService = new MessageService(MessageRepository.getInstance());
const messageController = new MessageController(messageService);

messageRouter.get("/", routeLogger, messageController.getMessageRow);

export default messageRouter;
