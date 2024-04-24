require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");

const productsRoute = require("./routes/products");
// Middlewares

app.use(express.json());

// Routes

app.get("/", (req, res, next) => {
  res.send(`<h1>Store API </h1> <a href="/api/v1/products">Products </a>`);
});

app.use("/api/v1/products", productsRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.ROUTE || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port);
  } catch (error) {
    console.log(error);
  }
};

start();
