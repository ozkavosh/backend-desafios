import GenericFileDAO from "./GenericFileDAO.js";

let instance = null;

export default class MessageFileDAO extends GenericFileDAO{
  constructor() {
    super("./db/messages.json");
  }

  static getInstance() {
    if(instance){
      return instance;
    }

    instance = new MessageFileDAO();
    return instance;
  }
};