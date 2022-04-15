const ctrlWrapper = (ctrl) => async (req, res, next) => {
    try {
      const result = await ctrl(req, res, next);
      return result
    } catch (err) {
      console.log(err)
      next(err);
    }
  }

module.exports = ctrlWrapper 