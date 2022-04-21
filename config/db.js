const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.URI_DB;

const db =  mongoose.connect(uri, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection successful'.bgBrightMagenta);
})

mongoose.connection.on('error', (err) => {
  console.log(`Database connection error: ${err}`);
})

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from DB mongoose');
})

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Disconnected from DB');
    process.exit(1);
  })
})

module.exports = db;