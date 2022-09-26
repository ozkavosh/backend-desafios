import { faker } from "@faker-js/faker";

export default () => {
  let productos = [];
  for (let id = 1; id <= 5; id++) {
    productos.push({
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail:
        faker.image.abstract(),
      id,
    });
  }

  return productos;
};

export const producto = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail:
      faker.image.abstract()
  }
}
