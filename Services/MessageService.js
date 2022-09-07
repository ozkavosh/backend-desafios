export default class MessageService {
    constructor(repository){
        this.repository = repository;
    }

    save(message){
        return this.repository.save(message);
    }

    update(updatedMessage, id){
        return this.repository.update(updatedMessage, id);
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