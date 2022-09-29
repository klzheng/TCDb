const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./db/index")
const errorHandler = require("./middleware/error")
const { handleNotFound } = require("./utils/helper")
const userRoutes = require("./routes/user")



require('./db/index')
require("dotenv").config({path: "./.env"})


connectDB()

app.use(cors())
app.use(express.json())
app.use("/api/user", userRoutes)
app.get("/search", (req, res) => {
    res.send("this is your search page")
})

app.use("/*", handleNotFound)

app.use(errorHandler)

app.listen(8000, () => {
    console.log("the port is listening on port 8000")
})