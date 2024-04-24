require("dotenv").config();
// Async errors

const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");

// Middlewares

app.use(express.json());

// Routes

app.get("/", (req, res, next) => {
  res.send(`<h1>Store API </h1> <a href="/api/v1/products">Products </a>`);
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.ROUTE || 3000;

const start = async () => {
  try {
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
};

start();
