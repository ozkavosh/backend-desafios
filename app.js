import express from "express";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import accountRouter from "./Routers/accountRouter.js";
import productRouter from "./Routers/productRouter.js";
import messageRouter from "./Routers/messageRouter.js";
import infoRouter from "./Routers/infoRouter.js";
import randomRouter from "./Routers/randomRouter.js";
import graphqlController from "./Controllers/graphqlController.js";
import session from "express-session";
import passport from "./utils/passport.js";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import flash from "connect-flash";
import { invalidRouteLogger } from "./middlewares/routeLogger.js";
import { getConnection } from "./Controllers/websocketController.js";

const app = express();
dotenv.config();
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb://127.0.0.1:27017/desafio-sessions?retryWrites=true&w=majority`,
      mongoOptions: {
        useNewUrlParser: true,
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
app.use("/productos", productRouter);
app.use("/mensajes", messageRouter);
app.use(infoRouter);
app.use(randomRouter);
app.use('/graphql', graphqlController)
app.use(invalidRouteLogger, (req, res, next) => {
  res
    .status(404)
    .json({
      error: `${req.baseUrl}${req.path} method ${req.method} not yet implemented`,
    });
});

app.on("error", (err) => console.log(err));

const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

io.on("connection", getConnection(io));

export default httpServer;
