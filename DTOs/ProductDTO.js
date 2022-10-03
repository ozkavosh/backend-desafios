export default class ProductDTO{
    constructor(product){
        this.title = product.title;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.id = product.id || product._id;
    }
}