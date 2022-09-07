import logger from "../utils/logger.js";

export default class RandomNumberController{
    constructor(service){
        this.service = service;
    }

    getRandomNumber(req,res){
        try{
            const result = this.service.calcular(req.query.cant || 10000);
            res.type('json').send(JSON.stringify(result,null,2));
        }
        catch(e){
            logger.error(e.message)
        }
    }
}