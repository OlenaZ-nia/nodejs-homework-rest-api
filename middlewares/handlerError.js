const { HttpCode } = require('../libs');

class HttpError extends Error {
  constructor(statusCode, message, name = 'AppError') {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail'
    this.name = name
    Error.captureStackTrace(this, this.constructor)
  }
}

const ctrlWrapper = (ctrl) => async (req, res, next) => {
  try {
    const result = await ctrl(req, res, next)
    return result
  } catch (error) {
    console.log("from error: ", error.name)
    switch (error.name) {
      case 'ValidationError':
        res.status(HttpCode.BAD_REQUEST).json({
          status: 'error',
          code: HttpCode.BAD_REQUEST,
          message: error.message,
        })
        break
      case 'AppError':
        res.status(error.statusCode).json({
          status: error.status,
          code: error.statusCode,
          message: error.message,
        })
        break
      case 'MongoServerError':
        res.status(HttpCode.BAD_REQUEST).json({
          status: 'errorMongo',
          code: HttpCode.BAD_REQUEST,
          message: error.message,
        })
        break
      default:
        next(error)
        break
    }
  }
}

module.exports = {ctrlWrapper, HttpError} 