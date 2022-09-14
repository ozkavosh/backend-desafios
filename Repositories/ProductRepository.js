import GenericRepository from './GenericRepository.js';
import {productDAOFactory} from '../Factories/productDAOFactory.js';
import ProductDTO from "../DTOs/ProductDTO.js";

let instance = null;

export default class ProductRepository extends GenericRepository {
    constructor(){
        super(productDAOFactory(process.env.STORAGE));
    }

    async getAll(){
        const products = await this.dao.getAll();

        const productsDTO = products.map(product => new ProductDTO(product));

        return productsDTO;
    }

    static getInstance(){
        if(instance){
            return instance;
        }

        instance = new ProductRepository();
        return instance;
    }
}