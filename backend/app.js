
const express = require("express"); // express 
const app = express(); // convention 
const morgan = require("morgan"); // db logger
const cors = require("cors"); 
const { errorHandler } = require("./middlewares/error");
const { handleNotFound } = require("./utils/helper");
const userRouter = require("./routes/user");
const reviewRouter = require("./routes/review");
const watchlistRouter = require("./routes/watchlist");


require("express-async-errors"); // error handling when using async functions
require("dotenv").config(); // .env
require("./db"); // connects to mongo db


app.use(cors());
app.use(express.json()); // parses json
app.use(morgan("dev")); 
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'https://tcdb-backend2-gjtz3.ondigitalocean.app/'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.use("/api/user", userRouter);
app.use("/api/review", reviewRouter);
app.use("/api/watchlist", watchlistRouter);
app.use("/*", handleNotFound);
app.use(errorHandler);


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log("the port is listening on port " + PORT);
});
