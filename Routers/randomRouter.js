import Router from "koa-router";
import {routeLogger} from "../middlewares/routeLogger.js";
import RandomNumberController from "../Controllers/RandomNumberController.js";
import RandomNumberService from "../services/RandomNumberService.js";

const routerRandom = new Router({
    prefix: '/random'
});
const randomNumberService = new RandomNumberService();
const randomNumberController = new RandomNumberController(randomNumberService);

routerRandom.get('/', routeLogger, randomNumberController.getRandomNumber.bind(randomNumberController));

export default routerRandom;