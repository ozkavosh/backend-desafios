import { chatSchema } from "../utils/normalizrSchemas.js";
import normalizr from "normalizr";
import MessageRepository from "../Repositories/MessageRepository.js";
import MessageService from "../Services/MessageService.js";
import ProductRepository from "../Repositories/ProductRepository.js";
import ProductService from "../Services/ProductService.js";

const messageService = new MessageService(MessageRepository.getInstance());
const productService = new ProductService(ProductRepository.getInstance());

const postProduct = (io) => {
  return async (producto) => {
    const productos = await productService.save(producto);
    io.sockets.emit("productos", productos);
  };
};

const postMessage = (io) => {
  return async (mensaje) => {
    const arrayMensajes = await messageService.save({
      ...mensaje,
      date: new Date(Date.now()).toLocaleString(),
    });
    const mensajes = normalizr.normalize(
      { messages: arrayMensajes, id: "chat" },
      chatSchema
    );

    io.sockets.emit("mensajes", mensajes);
  };
};

export const getConnection = (io) => {
  return async (socket) => {
    const productos = await productService.getAll();
    const arrayMensajes = await messageService.getAll();
    const mensajes = normalizr.normalize(
      { messages: arrayMensajes, id: "chat" },
      chatSchema
    );

    socket.emit("productos", productos);
    socket.emit("mensajes", mensajes);

    socket.on("productoPost", postProduct(io));
    socket.on("mensajePost", postMessage(io));
  };
};
