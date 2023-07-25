const express = require("express");
const config = require("./config");

const database = require("./services/database.service");
const authRouter = require("./authorisation/auth.api.router");
const transactionRouter = require("./transactions/transactions.api.router");
const categoryRouter = require("./categories/categories.api.router");

const requestLogger = require("./middlewares/request-logger");
const errrorHandler = require("./api-utils/error-handler");
const notFoundHandler = require("./api-utils/not-found-handler");

async function start() {
  console.log("[Init]: Connecting to database");
  await database.initialize();

  console.log("[Init]: starting server");

  const server = new express();
  server.use(express.json());
  server.use(requestLogger);

  server.use("/transaction", transactionRouter);
  server.use("/auth", authRouter);
  server.use("/category", categoryRouter);

  server.use(notFoundHandler);
  server.use(errrorHandler);

  server.listen(config.APP_PORT, () => {
    console.log(
      "[init]: expense-tracker application running on",
      config.APP_PORT
    );
  });
}

start().catch((err) => {
  console.log("[fatal]: could not start expense-tracker application");
  console.log(err);
});
