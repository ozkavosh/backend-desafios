import express from "express";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import accountRouter from "./Routers/accountRouter.js";
import productRouter from "./Routers/productRouter.js";
import messageRouter from "./Routers/messageRouter.js";
import infoRouter from "./Routers/infoRouter.js";
import randomRouter from "./Routers/randomRouter.js";
import Contenedor from "./Repositories/GenericRepository.js";
import { chatSchema } from "./utils/normalizrSchemas.js";
import session from "express-session";
import passport from "./utils/passport.js";
import MongoStore from "connect-mongo";
import normalizr from "normalizr";
import dotenv from "dotenv";
import flash from "connect-flash";
import {invalidRouteLogger} from "./middlewares/routeLogger.js";

const contenedorProductos = new Contenedor("./db/products.json");
const contenedorMensajes = new Contenedor("./db/messages.json");

const app = express();
dotenv.config();
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://ozkavosh:${process.env.MONGO_PASS}@cluster0.y6plr.mongodb.net/desafio-sessions?retryWrites=true&w=majority`,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "qwerty",
    rolling: true,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 600 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(accountRouter);
app.use("/productos",productRouter);
app.use("/mensajes",messageRouter);
app.use(infoRouter);
app.use(randomRouter);
app.use(invalidRouteLogger, (req, res, next) => {
  res.status(404).json({ error: `${req.baseUrl}${req.path} method ${req.method} not yet implemented` })
});

app.on("error", (err) => console.log(err));

const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

io.on("connection", async (socket) => {
    const productos = await contenedorProductos.getAll();
    const arrayMensajes = await contenedorMensajes.getAll();
    const mensajes = normalizr.normalize(
      { messages: arrayMensajes, id: "chat" },
      chatSchema
    );
  
    socket.emit("productos", productos);
    socket.emit("mensajes", mensajes);
  
    socket.on("productoPost", async (producto) => {
      const productos = await contenedorProductos.save(producto);
      io.sockets.emit("productos", productos);
    });
  
    socket.on("mensajePost", async (mensaje) => {
      const arrayMensajes = await contenedorMensajes.save({
        ...mensaje,
        date: new Date(Date.now()).toLocaleString(),
      });
      const mensajes = normalizr.normalize(
        { messages: arrayMensajes, id: "chat" },
        chatSchema
      );
  
      io.sockets.emit("mensajes", mensajes);
    });
  });

  export default httpServer;

