require('dotenv').config();
const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const CardRouter = require('./modules/card');
const BoardRouter = require('./modules/board');
const AuthRouter = require('./modules/auth');
const ListRouter = require('./modules/list')
const log = require('./common/middlewares/log');
const errorHandler = require('./common/errorHandler');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)

  console.log('Mongodb connected');
  const app = express();
  app.use(log)
  app.use(express.json());

  // app.use('/api/card', CardRouter);
  // app.use('/api/list', ListRouter);
  app.use('/api/auth', AuthRouter);
  // app.use('/api/board', BoardRouter );

  app.listen(process.env.PORT || 9000, (err) => {
    if (err) throw err;

    console.log('Server connected');
  });
}

main();