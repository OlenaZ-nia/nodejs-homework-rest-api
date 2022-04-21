const app = require('./app');
const db = require('./config/db');
const colors = require('colors');
const { AppErrorCode } = require('./libs');

const { PORT } = process.env || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`.blue);
  })
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`.red.bold, AppErrorCode.DB_CONNECTIONS_ERROR);
  process.exit(AppErrorCode.DB_CONNECTIONS_ERROR);
}
)


