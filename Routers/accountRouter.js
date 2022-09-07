import { Router } from "express";
import passport from "../utils/passport.js";
import authRoute from "../middlewares/authRoute.js";
import { routeLogger } from "../middlewares/routeLogger.js";
import AccountController from "../Controllers/AccountController.js";

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.get("/", routeLogger, authRoute, accountController.getIndex);

accountRouter.get("/login", routeLogger, accountController.getLogin);

accountRouter.post(
  "/login",
  routeLogger,
  passport.authenticate("login", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  accountController.postLogin
);

accountRouter.get("/signup", routeLogger, accountController.getSignUp);

accountRouter.post(
  "/signup",
  routeLogger,
  passport.authenticate("signup", {
    failureRedirect: "/signup",
    failureFlash: true,
  }),
  accountController.postSignUp
);

accountRouter.get("/logout", routeLogger, accountController.getLogout);

export default accountRouter;
