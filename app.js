import Koa from "koa";
import { Server } from "socket.io";
import { createServer } from "http";
import mongoose from "mongoose";
import session from "koa-session";
import bodyParser from "koa-bodyparser";
import flash from "koa-connect-flash";
import MongoStore from "koa-session-mongoose";
import useStatic from "koa-static";
import render from "koa-ejs";
import passport from "./utils/passport.js";
import dotenv from "dotenv";
import accountRouter from "./Routers/accountRouter.js";
import productRouter from "./Routers/productRouter.js";
import messageRouter from "./Routers/messageRouter.js";
import infoRouter from "./Routers/infoRouter.js";
import randomRouter from "./Routers/randomRouter.js";
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

app.use(useStatic("./public", {}));
render(app, {
  root: "./views",
  layout: false,
  viewExt: ".ejs"
});

app.use(accountRouter.routes());
app.use(productRouter.routes());
app.use(messageRouter.routes());
app.use(infoRouter.routes());
app.use(randomRouter.routes());
app.use(invalidRouteLogger);

const httpServer = createServer(app.callback());
const io = new Server(httpServer, {});

io.on('connection', getConnection(io));

export default httpServer;
