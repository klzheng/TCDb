const express = require("express")
const app = express()
const userRoutes = require("./routes/user")


app.use(express.json())

app.use("/api/user", userRoutes)
app.get("/search", (req, res) => {
    res.send("this is your search page")
})

app.listen(8000, () => {
    console.log("the port is listening on port 8000")
})