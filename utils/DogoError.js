const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports:[
        new winston.transports.File({filename: 'logErrors.log'}),
    ]
});

class DogoError extends Error{
    constructor(message, statusCode){
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') || `${statusCode}`.startsWith('5') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const globalErrorHandler = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    logger.error(err.message);

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err
    });
}

module.exports = {
    DogoError,
    globalErrorHandler
}