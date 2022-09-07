import { Router } from "express";
import compression from "compression";
import { routeLogger } from "../middlewares/routeLogger.js";
import InfoController from "../Controllers/InfoController.js";

const infoRouter = Router();
const infoController = new InfoController();

infoRouter.get("/info", routeLogger, compression(), infoController.getInfo);

export default infoRouter;