const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require("path")

const config = require('./config');
const database = require('./services/database.service');
const authRouter = require('./auth/auth.api.router');
const transactionRouter = require('./transactions/transactions.api.router');
const categoryRouter = require('./categories/categories.api.router');

const businessRouter = require('./business/business.api.router');
const requestLogger = require('./middlewares/request-logger');
const errrorHandler = require('./api-utils/error-handler');
const notFoundHandler = require('./api-utils/not-found-handler');

async function start() {
  console.log('[Init]: Connecting to database');
  await database.initialize();

  console.log('[Init]: starting server');

  const server = new express();
  server.use(express.json());

  server.use(
    cors({
      credentials: true,
      origin: [
        'https://et.adityadey.com',
        'https://www.et.adityadey.com',
      ],
    })
  );

  server.use(cookieParser());

  server.use(requestLogger);

  server.use('/api/transactions', transactionRouter);
  server.use('/api/auth', authRouter);
  server.use('/api/categories', categoryRouter);
  server.use('/api/business', businessRouter);
  server.use("/", express.static('frontEnd'));
  server.use(notFoundHandler);
  server.use(errrorHandler);

  server.listen(config.APP_PORT, () => {
    console.log(
      '[init]: expense-tracker application running on',
      config.APP_PORT
    );
  });
}

start().catch((err) => {
  console.log('[fatal]: could not start expense-tracker application');
  console.log(err);
});
