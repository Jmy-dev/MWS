class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }

    Logger.instance = this;
  }

  log(level, message, metadata = {}) {
    const logObject = {
      level,
      message,
      timestamp: Date.now(),
      ...metadata,
    };

    console.log(JSON.stringify(logObject));
  }

  info(message, metadata = {}) {
    this.log("info", message, metadata);
  }

  warn(message, metadata = {}) {
    this.log("warn", message, metadata);
  }

  error(message, metadata = {}) {
    this.log("error", message, metadata);
  }

  debug(message, metadata = {}) {
    this.log("debug", message, metadata);
  }
}

const logger = new Logger();

export default logger;
