require("express-async-errors")

// Handles error without stopping app
const errorHandler = (error, req, res, next) => {
    res.json({error: error.message || error})
}

module.exports = errorHandler