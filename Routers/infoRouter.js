import Router from "koa-router";
import { routeLogger } from "../middlewares/routeLogger.js";
import InfoController from "../Controllers/InfoController.js";

const infoRouter = new Router({
    prefix: '/info'
});
const infoController = new InfoController();

infoRouter.get("/", routeLogger, infoController.getInfo);

export default infoRouter;