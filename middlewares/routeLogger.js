import logger from "../utils/logger.js";

export const routeLogger = async (ctx, next) => {
  logger.info(`${ctx.request.URL} method ${ctx.request.method}`);
  return await next();
};

export const invalidRouteLogger = async (ctx, next) => {
  logger.warn(
    `${ctx.request.URL} method ${ctx.request.method} not yet implemented`
  );
  ctx.body = {
    error: `${ctx.request.URL} method ${ctx.request.method} not yet implemented`,
  };
  ctx.response.status = 404;
};
