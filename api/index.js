require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const CardRouter = require('./modules/card');
const BoardRouter = require('./modules/board');
const AuthRouter = require('./modules/auth');
const ListRouter = require('./modules/list')

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)

  console.log('Mongodb connected');
  const app = express();

  app.use(express.json());

  app.use('/api/card', CardRouter);
  app.use('/api/list', ListRouter);
  app.use('/api/auth', AuthRouter);
  app.use('/api/board', BoardRouter );

  app.listen(process.env.PORT || 9000, (err) => {
    if (err) throw err;

    console.log('Server connected');
  });
}

main();