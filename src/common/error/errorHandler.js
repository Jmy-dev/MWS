import logger from "../logger/logger.js";
export default function errorHandler(err, req, res, next) {
  const operational = err.isOperational;
  logger.error(err.message, {
    statusCode: err.statusCode,
    stack: err.stack,
    operational,
    body: req.body,
    query: req.query,
    correlationId: req.correlationId,
  });

  if (operational) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    error: "Something went wrong!",
  });
}
