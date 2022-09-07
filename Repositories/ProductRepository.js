import GenericRepository from './GenericRepository.js';

export default class MessageRepository extends GenericRepository {
    constructor(){
        super('./db/products.json');
    }
}