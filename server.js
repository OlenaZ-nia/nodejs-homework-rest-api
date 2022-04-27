const {mkdir } = require('fs/promises');
const app = require('./app');
const db = require('./config/db');
const colors = require('colors');
require('dotenv').config();
const { AppErrorCode } = require('./libs');

const { PORT } = process.env || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(process.env.UPLOAD_FOLDER, {recursive: true})
    console.log(`Server running. Use our API on port: ${PORT}`.blue);
  })
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`.red.bold, AppErrorCode.DB_CONNECTIONS_ERROR);
  process.exit(AppErrorCode.DB_CONNECTIONS_ERROR);
}
)


