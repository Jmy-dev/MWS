import logger from "../logger/logger.js";

export function requestTimer(options = {}) {
  const {
    slowRequestThresholdMs = 1000, // warn if request takes more than 1 second
  } = options;

  return (req, res, next) => {
    const start = process.hrtime.bigint();
    let logged = false;

    const logRequest = (eventType) => {
      if (logged) return;
      logged = true;

      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1_000_000;

      const metadata = {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: Number(durationMs.toFixed(2)),
        ip: req.ip,
        correlationId: req.correlationId,
        userAgent: req.get("user-agent"),
        eventType,
      };

      if (durationMs >= slowRequestThresholdMs) {
        logger.warn("Slow request detected", {
          ...metadata,
          slowRequestThresholdMs,
        });
      } else {
        logger.info("Request completed", metadata);
      }
    };

    res.on("finish", () => logRequest("finish"));
    res.on("close", () => logRequest("close"));

    next();
  };
}
