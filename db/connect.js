const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url).then(() => {
    console.log('MongoDB 接続中...');
  });
};

module.exports = connectDB;
