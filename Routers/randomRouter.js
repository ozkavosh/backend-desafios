import { Router } from "express";
import {routeLogger} from "../middlewares/routeLogger.js";
import RandomNumberController from "../Controllers/RandomNumberController.js";
import RandomNumberService from "../services/RandomNumberService.js";

const routerRandom = Router();
const randomNumberService = new RandomNumberService();
const randomNumberController = new RandomNumberController(randomNumberService);

routerRandom.get('/random', routeLogger, randomNumberController.getRandomNumber);

export default routerRandom;