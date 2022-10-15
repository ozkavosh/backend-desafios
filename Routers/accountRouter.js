import Router from "koa-router";
import passport from "../utils/passport.js";
import authRoute from "../middlewares/authRoute.js";
import { routeLogger } from "../middlewares/routeLogger.js";
import AccountController from "../Controllers/AccountController.js";

const accountRouter = new Router({
  prefix: "",
});
const accountController = new AccountController();

accountRouter.get("/", routeLogger, authRoute, accountController.getIndex);

accountRouter.get("/login", routeLogger, accountController.getLogin);

accountRouter.post(
  "/login",
  routeLogger,
  async (ctx, next) => {
    return passport.authenticate(
      "login",
      { failureRedirect: "/login", failureFlash: true }
    )(ctx, next);
  },
  accountController.postLogin
);

accountRouter.get("/signup", routeLogger, accountController.getSignUp);

accountRouter.post(
  "/signup",
  routeLogger,
  async (ctx, next) => {
    return passport.authenticate(
      "signup",
      { failureRedirect: "/signup", failureFlash: true }
    )(ctx, next);
  },
  accountController.postSignUp
);

accountRouter.get("/logout", routeLogger, accountController.getLogout);

export default accountRouter;
