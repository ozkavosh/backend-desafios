export default class MessageDTO{
    constructor(message){
        this.author = message.author;
        this.text = message.text;
        this.date = message.date;
        this.id = message.id || message._id;
    }
}