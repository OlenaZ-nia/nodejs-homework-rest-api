const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const limiter = require('./middlewares/rateLimit');
const { MaxReqBodySize } = require('./libs');

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(limiter(15 * 60 * 1000, 100)); // Apply the rate limiting middleware to all requests
app.use(helmet());

app.use(logger(formatsLogger));
app.use(express.static(process.env.STATIC_FOLDER));
app.use(cors());
app.use(express.json({limit: MaxReqBodySize.LIMIT}));

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
});

module.exports = app;

