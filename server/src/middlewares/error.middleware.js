const mongoose = require('mongoose');

const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    console.error("ERROR ::: ", err);
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || (error instanceof mongoose.Error ? 400 : 500);
        const message = error.message || "Internal Server Error";
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };

    return res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
