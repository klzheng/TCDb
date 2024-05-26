// error messages
exports.errors = {
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    RESOURCE_NOT_FOUND: "Resource not found",
    INVALID_REQUEST: "Invalid request",
}

exports.sendError = (res, error, statusCode = 401) =>
    res.status(statusCode).json({ error });
