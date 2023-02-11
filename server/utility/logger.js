'use strict';
const winston = require('winston');
const constants = require('./constants');

const log_dir = constants.LOG_FILE_PATH;

// define the custom settings for each transport (file, console)
var options = {
	file: {
    level: 'error',
    filename: log_dir+"/offlineToolWeb.log",
    handleExceptions: true,
    json: true,
    maxsize : constants.LOG_FILE_MAX_SIZE,
    maxFiles : constants.TOTAL_LOG_FILE,
    colorize: true,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};


options.file.level = constants.LOG_LEVEL;

// instantiate a new Winston Logger with the settings defined above
const  logger = winston.createLogger({
  transports: [
		new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

exports.logger = logger;