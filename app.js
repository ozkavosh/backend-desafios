import Koa from 'koa';
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import accountRouter from "./Routers/accountRouter.js";
import productRouter from "./Routers/productRouter.js";
import messageRouter from "./Routers/messageRouter.js";
import infoRouter from "./Routers/infoRouter.js";
import randomRouter from "./Routers/randomRouter.js";
import mongoose from "mongoose";
import session from "koa-session";
import bodyParser from "koa-bodyparser";
import flash from "koa-flash";
import MongoStore from "koa-session-mongoose";
import useStatic from "koa-static";
import passport from "./utils/passport.js";
import dotenv from "dotenv";
import { invalidRouteLogger } from "./middlewares/routeLogger.js";
import { getConnection } from "./Controllers/websocketController.js";

//MongoDb
mongoose.connect(
  `mongodb://127.0.0.1:27017/users?retryWrites=true&w=majority`,
  () => console.log("Conectado a mongo")
);

dotenv.config();

const app = new Koa();
app.keys = ["asd"];
app.use(bodyParser());
app.use(session({ store: new MongoStore() }, app));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(useStatic("/public", {}));
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(accountRouter);
app.use("/productos", productRouter);
app.use("/mensajes", messageRouter);
app.use(infoRouter);
app.use(randomRouter);
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
