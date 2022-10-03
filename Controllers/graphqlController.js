import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import ProductRepository from "../Repositories/ProductRepository.js";
import ProductService from "../Services/ProductService.js";

const productService = new ProductService(ProductRepository.getInstance());

const graphQlSchema = buildSchema(`
  type Product {
    title: String,
    price: String,
    thumbnail: String,
    id: ID
  }
  input ProductInput {
    title: String,
    price: String,
    thumbnail: String
  }
  type Query {
    getProduct(id: ID!): Product,
    getProducts(field: String, value: String): [Product],
  }
  type Mutation {
    createProduct(data: ProductInput): Product,
    updateProduct(id: ID!, data: ProductInput): Product,
    deleteProduct(id: ID!): Product
  }
`)

const getProduct = async ({id}) => {
  const product = await productService.getById(id);
  if(!product) throw new Error("Product not found");
  return product;
}

const getProducts = async ({field, value}) => {
  const products = await productService.getAll();
  if(field && value) return products.filter(product => product[field] === value);
  return products;
}

const createProduct = async ({ data }) => {
  const newProduct = await productService.save(data);
  return newProduct;
}

const updateProduct = async ({ id, data }) => {
  const updatedProduct = await productService.update(data, id);
  return updatedProduct;
}

const deleteProduct = async ({ id }) => {
  const deletedProduct = await productService.deleteById(id);
  return deletedProduct;
}

export default graphqlHTTP({
  schema: graphQlSchema,
  rootValue: {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
  },
  graphiql: true
})

