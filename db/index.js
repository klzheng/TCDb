const mongoose = require("mongoose")

// Store this method in connectDB and export the var
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_STRING)
        console.log(`Database is connected`)
    } catch (err) {
        console.log("DB connection failed", err)
    }
}

module.exports = connectDB