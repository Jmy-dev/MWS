import { randomUUID } from "node:crypto";

export const setCorrelationId = (req, res, next) => {
  req.correlationId = randomUUID();
  res.setHeader("X-CorrelationId", req.correlationId);
  next();
};
