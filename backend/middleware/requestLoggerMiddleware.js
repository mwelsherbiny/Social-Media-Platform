import logger from "../util/logger.js";

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    logger.request(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
  });

  next();
};

export default loggerMiddleware;
