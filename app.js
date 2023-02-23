const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
app.use(express.json());
app.use(express.static('./public'));

const port = 5500;

//ルーティングの設定
app.use('/api/v1/tasks', tasksRouter);

//DB接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log('サーバーが起動しました');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
