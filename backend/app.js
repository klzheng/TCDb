
const express = require("express"); // express 
const app = express(); // convention 
const morgan = require("morgan"); // db logger
const cors = require("cors"); 
const { errorHandler } = require("./middlewares/error");
const { handleNotFound } = require("./utils/helper");
const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");
const reviewRouter = require("./routes/review");


require("express-async-errors"); // error handling when using async functions
require("dotenv").config(); // .env
require("./db"); // connects to mongo db


app.use(cors());
app.use(express.json()); // parses json
app.use(morgan("dev")); 
app.use("/api/user", userRouter);
app.use("/api/review", reviewRouter);
app.use("/api/actor", actorRouter);
app.use("/*", handleNotFound);
app.use(errorHandler);


app.listen(8000, () => {
  console.log("the port is listening on port 8000");
});
