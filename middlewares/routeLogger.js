import logger from "../utils/logger.js";

export const routeLogger = (req, res, next) => {
  logger.info(`${req.baseUrl}${req.path} method ${req.method}`);
  return next();
};

export const invalidRouteLogger = (req, res, next) => {
  logger.warn(
    `${req.baseUrl}${req.path} method ${req.method} not yet implemented`
  );
  return next();
};
