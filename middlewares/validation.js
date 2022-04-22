const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (err) {
    console.log(err.details)
    return res
      .status(400)
      .json({ status: 'error', code: 400, message: err.message, data: err._original })
  }
}

const validateParams = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.params)
    next()
  } catch (err) {
    console.log(err.details)
    return res
      .status(400)
      .json({ status: 'error', code: 400, message: err.message })
  }
}

const validateQuery = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.query)
    next()
  } catch (err) {
    console.log(err.details)
    return res
      .status(400)
      .json({ status: 'error', code: 400, message: err.message })
  }
}

module.exports = { validateBody, validateParams, validateQuery }