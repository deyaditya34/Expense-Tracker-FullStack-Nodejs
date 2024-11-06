const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const config = require("./config");
const database = require("./services/database.service");
const authRouter = require("./auth/auth.api.router");
const transactionRouter = require("./transactions/transactions.api.router");
const categoryRouter = require("./categories/categories.api.router");

const businessRouter = require("./business/business.api.router");
const requestLogger = require("./middlewares/request-logger");
const errrorHandler = require("./api-utils/error-handler");
const notFoundHandler = require("./api-utils/not-found-handler");

async function start() {
  console.log("[Init]: Connecting to database");
  await database.initialize();

  console.log("[Init]: starting server");

  const server = new express();
  server.use(express.json());

  server.use(
    cors({
      credentials: true,
      origin: "http://127.0.0.1:5501",
    })
  );

  server.use(cookieParser());

  server.use(requestLogger);

  server.use("/transactions", transactionRouter);
  server.use("/auth", authRouter);
  server.use("/categories", categoryRouter);
  server.use("/business", businessRouter);
  server.use(notFoundHandler);
  server.use(errrorHandler);

  const key = fs.readFileSync(config.SSL_KEY);
  const cert = fs.readFileSync(config.SSL_CERT);

  https.createServer({ key, cert }, server).listen(config.APP_PORT, () => {
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
