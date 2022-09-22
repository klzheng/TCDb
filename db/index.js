const mongoose = require("mongoose")
require('dotenv').config({path: './.env'}) // Move this to main server.js file


// Store this method in connectDB and export the var
mongoose.connect(process.env.DB_string)
    .then(() => {
        console.log("database is connected")
    })
    .catch((err) => {
        console.log("db connection failed", err)
    })
