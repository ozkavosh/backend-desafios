export default class ProductService{
    constructor(repository){
        this.repository = repository;
    }

    save(product){
        return this.repository.save(product);
    }

    update(updatedProduct, id){
        return this.repository.update(updatedProduct, id);
    }

    getAll(){
        return this.repository.getAll();
    }

    getById(id){
        return this.repository.getById(id);
    }

    getRandom(){
        return this.repository.getRandom();
    }

    deleteById(id){
        return this.repository.deleteById(id);
    }

    deleteAll(){
        return this.repository.deleteAll();
    }
}