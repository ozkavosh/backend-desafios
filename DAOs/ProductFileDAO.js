import GenericFileDAO from "./GenericFileDAO.js";

let instance = null;

export default class ProductFileDAO extends GenericFileDAO{
  constructor() {
    super("./db/products.json");
  }

  static getInstance() {
    if(instance){
      return instance;
    }

    instance = new ProductFileDAO();
    return instance;
  }
};
