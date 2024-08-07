const { sendError } = require("../utils/error");

// error message
exports.errorHandler = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({ error: err.message || err })
}

// When address is unknown
exports.errorNotFound = (req, res) => {
    sendError(res, "Not found", 404);
};