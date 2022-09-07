import { calcular } from "../utils/calcular.js";

export default class ProductService{
    constructor(){
        this.repository = calcular;
    }

    calcular(quantity){
        return this.repository(quantity);
    }
}