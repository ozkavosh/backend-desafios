import logger from "../utils/logger.js";

export default class RandomNumberController{
    constructor(service){
        this.service = service;
    }

    getRandomNumber(ctx){
        try{
            const result = this.service.calcular(ctx.request.query.cant || 10000);
            ctx.body = { result };
        }
        catch(e){
            logger.error(e.message)
        }
    }
}